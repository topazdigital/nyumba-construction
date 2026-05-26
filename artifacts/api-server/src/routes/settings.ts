import { Router } from "express";
import { db } from "@workspace/db";
import { siteSettingsTable, homepageSliderTable } from "@workspace/db";
import { eq, asc, sql } from "drizzle-orm";
import { requireAdmin } from "../middleware/auth";

const qs = (v: unknown): string => String(Array.isArray(v) ? v[0] : v ?? "");

const router = Router();

router.get("/settings", async (req, res) => {
  try {
    const settings = await db.select().from(siteSettingsTable);
    const obj: Record<string, string> = {};
    settings.forEach((s: { settingKey: string; settingValue: string | null }) => { obj[s.settingKey] = s.settingValue || ""; });
    res.json(obj);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.post("/settings", requireAdmin, async (req, res) => {
  try {
    const entries = Object.entries(req.body);
    for (const [key, value] of entries) {
      await db.insert(siteSettingsTable)
        .values({ settingKey: key, settingValue: String(value) })
        .onDuplicateKeyUpdate({ set: { settingValue: String(value), updatedAt: new Date() } });
    }
    res.json({ success: true });
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.get("/slider", async (req, res) => {
  try {
    const items = await db.select().from(homepageSliderTable).orderBy(asc(homepageSliderTable.sortOrder));
    res.json(items);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.post("/slider", requireAdmin, async (req, res) => {
  try {
    const [{ id }] = await db.insert(homepageSliderTable).values(req.body).$returningId();
    const [item] = await db.select().from(homepageSliderTable).where(eq(homepageSliderTable.id, id)).limit(1);
    res.status(201).json(item);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.put("/slider/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(qs(req.params.id));
    await db.update(homepageSliderTable).set(req.body).where(eq(homepageSliderTable.id, id));
    const [item] = await db.select().from(homepageSliderTable).where(eq(homepageSliderTable.id, id)).limit(1);
    res.json(item);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.delete("/slider/:id", requireAdmin, async (req, res) => {
  try {
    await db.delete(homepageSliderTable).where(eq(homepageSliderTable.id, parseInt(qs(req.params.id))));
    res.json({ success: true });
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.get("/admin/stats", requireAdmin, async (req, res) => {
  try {
    const { articlesTable } = await import("@workspace/db");
    const { propertiesTable } = await import("@workspace/db");
    const { professionalsTable } = await import("@workspace/db");
    const { usersTable } = await import("@workspace/db");
    const { count } = await import("drizzle-orm");
    const [[articles], [properties], [professionals], [users]] = await Promise.all([
      db.select({ count: count() }).from(articlesTable),
      db.select({ count: count() }).from(propertiesTable),
      db.select({ count: count() }).from(professionalsTable),
      db.select({ count: count() }).from(usersTable),
    ]);
    res.json({ articles: articles.count, properties: properties.count, professionals: professionals.count, users: users.count });
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

export default router;
