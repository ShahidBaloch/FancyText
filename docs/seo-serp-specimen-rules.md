# SERP specimen rules (Task 2)

Goal: match competitor snippets and above-fold previews—show the **right Unicode, symbols, or faces** for the query without keyword stuffing.

## Where specimens appear

| Surface | Source |
|---------|--------|
| Meta description | `descriptionWithSerpSpecimen()` in `pageMetadata()` |
| Visible hero | `PageHero` + `specimenPath` → `SerpSpecimenBlock` |
| Home hero | `HomeHeroSpecimen` → shared `SerpSpecimenFontRotate` |
| OG image subtitle | `ogSubtitleForPath()` in route `opengraph-image.tsx` |

## Adding a URL

1. Edit `SERP_SPECIMENS` in `src/lib/seo/specimens.ts`.
2. Pick **kind**:
   - `font-rotate` — fancy/copy-paste fonts (`phrase` + `styleIds`).
   - `glyph-strip` — symbols, kaomoji, lenny, emoji strings (`glyphs[]`).
3. Set `metaLine` (short, SERP-safe) and optional `ogSubtitle`.
4. Pass `specimenPath="/your-path/"` on `PageHero` (or rely on `CollectionView` auto when path is registered).
5. Bump `CONTENT_UPDATED_AT` when publishing.

## Copy rules

- **Intent first:** picture emoji queries eventually need emoji strips; font queries need transformed letters; kaomoji queries need `(｡◕‿◕｡)`-style faces.
- **One primary strip** above the H1 on inner pages; home keeps the two-column hero.
- **Do not** duplicate the full meta line in the visible lead paragraph (hero lead stays human prose).
- **AdSense:** specimens are decorative (`aria-hidden="true"`); real copy stays in sections and FAQ.

## P0 paths (Tasks 2–3)

- `/` — font rotate (G9)
- `/copy-paste-fonts/` — font rotate (G5)
- `/cool-symbols/`, `/cute-symbols/`, `/aesthetic-symbols/` — glyph strip (G2, G8)
- `/emoji-combos/` — glyph strip (G1)
- `/text-art/` — glyph strip (G3)
- `/kaomoji/`, `/lenny-face/` — glyph strip (G6–G7)

## Cursive pillar (Task 6 / B3)

- `/cursive-text-generator/` — `font-rotate` (`Your Name` × cursive, bold-cursive, italic) in `SERP_SPECIMENS`.
- `/cursive-capital-*` and `/cursive-small-*` — dynamic `glyph-strip` via `buildCursiveLetterSpecimen()` inside `getSerpSpecimen()` (capital, small, bold glyphs + keyword meta line). Wire `PageHero specimenPath={letterUrl(...)}` on `CursiveLetterView`; metadata uses `descriptionWithSerpSpecimen()` in `cursiveLetterMetadata()`.

Add new landings by extending `SERP_SPECIMENS` and `PageHero specimenPath`.

Before release, run the mobile checklist in `docs/seo-responsive-qa.md` (Task 7).
