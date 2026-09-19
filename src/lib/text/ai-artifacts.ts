/**
 * Clean up the typographic artefacts that arrive with text pasted out of an AI
 * chat window.
 *
 * ChatGPT, Claude and Gemini all emit typographer's punctuation — em dashes,
 * curly quotes, a real ellipsis character — plus the occasional non-breaking or
 * zero-width space. None of that is wrong, but it is conspicuous, it breaks
 * plain-text search and diffing, and it is the most-cited "this was written by
 * a model" tell.
 *
 * This is presented as tidying punctuation, not as defeating AI detectors.
 * Detectors do not work by looking for em dashes, and claiming otherwise would
 * be selling something that does not exist.
 */

export type EmDashHandling = "keep" | "hyphen" | "comma";

export type CleanOptions = {
  /** What to do with — (U+2014). */
  emDash?: EmDashHandling;
  /** Curly quotes and apostrophes to straight ASCII. */
  straightQuotes?: boolean;
  /** … to three periods. */
  expandEllipsis?: boolean;
  /** Non-breaking and exotic spaces to a normal space. */
  normalizeSpaces?: boolean;
  /** Remove zero-width characters and the BOM. */
  removeInvisible?: boolean;
  /** Collapse three or more newlines to a single blank line. */
  collapseBlankLines?: boolean;
};

export type CleanFinding = {
  label: string;
  count: number;
  /** What it was replaced with, for the "what changed" readout. */
  replacement: string;
};

export type CleanResult = {
  text: string;
  findings: CleanFinding[];
};

const EM_DASH_REPLACEMENTS: Record<EmDashHandling, string> = {
  keep: "—",
  hyphen: " - ",
  comma: ", ",
};

const CURLY_QUOTES: [RegExp, string, string][] = [
  [/[\u201C\u201D\u201E\u201F]/gu, '"', "Curly double quotes"],
  [/[\u2018\u2019\u201A\u201B]/gu, "'", "Curly apostrophes"],
  [/[\u2039\u203A]/gu, "'", "Single angle quotes"],
  [/[\u00AB\u00BB]/gu, '"', "Double angle quotes"],
];

const INVISIBLE = /[\u00AD\u200B-\u200D\u2060\uFEFF]/gu;
const ODD_SPACES = /[\u00A0\u2000-\u200A\u202F\u205F\u3000]/gu;

/**
 * Run the cleanup passes, reporting what each one changed.
 *
 * Returning counts rather than just the cleaned string is the point: the user
 * can see that eleven em dashes were replaced and decide whether that was what
 * they wanted.
 */
export function cleanAiText(
  input: string,
  options: CleanOptions = {},
): CleanResult {
  const {
    emDash = "hyphen",
    straightQuotes = true,
    expandEllipsis = true,
    normalizeSpaces = true,
    removeInvisible = true,
    collapseBlankLines = true,
  } = options;

  const findings: CleanFinding[] = [];
  let text = input;

  const record = (label: string, count: number, replacement: string) => {
    if (count > 0) findings.push({ label, count, replacement });
  };

  if (emDash !== "keep") {
    const count = text.match(/\u2014/gu)?.length ?? 0;
    if (count) {
      // Collapse the spaces an em dash is often already padded with, so
      // "word — word" does not become "word  -  word".
      text = text.replace(/\s*\u2014\s*/gu, EM_DASH_REPLACEMENTS[emDash]);
      record("Em dashes", count, EM_DASH_REPLACEMENTS[emDash].trim() || "space");
    }
  }

  const enDashes = text.match(/\u2013/gu)?.length ?? 0;
  if (enDashes) {
    // En dashes are almost always a numeric range: keep it tight, not spaced.
    text = text.replace(/\u2013/gu, "-");
    record("En dashes", enDashes, "-");
  }

  if (straightQuotes) {
    for (const [pattern, replacement, label] of CURLY_QUOTES) {
      const count = text.match(pattern)?.length ?? 0;
      if (count) {
        text = text.replace(pattern, replacement);
        record(label, count, replacement);
      }
    }
  }

  if (expandEllipsis) {
    const count = text.match(/\u2026/gu)?.length ?? 0;
    if (count) {
      text = text.replace(/\u2026/gu, "...");
      record("Ellipsis characters", count, "...");
    }
  }

  if (removeInvisible) {
    const count = text.match(INVISIBLE)?.length ?? 0;
    if (count) {
      text = text.replace(INVISIBLE, "");
      record("Zero-width characters", count, "removed");
    }
  }

  if (normalizeSpaces) {
    const count = text.match(ODD_SPACES)?.length ?? 0;
    if (count) {
      text = text.replace(ODD_SPACES, " ");
      record("Non-breaking spaces", count, "normal space");
    }
  }

  if (collapseBlankLines) {
    const count = text.match(/\n{3,}/gu)?.length ?? 0;
    if (count) {
      text = text.replace(/\n{3,}/gu, "\n\n");
      record("Runs of blank lines", count, "one blank line");
    }
  }

  return { text, findings };
}
