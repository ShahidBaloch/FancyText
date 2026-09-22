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

## P0 paths (Task 2)

- `/` — font rotate (G9)
- `/copy-paste-fonts/` — font rotate (G5)
- `/cool-symbols/` — glyph strip (G2 partial)
- `/kaomoji/`, `/lenny-face/` — glyph strip (G6–G7)

Task 3+ adds new paths (`/emoji-combos/`, `/text-art/`, etc.) using the same registry.
