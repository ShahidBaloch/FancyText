"use client";

import { useDeferredValue, useId, useMemo, useState } from "react";
import { ASCII_FONTS, getAsciiFont } from "@/lib/text/ascii-fonts";
import {
  MAX_BIG_TEXT_CHARS,
  renderBigText,
  wrapAsCodeBlock,
  type AsciiFontId,
} from "@/lib/text/ascii";
import { useCopyFeedback } from "@/lib/copy";

const SAMPLE = "HELLO";

export function BigTextTool({
  initialText = SAMPLE,
}: {
  initialText?: string;
}) {
  const inputId = useId();
  const [text, setText] = useState(initialText);
  const [fontId, setFontId] = useState<AsciiFontId>("blocky");
  const deferred = useDeferredValue(text);
  const { copiedId, errorId, errorMessage, announcement, copy } =
    useCopyFeedback();

  const font = getAsciiFont(fontId);
  const result = useMemo(
    () => renderBigText(deferred, font),
    [deferred, font],
  );
  const canCopy = Boolean(result.art);
  const inputChars = text.replace(/\r/g, "").replace(/\n/g, "").length;

  return (
    <div className="text-tool">
      <label className="field-label" htmlFor={inputId}>
        Your text
      </label>
      <textarea
        id={inputId}
        className="text-input"
        rows={2}
        value={text}
        placeholder="Type a short name or title…"
        spellCheck={false}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="style-chips" role="radiogroup" aria-label="ASCII style">
        {ASCII_FONTS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="radio"
            aria-checked={fontId === item.id}
            className={`style-chip${fontId === item.id ? " is-active" : ""}`}
            onClick={() => setFontId(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <p className="ascii-font-blurb">{font.blurb}</p>

      <dl className="text-stats">
        <div>
          <dt>Input</dt>
          <dd>
            {inputChars}/{MAX_BIG_TEXT_CHARS}
          </dd>
        </div>
        <div>
          <dt>Output rows</dt>
          <dd>{result.rows}</dd>
        </div>
        <div>
          <dt>Widest line</dt>
          <dd>{result.columns}</dd>
        </div>
        <div>
          <dt>Characters</dt>
          <dd>{result.characters}</dd>
        </div>
      </dl>

      {result.truncated ? (
        <p className="ascii-note" role="status">
          Showing the first {MAX_BIG_TEXT_CHARS} characters. Big text is for
          short titles — longer phrases get too wide to paste.
        </p>
      ) : null}

      {errorMessage ? (
        <p className="copy-status" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <div className="preview-panel ascii-panel">
        <div className="preview-meta">
          <span>{font.label} preview</span>
        </div>
        <pre className="ascii-preview">
          {canCopy ? result.art : "Type above to preview"}
        </pre>
        <div className="preview-actions">
          <button
            type="button"
            className="copy-btn"
            aria-label={`Copy ${font.label} ASCII`}
            disabled={!canCopy}
            onClick={() => copy("ascii", result.art, font.label)}
          >
            {copiedId === "ascii"
              ? "Copied!"
              : errorId === "ascii"
                ? "Failed"
                : "Copy"}
          </button>
          <button
            type="button"
            className="copy-btn"
            aria-label={`Copy ${font.label} as a Discord code block`}
            disabled={!canCopy}
            onClick={() =>
              copy(
                "codeblock",
                wrapAsCodeBlock(result.art),
                `${font.label} code block`,
              )
            }
          >
            {copiedId === "codeblock"
              ? "Copied!"
              : errorId === "codeblock"
                ? "Failed"
                : "Copy code block"}
          </button>
        </div>
      </div>
      <p className="ascii-note">
        Paste into Discord, Reddit, or any monospace field. Use{" "}
        <strong>Copy code block</strong> so spaces stay aligned. This is
        ordinary ASCII, not a Unicode fancy font.
      </p>
      <p className="sr-only" role="status">
        {announcement}
      </p>
    </div>
  );
}
