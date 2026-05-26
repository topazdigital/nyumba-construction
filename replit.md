# Nyumba Magazine

Kenya's premier construction industry magazine and property hub — connecting architects, engineers, contractors, and property buyers across Kenya.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server
- `pnpm --filter @workspace/nyumba run dev` — run the frontend
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm --filter @workspace/db run push` — push DB schema changes (requires MySQL DATABASE_URL)
- Required env: `DATABASE_URL` — MySQL connection string: `mysql://user:pass@host:3306/dbname`

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 18 + Vite + Tailwind CSS v3 + react-router-dom
- API: Express 5
- DB: **MySQL** + Drizzle ORM (mysql2 driver)
- Auth: JWT tokens stored in localStorage, bcrypt password hashing

## Where things live

- `artifacts/nyumba/src/` — React frontend
  - `pages/` — all page components (Home, News, Properties, Professionals, etc.)
  - `components/` — Layout, Auth, Home sub-components
  - `contexts/AuthContext.tsx` — JWT auth context
- `artifacts/api-server/src/routes/` — API routes (auth, articles, properties, etc.)
- `lib/db/src/schema/` — 12 MySQL schema files (Drizzle)
- `lib/db/src/index.ts` — MySQL connection (mysql2/promise pool)
- `lib/db/drizzle.config.ts` — Drizzle config (dialect: "mysql")

## Architecture decisions

- Frontend uses react-router-dom with `basename` from `import.meta.env.BASE_URL` for Replit proxy routing
- Auth calls go to `/api/auth/*` (relative URLs routed through Replit's shared proxy to api-server)
- Tailwind v3 used (original Bolt project) — configured via postcss in vite.config.ts
- JWT_SECRET should be set as a Replit secret in production
- MySQL dialect — all schema uses `mysqlTable`, `int`, `varchar` from `drizzle-orm/mysql-core`
- No `.returning()` on INSERT/UPDATE/DELETE — MySQL uses `.$returningId()` + select
- `onDuplicateKeyUpdate` instead of `onConflictDoUpdate`/`onConflictDoNothing`

## Product

- Home page: Featured articles, trending stories, magazine hero
- Real Estate: Property listings with search/filter, property detail pages
- Professionals: Directory of architects, structural engineers, contractors
- Materials & Suppliers: Construction materials marketplace
- News/Features/Projects/Events: Magazine content sections
- Flip Copy: Digital magazine reader
- Auth: Sign in / Register
- Admin: Dashboard for site management
- Submit Listing: Property/professional listing submission

## Admin bootstrap

The seed script creates the default admin account:
- Email: `admin@nyumba.co.ke`
- Password: `admin123`

For cPanel / fresh MySQL environment:
1. Import `nyumba-mysql.sql` via phpMyAdmin into `busines1_nyumba`
2. Or: set `DATABASE_URL=mysql://user:pass@host:3306/dbname` then run `pnpm --filter @workspace/db run push`
3. Run `pnpm --filter @workspace/db run seed` to seed sample data + admin user
4. Sign in at `/auth` with the admin credentials above
5. Admin panel is at `/admin`

Change the admin password via the Admin → Settings tab after first login.

## cPanel Deployment

Ready-to-deploy package: `nyumba-cpanel.zip`
- Contains: built API (`dist/`), built frontend (`dist/public/`), DB schema (`nyumba-mysql.sql`), instructions (`DEPLOYMENT_GUIDE.md`)
- cPanel needs: Node.js App Manager pointing to `dist/index.mjs`, env vars `DATABASE_URL`, `JWT_SECRET`, `PORT`
- Full instructions in `DEPLOYMENT_GUIDE.md`

## Development with MySQL

For local/Replit development, set `DATABASE_URL` to a MySQL server:
- cPanel remote MySQL (if allowed): `mysql://busines1_user:pass@your-server.com:3306/busines1_nyumba`
- Or use a free MySQL cloud service (PlanetScale, db4free.net, etc.)
- Replit auto-provisions PostgreSQL — **this app no longer uses PostgreSQL**

## Gotchas

- Self-signup cannot create admin accounts (enforced server-side allowlist)
- DATABASE_URL must be a MySQL URL (`mysql://...`), not PostgreSQL
- Run `pnpm --filter @workspace/db run push` after any schema changes (requires live MySQL URL)
- Tailwind v3 (not v4) — do NOT use `@tailwindcss/vite` plugin
- `JWT_SECRET` env var should be set as a Replit secret before deploying
- mysql2 must be installed in BOTH `lib/db` and `artifacts/api-server` (it's marked external in esbuild)
