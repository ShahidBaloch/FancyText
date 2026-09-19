"use client";

import { useId, useMemo, useRef, useState } from "react";
import { transform } from "@/lib/fonts/styles";
import { useCopyFeedback } from "@/lib/copy";
import { countText, splitAtFold } from "@/lib/text/count";
import { unformatText } from "@/lib/text/unformat";
import {
  BULLET_RELIABILITY_LABELS,
  BULLET_SYMBOLS,
  COUNTER_FIELD_IDS,
  DIVIDER_LINES,
  FIELD_STYLING_LABELS,
  LINKEDIN_FIELDS,
  POST_FOLD_DESKTOP,
  POST_FOLD_MOBILE,
  getLinkedInField,
} from "@/lib/linkedin/fields";

/**
 * Styles offered in the toolbar, kept to the ones that survive LinkedIn on both
 * desktop and mobile. Fraktur and double-struck are the usual tofu offenders and
 * are deliberately absent — the gallery pages exist for decorative browsing.
 */
const TOOLBAR_STYLES = [
  { id: "sans-bold", label: "Bold", sample: "B" },
  { id: "sans-italic", label: "Italic", sample: "I" },
  { id: "sans-bold-italic", label: "Bold italic", sample: "BI" },
  { id: "underline", label: "Underline", sample: "U" },
  { id: "strikethrough", label: "Strikethrough", sample: "S" },
  { id: "monospace", label: "Monospace", sample: "M" },
  { id: "small-caps", label: "Small caps", sample: "ꜱᴄ" },
  { id: "cursive", label: "Script", sample: "𝒮" },
] as const;

type FieldId = (typeof COUNTER_FIELD_IDS)[number];

const COUNTER_FIELDS = COUNTER_FIELD_IDS.map((id) => getLinkedInField(id)!).filter(
  Boolean,
);

type LinkedInFormatterProps = {
  initialText?: string;
};

