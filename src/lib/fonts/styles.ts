import { applyCombining, applyMap, buildAlphaMap } from "./buildMap";
import { BOLD_CURSIVE_MAP, CURSIVE_MAP } from "./cursive";

export type StyleCategory =
  | "classic"
  | "script"
  | "fun"
  | "social"
  | "utility";

/**
 * How reliably a style renders across current consumer devices.
 * - universal: plain ASCII or a block shipped in every system font
 * - wide: modern iOS / Android / Windows / macOS all render it
 * - mixed: renders in most places but has known failure surfaces
 * - limited: expect breakage; use for short novelty text only
 */
export type StyleSupport = "universal" | "wide" | "mixed" | "limited";

export type StyleCompat = {
  support: StyleSupport;
  /** Concrete note about where this style actually breaks. */
  supportNote: string;
  /** Survives most platform display-name and username filters. */
  usernameSafe: boolean;
};

export type FontStyle = StyleCompat & {
  id: StyleId;
  label: string;
  category: StyleCategory;
  description: string;
  transform: (text: string) => string;
  /** True when some letters may stay Latin (incomplete Unicode set). */
  partialCoverage?: boolean;
};

const bold = buildAlphaMap({
  upper: 0x1d400,
  lower: 0x1d41a,
  digits: 0x1d7ce,
});

const italic = buildAlphaMap({
  upper: 0x1d434,
  lower: 0x1d44e,
  exceptions: { h: 0x210e },
});

const boldItalic = buildAlphaMap({
  upper: 0x1d468,
  lower: 0x1d482,
});

const script = CURSIVE_MAP;
const boldScript = BOLD_CURSIVE_MAP;

const fraktur = buildAlphaMap({
  upper: 0x1d504,
  lower: 0x1d51e,
  exceptions: {
    C: 0x212d,
    H: 0x210c,
    I: 0x2111,
    R: 0x211c,
    Z: 0x2128,
  },
});

const doubleStruck = buildAlphaMap({
  upper: 0x1d538,
  lower: 0x1d552,
  digits: 0x1d7d8,
  exceptions: {
    C: 0x2102,
    H: 0x210d,
    N: 0x2115,
    P: 0x2119,
    Q: 0x211a,
    R: 0x211d,
    Z: 0x2124,
  },
});

const sansBold = buildAlphaMap({
  upper: 0x1d5d4,
  lower: 0x1d5ee,
  digits: 0x1d7ec,
});

const monospace = buildAlphaMap({
  upper: 0x1d670,
  lower: 0x1d68a,
  digits: 0x1d7f6,
});

const fullwidth = (() => {
  const map: Record<string, string> = {};
  for (let i = 33; i <= 126; i++) {
    map[String.fromCharCode(i)] = String.fromCodePoint(0xff01 + (i - 33));
  }
  map[" "] = "\u3000";
  return map;
})();

const circled = buildAlphaMap({
  upper: 0x24b6,
  lower: 0x24d0,
  digits: 0x2460,
  exceptions: { "0": 0x24ea },
});

const squared = buildAlphaMap({
  upper: 0x1f130,
});

const upsideDownMap: Record<string, string> = {
  a: "ɐ",
  b: "q",
  c: "ɔ",
  d: "p",
  e: "ǝ",
  f: "ɟ",
  g: "ƃ",
  h: "ɥ",
  i: "ᴉ",
  j: "ɾ",
  k: "ʞ",
  l: "l",
  m: "ɯ",
  n: "u",
  o: "o",
  p: "d",
  q: "b",
  r: "ɹ",
  s: "s",
  t: "ʇ",
  u: "n",
  v: "ʌ",
  w: "ʍ",
  x: "x",
  y: "ʎ",
  z: "z",
  A: "∀",
  B: "𐐒",
  C: "Ɔ",
  D: "◖",
  E: "Ǝ",
  F: "Ⅎ",
  G: "⅁",
  H: "H",
  I: "I",
  J: "ſ",
  K: "ʞ",
  L: "˥",
  M: "W",
  N: "N",
  O: "O",
  P: "Ԁ",
  Q: "Ό",
  R: "ᴚ",
  S: "S",
  T: "⊥",
  U: "∩",
  V: "Λ",
  W: "M",
  X: "X",
  Y: "⅄",
  Z: "Z",
  "0": "0",
  "1": "Ɩ",
  "2": "ᄅ",
  "3": "Ɛ",
  "4": "ㄣ",
  "5": "ϛ",
  "6": "9",
  "7": "ㄥ",
  "8": "8",
  "9": "6",
  ".": "˙",
  ",": "'",
  "?": "¿",
  "!": "¡",
  "'": ",",
  '"': "„",
  "(": ")",
  ")": "(",
  "[": "]",
  "]": "[",
  "{": "}",
  "}": "{",
  "<": ">",
  ">": "<",
  "&": "⅋",
  _: "‾",
};

