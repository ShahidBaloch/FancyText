# Performance (FancifyText)

## Architecture

- **SSG by default** — `generateStaticParams` on `/[slug]` and guides; HTML is pre-rendered at build time (fast TTFB on Vercel).
- **Server Components** — prose, heroes, breadcrumbs, and JSON-LD stay on the server; tools are client islands.
- **Code splitting** — homepage `HomePlayground` and collection/platform `StyleGallery` load via `next/dynamic` with SSR placeholders (smaller first JS payload on content pages).

## Before release

```bash
npm run build
npm run check:seo
```

Inspect route sizes in `.next/diagnostics/route-bundle-stats.json` if tuning further.

## Rules for new features

1. Do **not** import `@/data/pages/registry` from root `layout.tsx` — use `@/data/site` for `SITE_NAME` / `SITE_URL`.
2. Do **not** import `@/data/kaomoji` from shared metadata — use `@/data/kaomoji-index` for robots/index rules.
3. Heavy tools (`StyleGallery`, LinkedIn formatters) belong in **dynamic imports** or route-specific pages, not global layout.
4. Third-party scripts: **GA + AdSense** use `next/script` with `lazyOnload` only.
5. Home hero specimen: pass **precomputed** showcase strings from the server; never import `lib/fonts/styles.ts` from decorative client components.

## PageSpeed (pagespeed.web.dev)

- Homepage gallery is capped to **12 popular styles**; full 67+ grid lives on `/copy-paste-fonts/` (smaller DOM, faster mobile).
- Run Lighthouse mobile on production after deploy; target **100** performance with field + lab (CrUX may lag deploy by ~28 days).
- Font: Sora uses `display: optional` and **no preload** so LCP text paints immediately with fallback metrics.

## User experience

- Placeholders reserve space while tool chunks load (reduced layout shift).
- `useDeferredValue` in galleries keeps typing responsive.
- Mobile: 16px inputs, touch-sized copy buttons — see `docs/seo-responsive-qa.md`.
