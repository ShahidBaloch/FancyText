"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { KaomojiHubJump } from "@/data/kaomoji";

type KaomojiHubJumpFilterProps = {
  jumps: KaomojiHubJump[];
};

export function KaomojiHubJumpFilter({ jumps }: KaomojiHubJumpFilterProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return jumps;
    return jumps.filter((jump) => {
      const blob = `${jump.label} ${jump.keywords.join(" ")}`.toLowerCase();
      return terms.every((term) => blob.includes(term));
    });
  }, [jumps, query]);

  return (
    <section className="seo-section" aria-labelledby="hub-jump-heading">
      <h2 id="hub-jump-heading">Find a list by keyword</h2>
      <p className="seo-lead">
        Type a mood or topic—coquette, aesthetic, tulip bunny, cute cat, Carrd,
        dog ascii, cry, star—and jump to the full copy-paste list. This filters
        page links only; it does not search every face in the library.
      </p>
      <div className="gallery-search">
        <label className="field-label" htmlFor="kaomoji-hub-jump">
          Filter lists
        </label>
        <input
          id="kaomoji-hub-jump"
          type="search"
          name="kaomoji-list-search"
          className="text-input"
          placeholder="e.g. coquette, aesthetic, tulip bunny, neko"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          enterKeyHint="search"
        />
      </div>
      <ul className="taxonomy-links">
        {filtered.length ? (
          filtered.map((jump) => (
            <li key={jump.href}>
              <Link href={jump.href}>{jump.label}</Link>
              {jump.browseOnly ? (
                <span className="seo-lead"> — browse list (not in Google search)</span>
              ) : null}
            </li>
          ))
        ) : (
          <li>No list matched. Try{" "}
            <Link href="/cute-kaomojis/">cute</Link>,{" "}
            <Link href="/carrd-kaomojis/">Carrd</Link>, or{" "}
            <Link href="/hand-kaomojis/">hand</Link>.
          </li>
        )}
      </ul>
    </section>
  );
}
