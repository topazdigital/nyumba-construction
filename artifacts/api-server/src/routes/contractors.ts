import { Router } from "express";
import { db } from "@workspace/db";
import { contractorsTable } from "@workspace/db";
import { eq, desc, ilike, or, sql } from "drizzle-orm";
import { requireAuth, requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/contractors", async (req, res) => {
  try {
    const { type, location, search, published = "true", limit = "20", offset = "0" } = req.query as Record<string, string>;
    const conditions: any[] = [];
    if (published === "true") conditions.push(eq(contractorsTable.published, true));
    if (type && type !== "all") conditions.push(ilike(contractorsTable.contractorType, `%${type}%`));
    if (location && location !== "all") conditions.push(ilike(contractorsTable.location, `%${location}%`));
    if (search) conditions.push(or(ilike(contractorsTable.name, `%${search}%`), ilike(contractorsTable.company, `%${search}%`)));
    const contractors = await db.select().from(contractorsTable)
      .where(conditions.length > 0 ? sql`${conditions.reduce((a, b) => sql`${a} AND ${b}`)}` : undefined)
      .orderBy(desc(contractorsTable.createdAt))
      .limit(parseInt(limit))
      .offset(parseInt(offset));
    res.json(contractors);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.get("/contractors/:id", async (req, res) => {
  try {
    const [c] = await db.select().from(contractorsTable).where(eq(contractorsTable.id, parseInt(req.params.id))).limit(1);
    if (!c) return res.status(404).json({ error: "Not found" });
    res.json(c);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

// POST: any authenticated user can submit a contractor listing (moderation fields forced server-side)
router.post("/contractors", requireAuth, async (req, res) => {
  try {
    const { published: _p, verified: _v, ...safeBody } = req.body;
    const [c] = await db.insert(contractorsTable).values({ ...safeBody, published: false, verified: false }).returning();
    res.status(201).json(c);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

// PUT/DELETE: admin only
router.put("/contractors/:id", requireAdmin, async (req, res) => {
  try {
    const [c] = await db.update(contractorsTable).set({ ...req.body, updatedAt: new Date() }).where(eq(contractorsTable.id, parseInt(req.params.id))).returning();
    if (!c) return res.status(404).json({ error: "Not found" });
    res.json(c);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.delete("/contractors/:id", requireAdmin, async (req, res) => {
  try {
    await db.delete(contractorsTable).where(eq(contractorsTable.id, parseInt(req.params.id)));
    res.json({ success: true });
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

export default router;