export function LinkedInFormatter({
  initialText = "Most people never get feedback on their writing.\n\nHere is what changed for me:\n\n- I wrote every day for 90 days\n- I asked one specific question each time\n- I stopped defending the first draft",
}: LinkedInFormatterProps) {
  const inputId = useId();
  const areaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState(initialText);
  const [fieldId, setFieldId] = useState<FieldId>("post");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const { copiedId, errorId, errorMessage, announcement, copy } =
    useCopyFeedback();

  const field = getLinkedInField(fieldId)!;
  const counts = useMemo(() => countText(text), [text]);
  const fold = device === "desktop" ? POST_FOLD_DESKTOP : POST_FOLD_MOBILE;
  const { visible, hidden } = useMemo(
    () => splitAtFold(text, field.fold ?? fold),
    [text, field.fold, fold],
  );

  const overLimit = counts.graphemes > field.limit;
  const styledHere = useMemo(
    () => unformatText(text).findings.some((f) => f.kind === "style"),
    [text],
  );

  /**
   * Replace the current selection (or the whole box when nothing is selected)
   * and hand the selection back so the next click keeps working on the same
   * words. Without the restore step, styling two words in a row means
   * re-selecting them every time.
   */
  function replaceSelection(mutate: (slice: string) => string) {
    const area = areaRef.current;
    if (!area) return;
    const hasSelection = area.selectionStart !== area.selectionEnd;
    const start = hasSelection ? area.selectionStart : 0;
    const end = hasSelection ? area.selectionEnd : text.length;
    const next = mutate(text.slice(start, end));
    const updated = text.slice(0, start) + next + text.slice(end);
    setText(updated);
    requestAnimationFrame(() => {
      area.focus();
      area.setSelectionRange(start, start + next.length);
    });
  }

  /**
   * Styles are mutually exclusive here: the slice is stripped back to plain
   * letters before the new style goes on, so switching from bold to italic does
   * not silently no-op on characters the italic map has never heard of. Clicking
   * the active style again clears it.
   */
  function applyStyle(styleId: string) {
    replaceSelection((slice) => {
      const plain = unformatText(slice, { tidyWhitespace: false }).text;
      const restyled = transform(plain, styleId);
      return slice === restyled ? plain : restyled;
    });
  }

  function clearStyling() {
    replaceSelection(
      (slice) => unformatText(slice, { tidyWhitespace: false }).text,
    );
  }

  /** Prefix every non-empty line in the selection, toggling if already prefixed. */
  function applyList(kind: "bullet" | "numbered", bullet = "•") {
    replaceSelection((slice) => {
      const lines = slice.split("\n");
      const marker = /^\s*(?:[•◦▪‣▸→✓★▶]|\d+\.)\s+/;
      const alreadyListed = lines
        .filter((line) => line.trim())
        .every((line) => marker.test(line));

      let n = 0;
      return lines
        .map((line) => {
          if (!line.trim()) return line;
          const bare = line.replace(marker, "").trimStart();
          if (alreadyListed) return bare;
          n += 1;
          return kind === "bullet" ? `${bullet} ${bare}` : `${n}. ${bare}`;
        })
        .join("\n");
    });
  }

  function insertAtCursor(value: string) {
    const area = areaRef.current;
    if (!area) {
      setText((current) => current + value);
      return;
    }
    const at = area.selectionEnd;
    const updated = text.slice(0, at) + value + text.slice(at);
    setText(updated);
    requestAnimationFrame(() => {
      area.focus();
      area.setSelectionRange(at + value.length, at + value.length);
    });
  }

  return (
    <div className="li-tool">
      <div className="li-toolbar" role="group" aria-label="Formatting">
        {TOOLBAR_STYLES.map((style) => (
          <button
            key={style.id}
            type="button"
            className="li-tool-btn"
            title={`${style.label} — applies to the selected words, or everything if nothing is selected`}
            aria-label={`Apply ${style.label}`}
            onClick={() => applyStyle(style.id)}
          >
            <span aria-hidden="true">{style.sample}</span>
          </button>
        ))}
        <span className="li-toolbar-divider" aria-hidden="true" />
        <button
          type="button"
          className="li-tool-btn li-tool-btn--wide"
          title="Bulleted list from the selected lines"
          onClick={() => applyList("bullet")}
        >
          • List
        </button>
        <button
          type="button"
          className="li-tool-btn li-tool-btn--wide"
          title="Numbered list from the selected lines"
          onClick={() => applyList("numbered")}
        >
          1. List
        </button>
        <span className="li-toolbar-divider" aria-hidden="true" />
        <button
          type="button"
          className="li-tool-btn li-tool-btn--wide"
          title="Convert styled characters back to plain letters"
          onClick={clearStyling}
        >
          Clear styling
        </button>
      </div>

      <p className="li-hint">
        Select the words you want to emphasise, then pick a style. With nothing
        selected, the style applies to the whole box.
      </p>

      <label className="field-label" htmlFor={inputId}>
        Your LinkedIn text
      </label>
      <textarea
        id={inputId}
        ref={areaRef}
        className="text-input li-area"
        rows={9}
        value={text}
        spellCheck
        onChange={(e) => setText(e.target.value)}
      />

      <div className="li-fields" role="group" aria-label="LinkedIn field">
        {COUNTER_FIELDS.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={fieldId === item.id}
            className={`style-chip${fieldId === item.id ? " is-active" : ""}`}
            onClick={() => setFieldId(item.id as FieldId)}
          >
            {item.name} ({item.limit})
          </button>
        ))}
      </div>

      <dl className="text-stats li-stats">
        <div>
          <dt>Characters</dt>
          <dd className={overLimit ? "is-over" : undefined}>
            {counts.graphemes} / {field.limit}
          </dd>
        </div>
        <div>
          <dt>
            Counted as <abbr title="UTF-16 code units — what JavaScript String.length returns">code units</abbr>
          </dt>
          <dd>{counts.utf16}</dd>
        </div>
        <div>
          <dt>Words</dt>
          <dd>{counts.words}</dd>
        </div>
        <div>
          <dt>Lines</dt>
          <dd>
            {counts.lines}
            {counts.blankLines ? ` + ${counts.blankLines} blank` : ""}
          </dd>
        </div>
      </dl>

      {counts.utf16 !== counts.graphemes ? (
        <p className="li-note">
          Styled letters live above U+FFFF, so each one is two code units. You
          have {counts.graphemes} characters but {counts.utf16} code units — if a
          field cuts you off early, that second number is why. Budget against it.
        </p>
      ) : null}

      <div
        className={`li-callout${field.styling === "no" ? " is-warning" : ""}`}
        data-styling={field.styling}
      >
        <strong>
          {field.name}: {FIELD_STYLING_LABELS[field.styling]}
        </strong>
        <span>{field.note}</span>
        {field.styling === "no" && styledHere ? (
          <button type="button" className="style-chip" onClick={clearStyling}>
            Strip styling for this field
          </button>
        ) : null}
      </div>

      <div className="li-preview-head">
        <h3 className="li-preview-title">Feed preview</h3>
        <div className="li-device" role="group" aria-label="Preview width">
          {(["desktop", "mobile"] as const).map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={device === value}
              className={`style-chip${device === value ? " is-active" : ""}`}
              onClick={() => setDevice(value)}
            >
              {value === "desktop" ? "Desktop" : "Mobile"}
            </button>
          ))}
        </div>
      </div>

      <div className={`li-preview is-${device}`}>
        <div className="li-preview-card">
          <div className="li-preview-author" aria-hidden="true">
            <span className="li-avatar" />
            <span>
              <b>Your name</b>
              <small>Your headline · now</small>
            </span>
          </div>
          <p className="li-preview-body">
            {text ? (
              <>
                <span>{visible}</span>
                {hidden ? (
                  <>
                    <span className="li-seemore">…see more</span>
                    <span className="li-folded">{hidden}</span>
                  </>
                ) : null}
              </>
            ) : (
              "Type above to preview your post."
            )}
          </p>
        </div>
        {hidden ? (
          <p className="li-note">
            Everything after <strong>…see more</strong> needs a click. The fold is
            roughly {POST_FOLD_DESKTOP} characters on desktop and{" "}
            {POST_FOLD_MOBILE} on mobile — LinkedIn has never published the exact
            numbers and they move with UI changes, so treat them as a target zone.
          </p>
        ) : (
          <p className="li-note">
            Nothing is cut off at the {device} fold. Your whole opening is visible
            without a click.
          </p>
        )}
      </div>

      <div className="li-copy-row">
        <button
          type="button"
          className="copy-btn"
          disabled={!text.trim()}
          aria-label="Copy formatted text for LinkedIn"
          onClick={() => copy("linkedin", text, "formatted text")}
        >
          {copiedId === "linkedin"
            ? "Copied!"
            : errorId === "linkedin"
              ? "Copy failed"
              : "Copy for LinkedIn"}
        </button>
        {overLimit ? (
          <span className="copy-status" role="status">
            {counts.graphemes - field.limit} characters over the {field.name}{" "}
            limit.
          </span>
        ) : null}
        {errorMessage ? (
          <span className="copy-status" role="alert">
            {errorMessage}
          </span>
        ) : null}
      </div>

      <details className="li-drawer">
        <summary>Bullets and dividers that actually render on LinkedIn</summary>
        <p className="li-note">
          LinkedIn ignores Markdown lists, so every bulleted list in the feed is
          literal bullet characters. Click one to drop it at the cursor.
        </p>
        <ul className="li-symbol-grid">
          {BULLET_SYMBOLS.map((symbol) => (
            <li key={symbol.char}>
              <button
                type="button"
                className="li-symbol"
                onClick={() => insertAtCursor(`${symbol.char} `)}
                aria-label={`Insert ${symbol.name}`}
              >
                <span className="li-symbol-char" aria-hidden="true">
                  {symbol.char}
                </span>
                <span className="li-symbol-name">{symbol.name}</span>
                <span
                  className="gallery-support"
                  data-reliability={symbol.reliability}
                >
                  {BULLET_RELIABILITY_LABELS[symbol.reliability]}
                </span>
                <span className="gallery-blurb">{symbol.note}</span>
              </button>
            </li>
          ))}
        </ul>
        <h4 className="li-symbol-heading">Section dividers</h4>
        <ul className="li-symbol-grid">
          {DIVIDER_LINES.map((divider) => (
            <li key={divider.label}>
              <button
                type="button"
                className="li-symbol"
                onClick={() => insertAtCursor(`\n${divider.value}\n`)}
                aria-label={`Insert ${divider.label} divider`}
              >
                <span className="li-symbol-char" aria-hidden="true">
                  {divider.value}
                </span>
                <span className="li-symbol-name">{divider.label}</span>
                <span className="gallery-blurb">{divider.note}</span>
              </button>
            </li>
          ))}
        </ul>
      </details>

      <details className="li-drawer">
        <summary>Every LinkedIn limit, and which fields accept styling</summary>
        <div className="codes-table-wrap">
          <table className="codes-table">
            <thead>
              <tr>
                <th>Field</th>
                <th>Limit</th>
                <th>Visible first</th>
                <th>Styling</th>
              </tr>
            </thead>
            <tbody>
              {LINKEDIN_FIELDS.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.limit.toLocaleString("en-US")}</td>
                  <td>{item.fold ? `~${item.fold}` : "All of it"}</td>
                  <td>
                    <span
                      className="gallery-support"
                      data-field-unicode={
                        item.styling === "yes"
                          ? "yes"
                          : item.styling === "risky"
                            ? "filtered"
                            : "no"
                      }
                    >
                      {FIELD_STYLING_LABELS[item.styling]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>

      <p className="sr-only" role="status">
        {announcement}
      </p>
    </div>
  );
}
