import { pgTable, serial, varchar, text, boolean, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const siteSettingsTable = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  settingKey: varchar("setting_key", { length: 100 }).unique().notNull(),
  settingValue: text("setting_value"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const homepageSliderTable = pgTable("homepage_slider", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  fileType: varchar("file_type", { length: 10 }).notNull().default("image"),
  filePath: varchar("file_path", { length: 500 }).notNull(),
  imagePath: varchar("image_path", { length: 500 }),
  active: boolean("active").default(true),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSliderSchema = createInsertSchema(homepageSliderTable).omit({ id: true, createdAt: true });
export type InsertSlider = z.infer<typeof insertSliderSchema>;
export type Slider = typeof homepageSliderTable.$inferSelect;
