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
    question: "What are kaomoji?",
    answer:
      "顔文字: face characters. They are punctuation emoticons from Japanese chat culture, not emoji stickers. This hub is the index; cute, cry, and heart are the main mood pages, plus Lenny and shrug.",
  },
  {
    question: "Is this different from emoji?",
    answer:
      "Yes. Kaomoji are letters and symbols you can copy as text. Emoji are picture characters. You can mix both in one message.",
  },
  {
    question: "Will Discord keep a table-flip face?",
    answer:
      "Messages and topics usually yes. Long combining-mark stacks fail nickname filters—trim to one line.",
  },
  {
    question: "Which lists should I bookmark?",
    answer:
      "This hub, then cute, cry, heart, Lenny, and shrug. Other emotion URLs stay up for old links but this page is the one to share.",
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
        <h2 id="how-heading">{config.howToHeading ?? "Copy a face"}</h2>
        <ol>
          {(config.howToSteps ?? [
            "Scroll until you find a face that matches the mood.",
            "Tap it — the face goes to the clipboard as plain text.",
            "Paste in a chat. If it boxes out, pick a shorter face higher in the list.",
          ]).map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="seo-section seo-prose" aria-labelledby="meanings-heading">
        <h2 id="meanings-heading">
          {config.meaningsHeading ?? "When this mood fits"}
        </h2>
        <p>{config.meanings}</p>
      </section>

      <section className="seo-section seo-prose" aria-labelledby="mobile-heading">
        <h2 id="mobile-heading">On a phone</h2>
        <p>
          {config.mobileNote ??
            "Open this page in Safari or Chrome, tap a face, switch to the chat app, and paste. No keyboard pack is required—these are ordinary Unicode characters."}
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
              "Tap a face above, or open cute / cry / heart for a longer list.",
              "The clipboard gets ordinary text—no sticker pack.",
              "Paste in any app that accepts Unicode. If it boxes out, try a shorter face.",
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
          "Japanese text faces. Copy a mood, paste it in chat."
        }
      />

      <div className="tool-stage" id="tool">
        <p className="field-label">Popular faces — tap to copy</p>
        <KaomojiGrid faces={samples} />
      </div>

      <section className="seo-section" aria-labelledby="emotions-heading">
        <h2 id="emotions-heading">Start with a mood</h2>
        <p className="seo-lead">
          Cute, cry, and heart are the main lists. Lenny and shrug have their
          own pages because people search those faces by name.
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
          Kaomoji are Japanese emoticons built from Unicode characters. Unlike
          emoji stickers, they are plain text—so they paste into Discord,
          Instagram bios, TikTok captions, WhatsApp, and email. Bookmark this
          hub for “Japanese emoticons” in general. Open a mood list only when
          you already know the feeling.
        </p>
      </section>

      <section className="seo-section seo-prose" aria-labelledby="how-hub-heading">
        <h2 id="how-hub-heading">How to copy kaomoji</h2>
        <ol>
          <li>Tap a face above, or open cute / cry / heart if you want a longer list.</li>
          <li>The clipboard gets ordinary text—no sticker pack.</li>
          <li>Paste in any app that accepts Unicode. If it boxes out, try a shorter face.</li>
        </ol>
      </section>

      <section className="seo-section" aria-labelledby="lists-heading">
        <h2 id="lists-heading">Other moods (old links)</h2>
        <p className="seo-lead">
          Extra emotion URLs stay live so old bookmarks do not 404. Prefer this
          hub plus cute, cry, heart, Lenny, and shrug when you share a page.
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
