import { Router } from "express";
import { db } from "@workspace/db";
import { articlesTable } from "@workspace/db";
import { eq, desc, like, or, sql, and } from "drizzle-orm";
import { requireAdmin, optionalAuth, AuthRequest } from "../middleware/auth";

const qs = (v: unknown): string => String(Array.isArray(v) ? v[0] : v ?? "");

const router = Router();

router.get("/articles", optionalAuth, async (req: AuthRequest, res) => {
  try {
    const isAdmin = req.user?.userType === "admin";
    const { category, search, featured, published, limit = "20", offset = "0" } = req.query as Record<string, string>;
    const conditions: any[] = [];
    if (!isAdmin || published !== "false") conditions.push(eq(articlesTable.published, true));
    if (featured === "true") conditions.push(eq(articlesTable.featured, true));
    if (category && category !== "all") conditions.push(eq(articlesTable.category, qs(category)));
    if (search) conditions.push(or(like(articlesTable.title, `%${qs(search)}%`), like(articlesTable.excerpt, `%${qs(search)}%`)));
    const articles = await db.select().from(articlesTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(articlesTable.createdAt))
      .limit(parseInt(limit)).offset(parseInt(offset));
    res.json(articles);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.get("/articles/:id", optionalAuth, async (req: AuthRequest, res) => {
  try {
    const isAdmin = req.user?.userType === "admin";
    const [article] = await db.select().from(articlesTable).where(eq(articlesTable.id, parseInt(qs(req.params.id)))).limit(1);
    if (!article) return res.status(404).json({ error: "Not found" });
    if (!article.published && !isAdmin) return res.status(404).json({ error: "Not found" });
    await db.update(articlesTable).set({ views: sql`${articlesTable.views} + 1` }).where(eq(articlesTable.id, parseInt(qs(req.params.id))));
    res.json({ ...article, views: (article.views || 0) + 1 });
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.post("/articles", requireAdmin, async (req, res) => {
  try {
    const [{ id }] = await db.insert(articlesTable).values(req.body).$returningId();
    const [article] = await db.select().from(articlesTable).where(eq(articlesTable.id, id)).limit(1);
    res.status(201).json(article);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.put("/articles/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(qs(req.params.id));
    await db.update(articlesTable).set({ ...req.body, updatedAt: new Date() }).where(eq(articlesTable.id, id));
    const [article] = await db.select().from(articlesTable).where(eq(articlesTable.id, id)).limit(1);
    if (!article) return res.status(404).json({ error: "Not found" });
    res.json(article);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.delete("/articles/:id", requireAdmin, async (req, res) => {
  try {
    await db.delete(articlesTable).where(eq(articlesTable.id, parseInt(qs(req.params.id))));
    res.json({ success: true });
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

export default router;
