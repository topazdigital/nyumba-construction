import { Router } from "express";
import { db } from "@workspace/db";
import { professionalsTable } from "@workspace/db";
import { eq, desc, ilike, or, sql } from "drizzle-orm";

const router = Router();

router.get("/professionals", async (req, res) => {
  try {
    const { profession, location, search, verified, published = "true", limit = "20", offset = "0" } = req.query as Record<string, string>;
    const conditions: any[] = [];
    if (published === "true") conditions.push(eq(professionalsTable.published, true));
    if (verified === "true") conditions.push(eq(professionalsTable.verified, true));
    if (profession && profession !== "all") conditions.push(ilike(professionalsTable.profession, `%${profession}%`));
    if (location && location !== "all") conditions.push(ilike(professionalsTable.location, `%${location}%`));
    if (search) conditions.push(or(ilike(professionalsTable.name, `%${search}%`), ilike(professionalsTable.company, `%${search}%`)));
    const professionals = await db.select().from(professionalsTable)
      .where(conditions.length > 0 ? sql`${conditions.reduce((a, b) => sql`${a} AND ${b}`)}` : undefined)
      .orderBy(desc(professionalsTable.createdAt))
      .limit(parseInt(limit))
      .offset(parseInt(offset));
    res.json(professionals);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.get("/professionals/:id", async (req, res) => {
  try {
    const [p] = await db.select().from(professionalsTable).where(eq(professionalsTable.id, parseInt(req.params.id))).limit(1);
    if (!p) return res.status(404).json({ error: "Not found" });
    res.json(p);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.post("/professionals", async (req, res) => {
  try {
    const [p] = await db.insert(professionalsTable).values(req.body).returning();
    res.status(201).json(p);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.put("/professionals/:id", async (req, res) => {
  try {
    const [p] = await db.update(professionalsTable).set({ ...req.body, updatedAt: new Date() }).where(eq(professionalsTable.id, parseInt(req.params.id))).returning();
    if (!p) return res.status(404).json({ error: "Not found" });
    res.json(p);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.delete("/professionals/:id", async (req, res) => {
  try {
    await db.delete(professionalsTable).where(eq(professionalsTable.id, parseInt(req.params.id)));
    res.json({ success: true });
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

export default router;
