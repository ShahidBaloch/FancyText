import Link from "next/link";
import { BackToTool } from "@/components/seo/BackToTool";
import { Breadcrumbs, HOME_CRUMB, homeCrumbLd } from "@/components/seo/Breadcrumbs";
import { FaqSection } from "@/components/seo/FaqSection";
import {
  JsonLd,
  breadcrumbJsonLd,
  faqPageJsonLd,
  webPageJsonLd,
} from "@/components/seo/JsonLd";
import { LetterGrid } from "@/components/seo/LetterGrid";
import { LetterStyleGrid } from "@/components/cursive/LetterStyleGrid";
import { PageHero } from "@/components/seo/PageHero";
import { RelatedTools } from "@/components/seo/RelatedTools";
import { CopyButton } from "@/components/tool/CopyButton";
import { SITE_NAME, SITE_URL, getTopicalRelated } from "@/data/pages/registry";
import { metaDescriptionPlain } from "@/lib/seo/meta-description";
import {
  boldCursiveGlyph,
  cursiveGlyph,
  letterDescription,
  letterH1,
  letterPrimaryKeyword,
  letterUrl,
  type Letter,
  type LetterCase,
} from "@/lib/fonts/cursive";
import { LETTER_EXAMPLES, LETTER_TIPS } from "@/lib/fonts/letter-tips";
import { transform } from "@/lib/fonts/styles";

type CursiveLetterViewProps = {
  letter: Letter;
  letterCase: LetterCase;
};

