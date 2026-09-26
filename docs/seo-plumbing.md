# SEO plumbing (Task 9)

End-of-sprint checks so new landings stay indexable, linked, and SERP-visible.

## Adding a new indexable URL

1. **Registry** — `PAGES` entry in `src/data/pages/registry.ts` (`index` not `false`, honest `updated` when content changes).
2. **Route + view** — App Router page with `PageHero`, FAQ, and tool grid where applicable.
3. **SERP specimen** — if P0/P1 keyword page, add to `SERP_SPECIMENS` in `src/lib/seo/specimens.ts` and pass `specimenPath` on `PageHero`.
4. **Internal links** — add `TOPICAL_RELATED["/your-url/"]` (6 neighbors max); optional nav/footer in `NAV_URLS` / `FOOTER_URLS`.
5. **Sitemap** — if the URL is a money page, append to `SITEMAP_REQUIRED_PATHS` in `src/lib/seo/required-indexable.ts`.
6. **lastmod** — bump `CONTENT_UPDATED_AT` only when intentionally publishing site-wide content changes (see registry comment).

## Pre-release commands

```bash
npm run check:seo    # plumbing + cannibalization + ads gate + sitemap + llms
npm run check:ads
npm run check:sitemap
npm run check:llms
npm run check:cannibalization
npm run check:content-uniqueness
npm run build
```

`check:seo` runs plumbing, duplicate primaryKeyword guard, **content-uniqueness** (including effective meta after SERP specimens), ads gate, sitemap, and llms generation.

GitHub Actions (`.github/workflows/ci.yml`) runs `npm run lint`, `npm run check:seo`, `npm run build`, `npm run check:serp-specimen-html`, `npm run check:perf` (against a production server — fails if unreachable), and `npm run test:e2e` (Playwright + axe smoke) on every pull request and on pushes to `main`.

`check:cannibalization` also enforces **intent clusters** (`intentCluster` / `intentClusterRole` on registry entries; see `src/lib/seo/intent-clusters.ts`). Local perf skip: `PERF_OPTIONAL=1 npm run check:perf`.

See **`docs/seo-production-audit.md`** for GSC, AdSense review, and intent matrix before production.

## Related docs

- SERP specimens: `docs/seo-serp-specimen-rules.md`
- Mobile QA: `docs/seo-responsive-qa.md` (Task 7 branch)
- AdSense: `docs/seo-adsense-gate.md` (Task 8 branch)

## P0 sitemap anchors

Listed in `SITEMAP_REQUIRED_PATHS` — hub, copy-paste fonts, emoji/symbol landings, kaomoji indexable moods, legal pages. Cursive letter spokes are included automatically at lower priority.
