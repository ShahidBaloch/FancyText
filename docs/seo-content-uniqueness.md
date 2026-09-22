# Content uniqueness (Google) — keywords unchanged

Google rewards **unique, useful pages**, not duplicate templates. FancifyText keeps **SEO keyword targets fixed** and varies **titles, descriptions, body, FAQ, and specimens** per URL.

## Do not change (SEO keyword contract)

These fields are **intentional ranking targets** — do not rename for “uniqueness”:

- `primaryKeyword`
- `fellowKeywords`
- `navLabel` (when tied to a target query)
- URL slugs for live indexable pages

Fix duplication by rewriting **descriptions**, **hero leads**, **FAQ**, and **sections** — not by changing the keyword map.

## What must be unique per indexable URL

| Layer | Where |
|-------|--------|
| Meta title & description | `PAGES` registry; kaomoji overrides in `kaomoji.ts` / `kaomoji-copy.ts` |
| Visible H1 & lead | Page heroes, `KaomojiUniqueCopy`, collection hubs |
| Body & FAQ | Per-route components and `KAOMOJI_UNIQUE_COPY` |
| SERP specimen line | `SERP_SPECIMENS` / dynamic cursive letter specimens |

## Automated check

```bash
npm run check:content-uniqueness
# also runs inside npm run check:seo
```

Fails when:

- Two **indexable** URLs share the same meta **title** or **description** (including kaomoji + cursive letter metadata).
- Money-page descriptions are **too short** (thin content risk).

Does **not** fail on shared keywords — that is covered separately by `check:cannibalization` (one indexable URL per `primaryKeyword`).

## Adding a new page

1. Add `PAGES` row with a **distinct** `primaryKeyword` and **unique** `description` (do not copy another URL’s paragraph).
2. Add route copy + at least one FAQ block that answers the query in page-specific language.
3. Run `npm run check:seo` before merge.

## Related

- Cannibalization: `docs/seo-plumbing.md`
- SERP specimens: `docs/seo-serp-specimen-rules.md`
- Release checklist: `docs/seo-serp-policy-checklist.md`
