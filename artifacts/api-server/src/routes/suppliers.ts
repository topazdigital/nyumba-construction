import { Router } from "express";
import { db } from "@workspace/db";
import { suppliersTable } from "@workspace/db";
import { eq, desc, like, or, and } from "drizzle-orm";
import { requireAuth, requireAdmin, optionalAuth, AuthRequest } from "../middleware/auth";

const qs = (v: unknown): string => String(Array.isArray(v) ? v[0] : v ?? "");

const router = Router();

router.get("/suppliers", optionalAuth, async (req: AuthRequest, res) => {
  try {
    const isAdmin = req.user?.userType === "admin";
    const { category, location, search, published, limit = "20", offset = "0" } = req.query as Record<string, string>;
    const conditions: any[] = [];
    if (!isAdmin || published !== "false") conditions.push(eq(suppliersTable.published, true));
    if (category && category !== "all") conditions.push(like(suppliersTable.categories as any, `%${qs(category)}%`));
    if (location && location !== "all") conditions.push(like(suppliersTable.location, `%${qs(location)}%`));
    if (search) conditions.push(or(like(suppliersTable.companyName, `%${qs(search)}%`), like(suppliersTable.contactPerson, `%${qs(search)}%`)));
    const suppliers = await db.select().from(suppliersTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(suppliersTable.createdAt))
      .limit(parseInt(limit)).offset(parseInt(offset));
    res.json(suppliers);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.get("/suppliers/:id", optionalAuth, async (req: AuthRequest, res) => {
  try {
    const isAdmin = req.user?.userType === "admin";
    const [s] = await db.select().from(suppliersTable).where(eq(suppliersTable.id, parseInt(qs(req.params.id)))).limit(1);
    if (!s) return res.status(404).json({ error: "Not found" });
    if (!s.published && !isAdmin) return res.status(404).json({ error: "Not found" });
    res.json(s);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.post("/suppliers", requireAuth, async (req, res) => {
  try {
    const { published: _p, verified: _v, ...safeBody } = req.body;
    const [{ id }] = await db.insert(suppliersTable).values({ ...safeBody, published: false, verified: false }).$returningId();
    const [s] = await db.select().from(suppliersTable).where(eq(suppliersTable.id, id)).limit(1);
    res.status(201).json(s);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.put("/suppliers/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(qs(req.params.id));
    await db.update(suppliersTable).set({ ...req.body, updatedAt: new Date() }).where(eq(suppliersTable.id, id));
    const [s] = await db.select().from(suppliersTable).where(eq(suppliersTable.id, id)).limit(1);
    if (!s) return res.status(404).json({ error: "Not found" });
    res.json(s);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.delete("/suppliers/:id", requireAdmin, async (req, res) => {
  try {
    await db.delete(suppliersTable).where(eq(suppliersTable.id, parseInt(qs(req.params.id))));
    res.json({ success: true });
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

export default router;
