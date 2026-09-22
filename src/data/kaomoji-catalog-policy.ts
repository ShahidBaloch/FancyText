/**
 * Catalog scope for Google-friendly kaomoji pages:
 * - Full multiline matrix: /multiline-kaomojis/ only (indexed).
 * - Full coquette matrix: /coquette-kaomojis/ only (indexed).
 * - Indexed moods (cute, cry, heart, hand): small multiline teaser + one-liners.
 * - Browse-only moods (angry, happy, …): entire generated multiline set for that mood.
 */

/** Slugs that may ship the full multiline or coquette matrix. */
export const KAOMOJI_FULL_CATALOG_SLUGS = new Set([
  "multiline-kaomojis",
  "coquette-kaomojis",
]);

export const MULTILINE_HIGHLIGHT_DEFAULT = 24;

/** Indexed mood pages: smaller multiline teaser to avoid cloning the multiline hub. */
export const MULTILINE_HIGHLIGHT_INDEXED_MOOD = 14;

export const COQUETTE_ANIMAL_HIGHLIGHT_LIMIT = 18;

export function multilineHighlightLimitForSlug(slug: string): number {
  const indexedMoods = new Set([
    "cute-kaomojis",
    "cry-kaomojis",
    "heart-kaomojis",
    "hand-kaomojis",
  ]);
  if (indexedMoods.has(slug)) return MULTILINE_HIGHLIGHT_INDEXED_MOOD;
  return MULTILINE_HIGHLIGHT_DEFAULT;
}