export function CursiveLetterView({
  letter,
  letterCase,
}: CursiveLetterViewProps) {
  const upper = letter.toUpperCase();
  const primary = cursiveGlyph(letter, letterCase);
  const capital = cursiveGlyph(letter, "capital");
  const small = cursiveGlyph(letter, "small");
  const boldPrimary = boldCursiveGlyph(letter, letterCase);
  const otherCase: LetterCase = letterCase === "capital" ? "small" : "capital";
  const otherUrl = letterUrl(letter, otherCase);
  const otherLabel =
    otherCase === "capital"
      ? `Cursive capital ${upper}`
      : `${upper} in cursive (small)`;

  const h1 = letterH1(letter, letterCase);
  const kw = letterPrimaryKeyword(letter, letterCase);

  const faqItems =
    letterCase === "capital"
      ? [
          {
            question: `What character is this cursive ${upper}?`,
            answer: `${capital} is Mathematical Script capital ${upper}—a different code point from a normal ${upper}. Copy the glyph here. For a whole name, use the cursive generator instead of stitching letters.`,
          },
          {
            question: `Will ${capital} paste into Instagram or Discord?`,
            answer: `Usually in bios, nicknames, and captions. Username fields are pickier. A box means the device font is missing that glyph.`,
          },
          {
            question: `How do I get a full cursive word?`,
            answer: `Type it on the cursive text generator and copy Cursive or Bold Cursive. Building a name from this A–Z grid is slower and easy to mix up.`,
          },
        ]
      : [
          {
            question: `What is this small cursive ${letter}?`,
            answer: `${small} is Mathematical Script small ${letter}, not a handwriting font. Copy it here; convert a whole word on the cursive generator.`,
          },
          {
            question: `Capital or small?`,
            answer: `They are different characters: ${capital} vs ${small}. Use the matching page for the size you need, or type the full name on the hub.`,
          },
          {
            question: `Can I practice handwriting from this glyph?`,
            answer: `It is a shape reference, but letters will not join like calligraphy on paper. For bios, paste ${small} as-is.`,
          },
        ];

  const related = getTopicalRelated(letterUrl(letter, letterCase), 6);
  const absoluteUrl = new URL(letterUrl(letter, letterCase), SITE_URL).toString();
  const hubUrl = new URL("/cursive-text-generator/", SITE_URL).toString();
  const metaDescription = metaDescriptionPlain(
    letterDescription(letter, letterCase),
  );

  return (
    <div className="site-shell">
      <JsonLd
        data={webPageJsonLd({
          name: h1,
          description: metaDescription,
          url: absoluteUrl,
          siteName: SITE_NAME,
          siteUrl: SITE_URL,
        })}
      />
      <JsonLd data={faqPageJsonLd(absoluteUrl, faqItems)} />
      <JsonLd
        data={breadcrumbJsonLd([
          homeCrumbLd(SITE_URL),
          { name: "Cursive text generator", url: hubUrl },
          { name: h1, url: absoluteUrl },
        ])}
      />

      <Breadcrumbs
        items={[
          HOME_CRUMB,
          { name: "Cursive text generator", href: "/cursive-text-generator/" },
          { name: h1 },
        ]}
      />

      <PageHero
        h1={h1}
        lead={letterDescription(letter, letterCase)}
        specimenPath={letterUrl(letter, letterCase)}
      />

      <div className="tool-stage letter-stage" id="tool">
        <div className="glyph-hero">
          <p className="glyph-display" aria-label={`${kw} unicode character`}>
            {primary}
          </p>
          <CopyButton text={primary} id={`glyph-${letterCase}-${letter}`} />
        </div>

        <div className="glyph-variants">
          <div className="glyph-card">
            <span className="field-label">Capital cursive {upper}</span>
            <p className="glyph-md">{capital}</p>
            <CopyButton text={capital} id={`cap-${letter}`} label="Copy capital" />
          </div>
          <div className="glyph-card">
            <span className="field-label">Small {letter} in cursive</span>
            <p className="glyph-md">{small}</p>
            <CopyButton text={small} id={`small-${letter}`} label="Copy small" />
          </div>
          <div className="glyph-card">
            <span className="field-label">Bold cursive {upper}</span>
            <p className="glyph-md">{boldPrimary}</p>
            <CopyButton
              text={boldPrimary}
              id={`bold-${letterCase}-${letter}`}
              label="Copy bold"
            />
          </div>
        </div>

        <p className="letter-switch">
          Looking for the other size?{" "}
          <Link href={otherUrl}>{otherLabel}</Link>
        </p>

        <aside className="letter-generator-cta">
          <p>
            This page copies one letter. For a whole word, name, or bio line, use
            the cursive generator—type once and copy the full script string.
          </p>
          <Link href="/cursive-text-generator/" className="btn-primary">
            Open cursive text generator
          </Link>
        </aside>
      </div>

      <section className="seo-section seo-prose" aria-labelledby="tip-heading">
        <h2 id="tip-heading">About cursive {upper}</h2>
        <p>{LETTER_TIPS[letter]}</p>
      </section>

      <section className="seo-section" aria-labelledby="examples-heading">
        <h2 id="examples-heading">Example words with cursive {upper}</h2>
        <ul className="sample-list">
          {LETTER_EXAMPLES[letter].map((word) => {
            const styled = transform(word, "cursive");
            return (
              <li key={word} className="sample-row">
                <span className="sample-plain">{word}</span>
                <span className="sample-fancy" lang="en">
                  {styled}
                </span>
                <CopyButton text={styled} id={`ex-${letter}-${word}`} />
              </li>
            );
          })}
        </ul>
      </section>

      <LetterStyleGrid letter={letter} />

      <section className="seo-section seo-prose" aria-labelledby="worksheet-heading">
        <h2 id="worksheet-heading">One glyph, not a joined alphabet</h2>
        <ol>
          <li>
            Use {primary} as a shape model for {kw} if you are practicing on
            paper. Letters will not connect the way a calligraphy font does.
          </li>
          <li>
            For a digital name or bio, skip this grid and type the whole word on
            the cursive generator.
          </li>
        </ol>
      </section>

      <section className="seo-section seo-prose" aria-labelledby="uses-heading">
        <h2 id="uses-heading">A single letter is rarely the whole job</h2>
        <ul>
          <li>
            Worksheets and monograms—copy {primary} from the button above.
          </li>
          <li>
            Names, bios, and Discord nicks—{" "}
            <Link href="/cursive-text-generator/">convert the whole word</Link>
            .
          </li>
        </ul>
      </section>

      <BackToTool />
      <FaqSection heading="FAQs" items={faqItems} accordion />
      <LetterGrid current={{ letter, letterCase }} />
      <RelatedTools pages={related} heading="Related tools" />
    </div>
  );
}
