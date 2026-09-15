"use client";

import { useCopyFeedback } from "@/lib/copy";

type KaomojiGridProps = {
  faces: string[];
};

export function KaomojiGrid({ faces }: KaomojiGridProps) {
  const { copiedId, errorId, errorMessage, copy } = useCopyFeedback();

  return (
    <div>
      {errorMessage ? (
        <p className="copy-status" role="alert">
          {errorMessage}
        </p>
      ) : null}
      <ul className="kaomoji-grid">
        {faces.map((face, index) => {
          const id = `k-${index}`;
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
