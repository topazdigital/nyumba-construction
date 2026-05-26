import { Router } from "express";
import { db } from "@workspace/db";
import { messagesTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { requireAdmin } from "../middleware/auth";

const qs = (v: unknown): string => String(Array.isArray(v) ? v[0] : v ?? "");

const router = Router();

router.get("/messages", requireAdmin, async (req, res) => {
  try {
    const messages = await db.select().from(messagesTable).orderBy(desc(messagesTable.createdAt)).limit(100);
    res.json(messages);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.post("/messages", async (req, res) => {
  try {
    const [{ id }] = await db.insert(messagesTable).values(req.body).$returningId();
    const [m] = await db.select().from(messagesTable).where(eq(messagesTable.id, id)).limit(1);
    res.status(201).json(m);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.put("/messages/:id/read", requireAdmin, async (req, res) => {
  try {
    await db.update(messagesTable).set({ readStatus: true }).where(eq(messagesTable.id, parseInt(qs(req.params.id))));
    res.json({ success: true });
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.delete("/messages/:id", requireAdmin, async (req, res) => {
  try {
    await db.delete(messagesTable).where(eq(messagesTable.id, parseInt(qs(req.params.id))));
    res.json({ success: true });
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

export default router;
