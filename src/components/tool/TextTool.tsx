"use client";

import { useDeferredValue, useId, useState } from "react";
import { STYLES, STYLES_BY_ID, transform } from "@/lib/fonts/styles";
import { useCopyFeedback } from "@/lib/copy";

type TextToolProps = {
  defaultStyleId?: string;
  placeholder?: string;
  /** When set, only these style chips are shown (primary should be included). */
  styleIds?: string[];
  initialText?: string;
  /** Controlled text — when set with onTextChange, shares state with sibling UI. */
  text?: string;
  onTextChange?: (value: string) => void;
};

export function TextTool({
  defaultStyleId = "cursive",
  placeholder = "Type your fancy text here…",
  styleIds,
  initialText = "fancy text",
  text: controlledText,
  onTextChange,
}: TextToolProps) {
  const inputId = useId();
  const chips =
    styleIds?.map((id) => STYLES_BY_ID[id]).filter(Boolean) ??
    STYLES.slice(0, 10);
  const [internalText, setInternalText] = useState(initialText);
  const text = controlledText ?? internalText;
  const setText = (value: string) => {
    onTextChange?.(value);
    if (controlledText === undefined) setInternalText(value);
  };
  const [styleId, setStyleId] = useState(defaultStyleId);
  const deferredText = useDeferredValue(text);
  const { copiedId, errorId, errorMessage, copy } = useCopyFeedback();
  const output = transform(deferredText || " ", styleId);
  const canCopy = Boolean(text.trim());

  return (
    <div className="text-tool">
      <label className="field-label" htmlFor={inputId}>
        Your text
      </label>
      <textarea
        id={inputId}
        className="text-input"
        rows={3}
        value={text}
        placeholder={placeholder}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
      />

      {chips.length > 1 ? (
        <div
          className="style-chips"
          role="radiogroup"
          aria-label="Font style"
          onKeyDown={(e) => {
            if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
            if (chips.length < 2) return;
            e.preventDefault();
            const index = chips.findIndex((style) => style.id === styleId);
            const delta = e.key === "ArrowRight" ? 1 : -1;
            const next =
              chips[(index + delta + chips.length) % chips.length];
            if (!next) return;
            setStyleId(next.id);
            const target = e.currentTarget.querySelector<HTMLElement>(
              `[data-style-id="${next.id}"]`,
            );
            target?.focus();
          }}
        >
          {chips.map((style) => (
            <button
              key={style.id}
              type="button"
              role="radio"
              data-style-id={style.id}
              aria-checked={styleId === style.id}
              className={`style-chip${styleId === style.id ? " is-active" : ""}`}
              onClick={() => setStyleId(style.id)}
            >
              {style.label}
            </button>
          ))}
        </div>
      ) : null}

      <div className="preview-panel">
        <div className="preview-meta">
          <span>Preview</span>
          <button
            type="button"
            className="copy-btn"
            aria-label={`Copy ${STYLES_BY_ID[styleId]?.label ?? "styled"} text`}
            disabled={!canCopy}
            onClick={() => copy("main", output.trim())}
          >
            {copiedId === "main"
              ? "Copied!"
              : errorId === "main"
                ? "Failed"
                : "Copy"}
          </button>
        </div>
        <p className="preview-text" aria-live="polite">
          {canCopy ? output : "Type above to preview"}
        </p>
        {errorId === "main" && errorMessage ? (
          <p className="copy-status copy-status--on-dark" role="alert">
            {errorMessage}
          </p>
        ) : null}
      </div>
    </div>
  );
}

type DualStylePreviewProps = {
  primaryStyleId: string;
  secondaryStyleId: string;
  primaryLabel: string;
  secondaryLabel: string;
  initialText?: string;
  text?: string;
  onTextChange?: (value: string) => void;
};

export function DualStylePreview({
  primaryStyleId,
  secondaryStyleId,
  primaryLabel,
  secondaryLabel,
  initialText = "H2O",
  text: controlledText,
  onTextChange,
}: DualStylePreviewProps) {
  const inputId = useId();
  const [internalText, setInternalText] = useState(initialText);
  const text = controlledText ?? internalText;
  const setText = (value: string) => {
    onTextChange?.(value);
    if (controlledText === undefined) setInternalText(value);
  };
  const deferredText = useDeferredValue(text);
  const { copiedId, errorId, errorMessage, copy } = useCopyFeedback();
  const primaryOut = transform(deferredText || " ", primaryStyleId);
  const secondaryOut = transform(deferredText || " ", secondaryStyleId);
  const canCopy = Boolean(text.trim());

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
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
      />
      <div className="dual-preview">
        <div className="preview-panel">
          <div className="preview-meta">
            <span>{primaryLabel}</span>
            <button
              type="button"
              className="copy-btn"
              aria-label={`Copy ${primaryLabel}`}
              disabled={!canCopy}
              onClick={() => copy("primary", primaryOut.trim())}
            >
              {copiedId === "primary"
                ? "Copied!"
                : errorId === "primary"
                  ? "Failed"
                  : "Copy"}
            </button>
          </div>
          <p className="preview-text">
            {canCopy ? primaryOut : "Type above to preview"}
          </p>
        </div>
        <div className="preview-panel">
          <div className="preview-meta">
            <span>{secondaryLabel}</span>
            <button
              type="button"
              className="copy-btn"
              aria-label={`Copy ${secondaryLabel}`}
              disabled={!canCopy}
              onClick={() => copy("secondary", secondaryOut.trim())}
            >
              {copiedId === "secondary"
                ? "Copied!"
                : errorId === "secondary"
                  ? "Failed"
                  : "Copy"}
            </button>
          </div>
          <p className="preview-text">
            {canCopy ? secondaryOut : "Type above to preview"}
          </p>
        </div>
      </div>
      {errorMessage && (errorId === "primary" || errorId === "secondary") ? (
        <p className="copy-status" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
