# SERP, policy, performance — release checklist

Use before and after deploy when the goal is **top‑3 visibility**, **user intent**, **AdSense**, and **GSC** compliance.

Run on the release branch (merge **PR #28** SEO plumbing + **PR #29** performance):

```bash
npm run check:seo
npm run build
```

Then test [PageSpeed Insights](https://pagespeed.web.dev/) on `https://fancifytext.com/` (mobile + desktop) after deploy.

---

## 1. Google Search / SERP (ranking support — not a guarantee)

Code cannot promise position #1–3; it can align with what winners show:

| Lever | What we ship |
|-------|----------------|
| **Intent-matched specimens** | Hero + meta lines on P0 URLs (`SERP_SPECIMENS`, dynamic cursive letters) |
| **One URL per intent** | Hub vs spoke copy; kaomoji vs emoji; cursive word vs letter |
| **Internal links** | `TOPICAL_RELATED`, hubs, cross-links in prose |
| **Technical** | Sitemap (124 URLs), honest `lastmod`, canonical + OG alignment, noindex tails |
| **Cannibalization guard** | `npm run check:cannibalization` |

**After deploy (GSC):** apex property, sitemap once, URL Inspection on money pages, monitor Queries for URL swapping. See `docs/seo-production-audit.md`.

---

## 2. User intent

| Query type | Where users land | What they get |
|------------|------------------|---------------|
| Fancy / convert now | `/` | Type → copy in **seconds** (tool loads with page JS, no artificial delay) |
| All font collections | `/copy-paste-fonts/` | Full catalog + galleries |
| Cursive word | `/cursive-text-generator/` | Dual preview + A–Z |
| Kaomoji / emoji / symbols | Dedicated landings | Tap-to-copy grids + FAQ |

**Lazy loading choice:** `next/dynamic` **code-splits** heavy tools (smaller first download). We **do not** idle-delay the main converter — that hurt real users and reviewers. Below-fold galleries use lazy chunks + `content-visibility` where safe.

---

## 3. AdSense policy (review + live)

- Tools + prose + FAQ on money pages; **Privacy / Terms / About / Contact** in footer.
- **`/ads.txt`** present; ads **off** until approval + `ADS_CONSENT_READY` + CMP (EEA/UK/CH).
- **No ad units** between textarea/input and first Copy — footer-only `AdPlacement`.
- `npm run check:ads` (included in `check:seo`).

See `docs/seo-adsense-gate.md`.

---

## 4. GSC policy & hygiene

- **Canonical** on every indexable URL; misspelling hubs → `/kaomoji/`.
- **noindex** search `?q=`, preview hosts, thin kaomoji tails.
- **Sitemap** = indexable set only; no `/kamoji/` in XML.
- Do not fake `lastmod` on every deploy (`CONTENT_UPDATED_AT` rules in registry).

---

## 5. Mobile & PageSpeed

- Responsive hub jump list, 16px inputs, touch targets, `overflow-x: clip` — `docs/seo-responsive-qa.md`.
- Homepage gallery capped to **12 styles** (DOM + mobile lab); full set on `/copy-paste-fonts/`.
- Hero LCP uses system stack first; Sora optional — `docs/seo-performance.md`.

**Target (lab, post-deploy):** mobile Performance **≥99**, Accessibility / Best practices / SEO **100**.

---

## 6. Merge order

1. **#28** — SEO plumbing, canonical, cannibalization, landings.  
2. **#29** — Performance + mobile polish + intent copy alignment.  
3. Deploy apex → PageSpeed + GSC spot checks.
