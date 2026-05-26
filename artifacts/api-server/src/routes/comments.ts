import { Router } from "express";
import { db } from "@workspace/db";
import { commentsTable } from "@workspace/db";
import { eq, and, desc } from "drizzle-orm";
import { requireAdmin, optionalAuth, AuthRequest } from "../middleware/auth";

const qs = (v: unknown): string => String(Array.isArray(v) ? v[0] : v ?? "");

const router = Router();

router.get("/comments", optionalAuth, async (req: AuthRequest, res) => {
  try {
    const { articleId } = req.query as Record<string, string>;
    const isAdmin = req.user?.userType === "admin";
    const conditions: any[] = [];
    if (articleId && articleId !== "0") conditions.push(eq(commentsTable.articleId, parseInt(qs(articleId))));
    if (!isAdmin) {
      if (!articleId) return res.status(400).json({ error: "articleId required" });
      conditions.push(eq(commentsTable.approved, true));
    }
    const comments = await db.select().from(commentsTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(commentsTable.createdAt));
    res.json(comments);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.post("/comments", async (req: AuthRequest, res) => {
  try {
    const { articleId, name, email, website, body } = req.body;
    if (!articleId || !name || !email || !body) return res.status(400).json({ error: "articleId, name, email, and body are required" });
    const [{ id }] = await db.insert(commentsTable)
      .values({ articleId: parseInt(qs(articleId)), name, email, website: website || null, body, approved: false })
      .$returningId();
    const [comment] = await db.select().from(commentsTable).where(eq(commentsTable.id, id)).limit(1);
    res.status(201).json({ ...comment, message: "Comment submitted and awaiting moderation" });
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.put("/comments/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(qs(req.params.id));
    await db.update(commentsTable).set(req.body).where(eq(commentsTable.id, id));
    const [comment] = await db.select().from(commentsTable).where(eq(commentsTable.id, id)).limit(1);
    if (!comment) return res.status(404).json({ error: "Not found" });
    res.json(comment);
  } catch (err) { res.status(500).json({ error: "Server error" }); }
});

router.delete("/comments/:id", requireAdmin, async (req, res) => {
  try {
    await db.delete(commentsTable).where(eq(commentsTable.id, parseInt(qs(req.params.id))));
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: "Server error" }); }
});

export default router;
