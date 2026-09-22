/**
 * Lightweight kaomoji index rules for metadata / SEO checks.
 * Keep INDEXABLE_KAOMOJI_SLUGS in sync with `src/data/kaomoji.ts`.
 */

export const INDEXABLE_KAOMOJI_SLUGS = new Set([
  "cute-kaomojis",
  "cry-kaomojis",
  "heart-kaomojis",
  "lenny-face",
  "shrug-emoticon",
  "hand-kaomojis",
  "star-kaomojis",
  "kaomoji-dot-art",
  "carrd-kaomojis",
]);

function slugFromPath(urlOrSlug: string): string {
  return urlOrSlug.replace(/^\/|\/$/g, "");
}

/** True when the slug is a kaomoji list/hub URL (not fonts, symbols, etc.). */
export function isKaomojiRouteSlug(slug: string): boolean {
  if (slug === "kaomoji" || slug === "kamoji" || slug === "kaomojis") return true;
  if (slug === "lenny-face" || slug === "shrug-emoticon") return true;
  if (slug === "kaomoji-dot-art" || slug === "carrd-kaomojis") return true;
  return slug.endsWith("-kaomojis");
}

/**
 * Indexable kaomoji URLs — hub plus indexed mood/spoke lists only.
 * /kamoji/ and /kaomojis/ stay live but are noindex + canonical to /kaomoji/.
 */
export function kaomojiPathIsIndexable(urlOrSlug: string): boolean {
  const slug = slugFromPath(urlOrSlug);
  if (slug === "kaomoji") return true;
  if (slug === "kamoji" || slug === "kaomojis") return false;
  if (!isKaomojiRouteSlug(slug)) return true;
  return INDEXABLE_KAOMOJI_SLUGS.has(slug);
}

export function kaomojiHubCanonicalPath(slug: string): string | undefined {
  if (slug === "kamoji" || slug === "kaomojis") return "/kaomoji/";
  return undefined;
}
