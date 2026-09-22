"use client";

import Link from "next/link";
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
type GalleryItem = { style: FontStyle; output: string };

const FILTER_KEYS: FilterKey[] = [
  "all",
  "favorites",
  "username-safe",
  "classic",
  "script",
  "social",
  "fun",
  "cool",
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
  cool: "Cool",
  utility: "Utility",
};

/** Styles whose rendering caveats are worth spelling out next to the preview. */
function shouldExplain(style: FontStyle): boolean {
  return style.support === "mixed" || style.support === "limited";
}

function styleMatchesQuery(style: FontStyle, query: string): boolean {
  const haystack =
    `${style.label} ${style.id.replaceAll("-", " ")} ${style.category} ${style.description}`.toLowerCase();
  return haystack.includes(query);
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
  const favoritesHeadingId = useId();
  const restHeadingId = useId();
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
      list = list.filter(({ style }) => styleMatchesQuery(style, q));
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

  const pinFavorites =
    enableFavorites && !(enableCategoryFilter && filter === "favorites");
  const favoriteRows = pinFavorites
    ? rows.filter(({ style }) => favorites.includes(style.id))
    : [];
  const otherRows = pinFavorites
    ? rows.filter(({ style }) => !favorites.includes(style.id))
    : rows;

  const totalCount = styleIds?.length ?? STYLES.length;
  const filterChips = FILTER_KEYS.filter(
    (key) => key !== "favorites" || enableFavorites,
  );
  const trimmedQuery = query.trim();

  let emptyMessage = "No styles matched. Clear the filters to see the full set.";
  if (filter === "favorites" && !trimmedQuery) {
    emptyMessage = "Star styles to save them here on this device.";
  } else if (trimmedQuery) {
    emptyMessage = `No styles matched “${trimmedQuery}”. Try another name or clear the search.`;
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

      {enableSearch ? (
        <div className="gallery-search">
          <label className="field-label" htmlFor={searchId}>
            Find a style by name
          </label>
          <input
            id={searchId}
            type="search"
            name="style-search"
            className="text-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="bold, script, bubble, small caps…"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
            enterKeyHint="search"
          />
        </div>
      ) : null}

      {/* AdSense: never insert units between inputs/presets/search above and gallery-list below. */}

      {enableCategoryFilter ? (
        <div className="preset-chips" role="group" aria-label="Filter styles">
          {filterChips.map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={filter === key}
              className={`style-chip${filter === key ? " is-active" : ""}`}
              onClick={() => setFilter(key)}
            >
              {key === "favorites" && favorites.length
                ? `Favorites (${favorites.length})`
                : FILTER_LABELS[key]}
            </button>
          ))}
        </div>
      ) : null}

      {enableSearch || enableCategoryFilter ? (
        <p className="gallery-count" aria-live="polite">
          Showing {rows.length} of {totalCount} styles
        </p>
      ) : null}

      {errorMessage ? (
        <p className="copy-status" role="alert">
          {errorMessage}
        </p>
      ) : null}

      {favoriteRows.length > 0 ? (
        <div className="gallery-group">
          <h3 className="gallery-group-title" id={favoritesHeadingId}>
            Favorites
            <span className="gallery-group-note">Saved on this device</span>
          </h3>
          <ul className="gallery-list" aria-labelledby={favoritesHeadingId}>
            {favoriteRows.map((item) => (
              <GalleryRow
                key={item.style.id}
                item={item}
                canCopy={canCopy}
                copiedId={copiedId}
                errorId={errorId}
                blurbs={blurbs}
                favorited
                enableFavorites={enableFavorites}
                onToggleFavorite={toggleFavorite}
                onCopy={copy}
              />
            ))}
          </ul>
        </div>
      ) : null}

      {otherRows.length > 0 ? (
        <div className="gallery-group">
          {favoriteRows.length > 0 ? (
            <h3 className="gallery-group-title" id={restHeadingId}>
              All styles
            </h3>
          ) : null}
          <ul
            className="gallery-list"
            aria-labelledby={
              favoriteRows.length > 0 ? restHeadingId : undefined
            }
          >
            {otherRows.map((item) => (
              <GalleryRow
                key={item.style.id}
                item={item}
                canCopy={canCopy}
                copiedId={copiedId}
                errorId={errorId}
                blurbs={blurbs}
                favorited={favorites.includes(item.style.id)}
                enableFavorites={enableFavorites}
                onToggleFavorite={toggleFavorite}
                onCopy={copy}
              />
            ))}
          </ul>
        </div>
      ) : null}

      {rows.length === 0 ? (
        <div className="gallery-empty">
          <p className="seo-lead">{emptyMessage}</p>
          {trimmedQuery ? (
            <button
              type="button"
              className="style-chip"
              onClick={() => setQuery("")}
            >
              Clear search
            </button>
          ) : filter !== "all" ? (
            <button
              type="button"
              className="style-chip"
              onClick={() => setFilter("all")}
            >
              Show all styles
            </button>
          ) : null}
        </div>
      ) : null}

      <p className="sr-only" role="status">
        {announcement}
      </p>
    </div>
  );
}

function GalleryRow({
  item,
  canCopy,
  copiedId,
  errorId,
  blurbs,
  favorited,
  enableFavorites,
  onToggleFavorite,
  onCopy,
}: {
  item: GalleryItem;
  canCopy: boolean;
  copiedId: string | null;
  errorId: string | null;
  blurbs?: Record<string, string>;
  favorited: boolean;
  enableFavorites: boolean;
  onToggleFavorite: (id: string) => void;
  onCopy: (id: string, text: string, label?: string) => void;
}) {
  const { style, output } = item;

  return (
    <li className={`gallery-row${favorited ? " is-favorite" : ""}`}>
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
        {style.category === "cool" ? (
          <Link href="/cool-text-generator/" className="gallery-spoke-link">
            Cool lookalikes guide
          </Link>
        ) : null}
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
            className="copy-btn copy-btn--light fav-btn"
            aria-pressed={favorited}
            aria-label={
              favorited
                ? `Remove ${style.label} from favorites`
                : `Favorite ${style.label}`
            }
            title={
              favorited
                ? `Remove ${style.label} from favorites`
                : `Favorite ${style.label}`
            }
            onClick={() => onToggleFavorite(style.id)}
          >
            {favorited ? "★" : "☆"}
          </button>
        ) : null}
        <button
          type="button"
          className="copy-btn copy-btn--light"
          aria-label={`Copy ${style.label} text`}
          disabled={!canCopy}
          onClick={() => onCopy(style.id, output.trim(), style.label)}
        >
          {copiedId === style.id
            ? "Copied!"
            : errorId === style.id
              ? "Failed"
              : "Copy"}
        </button>
      </div>
    </li>
  );
}
