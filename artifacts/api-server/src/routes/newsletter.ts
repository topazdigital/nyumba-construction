import { Router } from "express";
import { db } from "@workspace/db";
import { newsletterSubscribersTable } from "@workspace/db";
import { eq, desc, count, sql } from "drizzle-orm";
import { requireAdmin } from "../middleware/auth";

const qs = (v: unknown): string => String(Array.isArray(v) ? v[0] : v ?? "");

const router = Router();

router.post("/newsletter/subscribe", async (req, res) => {
  try {
    const { email, name, source = "website" } = req.body;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Valid email address is required" });
    }
    const existing = await db.select().from(newsletterSubscribersTable)
      .where(eq(newsletterSubscribersTable.email, email.toLowerCase().trim())).limit(1);
    if (existing.length > 0) {
      if (!existing[0].active) {
        await db.update(newsletterSubscribersTable).set({ active: true }).where(eq(newsletterSubscribersTable.id, existing[0].id));
        return res.json({ success: true, message: "You've been re-subscribed!" });
      }
      return res.json({ success: true, message: "You're already subscribed!" });
    }
    await db.insert(newsletterSubscribersTable).values({ email: email.toLowerCase().trim(), name: name?.trim() || null, source, active: true });
    res.status(201).json({ success: true, message: "Successfully subscribed! Thank you." });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Subscription failed. Please try again." });
  }
});

router.get("/newsletter/subscribers", requireAdmin, async (req, res) => {
  try {
    const subscribers = await db.select().from(newsletterSubscribersTable).orderBy(desc(newsletterSubscribersTable.createdAt));
    res.json(subscribers);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.get("/newsletter/stats", requireAdmin, async (req, res) => {
  try {
    const [total] = await db.select({ count: count() }).from(newsletterSubscribersTable);
    const [active] = await db.select({ count: count() }).from(newsletterSubscribersTable).where(eq(newsletterSubscribersTable.active, true));
    res.json({ total: total.count, active: active.count });
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.delete("/newsletter/subscribers/:id", requireAdmin, async (req, res) => {
  try {
    await db.delete(newsletterSubscribersTable).where(eq(newsletterSubscribersTable.id, parseInt(qs(req.params.id))));
    res.json({ success: true });
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.put("/newsletter/subscribers/:id/toggle", requireAdmin, async (req, res) => {
  try {
    const [sub] = await db.select().from(newsletterSubscribersTable).where(eq(newsletterSubscribersTable.id, parseInt(qs(req.params.id))));
    if (!sub) return res.status(404).json({ error: "Not found" });
    await db.update(newsletterSubscribersTable).set({ active: !sub.active }).where(eq(newsletterSubscribersTable.id, sub.id));
    const [updated] = await db.select().from(newsletterSubscribersTable).where(eq(newsletterSubscribersTable.id, sub.id)).limit(1);
    res.json(updated);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.post("/newsletter/send-digest", requireAdmin, async (req, res) => {
  try {
    const { subject, body, previewText } = req.body;
    if (!subject?.trim() || !body?.trim()) return res.status(400).json({ error: "Subject and body are required" });
    const subscribers = await db.select().from(newsletterSubscribersTable).where(eq(newsletterSubscribersTable.active, true));
    if (subscribers.length === 0) return res.json({ success: true, sent: 0, message: "No active subscribers." });
    const smtpConfigured = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
    if (!smtpConfigured) {
      return res.json({ success: true, sent: 0, preview: true, recipientCount: subscribers.length,
        message: `Preview only — SMTP not configured. Would send to ${subscribers.length} subscriber(s). Add SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_FROM to enable.`,
        emailPreview: { subject, previewText: previewText || '', body, recipients: subscribers.slice(0, 5).map((s: { email: string }) => s.email), totalRecipients: subscribers.length } });
    }
    const nodemailer = await import("nodemailer").catch(() => null);
    if (!nodemailer) return res.status(500).json({ error: "nodemailer not installed" });
    const transporter = nodemailer.default.createTransport({
      host: process.env.SMTP_HOST, port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true", auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    const fromAddress = process.env.SMTP_FROM || `Nyumba Magazine <newsletter@nyumba.co.ke>`;
    let sent = 0; const errors: string[] = [];
    for (const sub of subscribers) {
      try {
        const unsubLink = `${process.env.APP_URL || 'https://nyumba.impact.co.ke'}/api/newsletter/unsubscribe?email=${encodeURIComponent(sub.email)}`;
        await transporter.sendMail({ from: fromAddress, to: sub.email, subject,
          html: buildEmailHtml(subject, previewText || '', body) + `<p style="font-size:11px;color:#999;margin-top:24px;text-align:center;">You're receiving this because you subscribed at nyumba.impact.co.ke · <a href="${unsubLink}" style="color:#999;">Unsubscribe</a></p>` });
        sent++;
      } catch (e: any) { errors.push(`${sub.email}: ${e.message}`); }
    }
    res.json({ success: true, sent, failed: errors.length, errors: errors.slice(0, 5), message: `Sent to ${sent} of ${subscribers.length} subscribers.` });
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Failed to send digest" }); }
});

router.get("/newsletter/unsubscribe", async (req, res) => {
  try {
    const { email } = req.query as { email: string };
    if (!email) return res.status(400).send("Missing email parameter");
    await db.update(newsletterSubscribersTable).set({ active: false }).where(eq(newsletterSubscribersTable.email, email.toLowerCase().trim()));
    res.send(`<html><body style="font-family:sans-serif;text-align:center;padding:60px"><h2>Unsubscribed</h2><p>You've been removed from the Nyumba Magazine newsletter.</p></body></html>`);
  } catch { res.status(500).send("Error processing unsubscribe"); }
});

function buildEmailHtml(subject: string, previewText: string, body: string): string {
  const escaped = body.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n\n/g,'</p><p style="margin:0 0 14px">').replace(/\n/g,'<br>');
  return `<!DOCTYPE html><html><head><meta charset="utf-8">${previewText?`<div style="display:none;max-height:0;overflow:hidden">${previewText}</div>`:''}</head><body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif"><table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px 12px"><table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.08)"><tr><td style="background:linear-gradient(135deg,#ea580c,#c2410c);padding:28px 32px;text-align:center"><h1 style="margin:0;color:#fff;font-size:22px;letter-spacing:1px">NYUMBA MAGAZINE</h1><p style="margin:6px 0 0;color:#fed7aa;font-size:13px">Kenya's Construction & Real Estate Platform</p></td></tr><tr><td style="padding:32px"><h2 style="margin:0 0 20px;color:#1f2937;font-size:20px">${subject}</h2><p style="margin:0 0 14px;color:#374151;line-height:1.7;font-size:15px">${escaped}</p></td></tr><tr><td style="background:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb"><a href="https://nyumba.impact.co.ke" style="color:#ea580c;text-decoration:none;font-size:13px;font-weight:bold">Visit Nyumba Magazine</a></td></tr></table></td></tr></table></body></html>`;
}

export default router;
