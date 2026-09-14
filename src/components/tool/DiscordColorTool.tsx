"use client";

import { useDeferredValue, useState } from "react";
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
  const [text, setText] = useState(initialText);
  const [colorCode, setColorCode] = useState<string>(DISCORD_COLORS[3]!.code);
  const [bold, setBold] = useState(false);
  const deferredText = useDeferredValue(text);
  const { copiedId, copy } = useCopyFeedback();

  const block = discordColorBlock(deferredText || " ", colorCode, bold);
  const ansiOnly = discordAnsi(deferredText || " ", colorCode, bold);

  return (
    <div className="text-tool">
      <label className="field-label" htmlFor="discord-input">
        Your message
      </label>
      <textarea
        id="discord-input"
        className="text-input"
        rows={2}
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
      />

      <div className="style-chips" role="listbox" aria-label="Discord color">
        {DISCORD_COLORS.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`style-chip${colorCode === c.code ? " is-active" : ""}`}
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

      <div className="preview-panel">
        <div className="preview-meta">
          <span>Discord code block</span>
          <button
            type="button"
            className="copy-btn"
            onClick={() => copy("block", block)}
          >
            {copiedId === "block" ? "Copied!" : "Copy block"}
          </button>
        </div>
        <pre className="code-preview">{block}</pre>
      </div>

      <div className="preview-panel preview-panel--secondary">
        <div className="preview-meta">
          <span>ANSI only</span>
          <button
            type="button"
            className="copy-btn"
            onClick={() => copy("ansi", ansiOnly)}
          >
            {copiedId === "ansi" ? "Copied!" : "Copy ANSI"}
          </button>
        </div>
        <pre className="code-preview code-preview--sm">{ansiOnly}</pre>
      </div>
    </div>
  );
}
