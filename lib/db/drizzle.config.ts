import { defineConfig } from "drizzle-kit";
import path from "path";

const url = process.env.DATABASE_URL;
const host = process.env.DB_HOST || "localhost";
const user = process.env.DB_USER;
const password = process.env.DB_PASS || process.env.DB_PASSWORD || "";
const database = process.env.DB_NAME;
const port = parseInt(process.env.DB_PORT || "3306");

if (!url && (!user || !database)) {
  throw new Error("Set DATABASE_URL or DB_HOST/DB_USER/DB_PASS/DB_NAME");
}

export default defineConfig({
  schema: path.join(__dirname, "./src/schema/index.ts"),
  dialect: "mysql",
  dbCredentials: url
    ? { url }
    : { host, user: user!, password, database: database!, port },
});
