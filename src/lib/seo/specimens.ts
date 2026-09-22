import {
  boldCursiveGlyph,
  cursiveGlyph,
  letterPrimaryKeyword,
  parseCursiveSlug,
  type Letter,
  type LetterCase,
} from "@/lib/fonts/cursive";
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

const CURSIVE_HUB_STYLE_IDS = ["cursive", "bold-cursive", "italic"] as const;

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
  "/cursive-text-generator/": {
    kind: "font-rotate",
    phrase: "Your Name",
    styleIds: [...CURSIVE_HUB_STYLE_IDS],
    metaLine: fontMetaLine("Your Name", CURSIVE_HUB_STYLE_IDS),
    ogSubtitle:
      "𝓨𝓸𝓾𝓻 𝓝𝓪𝓶𝓮 · 𝒃𝒐𝒍𝒅 𝒄𝒖𝒓𝒔𝒊𝒗𝒆 · 𝑖𝑡𝑎𝑙𝑖𝑐 — script Unicode copy & paste",
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
    metaLine: "(｡◕‿◕｡) (T_T) ¯\\_(ツ)_/¯",
    ogSubtitle: "(｡◕‿◕｡) (T_T) ¯\\_(ツ)_/¯ · tap to copy kaomoji",
  },
  "/cute-kaomojis/": {
    kind: "glyph-strip",
    glyphs: ["(｡◕‿◕｡)", "(◕‿◕)", "(✿◠‿◠)", "ʕ•ᴥ•ʔ", "(≧◡≦)"],
    stripLabel: "Cute kaomoji — tap any face to copy",
    metaLine: "(｡◕‿◕｡) (◕‿◕) ʕ•ᴥ•ʔ",
    ogSubtitle: "(｡◕‿◕｡) kawaii text faces — tap to copy",
  },
  "/cry-kaomojis/": {
    kind: "glyph-strip",
    glyphs: ["(╥_╥)", "(T_T)", "(｡•́︿•̀｡)", "(つ﹏⊂)", "(；ω；)"],
    stripLabel: "Cry kaomoji — crying text faces",
    metaLine: "(T_T) (╥_╥) (｡•́︿•̀｡)",
    ogSubtitle: "(T_T) tearful faces — tap to copy",
  },
  "/heart-kaomojis/": {
    kind: "glyph-strip",
    glyphs: ["(｡♥‿♥｡)", "(♥ω♥*)", "♡(˃͈ દ ˂͈ ༶ )", "(´∀｀)♡", "ヽ(♡‿♡)ノ"],
    stripLabel: "Heart kaomoji — love text faces",
    metaLine: "(｡♥‿♥｡) ♡",
    ogSubtitle: "(｡♥‿♥｡) love kaomoji — tap to copy",
  },
  "/hand-kaomojis/": {
    kind: "glyph-strip",
    glyphs: ["ヽ(・∀・)ﾉ", "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧", "＼(^o^)／", "(ノ°▽°)ノ", "ヾ(＾∇＾)/"],
    stripLabel: "Hand kaomoji — wave & arm-up faces",
    metaLine: "(ﾉ◕ヮ◕)ﾉ ＼(^o^)／",
    ogSubtitle: "ヽ(・∀・)ﾉ wave faces — tap to copy",
  },
  "/star-kaomojis/": {
    kind: "glyph-strip",
    glyphs: ["☆(｡◕‿◕｡)☆", "⋆｡°✩", "✩₊˚.⋆", "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧", "(★^O^★)"],
    stripLabel: "Star kaomoji — sparkle text faces",
    metaLine: "☆(｡◕‿◕｡)☆ ⋆｡°✩",
    ogSubtitle: "☆ aesthetic sparkle kaomoji — tap to copy",
  },
  "/kaomoji-dot-art/": {
    kind: "glyph-strip",
    glyphs: ["(•ᴗ•)", "(◠‿◠)", "ʕ•ᴥ•ʔ", "(づ｡◕‿◕｡)づ", "(ノ◕ヮ◕)ノ"],
    stripLabel: "Dot art kaomoji — mini ASCII faces",
    metaLine: "(•ᴗ•) ʕ•ᴥ•ʔ",
    ogSubtitle: "(•ᴗ•) compact mini faces — tap to copy",
  },
  "/carrd-kaomojis/": {
    kind: "glyph-strip",
    glyphs: [
      "· · ─ ·✶· ─ · ·",
      "₊˚⊹♡⊹˚₊",
      "───── ⋆ ⋆ ⋆ ─────",
      "♡ ─── ♡ ─── ♡",
      "‧₊˚ ✩ ‧₊˚",
    ],
    stripLabel: "Carrd kaomojis — bio divider lines",
    metaLine: "· · ─ ·✶· ─ · · ⋆",
    ogSubtitle: "Bio dividers & ⋆ separators — tap to copy",
  },
  "/coquette-kaomojis/": {
    kind: "glyph-strip",
    glyphs: ["♡", "🌷", "૮ ˶ᵔ ᵕ ᵔ˶ ა", "(｡♥‿♥｡)", "⋆｡°✩"],
    stripLabel: "Coquette kaomoji — aesthetic multiline art",
    metaLine: "♡ 🌷 (｡♥‿♥｡)",
    ogSubtitle: "♡ coquette multiline text art — tap to copy",
  },
  "/multiline-kaomojis/": {
    kind: "glyph-strip",
    glyphs: ["(ノಠ益ಠ)ノ", "(ﾉ◕ヮ◕)ﾉ", "(T_T)", "¯\\_(ツ)_/¯", "(｡◕‿◕｡)"],
    stripLabel: "Multiline kaomoji — stacked ASCII blocks",
    metaLine: "(ノಠ益ಠ)ノ (T_T)",
    ogSubtitle: "Angry, happy & mood multiline stacks — tap to copy",
  },
  "/shrug-emoticon/": {
    kind: "glyph-strip",
    glyphs: ["¯\\_(ツ)_/¯", "┐(´д｀)┌", "╮(╯_╰)╭", "¯\\_(⊙_ʖ⊙)_/¯", "┐(´∀｀)┌"],
    stripLabel: "Shrug emoticon — tap to copy",
    metaLine: "¯\\_(ツ)_/¯",
    ogSubtitle: "¯\\_(ツ)_/¯ idk shrug — tap to copy",
  },
  "/lenny-face/": {
    kind: "glyph-strip",
    glyphs: ["( ͡° ͜ʖ ͡°)", "( ͡~ ͜ʖ ͡°)", "⌐■_■"],
    stripLabel: "Lenny face copy paste",
    metaLine: "( ͡° ͜ʖ ͡°)",
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
  "/heart-emoji/": {
    kind: "glyph-strip",
    glyphs: ["❤️", "💕", "💖", "🥰", "💗", "💘"],
    stripLabel: "Heart emoji — tap to copy",
    metaLine: "❤️ 💕 🥰 — heart emoji copy and paste",
    ogSubtitle: "❤️ 💕 🥰 heart emoji — tap to copy",
  },
  "/star-emoji/": {
    kind: "glyph-strip",
    glyphs: ["⭐", "🌟", "✨", "💫", "🌠", "⚡"],
    stripLabel: "Star emoji — tap to copy",
    metaLine: "⭐ 🌟 ✨ — star emoji copy and paste",
    ogSubtitle: "⭐ 🌟 ✨ star emoji — tap to copy",
  },
  "/cat-emoji/": {
    kind: "glyph-strip",
    glyphs: ["🐱", "😺", "😸", "🐾", "😻", "🐈‍⬛"],
    stripLabel: "Cat emoji — tap to copy",
    metaLine: "🐱 😺 🐾 — cat emoji copy and paste",
    ogSubtitle: "🐱 😺 🐾 cat emoji — tap to copy",
  },
};

