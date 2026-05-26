import { mysqlTable, int, varchar, text, boolean, decimal, json, timestamp } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const suppliersTable = mysqlTable("materials_suppliers", {
  id: int("id").autoincrement().primaryKey(),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  contactPerson: varchar("contact_person", { length: 255 }).notNull(),
  categories: json("categories").$type<string[]>().default([]),
  products: json("products").$type<string[]>().default([]),
  description: text("description"),
  location: varchar("location", { length: 255 }),
  website: varchar("website", { length: 255 }),
  establishedYear: int("established_year"),
  employees: int("employees"),
  deliveryRadius: int("delivery_radius"),
  minOrderAmount: decimal("min_order_amount", { precision: 10, scale: 2 }),
  paymentTerms: varchar("payment_terms", { length: 100 }),
  image: varchar("image", { length: 500 }),
  contactPhone: varchar("contact_phone", { length: 20 }),
  contactEmail: varchar("contact_email", { length: 255 }),
  verified: boolean("verified").default(false),
  published: boolean("published").default(false),
  rating: varchar("rating", { length: 10 }).default("0"),
  reviews: int("reviews").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertSupplierSchema = createInsertSchema(suppliersTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertSupplier = z.infer<typeof insertSupplierSchema>;
export type Supplier = typeof suppliersTable.$inferSelect;
