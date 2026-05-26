import { Router } from "express";
import { db } from "@workspace/db";
import { professionalsTable } from "@workspace/db";
import { eq, desc, like, or, and } from "drizzle-orm";
import { requireAuth, requireAdmin, optionalAuth, AuthRequest } from "../middleware/auth";

const qs = (v: unknown): string => String(Array.isArray(v) ? v[0] : v ?? "");

const router = Router();

router.get("/professionals", optionalAuth, async (req: AuthRequest, res) => {
  try {
    const isAdmin = req.user?.userType === "admin";
    const { profession, location, search, verified, published, limit = "20", offset = "0" } = req.query as Record<string, string>;
    const conditions: any[] = [];
    if (!isAdmin || published !== "false") conditions.push(eq(professionalsTable.published, true));
    if (verified === "true") conditions.push(eq(professionalsTable.verified, true));
    if (profession && profession !== "all") conditions.push(like(professionalsTable.profession, `%${qs(profession)}%`));
    if (location && location !== "all") conditions.push(like(professionalsTable.location, `%${qs(location)}%`));
    if (search) conditions.push(or(like(professionalsTable.name, `%${qs(search)}%`), like(professionalsTable.company, `%${qs(search)}%`)));
    const professionals = await db.select().from(professionalsTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(professionalsTable.createdAt))
      .limit(parseInt(limit)).offset(parseInt(offset));
    res.json(professionals);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.get("/professionals/:id", optionalAuth, async (req: AuthRequest, res) => {
  try {
    const isAdmin = req.user?.userType === "admin";
    const [p] = await db.select().from(professionalsTable).where(eq(professionalsTable.id, parseInt(qs(req.params.id)))).limit(1);
    if (!p) return res.status(404).json({ error: "Not found" });
    if (!p.published && !isAdmin) return res.status(404).json({ error: "Not found" });
    res.json(p);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.post("/professionals", requireAuth, async (req, res) => {
  try {
    const { published: _p, verified: _v, ...safeBody } = req.body;
    const [{ id }] = await db.insert(professionalsTable).values({ ...safeBody, published: false, verified: false }).$returningId();
    const [p] = await db.select().from(professionalsTable).where(eq(professionalsTable.id, id)).limit(1);
    res.status(201).json(p);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.put("/professionals/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(qs(req.params.id));
    await db.update(professionalsTable).set({ ...req.body, updatedAt: new Date() }).where(eq(professionalsTable.id, id));
    const [p] = await db.select().from(professionalsTable).where(eq(professionalsTable.id, id)).limit(1);
    if (!p) return res.status(404).json({ error: "Not found" });
    res.json(p);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.delete("/professionals/:id", requireAdmin, async (req, res) => {
  try {
    await db.delete(professionalsTable).where(eq(professionalsTable.id, parseInt(qs(req.params.id))));
    res.json({ success: true });
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

export default router;
