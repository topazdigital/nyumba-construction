import { mysqlTable, int, varchar, text, boolean, decimal, json, timestamp } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const professionalsTable = mysqlTable("professionals", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  profession: varchar("profession", { length: 100 }).notNull(),
  company: varchar("company", { length: 255 }),
  location: varchar("location", { length: 255 }),
  description: text("description"),
  specialties: json("specialties").$type<string[]>().default([]),
  experienceYears: int("experience_years"),
  hourlyRate: decimal("hourly_rate", { precision: 10, scale: 2 }),
  certifications: json("certifications").$type<string[]>().default([]),
  image: varchar("image", { length: 500 }),
  contactPhone: varchar("contact_phone", { length: 20 }),
  contactEmail: varchar("contact_email", { length: 255 }),
  website: varchar("website", { length: 255 }),
  verified: boolean("verified").default(false),
  published: boolean("published").default(false),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0"),
  reviews: int("reviews").default(0),
  projects: int("projects").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertProfessionalSchema = createInsertSchema(professionalsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertProfessional = z.infer<typeof insertProfessionalSchema>;
export type Professional = typeof professionalsTable.$inferSelect;
