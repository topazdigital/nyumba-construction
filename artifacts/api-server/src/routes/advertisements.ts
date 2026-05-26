import { Router } from "express";
import { db } from "@workspace/db";
import { advertisementsTable } from "@workspace/db";
import { eq, asc, sql } from "drizzle-orm";
import { requireAdmin } from "../middleware/auth";

const qs = (v: unknown): string => String(Array.isArray(v) ? v[0] : v ?? "");

const router = Router();

router.get("/advertisements", async (req, res) => {
  try {
    const ads = await db.select().from(advertisementsTable).where(eq(advertisementsTable.active, true)).orderBy(asc(advertisementsTable.sortOrder));
    res.json(ads);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.get("/advertisements/all", requireAdmin, async (req, res) => {
  try {
    const ads = await db.select().from(advertisementsTable).orderBy(asc(advertisementsTable.sortOrder));
    res.json(ads);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.post("/advertisements/:id/click", async (req, res) => {
  try {
    await db.update(advertisementsTable).set({ clicks: sql`${advertisementsTable.clicks} + 1` }).where(eq(advertisementsTable.id, parseInt(qs(req.params.id))));
    res.json({ success: true });
  } catch { res.json({ success: false }); }
});

router.post("/advertisements", requireAdmin, async (req, res) => {
  try {
    const [{ id }] = await db.insert(advertisementsTable).values(req.body).$returningId();
    const [ad] = await db.select().from(advertisementsTable).where(eq(advertisementsTable.id, id)).limit(1);
    res.status(201).json(ad);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.put("/advertisements/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(qs(req.params.id));
    await db.update(advertisementsTable).set({ ...req.body, updatedAt: new Date() }).where(eq(advertisementsTable.id, id));
    const [ad] = await db.select().from(advertisementsTable).where(eq(advertisementsTable.id, id)).limit(1);
    res.json(ad);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.delete("/advertisements/:id", requireAdmin, async (req, res) => {
  try {
    await db.delete(advertisementsTable).where(eq(advertisementsTable.id, parseInt(qs(req.params.id))));
    res.json({ success: true });
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

export default router;
