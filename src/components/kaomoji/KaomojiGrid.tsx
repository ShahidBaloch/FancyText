"use client";

import { useMemo, useState } from "react";
import { useCopyFeedback } from "@/lib/copy";

/** Above this count, SSR/hydration only render an initial window + load-more. */
const LARGE_GRID_THRESHOLD = 200;
const INITIAL_VISIBLE = 96;
const LOAD_MORE_STEP = 120;

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
  const isLarge = faces.length > LARGE_GRID_THRESHOLD;
  const [visibleCount, setVisibleCount] = useState(() =>
    isLarge ? INITIAL_VISIBLE : faces.length,
  );

  const visibleFaces = useMemo(
    () => faces.slice(0, visibleCount),
    [faces, visibleCount],
  );
  const hasMultiline = faces.some((face) => face.includes("\n"));
  const remaining = faces.length - visibleFaces.length;

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
      {isLarge ? (
        <p className="seo-lead kaomoji-grid__progress">
          Showing {visibleFaces.length} of {faces.length} — load more to keep
          the page fast on mobile. Every row still copies the full string.
        </p>
      ) : null}
      <ul
        className={
          variant === "emoji"
            ? "kaomoji-grid kaomoji-grid--emoji"
            : hasMultiline
              ? "kaomoji-grid kaomoji-grid--multiline"
              : "kaomoji-grid"
        }
      >
        {visibleFaces.map((face, index) => {
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
      {remaining > 0 ? (
        <p className="kaomoji-grid__more-wrap">
          <button
            type="button"
            className="kaomoji-grid__more"
            onClick={() =>
              setVisibleCount((n) =>
                Math.min(n + LOAD_MORE_STEP, faces.length),
              )
            }
          >
            Load {Math.min(LOAD_MORE_STEP, remaining)} more ({remaining}{" "}
            remaining)
          </button>
        </p>
      ) : null}
    </div>
  );
}
