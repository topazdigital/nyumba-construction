import { Router } from "express";
import { db } from "@workspace/db";
import { articlesTable } from "@workspace/db";
import { eq, desc, ilike, or, sql } from "drizzle-orm";

const router = Router();

router.get("/articles", async (req, res) => {
  try {
    const { category, search, featured, published = "true", limit = "20", offset = "0" } = req.query as Record<string, string>;
    let query = db.select().from(articlesTable);
    const conditions: any[] = [];
    if (published === "true") conditions.push(eq(articlesTable.published, true));
    if (featured === "true") conditions.push(eq(articlesTable.featured, true));
    if (category && category !== "all") conditions.push(eq(articlesTable.category, category));
    if (search) conditions.push(or(ilike(articlesTable.title, `%${search}%`), ilike(articlesTable.excerpt, `%${search}%`)));
    const articles = await db.select().from(articlesTable)
      .where(conditions.length > 0 ? sql`${conditions.reduce((a, b) => sql`${a} AND ${b}`)}` : undefined)
      .orderBy(desc(articlesTable.createdAt))
      .limit(parseInt(limit))
      .offset(parseInt(offset));
    res.json(articles);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.get("/articles/:id", async (req, res) => {
  try {
    const [article] = await db.select().from(articlesTable).where(eq(articlesTable.id, parseInt(req.params.id))).limit(1);
    if (!article) return res.status(404).json({ error: "Not found" });
    // increment views
    await db.update(articlesTable).set({ views: (article.views || 0) + 1 }).where(eq(articlesTable.id, article.id));
    res.json({ ...article, views: (article.views || 0) + 1 });
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.post("/articles", async (req, res) => {
  try {
    const [article] = await db.insert(articlesTable).values(req.body).returning();
    res.status(201).json(article);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.put("/articles/:id", async (req, res) => {
  try {
    const [article] = await db.update(articlesTable).set({ ...req.body, updatedAt: new Date() }).where(eq(articlesTable.id, parseInt(req.params.id))).returning();
    if (!article) return res.status(404).json({ error: "Not found" });
    res.json(article);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.delete("/articles/:id", async (req, res) => {
  try {
    await db.delete(articlesTable).where(eq(articlesTable.id, parseInt(req.params.id)));
    res.json({ success: true });
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

export default router;
