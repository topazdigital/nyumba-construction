import { mysqlTable, int, varchar, text, boolean, decimal, json, timestamp } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const propertiesTable = mysqlTable("properties", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 15, scale: 2 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  propertyType: varchar("property_type", { length: 100 }).notNull(),
  bedrooms: int("bedrooms"),
  bathrooms: int("bathrooms"),
  area: decimal("area", { precision: 10, scale: 2 }),
  images: json("images").$type<string[]>().default([]),
  amenities: json("amenities").$type<string[]>().default([]),
  contactName: varchar("contact_name", { length: 255 }),
  contactPhone: varchar("contact_phone", { length: 20 }),
  contactEmail: varchar("contact_email", { length: 255 }),
  agent: varchar("agent", { length: 255 }),
  published: boolean("published").default(false),
  featured: boolean("featured").default(false),
  views: int("views").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertPropertySchema = createInsertSchema(propertiesTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Property = typeof propertiesTable.$inferSelect;
