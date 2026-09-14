import Link from "next/link";
import { BackToTool } from "@/components/seo/BackToTool";
import { FaqSection } from "@/components/seo/FaqSection";
import {
  JsonLd,
  breadcrumbJsonLd,
  faqPageJsonLd,
} from "@/components/seo/JsonLd";
import { LetterGrid } from "@/components/seo/LetterGrid";
import { PageHero } from "@/components/seo/PageHero";
import { RelatedTools } from "@/components/seo/RelatedTools";
import { CopyButton } from "@/components/tool/CopyButton";
import { SITE_NAME, SITE_URL, getTopicalRelated } from "@/data/pages/registry";
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
import { LETTER_TIPS } from "@/lib/fonts/letter-tips";

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
            question: `What is cursive capital ${upper}?`,
            answer: `Cursive capital ${upper} is the Unicode script letter ${capital}. It looks handwritten and can be copied into Instagram, Discord, TikTok, docs, and messages that support fancy Unicode fonts.`,
          },
          {
            question: `How to form cursive ${upper} neatly?`,
            answer: `On paper, start with a smooth entry stroke, keep the ${upper} loop balanced, and exit into the next letter. Online, skip handwriting practice—copy ${capital} from this page and paste it where you need a cursive ${upper}.`,
          },
          {
            question: `Where to use cursive ${upper} fonts?`,
            answer: `Use cursive capital ${upper} in display names, bios, titles, worksheets, invitations, and aesthetic captions. Pair it with small cursive letters for a full fancy name.`,
          },
          {
            question: `Can I copy cursive ${upper} fonts online?`,
            answer: `Yes. Tap Copy under the large glyph to copy ${capital} instantly. No app install or font download is required.`,
          },
          {
            question: `Is cursive ${upper} the same as print ${upper}?`,
            answer: `No. Print ${upper} is a normal Latin letter. Cursive ${upper} (${capital}) is a different Unicode character that only looks like a script font.`,
          },
          {
            question: `How do I type small ${upper} in cursive?`,
            answer: `Use our small letter page for ${letter} in cursive (${small}), or open the cursive text generator to convert a whole word.`,
          },
        ]
      : [
          {
            question: `What is ${letter} in cursive?`,
            answer: `${upper} in cursive is the Unicode script letter ${small}. Searchers looking for “${letter} in cursive” usually want this copy-paste glyph for names and bios.`,
          },
          {
            question: `How to write ${letter} in cursive neatly?`,
            answer: `On paper, keep the ${letter} curve smooth and connected. Digitally, copy ${small} from this page—it is already a cursive-style character.`,
          },
          {
            question: `Where can I use small cursive ${upper}?`,
            answer: `Paste ${small} into Instagram bios, Discord nicknames, TikTok captions, notes, and anywhere Unicode fancy text is allowed.`,
          },
          {
            question: `Can I copy ${letter} in cursive online for free?`,
            answer: `Yes. Use the Copy button to grab ${small}. Everything runs in your browser.`,
          },
          {
            question: `Is ${letter} in cursive the same as capital cursive ${upper}?`,
            answer: `They are related but different characters: small ${small} vs capital ${capital}. Use the matching page for the size you need.`,
          },
          {
            question: `How do I make a full name in cursive?`,
            answer: `Open the cursive text generator, type your name, and copy the script output—or combine letters from the A–Z grid below.`,
          },
        ];

  const related = getTopicalRelated(letterUrl(letter, letterCase), 6);
  const absoluteUrl = new URL(letterUrl(letter, letterCase), SITE_URL).toString();
  const hubUrl = new URL("/cursive-text-generator/", SITE_URL).toString();

  return (
    <div className="site-shell">
      <JsonLd data={faqPageJsonLd(absoluteUrl, faqItems)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: SITE_NAME, url: new URL("/", SITE_URL).toString() },
          { name: "Cursive text generator", url: hubUrl },
          { name: h1, url: absoluteUrl },
        ])}
      />

      <PageHero h1={h1} lead={letterDescription(letter, letterCase)} />

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
      </div>

      <section className="seo-section seo-prose" aria-labelledby="tip-heading">
        <h2 id="tip-heading">About cursive {upper}</h2>
        <p>{LETTER_TIPS[letter]}</p>
      </section>

      <section className="seo-section seo-prose" aria-labelledby="worksheet-heading">
        <h2 id="worksheet-heading">Cursive worksheet tips for {upper}</h2>
        <ol>
          <li>Study the Unicode glyph {primary} as your model for {kw}.</li>
          <li>
            Practice the entry and exit strokes so {upper} connects smoothly to
            neighboring letters.
          </li>
          <li>
            For digital use, copy {primary} and paste it into your name, bio, or
            caption—no special keyboard needed.
          </li>
          <li>
            Mix capital {capital} with small cursive letters for a polished
            fancy signature.
          </li>
        </ol>
      </section>

      <section className="seo-section seo-prose" aria-labelledby="uses-heading">
        <h2 id="uses-heading">Where to use cursive {upper}</h2>
        <ul>
          <li>Instagram and TikTok bios and display names</li>
          <li>Discord nicknames and channel topics</li>
          <li>School worksheets and handwriting practice sheets</li>
          <li>Invitations, aesthetic quotes, and username flair</li>
        </ul>
      </section>

      <BackToTool />
      <FaqSection heading="FAQs" items={faqItems} accordion />
      <LetterGrid current={{ letter, letterCase }} />
      <RelatedTools pages={related} heading="Related tools" />
    </div>
  );
}
