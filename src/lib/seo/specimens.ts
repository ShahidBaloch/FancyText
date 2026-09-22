import { STYLES, transform } from "@/lib/fonts/styles";

/** How a URL shows intent-matched samples in hero + social previews. */
export type SerpSpecimenKind = "font-rotate" | "glyph-strip";

export type SerpSpecimenConfig = {
  kind: SerpSpecimenKind;
  /** Short line for meta description / OG (keep readable in SERP). */
  metaLine: string;
  /** Optional OG/twitter subtitle override (file-based OG routes). */
  ogSubtitle?: string;
  /** font-rotate */
  phrase?: string;
  styleIds?: string[];
  /** glyph-strip — one row of emoji, symbols, or kaomoji */
  glyphs?: string[];
  stripLabel?: string;
};

const FONT_HOME_STYLE_IDS = [
  "cursive",
  "bold",
  "bubble",
  "bold-cursive",
  "sans-bold",
  "italic",
] as const;

const FONT_COPY_STYLE_IDS = ["bold", "cursive", "italic", "bubble"] as const;

function fontMetaLine(phrase: string, styleIds: readonly string[]): string {
  return styleIds
    .map((id) => transform(phrase, id))
    .slice(0, 3)
    .join(" · ");
}

/** Canonical path → specimen config (indexed P0 URLs first). */
export const SERP_SPECIMENS: Record<string, SerpSpecimenConfig> = {
  "/": {
    kind: "font-rotate",
    phrase: "fancy text",
    styleIds: [...FONT_HOME_STYLE_IDS],
    metaLine: fontMetaLine("fancy text", FONT_HOME_STYLE_IDS),
    ogSubtitle:
      "𝓯𝓪𝓷𝓬𝔂 𝓽𝓮𝔁𝓽 · 𝐛𝐨𝐥𝐝 · ⓑⓤⓑⓑⓛⓔ — Unicode for Instagram, Discord & TikTok",
  },
  "/copy-paste-fonts/": {
    kind: "font-rotate",
    phrase: "copy paste",
    styleIds: [...FONT_COPY_STYLE_IDS],
    metaLine: fontMetaLine("copy paste", FONT_COPY_STYLE_IDS),
    ogSubtitle:
      "𝐜𝐨𝐩𝐲 𝓹𝓪𝓼𝓽𝓮 · 𝓬𝓾𝓻𝓼𝓲𝓿𝓮 · 𝒊𝒕𝒂𝒍𝒊𝒸 — Unicode font collections",
  },
  "/cool-symbols/": {
    kind: "glyph-strip",
    glyphs: ["♡", "☆", "✧", "★", "→", "✓", "⋆", "─"],
    stripLabel: "Tap any symbol below to copy",
    metaLine: "♡ ☆ ✧ ★ → cool symbols copy and paste",
    ogSubtitle: "♡ ☆ ✧ ★ → stars, hearts, arrows — tap to copy",
  },
  "/kaomoji/": {
    kind: "glyph-strip",
    glyphs: ["(｡◕‿◕｡)", "(T_T)", "¯\\_(ツ)_/¯", "(ノಠ益ಠ)ノ", "ʕ•ᴥ•ʔ"],
    stripLabel: "Kaomoji copy paste — text faces",
    metaLine: "(｡◕‿◕｡) (T_T) ¯\\_(ツ)_/¯ — kaomoji copy paste",
    ogSubtitle: "(｡◕‿◕｡) (T_T) ¯\\_(ツ)_/¯ · tap to copy kaomoji",
  },
  "/lenny-face/": {
    kind: "glyph-strip",
    glyphs: ["( ͡° ͜ʖ ͡°)", "( ͡~ ͜ʖ ͡°)", "⌐■_■"],
    stripLabel: "Lenny face copy paste",
    metaLine: "( ͡° ͜ʖ ͡°) — lenny face copy paste",
    ogSubtitle: "( ͡° ͜ʖ ͡°) Lenny variants — tap to copy",
  },
  "/emoji-combos/": {
    kind: "glyph-strip",
    glyphs: ["🌸✨💕", "🐱🎀🐾", "🌙✨🌌", "💀😭🙏"],
    stripLabel: "Emoji combos — tap a string to copy",
    metaLine: "🌸✨💕 🐱🎀 — emoji combos copy and paste",
    ogSubtitle: "🌸✨💕 cute & aesthetic emoji combos — tap to copy",
  },
  "/text-art/": {
    kind: "glyph-strip",
    glyphs: ["(=^･ω･^=)", "ʕ•ᴥ•ʔ", "¯\\_(ツ)_/¯", "☆(｡◕‿◕｡)☆"],
    stripLabel: "Text art copy paste",
    metaLine: "(=^･ω･^=) ☆(｡◕‿◕｡)☆ — text art copy and paste",
    ogSubtitle: "ASCII faces & dividers — text art copy paste",
  },
  "/cute-symbols/": {
    kind: "glyph-strip",
    glyphs: ["♡", "☆", "✿", "🌸", "🎀", "✨"],
    stripLabel: "Cute symbols copy and paste",
    metaLine: "♡ ☆ ✿ 🌸 — cute symbols copy and paste",
    ogSubtitle: "♡ ☆ ✿ cute symbols for bios — tap to copy",
  },
  "/aesthetic-symbols/": {
    kind: "glyph-strip",
    glyphs: ["⋆", "｡", "✧", "🌙", "───", "˚ ༘♡"],
    stripLabel: "Aesthetic symbols copy and paste",
    metaLine: "⋆｡°✩ ─── aesthetic symbols copy and paste",
    ogSubtitle: "⋆ dividers & moon marks — aesthetic symbols",
  },
};

