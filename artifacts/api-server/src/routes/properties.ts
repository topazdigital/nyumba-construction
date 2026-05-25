import { Router } from "express";
import { db } from "@workspace/db";
import { propertiesTable } from "@workspace/db";
import { eq, desc, ilike, or, sql } from "drizzle-orm";

const router = Router();

router.get("/properties", async (req, res) => {
  try {
    const { type, location, search, featured, published = "true", limit = "20", offset = "0" } = req.query as Record<string, string>;
    const conditions: any[] = [];
    if (published === "true") conditions.push(eq(propertiesTable.published, true));
    if (featured === "true") conditions.push(eq(propertiesTable.featured, true));
    if (type && type !== "all") conditions.push(eq(propertiesTable.propertyType, type));
    if (location && location !== "all") conditions.push(ilike(propertiesTable.location, `%${location}%`));
    if (search) conditions.push(or(ilike(propertiesTable.title, `%${search}%`), ilike(propertiesTable.location, `%${search}%`)));
    const properties = await db.select().from(propertiesTable)
      .where(conditions.length > 0 ? sql`${conditions.reduce((a, b) => sql`${a} AND ${b}`)}` : undefined)
      .orderBy(desc(propertiesTable.createdAt))
      .limit(parseInt(limit))
      .offset(parseInt(offset));
    res.json(properties);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.get("/properties/:id", async (req, res) => {
  try {
    const [property] = await db.select().from(propertiesTable).where(eq(propertiesTable.id, parseInt(req.params.id))).limit(1);
    if (!property) return res.status(404).json({ error: "Not found" });
    await db.update(propertiesTable).set({ views: (property.views || 0) + 1 }).where(eq(propertiesTable.id, property.id));
    res.json({ ...property, views: (property.views || 0) + 1 });
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.post("/properties", async (req, res) => {
  try {
    const [property] = await db.insert(propertiesTable).values(req.body).returning();
    res.status(201).json(property);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.put("/properties/:id", async (req, res) => {
  try {
    const [property] = await db.update(propertiesTable).set({ ...req.body, updatedAt: new Date() }).where(eq(propertiesTable.id, parseInt(req.params.id))).returning();
    if (!property) return res.status(404).json({ error: "Not found" });
    res.json(property);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.delete("/properties/:id", async (req, res) => {
  try {
    await db.delete(propertiesTable).where(eq(propertiesTable.id, parseInt(req.params.id)));
    res.json({ success: true });
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

export default router;
