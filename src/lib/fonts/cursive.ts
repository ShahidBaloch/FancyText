import { buildAlphaMap } from "./buildMap";

/** Mathematical Script / cursive Unicode map (capital + small). */
export const CURSIVE_MAP = buildAlphaMap({
  upper: 0x1d49c,
  lower: 0x1d4b6,
  exceptions: {
    B: 0x212c,
    E: 0x2130,
    F: 0x2131,
    H: 0x210b,
    I: 0x2110,
    L: 0x2112,
    M: 0x2133,
    R: 0x211b,
    e: 0x212f,
    g: 0x210a,
    o: 0x2134,
  },
});

export const BOLD_CURSIVE_MAP = buildAlphaMap({
  upper: 0x1d4d0,
  lower: 0x1d4ea,
});

export const LETTERS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
] as const;

export type Letter = (typeof LETTERS)[number];
export type LetterCase = "capital" | "small";

export function isLetter(value: string): value is Letter {
  return (LETTERS as readonly string[]).includes(value.toLowerCase());
}

export function cursiveGlyph(letter: Letter, letterCase: LetterCase): string {
  const ch = letterCase === "capital" ? letter.toUpperCase() : letter;
  return CURSIVE_MAP[ch] ?? ch;
}

export function boldCursiveGlyph(
  letter: Letter,
  letterCase: LetterCase,
): string {
  const ch = letterCase === "capital" ? letter.toUpperCase() : letter;
  return BOLD_CURSIVE_MAP[ch] ?? ch;
}

export function letterUrl(letter: Letter, letterCase: LetterCase): string {
  return letterCase === "capital"
    ? `/cursive-capital-${letter}/`
    : `/cursive-small-${letter}/`;
}

/** Full A–Z Mathematical Script row for the cursive hub alphabet section. */
export function cursiveAlphabet(letterCase: LetterCase): string {
  return LETTERS.map((letter) => cursiveGlyph(letter, letterCase)).join("");
}

export function parseCursiveSlug(
  slug: string,
): { letter: Letter; letterCase: LetterCase } | null {
  const capital = /^cursive-capital-([a-z])$/i.exec(slug);
  if (capital && isLetter(capital[1].toLowerCase())) {
    return {
      letter: capital[1].toLowerCase() as Letter,
      letterCase: "capital",
    };
  }
  const small = /^cursive-small-([a-z])$/i.exec(slug);
  if (small && isLetter(small[1].toLowerCase())) {
    return {
      letter: small[1].toLowerCase() as Letter,
      letterCase: "small",
    };
  }
  return null;
}

export function letterPrimaryKeyword(
  letter: Letter,
  letterCase: LetterCase,
): string {
  return letterCase === "capital"
    ? `cursive ${letter}`
    : `${letter} in cursive`;
}

export function letterH1(letter: Letter, letterCase: LetterCase): string {
  const upper = letter.toUpperCase();
  return letterCase === "capital"
    ? `Cursive Capital ${upper}`
    : `${upper} in cursive`;
}

export function letterTitle(letter: Letter, letterCase: LetterCase): string {
  const upper = letter.toUpperCase();
  const glyph = cursiveGlyph(letter, letterCase);
  if (letterCase === "capital") {
    return `Cursive Capital ${upper}, Small ${upper} In Cursive (${glyph}) | FancifyText`;
  }
  return `${upper} in Cursive — Small Cursive ${upper} (${glyph}) Copy & Paste | FancifyText`;
}

export function letterDescription(
  letter: Letter,
  letterCase: LetterCase,
): string {
  const upper = letter.toUpperCase();
  const capital = cursiveGlyph(letter, "capital");
  const small = cursiveGlyph(letter, "small");
  if (letterCase === "capital") {
    return `Copy cursive capital ${upper} (${capital}) and small ${letter} in cursive (${small}). Free Unicode cursive ${upper} for names, bios, worksheets, and social media.`;
  }
  return `Copy ${letter} in cursive (${small}) and capital cursive ${upper} (${capital}). Free small cursive ${upper} Unicode letter to paste anywhere.`;
}

export function toCursiveText(text: string): string {
  let out = "";
  for (const ch of text) {
    out += CURSIVE_MAP[ch] ?? ch;
  }
  return out;
}
