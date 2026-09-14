"use client";

import { useDeferredValue, useId, useState } from "react";
import { transformAll, transformSelected } from "@/lib/fonts/styles";
import { useCopyFeedback } from "@/lib/copy";

type StyleGalleryProps = {
  initialText?: string;
  styleIds?: string[];
  presets?: string[];
  inputLabel?: string;
  /** Controlled preview text from a parent tool. */
  text?: string;
  onTextChange?: (value: string) => void;
  /** When false, only the style rows render (no second input). Default true. */
  showInput?: boolean;
  /** Optional tip under each style label (styleId → blurb). */
  blurbs?: Record<string, string>;
};

export function StyleGallery({
  initialText = "fancy text",
  styleIds,
  presets,
  inputLabel = "Type to preview every font",
  text: controlledText,
  onTextChange,
  showInput = true,
  blurbs,
}: StyleGalleryProps) {
  const inputId = useId();
  const [internalText, setInternalText] = useState(initialText);
  const text = controlledText ?? internalText;
  const setText = (value: string) => {
    onTextChange?.(value);
    if (controlledText === undefined) setInternalText(value);
  };
  const deferredText = useDeferredValue(text);
  const { copiedId, copy } = useCopyFeedback();
  const rows = styleIds?.length
    ? transformSelected(deferredText || " ", styleIds)
    : transformAll(deferredText || " ");

  return (
    <div className={`style-gallery${showInput ? "" : " is-compact"}`}>
      {showInput ? (
        <>
          <label className="field-label" htmlFor={inputId}>
            {inputLabel}
          </label>
          <input
            id={inputId}
            className="text-input gallery-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            spellCheck={false}
          />
          {presets?.length ? (
            <div className="preset-chips" aria-label="Quick presets">
              {presets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  className="style-chip"
                  onClick={() => setText(preset)}
                  aria-label={`Use preset: ${preset}`}
                >
                  {preset}
                </button>
              ))}
            </div>
          ) : null}
        </>
      ) : null}

      <ul className="gallery-list">
        {rows.map(({ style, output }) => (
          <li key={style.id} className="gallery-row">
            <div className="gallery-info">
              <span className="gallery-label">{style.label}</span>
              <span className="gallery-cat">{style.category}</span>
              {blurbs?.[style.id] ? (
                <span className="gallery-blurb">{blurbs[style.id]}</span>
              ) : null}
            </div>
            <p className="gallery-output">{output}</p>
            <button
              type="button"
              className="copy-btn copy-btn--light"
              onClick={() => copy(style.id, output.trim())}
            >
              {copiedId === style.id ? "Copied!" : "Copy"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
