import { pgTable, serial, varchar, text, boolean, integer, decimal, json, timestamp, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const eventsTable = pgTable("events", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  eventDate: varchar("event_date", { length: 20 }).notNull(),
  eventTime: varchar("event_time", { length: 20 }),
  endDate: varchar("end_date", { length: 20 }),
  location: varchar("location", { length: 255 }).notNull(),
  venue: varchar("venue", { length: 255 }),
  price: decimal("price", { precision: 10, scale: 2 }).default("0"),
  image: varchar("image", { length: 500 }),
  organizer: varchar("organizer", { length: 255 }),
  attendees: integer("attendees").default(0),
  speakers: json("speakers").$type<string[]>().default([]),
  featured: boolean("featured").default(false),
  status: varchar("status", { length: 20 }).default("upcoming"),
  website: varchar("website", { length: 255 }),
  published: boolean("published").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertEventSchema = createInsertSchema(eventsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof eventsTable.$inferSelect;
