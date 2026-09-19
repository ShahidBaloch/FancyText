import { STYLES, type StyleId } from "@/lib/fonts/styles";

/**
 * Reverse direction of `src/lib/fonts/styles.ts`: styled Unicode back to plain
 * letters.
 *
 * The reverse maps are *derived* by running each style's own transform over the
 * ASCII alphabet, so they cannot drift from the forward maps. Adding a style to
 * `STYLES` automatically makes it decodable; the only thing a new style needs is
 * a `DECODE_TIER` entry, which the type system demands.
 */

/**
 * How trustworthy it is to decode a style back to Latin.
 *
 * - `safe`: the characters exist only as styled Latin (Mathematical
 *   Alphanumeric Symbols, fullwidth forms, enclosed alphanumerics, small caps).
 *   Decoding them cannot corrupt real writing.
 * - `lookalike`: the characters are borrowed from a living script. Decoding
 *   Cyrillic "а" to "a" fixes a faux-Cyrillic username but mangles genuine
 *   Russian, so this tier is opt-in.
 * - `none`: the style is not a per-character substitution, so there is nothing
 *   to reverse one character at a time (combining marks, encodings, wrappers).
 *   These are handled by the mark-stripping and whitespace passes instead.
 */
export type DecodeTier = "safe" | "lookalike" | "none";

const DECODE_TIER = {
  // Mathematical Alphanumeric Symbols and friends — styled Latin, nothing else.
  bold: "safe",
  italic: "safe",
  "bold-italic": "safe",
  cursive: "safe",
  "bold-cursive": "safe",
  fraktur: "safe",
  "bold-fraktur": "safe",
  "double-struck": "safe",
  sans: "safe",
  "sans-bold": "safe",
  "sans-italic": "safe",
  "sans-bold-italic": "safe",
  monospace: "safe",
  fullwidth: "safe",
  vaporwave: "safe",
  bubble: "safe",
  squared: "safe",
  "negative-squared": "safe",
  "blue-circle": "safe",
  parenthesized: "safe",
  "parenthesized-caps": "safe",
  "small-caps": "safe",
  superscript: "safe",
  subscript: "safe",
  tiny: "safe",

  // Borrowed from living scripts — decoding these can damage real text.
  greek: "lookalike",
  cyrillic: "lookalike",
  cherokee: "lookalike",
  "cherokee-small": "lookalike",
  japanese: "lookalike",
  cjk: "lookalike",
  bopomofo: "lookalike",
  fat: "lookalike",
  cool: "lookalike",
  letterlike: "lookalike",
  smooth: "lookalike",
  accent: "lookalike",
  lisu: "lookalike",
  runic: "lookalike",
  coptic: "lookalike",
  armenian: "lookalike",
  stroked: "lookalike",
  currency: "lookalike",
  "vapor-lambda": "lookalike",
  "upside-down": "lookalike",
  turned: "lookalike",

  // Not a per-character substitution.
  strikethrough: "none",
  underline: "none",
  "double-underline": "none",
  slash: "none",
  dots: "none",
  wave: "none",
  creepy: "none",
  glitch: "none",
  keycap: "none",
  ringed: "none",
  hearts: "none",
  stars: "none",
  brace: "none",
  corner: "none",
  fire: "none",
  sparkle: "none",
  clap: "none",
  spaced: "none",
  mirror: "none",
  binary: "none",
  morse: "none",
} as const satisfies Record<StyleId, DecodeTier>;

/**
 * Which case to restore when a style maps "a" and "A" to the same glyph.
 *
 * Unicode has caps-only decorative blocks (squared, negative squared) and
 * caps-shaped lowercase blocks (small caps). Guessing wrong on either produces
 * SHOUTING or lowercase where the user had neither, so the preference is
 * declared rather than inferred.
 */
