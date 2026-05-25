import { Router } from "express";
import { db } from "@workspace/db";
import { siteSettingsTable, homepageSliderTable } from "@workspace/db";
import { eq, asc } from "drizzle-orm";
import { requireAdmin } from "../middleware/auth";

const router = Router();

// Site settings — GET is public (used by frontend to load site config)
router.get("/settings", async (req, res) => {
  try {
    const settings = await db.select().from(siteSettingsTable);
    const obj: Record<string, string> = {};
    settings.forEach(s => { obj[s.settingKey] = s.settingValue || ""; });
    res.json(obj);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.post("/settings", requireAdmin, async (req, res) => {
  try {
    const entries = Object.entries(req.body);
    for (const [key, value] of entries) {
      await db.insert(siteSettingsTable)
        .values({ settingKey: key, settingValue: String(value) })
        .onConflictDoUpdate({ target: siteSettingsTable.settingKey, set: { settingValue: String(value), updatedAt: new Date() } });
    }
    res.json({ success: true });
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

// Slider — GET is public (used by homepage)
router.get("/slider", async (req, res) => {
  try {
    const items = await db.select().from(homepageSliderTable).orderBy(asc(homepageSliderTable.sortOrder));
    res.json(items);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.post("/slider", requireAdmin, async (req, res) => {
  try {
    const [item] = await db.insert(homepageSliderTable).values(req.body).returning();
    res.status(201).json(item);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.put("/slider/:id", requireAdmin, async (req, res) => {
  try {
    const [item] = await db.update(homepageSliderTable).set(req.body).where(eq(homepageSliderTable.id, parseInt(req.params.id))).returning();
    res.json(item);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.delete("/slider/:id", requireAdmin, async (req, res) => {
  try {
    await db.delete(homepageSliderTable).where(eq(homepageSliderTable.id, parseInt(req.params.id)));
    res.json({ success: true });
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

// Admin stats — admin only
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
    res.json({
      articles: articles.count,
      properties: properties.count,
      professionals: professionals.count,
      users: users.count,
    });
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

export default router;
