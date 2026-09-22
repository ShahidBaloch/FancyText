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

  const indexedJumps = filtered.filter((j) => !j.browseOnly);
  const browseJumps = filtered.filter((j) => j.browseOnly);

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
      {filtered.length ? (
        <>
          {indexedJumps.length ? (
            <>
              <h3 className="field-label">Indexed lists (search pages)</h3>
              <ul className="taxonomy-links">
                {indexedJumps.map((jump) => (
                  <li key={jump.href}>
                    <Link href={jump.href}>{jump.label}</Link>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          {browseJumps.length ? (
            <>
              <h3 className="field-label">Browse-only (no Google landing page)</h3>
              <ul className="taxonomy-links">
                {browseJumps.map((jump) => (
                  <li key={jump.href}>
                    <Link href={jump.href}>{jump.label}</Link>
                    <span className="seo-lead"> — navigation only</span>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </>
      ) : (
        <p className="seo-lead">
          No list matched. Try{" "}
          <Link href="/multiline-kaomojis/">multiline</Link>,{" "}
          <Link href="/coquette-kaomojis/">coquette</Link>,{" "}
          <Link href="/cute-kaomojis/">cute</Link>, or{" "}
          <Link href="/angry-kaomojis/">angry (browse)</Link>.
        </p>
      )}
    </section>
  );
}
