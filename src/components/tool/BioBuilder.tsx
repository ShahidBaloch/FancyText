"use client";

import { useId, useState } from "react";
import { STYLES_BY_ID, transform } from "@/lib/fonts/styles";
import { useCopyFeedback } from "@/lib/copy";

const BIO_PLATFORMS = [
  { id: "instagram", label: "Instagram", max: 150 },
  { id: "tiktok", label: "TikTok", max: 80 },
  { id: "x", label: "X / Twitter", max: 160 },
  { id: "discord", label: "Discord About Me", max: 190 },
] as const;

const BIO_STYLE_IDS = [
  "cursive",
  "bold-cursive",
  "bold",
  "sans-bold",
  "small-caps",
  "fullwidth",
] as const;

const SPACERS = [
  { id: "dot", label: "Dot", char: "·" },
  { id: "bar", label: "Bar", char: "|" },
  { id: "star", label: "Star", char: "*" },
  { id: "dash", label: "Dash", char: "-" },
] as const;

type BioBuilderProps = {
  initialText?: string;
};

function codePointLength(value: string): number {
  return Array.from(value).length;
}

export function BioBuilder({
  initialText = "your name\ncreator · city",
}: BioBuilderProps) {
  const inputId = useId();
  const [text, setText] = useState(initialText);
  const [styleId, setStyleId] = useState<string>("cursive");
  const [platformId, setPlatformId] =
    useState<(typeof BIO_PLATFORMS)[number]["id"]>("instagram");
  const { copiedId, copy } = useCopyFeedback();

  const styled = text
    .split("\n")
    .map((line) => (line.trim() ? transform(line, styleId) : line))
    .join("\n");

  const platform =
    BIO_PLATFORMS.find((p) => p.id === platformId) ?? BIO_PLATFORMS[0];
  const count = codePointLength(styled);
  const over = count > platform.max;
  const chips = BIO_STYLE_IDS.map((id) => STYLES_BY_ID[id]).filter(Boolean);

  return (
    <div className="text-tool bio-builder">
      <div className="bio-builder-platforms" aria-label="Bio length">
        {BIO_PLATFORMS.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={platformId === item.id}
            className={`style-chip${platformId === item.id ? " is-active" : ""}`}
            onClick={() => setPlatformId(item.id)}
          >
            {item.label} ({item.max})
          </button>
        ))}
      </div>

      <label className="field-label" htmlFor={inputId}>
        Bio lines (one line per row)
      </label>
      <textarea
        id={inputId}
        className="text-input"
        rows={4}
        value={text}
        spellCheck={false}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="preset-chips" aria-label="Insert a spacer">
        {SPACERS.map((spacer) => (
          <button
            key={spacer.id}
            type="button"
            className="style-chip"
            onClick={() =>
              setText((current) =>
                current.trim() ? `${current} ${spacer.char} ` : `${spacer.char} `,
              )
            }
          >
            {spacer.label} {spacer.char}
          </button>
        ))}
      </div>

      {chips.length ? (
        <div className="style-chips" role="listbox" aria-label="Bio font style">
          {chips.map((style) => (
            <button
              key={style.id}
              type="button"
              role="option"
              aria-selected={styleId === style.id}
              className={`style-chip${styleId === style.id ? " is-active" : ""}`}
              onClick={() => setStyleId(style.id)}
            >
              {style.label}
            </button>
          ))}
        </div>
      ) : null}

      <div className="preview-panel">
        <pre className="bio-preview">{styled || " "}</pre>
      </div>

      <p className={`bio-count${over ? " is-over" : ""}`}>
        {count} / {platform.max} characters for {platform.label}
        {over ? " — shorten a line so it fits this platform." : ""}
      </p>

      <button
        type="button"
        className="copy-btn"
        onClick={() => copy("bio", styled)}
      >
        {copiedId === "bio" ? "Copied bio" : "Copy full bio"}
      </button>
    </div>
  );
}