const smallCapsLower: Record<string, string> = {
  a: "ᴀ",
  b: "ʙ",
  c: "ᴄ",
  d: "ᴅ",
  e: "ᴇ",
  f: "ꜰ",
  g: "ɢ",
  h: "ʜ",
  i: "ɪ",
  j: "ᴊ",
  k: "ᴋ",
  l: "ʟ",
  m: "ᴍ",
  n: "ɴ",
  o: "ᴏ",
  p: "ᴘ",
  q: "ǫ",
  r: "ʀ",
  s: "ꜱ",
  t: "ᴛ",
  u: "ᴜ",
  v: "ᴠ",
  w: "ᴡ",
  x: "x",
  y: "ʏ",
  z: "ᴢ",
};

const superscriptMap: Record<string, string> = {
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
  a: "ᵃ",
  b: "ᵇ",
  c: "ᶜ",
  d: "ᵈ",
  e: "ᵉ",
  f: "ᶠ",
  g: "ᵍ",
  h: "ʰ",
  i: "ⁱ",
  j: "ʲ",
  k: "ᵏ",
  l: "ˡ",
  m: "ᵐ",
  n: "ⁿ",
  o: "ᵒ",
  p: "ᵖ",
  r: "ʳ",
  s: "ˢ",
  t: "ᵗ",
  u: "ᵘ",
  v: "ᵛ",
  w: "ʷ",
  x: "ˣ",
  y: "ʸ",
  z: "ᶻ",
  A: "ᴬ",
  B: "ᴮ",
  D: "ᴰ",
  E: "ᴱ",
  G: "ᴳ",
  H: "ᴴ",
  I: "ᴵ",
  J: "ᴶ",
  K: "ᴷ",
  L: "ᴸ",
  M: "ᴹ",
  N: "ᴺ",
  O: "ᴼ",
  P: "ᴾ",
  R: "ᴿ",
  T: "ᵀ",
  U: "ᵁ",
  V: "ⱽ",
  W: "ᵂ",
  "+": "⁺",
  "-": "⁻",
  "=": "⁼",
  "(": "⁽",
  ")": "⁾",
};

const subscriptMap: Record<string, string> = {
  "0": "₀",
  "1": "₁",
  "2": "₂",
  "3": "₃",
  "4": "₄",
  "5": "₅",
  "6": "₆",
  "7": "₇",
  "8": "₈",
  "9": "₉",
  a: "ₐ",
  e: "ₑ",
  h: "ₕ",
  i: "ᵢ",
  j: "ⱼ",
  k: "ₖ",
  l: "ₗ",
  m: "ₘ",
  n: "ₙ",
  o: "ₒ",
  p: "ₚ",
  r: "ᵣ",
  s: "ₛ",
  t: "ₜ",
  u: "ᵤ",
  v: "ᵥ",
  x: "ₓ",
  "+": "₊",
  "-": "₋",
  "=": "₌",
  "(": "₍",
  ")": "₎",
};

function upsideDown(text: string): string {
  let out = "";
  for (const ch of text) {
    out = (upsideDownMap[ch] ?? upsideDownMap[ch.toLowerCase()] ?? ch) + out;
  }
  return out;
}

const GLITCH_UP = ["\u030d", "\u030e", "\u0304", "\u0305", "\u0311", "\u0310"];
const GLITCH_MID = ["\u0315", "\u031b", "\u0340", "\u0341"];
const GLITCH_DOWN = [
  "\u0316",
  "\u0317",
  "\u0318",
  "\u0319",
  "\u031c",
  "\u0320",
  "\u0321",
  "\u0322",
  "\u0323",
  "\u0324",
  "\u0325",
];

