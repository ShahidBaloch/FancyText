/**
 * Text measurement that tells the truth about styled Unicode.
 *
 * "How long is my post?" has three different answers and they diverge badly the
 * moment fancy text is involved. Every letter in the Mathematical Alphanumeric
 * block sits above U+FFFF, so it is a surrogate pair: 𝗯𝗼𝗹𝗱 is four letters,
 * four code points, and eight UTF-16 code units. A counter that reports one
 * number without saying which one it is will be wrong for exactly the users of
 * a fancy-text site.
 */

export type TextCounts = {
  /** What `String.length` returns. Two per styled letter. */
  utf16: number;
  /** Unicode code points — what a person means by "characters". */
  codePoints: number;
  /** User-perceived characters: an emoji with modifiers counts once. */
  graphemes: number;
  words: number;
  /** Non-empty lines. */
  lines: number;
  /** Blank lines, which several LinkedIn fields silently discard. */
  blankLines: number;
  sentences: number;
  /** At 200 words per minute, rounded up, in minutes. */
  readingMinutes: number;
};

let segmenter: Intl.Segmenter | null | undefined;

function getSegmenter(): Intl.Segmenter | null {
  if (segmenter === undefined) {
    segmenter =
      typeof Intl !== "undefined" && "Segmenter" in Intl
        ? new Intl.Segmenter("en", { granularity: "grapheme" })
        : null;
  }
  return segmenter;
}

/** User-perceived character count, falling back to code points. */
export function graphemeCount(value: string): number {
  const seg = getSegmenter();
  if (!seg) return Array.from(value).length;
  let count = 0;
  for (const _ of seg.segment(value)) count += 1;
  return count;
}

export function codePointCount(value: string): number {
  return Array.from(value).length;
}

export function wordCount(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

export function countText(value: string): TextCounts {
  const allLines = value.split("\n");
  const words = wordCount(value);
  const sentences = value.trim()
    ? (value.match(/[^.!?\n]+[.!?]+(\s|$)|[^.!?\n]+$/g) ?? []).length
    : 0;

  return {
    utf16: value.length,
    codePoints: codePointCount(value),
    graphemes: graphemeCount(value),
    words,
    lines: allLines.filter((line) => line.trim()).length,
    blankLines: allLines.filter((line) => !line.trim()).length,
    sentences,
    readingMinutes: words ? Math.max(1, Math.ceil(words / 200)) : 0,
  };
}

/**
 * Split text at a fold measured in user-perceived characters.
 *
 * Used to show what survives above LinkedIn's "…see more". Counting graphemes
 * rather than `String.length` keeps the marker in the same visual place whether
 * the hook is styled or plain.
 */
export function splitAtFold(
  value: string,
  fold: number,
): { visible: string; hidden: string } {
  const seg = getSegmenter();
  if (!seg) {
    const chars = Array.from(value);
    return {
      visible: chars.slice(0, fold).join(""),
      hidden: chars.slice(fold).join(""),
    };
  }

  let taken = 0;
  let cut = value.length;
  for (const { index } of seg.segment(value)) {
    if (taken === fold) {
      cut = index;
      break;
    }
    taken += 1;
  }
  return { visible: value.slice(0, cut), hidden: value.slice(cut) };
}
