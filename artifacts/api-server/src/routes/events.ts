import { Router } from "express";
import { db } from "@workspace/db";
import { eventsTable } from "@workspace/db";
import { eq, desc, ilike, or, and } from "drizzle-orm";
import { requireAdmin, optionalAuth, AuthRequest } from "../middleware/auth";

const router = Router();

router.get("/events", optionalAuth, async (req: AuthRequest, res) => {
  try {
    const isAdmin = req.user?.userType === "admin";
    const { category, location, search, featured, published, limit = "20", offset = "0" } = req.query as Record<string, string>;
    const conditions: any[] = [];
    if (!isAdmin || published !== "false") {
      conditions.push(eq(eventsTable.published, true));
    }
    if (featured === "true") conditions.push(eq(eventsTable.featured, true));
    if (category && category !== "all") conditions.push(ilike(eventsTable.category, `%${category}%`));
    if (location && location !== "all") conditions.push(ilike(eventsTable.location, `%${location}%`));
    if (search) conditions.push(or(ilike(eventsTable.title, `%${search}%`), ilike(eventsTable.description, `%${search}%`)));
    const events = await db.select().from(eventsTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(eventsTable.eventDate))
      .limit(parseInt(limit))
      .offset(parseInt(offset));
    res.json(events);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.get("/events/:id", optionalAuth, async (req: AuthRequest, res) => {
  try {
    const isAdmin = req.user?.userType === "admin";
    const [e] = await db.select().from(eventsTable).where(eq(eventsTable.id, parseInt(req.params.id))).limit(1);
    if (!e) return res.status(404).json({ error: "Not found" });
    if (!e.published && !isAdmin) return res.status(404).json({ error: "Not found" });
    res.json(e);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.post("/events", requireAdmin, async (req, res) => {
  try {
    const [e] = await db.insert(eventsTable).values(req.body).returning();
    res.status(201).json(e);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.put("/events/:id", requireAdmin, async (req, res) => {
  try {
    const [e] = await db.update(eventsTable).set({ ...req.body, updatedAt: new Date() }).where(eq(eventsTable.id, parseInt(req.params.id))).returning();
    if (!e) return res.status(404).json({ error: "Not found" });
    res.json(e);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.delete("/events/:id", requireAdmin, async (req, res) => {
  try {
    await db.delete(eventsTable).where(eq(eventsTable.id, parseInt(req.params.id)));
    res.json({ success: true });
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

export default router;
