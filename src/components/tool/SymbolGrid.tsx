"use client";

import { useCopyFeedback } from "@/lib/copy";
import type { SymbolCategory } from "@/data/symbols";

type SymbolGridProps = {
  category: SymbolCategory;
};

export function SymbolGrid({ category }: SymbolGridProps) {
  const { copiedId, copy } = useCopyFeedback();

  return (
    <ul className="symbol-grid">
      {category.symbols.map((symbol, index) => {
        const id = `${category.id}-${index}`;
        return (
          <li key={id}>
            <button
              type="button"
              className="symbol-btn"
              onClick={() => copy(id, symbol)}
              title={`Copy ${symbol}`}
            >
              <span className="symbol-glyph" aria-hidden="true">
                {symbol}
              </span>
              <span className="symbol-copy">
                {copiedId === id ? "Copied!" : "Copy"}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
