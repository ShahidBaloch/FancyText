/**
 * Invisible and blank characters, grouped by what actually happens when you
 * paste them. The distinction users get wrong is "blank" (a real glyph that
 * occupies width) versus "zero-width" (literally nothing is drawn) — the first
 * survives "this field cannot be empty" checks, the second does not.
 */

export type InvisibleKind = "blank" | "zero-width" | "space";

export type InvisibleChar = {
  id: string;
  /** The character itself. */
  char: string;
  name: string;
  codePoint: string;
  kind: InvisibleKind;
  /** One-line answer to "which one do I want?". */
  bestFor: string;
  /** Honest behaviour notes, including where it fails. */
  notes: string;
};

export const INVISIBLE_KIND_LABELS: Record<InvisibleKind, string> = {
  blank: "Blank glyph (has width)",
  "zero-width": "Zero width (draws nothing)",
  space: "Space character",
};

export const INVISIBLE_CHARS: InvisibleChar[] = [
  {
    id: "braille-blank",
    char: "\u2800",
    name: "Braille Pattern Blank",
    codePoint: "U+2800",
    kind: "blank",
    bestFor:
      "Empty lines in an Instagram bio, and messages that look blank in Discord or WhatsApp.",
    notes:
      "The most reliable option. Unicode does not classify it as whitespace, so apps that trim spaces from the start and end of a field leave it alone. Braille patterns ship with almost every system font, so it very rarely turns into a box.",
  },
  {
    id: "hangul-filler",
    char: "\u3164",
    name: "Hangul Filler",
    codePoint: "U+3164",
    kind: "blank",
    bestFor:
      "Blank usernames and display names in games such as Free Fire and PUBG Mobile.",
    notes:
      "Counts as a letter rather than a space, so it satisfies validation that rejects an empty or whitespace-only name. It is full-width, so one character takes roughly two characters of visual space. Some platforms now block it specifically.",
  },
  {
    id: "choseong-filler",
    char: "\u115F",
    name: "Hangul Choseong Filler",
    codePoint: "U+115F",
    kind: "blank",
    bestFor:
      "A fallback for blank names when a platform has started rejecting U+3164.",
    notes:
      "Behaves much like Hangul Filler but is less widely blocklisted. Font coverage is slightly worse, so on older Android it can render as a visible box instead of a blank.",
  },
  {
    id: "zero-width-space",
    char: "\u200B",
    name: "Zero Width Space",
    codePoint: "U+200B",
    kind: "zero-width",
    bestFor:
      "Allowing a long word or URL to wrap, and splitting characters so a string is not auto-detected.",
    notes:
      "Truly occupies no width — nothing appears at all. Because it is invisible and weightless, many platforms strip it on submit, and it will not satisfy a field that requires content. It also breaks text search and can confuse screen readers.",
  },
  {
    id: "word-joiner",
    char: "\u2060",
    name: "Word Joiner",
    codePoint: "U+2060",
    kind: "zero-width",
    bestFor: "Preventing a line break at a specific point without adding width.",
    notes:
      "The modern replacement for using U+FEFF inside text. Zero width, and unlike Zero Width Space it forbids a break rather than allowing one.",
  },
  {
    id: "zero-width-non-joiner",
    char: "\u200C",
    name: "Zero Width Non-Joiner",
    codePoint: "U+200C",
    kind: "zero-width",
    bestFor:
      "Stopping two characters from forming a ligature or joining in scripts such as Arabic and Persian.",
    notes:
      "A real typographic control, not a blank. Using it as filler is unreliable because renderers may ignore or strip it.",
  },
  {
    id: "zero-width-joiner",
    char: "\u200D",
    name: "Zero Width Joiner",
    codePoint: "U+200D",
    kind: "zero-width",
    bestFor:
      "Building combined emoji sequences, such as joining a person with a profession.",
    notes:
      "Do not use this as blank filler. Between two emoji it can merge them into a completely different glyph, so pasted text may change appearance unexpectedly.",
  },
  {
    id: "no-break-space",
    char: "\u00A0",
    name: "No-Break Space",
    codePoint: "U+00A0",
    kind: "space",
    bestFor:
      "Indenting, and keeping a space that HTML or a chat app would otherwise collapse.",
    notes:
      "Visibly a space and the same width as a normal one, but consecutive copies are not collapsed into a single space. Still whitespace, so fields that trim input will remove it from the ends.",
  },
  {
    id: "em-space",
    char: "\u2003",
    name: "Em Space",
    codePoint: "U+2003",
    kind: "space",
    bestFor: "A wide, deliberate gap between words in a bio or display name.",
    notes:
      "Roughly double the width of a normal space. It is whitespace, so it can be trimmed or collapsed depending on the app.",
  },
];

export const INVISIBLE_FAQ = [
  {
    question: "Which invisible character should I use?",
    answer:
      "Start with Braille Pattern Blank (U+2800). It is not treated as whitespace, so apps that trim spaces keep it, and it renders correctly almost everywhere. Only move to Hangul Filler (U+3164) if you specifically need a blank game username, because some platforms block it.",
  },
  {
    question: "Why did my blank character disappear when I pasted it?",
    answer:
      "Most likely you used a zero-width character such as U+200B. Many platforms strip characters that have no width and no meaning, and some trim whitespace from the start and end of a field. Use a blank glyph like U+2800 instead, which occupies real width and survives trimming.",
  },
  {
    question: "How do I put a blank line in my Instagram bio?",
    answer:
      "Instagram removes empty lines, so put one blank character on the line by itself rather than leaving it truly empty. Copy a single U+2800, paste it on its own line between your text lines, and save. Editing the bio on the web version is more reliable than in the app.",
  },
  {
    question: "Can I make my username completely blank?",
    answer:
      "Sometimes, but it depends on the platform and it changes over time. A blank name needs a character that passes validation as content rather than as a space, which is why Hangul Filler is the usual choice. Many platforms now reject it, and some treat a deliberately blank name as a terms-of-service problem.",
  },
  {
    question: "Is an invisible character the same as a space?",
    answer:
      "No. A space is whitespace, so apps are allowed to collapse several into one and to trim them from the ends of a field. A blank glyph like U+2800 is an ordinary printable character that happens to draw nothing, so it is preserved like any other letter.",
  },
  {
    question: "Will invisible characters break accessibility?",
    answer:
      "Blank glyphs are ignored by most screen readers, so a bio spacer is harmless. Zero-width characters are worse: they can split a word into pieces that a screen reader pronounces separately, and they break find-on-page because the text no longer matches what the reader sees.",
  },
  {
    question: "How do I check that I actually copied something?",
    answer:
      "The preview above puts brackets around the characters so you can see the width, and it reports exactly how many code points you copied. After pasting, you can move the cursor with the arrow keys — it will pause on each invisible character.",
  },
];
