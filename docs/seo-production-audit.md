# Production audit — GSC, AdSense, SEO, user intent

Use this after deploying the SEO task stack (PRs #20–#28). Run **`npm run check:seo`** on the release branch before go-live.

---

## 1. Google Search Console (canonical & cannibalization)

### What the code already enforces

| Risk | Mitigation in repo |
|------|-------------------|
| **Three kaomoji hubs** (`/kaomoji/`, `/kamoji/`, `/kaomojis/`) | `/kamoji/` & `/kaomojis/` → `index: false`, **canonical → `/kaomoji/`**, omitted from sitemap |
| **40+ kaomoji mood tails** (angry, cat, etc.) | **noindex** + dropped from sitemap; only **9 indexable moods** + layout spokes |
| **Duplicate tool hubs** (home vs bold/cursive/stylish/cool) | Distinct titles, on-page “not the same page as…” copy, topical `RelatedTools` |
| **Picture emoji vs kaomoji** (heart emoji vs heart kaomoji) | Separate URLs, cross-links, callouts, different primary keywords |
| **Search infinite URLs** (`/search/?q=…`) | **noindex** + canonical **`/search/`** |
| **Preview / wrong host** | `robots` noindex on Vercel preview; proxy **noindex** on non-apex hosts |
| **Same primaryKeyword twice in sitemap** | `npm run check:cannibalization` fails the build script |

### Canonical / OG (fixed in this audit)

- **`pageMetadata()`** — `rel=canonical` and **Open Graph `url`** both use the **canonical** URL (so `/kamoji/` shares `/kaomoji/` in OG, not only in `<link rel="canonical">`).

### GSC actions (you, not code)

1. Property = **`https://fancifytext.com`** (apex).
2. Sitemap = **`https://fancifytext.com/sitemap.xml`** (must be **200 XML**, not firewall challenge).
3. **Do not** resubmit sitemap daily; wait for crawl (days–weeks after first submit).
4. URL Inspection: spot-check `/`, `/kaomoji/`, `/copy-paste-fonts/`, `/emoji-combos/`, `/heart-emoji/`.
5. If “Duplicate without user-selected canonical” appears, note the URL — usually a **noindex** tail or misspelling hub; confirm canonical in HTML.

### Cannibalization you still manage in content (not automatic)

- **Home (`/`)** vs **copy-paste-fonts** vs **style generators** — same ecosystem, different intent; keep titles/descriptions distinct (already separated).
- **52 cursive letter URLs** vs **cursive-text-generator** — intentional long-tail; hub owns “whole word / name”; letters own “single glyph”. Hub has higher sitemap priority than letters.
- After deploy, watch GSC **Queries** for two URLs swapping for one query — adjust copy or internal links, not mass noindex, unless truly duplicate.

---

## 2. Google AdSense (review crawler)

### Reviewer-friendly (current design)

- **Live, usable tools** with prose, FAQ, breadcrumbs on money pages.
- **Privacy** (`/privacy/`) — Google partners, ads disclosure, EEA/CMP statement.
- **About** + **Contact** + **Terms** linked from footer.
- **`/ads.txt`** — `google.com, pub-…, DIRECT`.
- **Ads gated off** until env + **`ADS_CONSENT_READY`** (Task 8) — no broken tags during review.
- **Policy:** no ad units between **textarea/input** and **first Copy** (comments in `HomePlayground`, `CollectionView`, `StyleGallery`).

### Do not do during AdSense review

- Do not enable **`NEXT_PUBLIC_ADSENSE_CLIENT_ID`** or slot env vars until **approved**.
- Do not set **`ADS_CONSENT_READY = true`** without a **certified CMP** (EEA/UK/CH).
- Do not paste raw AdSense snippets outside `AdSenseProvider` / `AdPlacement`.

### After approval

Follow **`docs/seo-adsense-gate.md`** and run **`npm run check:ads`**.

---

## 3. SEO expert checklist (technical)

| Check | Command / location |
|-------|-------------------|
| Sitemap = indexable set only | `npm run check:sitemap` |
| llms.txt matches sitemap | `npm run check:llms` |
| P0 URLs + specimens + topical links | `npm run check:seo` |
| Duplicate primary keywords | `npm run check:cannibalization` |
| AdSense loader / placement policy | `npm run check:ads` (also in `check:seo`) |
| SERP specimens on P0 | `SERP_SPECIMEN_REQUIRED_PATHS` in `required-indexable.ts` |
| lastmod honesty | Only `CONTENT_UPDATED_AT` or `PageEntry.updated` — not build time |

---

## 4. User intent fulfillment (pillar map)

| User intent | Canonical page | Intent served on-page |
|-------------|----------------|------------------------|
| Fancy / cool text | `/` | Full gallery, all styles, copy |
| Copy-paste fonts (hub) | `/copy-paste-fonts/` | Collections + gallery-first samples |
| Cursive **word** | `/cursive-text-generator/` | Dual preview + A–Z rows |
| Cursive **one letter** | `/cursive-capital-x/`, `/cursive-small-x/` | Single glyph + link to generator |
| Kaomoji (general) | `/kaomoji/` | Mixed grid + emoji row + hub finder |
| Kaomoji **mood** | Indexed mood URLs only | Full grid + FAQ + related |
| Lenny / shrug | `/lenny-face/`, `/shrug-emoticon/` | Dedicated lists |
| **Picture** heart/star/cat emoji | `/heart-emoji/`, etc. | Emoji grid, not kaomoji |
| Emoji **stacks** | `/emoji-combos/` | Category combos |
| Symbols (marks) | `/cool-symbols/`, `/cute-symbols/`, `/aesthetic-symbols/` | Symbol grids |
| Text art (ASCII blocks) | `/text-art/` | Curated art lines |
| Platform fonts | `/instagram-font-generator/`, etc. | Filtered galleries |

Misspellings (`/kamoji/`) → same faces, **canonical hub**, no sitemap entry — user still gets copy; Google consolidates on `/kaomoji/`.

---

## 5. Performance

- Pre-rendered static pages (SSG); tools code-split on home and collection pages.
- See **`docs/seo-performance.md`** before adding client bundles or registry imports to layout.

## 6. Deploy recommendation

1. Merge **#20 → #28** (or equivalent release branch) to **`main`**.
2. **`npm run check:seo`** + **`npm run build`** on CI.
3. Deploy production; verify **sitemap.xml** and **robots.txt** on apex.
4. Keep **ads off** until AdSense + CMP ready.
5. GSC: monitor indexing; no panic at day 1–7.
