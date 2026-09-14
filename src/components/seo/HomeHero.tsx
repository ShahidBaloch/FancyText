"use client";

import { useEffect, useState } from "react";
import { STYLES, transform } from "@/lib/fonts/styles";

const BRAND = "FancifyText";
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

export function HomeHero() {
  const [index, setIndex] = useState(0);
  const style = SHOWCASE[index] ?? SHOWCASE[0];
  const specimen = transform(SPECIMEN, style.id);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SHOWCASE.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="home-hero" aria-labelledby="home-title">
      <div className="home-hero-copy">
        <p className="home-brand">{BRAND}</p>
        <h1 id="home-title" className="home-title">
          Fancy text generator
        </h1>
        <p className="home-lead">
          Type once, then copy bold, cursive, bubble, and aesthetic fonts for
          bios, chats, and usernames.
        </p>
        <div className="home-cta">
          <a className="btn-primary" href="#tool">
            Start typing
          </a>
          <a className="btn-ghost" href="#gallery-heading">
            Browse styles
          </a>
        </div>
      </div>

      <div className="home-specimen" aria-live="polite">
        <p className="home-specimen-label">{style.label}</p>
        <p className="home-specimen-text">{specimen}</p>
        <div className="home-specimen-row" aria-hidden>
          {SHOWCASE.map((s, i) => (
            <span
              key={s.id}
              className="home-specimen-chip"
              style={{
                opacity: i === index ? 1 : 0.45,
                borderColor:
                  i === index
                    ? "rgba(255,255,255,0.45)"
                    : "rgba(255,255,255,0.16)",
              }}
            >
              {s.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