export function normalizeSpecimenPath(path: string): string {
  if (!path.startsWith("/")) return `/${path}`;
  return path.endsWith("/") ? path : `${path}/`;
}

function uniqueGlyphs(glyphs: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const g of glyphs) {
    if (seen.has(g)) continue;
    seen.add(g);
    out.push(g);
  }
  return out;
}

/** Long-tail cursive letter spokes (52 URLs) — not stored in SERP_SPECIMENS. */
export function buildCursiveLetterSpecimen(
  letter: Letter,
  letterCase: LetterCase,
): SerpSpecimenConfig {
  const upper = letter.toUpperCase();
  const primary = cursiveGlyph(letter, letterCase);
  const capital = cursiveGlyph(letter, "capital");
  const small = cursiveGlyph(letter, "small");
  const bold = boldCursiveGlyph(letter, letterCase);
  const other = letterCase === "capital" ? small : capital;
  const glyphs = uniqueGlyphs([primary, other, bold]);
  const kw = letterPrimaryKeyword(letter, letterCase);
  const metaLine = `${glyphs.join(" ")} — ${kw} copy paste`;
  return {
    kind: "glyph-strip",
    glyphs,
    stripLabel:
      letterCase === "capital"
        ? `Cursive ${upper} — capital, small & bold Unicode`
        : `${upper} in cursive — small, capital & bold Unicode`,
    metaLine,
    ogSubtitle: `${primary} ${bold} — ${kw} copy & paste`,
  };
}

