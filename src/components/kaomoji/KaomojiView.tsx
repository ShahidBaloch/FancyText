import Link from "next/link";
import { BackToTool } from "@/components/seo/BackToTool";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FaqSection } from "@/components/seo/FaqSection";
import { FellowKeywords } from "@/components/seo/FellowKeywords";
import { JsonLd, itemListJsonLd } from "@/components/seo/JsonLd";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { PageHero } from "@/components/seo/PageHero";
import { RelatedTools } from "@/components/seo/RelatedTools";
import { KaomojiGrid } from "@/components/kaomoji/KaomojiGrid";
import { KaomojiMeaningTable } from "@/components/kaomoji/KaomojiMeaningTable";
import { KaomojiSituationTable } from "@/components/kaomoji/KaomojiSituationTable";
import {
  ALL_KAOMOJI_PAGES,
  INDEXABLE_KAOMOJI_SLUGS,
  KAOMOJI_HUB,
  KAOMOJI_HUB_AESTHETIC_SAMPLES,
  KAOMOJI_MEANINGS,
  getKaomojiHubSerp,
  type KaomojiHubSlug,
  SPECIAL_KAOMOJI,
  getHubFaces,
  getHubMoodCopySets,
  getHubShowcase,
  getKaomojiCatalogStats,
  getKaomojiList,
  getTailKaomojiLists,
  kaomojiPathIsIndexable,
  POPULAR_CHAT_EMOJI,
  type KaomojiList,
  type KaomojiProseSection,
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

function KaomojiProseSections({ sections }: { sections: KaomojiProseSection[] }) {
  return (
    <>
      {sections.map((section) => (
        <section
          key={section.id}
          className="seo-section seo-prose"
          aria-labelledby={`${section.id}-heading`}
        >
          <h2 id={`${section.id}-heading`}>{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
          {section.bullets?.length ? (
            <ul>
              {section.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </>
  );
}

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
          page={{ ...page, title: config.title, description: config.description }}
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

      {config.canonicalLead ? (
        <p className="seo-lead">{config.canonicalLead}</p>
      ) : kaomojiPathIsIndexable(config.slug) ? (
        <p className="seo-lead">
          Full <strong>{config.primaryKeyword}</strong> list for this mood. The{" "}
          <Link href="/kaomoji/">kaomoji hub</Link> mixes many emotions; bookmark
          this page when you only want {config.emotion} faces.
        </p>
      ) : (
        <p className="seo-lead">
          This emotion list stays available for old links and is not indexed in
          search. For general kaomoji, use the{" "}
          <Link href="/kaomoji/">kaomoji hub</Link>. Indexed pages:{" "}
          {[...INDEXABLE_KAOMOJI_SLUGS]
            .map((slug) => getKaomojiList(slug))
            .filter((k): k is KaomojiList => Boolean(k))
            .map((k, i) => (
              <span key={k.slug}>
                {i > 0 ? ", " : null}
                <Link href={`/${k.slug}/`}>
                  {k.emotion === "lenny" || k.emotion === "shrug"
                    ? k.h1
                    : k.emotion}
                </Link>
              </span>
            ))}
          .
        </p>
      )}

      <p className="seo-lead">
        <Link href="#tool">Jump to faces</Link> · {config.faces.length} in this
        list · tap any row to copy plain text
      </p>

      <div className="tool-stage" id="tool">
        <p className="field-label">
          {config.faces.length} {config.emotion} kaomoji — tap to copy
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

      {config.extraSections?.length ? (
        <KaomojiProseSections sections={config.extraSections} />
      ) : null}

      <section className="seo-section seo-prose" aria-labelledby="mobile-heading">
        <h2 id="mobile-heading">On a phone</h2>
        <p>
          {config.mobileNote ??
            "Open this page in Safari or Chrome, tap a face, switch to the chat app, and paste. No keyboard pack is required—these are ordinary Unicode characters."}
        </p>
      </section>

      {config.whereBullets?.length ? (
        <section className="seo-section seo-prose" aria-labelledby="paste-heading">
          <h2 id="paste-heading">
            {config.whereHeading ?? "Where these faces work"}
          </h2>
          <ul>
            {config.whereBullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : (
        <section className="seo-section seo-prose" aria-labelledby="paste-heading">
          <h2 id="paste-heading">Where {config.emotion} kaomoji paste</h2>
          <p>
            These are plain Unicode characters—paste into Discord, Instagram,
            TikTok, or WhatsApp like ordinary text. Usernames and @handles stay
            ASCII; put faces in bios, captions, and messages instead.
          </p>
        </section>
      )}

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

type KaomojiHubViewProps = {
  hubSlug?: KaomojiHubSlug;
};

export function KaomojiHubView({ hubSlug = "kaomoji" }: KaomojiHubViewProps) {
  const serp = getKaomojiHubSerp(hubSlug);
  const hubUrl = `/${hubSlug}/`;
  const page = getPageByUrl(hubUrl);
  const related = getTopicalRelated(hubUrl, 6);
  const showcase = getHubShowcase();
  const featuredShowcase = showcase.filter((item) =>
    INDEXABLE_KAOMOJI_SLUGS.has(item.href.replace(/^\/|\/$/g, "")),
  );
  const tailLists = getTailKaomojiLists();
  const catalog = getKaomojiCatalogStats();
  const samples = getHubFaces(96);
  const moodCopySets = getHubMoodCopySets(8);
  const hubFaq = [
    ...(serp.leadFaq ? [serp.leadFaq] : []),
    ...KAOMOJI_HUB.faq,
  ];
  const absoluteHubUrl = new URL(hubUrl, SITE_URL).toString();
  const itemListFaces = samples.slice(0, 12);

  return (
    <div className="site-shell">
      {page ? (
        <PageJsonLd
          page={{
            ...page,
            url: hubSlug === "kaomoji" ? page.url : "/kaomoji/",
            title: serp.title,
            description: serp.description,
          }}
          faq={hubSlug === "kaomoji" ? hubFaq : hubFaq.slice(0, 6)}
          crumbName={serp.h1}
          howTo={{
            name: `How to ${serp.primaryKeyword} copy paste`,
            steps: [
              "Tap a face in the grid—it copies as plain text instantly.",
              "Open Discord, Instagram, TikTok, or chat and paste.",
              "If characters box out, pick a shorter face higher in the list.",
            ],
          }}
        />
      ) : null}
      {itemListFaces.length ? (
        <JsonLd
          data={itemListJsonLd({
            name: `${serp.primaryKeyword} copy paste list`,
            url: absoluteHubUrl,
            items: itemListFaces,
          })}
        />
      ) : null}

      <Breadcrumbs
        items={[
          { name: SITE_NAME, href: "/" },
          { name: serp.breadcrumbLabel },
        ]}
      />

      <PageHero h1={serp.h1} lead={serp.heroLead} />

      {hubSlug !== "kaomoji" ? (
        <p className="seo-lead" role="note">
          <strong>Main search page:</strong>{" "}
          <Link href="/kaomoji/">Kaomoji copy paste</Link> — same{" "}
          {catalog.uniqueFaces}+ text faces, one indexed hub (this URL is a
          spelling helper, not a duplicate listing).
        </p>
      ) : null}

      <p className="seo-lead">
        <Link href="#tool">Jump to copy grid</Link> · {catalog.uniqueFaces}{" "}
        unique text faces across {catalog.listCount} mood lists · Free · No
        signup
      </p>

      <div className="tool-stage" id="tool">
        <p className="field-label">
          {samples.length} kaomoji on this page · {catalog.uniqueFaces} total in
          the library — tap to copy
        </p>
        <KaomojiGrid faces={samples} idPrefix="hub" />
      </div>

      <section className="seo-section" aria-labelledby="emoji-picker-heading">
        <h2 id="emoji-picker-heading">Popular emoji (picture characters)</h2>
        <p className="seo-lead">
          Not the same as kaomoji—these are standard emoji. Tap to copy, then
          paste like any other character.
        </p>
        <KaomojiGrid
          faces={POPULAR_CHAT_EMOJI}
          idPrefix="emoji"
          variant="emoji"
        />
        <p className="seo-prose">
          Need stars, hearts, or arrows without a face? See{" "}
          <Link href="/cool-symbols/">cool symbols copy and paste</Link>.
        </p>
      </section>

      <p className="seo-lead">{serp.introBelowHero}</p>

      <section
        className="seo-section seo-prose"
        aria-labelledby="spelling-heading"
      >
        <h2 id="spelling-heading">Kamoji, kaomiji, and other typos</h2>
        <p>
          People often type <strong>kaomoji</strong> with a missing letter or
          swapped vowel. The correct spelling is kaomoji (Japanese 顔文字).
          Whatever you typed, the faces are the same tap-to-copy text:
        </p>
        <ul>
          {KAOMOJI_HUB.commonMisspellings.map((row) => (
            <li key={row.typo}>
              <strong>{row.typo}</strong> — {row.note}
            </li>
          ))}
        </ul>
        <p>
          Spelling helpers (same tool,{" "}
          <Link href="/kaomoji/">canonical kaomoji page</Link>):{" "}
          <Link href="/kamoji/">kamoji</Link> ·{" "}
          <Link href="/kaomojis/">kaomojis</Link>
        </p>
      </section>

      <section
        className="seo-section"
        aria-labelledby="aesthetic-samples-heading"
      >
        <h2 id="aesthetic-samples-heading">Bio dividers &amp; layout strings</h2>
        <p className="seo-lead">
          Tap a sample line to copy. Full Carrd-style dividers and star strings
          live on their own pages so this hub stays a general kaomoji grid—not a
          duplicate layout gallery.
        </p>
        <KaomojiGrid
          faces={KAOMOJI_HUB_AESTHETIC_SAMPLES.map((row) => row.line)}
          idPrefix="aesthetic-sample"
        />
        <ul className="taxonomy-links">
          {KAOMOJI_HUB_AESTHETIC_SAMPLES.map((row) => (
            <li key={`${row.href}-${row.label}`}>
              <Link href={row.href}>{row.label}</Link>
            </li>
          ))}
        </ul>
        <p className="seo-prose">
          Styled words:{" "}
          <Link href="/aesthetic-fonts/">aesthetic fonts</Link> · lone symbols:{" "}
          <Link href="/cool-symbols/">cool symbols</Link> · bio ideas:{" "}
          <Link href="/social-media-bio-generator/">social media bio generator</Link>
        </p>
      </section>

      <section className="seo-section" aria-labelledby="emotions-heading">
        <h2 id="emotions-heading">Start with a mood or topic</h2>
        <p className="seo-lead">
          Cards open indexed lists only (cute, cry, heart, hand, star, Carrd,
          dot art, Lenny, shrug). This hub shows a mixed sample—not the full
          inventory for each topic.
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

      <section className="seo-section" aria-labelledby="situations-heading">
        <h2 id="situations-heading">Pick a kaomoji by situation</h2>
        <p className="seo-lead">
          Not sure which mood list to open? Copy a proven face for Discord bios,
          apologies, love notes, shrugs, and more—then jump to the full list if
          you want variants.
        </p>
        <KaomojiSituationTable rows={KAOMOJI_HUB.situations} />
      </section>

      <section
        className="seo-section seo-prose"
        aria-labelledby={`hub-${KAOMOJI_HUB.editorial.id}-heading`}
      >
        <h2 id={`hub-${KAOMOJI_HUB.editorial.id}-heading`}>
          {KAOMOJI_HUB.editorial.heading}
        </h2>
        {KAOMOJI_HUB.editorial.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
        <p>
          Details: <Link href="/privacy/">Privacy</Link> ·{" "}
          <Link href="/terms/">Terms</Link>
        </p>
      </section>

      {KAOMOJI_HUB.sections.map((section) => (
        <section
          key={section.id}
          className="seo-section seo-prose"
          aria-labelledby={`hub-${section.id}-heading`}
        >
          <h2 id={`hub-${section.id}-heading`}>{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
          {section.bullets?.length ? (
            <ul>
              {section.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}

      {moodCopySets.map((set) => (
        <section
          key={set.slug}
          className="seo-section"
          aria-labelledby={`mood-copy-${set.slug}`}
        >
          <h2 id={`mood-copy-${set.slug}`}>{set.h1}</h2>
          <p className="seo-lead">
            {KAOMOJI_HUB.moodPreviewLeads[set.slug] ??
              "Sample faces from this mood—tap to copy as plain text."}{" "}
            <Link href={`/${set.slug}/`}>
              Open the full {set.h1.toLowerCase()} list
            </Link>
            .
          </p>
          <KaomojiGrid faces={set.faces} idPrefix={set.slug} />
        </section>
      ))}

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
        <FellowKeywords keywords={page.fellowKeywords} currentUrl={hubUrl} />
      ) : null}

      <BackToTool />
      <FaqSection items={hubFaq} accordion />
      <RelatedTools pages={related} />
    </div>
  );
}