function pickMarks(pool: string[], count: number, offset: number): string {
  let marks = "";
  for (let i = 0; i < count; i++) {
    marks += pool[(offset + i) % pool.length];
  }
  return marks;
}

/** Zalgo-style glitch text (deterministic for SSR). */
function glitch(text: string): string {
  let out = "";
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]!;
    if (/\s/.test(ch)) {
      out += ch;
      continue;
    }
    const seed = ch.charCodeAt(0) + i;
    out +=
      ch +
      pickMarks(GLITCH_UP, 1 + (seed % 3), seed) +
      pickMarks(GLITCH_MID, seed % 2, seed + 1) +
      pickMarks(GLITCH_DOWN, 1 + ((seed + 1) % 3), seed + 2);
  }
  return out;
}

function reverseText(text: string): string {
  return Array.from(text).reverse().join("");
}

function decorateChars(text: string, mark: string): string {
  let out = "";
  for (const ch of text) {
    out += /\s/.test(ch) ? ch : ch + mark;
  }
  return out;
}

const sansItalic = buildAlphaMap({
  upper: 0x1d608,
  lower: 0x1d622,
});

const boldFraktur = buildAlphaMap({
  upper: 0x1d56c,
  lower: 0x1d586,
});

const parenthesized: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (let i = 0; i < 26; i++) {
    const letter = String.fromCharCode(0x249c + i);
    map[String.fromCharCode(97 + i)] = letter;
    map[String.fromCharCode(65 + i)] = letter;
  }
  for (let i = 0; i < 9; i++) {
    map[String(i + 1)] = String.fromCodePoint(0x2474 + i);
  }
  return map;
})();

function smallCapsTransform(text: string): string {
  let out = "";
  for (const ch of text) {
    const lower = ch.toLowerCase();
    out += smallCapsLower[lower] ?? ch;
  }
  return out;
}

/** Superscript where it exists; small-caps fallback so whole bios stay tiny. */
function tinyTransform(text: string): string {
  let out = "";
  for (const ch of text) {
    out += superscriptMap[ch] ?? smallCapsLower[ch.toLowerCase()] ?? ch;
  }
  return out;
}

const sans = buildAlphaMap({
  upper: 0x1d5a0,
  lower: 0x1d5ba,
});

const sansBoldItalic = buildAlphaMap({
  upper: 0x1d63c,
  lower: 0x1d656,
});

const blueCircle = buildAlphaMap({ upper: 0x1f150 });
const negativeSquared = buildAlphaMap({ upper: 0x1f170 });

const currencyLike: Record<string, string> = {
  a: "₳",
  A: "₳",
  b: "฿",
  B: "฿",
  c: "¢",
  C: "ℂ",
  e: "€",
  E: "€",
  k: "₭",
  K: "₭",
  n: "₦",
  N: "₦",
  p: "₽",
  P: "₱",
  r: "₹",
  R: "₹",
  s: "$",
  S: "$",
  t: "₮",
  T: "₮",
  w: "₩",
  W: "₩",
  y: "¥",
  Y: "¥",
};

const greekLike: Record<string, string> = {
  a: "α",
  A: "Α",
  b: "β",
  B: "Β",
  d: "δ",
  D: "Δ",
  e: "ε",
  E: "Ε",
  i: "ι",
  I: "Ι",
  k: "κ",
  K: "Κ",
  n: "η",
  N: "Ν",
  o: "ο",
  O: "Ο",
  p: "ρ",
  P: "Ρ",
  r: "г",
  R: "Γ",
  t: "τ",
  T: "Τ",
  u: "υ",
  U: "Υ",
  v: "ν",
  V: "V",
  w: "ω",
  W: "Ω",
  x: "χ",
  X: "Χ",
  y: "γ",
  Y: "Υ",
  z: "ζ",
  Z: "Ζ",
};

function spacedText(text: string): string {
  return [...text.trim()].join(" ");
}

function wrapPhrase(text: string, emoji: string): string {
  const t = text.trim();
  return t ? `${emoji} ${t} ${emoji}` : emoji;
}

function clapWords(text: string): string {
  const parts = text.trim().split(/\s+/).filter(Boolean);
  return parts.length ? parts.join(" 👏 ") : text;
}

