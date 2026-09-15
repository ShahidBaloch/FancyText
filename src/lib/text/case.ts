/**
 * Case conversions. These are plain-ASCII-safe string operations, deliberately
 * separate from the Unicode style maps: the output here is still ordinary text
 * that search engines and screen readers read normally.
 */

export type CaseConversion = {
  id: string;
  label: string;
  /** What it is actually for, not a restatement of the name. */
  description: string;
  convert: (text: string) => string;
};

/**
 * Words kept lowercase inside a title. Based on the common newsroom style
 * rules: articles, coordinating conjunctions, and short prepositions.
 */
const TITLE_MINOR_WORDS = new Set([
  "a",
  "an",
  "and",
  "as",
  "at",
  "but",
  "by",
  "for",
  "from",
  "in",
  "into",
  "nor",
  "of",
  "off",
  "on",
  "onto",
  "or",
  "over",
  "per",
  "so",
  "the",
  "to",
  "up",
  "via",
  "vs",
  "with",
  "yet",
]);

function capitalize(word: string): string {
  if (!word) return word;
  return word[0]!.toUpperCase() + word.slice(1).toLowerCase();
}

export function toSentenceCase(text: string): string {
  const lowered = text.toLowerCase();
  // Capitalise the first letter, and the first letter after . ! ? or a newline.
  return lowered.replace(
    /(^\s*[a-z])|([.!?]\s+[a-z])|(\n\s*[a-z])/g,
    (match) => match.toUpperCase(),
  );
}

export function toTitleCase(text: string): string {
  const tokens = text.split(/(\s+)/);
  const wordPositions: number[] = [];
  tokens.forEach((token, i) => {
    if (/\S/.test(token)) wordPositions.push(i);
  });
  const lastWord = wordPositions[wordPositions.length - 1];

  return tokens
    .map((token, i) => {
      if (!/\S/.test(token)) return token;
      const isFirst = i === wordPositions[0];
      const isLast = i === lastWord;
      const bare = token.toLowerCase();
      if (!isFirst && !isLast && TITLE_MINOR_WORDS.has(bare.replace(/[^a-z]/g, ""))) {
        return bare;
      }
      return capitalize(token);
    })
    .join("");
}

export function toCapitalizedCase(text: string): string {
  return text.replace(/\S+/g, (word) => capitalize(word));
}

export function toAlternatingCase(text: string): string {
  let letterIndex = 0;
  return Array.from(text)
    .map((ch) => {
      if (!/[a-z]/i.test(ch)) return ch;
      const out = letterIndex % 2 === 0 ? ch.toLowerCase() : ch.toUpperCase();
      letterIndex += 1;
      return out;
    })
    .join("");
}

export function toInverseCase(text: string): string {
  return Array.from(text)
    .map((ch) =>
      ch === ch.toLowerCase() ? ch.toUpperCase() : ch.toLowerCase(),
    )
    .join("");
}

export const CASE_CONVERSIONS: CaseConversion[] = [
  {
    id: "sentence",
    label: "Sentence case",
    description:
      "Capitalises the first letter of each sentence and lowercases the rest. The usual fix for text typed with caps lock on.",
    convert: toSentenceCase,
  },
  {
    id: "title",
    label: "Title Case",
    description:
      "Capitalises each word except short articles, conjunctions, and prepositions, which stay lowercase unless they are first or last.",
    convert: toTitleCase,
  },
  {
    id: "capitalized",
    label: "Capitalized Case",
    description:
      "Capitalises the first letter of every word without exceptions. Useful for names and headings where every word should be raised.",
    convert: toCapitalizedCase,
  },
  {
    id: "upper",
    label: "UPPER CASE",
    description:
      "Everything uppercase. Readable, but long runs of capitals slow reading down and are often treated as shouting.",
    convert: (text) => text.toUpperCase(),
  },
  {
    id: "lower",
    label: "lower case",
    description:
      "Everything lowercase. Handy for normalising text before you paste it somewhere that styles it for you.",
    convert: (text) => text.toLowerCase(),
  },
  {
    id: "alternating",
    label: "aLtErNaTiNg cAsE",
    description:
      "Alternates case letter by letter, skipping punctuation and spaces. Used for the mocking-tone meme.",
    convert: toAlternatingCase,
  },
  {
    id: "inverse",
    label: "iNVERSE cASE",
    description:
      "Flips the case of every letter. The quick repair for text typed with caps lock and shift both fighting you.",
    convert: toInverseCase,
  },
];

export type TextStats = {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  lines: number;
};

export function textStats(text: string): TextStats {
  const trimmed = text.trim();
  return {
    // Code points, not UTF-16 units, so emoji count as one.
    characters: Array.from(text).length,
    charactersNoSpaces: Array.from(text.replace(/\s/g, "")).length,
    words: trimmed ? trimmed.split(/\s+/).length : 0,
    sentences: trimmed ? (trimmed.match(/[^.!?]+[.!?]*/g) ?? []).length : 0,
    lines: text ? text.split("\n").length : 0,
  };
}
