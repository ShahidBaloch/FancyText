"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { useCopyFeedback } from "@/lib/copy";
import { countText } from "@/lib/text/count";
import { unformatText } from "@/lib/text/unformat";

const SAMPLE = "𝐇𝐞𝐥𝐥𝐨 𝕥𝕙𝕖𝕣𝕖 — ᴛʜɪꜱ ɪꜱ 𝓯𝓪𝓷𝓬𝔶 𝚝𝚎𝚡𝚝 ｗｉｔｈ ⓑⓤⓑⓑⓛⓔ𝐬";

type UnformatToolProps = {
  initialText?: string;
};

export function UnformatTool({ initialText = SAMPLE }: UnformatToolProps) {
  const inputId = useId();
  const outputId = useId();
  const [input, setInput] = useState(initialText);
  const [decodeLookalikes, setDecodeLookalikes] = useState(false);
  const [stripMarks, setStripMarks] = useState(true);
  const [stripInvisible, setStripInvisible] = useState(true);
  const [stripDecoration, setStripDecoration] = useState(true);
  const { copiedId, errorId, errorMessage, announcement, copy } =
    useCopyFeedback();

  const result = useMemo(
    () =>
      unformatText(input, {
        decodeLookalikes,
        stripMarks,
        stripInvisible,
        stripDecoration,
      }),
    [input, decodeLookalikes, stripMarks, stripInvisible, stripDecoration],
  );

  const before = useMemo(() => countText(input), [input]);
  const after = useMemo(() => countText(result.text), [result.text]);
  const isAscii = useMemo(
    () => !/[^\u0000-\u007F]/.test(result.text),
    [result.text],
  );

  return (
    <div className="li-tool">
      <label className="field-label" htmlFor={inputId}>
        Paste the styled text
      </label>
      <textarea
        id={inputId}
        className="text-input li-area"
        rows={6}
        value={input}
        spellCheck={false}
        placeholder="Paste a fancy bio, a styled username, a Zalgo message…"
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="li-options">
        <fieldset className="li-option">
          <legend>What to remove</legend>
          <label className="li-check">
            <input
              type="checkbox"
              checked={stripMarks}
              onChange={(e) => setStripMarks(e.target.checked)}
            />
            Combining marks — strikethrough, underline, Zalgo stacks
          </label>
          <label className="li-check">
            <input
              type="checkbox"
              checked={stripInvisible}
              onChange={(e) => setStripInvisible(e.target.checked)}
            />
            Invisible characters and non-breaking spaces
          </label>
          <label className="li-check">
            <input
              type="checkbox"
              checked={stripDecoration}
              onChange={(e) => setStripDecoration(e.target.checked)}
            />
            Inserted symbols — ♥ ★ 【】 and emoji wrappers
          </label>
          <label className="li-check">
            <input
              type="checkbox"
              checked={decodeLookalikes}
              onChange={(e) => setDecodeLookalikes(e.target.checked)}
            />
            Letters borrowed from other scripts (faux Cyrillic, Cherokee, CJK)
          </label>
        </fieldset>
      </div>

      <p className="li-note">
        Lookalike decoding is off by default because it cannot tell a faux-Cyrillic
        username from actual Russian. With it off, styled Latin is decoded and
        real writing in other languages is left exactly as you pasted it.
      </p>

      <label className="field-label" htmlFor={outputId}>
        Plain text
      </label>
      <textarea
        id={outputId}
        className="text-input li-area li-output"
        rows={6}
        value={result.text}
        readOnly
        spellCheck={false}
      />

      <div className="li-copy-row">
        <button
          type="button"
          className="copy-btn"
          disabled={!result.text.trim()}
          aria-label="Copy plain text"
          onClick={() => copy("unformat", result.text, "plain text")}
        >
          {copiedId === "unformat"
            ? "Copied!"
            : errorId === "unformat"
              ? "Copy failed"
              : "Copy plain text"}
        </button>
        <span className="li-count">
          {before.codePoints} → {after.codePoints} characters
        </span>
        {errorMessage ? (
          <span className="copy-status" role="alert">
            {errorMessage}
          </span>
        ) : null}
      </div>

      {result.findings.length ? (
        <div className="li-warnings">
          <h3 className="li-symbol-heading">What we found</h3>
          <ul className="li-findings">
            {result.findings.map((finding) => (
              <li key={finding.label}>
                <strong>{finding.label}</strong>
                {finding.kind === "style" || finding.kind === "lookalike"
                  ? ` — ${finding.count} character${finding.count === 1 ? "" : "s"} decoded`
                  : ` — ${finding.count} removed`}
              </li>
            ))}
          </ul>
          {result.reversedOrder ? (
            <p className="li-note">
              This looked like upside-down text, so the character order was
              flipped back as well. If the original was meant to read backwards,
              reverse it again with the{" "}
              <Link href="/mirror-text-generator/">mirror text generator</Link>.
            </p>
          ) : null}
        </div>
      ) : input.trim() ? (
        <p className="li-note">
          Nothing to undo — this is already plain text.
        </p>
      ) : null}

      {result.undecodedLookalikes > 0 && !decodeLookalikes ? (
        <p className="li-note is-warning">
          {result.undecodedLookalikes} character
          {result.undecodedLookalikes === 1 ? "" : "s"} look like Latin letters
          but belong to another script. Tick the lookalike box above to decode
          them — just check the result if the text contains a real name in
          Cyrillic, Greek, or Armenian.
        </p>
      ) : null}

      {result.text.trim() && !isAscii && !result.undecodedLookalikes ? (
        <p className="li-note">
          Some non-ASCII characters remain. Accented letters, emoji, and real
          non-Latin scripts are kept on purpose — they are text, not decoration.
        </p>
      ) : null}

      <p className="sr-only" role="status">
        {announcement}
      </p>
    </div>
  );
}
