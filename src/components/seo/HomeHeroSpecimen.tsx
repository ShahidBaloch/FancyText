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

const SHOWCASE = SHOWCASE_IDS.map(
  (id) => STYLES.find((s) => s.id === id) ?? STYLES[0],
);

/** Decorative rotating preview only — does not control the main tool. */
export function HomeHeroSpecimen({ text }: { text?: string }) {
  const [index, setIndex] = useState(0);
  const style = SHOWCASE[index] ?? SHOWCASE[0];
  const source = text?.trim() ? text : SPECIMEN;
  const specimen = transform(source, style.id);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const intervalId = window.setInterval(() => {
      setIndex((i) => (i + 1) % SHOWCASE.length);
    }, 2200);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="home-specimen" aria-hidden="true">
      <p className="home-specimen-label">{style.label}</p>
      <p className="home-specimen-text">{specimen}</p>
      <div className="home-specimen-row">
        {SHOWCASE.map((s, i) => (
          <span
            key={s.id}
            className={`home-specimen-chip${i === index ? " is-active" : ""}`}
          >
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}
