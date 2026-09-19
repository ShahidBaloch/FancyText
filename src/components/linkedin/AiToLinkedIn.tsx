"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { useCopyFeedback } from "@/lib/copy";
import {
  cleanAiText,
  type EmDashHandling,
} from "@/lib/text/ai-artifacts";
import { countText } from "@/lib/text/count";
import {
  looksLikeMarkdown,
  markdownToLinkedIn,
  type HeadingTreatment,
  type MarkdownMode,
} from "@/lib/text/markdown";
import { BULLET_SYMBOLS, POST_FOLD_MOBILE } from "@/lib/linkedin/fields";

const SAMPLE = `## 3 lessons from shipping every week

I used to ship once a quarter. Here's what changed:

1. **Smaller batches** — fewer things break at once
2. **Write the changelog first** — if it's boring, the work was boring
3. *Ship on Tuesday* — nobody reads a Friday release note

> The goal isn't speed. It's a shorter gap between guessing and knowing.

| Before | After |
| --- | --- |
| 1 release / quarter | 1 release / week |

What's your release cadence?`;

const HEADING_OPTIONS: { value: HeadingTreatment; label: string }[] = [
  { value: "bold", label: "Bold" },
  { value: "bold-caps", label: "BOLD CAPS" },
  { value: "plain", label: "Plain text" },
];

const EM_DASH_OPTIONS: { value: EmDashHandling; label: string }[] = [
  { value: "hyphen", label: "Replace with -" },
  { value: "comma", label: "Replace with ," },
  { value: "keep", label: "Keep em dashes" },
];

const BOLD_OPTIONS = [
  { value: "sans-bold", label: "Sans bold (𝗮𝗮)" },
  { value: "bold", label: "Serif bold (𝐚𝐚)" },
];

const POST_LIMIT = 3000;

type AiToLinkedInProps = {
  initialText?: string;
};

