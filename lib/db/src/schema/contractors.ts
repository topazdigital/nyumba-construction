import { pgTable, serial, varchar, text, boolean, integer, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const contractorsTable = pgTable("contractors", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  contractorType: varchar("contractor_type", { length: 100 }).notNull(),
  location: varchar("location", { length: 255 }),
  description: text("description"),
  services: json("services").$type<string[]>().default([]),
  licenseNumber: varchar("license_number", { length: 100 }),
  insurance: boolean("insurance").default(false),
  bond: boolean("bond").default(false),
  employees: integer("employees"),
  projectsCompleted: integer("projects_completed").default(0),
  experienceYears: integer("experience_years"),
  image: varchar("image", { length: 500 }),
  contactPhone: varchar("contact_phone", { length: 20 }),
  contactEmail: varchar("contact_email", { length: 255 }),
  website: varchar("website", { length: 255 }),
  verified: boolean("verified").default(false),
  published: boolean("published").default(false),
  rating: varchar("rating", { length: 10 }).default("0"),
  reviews: integer("reviews").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertContractorSchema = createInsertSchema(contractorsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertContractor = z.infer<typeof insertContractorSchema>;
export type Contractor = typeof contractorsTable.$inferSelect;
