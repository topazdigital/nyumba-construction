# Nyumba Magazine

Kenya's premier construction industry magazine and property hub — connecting architects, engineers, contractors, and property buyers across Kenya.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server
- `pnpm --filter @workspace/nyumba run dev` — run the frontend
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string (auto-provisioned)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 18 + Vite + Tailwind CSS v3 + react-router-dom
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Auth: JWT tokens stored in localStorage, bcrypt password hashing

## Where things live

- `artifacts/nyumba/src/` — React frontend
  - `pages/` — all page components (Home, News, Properties, Professionals, etc.)
  - `components/` — Layout, Auth, Home sub-components
  - `contexts/AuthContext.tsx` — JWT auth context
- `artifacts/api-server/src/routes/` — API routes (auth.ts, health.ts)
- `lib/db/src/schema/users.ts` — users table schema (Drizzle)

## Architecture decisions

- Frontend uses react-router-dom with `basename` from `import.meta.env.BASE_URL` for Replit proxy routing
- Auth calls go to `/api/auth/*` (relative URLs routed through Replit's shared proxy to api-server)
- Tailwind v3 used (original Bolt project) — configured via postcss in vite.config.ts
- Frontend content (properties, professionals, articles) is static/mock data in the components themselves
- JWT_SECRET should be set as a Replit secret in production

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

## Gotchas

- Default admin credentials: admin@nyumba.co.ke / admin123
- The API backend uses PostgreSQL; the Replit DB must be provisioned
- Run `pnpm --filter @workspace/db run push` after schema changes
- Tailwind v3 (not v4) — do NOT use `@tailwindcss/vite` plugin
