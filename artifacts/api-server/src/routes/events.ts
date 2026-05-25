import { Router } from "express";
import { db } from "@workspace/db";
import { eventsTable } from "@workspace/db";
import { eq, desc, ilike, or, sql } from "drizzle-orm";

const router = Router();

router.get("/events", async (req, res) => {
  try {
    const { category, location, search, featured, published = "true", limit = "20", offset = "0" } = req.query as Record<string, string>;
    const conditions: any[] = [];
    if (published === "true") conditions.push(eq(eventsTable.published, true));
    if (featured === "true") conditions.push(eq(eventsTable.featured, true));
    if (category && category !== "all") conditions.push(ilike(eventsTable.category, `%${category}%`));
    if (location && location !== "all") conditions.push(ilike(eventsTable.location, `%${location}%`));
    if (search) conditions.push(or(ilike(eventsTable.title, `%${search}%`), ilike(eventsTable.description, `%${search}%`)));
    const events = await db.select().from(eventsTable)
      .where(conditions.length > 0 ? sql`${conditions.reduce((a, b) => sql`${a} AND ${b}`)}` : undefined)
      .orderBy(desc(eventsTable.eventDate))
      .limit(parseInt(limit))
      .offset(parseInt(offset));
    res.json(events);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.get("/events/:id", async (req, res) => {
  try {
    const [e] = await db.select().from(eventsTable).where(eq(eventsTable.id, parseInt(req.params.id))).limit(1);
    if (!e) return res.status(404).json({ error: "Not found" });
    res.json(e);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.post("/events", async (req, res) => {
  try {
    const [e] = await db.insert(eventsTable).values(req.body).returning();
    res.status(201).json(e);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.put("/events/:id", async (req, res) => {
  try {
    const [e] = await db.update(eventsTable).set({ ...req.body, updatedAt: new Date() }).where(eq(eventsTable.id, parseInt(req.params.id))).returning();
    if (!e) return res.status(404).json({ error: "Not found" });
    res.json(e);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.delete("/events/:id", async (req, res) => {
  try {
    await db.delete(eventsTable).where(eq(eventsTable.id, parseInt(req.params.id)));
    res.json({ success: true });
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

export default router;
