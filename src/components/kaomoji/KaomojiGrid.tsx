"use client";

import { useCopyFeedback } from "@/lib/copy";

type KaomojiGridProps = {
  faces: string[];
};

export function KaomojiGrid({ faces }: KaomojiGridProps) {
  const { copiedId, copy } = useCopyFeedback();

  return (
    <ul className="kaomoji-grid">
      {faces.map((face, index) => {
        const id = `k-${index}`;
        return (
          <li key={`${face}-${index}`}>
            <button
              type="button"
              className="kaomoji-btn"
              onClick={() => copy(id, face)}
              title="Copy kaomoji"
            >
              <span className="kaomoji-face">{face}</span>
              <span className="kaomoji-copy">
                {copiedId === id ? "Copied!" : "Copy"}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
