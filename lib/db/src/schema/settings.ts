import { mysqlTable, int, varchar, text, boolean, timestamp } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const siteSettingsTable = mysqlTable("site_settings", {
  id: int("id").autoincrement().primaryKey(),
  settingKey: varchar("setting_key", { length: 100 }).unique().notNull(),
  settingValue: text("setting_value"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const homepageSliderTable = mysqlTable("homepage_slider", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  fileType: varchar("file_type", { length: 10 }).notNull().default("image"),
  filePath: varchar("file_path", { length: 500 }).notNull(),
  imagePath: varchar("image_path", { length: 500 }),
  active: boolean("active").default(true),
  sortOrder: int("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSliderSchema = createInsertSchema(homepageSliderTable).omit({ id: true, createdAt: true });
export type InsertSlider = z.infer<typeof insertSliderSchema>;
export type Slider = typeof homepageSliderTable.$inferSelect;
