/**
 * Correctness check for the reverse direction and the Markdown converter.
 *
 * The reverse maps in `src/lib/text/unformat.ts` are derived by probing the
 * forward transforms, which makes them impossible to forget to update but not
 * impossible to break — a change to a shared glyph, or a new style claiming a
 * character another style already owned, silently degrades decoding. So every
 * style that claims to be safely decodable has to prove it round-trips.
 *
 * Two other things are checked because getting them wrong is both easy and
 * invisible: that default settings never damage text in real non-Latin scripts,
 * and that the Markdown converter leaves no syntax behind.
 *
 * Run with: node scripts/check-text-pipeline.mjs
 */

import { build } from "esbuild";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = await mkdtemp(join(tmpdir(), "fancify-text-"));
const outfile = join(dir, "pipeline.mjs");

await build({
  absWorkingDir: root,
  stdin: {
    contents: `
      export { STYLES, transform } from "@/lib/fonts/styles";
      export { unformatText } from "@/lib/text/unformat";
      export { markdownToLinkedIn } from "@/lib/text/markdown";
      export { cleanAiText } from "@/lib/text/ai-artifacts";
      export { countText } from "@/lib/text/count";
    `,
    resolveDir: root,
    loader: "ts",
  },
  bundle: true,
  format: "esm",
  platform: "node",
  outfile,
  logLevel: "silent",
  alias: { "@": join(root, "src") },
});

const { STYLES, transform, unformatText, markdownToLinkedIn, cleanAiText, countText } =
  await import(pathToFileURL(outfile).href);

let failures = 0;
const fail = (message) => {
  failures += 1;
  console.error(`FAIL  ${message}`);
};

/**
 * Styles that substitute one character for another and claim to decode cleanly.
 * Anything not listed here is either a combining-mark effect, an encoding, a
 * wrapper, or a borrowed-script lookalike where two letters can share a glyph —
 * all documented as best-effort rather than exact.
 */
const EXACT_ROUND_TRIP = [
  "bold",
  "italic",
  "bold-italic",
  "cursive",
  "bold-cursive",
  "fraktur",
  "bold-fraktur",
  "double-struck",
  "sans",
  "sans-bold",
  "sans-italic",
  "sans-bold-italic",
  "monospace",
  "fullwidth",
  "vaporwave",
  "bubble",
];

const SAMPLE = "Hello World 123";

for (const id of EXACT_ROUND_TRIP) {
  const style = STYLES.find((s) => s.id === id);
  if (!style) {
    fail(`round trip: style "${id}" no longer exists — update this list`);
    continue;
  }
  const back = unformatText(transform(SAMPLE, id)).text;
  if (back !== SAMPLE) {
    fail(`round trip: ${id} produced ${JSON.stringify(back)}, expected ${JSON.stringify(SAMPLE)}`);
  }
}

// Case-collapsing styles cannot restore capitalisation, but must restore letters.
const CASE_INSENSITIVE_ROUND_TRIP = ["small-caps", "squared", "parenthesized"];
for (const id of CASE_INSENSITIVE_ROUND_TRIP) {
  const back = unformatText(transform(SAMPLE, id)).text;
  if (back.toLowerCase() !== SAMPLE.toLowerCase()) {
    fail(`round trip: ${id} produced ${JSON.stringify(back)}, expected ${SAMPLE} ignoring case`);
  }
}

/**
 * Real writing must survive the default settings untouched. Decoding lookalikes
 * is opt-in precisely because it cannot tell these apart from decoration.
 */
const MUST_NOT_CHANGE = [
  "Привет, как дела",
  "Γεια σας κόσμε",
  "café naïve Zoë",
  "日本語のテキスト",
  "مرحبا بالعالم",
  "שלום עולם",
  "สวัสดีชาวโลก",
  "Ordinary English text, untouched.",
];

for (const sample of MUST_NOT_CHANGE) {
  const { text } = unformatText(sample);
  if (text !== sample) {
    fail(`preserved text: ${JSON.stringify(sample)} became ${JSON.stringify(text)}`);
  }
}

// Combining-mark effects must lose the marks and keep the letters.
for (const id of ["strikethrough", "underline", "glitch", "creepy", "dots", "wave"]) {
  const back = unformatText(transform("scary text", id)).text;
  if (back !== "scary text") {
    fail(`mark stripping: ${id} produced ${JSON.stringify(back)}`);
  }
}

// Markdown must not leak its own syntax into the output.
const MARKDOWN = `# Heading one

Body with **bold**, *italic*, ***both***, ~~struck~~, and \`code\`.

## Heading two

- First
- Second
  - Nested
1. One
2. Two

> A quotation

| A | B |
| --- | --- |
| 1 | 2 |

---

A [link](https://example.com) and snake_case_name and __dunder__.`;

for (const mode of ["convert", "strip"]) {
  const { text } = markdownToLinkedIn(MARKDOWN, { mode });
  const leftovers = [
    [/\*\*/, "bold markers"],
    [/(^|\n)#{1,6}\s/, "heading markers"],
    [/~~/, "strikethrough markers"],
    [/`/, "code ticks"],
    [/\]\(/, "link syntax"],
    [/(^|\n)\s*\|.*\|/, "table pipes"],
  ];
  for (const [pattern, label] of leftovers) {
    if (pattern.test(text)) {
      fail(`markdown ${mode}: ${label} survived conversion`);
    }
  }
  if (!text.includes("snake_case_name")) {
    fail(`markdown ${mode}: snake_case identifier was mangled`);
  }
}

// Strip mode must not introduce styled characters at all.
const stripped = markdownToLinkedIn(MARKDOWN, { mode: "strip" }).text;
if (unformatText(stripped).findings.some((f) => f.kind === "style")) {
  fail("markdown strip: output contains styled characters");
}

// Convert mode must actually style something.
const converted = markdownToLinkedIn(MARKDOWN, { mode: "convert" }).text;
if (!unformatText(converted).findings.some((f) => f.kind === "style")) {
  fail("markdown convert: output contains no styled characters");
}

// AI cleanup must remove what it reports and report what it removes.
const messy = "It\u2019s a \u201Ctest\u201D \u2014 really\u2026 no\u00a0break\u200b here \u2013 ok";
const cleaned = cleanAiText(messy);
if (/[\u2014\u2013\u2018\u2019\u201C\u201D\u2026\u00a0\u200b]/.test(cleaned.text)) {
  fail(`ai cleanup: artefacts survived in ${JSON.stringify(cleaned.text)}`);
}
if (cleaned.findings.length === 0) {
  fail("ai cleanup: changed text but reported no findings");
}

// A styled letter is a surrogate pair, so the two counts must diverge.
const counted = countText(transform("bold", "sans-bold"));
if (counted.utf16 !== counted.graphemes * 2) {
  fail(
    `counting: expected UTF-16 length to be double the grapheme count, got ${counted.utf16} vs ${counted.graphemes}`,
  );
}

await rm(dir, { recursive: true, force: true });

console.log(
  `Checked ${EXACT_ROUND_TRIP.length} exact round trips, ${CASE_INSENSITIVE_ROUND_TRIP.length} case-insensitive round trips, ${MUST_NOT_CHANGE.length} preserved scripts, and the Markdown converter in both modes.`,
);
if (failures > 0) {
  console.error(`\n${failures} problem(s) found.`);
  process.exit(1);
}
console.log("Text pipeline clean.");
