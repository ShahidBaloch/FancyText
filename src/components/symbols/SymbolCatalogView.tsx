import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FaqSection } from "@/components/seo/FaqSection";
import { FellowKeywords } from "@/components/seo/FellowKeywords";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { PageHero } from "@/components/seo/PageHero";
import { RelatedTools } from "@/components/seo/RelatedTools";
import { SymbolGrid } from "@/components/tool/SymbolGrid";
import type { SymbolCategory } from "@/data/symbols";
import type { PageEntry } from "@/data/pages/registry";
import { SITE_NAME, getTopicalRelated } from "@/data/pages/registry";

type ProseBlock = {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

type SymbolCatalogViewProps = {
  page: PageEntry;
  h1: string;
  categories: SymbolCategory[];
  faq: { question: string; answer: string }[];
  prose?: ProseBlock;
  howToSteps: string[];
  crumbLabel: string;
};

export function SymbolCatalogView({
  page,
  h1,
  categories,
  faq,
  prose,
  howToSteps,
  crumbLabel,
}: SymbolCatalogViewProps) {
  const related = getTopicalRelated(page.url, 6);

  return (
    <div className="site-shell">
      <PageJsonLd
        page={page}
        faq={faq}
        crumbName={crumbLabel}
        howTo={{
          name: `How to ${page.primaryKeyword} copy and paste`,
          steps: howToSteps,
        }}
      />
      <Breadcrumbs
        items={[
          { name: SITE_NAME, href: "/" },
          { name: crumbLabel },
        ]}
      />
      <PageHero h1={h1} lead={page.description} specimenPath={page.url} />

      {categories.map((category) => (
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

      {prose ? (
        <section
          className="seo-section seo-prose"
          aria-labelledby={prose.id}
        >
          <h2 id={prose.id}>{prose.heading}</h2>
          {prose.paragraphs.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
          {prose.bullets?.length ? (
            <ul>
              {prose.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ) : null}

      <section className="seo-section seo-prose" aria-labelledby="symbols-related">
        <h2 id="symbols-related">Related copy-paste tools</h2>
        <p>
          Letter fonts:{" "}
          <Link href="/copy-paste-fonts/">copy and paste fonts</Link>. Text
          faces: <Link href="/kaomoji/">kaomoji</Link>. Color stacks:{" "}
          <Link href="/emoji-combos/">emoji combos</Link>.
        </p>
      </section>

      <FellowKeywords keywords={page.fellowKeywords} currentUrl={page.url} />
      <FaqSection items={faq} accordion />
      <RelatedTools pages={related} />
    </div>
  );
}
