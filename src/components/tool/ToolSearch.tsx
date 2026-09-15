"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getLivePages } from "@/data/pages/registry";

function normalize(value: string): string {
  return value.toLowerCase().trim();
}

export function ToolSearch({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const pages = useMemo(() => getLivePages(), []);

  const results = useMemo(() => {
    const q = normalize(query);
    if (!q) return pages.filter((p) => p.group !== "H_Trust").slice(0, 24);
    return pages.filter((page) => {
      const hay = [
        page.primaryKeyword,
        page.title,
        page.description,
        ...page.fellowKeywords,
        page.url,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [pages, query]);

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
        {results.map((page) => (
          <li key={page.url}>
            <Link href={page.url}>
              {page.navLabel ?? page.primaryKeyword}
            </Link>
            <span className="search-desc"> — {page.description}</span>
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
