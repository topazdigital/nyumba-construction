# Nyumba Magazine — Deployment Guide
## Deploy to nyumba.impact.co.ke (Shared Hosting / cPanel)

---

## Overview

You have already pushed your code to GitHub. This guide covers exactly what to do next to get it live on your shared hosting cPanel account.

**Shared hosting means:**
- ✅ You CAN run a Node.js app (most modern shared hosts have "Setup Node.js App" in cPanel)
- ✅ You CAN use MySQL (already have `busines1_nyumba`)
- ❌ You do NOT have full root SSH like a VPS
- ✅ You CAN use FTP or File Manager to upload files (simplest method)

---

## STEP 1 — Set Up the Database

1. Log into cPanel (e.g. `rs6.rcnoc.com:2083`)
2. Go to **phpMyAdmin** → click **busines1_nyumba** in the left sidebar
3. Click **Import** tab → **Choose File** → select `nyumba-mysql.sql` from this project
4. Click **Go**

That creates all tables including the new `comments` table.

> **After import:** Admin login = `admin@nyumba.co.ke` / `admin123` — change this immediately!

---

## STEP 2 — Build the App (do this on Replit or your PC)

Open the Replit terminal and run:

```bash
# Build the React frontend
PORT=18977 BASE_PATH=/ pnpm --filter @workspace/nyumba run build

# Build the Node.js API
pnpm --filter @workspace/api-server run build
```

This creates:
- `artifacts/nyumba/dist/public/` → your website files (HTML, CSS, JS)
- `artifacts/api-server/dist/` → your API server files

---

## STEP 3 — Upload Files to cPanel

You have **3 options**. Pick the one that suits you:

---

### ✅ Option A: FTP with FileZilla (Recommended — easiest for many files)

FTP is like drag-and-drop file transfer between your computer and the server.

1. **Download FileZilla** (free): https://filezilla-project.org/
2. In FileZilla, go to **File → Site Manager → New Site**
3. Enter your FTP credentials (find these in cPanel → **FTP Accounts**):
   - **Host**: `rs6.rcnoc.com` (or your server hostname)
   - **Protocol**: FTP or SFTP
   - **Username**: your cPanel username (e.g. `busines1`)
   - **Password**: your cPanel password
4. Click **Connect**
5. On the right panel (server side), navigate to `public_html/`
6. On the left panel (your computer), navigate to `artifacts/nyumba/dist/public/`
7. **Select all files** in `dist/public/` and drag them to `public_html/`

> ⚠️ Make sure `index.html` ends up at `public_html/index.html`

---

### ✅ Option B: File Manager in cPanel (no extra software needed)

1. In cPanel → click **File Manager**
2. Navigate to `public_html/`
3. Click **Upload** → upload all files from `artifacts/nyumba/dist/public/`

**Tip for large folders:** Zip the `dist/public/` folder first, upload the zip, then right-click it in File Manager → **Extract**.

```bash
# On Replit terminal — zip it up
cd artifacts/nyumba/dist
zip -r nyumba-frontend.zip public/
```
Then upload `nyumba-frontend.zip` to `public_html/`, extract it, and move files up one level.

---

### ✅ Option C: cPanel Git Version Control (pulls directly from GitHub — no upload needed)

If your cPanel has **Git™ Version Control** (look under the Files section):

1. In cPanel → **Git™ Version Control** → **Create**
2. Set:
   - **Clone URL**: `https://github.com/YOUR_USERNAME/YOUR_REPO.git`
   - **Repository Path**: `/home/busines1/nyumba-repo` (NOT inside public_html)
   - **Repository Name**: `nyumba`
3. Click **Create** — it clones your repo
4. Then SSH into the repo folder and build (if you have SSH access):
   ```bash
   cd ~/nyumba-repo
   npm install -g pnpm
   PORT=80 BASE_PATH=/ pnpm --filter @workspace/nyumba run build
   cp -r artifacts/nyumba/dist/public/* ~/public_html/
   ```
5. To update later: cPanel → Git Version Control → **Update from Remote** → run build again

> **Note:** If your shared host doesn't show Git Version Control in cPanel, use Option A or B instead — those always work.

---

### ✅ Option D: GitHub Actions Auto-Deploy via FTP (push to GitHub = auto deploys)

Create this file in your GitHub repo at `.github/workflows/deploy.yml`:

```yaml
name: Deploy to cPanel
on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install pnpm
        run: npm install -g pnpm

      - name: Install dependencies
        run: pnpm install

      - name: Build frontend
        run: PORT=80 BASE_PATH=/ pnpm --filter @workspace/nyumba run build

      - name: Deploy to cPanel via FTP
        uses: SamKirkland/FTP-Deploy-Action@v4.3.5
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: artifacts/nyumba/dist/public/
          server-dir: /public_html/
```

Then in your GitHub repo → **Settings → Secrets and variables → Actions** → add:

| Secret Name | Value |
|---|---|
| `FTP_SERVER` | e.g. `rs6.rcnoc.com` |
| `FTP_USERNAME` | your cPanel FTP username |
| `FTP_PASSWORD` | your cPanel password |

After this, every `git push` to `main` automatically builds and uploads to your server. ✅

---

## STEP 4 — Deploy the Node.js API (the backend)

Your React site is static files — but the API (articles, properties, admin login) needs Node.js running.

### Check if your host has "Setup Node.js App"

