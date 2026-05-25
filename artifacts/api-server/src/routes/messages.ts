import { Router } from "express";
import { db } from "@workspace/db";
import { messagesTable, newsletterTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";

const router = Router();

router.get("/messages", async (req, res) => {
  try {
    const messages = await db.select().from(messagesTable).orderBy(desc(messagesTable.createdAt)).limit(100);
    res.json(messages);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.post("/messages", async (req, res) => {
  try {
    const [m] = await db.insert(messagesTable).values(req.body).returning();
    res.status(201).json(m);
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.put("/messages/:id/read", async (req, res) => {
  try {
    await db.update(messagesTable).set({ readStatus: true }).where(eq(messagesTable.id, parseInt(req.params.id)));
    res.json({ success: true });
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.delete("/messages/:id", async (req, res) => {
  try {
    await db.delete(messagesTable).where(eq(messagesTable.id, parseInt(req.params.id)));
    res.json({ success: true });
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

router.post("/newsletter/subscribe", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email required" });
    await db.insert(newsletterTable).values({ email }).onConflictDoNothing();
    res.json({ success: true, message: "Subscribed successfully" });
  } catch (err) { req.log.error(err); res.status(500).json({ error: "Server error" }); }
});

export default router;
