"use client";

import { useId, useState } from "react";
import {
  INVISIBLE_CHARS,
  INVISIBLE_KIND_LABELS,
  type InvisibleChar,
} from "@/data/invisible";
import { useCopyFeedback } from "@/lib/copy";

const MAX_REPEAT = 20;

export function InvisibleTextTool() {
  const repeatId = useId();
  const [selectedId, setSelectedId] = useState(INVISIBLE_CHARS[0]!.id);
  const [repeat, setRepeat] = useState(1);
  const { copiedId, errorId, errorMessage, announcement, copy } =
    useCopyFeedback();

  const selected: InvisibleChar =
    INVISIBLE_CHARS.find((c) => c.id === selectedId) ?? INVISIBLE_CHARS[0]!;
  const payload = selected.char.repeat(repeat);

  return (
    <div className="text-tool invisible-tool">
      <div
        className="preset-chips"
        role="radiogroup"
        aria-label="Invisible character"
      >
        {INVISIBLE_CHARS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="radio"
            aria-checked={selectedId === item.id}
            className={`style-chip${selectedId === item.id ? " is-active" : ""}`}
            onClick={() => setSelectedId(item.id)}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="invisible-meta">
        <p className="invisible-kind" data-kind={selected.kind}>
          {INVISIBLE_KIND_LABELS[selected.kind]}
        </p>
        <p className="invisible-best">
          <strong>Best for:</strong> {selected.bestFor}
        </p>
        <p className="invisible-notes">{selected.notes}</p>
      </div>

      <div className="invisible-repeat">
        <label className="field-label" htmlFor={repeatId}>
          How many copies ({repeat})
        </label>
        <input
          id={repeatId}
          type="range"
          min={1}
          max={MAX_REPEAT}
          value={repeat}
          onChange={(e) => setRepeat(Number(e.target.value))}
        />
      </div>

      <div className="preview-panel">
        <div className="preview-meta">
          <span>Preview</span>
          <button
            type="button"
            className="copy-btn"
            aria-label={`Copy ${repeat} ${selected.name} character${repeat === 1 ? "" : "s"}`}
            onClick={() =>
              copy(
                "invisible",
                payload,
                `${repeat} ${selected.name} character${repeat === 1 ? "" : "s"}`,
              )
            }
          >
            {copiedId === "invisible"
              ? "Copied!"
              : errorId === "invisible"
                ? "Failed"
                : "Copy"}
          </button>
        </div>
        {/* Brackets are the only way to see that anything is there at all. */}
        <p className="invisible-preview">
          <span aria-hidden="true">[</span>
          <span className="invisible-payload">{payload}</span>
          <span aria-hidden="true">]</span>
        </p>
        <p className="invisible-readout">
          {repeat} × {selected.codePoint}
          {selected.kind === "zero-width"
            ? " — nothing is drawn, so the brackets sit flush together."
            : null}
        </p>
      </div>

      {errorId === "invisible" && errorMessage ? (
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
