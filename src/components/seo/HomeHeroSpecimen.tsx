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

export function HomeHeroSpecimen() {
  const [index, setIndex] = useState(0);
  const style = SHOWCASE[index] ?? SHOWCASE[0];
  const specimen = transform(SPECIMEN, style.id);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    let intervalId = 0;
    const startId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setIndex((i) => (i + 1) % SHOWCASE.length);
      }, 2200);
    }, 2500);

    return () => {
      window.clearTimeout(startId);
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="home-specimen" aria-live="polite">
      <p className="home-specimen-label">{style.label}</p>
      <p className="home-specimen-text">{specimen}</p>
      <div className="home-specimen-row" aria-hidden>
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
