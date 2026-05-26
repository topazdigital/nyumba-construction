import { mysqlTable, int, varchar, text, boolean, timestamp } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const advertisementsTable = mysqlTable("advertisements", {
  id: int("id").autoincrement().primaryKey(),
  label: varchar("label", { length: 50 }).notNull().default("SPONSORED"),
  headline: varchar("headline", { length: 255 }).notNull(),
  sub: text("sub"),
  cta: varchar("cta", { length: 100 }).notNull().default("Learn More"),
  ctaLink: varchar("cta_link", { length: 500 }).notNull().default("#"),
  phone: varchar("phone", { length: 30 }),
  imageUrl: varchar("image_url", { length: 500 }),
  bg: varchar("bg", { length: 100 }).default("from-gray-800 to-gray-900"),
  accent: varchar("accent", { length: 100 }).default("bg-yellow-400 text-gray-900"),
  active: boolean("active").default(true),
  sortOrder: int("sort_order").default(0),
  clicks: int("clicks").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertAdvertisementSchema = createInsertSchema(advertisementsTable).omit({ id: true, createdAt: true, updatedAt: true, clicks: true });
export type InsertAdvertisement = z.infer<typeof insertAdvertisementSchema>;
export type Advertisement = typeof advertisementsTable.$inferSelect;
