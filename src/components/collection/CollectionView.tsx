import Link from "next/link";
import { BackToTool } from "@/components/seo/BackToTool";
import { FaqSection } from "@/components/seo/FaqSection";
import { FellowKeywords } from "@/components/seo/FellowKeywords";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { PageHero } from "@/components/seo/PageHero";
import { RelatedTools } from "@/components/seo/RelatedTools";
import { StyleGallery } from "@/components/tool/StyleGallery";
import type { CollectionConfig } from "@/data/collections";
import { getPageByUrl, getTopicalRelated } from "@/data/pages/registry";

type CollectionViewProps = {
  config: CollectionConfig;
};

function capitalizeKeyword(kw: string): string {
  return kw.charAt(0).toUpperCase() + kw.slice(1);
}

export function CollectionView({ config }: CollectionViewProps) {
  const page = getPageByUrl(`/${config.slug}/`);
  const url = `/${config.slug}/`;
  const related = getTopicalRelated(url, 6);
  const h1 = page?.primaryKeyword
    ? capitalizeKeyword(page.primaryKeyword)
    : capitalizeKeyword(config.slug.replace(/-/g, " "));

  return (
    <div className="site-shell">
      {page ? <PageJsonLd page={page} faq={config.faq} crumbName={h1} /> : null}

      <PageHero
        h1={h1}
        lead={page?.description ?? "Browse fonts to copy and paste instantly."}
      />

      <div className="tool-stage" id="tool">
        <StyleGallery
          initialText={config.initialText}
          styleIds={config.styleIds.length ? config.styleIds : undefined}
          presets={config.presets}
          inputLabel={`Preview ${h1.toLowerCase()}`}
        />
      </div>

      {config.taxonomy?.length ? (
        <section className="seo-section" aria-labelledby="taxonomy-heading">
          <h2 id="taxonomy-heading">Browse by style</h2>
          <ul className="taxonomy-links">
            {config.taxonomy.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {config.buckets?.map((bucket, i) => (
        <section
          key={bucket.heading}
          className="seo-section seo-prose"
          aria-labelledby={`bucket-${i}`}
        >
          <h2 id={`bucket-${i}`}>{bucket.heading}</h2>
          <p>
            {bucket.body}{" "}
            {bucket.href ? <Link href={bucket.href}>Open this collection</Link> : null}
          </p>
        </section>
      ))}

      <section className="seo-section seo-prose" aria-labelledby="how-heading">
        <h2 id="how-heading">How to copy fonts</h2>
        <ol>
          {config.howToSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      {config.mobileHowTo ? (
        <section className="seo-section seo-prose" aria-labelledby="mobile-heading">
          <h2 id="mobile-heading">On mobile & desktop</h2>
          <p>{config.mobileHowTo}</p>
        </section>
      ) : null}

      <section className="seo-section seo-prose" aria-labelledby="uses-heading">
        <h2 id="uses-heading">Where to use these fonts</h2>
        <ul>
          {config.uses.map((use) => (
            <li key={use}>{use}</li>
          ))}
        </ul>
      </section>

      {page ? (
        <FellowKeywords keywords={page.fellowKeywords} currentUrl={url} />
      ) : null}

      <BackToTool />
      <FaqSection items={config.faq} accordion />
      <RelatedTools pages={related} />
    </div>
  );
}