const CASE_COLLAPSE_PREFERENCE: Partial<Record<StyleId, "upper" | "lower">> = {
  squared: "upper",
  "negative-squared": "upper",
  "blue-circle": "upper",
  "parenthesized-caps": "upper",
  lisu: "upper",
  runic: "upper",
  // Small caps and parenthesized lowercase read as ordinary words, not caps.
  "small-caps": "lower",
  tiny: "lower",
  parenthesized: "lower",
};

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const DIGITS = "0123456789";

/**
 * Combining-mark blocks that decorative styles draw from: the diacritical marks
 * block and its supplements, plus enclosing and half marks.
 *
 * Deliberately excludes Hebrew, Arabic, Thai and Indic combining marks. Those
 * are load-bearing letters in their own scripts, and stripping them would not
 * clean text up, it would destroy it.
 */
const COMBINING_MARK =
  /[\u0300-\u036F\u0483-\u0489\u1AB0-\u1AFF\u1DC0-\u1DFF\u20D0-\u20F0\uFE20-\uFE2F]/u;

/**
 * Marks that only ever show up as decoration in Latin text: overlays used for
 * strikethrough, underline and slash effects, the enclosing marks, and the
 * Zalgo-specific pools.
 *
 * The marks left out of this set are the ordinary accents — grave, acute,
 * circumflex, tilde, diaeresis, caron, cedilla — because "café" and "naïve" are
 * text, not decoration. Those are only removed when a base character carries
 * more than one of them, which is what a Zalgo stack looks like and what normal
 * writing never does.
 */
const DECORATIVE_ONLY_MARK =
  /[\u0305\u0307\u030D\u030E\u0310\u0311\u0315\u0316-\u0325\u0330\u0332\u0333\u0335\u0336\u0337\u0338\u0340\u0341\u20D0-\u20F0\uFE20-\uFE2F]/u;

/** Zero-width and invisible formatting characters, including the BOM. */
const INVISIBLE =
  /[\u00AD\u180E\u200B-\u200F\u2028\u2029\u202A-\u202E\u2060-\u2064\u206A-\u206F\uFEFF]/gu;

/** Non-breaking and exotic spaces that should read as an ordinary space. */
const ODD_SPACES = /[\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]/gu;

/** Symbols our styles interleave between letters or wrap phrases in. */
const INTERLEAVED_DECORATION = /[\u2665\u2605\u3010\u3011\u300E\u300F\u{1F44F}\u{1F525}\u2728]/gu;

/**
 * Remove decorative combining marks while leaving real accents alone.
 *
 * Runs on the raw input rather than the NFC form on purpose. Normalising first
 * composes a Zalgo mark into its base — "H" plus U+0323 becomes a single Ḥ —
 * after which there is no mark left to strip and the decoration survives.
 */
function stripDecorativeMarks(input: string): { text: string; removed: number } {
  const chars = Array.from(input);
  let out = "";
  let removed = 0;
  let i = 0;

  while (i < chars.length) {
    out += chars[i]!;
    i += 1;

    const marks: string[] = [];
    while (i < chars.length && COMBINING_MARK.test(chars[i]!)) {
      marks.push(chars[i]!);
      i += 1;
    }
    if (!marks.length) continue;

    // More than one mark on a base is a stack, not an accent.
    const stacked = marks.length > 1;
    for (const mark of marks) {
      if (stacked || DECORATIVE_ONLY_MARK.test(mark)) removed += 1;
      else out += mark;
    }
  }

  return { text: out, removed };
}

type ReverseEntry = {
  plain: string;
  styleId: StyleId;
  tier: Exclude<DecodeTier, "none">;
};

let reverseIndex: Map<string, ReverseEntry> | null = null;

/**
 * Build `styled character -> plain character` by probing each style's own
 * transform.
 *
 * Two rules keep this safe. A mapping is only recorded when the output is a
 * single non-ASCII code point, which drops the identity mappings that partial
 * alphabets leave behind and — critically — drops upside-down's ASCII pairs
 * (b→q, n→u) that would otherwise corrupt ordinary words. And the first style
 * to claim a glyph keeps it, with `safe` styles probed before `lookalike` ones,
 * so shared glyphs resolve to the interpretation least likely to be wrong.
 */
