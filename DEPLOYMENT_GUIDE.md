# Nyumba Magazine — Full Deployment Guide
## Deploy to nyumba.impact.co.ke with Database busines1_nyumba

---

## Overview

This guide covers everything from pushing code from GitHub to deploying on cPanel at **nyumba.impact.co.ke** using the database **busines1_nyumba**.

**Two-part deployment:**
1. **Database** → Import `nyumba-mysql.sql` into `busines1_nyumba` via phpMyAdmin
2. **Frontend** → Build React app → upload to `public_html/` via cPanel File Manager
3. **API** → Deploy Node.js backend via cPanel Node.js App

---

## STEP 1 — Set Up MySQL Database in cPanel

1. Log into **cPanel** at `rs6.rcnoc.com:2083` (or your cPanel login URL)
2. Go to **MySQL Databases**
3. You already have `busines1_nyumba` — skip creation if it exists
4. Go to **phpMyAdmin** → in the left panel, click **busines1_nyumba**
5. **IMPORTANT**: Before importing, drop all existing tables (since you said you're deleting everything):
   - Click **Operations** tab → scroll down → click **Drop the database** — OR —
   - Select all tables → With selected: **Drop**
6. Click **Import** → **Choose File** → select `nyumba-mysql.sql` from this project
7. Click **Go** — all tables and sample data will be created

**After import, you will have:**
- Admin user: `admin@nyumba.co.ke` / password: `admin123`
- Sample articles, properties, professionals, contractors, suppliers, events

> ⚠️ **Change the admin password immediately** after first login via Admin → Settings → Change Password

---

## STEP 2 — Push Code from GitHub to cPanel

### Option A: Git Version Control in cPanel (Recommended)

Many cPanel installations support Git deployment directly:

1. In cPanel, look for **Git™ Version Control** (under Files)
2. Click **Create**
3. Set:
   - **Clone URL**: your GitHub repo URL (e.g. `https://github.com/yourusername/nyumba.git`)
   - **Repository Path**: e.g. `/home/username/nyumba-repo` (a private folder, NOT public_html)
   - **Repository Name**: `nyumba`
4. Click **Create**
5. To pull updates later: open the repo → click **Update from Remote** (or **Pull**)

> If Git is not available in your cPanel, use Option B below.

### Option B: Manual Upload via File Manager

1. On your local machine / Replit terminal, build the frontend:
   ```bash
   cd artifacts/nyumba
   pnpm run build
   ```
2. This creates `artifacts/nyumba/dist/` with all static files
3. In **cPanel → File Manager**, navigate to `public_html/`
4. Delete all existing files in `public_html/` (since you're starting fresh)
5. Upload ALL files from `artifacts/nyumba/dist/` to `public_html/`
   - Make sure `index.html` is at `public_html/index.html`
   - Upload the `assets/` subfolder too
6. Upload the API: copy `artifacts/api-server/` contents to `public_html/api/` (or a separate app folder)

### Option C: Deploy via GitHub Actions (CI/CD)

Create `.github/workflows/deploy.yml` in your repo:

```yaml
name: Deploy to cPanel
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm install -g pnpm
      - run: pnpm install
      - run: pnpm --filter @workspace/nyumba run build
      - name: Deploy to cPanel via FTP
        uses: SamKirkland/FTP-Deploy-Action@v4.3.4
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: artifacts/nyumba/dist/
          server-dir: /public_html/
```

Add these secrets in your GitHub repo (Settings → Secrets):
- `FTP_SERVER`: your hosting FTP server (e.g. `rs6.rcnoc.com`)
- `FTP_USERNAME`: your cPanel FTP username
- `FTP_PASSWORD`: your cPanel FTP or cPanel password

---

## STEP 3 — Build the React Frontend (if doing manually)

In your **Replit terminal** or local machine:

```bash
# Install dependencies (if not already done)
pnpm install

# Build the frontend
pnpm --filter @workspace/nyumba run build
```

Output will be in `artifacts/nyumba/dist/` — these are the files to upload to `public_html/`.

---

## STEP 4 — Deploy the Node.js API

### Option A: cPanel Node.js App (if your host supports it)

1. In cPanel, go to **Setup Node.js App**
2. Click **Create Application**:
   - **Node.js version**: 18 or 20
   - **Application mode**: Production
   - **Application root**: `/home/username/api` (create this folder separately from public_html)
   - **Application URL**: subdomain like `api.nyumba.impact.co.ke` OR a path like `nyumba.impact.co.ke/api`
   - **Application startup file**: `index.mjs`
3. Upload the compiled API (build it first):
   ```bash
   pnpm --filter @workspace/api-server run build
   ```
   Then upload contents of `artifacts/api-server/dist/` to the api folder
4. In the Node.js App panel, click **Run NPM Install**
5. Set environment variables (see Step 5)
6. Click **Restart**

### Option B: Via Subdomain

1. In cPanel → **Subdomains**, create `api.nyumba.impact.co.ke`
2. Point it to the api folder (e.g. `/home/username/api`)
3. Follow Option A steps above

---

## STEP 5 — Set Environment Variables

In the **Node.js App** panel → **Environment Variables**, add:

| Variable | Value |
|---|---|
| `DATABASE_URL` | `mysql://busines1_nyumba_user:YOUR_PASSWORD@localhost:3306/busines1_nyumba` |
| `JWT_SECRET` | A long random string, minimum 32 characters (generate at random.org) |
| `NODE_ENV` | `production` |
| `PORT` | `8080` (or whatever cPanel assigns) |

> **Finding database credentials**: cPanel → MySQL Databases → note the username and password you assigned to `busines1_nyumba`

---

## STEP 6 — Configure .htaccess for React Router

Create or update `public_html/.htaccess`:

```apache
Options -MultiViews
RewriteEngine On

# Serve static files directly
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d

# Send all other requests to index.html (React Router)
RewriteRule ^ index.html [QR,L]
```

This ensures page refreshes work correctly on all routes (e.g. `/admin`, `/properties/1`).

---

## STEP 7 — Configure API URL in Frontend

The frontend uses relative `/api/` paths which work when both frontend and API are on the same domain.

**If your API is on a subdomain** (e.g. `api.nyumba.impact.co.ke`):

Edit `artifacts/nyumba/src/lib/api.ts` (or wherever API calls are made) and change:
```
/api/
```
to:
```
https://api.nyumba.impact.co.ke/api/
```

Then rebuild: `pnpm --filter @workspace/nyumba run build`

---

## STEP 8 — Verify Deployment

1. Visit `https://nyumba.impact.co.ke` — homepage should load
2. Visit `https://nyumba.impact.co.ke/admin` — login with `admin@nyumba.co.ke` / `admin123`
3. Check API health: `https://nyumba.impact.co.ke/api/health`
4. Create a test article via Admin panel and verify it appears on the homepage
5. Register a new user via `/auth` and verify it appears in Admin → Settings (user count)
6. Submit a contact form and verify it appears in Admin → Messages

---

## STEP 9 — After Going Live (Security Checklist)

- [ ] Change admin password via Admin → Settings → Change Password
- [ ] Set a strong `JWT_SECRET` environment variable (not the default)
- [ ] Verify HTTPS is enabled (`https://` not `http://`)
- [ ] Test all pages work after page refresh (htaccess routing)
- [ ] Test the contact form saves to Messages
- [ ] Test new user registration saves to database
- [ ] Test adding a property from Submit Listing page

---

## Common Issues & Fixes

| Problem | Solution |
|---|---|
| White screen on page refresh | Check `.htaccess` file is in `public_html/` |
| API calls failing (404) | Check Node.js App is running; check `DATABASE_URL` env var |
| Database connection error | Verify username/password in `DATABASE_URL`; check user has ALL PRIVILEGES on `busines1_nyumba` |
| Admin login fails | Verify `JWT_SECRET` is set; try re-importing `nyumba-mysql.sql` |
| Images not loading | Images use external URLs (Pexels CDN) — verify internet connectivity |
| `.htaccess` redirect loop | Add `RewriteCond %{REQUEST_FILENAME} !-f` before the rewrite rule |
| 500 error on API | Check Node.js App logs in cPanel; verify all env variables are set |

---

## Re-Deploying After Code Changes

```bash
# On Replit / local machine:

# 1. Make your changes in code

# 2. Rebuild frontend
pnpm --filter @workspace/nyumba run build

# 3. Rebuild API (if API changed)
pnpm --filter @workspace/api-server run build

# 4. Upload dist/ files to public_html/ via File Manager
# 5. Upload new API files to api folder
# 6. In cPanel Node.js App → Restart

# OR push to GitHub and let GitHub Actions deploy automatically
git add .
git commit -m "Update: describe your changes"
git push origin main
```

---

## Admin Credentials

- **URL**: `https://nyumba.impact.co.ke/admin`
- **Email**: `admin@nyumba.co.ke`
- **Password**: `admin123` ← **CHANGE THIS IMMEDIATELY**

---

## Database: busines1_nyumba — Table Reference

| Table | Purpose |
|---|---|
| `users` | Registered users and admin accounts |
| `articles` | Magazine articles and blog posts |
| `properties` | Real estate listings |
| `professionals` | Architect, engineer, surveyor profiles |
| `contractors` | Contractor company listings |
| `materials_suppliers` | Building materials and suppliers |
| `events` | Industry events and exhibitions |
| `messages` | Contact form submissions |
| `site_settings` | Configurable site settings (admin-editable) |
| `homepage_slider` | Sidebar resource slider items |
| `newsletter_subscribers` | Email newsletter signups |

---

## Next Admin Handover Notes

When handing over to a new admin:
1. Give them the cPanel login credentials (separate from the app)
2. The admin panel is at `https://nyumba.impact.co.ke/admin`
3. Create a new admin account via phpMyAdmin:
   ```sql
   INSERT INTO users (email, password_hash, first_name, last_name, role, user_type)
   VALUES ('newadmin@email.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lh.W', 'New', 'Admin', 'admin', 'admin');
   ```
   (This sets password to `admin123` — new admin must change it on first login)
4. All settings are configurable via Admin → Settings without touching code
5. To add articles, properties, events: use Admin Dashboard → respective tab → New button
