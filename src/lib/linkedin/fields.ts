/**
 * LinkedIn field limits, the "…see more" fold, and which fields actually accept
 * styled Unicode.
 *
 * Two things every other formatter gets wrong are baked in here. First, the
 * number that decides whether a post gets read is the fold, not the 3,000-character
 * ceiling. Second, LinkedIn does not treat every field the same: the headline
 * rejects styled characters outright, so offering to style it is a bug, not a
 * feature.
 */

/** Whether a field accepts styled Unicode characters at all. */
export type FieldStyling = "yes" | "no" | "risky";

export type LinkedInField = {
  id: string;
  name: string;
  /** Hard character limit LinkedIn enforces. */
  limit: number;
  /** Characters visible before the field collapses, when it collapses. */
  fold?: number;
  styling: FieldStyling;
  note: string;
};

/**
 * The fold is display behaviour, not a documented limit, and LinkedIn has never
 * published it. These are the widely reproduced numbers; they move with UI
 * changes, which is why the UI calls them approximate.
 */
export const POST_FOLD_DESKTOP = 210;
export const POST_FOLD_MOBILE = 140;

export const LINKEDIN_FIELDS: LinkedInField[] = [
  {
    id: "post",
    name: "Post",
    limit: 3000,
    fold: POST_FOLD_DESKTOP,
    styling: "yes",
    note: "Styled Unicode survives here. Only about the first 210 characters show before “…see more” on desktop, and roughly 140 on mobile, so the hook is the part that matters.",
  },
  {
    id: "comment",
    name: "Comment",
    limit: 1250,
    styling: "yes",
    note: "Styling works, but comments do not keep blank lines — a paragraph break you type will collapse.",
  },
  {
    id: "headline",
    name: "Headline",
    limit: 220,
    fold: 70,
    styling: "no",
    note: "LinkedIn rejects styled characters in the headline with an “invalid characters” error. Keep it plain; only the first 60–70 characters show in search results and comment bylines anyway.",
  },
  {
    id: "about",
    name: "About / summary",
    limit: 2600,
    fold: 300,
    styling: "risky",
    note: "Practitioners have reported LinkedIn blocking styled characters here as well, and there is a long-running bug where your own formatting looks fine to you but renders as one block to visitors. Test as a logged-out visitor before trusting it.",
  },
  {
    id: "connection-note",
    name: "Connection request note",
    limit: 300,
    styling: "yes",
    note: "Same 300 characters on every plan, free or paid.",
  },
  {
    id: "message",
    name: "Direct message",
    limit: 8000,
    styling: "yes",
    note: "Plenty of room, but styled text in a cold message reads as bulk outreach.",
  },
  {
    id: "poll-question",
    name: "Poll question",
    limit: 140,
    styling: "yes",
    note: "Poll options get 30 characters each, which almost nothing styled will fit inside.",
  },
  {
    id: "article-title",
    name: "Article title",
    limit: 150,
    styling: "risky",
    note: "Articles use a real rich-text editor, so use its own bold and italic buttons instead of Unicode.",
  },
];

export const FIELD_STYLING_LABELS: Record<FieldStyling, string> = {
  yes: "Styling works",
  no: "Plain text only",
  risky: "Styling is unreliable",
};

/** Fields offered as counter targets in the tool, in the order shown. */
export const COUNTER_FIELD_IDS = [
  "post",
  "comment",
  "headline",
  "about",
  "connection-note",
] as const;

export function getLinkedInField(id: string): LinkedInField | undefined {
  return LINKEDIN_FIELDS.find((f) => f.id === id);
}

/**
 * Bullet and divider characters, rated by how reliably LinkedIn renders them.
 *
 * LinkedIn ignores Markdown lists, so every "bulleted list" in the feed is
 * literal bullet characters at the start of a line. Which ones are safe is the
 * actual question, and it is the one competitors answer with a shrug.
 */
export type BulletReliability = "reliable" | "good" | "risky";

export type BulletSymbol = {
  char: string;
  name: string;
  reliability: BulletReliability;
  note: string;
};

export const BULLET_SYMBOLS: BulletSymbol[] = [
  {
    char: "•",
    name: "Bullet",
    reliability: "reliable",
    note: "U+2022. The default for a reason — present in every system font on every platform.",
  },
  {
    char: "→",
    name: "Arrow",
    reliability: "reliable",
    note: "U+2192. Renders everywhere and reads as a step or a consequence rather than a plain item.",
  },
  {
    char: "✓",
    name: "Check",
    reliability: "reliable",
    note: "U+2713. Safe everywhere. Good for takeaways, misleading for anything not actually done.",
  },
  {
    char: "▪",
    name: "Small square",
    reliability: "good",
    note: "U+25AA. Widely supported; sits slightly high in some Android fonts.",
  },
  {
    char: "◦",
    name: "Hollow bullet",
    reliability: "good",
    note: "U+25E6. Useful for a second level, but small enough to disappear on phones.",
  },
  {
    char: "▶",
    name: "Triangle",
    reliability: "good",
    note: "U+25B6. Some platforms draw it as a coloured emoji play button instead of a text glyph.",
  },
  {
    char: "★",
    name: "Star",
    reliability: "good",
    note: "U+2605. Reliable, but heavy — one per list is plenty.",
  },
  {
    char: "‣",
    name: "Triangular bullet",
    reliability: "risky",
    note: "U+2023. Missing from some older Android font stacks, where it shows as an empty box.",
  },
  {
    char: "▸",
    name: "Small triangle",
    reliability: "risky",
    note: "U+25B8. Sources disagree about its Android coverage, which is itself a reason to use • instead.",
  },
];

export const DIVIDER_LINES: { label: string; value: string; note: string }[] = [
  {
    label: "Dots",
    value: "• • •",
    note: "Three reliable bullets. The safest divider there is.",
  },
  {
    label: "Dashes",
    value: "—————",
    note: "Em dashes. Renders everywhere, but reads as heavy on mobile.",
  },
  {
    label: "Light rule",
    value: "─────────",
    note: "Box-drawing light horizontal, U+2500. Well supported and visually quiet.",
  },
  {
    label: "Stars",
    value: "✦ ✦ ✦",
    note: "U+2726. Decorative; fine for a sign-off, noisy mid-post.",
  },
];

export const BULLET_RELIABILITY_LABELS: Record<BulletReliability, string> = {
  reliable: "Safe everywhere",
  good: "Usually fine",
  risky: "Can show boxes",
};
