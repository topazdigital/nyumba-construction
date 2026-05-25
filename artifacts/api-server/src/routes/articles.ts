import { Router } from "express";
import { db } from "@workspace/db";
import { articlesTable } from "@workspace/db";
import { eq, desc, ilike, or, sql, and } from "drizzle-orm";
import { requireAdmin, optionalAuth, AuthRequest } from "../middleware/auth";

const router = Router();

router.get("/articles", optionalAuth, async (req: AuthRequest, res) => {
  try {
    const isAdmin = req.user?.userType === "admin";
    const { category, search, featured, published, limit = "20", offset = "0" } = req.query as Record<string, string>;
    const conditions: any[] = [];
    // Non-admins always get published=true only; admins respect the query param
    if (!isAdmin || published !== "false") {
      conditions.push(eq(articlesTable.published, true));
    }
    if (featured === "true") conditions.push(eq(articlesTable.featured, true));
    if (category && category !== "all") conditions.push(eq(articlesTable.category, category));
    if (search) conditions.push(or(ilike(articlesTable.title, `%${search}%`), ilike(articlesTable.excerpt, `%${search}%`)));
    const articles = await db.select().from(articlesTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(articlesTable.createdAt))
      .limit(parseInt(limit))
      .offset(parseInt(offset));
    res.json(articles);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.get("/articles/:id", optionalAuth, async (req: AuthRequest, res) => {
  try {
    const isAdmin = req.user?.userType === "admin";
    const [article] = await db.select().from(articlesTable).where(eq(articlesTable.id, parseInt(req.params.id))).limit(1);
    if (!article) return res.status(404).json({ error: "Not found" });
    if (!article.published && !isAdmin) return res.status(404).json({ error: "Not found" });
    await db.update(articlesTable).set({ views: (article.views || 0) + 1 }).where(eq(articlesTable.id, article.id));
    res.json({ ...article, views: (article.views || 0) + 1 });
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.post("/articles", requireAdmin, async (req, res) => {
  try {
    const [article] = await db.insert(articlesTable).values(req.body).returning();
    res.status(201).json(article);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.put("/articles/:id", requireAdmin, async (req, res) => {
  try {
    const [article] = await db.update(articlesTable).set({ ...req.body, updatedAt: new Date() }).where(eq(articlesTable.id, parseInt(req.params.id))).returning();
    if (!article) return res.status(404).json({ error: "Not found" });
    res.json(article);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.delete("/articles/:id", requireAdmin, async (req, res) => {
  try {
    await db.delete(articlesTable).where(eq(articlesTable.id, parseInt(req.params.id)));
    res.json({ success: true });
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

export default router;
