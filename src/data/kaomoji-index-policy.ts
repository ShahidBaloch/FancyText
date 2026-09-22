/**
 * Kaomoji SEO index policy — one primary URL per search intent (avoid cannibalization).
 *
 * Indexed (sitemap + Google):
 * - /kaomoji/ — hub only (kamoji/kaomojis canonical here)
 * - Moods: cute, cry, heart (distinct from each other)
 * - Layout: hand, star, carrd, dot-art, multiline, coquette (distinct keywords)
 * - Meme names: lenny-face, shrug-emoticon
 *
 * Browse-only (noindex, hub + keyword filter only):
 * - Other emotions (angry, happy, sad, funny, …) — use multiline-kaomojis or mood browse
 * - Animals (cat, bear, dog, bunny) — coquette owns aesthetic; animals are browse helpers
 *
 * Do NOT add new indexed URLs for angry/happy/sad without retiring multiline or mood overlap.
 */

import { INDEXABLE_KAOMOJI_SLUGS } from "@/data/kaomoji";

export type KaomojiHubNavGroup = {
  id: string;
  heading: string;
  description: string;
  indexable: boolean;
  slugs: readonly string[];
};

/** Order matters — shown in hub menu bar. */
export const KAOMOJI_HUB_NAV_GROUPS: readonly KaomojiHubNavGroup[] = [
  {
    id: "moods",
    heading: "Moods (indexed)",
    description: "Core feelings with their own search URLs—cute, cry, heart.",
    indexable: true,
    slugs: ["cute-kaomojis", "cry-kaomojis", "heart-kaomojis"],
  },
  {
    id: "layouts",
    heading: "Layouts & ASCII (indexed)",
    description:
      "Topic pages with unique keywords—hands, stars, Carrd lines, dot art, multiline moods, coquette art.",
    indexable: true,
    slugs: [
      "multiline-kaomojis",
      "coquette-kaomojis",
      "hand-kaomojis",
      "star-kaomojis",
      "carrd-kaomojis",
      "kaomoji-dot-art",
    ],
  },
  {
    id: "memes",
    heading: "Classic faces (indexed)",
    description: "Named emoticons people search directly.",
    indexable: true,
    slugs: ["lenny-face", "shrug-emoticon"],
  },
  {
    id: "browse-moods",
    heading: "More moods (browse)",
    description:
      "Full mood grids (including multiline stacks) for copy-paste—noindex browse URLs so Google keeps one indexed multiline hub plus cute/cry/heart spokes.",
    indexable: false,
    slugs: [
      "angry-kaomojis",
      "happy-kaomojis",
      "sad-kaomojis",
      "funny-kaomojis",
      "excited-kaomojis",
      "shy-kaomojis",
      "sleep-kaomojis",
      "wink-kaomojis",
      "kiss-kaomojis",
      "hug-kaomojis",
      "thank-you-kaomojis",
      "confused-kaomojis",
      "evil-kaomojis",
      "music-kaomojis",
      "proud-kaomojis",
      "thinking-kaomojis",
      "drool-kaomojis",
      "shocked-kaomojis",
      "surprised-kaomojis",
      "scared-kaomojis",
    ],
  },
  {
    id: "browse-animals",
    heading: "Animals (browse)",
    description:
      "Pet-themed lists with curated samples—full coquette matrix stays on coquette kaomojis.",
    indexable: false,
    slugs: [
      "cat-kaomojis",
      "bear-kaomojis",
      "dog-kaomojis",
      "bunny-kaomojis",
    ],
  },
] as const;

export function isKaomojiSlugIndexable(slug: string): boolean {
  return INDEXABLE_KAOMOJI_SLUGS.has(slug);
}
