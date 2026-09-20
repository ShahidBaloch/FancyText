import Link from "next/link";
import { BackToTool } from "@/components/seo/BackToTool";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FaqSection } from "@/components/seo/FaqSection";
import { FellowKeywords } from "@/components/seo/FellowKeywords";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { PageHero } from "@/components/seo/PageHero";
import { RelatedTools } from "@/components/seo/RelatedTools";
import { KaomojiGrid } from "@/components/kaomoji/KaomojiGrid";
import { KaomojiMeaningTable } from "@/components/kaomoji/KaomojiMeaningTable";
import {
  ALL_KAOMOJI_PAGES,
  INDEXABLE_KAOMOJI_SLUGS,
  KAOMOJI_MEANINGS,
  SPECIAL_KAOMOJI,
  getHubFaces,
  getHubMoodCopySets,
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
    question: "Kaomoji or kaomojis — which is correct?",
    answer:
      "Both work in English. “Kaomoji” is the usual singular; “kaomojis” is the common plural when people want a list of faces. This page is the copy-and-paste hub for either search.",
  },
  {
    question: "Is it kamoji, kaemoji, or kao emoji?",
    answer:
      "The standard spelling is kaomoji (face + character). Kamoji, kaemoji, komoji, and “kao emoji” are frequent typos—same Japanese text faces, same tap-to-copy tool here.",
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
  {
    question: "Are there kaomoji GIFs?",
    answer:
      "Kaomoji are text, not GIFs. Discord and Instagram have their own GIF/sticker pickers if you want motion. Copy a face here when you need something that pastes into any chat, bio, or email.",
  },
  {
    question: "What does ¯\\_(ツ)_/¯ or ( ͡° ͜ʖ ͡°) mean?",
    answer:
      "¯\\_(ツ)_/¯ is the shrug: “I don’t know” or “whatever.” ( ͡° ͜ʖ ͡°) is Lenny face—knowing or suggestive. The meanings table above covers the faces people search by name.",
  },
  {
    question: "Can I put kaomoji in a Discord nickname?",
    answer:
      "Short faces often save. Long table-flips and stacked combining marks get rejected. Keep the @username plain and try a one-line face from the cute or heart lists.",
  },
  {
    question: "Do kaomoji work on Instagram and TikTok?",
    answer:
      "Yes in bios, captions, and comments. Usernames stay lowercase ASCII. Very long faces can hit the bio character limit—pick a shorter one.",
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

      {kaomojiPathIsIndexable(config.slug) ? (
        <p className="seo-lead">
          Canonical <strong>{config.primaryKeyword}</strong> list—every face for
          this mood lives here. The{" "}
          <Link href="/kaomoji/">kaomoji hub</Link> mixes moods for general
          kaomoji search; bookmark this URL when you only want {config.emotion}{" "}
          faces.
        </p>
      ) : (
        <p className="seo-lead">
          This emotion list stays available for old links and is not indexed in
          search. For general kaomoji, use the{" "}
          <Link href="/kaomoji/">kaomoji hub</Link>. Indexed mood pages:{" "}
          <Link href="/cute-kaomojis/">cute</Link>,{" "}
          <Link href="/cry-kaomojis/">cry</Link>,{" "}
          <Link href="/heart-kaomojis/">heart</Link>,{" "}
          <Link href="/lenny-face/">Lenny</Link>,{" "}
          <Link href="/shrug-emoticon/">shrug</Link>.
        </p>
      )}

      <div className="tool-stage" id="tool">
        <p className="field-label">
          {config.faces.length} faces — tap to copy
        </p>
        <KaomojiGrid faces={config.faces} idPrefix={config.slug} />
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

      <section className="seo-section seo-prose" aria-labelledby="paste-heading">
        <h2 id="paste-heading">Where these faces work</h2>
        <ul>
          <li>Discord messages and about-me: yes. Nicknames: keep to one short line.</li>
          <li>Instagram and TikTok bios, captions, and comments: yes. Usernames stay plain.</li>
          <li>WhatsApp chats, status, and group names: usually yes.</li>
          <li>
            Need a cute letter style instead of a face? Open{" "}
            <Link href="/cute-fonts/">kawaii fonts copy and paste</Link>.
          </li>
        </ul>
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
  const samples = getHubFaces(72);
  const moodCopySets = getHubMoodCopySets(12);

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
        <p className="field-label">
          {samples.length} popular faces — tap to copy
        </p>
        <KaomojiGrid faces={samples} idPrefix="hub" />
      </div>

      <section className="seo-section" aria-labelledby="emotions-heading">
        <h2 id="emotions-heading">Start with a mood</h2>
        <p className="seo-lead">
          Each card opens the indexed list for that mood (cute, cry, heart,
          Lenny, shrug). This hub is for general kaomoji search—do not duplicate
          those full lists here.
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

      {moodCopySets.map((set) => (
        <section
          key={set.slug}
          className="seo-section"
          aria-labelledby={`mood-copy-${set.slug}`}
        >
          <h2 id={`mood-copy-${set.slug}`}>{set.h1}</h2>
          <p className="seo-lead">
            Tap a face to copy it as plain text.{" "}
            <Link href={`/${set.slug}/`}>See the full {set.h1.toLowerCase()} list</Link>
            .
          </p>
          <KaomojiGrid faces={set.faces} idPrefix={set.slug} />
        </section>
      ))}

      <section className="seo-section seo-prose" aria-labelledby="what-heading">
        <h2 id="what-heading">What are kaomoji?</h2>
        <p>
          Kaomoji (kaomojis) are Japanese emoticons built from Unicode
          characters—also called text faces or Japanese emoticons. Unlike emoji
          stickers, they are plain text, so they paste into Discord, Instagram
          bios, TikTok captions, WhatsApp, and email. Bookmark this hub when
          you want many kaomoji in one place; open cute, cry, or heart when you
          already know the mood.
        </p>
        <p>
          The word is often typed as kamoji, kaemoji, kaoemoji, komoji, kaomojis,
          or “kao emoji.” The correct spelling is <strong>kaomoji</strong>, from
          顔 (kao, face) and 文字 (moji, character). Whichever spelling brought
          you here, the faces below are the same copy-and-paste text.
        </p>
      </section>

      <section className="seo-section" aria-labelledby="meanings-heading">
        <h2 id="meanings-heading">Famous kaomoji and what they mean</h2>
        <p className="seo-lead">
          The faces people look up by name. Tone matters more than the
          characters—a shrug softens a non-answer, a table flip is a joke.
        </p>
        <KaomojiMeaningTable rows={KAOMOJI_MEANINGS} />
      </section>

      <section className="seo-section seo-prose" aria-labelledby="where-heading">
        <h2 id="where-heading">Where kaomoji paste cleanly</h2>
        <p>
          Because they are ordinary characters, most chat apps keep them. Long
          table-flips and stacked combining marks fail first—especially in
          nicknames.
        </p>
        <ul>
          <li>
            <Link href="/discord-font-generator/">Discord</Link> messages and
            about-me: yes. Nicknames: keep to one short line. The @username
            stays plain.
          </li>
          <li>
            Instagram bios, captions, and comments: yes. The @handle cannot use
            them.
          </li>
          <li>TikTok bios and comments: yes, if they fit the short bio limit.</li>
          <li>WhatsApp chats, status, and group names: usually yes.</li>
          <li>
            Mix a face with{" "}
            <Link href="/cute-fonts/">cute kawaii fonts</Link> in a bio, but
            do not style the kaomoji itself—those characters are already the
            look.
          </li>
        </ul>
      </section>

      <section className="seo-section seo-prose" aria-labelledby="gifs-heading">
        <h2 id="gifs-heading">Kaomoji vs emoji vs GIFs</h2>
        <p>
          Kaomoji are punctuation faces such as (╯°□°)╯︵ ┻━┻. Emoji are picture
          characters from a phone’s emoji keyboard. GIFs and stickers are
          images. This page copies text only—so the face survives in email,
          code comments, and apps that block image stickers.
        </p>
        <p>
          Want motion? Use Discord’s GIF picker or Instagram stickers. Want a
          face that always pastes? Stay here.
        </p>
      </section>

      <section className="seo-section seo-prose" aria-labelledby="how-hub-heading">
        <h2 id="how-hub-heading">How to copy kaomoji</h2>
        <ol>
          <li>Tap a face above, or open cute / cry / heart if you want a longer list.</li>
          <li>The clipboard gets ordinary text—no sticker pack or font download.</li>
          <li>Switch to Discord, Instagram, TikTok, or WhatsApp and paste.</li>
          <li>If you see empty boxes, pick a shorter face higher in the list.</li>
        </ol>
        <p>
          On a phone, open this page in Safari or Chrome, tap a face, then
          long-press Paste in the chat app. No extra keyboard is required.
        </p>
      </section>

      <section className="seo-section" aria-labelledby="lists-heading">
        <h2 id="lists-heading">More mood lists</h2>
        <p className="seo-lead">
          Angry, cat, hug, and the rest stay live so you can browse a full
          emotion without mixing it into the hub. Cute, cry, heart, Lenny, and
          shrug are the lists worth sharing.
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