function toBinary(text: string): string {
  const bytes = new TextEncoder().encode(text);
  return Array.from(bytes, (b) => b.toString(2).padStart(8, "0")).join(" ");
}

const MORSE: Record<string, string> = {
  a: ".-",
  b: "-...",
  c: "-.-.",
  d: "-..",
  e: ".",
  f: "..-.",
  g: "--.",
  h: "....",
  i: "..",
  j: ".---",
  k: "-.-",
  l: ".-..",
  m: "--",
  n: "-.",
  o: "---",
  p: ".--.",
  q: "--.-",
  r: ".-.",
  s: "...",
  t: "-",
  u: "..-",
  v: "...-",
  w: ".--",
  x: "-..-",
  y: "-.--",
  z: "--..",
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  " ": "/",
};

function toMorse(text: string): string {
  return [...text.toLowerCase()]
    .map((ch) => MORSE[ch] ?? ch)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function creepy(text: string): string {
  const marks = ["\u0300", "\u0301", "\u0308", "\u0315"];
  let out = "";
  let i = 0;
  for (const ch of text) {
    if (/\s/.test(ch)) out += ch;
    else {
      out += ch + marks[i % marks.length] + marks[(i + 1) % marks.length];
      i += 1;
    }
  }
  return out;
}

/**
 * Rendering reality per style, checked against the Unicode block each map uses.
 * Keys here define the canonical style id set — a style without an entry is a
 * type error, so compatibility copy can never silently drift from the maps.
 */
const STYLE_COMPAT = {
  // Mathematical Alphanumeric Symbols (U+1D400–U+1D7FF): shipped in the default
  // font stack of every current OS. The safest family of "fancy" letters.
  bold: {
    support: "wide",
    supportNote:
      "Mathematical bold. Renders on all current phones and desktops; only pre-2015 Android may miss glyphs.",
    usernameSafe: true,
  },
  italic: {
    support: "wide",
    supportNote:
      "Mathematical italic. Broadly supported; a few Windows browsers substitute a slightly different serif.",
    usernameSafe: true,
  },
  "bold-italic": {
    support: "wide",
    supportNote: "Mathematical bold italic. Same coverage as bold and italic.",
    usernameSafe: true,
  },
  cursive: {
    support: "wide",
    supportNote:
      "Mathematical script. Well supported, but Windows often draws it with a plainer fallback than iOS does.",
    usernameSafe: true,
  },
  "bold-cursive": {
    support: "wide",
    supportNote:
      "Mathematical bold script. Slightly thinner font coverage than plain script on older Android.",
    usernameSafe: true,
  },
  fraktur: {
    support: "wide",
    supportNote:
      "Mathematical Fraktur. Five letters (C H I R Z) come from the Letterlike Symbols block and can look mismatched.",
    usernameSafe: true,
  },
  "bold-fraktur": {
    support: "wide",
    supportNote:
      "Mathematical bold Fraktur. Heavier blackletter; coverage matches regular Fraktur.",
    usernameSafe: true,
  },
  "double-struck": {
    support: "wide",
    supportNote:
      "Blackboard bold. Several capitals (C H N P Q R Z) come from Letterlike Symbols, so weights can differ slightly.",
    usernameSafe: true,
  },
  sans: {
    support: "wide",
    supportNote: "Mathematical sans-serif. Clean and broadly supported.",
    usernameSafe: true,
  },
  "sans-bold": {
    support: "universal",
    supportNote:
      "The most reliable fancy style. Renders correctly on every platform we have tested, including older Android.",
    usernameSafe: true,
  },
  "sans-italic": {
    support: "wide",
    supportNote: "Mathematical sans-serif italic. Same coverage as sans.",
    usernameSafe: true,
  },
  "sans-bold-italic": {
    support: "wide",
    supportNote: "Mathematical sans-serif bold italic. Same coverage as sans.",
    usernameSafe: true,
  },
  monospace: {
    support: "wide",
    supportNote:
      "Mathematical monospace. Reliable, though Discord and Slack may re-render it inside code blocks.",
    usernameSafe: true,
  },

  // Non-mathematical blocks with their own quirks.
  fullwidth: {
    support: "universal",
    supportNote:
      "Halfwidth and Fullwidth Forms, shipped with CJK fonts everywhere. Each character is double width, so bios hit character limits about twice as fast.",
    usernameSafe: true,
  },
  vaporwave: {
    support: "universal",
    supportNote:
      "Identical characters to Aesthetic / Fullwidth — same universal support and same double-width spacing cost.",
    usernameSafe: true,
  },
  bubble: {
    support: "wide",
    supportNote:
      "Enclosed Alphanumerics. Widely supported; some Android builds draw the circles noticeably smaller than the surrounding text.",
    usernameSafe: true,
  },
  "small-caps": {
    support: "wide",
    supportNote:
      "Latin phonetic letters. Lowercase x has no small-cap form in Unicode and stays plain; F and S use Latin Extended-D, which older Android can miss.",
    usernameSafe: true,
  },
  greek: {
    support: "wide",
    supportNote:
      "Real Greek letters, so support is excellent — but screen readers announce them as Greek and only some Latin letters have a lookalike.",
    usernameSafe: true,
  },
  mirror: {
    support: "universal",
    supportNote:
      "Reverses character order without changing the characters, so the output is ordinary text that renders anywhere.",
    usernameSafe: true,
  },
  spaced: {
    support: "universal",
    supportNote:
      "Plain letters separated by spaces. Renders everywhere, but @handle fields that reject spaces will refuse it.",
    usernameSafe: true,
  },
  binary: {
    support: "universal",
    supportNote:
      "Plain digits — an encoding, not a font. Always renders, never looks styled.",
    usernameSafe: true,
  },
  morse: {
    support: "universal",
    supportNote:
      "Plain dots and dashes. Always renders; letters without a Morse code are passed through unchanged.",
    usernameSafe: true,
  },

  // Combining marks: the character count doubles and many apps strip or
  // mis-stack them. Never safe for usernames.
  strikethrough: {
    support: "mixed",
    supportNote:
      "Uses a combining overlay after every character, which doubles the character count. Some apps strip the marks on paste or shift them off-centre.",
    usernameSafe: false,
  },
  underline: {
    support: "mixed",
    supportNote:
      "Combining low line. Renders in most chat apps but can collide with descenders like g and y.",
    usernameSafe: false,
  },
  "double-underline": {
    support: "mixed",
    supportNote:
      "Combining double low line. Slightly patchier than single underline on Android.",
    usernameSafe: false,
  },
  slash: {
    support: "mixed",
    supportNote:
      "Combining solidus. Alignment varies a lot between fonts; often sits off-centre on iOS.",
    usernameSafe: false,
  },
  dots: {
    support: "mixed",
    supportNote:
      "Combining dot above. Can be clipped when the line height is tight.",
    usernameSafe: false,
  },
  wave: {
    support: "mixed",
    supportNote:
      "Combining tilde below. Usually renders, but can be clipped in single-line fields.",
    usernameSafe: false,
  },
  creepy: {
    support: "mixed",
    supportNote:
      "Two combining accents per character. Lighter than Zalgo, but still triples the character count.",
    usernameSafe: false,
  },
  glitch: {
    support: "limited",
    supportNote:
      "Stacks many combining marks per character, which multiplies the character count, overflows line height, and is frequently stripped or truncated. Keep it very short.",
    usernameSafe: false,
  },

  // Incomplete alphabets — some letters cannot be converted at all.
  superscript: {
    support: "mixed",
    supportNote:
      "Unicode has no superscript q, and capitals are missing C F Q S X Y Z. Those letters stay plain.",
    usernameSafe: false,
  },
  subscript: {
    support: "mixed",
    supportNote:
      "Unicode only defines subscripts for a e h i j k l m n o p r s t u v x. Every other letter stays plain.",
    usernameSafe: false,
  },
  tiny: {
    support: "mixed",
    supportNote:
      "Superscript letters where they exist, small caps everywhere else, so the height is deliberately uneven. Very small on high-density screens.",
    usernameSafe: false,
  },
  "upside-down": {
    support: "mixed",
    supportNote:
      "Borrows lookalikes from several scripts, so a few capitals render in a different style to the rest of the word.",
    usernameSafe: false,
  },
  parenthesized: {
    support: "mixed",
    supportNote:
      "Unicode only defines parenthesized lowercase letters, so capitals map to the same glyphs as lowercase.",
    usernameSafe: false,
  },
  currency: {
    support: "mixed",
    supportNote:
      "Currency signs used as letter lookalikes. Only a few letters have a match and readability is poor.",
    usernameSafe: false,
  },

  // Supplementary-plane blocks that many platforms draw as emoji.
  squared: {
    support: "mixed",
    supportNote:
      "Squared Latin capitals from the Enclosed Alphanumeric Supplement. Capitals only, and some platforms render them as emoji tiles rather than text.",
    usernameSafe: false,
  },
  "negative-squared": {
    support: "limited",
    supportNote:
      "iOS and Android draw these as coloured emoji (🅰 style) rather than letters, so the result rarely matches the preview.",
    usernameSafe: false,
  },
  "blue-circle": {
    support: "limited",
    supportNote:
      "Rendered as coloured emoji on most phones. Capitals only, and the colour cannot be controlled.",
    usernameSafe: false,
  },

  // Decoration rather than letterforms.
  hearts: {
    support: "wide",
    supportNote:
      "Inserts ♥ after every character, which doubles the length. The heart itself renders everywhere.",
    usernameSafe: false,
  },
  stars: {
    support: "wide",
    supportNote:
      "Inserts ★ after every character, which doubles the length. The star itself renders everywhere.",
    usernameSafe: false,
  },
  brace: {
    support: "wide",
    supportNote:
      "CJK bracket punctuation. Renders everywhere, but adds full-width padding on each side.",
    usernameSafe: false,
  },
  corner: {
    support: "wide",
    supportNote:
      "CJK corner brackets. Renders everywhere, but adds full-width padding on each side.",
    usernameSafe: false,
  },
  fire: {
    support: "wide",
    supportNote:
      "Wraps the phrase in emoji. Emoji are blocked in most username fields and read aloud by screen readers.",
    usernameSafe: false,
  },
  sparkle: {
    support: "wide",
    supportNote:
      "Wraps the phrase in emoji. Emoji are blocked in most username fields and read aloud by screen readers.",
    usernameSafe: false,
  },
  clap: {
    support: "wide",
    supportNote:
      "Inserts a clap emoji between words. Renders everywhere, but is read aloud once per word by screen readers.",
    usernameSafe: false,
  },
} as const satisfies Record<string, StyleCompat>;

/** Canonical style id set, derived from the compatibility table. */
export type StyleId = keyof typeof STYLE_COMPAT;

type RawStyle = Omit<FontStyle, keyof StyleCompat>;

const RAW_STYLES: RawStyle[] = [
  {
    id: "bold",
    label: "Bold",
    category: "classic",
    description: "Math bold Unicode — great for bios and captions.",
    transform: (t) => applyMap(t, bold),
  },
  {
    id: "italic",
    label: "Italic",
    category: "classic",
    description: "Slanted mathematical italic letters.",
    transform: (t) => applyMap(t, italic),
  },
  {
    id: "bold-italic",
    label: "Bold Italic",
    category: "classic",
    description: "Bold + italic combined.",
    transform: (t) => applyMap(t, boldItalic),
  },
  {
    id: "cursive",
    label: "Cursive / Script",
    category: "script",
    description: "Elegant script letters for names and quotes.",
    transform: (t) => applyMap(t, script),
  },
  {
    id: "bold-cursive",
    label: "Bold Cursive",
    category: "script",
    description: "Heavier script style.",
    transform: (t) => applyMap(t, boldScript),
  },
  {
    id: "fraktur",
    label: "Gothic / Fraktur",
    category: "fun",
    description: "Old-style blackletter look.",
    transform: (t) => applyMap(t, fraktur),
  },
  {
    id: "double-struck",
    label: "Double Struck",
    category: "classic",
    description: "Outlined “blackboard bold” letters.",
    transform: (t) => applyMap(t, doubleStruck),
  },
  {
    id: "sans-bold",
    label: "Sans Bold",
    category: "social",
    description: "Clean bold sans for usernames.",
    transform: (t) => applyMap(t, sansBold),
  },
  {
    id: "monospace",
    label: "Monospace",
    category: "utility",
    description: "Typewriter-style fixed-width letters.",
    transform: (t) => applyMap(t, monospace),
  },
  {
    id: "fullwidth",
    label: "Aesthetic / Fullwidth",
    category: "social",
    description: "Wide “Ａｅｓｔｈｅｔｉｃ” spacing.",
    transform: (t) => applyMap(t, fullwidth),
  },
  {
    id: "bubble",
    label: "Bubble",
    category: "fun",
    description: "Circled letters and digits.",
    transform: (t) => applyMap(t, circled),
  },
  {
    id: "squared",
    label: "Squared",
    category: "fun",
    description: "Squared capital letters (A–Z).",
    transform: (t) => applyMap(t.toUpperCase(), squared),
  },
  {
    id: "small-caps",
    label: "Small Caps",
    category: "social",
    description: "Compact uppercase-looking lowercase.",
    transform: smallCapsTransform,
  },
  {
    id: "strikethrough",
    label: "Strikethrough",
    category: "utility",
    description: "Combining long stroke overlay.",
    transform: (t) => applyCombining(t, "\u0336"),
  },
  {
    id: "underline",
    label: "Underline",
    category: "utility",
    description: "Combining underline mark.",
    transform: (t) => applyCombining(t, "\u0332"),
  },
  {
    id: "superscript",
    label: "Superscript",
    category: "utility",
    description: "Raised letters and numbers.",
    transform: (t) => applyMap(t, superscriptMap),
    partialCoverage: true,
  },
  {
    id: "subscript",
    label: "Subscript",
    category: "utility",
    description: "Lowered letters and numbers.",
    transform: (t) => applyMap(t, subscriptMap),
    partialCoverage: true,
  },
  {
    id: "upside-down",
    label: "Upside Down",
    category: "fun",
    description: "Flips and reverses your text.",
    transform: upsideDown,
  },
  {
    id: "glitch",
    label: "Glitch / Zalgo",
    category: "fun",
    description: "Cursed Zalgo-style combining marks.",
    transform: glitch,
  },
  {
    id: "tiny",
    label: "Tiny / Small",
    category: "utility",
    description:
      "Compact bio letters: superscript plus small-caps fallback for missing glyphs.",
    transform: tinyTransform,
  },
  {
    id: "mirror",
    label: "Mirror / Reverse",
    category: "fun",
    description: "Reverses letter order for mirror-style novelty text.",
    transform: reverseText,
  },
  {
    id: "sans-italic",
    label: "Sans Italic",
    category: "classic",
    description: "Clean sans-serif italic Unicode.",
    transform: (t) => applyMap(t, sansItalic),
  },
  {
    id: "bold-fraktur",
    label: "Bold Old English",
    category: "fun",
    description: "Heavy blackletter / gothic Unicode.",
    transform: (t) => applyMap(t, boldFraktur),
  },
  {
    id: "parenthesized",
    label: "Parenthesized",
    category: "fun",
    description: "Letters inside parentheses, ⒜⒝⒞ style.",
    transform: (t) => applyMap(t, parenthesized),
  },
  {
    id: "hearts",
    label: "Hearts",
    category: "fun",
    description: "Adds a heart after each letter.",
    transform: (t) => decorateChars(t, "♥"),
  },
  {
    id: "stars",
    label: "Stars",
    category: "fun",
    description: "Adds a star after each letter.",
    transform: (t) => decorateChars(t, "★"),
  },
  {
    id: "slash",
    label: "Slash Overlay",
    category: "utility",
    description: "Combining solidus through each letter.",
    transform: (t) => applyCombining(t, "\u0338"),
  },
  {
    id: "vaporwave",
    label: "Vaporwave",
    category: "social",
    description: "Fullwidth vaporwave letters (same Unicode as aesthetic width).",
    transform: (t) => applyMap(t, fullwidth),
  },
  {
    id: "sans",
    label: "Sans",
    category: "classic",
    description: "Mathematical sans-serif letters.",
    transform: (t) => applyMap(t, sans),
  },
  {
    id: "sans-bold-italic",
    label: "Sans Bold Italic",
    category: "classic",
    description: "Bold slanted sans Unicode.",
    transform: (t) => applyMap(t, sansBoldItalic),
  },
  {
    id: "spaced",
    label: "Spaced Aesthetic",
    category: "social",
    description: "Inserts spaces between characters for wide bio vibes.",
    transform: spacedText,
  },
  {
    id: "double-underline",
    label: "Double Underline",
    category: "utility",
    description: "Double combining underline under each letter.",
    transform: (t) => applyCombining(t, "\u0333"),
  },
  {
    id: "dots",
    label: "Dot Overlay",
    category: "utility",
    description: "Combining dots above each letter.",
    transform: (t) => applyCombining(t, "\u0307"),
  },
  {
    id: "wave",
    label: "Wavy",
    category: "fun",
    description: "Combining tilde below for a wavy look.",
    transform: (t) => applyCombining(t, "\u0330"),
  },
  {
    id: "fire",
    label: "Fire Wrap",
    category: "fun",
    description: "Wraps your phrase with fire emoji.",
    transform: (t) => wrapPhrase(t, "🔥"),
  },
  {
    id: "sparkle",
    label: "Sparkle Wrap",
    category: "fun",
    description: "Wraps your phrase with sparkles.",
    transform: (t) => wrapPhrase(t, "✨"),
  },
  {
    id: "clap",
    label: "Clap Between",
    category: "fun",
    description: "Puts 👏 between words.",
    transform: clapWords,
  },
  {
    id: "blue-circle",
    label: "Blue Circle Caps",
    category: "fun",
    description: "Regional-style blue circle letter emoji (A–Z).",
    transform: (t) => applyMap(t.toUpperCase(), blueCircle),
    partialCoverage: true,
  },
  {
    id: "negative-squared",
    label: "Negative Squared",
    category: "fun",
    description: "Filled squared Latin capitals.",
    transform: (t) => applyMap(t.toUpperCase(), negativeSquared),
    partialCoverage: true,
  },
  {
    id: "currency",
    label: "Currency Lookalike",
    category: "fun",
    description: "Letter lookalikes from currency and symbol sets.",
    transform: (t) => applyMap(t, currencyLike),
    partialCoverage: true,
  },
  {
    id: "greek",
    label: "Greek Lookalike",
    category: "fun",
    description: "Latin letters swapped for similar Greek glyphs.",
    transform: (t) => applyMap(t, greekLike),
    partialCoverage: true,
  },
  {
    id: "binary",
    label: "Binary",
    category: "utility",
    description: "UTF-8 bytes as 8-bit binary groups.",
    transform: toBinary,
  },
  {
    id: "morse",
    label: "Morse Code",
    category: "utility",
    description: "Letters and digits as Morse sequences.",
    transform: toMorse,
    partialCoverage: true,
  },
  {
    id: "creepy",
    label: "Creepy Marks",
    category: "fun",
    description: "Lighter glitch combining marks for horror tags.",
    transform: creepy,
  },
  {
    id: "brace",
    label: "Brace Frame",
    category: "fun",
    description: "Frames the phrase with fancy braces.",
    transform: (t) => `【${t.trim()}】`,
  },
  {
    id: "corner",
    label: "Corner Frame",
    category: "fun",
    description: "Frames the phrase with corner brackets.",
    transform: (t) => `『${t.trim()}』`,
  },
];

export const STYLES: FontStyle[] = RAW_STYLES.map((style) => ({
  ...style,
  ...STYLE_COMPAT[style.id],
}));

export const SUPPORT_LABELS: Record<StyleSupport, string> = {
  universal: "Works everywhere",
  wide: "Wide support",
  mixed: "Mixed support",
  limited: "Limited support",
};

export const STYLES_BY_ID = Object.fromEntries(
  STYLES.map((s) => [s.id, s]),
) as Record<string, FontStyle>;

export function transform(text: string, styleId: string): string {
  const style = STYLES_BY_ID[styleId];
  if (!style) return text;
  return style.transform(text);
}

export function transformAll(text: string): { style: FontStyle; output: string }[] {
  return STYLES.map((style) => ({
    style,
    output: style.transform(text),
  }));
}

export const STYLE_IDS = STYLES.map((s) => s.id);

export function transformSelected(
  text: string,
  styleIds: string[],
): { style: FontStyle; output: string }[] {
  return styleIds
    .map((id) => STYLES_BY_ID[id])
    .filter(Boolean)
    .map((style) => ({
      style,
      output: style.transform(text),
    }));
}
