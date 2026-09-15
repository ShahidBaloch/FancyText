"use client";

import { useEffect, useState } from "react";
import { STYLES, transform } from "@/lib/fonts/styles";

const SPECIMEN = "fancy text";

const SHOWCASE_IDS = [
  "cursive",
  "bold",
  "bubble",
  "bold-cursive",
  "sans-bold",
  "italic",
] as const;

/** Precomputed once — the specimen word is constant, so transforms never re-run. */
const SHOWCASE = SHOWCASE_IDS.map((id) => {
  const style = STYLES.find((s) => s.id === id) ?? STYLES[0];
  return { label: style.label, output: transform(SPECIMEN, style.id) };
});

/** Decorative rotating preview only — does not control the main tool. */
export function HomeHeroSpecimen() {
  const [index, setIndex] = useState(0);
  const current = SHOWCASE[index] ?? SHOWCASE[0];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const intervalId = window.setInterval(() => {
      setIndex((i) => (i + 1) % SHOWCASE.length);
    }, 2200);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="home-specimen" aria-hidden="true">
      <p className="home-specimen-label">{current.label}</p>
      <p className="home-specimen-text">{current.output}</p>
      <div className="home-specimen-row">
        {SHOWCASE.map((s, i) => (
          <span
            key={s.label}
            className={`home-specimen-chip${i === index ? " is-active" : ""}`}
          >
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}
