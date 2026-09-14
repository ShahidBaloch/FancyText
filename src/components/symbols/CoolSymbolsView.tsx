import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FaqSection } from "@/components/seo/FaqSection";
import { FellowKeywords } from "@/components/seo/FellowKeywords";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { PageHero } from "@/components/seo/PageHero";
import { RelatedTools } from "@/components/seo/RelatedTools";
import { SymbolGrid } from "@/components/tool/SymbolGrid";
import { SYMBOL_CATEGORIES, SYMBOL_FAQ } from "@/data/symbols";
import {
  SITE_NAME,
  getPageByUrl,
  getTopicalRelated,
} from "@/data/pages/registry";

const page = getPageByUrl("/cool-symbols/")!;
const related = getTopicalRelated("/cool-symbols/", 6);

export function CoolSymbolsView() {
  return (
    <div className="site-shell">
      <PageJsonLd
        page={page}
        faq={SYMBOL_FAQ}
        crumbName="Cool symbols"
        howTo={{
          name: "How to copy cool symbols",
          steps: [
            "Open a category (stars, arrows, hearts, checks).",
            "Tap a symbol to copy it.",
            "Paste into a bio, caption, or chat. Keep letter fonts on the copy-and-paste gallery.",
          ],
        }}
      />
      <Breadcrumbs
        items={[
          { name: SITE_NAME, href: "/" },
          { name: "Cool symbols" },
        ]}
      />
      <PageHero
        h1="Cool symbols copy and paste"
        lead={page.description}
      />

      {SYMBOL_CATEGORIES.map((category) => (
        <section
          key={category.id}
          className="seo-section"
          aria-labelledby={`sym-${category.id}`}
        >
          <h2 id={`sym-${category.id}`}>{category.heading}</h2>
          <p className="seo-lead">{category.blurb}</p>
          <SymbolGrid category={category} />
        </section>
      ))}

      <section className="seo-section seo-prose" aria-labelledby="symbols-vs-fonts">
        <h2 id="symbols-vs-fonts">Symbols vs fancy fonts vs kaomoji</h2>
        <p>
          This page is a list of marks. It does not restyle the alphabet. If you
          want bold or cursive letters, open the{" "}
          <Link href="/copy-paste-fonts/">copy and paste fonts</Link> gallery. If
          you want Japanese text faces, use{" "}
          <Link href="/kaomoji/">kaomoji</Link>. If you want a name with a frame
          around it, use the <Link href="/text-decorator/">text decorator</Link>.
        </p>
      </section>

      <FellowKeywords keywords={page.fellowKeywords} currentUrl="/cool-symbols/" />
      <FaqSection items={SYMBOL_FAQ} accordion />
      <RelatedTools pages={related} />
    </div>
  );
}