1. Log into cPanel and search for **"Node.js"** or look under Software
2. If you see **Setup Node.js App** — great, follow the steps below
3. If you don't see it — contact your host and ask: *"Do you support Node.js apps? I need to run a Node.js 20 application."* Most modern shared hosts do (Namecheap, Hostinger, etc.)

### Setting up the Node.js App:

1. In cPanel → **Setup Node.js App** → **Create Application**
   - **Node.js version**: 20 (or latest available)
   - **Application mode**: Production
   - **Application root**: `api` (this creates `/home/busines1/api/`)
   - **Application URL**: `nyumba.impact.co.ke/api` (path-based) OR `api.nyumba.impact.co.ke` (subdomain)
   - **Application startup file**: `index.mjs`
2. Click **Create**

3. Upload your built API via FTP or File Manager:
   - Upload everything from `artifacts/api-server/dist/` to `/home/busines1/api/`
   - `index.mjs` should be at `/home/busines1/api/index.mjs`

4. Back in **Setup Node.js App** → your app → click **Run NPM Install**

5. Click **Environment Variables** and add:

| Variable | Value |
|---|---|
| `PORT` | The port cPanel assigns (shown in the app panel) |
| `NODE_ENV` | `production` |
| `DATABASE_URL` | `mysql2://DB_USER:DB_PASS@localhost:3306/busines1_nyumba` |
| `JWT_SECRET` | A strong random string (32+ characters) |

6. Click **Restart**

> **Finding your MySQL password:** cPanel → **MySQL Databases** → scroll to "Current Databases" — note the username assigned. If you don't know the password, you can set a new one for that user in the same page.

---

## STEP 5 — Set Up .htaccess for React Router

Without this, refreshing any page other than `/` gives a 404.

Create/edit `public_html/.htaccess`:

```apache
Options -MultiViews
RewriteEngine On

# Serve API through Node.js (if using path-based API on same domain)
RewriteCond %{REQUEST_URI} ^/api [NC]
RewriteRule ^ - [L]

# Serve static files directly
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d

# All other requests → React app
RewriteRule ^ index.html [QR,L]
```

---

## STEP 6 — Verify Everything Works

1. Visit `https://nyumba.impact.co.ke` — homepage loads ✅
2. Click any article → article detail page opens ✅
3. Visit `https://nyumba.impact.co.ke/admin` → login works ✅
4. Check API: `https://nyumba.impact.co.ke/api/health` → returns `{"ok":true}` ✅
5. Refresh any page (e.g. `/properties`) → page loads without 404 ✅

---

## Re-Deploying After Code Changes

### If using FTP (Options A/B):
```bash
# 1. Make changes, then rebuild
PORT=80 BASE_PATH=/ pnpm --filter @workspace/nyumba run build

# 2. Upload dist/public/ contents to public_html/ via FileZilla or File Manager
# 3. If API changed, rebuild API and upload dist/ to api folder, then Restart in Node.js App panel
```

### If using GitHub Actions (Option D):
```bash
git add .
git commit -m "Update: describe your changes"
git push origin main
# GitHub Actions automatically builds and uploads — done!
```

---

## Common Problems & Fixes

| Problem | Fix |
|---|---|
| White screen / blank page | Check `.htaccess` is in `public_html/` and correct |
| 404 on page refresh | Check `.htaccess` RewriteRule is set up correctly |
| API not responding | Check Node.js App is running in cPanel; check all env vars are set |
| Database connection error | Verify `DATABASE_URL` format; ensure DB user has ALL PRIVILEGES |
| Admin login fails | Check `JWT_SECRET` env var is set in Node.js App panel |
| Files uploaded but site unchanged | Clear browser cache (Ctrl+Shift+R) |
| FTP connection refused | Try passive mode in FileZilla (Transfer → Transfer Type → Passive) |
| "Setup Node.js App" not in cPanel | Contact your host — ask if Node.js is supported |

---

## Database Tables Reference

| Table | Purpose |
|---|---|
| `users` | Admin and registered user accounts |
| `articles` | Magazine articles and blog posts |
| `comments` | Article comments (moderated) |
| `properties` | Real estate listings |
| `professionals` | Architects, engineers, surveyors |
| `contractors` | Contractor company listings |
| `materials_suppliers` | Building materials suppliers |
| `events` | Industry events and exhibitions |
| `messages` | Contact form submissions |
| `site_settings` | Admin-editable site config |
| `homepage_slider` | Sidebar slider items |
| `newsletter_subscribers` | Email newsletter signups |

---

## Admin Credentials

- **URL**: `https://nyumba.impact.co.ke/admin`
- **Email**: `admin@nyumba.co.ke`
- **Password**: `admin123` ← **CHANGE THIS IMMEDIATELY after first login**

---

## Quick Summary — What To Do Right Now

Since you've already pushed to GitHub, here's the shortest path to go live:

```
1. Import nyumba-mysql.sql into phpMyAdmin (busines1_nyumba)
2. Build the app on Replit:
      PORT=80 BASE_PATH=/ pnpm --filter @workspace/nyumba run build
3. Upload artifacts/nyumba/dist/public/ to public_html/ via FileZilla or File Manager
4. Set up Node.js App in cPanel for the API backend
5. Upload artifacts/api-server/dist/ to your api folder
6. Set environment variables in Node.js App panel
7. Add .htaccess to public_html/
8. Visit your site!
```
