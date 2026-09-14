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

This app is optimized for deployment on **Vercel** with the custom domain `fancifytext.com`.

### 1. Push to GitHub
Since the repository is initialized but has no commits, commit your files and push them to your remote repository:
```bash
git add .
git commit -m "Initial commit of FancyText generator app"
git branch -M main
git push -u origin main
```

### 2. Deploy on Vercel
1. Go to the [Vercel Dashboard](https://vercel.com/) and click **New Project**.
2. Import the `FancyText` repository from GitHub.
3. In the **Environment Variables** section, add:
   - `NEXT_PUBLIC_SITE_URL` = `https://fancifytext.com`
4. Click **Deploy**.

### 3. Configure Custom Domain
1. In Vercel, go to **Project Settings > Domains**.
2. Add your custom domain `fancifytext.com` (and optionally `www.fancifytext.com`).
3. Update your DNS settings at your registrar (e.g., Namecheap, Porkbun, or Cloudflare) with the CNAME or A records provided by Vercel.

## Stack

- Next.js App Router + TypeScript + Tailwind CSS v4
- Client-side Unicode transforms (`src/lib/fonts`)
- Page registry (`src/data/pages/registry.ts`) aligned to the planning-folder blueprint

## Phases

0. Hub `/` — done
1. Cursive hub + 52 letter pages — done
2. Style spokes (bold, italic, bubble, strike, sub/sup, upside-down, glitch) — done
3. Copy-paste hub + aesthetic / cute / name / stylish collections — done
4. Platform pages (Discord color/fonts, TikTok, Instagram, HTML) — done
5. Kaomoji hub + emotion lists + lenny/shrug — done

**Domain:** `fancifytext.com` (Spaceship) — wire DNS to Vercel after deploy.
