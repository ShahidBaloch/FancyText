# Responsive QA (Task 7)

Manual checks for SEO landing pages and copy tools. Run at **390×844** (iPhone-class) and **768×1024** (tablet) before shipping content/CSS changes.

## Pass criteria

- No horizontal page scroll (except intentional in-grid scroll, e.g. long text-art rows).
- Copy controls meet **44×44px** effective touch targets (`kaomoji-btn`, `symbol-btn`, `copy-btn`, nav toggle).
- SERP specimen strips stay readable (`word-break` / `overflow-wrap` on long Unicode).
- **AdSense:** no ad slot between a textarea/input and the first Copy button (see comments in `CollectionView`, `HomePlayground`).

## P0 pages (SEO pillars)

| URL | Grids / tool | Specimen |
|-----|----------------|----------|
| `/` | Home playground + font rotate | Home hero |
| `/copy-paste-fonts/` | Style gallery (gallery-first) | PageHero |
| `/cursive-text-generator/` | Dual preview + alphabet | — (Task 6 adds specimen) |
| `/kaomoji/` | Kaomoji grid + emoji row + hub jump | PageHero |
| `/emoji-combos/` | Emoji combo grids | PageHero |
| `/text-art/` | Text-art kaomoji grid | PageHero |
| `/cool-symbols/`, `/cute-symbols/`, `/aesthetic-symbols/` | Symbol grids | PageHero |
| `/heart-emoji/`, `/star-emoji/`, `/cat-emoji/` | Emoji grids | PageHero |
| Indexed kaomoji moods | Kaomoji grid (+ emoji picker after Task 5) | PageHero when configured |

## Mobile CSS conventions (`globals.css`)

- **≤640px:** kaomoji 2-col; emoji/symbol 4-col; hub tables → card layout (`.kaomoji-responsive-table`).
- **≤360px:** kaomoji 1-col; emoji/symbol 3-col (very narrow phones).
- **Hub keyword finder:** `.hub-jump-list` stacks full-width rows; ≥720px uses pill links.
- **Inputs:** `16px` font on small screens to reduce iOS focus zoom.

## Last verified

- **2026-09-22** — Cloud agent pass at 390×844 on `/kaomoji/`, `/emoji-combos/`, `/copy-paste-fonts/`, `/text-art/`, `/cursive-text-generator/` (no horizontal overflow). CSS hardening: `overflow-x: clip` on `html`, symbol grid breakpoints, hub jump layout.