export function AiToLinkedIn({ initialText = SAMPLE }: AiToLinkedInProps) {
  const inputId = useId();
  const outputId = useId();
  const [input, setInput] = useState(initialText);
  const [mode, setMode] = useState<MarkdownMode>("convert");
  const [heading, setHeading] = useState<HeadingTreatment>("bold");
  const [boldStyleId, setBoldStyleId] = useState("sans-bold");
  const [bullet, setBullet] = useState("•");
  const [cleanPunctuation, setCleanPunctuation] = useState(true);
  const [emDash, setEmDash] = useState<EmDashHandling>("hyphen");
  const { copiedId, errorId, errorMessage, announcement, copy } =
    useCopyFeedback();

  const { output, warnings, findings, stats } = useMemo(() => {
    // Punctuation is tidied before the Markdown pass so that a converted heading
    // is styled from already-clean text rather than being restyled afterwards.
    const cleaned = cleanPunctuation
      ? cleanAiText(input, { emDash })
      : { text: input, findings: [] };
    const result = markdownToLinkedIn(cleaned.text, {
      mode,
      heading,
      bullet,
      boldStyleId,
      italicStyleId: boldStyleId === "bold" ? "italic" : "sans-italic",
      boldItalicStyleId:
        boldStyleId === "bold" ? "bold-italic" : "sans-bold-italic",
    });
    return {
      output: result.text,
      warnings: result.warnings,
      stats: result.stats,
      findings: cleaned.findings,
    };
  }, [input, mode, heading, bullet, boldStyleId, cleanPunctuation, emDash]);

  const counts = useMemo(() => countText(output), [output]);
  const over = counts.graphemes > POST_LIMIT;
  const markdownFound = useMemo(() => looksLikeMarkdown(input), [input]);
  const hasSyntaxLeft = /\*\*|^#{1,6}\s/m.test(output);

  return (
    <div className="li-tool">
      <label className="field-label" htmlFor={inputId}>
        Paste what the AI gave you (Markdown)
      </label>
      <textarea
        id={inputId}
        className="text-input li-area"
        rows={10}
        value={input}
        spellCheck={false}
        placeholder="Paste straight from ChatGPT, Claude, Gemini, or any Markdown editor…"
        onChange={(e) => setInput(e.target.value)}
      />

      {input.trim() && !markdownFound ? (
        <p className="li-note">
          No Markdown found in this text — no headings, <code>**bold**</code>,
          or list markers. There is nothing here for this tool to convert, so
          paste it straight into LinkedIn, or use the{" "}
          <Link href="/linkedin-text-formatter/">LinkedIn text formatter</Link>{" "}
          to emphasise words by hand.
        </p>
      ) : null}

      <div className="li-options">
        <fieldset className="li-option">
          <legend>What to do with the formatting</legend>
          <div className="preset-chips">
            {(
              [
                { value: "convert", label: "Convert to LinkedIn styling" },
                { value: "strip", label: "Strip it to plain text" },
              ] as const
            ).map((option) => (
              <button
                key={option.value}
                type="button"
                aria-pressed={mode === option.value}
                className={`style-chip${mode === option.value ? " is-active" : ""}`}
                onClick={() => setMode(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </fieldset>

        {mode === "convert" ? (
          <>
            <fieldset className="li-option">
              <legend>Headings become</legend>
              <div className="preset-chips">
                {HEADING_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={heading === option.value}
                    className={`style-chip${heading === option.value ? " is-active" : ""}`}
                    onClick={() => setHeading(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="li-option">
              <legend>Bold style</legend>
              <div className="preset-chips">
                {BOLD_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={boldStyleId === option.value}
                    className={`style-chip${boldStyleId === option.value ? " is-active" : ""}`}
                    onClick={() => setBoldStyleId(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </fieldset>
          </>
        ) : null}

        <fieldset className="li-option">
          <legend>Bullet character</legend>
          <div className="preset-chips">
            {BULLET_SYMBOLS.filter((s) => s.reliability !== "risky").map(
              (symbol) => (
                <button
                  key={symbol.char}
                  type="button"
                  aria-pressed={bullet === symbol.char}
                  className={`style-chip${bullet === symbol.char ? " is-active" : ""}`}
                  onClick={() => setBullet(symbol.char)}
                  title={symbol.note}
                >
                  {symbol.char} {symbol.name}
                </button>
              ),
            )}
          </div>
        </fieldset>

        <fieldset className="li-option">
          <legend>AI punctuation</legend>
          <label className="li-check">
            <input
              type="checkbox"
              checked={cleanPunctuation}
              onChange={(e) => setCleanPunctuation(e.target.checked)}
            />
            Tidy em dashes, curly quotes, ellipses, and invisible spaces
          </label>
          {cleanPunctuation ? (
            <div className="preset-chips">
              {EM_DASH_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={emDash === option.value}
                  className={`style-chip${emDash === option.value ? " is-active" : ""}`}
                  onClick={() => setEmDash(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          ) : null}
        </fieldset>
      </div>

      <label className="field-label" htmlFor={outputId}>
        LinkedIn-ready text
      </label>
      <textarea
        id={outputId}
        className="text-input li-area li-output"
        rows={10}
        value={output}
        readOnly
        spellCheck={false}
      />

      <div className="li-copy-row">
        <button
          type="button"
          className="copy-btn"
          disabled={!output.trim()}
          aria-label="Copy LinkedIn-ready text"
          onClick={() => copy("ai-linkedin", output, "LinkedIn-ready text")}
        >
          {copiedId === "ai-linkedin"
            ? "Copied!"
            : errorId === "ai-linkedin"
              ? "Copy failed"
              : "Copy for LinkedIn"}
        </button>
        <span className={`li-count${over ? " is-over" : ""}`}>
          {counts.graphemes} / {POST_LIMIT} characters
          {counts.graphemes > POST_FOLD_MOBILE
            ? ` · first ${POST_FOLD_MOBILE} show on mobile`
            : ""}
        </span>
        {errorMessage ? (
          <span className="copy-status" role="alert">
            {errorMessage}
          </span>
        ) : null}
      </div>

      {hasSyntaxLeft ? (
        <p className="li-note is-warning">
          Some Markdown syntax survived the conversion. That usually means
          unbalanced <code>**</code> markers in the original — check the output
          before posting.
        </p>
      ) : null}

      {warnings.length ? (
        <div className="li-warnings">
          <h2 className="li-symbol-heading">What this conversion changed</h2>
          <ul>
            {warnings.map((warning) => (
              <li key={warning.label}>
                <strong>{warning.label}.</strong> {warning.detail}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {findings.length ? (
        <div className="li-warnings">
          <h2 className="li-symbol-heading">Punctuation tidied</h2>
          <ul className="li-findings">
            {findings.map((finding) => (
              <li key={finding.label}>
                {finding.label}: <strong>{finding.count}</strong> →{" "}
                {finding.replacement}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {mode === "convert" && stats.inlineStyles > 0 ? (
        <p className="li-note">
          {stats.inlineStyles} run{stats.inlineStyles === 1 ? "" : "s"} of text
          became styled Unicode characters. Those are not real bold — they are
          different letters that happen to look bold, so they will not match a
          LinkedIn or Google search for the plain word. Keep your keywords,
          hashtags, and name in ordinary letters.
        </p>
      ) : null}

      <p className="sr-only" role="status">
        {announcement}
      </p>
    </div>
  );
}
