import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FaqSection } from "@/components/seo/FaqSection";
import { FellowKeywords } from "@/components/seo/FellowKeywords";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { PageHero } from "@/components/seo/PageHero";
import { RelatedTools } from "@/components/seo/RelatedTools";
import { KaomojiGrid } from "@/components/kaomoji/KaomojiGrid";
import type { EmojiTopicConfig } from "@/data/emoji-topics";
import {
  SITE_NAME,
  getPageByUrl,
  getTopicalRelated,
} from "@/data/pages/registry";

type EmojiTopicViewProps = {
  config: EmojiTopicConfig;
};

export function EmojiTopicView({ config }: EmojiTopicViewProps) {
  const url = `/${config.slug}/`;
  const page = getPageByUrl(url);
  if (!page) return null;

  const related = getTopicalRelated(url, 6);
  const crumb = config.h1.replace(/ copy and paste$/i, "");

  return (
    <div className="site-shell">
      <PageJsonLd
        page={page}
        faq={config.faq}
        crumbName={crumb}
        howTo={{
          name: `How to ${page.primaryKeyword} copy and paste`,
          steps: [
            `Tap any ${page.primaryKeyword} in the grid below.`,
            "The emoji copies to your clipboard instantly.",
            "Paste into Instagram, Discord, TikTok, or chat.",
          ],
        }}
      />
      <Breadcrumbs
        items={[
          { name: SITE_NAME, href: "/" },
          { name: crumb },
        ]}
      />
      <PageHero h1={config.h1} lead={page.description} specimenPath={url} />

      <div className="tool-stage" id="tool">
        <p className="field-label">
          Picture emoji · tap to copy · not kaomoji text faces
        </p>
        <KaomojiGrid
          faces={config.emojis}
          idPrefix={config.slug}
          variant="emoji"
        />
      </div>

      {config.combos?.length ? (
        <section className="seo-section" aria-labelledby={`${config.slug}-combos`}>
          <h2 id={`${config.slug}-combos`}>Popular {crumb.toLowerCase()} combos</h2>
          <p className="seo-lead">
            Short stacks for bios. More mixed strings on{" "}
            <Link href="/emoji-combos/">emoji combos</Link>.
          </p>
          <KaomojiGrid
            faces={config.combos}
            idPrefix={`${config.slug}-combo`}
            variant="emoji"
          />
        </section>
      ) : null}

      <section
        className="seo-section seo-prose"
        aria-labelledby={config.prose.id}
      >
        <h2 id={config.prose.id}>{config.prose.heading}</h2>
        {config.prose.paragraphs.map((p) => (
          <p key={p.slice(0, 48)}>{p}</p>
        ))}
        <p>
          Text faces:{" "}
          <Link href={`/${config.kaomojiSlug}/`}>{config.kaomojiLinkLabel}</Link>
          . Color stacks: <Link href="/emoji-combos/">emoji combos</Link>.
          Symbol marks: <Link href="/cute-symbols/">cute symbols</Link>.
        </p>
      </section>

      <FellowKeywords keywords={page.fellowKeywords} currentUrl={url} />
      <FaqSection items={config.faq} accordion />
      <RelatedTools pages={related} />
    </div>
  );
}
