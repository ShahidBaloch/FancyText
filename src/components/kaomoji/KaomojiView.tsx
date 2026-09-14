import Link from "next/link";
import { BackToTool } from "@/components/seo/BackToTool";
import { FaqSection } from "@/components/seo/FaqSection";
import { FellowKeywords } from "@/components/seo/FellowKeywords";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { PageHero } from "@/components/seo/PageHero";
import { RelatedTools } from "@/components/seo/RelatedTools";
import { KaomojiGrid } from "@/components/kaomoji/KaomojiGrid";
import {
  ALL_KAOMOJI_PAGES,
  KAOMOJI_LISTS,
  SPECIAL_KAOMOJI,
  getHubShowcase,
  type KaomojiList,
} from "@/data/kaomoji";
import { getPageByUrl, getTopicalRelated } from "@/data/pages/registry";

type KaomojiListViewProps = {
  config: KaomojiList;
};

const hubFaq = [
  {
    question: "What does kaomoji mean?",
    answer:
      "Kaomoji (顔文字) means “face characters.” They are text emoticons popular in Japan and online chats worldwide.",
  },
  {
    question: "Are kaomoji free to copy and paste?",
    answer:
      "Yes. Every face on FancyText is free Unicode text. No account or download required.",
  },
  {
    question: "Do Japanese emoticons work on Discord?",
    answer:
      "Yes. Paste kaomoji into Discord messages, nicknames, and channel topics when the platform allows the characters.",
  },
  {
    question: "Are text faces the same as emoji?",
    answer:
      "Text faces (kaomoji) are built from letters and symbols. Emoji are separate picture characters. Both can appear in the same message.",
  },
];

export function KaomojiListView({ config }: KaomojiListViewProps) {
  const url = `/${config.slug}/`;
  const page = getPageByUrl(url);
  const related = getTopicalRelated(url, 6);
  const relatedEmotions = ALL_KAOMOJI_PAGES.filter(
    (k) => k.slug !== config.slug,
  ).slice(0, 12);

  return (
    <div className="site-shell">
      {page ? (
        <PageJsonLd page={page} faq={config.faq} crumbName={config.h1} />
      ) : null}

      <PageHero h1={config.h1} lead={config.description} />

      <div className="tool-stage" id="tool">
        <p className="field-label">
          {config.faces.length} faces — tap to copy
        </p>
        <KaomojiGrid faces={config.faces} />
      </div>

      <section className="seo-section seo-prose" aria-labelledby="how-heading">
        <h2 id="how-heading">How to copy</h2>
        <ol>
          <li>Browse the {config.emotion} faces above.</li>
          <li>Tap Copy on any kaomoji you like.</li>
          <li>
            Paste into Discord, Instagram, TikTok, WhatsApp, or any chat that
            supports Unicode.
          </li>
        </ol>
      </section>

      <section className="seo-section seo-prose" aria-labelledby="meanings-heading">
        <h2 id="meanings-heading">Meanings & when to use</h2>
        <p>{config.meanings}</p>
      </section>

      <section className="seo-section seo-prose" aria-labelledby="mobile-heading">
        <h2 id="mobile-heading">On mobile</h2>
        <p>
          Open this page in your phone browser, tap Copy on a face, switch to
          your chat app, and paste. No keyboard app or font pack is required—
          kaomoji are normal Unicode characters.
        </p>
      </section>

      <section className="seo-section" aria-labelledby="more-heading">
        <h2 id="more-heading">Related emotions</h2>
        <ul className="taxonomy-links">
          <li>
            <Link href="/kaomoji/">All kaomoji</Link>
          </li>
          {relatedEmotions.map((k) => (
            <li key={k.slug}>
              <Link href={`/${k.slug}/`}>{k.h1}</Link>
            </li>
          ))}
        </ul>
      </section>

      <FellowKeywords keywords={config.fellowKeywords} currentUrl={url} />
      <BackToTool />
      <FaqSection items={config.faq} accordion />
      <RelatedTools pages={related} heading="Text tools" />
    </div>
  );
}

export function KaomojiHubView() {
  const page = getPageByUrl("/kaomoji/");
  const related = getTopicalRelated("/kaomoji/", 6);
  const showcase = getHubShowcase();
  const samples = ALL_KAOMOJI_PAGES.flatMap((k) => k.faces.slice(0, 2)).slice(
    0,
    40,
  );

  return (
    <div className="site-shell">
      {page ? <PageJsonLd page={page} faq={hubFaq} crumbName="Kaomoji" /> : null}

      <PageHero
        h1="Kaomoji"
        lead={
          page?.description ??
          "Japanese emoticons and text faces to copy and paste for free."
        }
      />

      <div className="tool-stage" id="tool">
        <p className="field-label">Popular faces — tap to copy</p>
        <KaomojiGrid faces={samples} />
      </div>

      <section className="seo-section" aria-labelledby="emotions-heading">
        <h2 id="emotions-heading">Browse by emotion</h2>
        <ul className="kaomoji-emotion-grid">
          {showcase.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="kaomoji-emotion-card">
                <span className="kaomoji-emotion-sample" aria-hidden>
                  {item.sample}
                </span>
                <span className="kaomoji-emotion-label">
                  {item.emotion.charAt(0).toUpperCase() + item.emotion.slice(1)}{" "}
                  kaomojis
                </span>
              </Link>
            </li>
          ))}
          {SPECIAL_KAOMOJI.map((k) => (
            <li key={k.slug}>
              <Link href={`/${k.slug}/`} className="kaomoji-emotion-card">
                <span className="kaomoji-emotion-sample" aria-hidden>
                  {k.faces[0]}
                </span>
                <span className="kaomoji-emotion-label">{k.h1}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="seo-section seo-prose" aria-labelledby="what-heading">
        <h2 id="what-heading">What are kaomoji?</h2>
        <p>
          Kaomoji are Japanese emoticons made from Unicode characters. Unlike
          emoji stickers, they are plain text—so you can copy and paste them
          into Discord, Instagram bios, TikTok captions, WhatsApp, and email.
        </p>
      </section>

      <section className="seo-section seo-prose" aria-labelledby="how-hub-heading">
        <h2 id="how-hub-heading">How to copy</h2>
        <ol>
          <li>Pick a face from the grid or open an emotion list.</li>
          <li>Tap Copy.</li>
          <li>Paste into any app that supports Unicode text.</li>
        </ol>
      </section>

      <section className="seo-section" aria-labelledby="lists-heading">
        <h2 id="lists-heading">All kaomoji lists</h2>
        <ul className="taxonomy-links">
          {KAOMOJI_LISTS.map((k) => (
            <li key={k.slug}>
              <Link href={`/${k.slug}/`}>{k.h1}</Link>
            </li>
          ))}
          {SPECIAL_KAOMOJI.map((k) => (
            <li key={k.slug}>
              <Link href={`/${k.slug}/`}>{k.h1}</Link>
            </li>
          ))}
        </ul>
      </section>

      {page ? (
        <FellowKeywords keywords={page.fellowKeywords} currentUrl="/kaomoji/" />
      ) : null}

      <BackToTool />
      <FaqSection items={hubFaq} accordion />
      <RelatedTools pages={related} />
    </div>
  );
}
