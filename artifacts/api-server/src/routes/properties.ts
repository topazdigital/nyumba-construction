import { Router } from "express";
import { db } from "@workspace/db";
import { propertiesTable } from "@workspace/db";
import { eq, desc, like, or, and } from "drizzle-orm";
import { requireAuth, requireAdmin, optionalAuth, AuthRequest } from "../middleware/auth";

const qs = (v: unknown): string => String(Array.isArray(v) ? v[0] : v ?? "");

const router = Router();

router.get("/properties", optionalAuth, async (req: AuthRequest, res) => {
  try {
    const isAdmin = req.user?.userType === "admin";
    const { type, location, search, featured, published, limit = "20", offset = "0" } = req.query as Record<string, string>;
    const conditions: any[] = [];
    if (!isAdmin || published !== "false") conditions.push(eq(propertiesTable.published, true));
    if (featured === "true") conditions.push(eq(propertiesTable.featured, true));
    if (type && type !== "all") conditions.push(eq(propertiesTable.propertyType, qs(type)));
    if (location && location !== "all") conditions.push(like(propertiesTable.location, `%${qs(location)}%`));
    if (search) conditions.push(or(like(propertiesTable.title, `%${qs(search)}%`), like(propertiesTable.location, `%${qs(search)}%`)));
    const properties = await db.select().from(propertiesTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(propertiesTable.createdAt))
      .limit(parseInt(limit)).offset(parseInt(offset));
    res.json(properties);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.get("/properties/:id", optionalAuth, async (req: AuthRequest, res) => {
  try {
    const isAdmin = req.user?.userType === "admin";
    const [property] = await db.select().from(propertiesTable).where(eq(propertiesTable.id, parseInt(qs(req.params.id)))).limit(1);
    if (!property) return res.status(404).json({ error: "Not found" });
    if (!property.published && !isAdmin) return res.status(404).json({ error: "Not found" });
    await db.update(propertiesTable).set({ views: (property.views || 0) + 1 }).where(eq(propertiesTable.id, property.id));
    res.json({ ...property, views: (property.views || 0) + 1 });
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.post("/properties", requireAuth, async (req, res) => {
  try {
    const { published: _p, featured: _f, ...safeBody } = req.body;
    const [{ id }] = await db.insert(propertiesTable).values({ ...safeBody, published: false, featured: false }).$returningId();
    const [property] = await db.select().from(propertiesTable).where(eq(propertiesTable.id, id)).limit(1);
    res.status(201).json(property);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.put("/properties/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(qs(req.params.id));
    await db.update(propertiesTable).set({ ...req.body, updatedAt: new Date() }).where(eq(propertiesTable.id, id));
    const [property] = await db.select().from(propertiesTable).where(eq(propertiesTable.id, id)).limit(1);
    if (!property) return res.status(404).json({ error: "Not found" });
    res.json(property);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.delete("/properties/:id", requireAdmin, async (req, res) => {
  try {
    await db.delete(propertiesTable).where(eq(propertiesTable.id, parseInt(qs(req.params.id))));
    res.json({ success: true });
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

export default router;
