import { applyCombining, applyMap, buildAlphaMap } from "./buildMap";
import { BOLD_CURSIVE_MAP, CURSIVE_MAP } from "./cursive";

export type StyleCategory =
  | "classic"
  | "script"
  | "fun"
  | "social"
  | "utility";

export type FontStyle = {
  id: string;
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

export const STYLES: FontStyle[] = [
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