function buildReverseIndex(): Map<string, ReverseEntry> {
  const index = new Map<string, ReverseEntry>();

  const decodable = STYLES.filter(
    (style) => DECODE_TIER[style.id] !== "none",
  ).sort((a, b) => {
    const rank = (id: StyleId) => (DECODE_TIER[id] === "safe" ? 0 : 1);
    return rank(a.id) - rank(b.id);
  });

  for (const style of decodable) {
    const tier = DECODE_TIER[style.id] as Exclude<DecodeTier, "none">;
    const collapses = style.transform("a") === style.transform("A");
    const preference = CASE_COLLAPSE_PREFERENCE[style.id] ?? "lower";
    const order =
      collapses && preference === "upper"
        ? [UPPER, LOWER, DIGITS]
        : [LOWER, UPPER, DIGITS];

    for (const set of order) {
      for (const plain of set) {
        const styled = style.transform(plain);
        // One code point only: multi-character output means the style appends
        // or wraps rather than substitutes, and is not reversible here.
        if (Array.from(styled).length !== 1) continue;
        if (styled === plain) continue;
        if (styled.codePointAt(0)! < 0x80) continue;
        if (index.has(styled)) continue;
        index.set(styled, { plain, styleId: style.id, tier });
      }
    }
  }

  // Fullwidth punctuation shares the block with fullwidth letters but is not
  // produced by probing the alphabet.
  for (let cp = 0xff01; cp <= 0xff5e; cp++) {
    const styled = String.fromCodePoint(cp);
    if (index.has(styled)) continue;
    index.set(styled, {
      plain: String.fromCharCode(cp - 0xff01 + 33),
      styleId: "fullwidth",
      tier: "safe",
    });
  }

  return index;
}

function getReverseIndex(): Map<string, ReverseEntry> {
  reverseIndex ??= buildReverseIndex();
  return reverseIndex;
}

export type UnformatOptions = {
  /** Decode letters borrowed from living scripts (faux Cyrillic, Cherokee…). */
  decodeLookalikes?: boolean;
  /** Strip combining marks (strikethrough, underline, Zalgo). */
  stripMarks?: boolean;
  /** Remove zero-width characters and normalise exotic spaces. */
  stripInvisible?: boolean;
  /** Drop ♥ ★ 👏 style decoration inserted between letters. */
  stripDecoration?: boolean;
  /** Collapse runs of spaces and trailing whitespace. */
  tidyWhitespace?: boolean;
  /**
   * Upside-down text is written back to front as well as glyph-swapped.
   * `auto` un-mirrors when flipped letters dominate, which is the common case;
   * the other two settings exist because "turned" text uses the same glyphs
   * without reversing, and no amount of inspection can tell them apart.
   */
  reverseOrder?: "auto" | "always" | "never";
};

export type UnformatFinding = {
  /** Human label, e.g. "Sans Bold" or "Combining marks". */
  label: string;
  /** How many characters this accounted for. */
  count: number;
  kind: "style" | "lookalike" | "marks" | "invisible" | "decoration" | "spaces";
};

export type UnformatResult = {
  text: string;
  findings: UnformatFinding[];
  /** True when the input already looked like plain text. */
  unchanged: boolean;
  /** Set when the text was also mirrored back from upside-down order. */
  reversedOrder: boolean;
  /**
   * Lookalike characters left in place because `decodeLookalikes` was off.
   * Drives the "turn on lookalike decoding" hint.
   */
  undecodedLookalikes: number;
};

const STYLE_LABELS = new Map(STYLES.map((s) => [s.id, s.label]));

/**
 * Convert styled Unicode text back to plain letters.
 *
 * Deliberately conservative by default: it undoes decoration that has a plain
 * twin and leaves real writing alone. Turning on `decodeLookalikes` trades that
 * safety for reach.
 */
