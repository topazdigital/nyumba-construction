import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const url = process.env.DATABASE_URL;
const host = process.env.DB_HOST || "localhost";
const user = process.env.DB_USER;
const password = process.env.DB_PASS || process.env.DB_PASSWORD || "";
const database = process.env.DB_NAME;
const port = parseInt(process.env.DB_PORT || "3306");

if (!url && (!user || !database)) {
  throw new Error("Database not configured. Set DATABASE_URL (mysql://...) or DB_HOST/DB_USER/DB_PASS/DB_NAME environment variables.");
}

if (url && (url.startsWith("postgres://") || url.startsWith("postgresql://"))) {
  console.error(
    "[DB] WARNING: DATABASE_URL is a PostgreSQL URL but this app uses MySQL. " +
    "Database queries will fail. Set DATABASE_URL to mysql://user:pass@host:3306/dbname"
  );
}

export const pool = url
  ? mysql.createPool(url)
  : mysql.createPool({ host, user, password, database, port, waitForConnections: true, connectionLimit: 10 });

export const db = drizzle(pool, { schema, mode: "default" });

export * from "./schema";
