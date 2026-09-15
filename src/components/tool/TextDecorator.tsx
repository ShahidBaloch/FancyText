"use client";

import { useId, useState } from "react";
import { DECORATOR_WRAPS, wrapText } from "@/data/decorators";
import { useCopyFeedback } from "@/lib/copy";

type TextDecoratorProps = {
  initialText?: string;
};

export function TextDecorator({ initialText = "your name" }: TextDecoratorProps) {
  const inputId = useId();
  const [text, setText] = useState(initialText);
  const { copiedId, errorId, errorMessage, copy } = useCopyFeedback();
  const canCopy = Boolean(text.trim());

  return (
    <div className="text-tool">
      <label className="field-label" htmlFor={inputId}>
        Word to wrap
      </label>
      <textarea
        id={inputId}
        className="text-input"
        rows={2}
        value={text}
        spellCheck={false}
        onChange={(event) => setText(event.target.value)}
        placeholder="Type a short name…"
      />

      {errorMessage ? (
        <p className="copy-status" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <ul className="decorator-grid">
        {DECORATOR_WRAPS.map((wrap) => {
          const output = wrapText(text, wrap);
          return (
            <li key={wrap.id} className="decorator-card">
              <div className="preview-meta">
                <span>{wrap.label}</span>
                <button
                  type="button"
                  className="copy-btn copy-btn--light"
                  aria-label={`Copy ${wrap.label} decoration`}
                  disabled={!canCopy}
                  onClick={() => copy(wrap.id, output)}
                >
                  {copiedId === wrap.id
                    ? "Copied!"
                    : errorId === wrap.id
                      ? "Failed"
                      : "Copy"}
                </button>
              </div>
              <p className="decorator-preview">
                {canCopy ? output : "Type above to preview"}
              </p>
              <p className="decorator-blurb">{wrap.blurb}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
