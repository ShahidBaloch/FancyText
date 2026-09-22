"use client";

import { useEffect, useState } from "react";
import type { FontRotateShowcaseItem } from "@/lib/seo/specimens";

type SerpSpecimenFontRotateProps = {
  showcase: FontRotateShowcaseItem[];
  /** Home hero (dark) vs inner tool pages (light panel). */
  variant?: "home" | "inline";
};

export function SerpSpecimenFontRotate({
  showcase,
  variant = "inline",
}: SerpSpecimenFontRotateProps) {
  const [index, setIndex] = useState(0);
  const current = showcase[index] ?? showcase[0];
  const rootClass =
    variant === "home" ? "home-specimen" : "serp-specimen serp-specimen--rotate";

  useEffect(() => {
    if (showcase.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const intervalId = window.setInterval(() => {
      setIndex((i) => (i + 1) % showcase.length);
    }, 2200);

    return () => window.clearInterval(intervalId);
  }, [showcase.length]);

  if (!showcase.length) return null;

  return (
    <div className={rootClass} aria-hidden="true">
      <p
        className={
          variant === "home" ? "home-specimen-label" : "serp-specimen-label"
        }
      >
        {current.label}
      </p>
      <p
        className={
          variant === "home" ? "home-specimen-text" : "serp-specimen-text"
        }
      >
        {current.output}
      </p>
      {showcase.length > 1 ? (
        <div
          className={
            variant === "home" ? "home-specimen-row" : "serp-specimen-row"
          }
        >
          {showcase.map((s, i) => (
            <span
              key={s.label}
              className={`${
                variant === "home" ? "home-specimen-chip" : "serp-specimen-chip"
              }${i === index ? " is-active" : ""}`}
            >
              {s.label}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
