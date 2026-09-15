"use client";

import { useDeferredValue, useId, useState } from "react";
import { useCopyFeedback } from "@/lib/copy";

type HtmlSnippet = {
  id: string;
  label: string;
  build: (text: string) => string;
};

const SNIPPETS: HtmlSnippet[] = [
  {
    id: "bold",
    label: "Bold HTML",
    build: (t) => `<b>${escapeHtml(t)}</b>`,
  },
  {
    id: "italic",
    label: "Italic HTML",
    build: (t) => `<i>${escapeHtml(t)}</i>`,
  },
  {
    id: "underline",
    label: "Underline HTML",
    build: (t) => `<u>${escapeHtml(t)}</u>`,
  },
  {
    id: "red",
    label: "Red span",
    build: (t) => `<span style="color:#e74c3c">${escapeHtml(t)}</span>`,
  },
  {
    id: "blue",
    label: "Blue span",
    build: (t) => `<span style="color:#3498db">${escapeHtml(t)}</span>`,
  },
  {
    id: "heading",
    label: "Heading",
    build: (t) => `<h2>${escapeHtml(t)}</h2>`,
  },
  {
    id: "pre",
    label: "Preformatted",
    build: (t) => `<pre>${escapeHtml(t)}</pre>`,
  },
  {
    id: "roblox",
    label: "Rich text (bold tag)",
    build: (t) => `<b>${escapeHtml(t)}</b>`,
  },
];

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function HtmlRichTool({
  initialText = "Hello World",
}: {
  initialText?: string;
}) {
  const inputId = useId();
  const [text, setText] = useState(initialText);
  const deferredText = useDeferredValue(text);
  const { copiedId, errorId, errorMessage, copy } = useCopyFeedback();
  const canCopy = Boolean(text.trim());

  return (
    <div className="text-tool">
      <label className="field-label" htmlFor={inputId}>
        Plain text
      </label>
      <input
        id={inputId}
        className="text-input gallery-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
      />

      {errorMessage ? (
        <p className="copy-status" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <ul className="gallery-list">
        {SNIPPETS.map((snippet) => {
          const output = snippet.build(deferredText || " ");
          return (
            <li key={snippet.id} className="gallery-row">
              <div className="gallery-info">
                <span className="gallery-label">{snippet.label}</span>
              </div>
              <pre className="gallery-output code-inline">
                {canCopy ? output : "Type above to preview"}
              </pre>
              <button
                type="button"
                className="copy-btn"
                aria-label={`Copy ${snippet.label}`}
                disabled={!canCopy}
                onClick={() => copy(snippet.id, output)}
              >
                {copiedId === snippet.id
                  ? "Copied!"
                  : errorId === snippet.id
                    ? "Failed"
                    : "Copy"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
