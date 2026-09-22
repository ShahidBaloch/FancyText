import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FaqSection } from "@/components/seo/FaqSection";
import { FellowKeywords } from "@/components/seo/FellowKeywords";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { PageHero } from "@/components/seo/PageHero";
import { RelatedTools } from "@/components/seo/RelatedTools";
import { KaomojiGrid } from "@/components/kaomoji/KaomojiGrid";
import {
  TEXT_ART_FAQ,
  TEXT_ART_PIECES,
  TEXT_ART_PROSE,
} from "@/data/text-art";
import {
  SITE_NAME,
  getPageByUrl,
  getTopicalRelated,
} from "@/data/pages/registry";

const page = getPageByUrl("/text-art/")!;
const related = getTopicalRelated("/text-art/", 6);
const artLines = TEXT_ART_PIECES.map((p) => p.art);

export function TextArtView() {
  return (
    <div className="site-shell">
      <PageJsonLd
        page={page}
        faq={TEXT_ART_FAQ}
        crumbName="Text art"
        howTo={{
          name: "How to copy text art",
          steps: [
            "Scroll to a face, divider, or mini scene.",
            "Tap the row to copy plain characters.",
            "Paste into Discord, chat, or a bio—use a monospace field if lines must stay aligned.",
          ],
        }}
      />
      <Breadcrumbs
        items={[
          { name: SITE_NAME, href: "/" },
          { name: "Text art" },
        ]}
      />
      <PageHero
        h1="Text art copy and paste"
        lead={page.description}
        specimenPath="/text-art/"
      />

      <div className="tool-stage" id="tool">
        <p className="field-label">
          {TEXT_ART_PIECES.length} curated pieces · tap to copy
        </p>
        <KaomojiGrid
          faces={artLines}
          idPrefix="text-art"
          variant="text-art"
        />
      </div>

      <section
        className="seo-section seo-prose"
        aria-labelledby={TEXT_ART_PROSE.id}
      >
        <h2 id={TEXT_ART_PROSE.id}>{TEXT_ART_PROSE.heading}</h2>
        {TEXT_ART_PROSE.paragraphs.map((p) => (
          <p key={p.slice(0, 48)}>{p}</p>
        ))}
        <p>
          Need a mood-sorted face list? Open{" "}
          <Link href="/kaomoji/">kaomoji copy paste</Link>. Need huge letters?{" "}
          <Link href="/big-text-generator/">big text generator</Link>.
        </p>
      </section>

      <FellowKeywords keywords={page.fellowKeywords} currentUrl="/text-art/" />
      <FaqSection items={TEXT_ART_FAQ} accordion />
      <RelatedTools pages={related} />
    </div>
  );
}
