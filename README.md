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
   Without this, automated SEO tools may see a challenge page or HTTP 500 instead of the sitemap. `/sitemap.xml` is a **public static file** generated at build (`public/sitemap.xml`) so it does not go through Next.js’ metadata sitemap pipeline. It should return 200 with an indexable URL set (thin kaomoji emotion tails that stay noindex are omitted). lastmod is `CONTENT_UPDATED_AT` in `src/data/pages/registry.ts` — bump that date only when intentionally publishing changes; after GSC submit the site is meant for infrequent updates. Before deploy, run `npm run check:seo` (`docs/seo-plumbing.md`).

### CMP / ads (do not skip)

Do **not** load AdSense or a consent banner until a **Google-certified CMP** with IAB TCF is fully configured for EEA/UK/CH. A no-op stub lives at `src/lib/ads/consent.ts`. Privacy (`/privacy/`) already discloses Google advertising partners and links to [How Google uses information from sites or apps that use our services](https://policies.google.com/technologies/partner-sites). Never place ads between a textarea and the first Copy control.

Do not invent a GA4 measurement ID. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` only after a real GA4 property exists.

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