export function unformatText(
  input: string,
  options: UnformatOptions = {},
): UnformatResult {
  const {
    decodeLookalikes = false,
    stripMarks = true,
    stripInvisible = true,
    stripDecoration = true,
    tidyWhitespace = true,
    reverseOrder: reverseOrderMode = "auto",
  } = options;

  if (!input) {
    return {
      text: "",
      findings: [],
      unchanged: true,
      reversedOrder: false,
      undecodedLookalikes: 0,
    };
  }

  const index = getReverseIndex();
  const counts = new Map<string, { count: number; kind: UnformatFinding["kind"] }>();
  const bump = (label: string, kind: UnformatFinding["kind"], by = 1) => {
    const entry = counts.get(label) ?? { count: 0, kind };
    entry.count += by;
    counts.set(label, entry);
  };

  // Marks come off before normalising, then NFC tidies up whatever real accents
  // were left behind. Doing it the other way round hides Zalgo inside
  // precomposed characters.
  let working = input;

  if (stripMarks) {
    const stripped = stripDecorativeMarks(working);
    working = stripped.text;
    if (stripped.removed) bump("Combining marks", "marks", stripped.removed);
  }

  working = working.normalize("NFC");

  if (stripInvisible) {
    const invisible = working.match(INVISIBLE)?.length ?? 0;
    if (invisible) {
      working = working.replace(INVISIBLE, "");
      bump("Invisible characters", "invisible", invisible);
    }
    const spaces = working.match(ODD_SPACES)?.length ?? 0;
    if (spaces) {
      working = working.replace(ODD_SPACES, " ");
      bump("Non-breaking spaces", "spaces", spaces);
    }
  }

  if (stripDecoration) {
    const decoration = working.match(INTERLEAVED_DECORATION)?.length ?? 0;
    if (decoration) {
      working = working.replace(INTERLEAVED_DECORATION, "");
      bump("Inserted symbols", "decoration", decoration);
    }
  }

  let out = "";
  let upsideDownHits = 0;
  let decodedLetters = 0;
  let undecodedLookalikes = 0;

  for (const ch of working) {
    const entry = index.get(ch);
    if (!entry) {
      out += ch;
      continue;
    }
    if (entry.tier === "lookalike" && !decodeLookalikes) {
      undecodedLookalikes += 1;
      out += ch;
      continue;
    }
    out += entry.plain;
    decodedLetters += 1;
    if (entry.styleId === "upside-down" || entry.styleId === "turned") {
      upsideDownHits += 1;
    }
    bump(
      STYLE_LABELS.get(entry.styleId) ?? entry.styleId,
      entry.tier === "lookalike" ? "lookalike" : "style",
      1,
    );
  }

  const looksFlipped =
    decodedLetters > 0 && upsideDownHits / decodedLetters > 0.6;
  const reversedOrder =
    reverseOrderMode === "always" ||
    (reverseOrderMode === "auto" && looksFlipped);
  if (reversedOrder) {
    out = out
      .split("\n")
      .map((line) => Array.from(line).reverse().join(""))
      .reverse()
      .join("\n");
  }

  if (tidyWhitespace) {
    const before = out;
    out = out
      .split("\n")
      .map((line) => line.replace(/[ \t]{2,}/g, " ").replace(/[ \t]+$/g, ""))
      .join("\n");
    if (out !== before) bump("Extra spacing", "spaces", 1);
  }

  const findings: UnformatFinding[] = [...counts.entries()]
    .map(([label, { count, kind }]) => ({ label, count, kind }))
    .sort((a, b) => b.count - a.count);

  return {
    text: out,
    findings,
    unchanged: out === input,
    reversedOrder,
    undecodedLookalikes,
  };
}

/**
 * Cheap check for "is any of this styled?" — used to decide whether to show a
 * reverse affordance next to a normal generator.
 */
export function hasStyledCharacters(input: string): boolean {
  if (!input) return false;
  const index = getReverseIndex();
  for (const ch of input) {
    if (index.has(ch)) return true;
    if (COMBINING_MARK.test(ch)) return true;
  }
  return INVISIBLE.test(input);
}
