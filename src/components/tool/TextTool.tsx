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
  const { copiedId, copy } = useCopyFeedback();
  const output = transform(deferredText || " ", styleId);

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
        <div className="style-chips" role="listbox" aria-label="Font style">
          {chips.map((style) => (
            <button
              key={style.id}
              type="button"
              role="option"
              aria-selected={styleId === style.id}
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
            onClick={() => copy("main", output.trim())}
          >
            {copiedId === "main" ? "Copied!" : "Copy"}
          </button>
        </div>
        <p className="preview-text" aria-live="polite">
          {output}
        </p>
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
  const { copiedId, copy } = useCopyFeedback();
  const primaryOut = transform(deferredText || " ", primaryStyleId);
  const secondaryOut = transform(deferredText || " ", secondaryStyleId);

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
              onClick={() => copy("primary", primaryOut.trim())}
            >
              {copiedId === "primary" ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className="preview-text">{primaryOut}</p>
        </div>
        <div className="preview-panel">
          <div className="preview-meta">
            <span>{secondaryLabel}</span>
            <button
              type="button"
              className="copy-btn"
              onClick={() => copy("secondary", secondaryOut.trim())}
            >
              {copiedId === "secondary" ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className="preview-text">{secondaryOut}</p>
        </div>
      </div>
    </div>
  );
}
