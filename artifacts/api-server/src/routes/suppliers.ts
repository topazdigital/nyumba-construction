import { Router } from "express";
import { db } from "@workspace/db";
import { suppliersTable } from "@workspace/db";
import { eq, desc, ilike, or, sql } from "drizzle-orm";
import { requireAuth, requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/suppliers", async (req, res) => {
  try {
    const { category, location, search, published = "true", limit = "20", offset = "0" } = req.query as Record<string, string>;
    const conditions: any[] = [];
    if (published === "true") conditions.push(eq(suppliersTable.published, true));
    if (location && location !== "all") conditions.push(ilike(suppliersTable.location, `%${location}%`));
    if (search) conditions.push(or(ilike(suppliersTable.companyName, `%${search}%`), ilike(suppliersTable.contactPerson, `%${search}%`)));
    const suppliers = await db.select().from(suppliersTable)
      .where(conditions.length > 0 ? sql`${conditions.reduce((a, b) => sql`${a} AND ${b}`)}` : undefined)
      .orderBy(desc(suppliersTable.createdAt))
      .limit(parseInt(limit))
      .offset(parseInt(offset));
    res.json(suppliers);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.get("/suppliers/:id", async (req, res) => {
  try {
    const [s] = await db.select().from(suppliersTable).where(eq(suppliersTable.id, parseInt(req.params.id))).limit(1);
    if (!s) return res.status(404).json({ error: "Not found" });
    res.json(s);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

// POST: any authenticated user can submit a supplier listing (moderation fields forced server-side)
router.post("/suppliers", requireAuth, async (req, res) => {
  try {
    const { published: _p, verified: _v, ...safeBody } = req.body;
    const [s] = await db.insert(suppliersTable).values({ ...safeBody, published: false, verified: false }).returning();
    res.status(201).json(s);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

// PUT/DELETE: admin only
router.put("/suppliers/:id", requireAdmin, async (req, res) => {
  try {
    const [s] = await db.update(suppliersTable).set({ ...req.body, updatedAt: new Date() }).where(eq(suppliersTable.id, parseInt(req.params.id))).returning();
    if (!s) return res.status(404).json({ error: "Not found" });
    res.json(s);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.delete("/suppliers/:id", requireAdmin, async (req, res) => {
  try {
    await db.delete(suppliersTable).where(eq(suppliersTable.id, parseInt(req.params.id)));
    res.json({ success: true });
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

export default router;
