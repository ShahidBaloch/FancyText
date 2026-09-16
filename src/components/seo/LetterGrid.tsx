import Link from "next/link";
import {
  LETTERS,
  cursiveGlyph,
  letterUrl,
  type Letter,
  type LetterCase,
} from "@/lib/fonts/cursive";

type LetterGridProps = {
  mode?: LetterCase | "both";
  current?: { letter: Letter; letterCase: LetterCase };
  heading?: string;
  lead?: string;
};

export function LetterGrid({
  mode = "both",
  current,
  heading = "All cursive letters (A–Z)",
  lead,
}: LetterGridProps) {
  const showCapital = mode === "both" || mode === "capital";
  const showSmall = mode === "both" || mode === "small";

  return (
    <section className="seo-section" aria-labelledby="letter-grid-heading">
      <h2 id="letter-grid-heading">{heading}</h2>
      {lead ? <p className="seo-lead">{lead}</p> : null}
      {showCapital ? (
        <div className="letter-grid-block">
          <h3 className="letter-grid-sub">Capital cursive</h3>
          <ul className="letter-grid">
            {LETTERS.map((letter) => {
              const active =
                current?.letterCase === "capital" && current.letter === letter;
              return (
                <li key={`cap-${letter}`}>
                  <Link
                    href={letterUrl(letter, "capital")}
                    className={active ? "is-active" : undefined}
                    aria-current={active ? "page" : undefined}
                  >
                    <span className="lg-glyph" aria-hidden>
                      {cursiveGlyph(letter, "capital")}
                    </span>
                    <span className="lg-label">{letter.toUpperCase()}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
      {showSmall ? (
        <div className="letter-grid-block">
          <h3 className="letter-grid-sub">Small cursive</h3>
          <ul className="letter-grid">
            {LETTERS.map((letter) => {
              const active =
                current?.letterCase === "small" && current.letter === letter;
              return (
                <li key={`small-${letter}`}>
                  <Link
                    href={letterUrl(letter, "small")}
                    className={active ? "is-active" : undefined}
                    aria-current={active ? "page" : undefined}
                  >
                    <span className="lg-glyph" aria-hidden>
                      {cursiveGlyph(letter, "small")}
                    </span>
                    <span className="lg-label">{letter}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
