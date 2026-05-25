# Nyumba Magazine — cPanel Deployment Guide

## Overview
This guide explains how to deploy the Nyumba Magazine website to a cPanel shared hosting server.

The site has two parts:
1. **Frontend** — a static React build (HTML/CSS/JS files)
2. **Backend API** — a Node.js/Express server
3. **Database** — MySQL (via phpMyAdmin on your host)

---

## Step 1: Import the MySQL Database

1. Log into **cPanel** on your hosting account
2. Go to **MySQL Databases** → create a new database, e.g. `nyumba_db`
3. Create a new **MySQL user** and assign it full privileges on `nyumba_db`
4. Go to **phpMyAdmin** → select your new database → click **Import**
5. Upload the file `nyumba-mysql.sql` from this project
6. Click **Go** — all tables and sample data will be created

> ⚠️ After import, update the admin password:
> The seeded admin user has email `admin@nyumba.co.ke` and bcrypt hash for `admin123`.
> Change this immediately via Admin Dashboard → Settings.

---

## Step 2: Build the React Frontend

On your local machine or Replit terminal:

```bash
cd artifacts/nyumba
pnpm run build
```

This creates a `dist/` folder with all static files.

---

## Step 3: Upload Frontend Files

1. In **cPanel → File Manager**, navigate to `public_html/`
2. Upload **all files from** `artifacts/nyumba/dist/` into `public_html/`
   - The `index.html` must be at `public_html/index.html`
   - Upload the `assets/` folder too

---

## Step 4: Deploy the Node.js API

### Option A — cPanel Node.js App (recommended if your host supports it)

Many modern cPanel hosts (NameHero, A2 Hosting, SiteGround, etc.) support Node.js via Phusion Passenger.

1. In cPanel, go to **Setup Node.js App**
2. Click **Create Application**:
   - **Node.js version**: 18 or 20
   - **Application mode**: Production
   - **Application root**: `api/` (create this folder)
   - **Application URL**: your domain or a subdomain like `api.yourdomain.com`
   - **Application startup file**: `index.mjs`
3. Upload the contents of `artifacts/api-server/dist/` to the `api/` folder on the server
4. In the Node.js App panel, click **Run NPM Install** (if needed)
5. Set environment variables (see Step 5)
6. Click **Restart**

### Option B — Subdomain for API

If you want the API on a subdomain (`api.yourdomain.com`):
1. Create a subdomain in cPanel → **Subdomains**
2. Point it to the `api/` folder
3. Follow Option A above for the Node.js app setup

---

## Step 5: Set Environment Variables

In the **Node.js App** panel → **Environment Variables**, add:

| Variable | Value |
|---|---|
| `DATABASE_URL` | `mysql://username:password@localhost:3306/nyumba_db` |
| `JWT_SECRET` | (any long random string, e.g. 64 random characters) |
| `NODE_ENV` | `production` |
| `PORT` | `8080` (or whatever your host assigns) |

---

## Step 6: Update Frontend API URL

Before building (Step 2), update `artifacts/api-server/.env` or the API base URL in the frontend to point to your production API:

In `artifacts/nyumba/src/` — any file using `/api/` already uses relative paths, which works when the frontend and API are on the same domain.

If your API is on a subdomain, update all `/api/` references to `https://api.yourdomain.com/api/`.

---

## Step 7: Configure .htaccess for React Router

Create a `.htaccess` file in `public_html/` with this content:

```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QR,L]
```

This ensures React Router works correctly for all page routes.

---

## Step 8: Verify Everything Works

1. Visit `https://yourdomain.com` — homepage should load
2. Visit `https://yourdomain.com/admin` — login with `admin@nyumba.co.ke` / `admin123`
3. Check API: `https://yourdomain.com/api/health` (or `https://api.yourdomain.com/api/health`)

---

## Common Issues

| Problem | Solution |
|---|---|
| White screen on page refresh | Add the `.htaccess` file (Step 7) |
| API calls failing (404) | Check your API base URL and Node.js app is running |
| Database connection error | Verify `DATABASE_URL` env variable is correct |
| Images not loading | Images use external URLs (Pexels CDN) — no action needed |
| Admin login not working | Verify JWT_SECRET env variable is set |

---

## Admin Login

- **URL**: `https://yourdomain.com/admin`
- **Email**: `admin@nyumba.co.ke`
- **Password**: `admin123`

> Change the password immediately after your first login!

---

## Support

For technical assistance deploying this application, contact your hosting provider's support team or refer to their Node.js hosting documentation.
