"use client";

import { useDeferredValue, useId, useState } from "react";
import {
  DISCORD_COLORS,
  discordAnsi,
  discordColorBlock,
} from "@/lib/discord/ansi";
import { useCopyFeedback } from "@/lib/copy";

export function DiscordColorTool({
  initialText = "Discord color text",
}: {
  initialText?: string;
}) {
  const inputId = useId();
  const [text, setText] = useState(initialText);
  const [colorCode, setColorCode] = useState<string>(DISCORD_COLORS[3]!.code);
  const [bold, setBold] = useState(false);
  const deferredText = useDeferredValue(text);
  const { copiedId, errorId, errorMessage, copy } = useCopyFeedback();
  const canCopy = Boolean(text.trim());

  const selected =
    DISCORD_COLORS.find((c) => c.code === colorCode) ?? DISCORD_COLORS[3]!;
  const block = discordColorBlock(deferredText || " ", colorCode, bold);
  const ansiOnly = discordAnsi(deferredText || " ", colorCode, bold);

  return (
    <div className="text-tool">
      <label className="field-label" htmlFor={inputId}>
        Your message
      </label>
      <textarea
        id={inputId}
        className="text-input"
        rows={2}
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
      />

      <div
        className="style-chips"
        role="radiogroup"
        aria-label="Discord color"
      >
        {DISCORD_COLORS.map((c) => (
          <button
            key={c.id}
            type="button"
            role="radio"
            aria-checked={colorCode === c.code}
            className={`style-chip style-chip--color${colorCode === c.code ? " is-active" : ""}`}
            style={{ "--chip-color": c.hex } as React.CSSProperties}
            onClick={() => setColorCode(c.code)}
          >
            <span
              className="color-dot"
              style={{ background: c.hex }}
              aria-hidden
            />
            {c.label}
          </button>
        ))}
      </div>

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={bold}
          onChange={(e) => setBold(e.target.checked)}
        />
        Bold ANSI text
      </label>

      {errorMessage ? (
        <p className="copy-status" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <div className="discord-live" aria-live="polite">
        <div className="preview-meta">
          <span>How it looks — {selected.label}</span>
          <button
            type="button"
            className="copy-btn"
            aria-label={`Copy ${selected.label} Discord text`}
            disabled={!canCopy}
            onClick={() => copy("live", block)}
          >
            {copiedId === "live"
              ? "Copied!"
              : errorId === "live"
                ? "Failed"
                : `Copy ${selected.label}`}
          </button>
        </div>
        <p
          className={`discord-live-text${bold ? " is-bold" : ""}`}
          style={{ color: selected.hex }}
        >
          {canCopy ? deferredText : "Type above to preview"}
        </p>
      </div>

      <div className="preview-panel">
        <div className="preview-meta">
          <span>Discord code block</span>
          <button
            type="button"
            className="copy-btn"
            aria-label="Copy Discord code block"
            disabled={!canCopy}
            onClick={() => copy("block", block)}
          >
            {copiedId === "block"
              ? "Copied!"
              : errorId === "block"
                ? "Failed"
                : "Copy block"}
          </button>
        </div>
        <pre className="code-preview">{canCopy ? block : "Type above to preview"}</pre>
      </div>

      <div className="preview-panel preview-panel--secondary">
        <div className="preview-meta">
          <span>ANSI only</span>
          <button
            type="button"
            className="copy-btn"
            aria-label="Copy ANSI only"
            disabled={!canCopy}
            onClick={() => copy("ansi", ansiOnly)}
          >
            {copiedId === "ansi"
              ? "Copied!"
              : errorId === "ansi"
                ? "Failed"
                : "Copy ANSI"}
          </button>
        </div>
        <pre className="code-preview code-preview--sm">
          {canCopy ? ansiOnly : "Type above to preview"}
        </pre>
      </div>
    </div>
  );
}
