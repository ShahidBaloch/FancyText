import Link from "next/link";
import { BackToTool } from "@/components/seo/BackToTool";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FaqSection } from "@/components/seo/FaqSection";
import { FellowKeywords } from "@/components/seo/FellowKeywords";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { PageHero } from "@/components/seo/PageHero";
import { RelatedTools } from "@/components/seo/RelatedTools";
import { KaomojiGrid } from "@/components/kaomoji/KaomojiGrid";
import {
  ALL_KAOMOJI_PAGES,
  INDEXABLE_KAOMOJI_SLUGS,
  SPECIAL_KAOMOJI,
  getHubShowcase,
  getTailKaomojiLists,
  kaomojiPathIsIndexable,
  type KaomojiList,
} from "@/data/kaomoji";
import {
  SITE_NAME,
  SITE_URL,
  getPageByUrl,
  getTopicalRelated,
} from "@/data/pages/registry";

type KaomojiListViewProps = {
  config: KaomojiList;
};

const hubFaq = [
  {
    question: "What does kaomoji mean?",
    answer:
      "Kaomoji (顔文字) means “face characters.” They are text emoticons popular in Japan and online chats worldwide. This hub is the canonical kaomoji index on FancifyText.",
  },
  {
    question: "Are kaomoji free to copy and paste?",
    answer:
      "Yes. Every face on FancifyText is free Unicode text. No account or download required.",
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
  {
    question: "Which emotion lists are the main kaomoji pages?",
    answer:
      "Start here on the hub, then cute, cry, and heart lists, plus Lenny face and the shrug emoticon. Other emotion URLs stay available for old links but this hub is the page to bookmark.",
  },
];

export function KaomojiListView({ config }: KaomojiListViewProps) {
  const url = `/${config.slug}/`;
  const page = getPageByUrl(url);
  const related = getTopicalRelated(url, 6);
  const relatedEmotions = [
    ...ALL_KAOMOJI_PAGES.filter(
      (k) => k.slug !== config.slug && INDEXABLE_KAOMOJI_SLUGS.has(k.slug),
    ),
    ...ALL_KAOMOJI_PAGES.filter(
      (k) => k.slug !== config.slug && !INDEXABLE_KAOMOJI_SLUGS.has(k.slug),
    ),
  ].slice(0, 8);

  return (
    <div className="site-shell">
      {page ? (
        <PageJsonLd
          page={page}
          faq={config.faq}
          crumbName={config.h1}
          crumbs={[
            { name: SITE_NAME, url: new URL("/", SITE_URL).toString() },
            { name: "Kaomoji", url: new URL("/kaomoji/", SITE_URL).toString() },
            { name: config.h1, url: new URL(url, SITE_URL).toString() },
          ]}
        />
      ) : null}

      <Breadcrumbs
        items={[
          { name: SITE_NAME, href: "/" },
          { name: "Kaomoji", href: "/kaomoji/" },
          { name: config.h1 },
        ]}
      />

      <PageHero h1={config.h1} lead={config.description} />

      {!kaomojiPathIsIndexable(config.slug) ? (
        <p className="seo-lead">
          This emotion list stays available for old links. The canonical kaomoji
          copy-and-paste index is the{" "}
          <Link href="/kaomoji/">kaomoji hub</Link>
          , with featured cute, cry, heart, Lenny, and shrug lists.
        </p>
      ) : null}

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
  const featuredShowcase = showcase.filter((item) =>
    INDEXABLE_KAOMOJI_SLUGS.has(item.href.replace(/^\/|\/$/g, "")),
  );
  const tailLists = getTailKaomojiLists();
  const samples = ALL_KAOMOJI_PAGES.flatMap((k) => k.faces.slice(0, 2)).slice(
    0,
    40,
  );

  return (
    <div className="site-shell">
      {page ? (
        <PageJsonLd
          page={page}
          faq={hubFaq}
          crumbName="Kaomoji"
          howTo={{
            name: "How to copy kaomoji",
            steps: [
              "Pick a face from the grid or open a featured emotion list.",
              "Tap Copy.",
              "Paste into any app that supports Unicode text.",
            ],
          }}
        />
      ) : null}

      <Breadcrumbs
        items={[
          { name: SITE_NAME, href: "/" },
          { name: "Kaomoji" },
        ]}
      />

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
        <h2 id="emotions-heading">Top kaomoji lists</h2>
        <p className="seo-lead">
          Cute, cry, and heart are the main emotion pages. Lenny and shrug are
          their own branded queries. This hub is the canonical kaomoji index.
        </p>
        <ul className="kaomoji-emotion-grid">
          {featuredShowcase.map((item) => (
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
          Bookmark this hub when you want Japanese emoticons in general; open a
          featured emotion list only when you already know the mood.
        </p>
      </section>

      <section className="seo-section seo-prose" aria-labelledby="how-hub-heading">
        <h2 id="how-hub-heading">How to copy</h2>
        <ol>
          <li>Pick a face from the grid or open a featured emotion list.</li>
          <li>Tap Copy.</li>
          <li>Paste into any app that supports Unicode text.</li>
        </ol>
      </section>

      <section className="seo-section" aria-labelledby="lists-heading">
        <h2 id="lists-heading">More emotion lists</h2>
        <p className="seo-lead">
          Extra mood URLs stay live for old links. Prefer this hub plus cute,
          cry, heart, Lenny, and shrug when you share a kaomoji page.
        </p>
        <ul className="taxonomy-links">
          {tailLists.map((k) => (
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
