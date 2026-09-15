"use client";

import { useDeferredValue, useId, useMemo, useState } from "react";
import { CASE_CONVERSIONS, textStats } from "@/lib/text/case";
import { useCopyFeedback } from "@/lib/copy";

const SAMPLE = "the QUICK brown fox jumps over the lazy dog. it was a good day.";

export function CaseConverterTool() {
  const inputId = useId();
  const [text, setText] = useState(SAMPLE);
  const deferred = useDeferredValue(text);
  const { copiedId, errorId, errorMessage, announcement, copy } =
    useCopyFeedback();

  const rows = useMemo(
    () =>
      CASE_CONVERSIONS.map((conversion) => ({
        conversion,
        output: conversion.convert(deferred),
      })),
    [deferred],
  );
  const stats = useMemo(() => textStats(deferred), [deferred]);
  const canCopy = Boolean(text.trim());

  return (
    <div className="text-tool">
      <label className="field-label" htmlFor={inputId}>
        Your text
      </label>
      <textarea
        id={inputId}
        className="text-input"
        rows={4}
        value={text}
        placeholder="Paste the text you want to re-case…"
        spellCheck={false}
        onChange={(e) => setText(e.target.value)}
      />

      <dl className="text-stats">
        <div>
          <dt>Characters</dt>
          <dd>{stats.characters}</dd>
        </div>
        <div>
          <dt>Without spaces</dt>
          <dd>{stats.charactersNoSpaces}</dd>
        </div>
        <div>
          <dt>Words</dt>
          <dd>{stats.words}</dd>
        </div>
        <div>
          <dt>Sentences</dt>
          <dd>{stats.sentences}</dd>
        </div>
        <div>
          <dt>Lines</dt>
          <dd>{stats.lines}</dd>
        </div>
      </dl>

      <ul className="gallery-list">
        {rows.map(({ conversion, output }) => (
          <li key={conversion.id} className="gallery-row">
            <div className="gallery-info">
              <span className="gallery-label">{conversion.label}</span>
              <span className="gallery-blurb">{conversion.description}</span>
            </div>
            <p className="gallery-output case-output">
              {canCopy ? output : "Type above to preview"}
            </p>
            <div className="gallery-actions">
              <button
                type="button"
                className="copy-btn copy-btn--light"
                aria-label={`Copy ${conversion.label}`}
                disabled={!canCopy}
                onClick={() => copy(conversion.id, output, conversion.label)}
              >
                {copiedId === conversion.id
                  ? "Copied!"
                  : errorId === conversion.id
                    ? "Failed"
                    : "Copy"}
              </button>
            </div>
          </li>
        ))}
      </ul>

      {errorMessage ? (
        <p className="copy-status" role="alert">
          {errorMessage}
        </p>
      ) : null}
      <p className="sr-only" role="status">
        {announcement}
      </p>
    </div>
  );
}
