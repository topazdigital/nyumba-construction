import { Router } from "express";
import { db } from "@workspace/db";
import { contractorsTable } from "@workspace/db";
import { eq, desc, like, or, and } from "drizzle-orm";
import { requireAuth, requireAdmin, optionalAuth, AuthRequest } from "../middleware/auth";

const qs = (v: unknown): string => String(Array.isArray(v) ? v[0] : v ?? "");

const router = Router();

router.get("/contractors", optionalAuth, async (req: AuthRequest, res) => {
  try {
    const isAdmin = req.user?.userType === "admin";
    const { type, location, search, published, limit = "20", offset = "0" } = req.query as Record<string, string>;
    const conditions: any[] = [];
    if (!isAdmin || published !== "false") conditions.push(eq(contractorsTable.published, true));
    if (type && type !== "all") conditions.push(like(contractorsTable.contractorType, `%${qs(type)}%`));
    if (location && location !== "all") conditions.push(like(contractorsTable.location, `%${qs(location)}%`));
    if (search) conditions.push(or(like(contractorsTable.name, `%${qs(search)}%`), like(contractorsTable.company, `%${qs(search)}%`)));
    const contractors = await db.select().from(contractorsTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(contractorsTable.createdAt))
      .limit(parseInt(limit)).offset(parseInt(offset));
    res.json(contractors);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.get("/contractors/:id", optionalAuth, async (req: AuthRequest, res) => {
  try {
    const isAdmin = req.user?.userType === "admin";
    const [c] = await db.select().from(contractorsTable).where(eq(contractorsTable.id, parseInt(qs(req.params.id)))).limit(1);
    if (!c) return res.status(404).json({ error: "Not found" });
    if (!c.published && !isAdmin) return res.status(404).json({ error: "Not found" });
    res.json(c);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.post("/contractors", requireAuth, async (req, res) => {
  try {
    const { published: _p, verified: _v, ...safeBody } = req.body;
    const [{ id }] = await db.insert(contractorsTable).values({ ...safeBody, published: false, verified: false }).$returningId();
    const [c] = await db.select().from(contractorsTable).where(eq(contractorsTable.id, id)).limit(1);
    res.status(201).json(c);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.put("/contractors/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(qs(req.params.id));
    await db.update(contractorsTable).set({ ...req.body, updatedAt: new Date() }).where(eq(contractorsTable.id, id));
    const [c] = await db.select().from(contractorsTable).where(eq(contractorsTable.id, id)).limit(1);
    if (!c) return res.status(404).json({ error: "Not found" });
    res.json(c);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.delete("/contractors/:id", requireAdmin, async (req, res) => {
  try {
    await db.delete(contractorsTable).where(eq(contractorsTable.id, parseInt(qs(req.params.id))));
    res.json({ success: true });
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

export default router;
