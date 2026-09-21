"use client";

import { useCopyFeedback } from "@/lib/copy";

type KaomojiGridProps = {
  faces: string[];
  idPrefix?: string;
  /** Tighter grid for single-glyph emoji on phones. */
  variant?: "default" | "emoji";
};

export function KaomojiGrid({
  faces,
  idPrefix = "k",
  variant = "default",
}: KaomojiGridProps) {
  const { copiedId, errorId, errorMessage, announcement, copy } =
    useCopyFeedback();

  return (
    <div>
      {errorMessage ? (
        <p className="copy-status" role="alert">
          {errorMessage}
        </p>
      ) : null}
      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>
      <ul
        className={
          variant === "emoji"
            ? "kaomoji-grid kaomoji-grid--emoji"
            : "kaomoji-grid"
        }
      >
        {faces.map((face, index) => {
          const id = `${idPrefix}-${index}`;
          return (
            <li key={`${face}-${index}`}>
              <button
                type="button"
                className="kaomoji-btn"
                onClick={() => copy(id, face)}
                title={`Copy ${face}`}
                aria-label={`Copy kaomoji ${face}`}
              >
                <span className="kaomoji-face">{face}</span>
                <span className="kaomoji-copy">
                  {copiedId === id
                    ? "Copied!"
                    : errorId === id
                      ? "Failed"
                      : "Copy"}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
