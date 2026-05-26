import { Router } from "express";
import { db } from "@workspace/db";
import { newsletterSubscribersTable } from "@workspace/db";
import { eq, desc, count } from "drizzle-orm";
import { requireAdmin } from "../middleware/auth";

const router = Router();

router.post("/newsletter/subscribe", async (req, res) => {
  try {
    const { email, name, source = "website" } = req.body;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Valid email address is required" });
    }

    const existing = await db.select().from(newsletterSubscribersTable)
      .where(eq(newsletterSubscribersTable.email, email.toLowerCase().trim()))
      .limit(1);

    if (existing.length > 0) {
      if (!existing[0].active) {
        await db.update(newsletterSubscribersTable)
          .set({ active: true })
          .where(eq(newsletterSubscribersTable.id, existing[0].id));
        return res.json({ success: true, message: "You've been re-subscribed!" });
      }
      return res.json({ success: true, message: "You're already subscribed!" });
    }

    await db.insert(newsletterSubscribersTable).values({
      email: email.toLowerCase().trim(),
      name: name?.trim() || null,
      source,
      active: true,
    });

    res.status(201).json({ success: true, message: "Successfully subscribed! Thank you." });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Subscription failed. Please try again." });
  }
});

router.get("/newsletter/subscribers", requireAdmin, async (req, res) => {
  try {
    const subscribers = await db.select().from(newsletterSubscribersTable)
      .orderBy(desc(newsletterSubscribersTable.createdAt));
    res.json(subscribers);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/newsletter/stats", requireAdmin, async (req, res) => {
  try {
    const [total] = await db.select({ count: count() }).from(newsletterSubscribersTable);
    const [active] = await db.select({ count: count() }).from(newsletterSubscribersTable)
      .where(eq(newsletterSubscribersTable.active, true));
    res.json({ total: total.count, active: active.count });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/newsletter/subscribers/:id", requireAdmin, async (req, res) => {
  try {
    await db.delete(newsletterSubscribersTable)
      .where(eq(newsletterSubscribersTable.id, parseInt(req.params.id)));
    res.json({ success: true });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/newsletter/subscribers/:id/toggle", requireAdmin, async (req, res) => {
  try {
    const [sub] = await db.select().from(newsletterSubscribersTable)
      .where(eq(newsletterSubscribersTable.id, parseInt(req.params.id)));
    if (!sub) return res.status(404).json({ error: "Not found" });
    const [updated] = await db.update(newsletterSubscribersTable)
      .set({ active: !sub.active })
      .where(eq(newsletterSubscribersTable.id, sub.id))
      .returning();
    res.json(updated);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