export function normalizeSpecimenPath(path: string): string {
  if (!path.startsWith("/")) return `/${path}`;
  return path.endsWith("/") ? path : `${path}/`;
}

export function getSerpSpecimen(path: string): SerpSpecimenConfig | undefined {
  return SERP_SPECIMENS[normalizeSpecimenPath(path)];
}

export function getSerpSpecimenForSlug(slug: string): SerpSpecimenConfig | undefined {
  return getSerpSpecimen(`/${slug}/`);
}

/** Merge registry description with specimen line when not already present. */
export function descriptionWithSerpSpecimen(
  path: string,
  description: string,
): string {
  const spec = getSerpSpecimen(path);
  if (!spec?.metaLine) return description;
  if (description.includes(spec.metaLine)) return description;
  const max = 158;
  const merged = `${spec.metaLine}. ${description}`;
  if (merged.length <= max) return merged;
  return `${spec.metaLine}. ${description}`.slice(0, max - 1).trimEnd() + "…";
}

export function ogSubtitleForPath(path: string, fallback?: string): string | undefined {
  const spec = getSerpSpecimen(path);
  return spec?.ogSubtitle ?? fallback;
}

export type FontRotateShowcaseItem = { label: string; output: string };

export function buildFontRotateShowcase(
  phrase: string,
  styleIds: string[],
): FontRotateShowcaseItem[] {
  return styleIds.map((id) => {
    const style = STYLES.find((s) => s.id === id) ?? STYLES[0];
    return { label: style.label, output: transform(phrase, style.id) };
  });
}

/** Precomputed home showcase (same as legacy HomeHeroSpecimen). */
export const HOME_FONT_SHOWCASE = buildFontRotateShowcase(
  SERP_SPECIMENS["/"]!.phrase!,
  SERP_SPECIMENS["/"]!.styleIds!,
);

export const COPY_PASTE_FONT_SHOWCASE = buildFontRotateShowcase(
  SERP_SPECIMENS["/copy-paste-fonts/"]!.phrase!,
  SERP_SPECIMENS["/copy-paste-fonts/"]!.styleIds!,
);
