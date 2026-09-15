"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

/**
 * Pre-flattened on the server so the full page registry never ships to the
 * browser — only the label, href, description, and a prebuilt haystack.
 */
export type SearchEntry = {
  href: string;
  label: string;
  description: string;
  haystack: string;
  featured: boolean;
};

function normalize(value: string): string {
  return value.toLowerCase().trim();
}

export function ToolSearch({
  entries,
  initialQuery = "",
}: {
  entries: SearchEntry[];
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    const q = normalize(query);
    if (!q) return entries.filter((e) => e.featured).slice(0, 24);
    return entries.filter((entry) => entry.haystack.includes(q));
  }, [entries, query]);

  return (
    <div className="tool-search">
      <label className="field-label" htmlFor="tool-search-input">
        Search tools
      </label>
      <input
        id="tool-search-input"
        className="text-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="bold, cursive, discord, kaomoji…"
        autoComplete="off"
        spellCheck={false}
      />
      <p className="seo-lead">
        {results.length} result{results.length === 1 ? "" : "s"}
      </p>
      <ul className="taxonomy-links">
        {results.map((entry) => (
          <li key={entry.href}>
            <Link href={entry.href}>{entry.label}</Link>
            <span className="search-desc"> — {entry.description}</span>
          </li>
        ))}
      </ul>
      {results.length === 0 ? (
        <p className="seo-lead">
          No tools matched. Try{" "}
          <Link href="/">fancy text generator</Link> or{" "}
          <Link href="/copy-paste-fonts/">copy and paste fonts</Link>.
        </p>
      ) : null}
    </div>
  );
}
