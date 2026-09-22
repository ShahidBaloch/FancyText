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

- **Intent first:** picture emoji queries need emoji strips; font queries need transformed letters; kaomoji queries need faces in the **snippet** (meta description / hero), not always in the title.
- **When a face belongs in the title:** only for head queries where a *compact* specimen lifts CTR — hub `kaomoji`, cute, cry, heart (♡), Lenny, shrug. Skip wide/complex faces (hand, star stacks, multiline, coquette ASCII) — they truncate as `( ˶... )` and look broken.
- **`| FancifyText`:** skip on kaomoji money titles. Google already shows sitename + favicon + URL; brand suffixes are the most common rewrite Google removes. Keep brand in `og:site_name`, header, and JSON-LD.
- **No self-made dots:** `descriptionWithSerpSpecimen()` must **never** append `…` / `...`. Write complete meta lines ≤ ~155 chars.
- **One primary strip** above the H1 on inner pages; home keeps the two-column hero.
- **Do not** duplicate the full meta line in the visible lead paragraph (hero lead stays human prose).
- **AdSense:** specimens are decorative (`aria-hidden="true"`); real copy stays in sections and FAQ.

## P0 paths (Tasks 2–3)

- `/` — font rotate (G9)
- `/copy-paste-fonts/` — font rotate (G5)
- `/cursive-text-generator/` — font rotate (cursive hub)
- `/cool-symbols/`, `/cute-symbols/`, `/aesthetic-symbols/` — glyph strip (G2, G8)
- `/emoji-combos/` — glyph strip (G1)
- `/text-art/` — glyph strip (G3)
- `/kaomoji/`, `/lenny-face/` — glyph strip (G6–G7)
- Indexed kaomoji moods (hub spokes): `/cute-kaomojis/`, `/cry-kaomojis/`, `/heart-kaomojis/`, `/hand-kaomojis/`, `/star-kaomojis/`, `/kaomoji-dot-art/`, `/carrd-kaomojis/`, `/shrug-emoticon/` — glyph strip (same registry as `SITEMAP_REQUIRED_REGISTRY_PATHS` kaomoji URLs minus hub duplicates)

## Cursive pillar (Task 6 / B3)

- `/cursive-text-generator/` — `font-rotate` (`Your Name` × cursive, bold-cursive, italic) in `SERP_SPECIMENS`.
- `/cursive-capital-*` and `/cursive-small-*` — dynamic `glyph-strip` via `buildCursiveLetterSpecimen()` inside `getSerpSpecimen()` (capital, small, bold glyphs + keyword meta line). Wire `PageHero specimenPath={letterUrl(...)}` on `CursiveLetterView`; metadata uses `descriptionWithSerpSpecimen()` in `cursiveLetterMetadata()`.

Add new landings by extending `SERP_SPECIMENS` and `PageHero specimenPath`.

Before release, run `npm run check:seo` (see `docs/seo-plumbing.md`) and the mobile checklist in `docs/seo-responsive-qa.md` (Task 7).
