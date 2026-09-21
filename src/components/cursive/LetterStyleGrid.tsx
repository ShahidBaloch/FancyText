"use client";

import Link from "next/link";
import { useCopyFeedback } from "@/lib/copy";
import { transformSelected } from "@/lib/fonts/styles";
import type { Letter } from "@/lib/fonts/cursive";

/** Popular, widely-rendered styles that read clearly on a single letter. */
const STYLE_IDS = [
  "bold",
  "italic",
  "bold-italic",
  "fraktur",
  "double-struck",
  "sans-bold",
  "monospace",
  "fullwidth",
  "bubble",
  "squared",
  "small-caps",
];

const STYLE_SPOKES: Record<string, string> = {
  bold: "/bold-text-generator/",
  italic: "/italic-text-generator/",
  fraktur: "/old-english-text-generator/",
  bubble: "/bubble-text-generator/",
  squared: "/cool-text-generator/",
  "small-caps": "/small-caps-text-generator/",
  fullwidth: "/aesthetic-fonts/",
  monospace: "/monospace-text-generator/",
};

export function LetterStyleGrid({ letter }: { letter: Letter }) {
  const upper = letter.toUpperCase();
  const pair = `${upper}${letter}`;
  const { copiedId, errorId, announcement, copy } = useCopyFeedback();

  // Drop styles that leave this letter unchanged (partial-coverage alphabets).
  const rows = transformSelected(pair, STYLE_IDS).filter(
    ({ output }) => output !== pair,
  );

  if (rows.length === 0) return null;

  return (
    <section className="seo-section" aria-labelledby="letter-styles-heading">
      <h2 id="letter-styles-heading">
        The letter {upper} in other fancy styles
      </h2>
      <p className="seo-lead">
        Want a different look than script? Tap to copy {upper} and {letter} in
        these Unicode styles—each one pastes into bios, names, and chats without
        a font download.
      </p>
      <ul className="sample-list">
        {rows.map(({ style, output }) => {
          const id = `letterstyle-${letter}-${style.id}`;
          const spoke = STYLE_SPOKES[style.id];
          return (
            <li key={style.id} className="sample-row">
              <span className="sample-plain">
                {spoke ? (
                  <Link href={spoke}>{style.label}</Link>
                ) : (
                  style.label
                )}
              </span>
              <span className="sample-fancy" lang="en">
                {output}
              </span>
              <button
                type="button"
                className="copy-btn copy-btn--light"
                aria-label={`Copy ${upper} and ${letter} in ${style.label}`}
                onClick={() => copy(id, output, style.label)}
              >
                {copiedId === id
                  ? "Copied!"
                  : errorId === id
                    ? "Failed"
                    : "Copy"}
              </button>
            </li>
          );
        })}
      </ul>
      <p className="letter-styles-more">
        Making a whole word? Try the{" "}
        <Link href="/">fancy text generator</Link> to convert names and bios
        into every style at once.
      </p>
      <p className="sr-only" role="status">
        {announcement}
      </p>
    </section>
  );
}
