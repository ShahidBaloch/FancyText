"use client";

import { useDeferredValue, useId, useMemo, useState } from "react";
import {
  STYLES,
  SUPPORT_LABELS,
  type FontStyle,
  type StyleCategory,
  transformAll,
  transformSelected,
} from "@/lib/fonts/styles";
import { useCopyFeedback } from "@/lib/copy";
import { useFavoriteStyles } from "@/lib/favorites";

type FilterKey = StyleCategory | "all" | "favorites" | "username-safe";

const FILTER_KEYS: FilterKey[] = [
  "all",
  "favorites",
  "username-safe",
  "classic",
  "script",
  "social",
  "fun",
  "utility",
];

const FILTER_LABELS: Record<FilterKey, string> = {
  all: "All",
  favorites: "Favorites",
  "username-safe": "Username safe",
  classic: "Classic",
  script: "Script",
  social: "Social",
  fun: "Fun",
  utility: "Utility",
};

/** Styles whose rendering caveats are worth spelling out next to the preview. */
function shouldExplain(style: FontStyle): boolean {
  return style.support === "mixed" || style.support === "limited";
}

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
  /** Name filter — worth enabling wherever the full style set is shown. */
  enableSearch?: boolean;
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
  enableSearch = false,
}: StyleGalleryProps) {
  const inputId = useId();
  const searchId = useId();
  const [internalText, setInternalText] = useState(initialText);
  const text = controlledText ?? internalText;
  const setText = (value: string) => {
    onTextChange?.(value);
    if (controlledText === undefined) setInternalText(value);
  };
  const deferredText = useDeferredValue(text);
  const { copiedId, errorId, errorMessage, announcement, copy } =
    useCopyFeedback();
  const canCopy = Boolean(text.trim());
  const [filter, setFilter] = useState<FilterKey>("all");
  const [query, setQuery] = useState("");
  const { favorites, toggleFavorite } = useFavoriteStyles();

  const rows = useMemo(() => {
    let list = styleIds?.length
      ? transformSelected(deferredText || " ", styleIds)
      : transformAll(deferredText || " ");

    if (enableCategoryFilter && filter !== "all") {
      if (filter === "favorites") {
        list = list.filter(({ style }) => favorites.includes(style.id));
      } else if (filter === "username-safe") {
        list = list.filter(({ style }) => style.usernameSafe);
      } else {
        list = list.filter(({ style }) => style.category === filter);
      }
    }

    const q = query.trim().toLowerCase();
    if (enableSearch && q) {
      list = list.filter(({ style }) =>
        `${style.label} ${style.category} ${style.description}`
          .toLowerCase()
          .includes(q),
      );
    }

    return list;
  }, [
    styleIds,
    deferredText,
    enableCategoryFilter,
    filter,
    favorites,
    enableSearch,
    query,
  ]);

  const totalCount = styleIds?.length ?? STYLES.length;

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
        </>
      ) : null}

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

      {enableCategoryFilter ? (
        <div className="preset-chips" role="tablist" aria-label="Style categories">
          {FILTER_KEYS.map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={filter === key}
              className={`style-chip${filter === key ? " is-active" : ""}`}
              onClick={() => setFilter(key)}
            >
              {FILTER_LABELS[key]}
            </button>
          ))}
        </div>
      ) : null}

      {enableSearch ? (
        <div className="gallery-search">
          <label className="field-label" htmlFor={searchId}>
            Find a style by name
          </label>
          <input
            id={searchId}
            type="search"
            className="text-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="bold, script, bubble, small caps…"
            autoComplete="off"
            spellCheck={false}
          />
          <p className="gallery-count" aria-live="polite">
            Showing {rows.length} of {totalCount} styles
          </p>
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
              {style.support !== "wide" ? (
                <span
                  className="gallery-support"
                  data-support={style.support}
                  title={style.supportNote}
                >
                  {SUPPORT_LABELS[style.support]}
                </span>
              ) : null}
              {style.usernameSafe ? null : (
                <span
                  className="gallery-support"
                  data-support="username-unsafe"
                  title="Most platforms reject these characters in a username. They usually work in a display name or bio."
                >
                  Not for usernames
                </span>
              )}
              {shouldExplain(style) ? (
                <span className="gallery-blurb">{style.supportNote}</span>
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
                onClick={() => copy(style.id, output.trim(), style.label)}
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

      {rows.length === 0 ? (
        <p className="seo-lead">
          {filter === "favorites"
            ? "Star styles to save them here on this device."
            : "No styles matched. Clear the filters to see the full set."}
        </p>
      ) : null}

      <p className="sr-only" role="status">
        {announcement}
      </p>
    </div>
  );
}
