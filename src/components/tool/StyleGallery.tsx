"use client";

import { useDeferredValue, useEffect, useId, useState } from "react";
import {
  STYLES,
  type StyleCategory,
  transformAll,
  transformSelected,
} from "@/lib/fonts/styles";
import { useCopyFeedback } from "@/lib/copy";

const FAVORITES_KEY = "fancifytext-favorite-styles";

const CATEGORY_LABELS: Record<StyleCategory | "all" | "favorites", string> = {
  all: "All",
  favorites: "Favorites",
  classic: "Classic",
  script: "Script",
  social: "Social",
  fun: "Fun",
  utility: "Utility",
};

type StyleGalleryProps = {
  initialText?: string;
  styleIds?: string[];
  presets?: string[];
  inputLabel?: string;
  text?: string;
  onTextChange?: (value: string) => void;
  showInput?: boolean;
  blurbs?: Record<string, string>;
  enableFavorites?: boolean;
  enableCategoryFilter?: boolean;
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
  enableFavorites = false,
  enableCategoryFilter = false,
}: StyleGalleryProps) {
  const inputId = useId();
  const [internalText, setInternalText] = useState(initialText);
  const text = controlledText ?? internalText;
  const setText = (value: string) => {
    onTextChange?.(value);
    if (controlledText === undefined) setInternalText(value);
  };
  const deferredText = useDeferredValue(text);
  const { copiedId, errorId, errorMessage, copy } = useCopyFeedback();
  const canCopy = Boolean(text.trim());
  const [category, setCategory] = useState<StyleCategory | "all" | "favorites">(
    "all",
  );
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    if (!enableFavorites) return;
    try {
      const raw = localStorage.getItem(FAVORITES_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as unknown;
      if (Array.isArray(parsed)) {
        setFavorites(parsed.filter((id): id is string => typeof id === "string"));
      }
    } catch {
      /* ignore */
    }
  }, [enableFavorites]);

  function toggleFavorite(id: string) {
    setFavorites((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  let rows = styleIds?.length
    ? transformSelected(deferredText || " ", styleIds)
    : transformAll(deferredText || " ");

  if (enableCategoryFilter && category !== "all") {
    if (category === "favorites") {
      rows = rows.filter(({ style }) => favorites.includes(style.id));
    } else {
      rows = rows.filter(({ style }) => style.category === category);
    }
  }

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
      ) : presets?.length ? (
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

      {enableCategoryFilter ? (
        <div className="preset-chips" role="tablist" aria-label="Style categories">
          {(
            ["all", "favorites", "classic", "script", "social", "fun", "utility"] as const
          ).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={category === key}
              className={`style-chip${category === key ? " is-active" : ""}`}
              onClick={() => setCategory(key)}
            >
              {CATEGORY_LABELS[key]}
            </button>
          ))}
        </div>
      ) : null}

      {errorMessage ? (
        <p className="copy-status" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <ul className="gallery-list">
        {rows.map(({ style, output }) => (
          <li key={style.id} className="gallery-row">
            <div className="gallery-info">
              <span className="gallery-label">{style.label}</span>
              <span className="gallery-cat">{style.category}</span>
              {style.partialCoverage ? (
                <span className="gallery-blurb">Partial map — some letters stay plain</span>
              ) : null}
              {blurbs?.[style.id] ? (
                <span className="gallery-blurb">{blurbs[style.id]}</span>
              ) : null}
            </div>
            <p className="gallery-output">
              {canCopy ? output : "Type above to preview"}
            </p>
            <div className="gallery-actions">
              {enableFavorites ? (
                <button
                  type="button"
                  className="copy-btn copy-btn--light"
                  aria-pressed={favorites.includes(style.id)}
                  aria-label={
                    favorites.includes(style.id)
                      ? `Remove ${style.label} from favorites`
                      : `Favorite ${style.label}`
                  }
                  onClick={() => toggleFavorite(style.id)}
                >
                  {favorites.includes(style.id) ? "★" : "☆"}
                </button>
              ) : null}
              <button
                type="button"
                className="copy-btn copy-btn--light"
                aria-label={`Copy ${style.label} text`}
                disabled={!canCopy}
                onClick={() => copy(style.id, output.trim())}
              >
                {copiedId === style.id
                  ? "Copied!"
                  : errorId === style.id
                    ? "Failed"
                    : "Copy"}
              </button>
            </div>
          </li>
        ))}
      </ul>
      {enableCategoryFilter && category === "favorites" && rows.length === 0 ? (
        <p className="seo-lead">Star styles to save them here on this device.</p>
      ) : null}
    </div>
  );
}
