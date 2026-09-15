# FancyText

Unicode fancy-text / cool-font generator (Next.js App Router).

## Repo split

| Path | Role |
|------|------|
| `E:\2026SEO Projects\FancyText` | **This repo** — application code & git |
| `E:\2026SEO Projects\Fancy Text or text trick plan` | Research, SEO CSVs, architecture MD/HTML |

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

Deploy on **Vercel** with the custom domain **`fancifytext.com`** (purchased on Spaceship).

### 1. Push to GitHub

```bash
git push -u origin main
```

### 2. Deploy on Vercel

1. Open [Vercel](https://vercel.com/) → **New Project** → import `FancyText`.
2. Add environment variables:

| Name | Value |
|------|--------|
| `NEXT_PUBLIC_SITE_URL` | `https://fancifytext.com` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-…` (optional, after GA4 property exists) |
| `NEXT_PUBLIC_GSC_VERIFICATION` | HTML-tag token (optional, from Search Console) |

3. Deploy.

### 3. Connect the domain (Spaceship → Vercel)

1. Vercel → Project → **Settings → Domains** → add **both**:
   - `fancifytext.com` (apex)
   - `www.fancifytext.com` (must show a valid SSL certificate — if HTTPS fails with a name mismatch, the www domain is not fully attached yet)
2. In Spaceship DNS, add the **A / CNAME records Vercel shows** (do not guess — copy from the Domains panel).
3. Wait until **both** hosts show HTTPS valid. The app 301s `www` → apex once TLS works.
4. **Attack Challenge / Firewall (important for SEO):**  
   Vercel → Project → **Firewall / Attack Challenge**. Allow or bypass for:
   - `/sitemap.xml`
   - `/robots.txt`
   - Verified search bots (Googlebot, Bingbot)  
   Without this, automated SEO tools may see a challenge page instead of the sitemap.

### 4. After the site is live

1. **Google Search Console**
   - Add property `https://fancifytext.com` (Domain or URL-prefix).
   - Verify with the HTML tag: paste the content token into `NEXT_PUBLIC_GSC_VERIFICATION` on Vercel and redeploy.
   - Submit sitemap: `https://fancifytext.com/sitemap.xml` (confirm it returns XML in a normal browser, not a Security Checkpoint).
2. **Google Analytics (GA4)**
   - Create a GA4 property → copy Measurement ID (`G-…`).
   - Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` on Vercel → redeploy (required for live analytics).

## Legal

- Privacy: `/privacy/`
- Terms: `/terms/`

## Stack

- Next.js App Router + TypeScript + Tailwind CSS v4
- Client-side Unicode transforms (`src/lib/fonts`)
- Page registry (`src/data/pages/registry.ts`) aligned to the planning-folder blueprint

## Phases

0–5 shipped (hub, cursive + letters, styles, collections, platforms, kaomoji).

**Domain:** `fancifytext.com` (Spaceship) — connect DNS to Vercel after first deploy.
