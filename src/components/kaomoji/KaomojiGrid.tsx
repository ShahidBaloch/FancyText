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
  const hasMultiline = faces.some((face) => face.includes("\n"));

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
            : hasMultiline
              ? "kaomoji-grid kaomoji-grid--multiline"
              : "kaomoji-grid"
        }
      >
        {faces.map((face, index) => {
          const id = `${idPrefix}-${index}`;
          const multiline = face.includes("\n");
          const longLine = face.length > 44;
          const ariaLabel = multiline
            ? `Copy multiline text art ${index + 1} to clipboard`
            : longLine
              ? `Copy line ${index + 1} to clipboard`
              : `Copy kaomoji ${face}`;
          const previewTitle = multiline
            ? face.split("\n")[0]?.trim() || "text art"
            : face;
          return (
            <li key={`${face}-${index}`}>
              <button
                type="button"
                className={
                  multiline ? "kaomoji-btn kaomoji-btn--multiline" : "kaomoji-btn"
                }
                onClick={() => copy(id, face, ariaLabel)}
                title={`Copy ${previewTitle}`}
                aria-label={ariaLabel}
              >
                <span
                  className={
                    multiline
                      ? "kaomoji-face kaomoji-face--multiline"
                      : "kaomoji-face"
                  }
                >
                  {face}
                </span>
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