export function getSerpSpecimen(path: string): SerpSpecimenConfig | undefined {
  const normalized = normalizeSpecimenPath(path);
  const staticSpec = SERP_SPECIMENS[normalized];
  if (staticSpec) return staticSpec;
  const slug = normalized.slice(1, -1);
  const parsed = parseCursiveSlug(slug);
  if (parsed) {
    return buildCursiveLetterSpecimen(parsed.letter, parsed.letterCase);
  }
  return undefined;
}

export function getSerpSpecimenForSlug(slug: string): SerpSpecimenConfig | undefined {
  return getSerpSpecimen(`/${slug}/`);
}

/** Soft mobile SERP limit — wide Unicode faces eat pixel width faster than ASCII. */
export const SERP_META_DESCRIPTION_MAX = 155;

/** Strip trailing ellipsis / “…” so snippets never look cut off mid-thought. */
export function stripTrailingEllipsis(text: string): string {
  return text.replace(/(?:·\s*)?(?:\u2026|\.{3})\s*$/u, "").trimEnd();
}

/**
 * Fit a meta description under `max` without appending “…” or “...”.
 * Prefer a complete sentence, then a word boundary — never a mid-glyph cut + dots.
 */
export function fitMetaDescription(
  text: string,
  max = SERP_META_DESCRIPTION_MAX,
): string {
  const clean = stripTrailingEllipsis(text.trim());
  if (clean.length <= max) return clean;

  const cut = clean.slice(0, max);
  const sentenceEnd = Math.max(
    cut.lastIndexOf(". "),
    cut.lastIndexOf("! "),
    cut.lastIndexOf("? "),
  );
  if (sentenceEnd >= Math.floor(max * 0.55)) {
    return cut.slice(0, sentenceEnd + 1).trimEnd();
  }

  const space = cut.lastIndexOf(" ");
  if (space >= Math.floor(max * 0.55)) {
    return cut.slice(0, space).trimEnd();
  }

  return cut.trimEnd();
}

function descriptionAlreadyShowsSpecimen(
  description: string,
  spec: SerpSpecimenConfig,
): boolean {
  if (description.includes(spec.metaLine)) return true;
  const glyphs = spec.glyphs?.filter(Boolean) ?? [];
  if (glyphs.length === 0) return false;
  // One clear specimen face/glyph in the description is enough for SERP.
  return glyphs.some((g) => description.includes(g));
}

/**
 * Merge registry description with specimen line when not already present.
 * Never append “…” — Google already truncates; our own dots make the
 * result look broken next to competitors who show full faces.
 */
export function descriptionWithSerpSpecimen(
  path: string,
  description: string,
): string {
  const spec = getSerpSpecimen(path);
  const base = stripTrailingEllipsis(description);
  if (!spec?.metaLine) return fitMetaDescription(base);

  if (descriptionAlreadyShowsSpecimen(base, spec)) {
    return fitMetaDescription(base);
  }

  return fitMetaDescription(`${spec.metaLine}. ${base}`);
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

export const CURSIVE_HUB_FONT_SHOWCASE = buildFontRotateShowcase(
  SERP_SPECIMENS["/cursive-text-generator/"]!.phrase!,
  SERP_SPECIMENS["/cursive-text-generator/"]!.styleIds!,
);
