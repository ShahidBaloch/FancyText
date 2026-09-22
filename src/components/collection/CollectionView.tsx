import Link from "next/link";
import { HelpSections } from "@/components/seo/HelpSections";
import { BackToTool } from "@/components/seo/BackToTool";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FaqSection } from "@/components/seo/FaqSection";
import { FellowKeywords } from "@/components/seo/FellowKeywords";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { PageHero } from "@/components/seo/PageHero";
import { RelatedTools } from "@/components/seo/RelatedTools";
import { StyleGallery } from "@/components/tool/StyleGallery";
import type { CollectionConfig } from "@/data/collections";
import { SITE_NAME, getPageByUrl, getTopicalRelated } from "@/data/pages/registry";
import { getSerpSpecimen } from "@/lib/seo/specimens";

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
  /** Long lists need filtering; a curated dozen is faster to just scroll. */
  const isLargeSet = config.styleIds.length === 0 || config.styleIds.length > 12;
  const galleryFirst = config.contentOrder === "gallery-first";

  const hubCardsSection =
    config.hubCards?.length ? (
      <section className="seo-section" aria-labelledby="hub-heading">
        <h2 id="hub-heading">{config.hubHeading ?? "Font collections"}</h2>
        {config.hubLead ? (
          <p className="seo-lead">{config.hubLead}</p>
        ) : (
          <p className="seo-lead">
            Start with a collection. Each card is a filtered page with its own
            job—not a second copy of the homepage gallery.
          </p>
        )}
        <ul className="use-grid">
          {config.hubCards.map((card) => (
            <li key={card.href}>
              <Link href={card.href} className="use-card">
                <span className="use-name">{card.title}</span>
                <span className="use-desc">{card.body}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    ) : null;

  const gallerySection = config.galleryHeading ? (
    <section className="seo-section" aria-labelledby="sample-heading">
      <h2 id="sample-heading">{config.galleryHeading}</h2>
      {config.galleryLead ? <p className="seo-lead">{config.galleryLead}</p> : null}
      <div className="tool-stage" id="tool">
        <StyleGallery
          initialText={config.initialText}
          styleIds={config.styleIds.length ? config.styleIds : undefined}
          presets={config.presets}
          inputLabel={`Preview ${h1.toLowerCase()}`}
          enableFavorites
          {...(isLargeSet
            ? { enableCategoryFilter: true, enableSearch: true }
            : {})}
        />
      </div>
    </section>
  ) : (
    <div className="tool-stage" id="tool">
      <StyleGallery
        initialText={config.initialText}
        styleIds={config.styleIds.length ? config.styleIds : undefined}
        presets={config.presets}
        inputLabel={`Preview ${h1.toLowerCase()}`}
        enableFavorites
        {...(isLargeSet
          ? { enableCategoryFilter: true, enableSearch: true }
          : {})}
      />
    </div>
  );

  return (
    <div className="site-shell">
      {page ? (
        <PageJsonLd
          page={page}
          faq={config.faq}
          crumbName={h1}
          howTo={{
            name: config.howToName ?? config.howToHeading ?? `How to copy ${h1.toLowerCase()}`,
            steps: config.howToSteps,
          }}
        />
      ) : null}

      <Breadcrumbs
        items={[
          { name: SITE_NAME, href: "/" },
          { name: h1 },
        ]}
      />

      <PageHero
        h1={h1}
        lead={page?.description ?? "Pick a collection of Unicode styles to copy."}
        specimenPath={getSerpSpecimen(url) ? url : undefined}
      />

      {/* AdSense: never place units between gallery input and the first Copy row. */}
      {galleryFirst ? (
        <>
          {gallerySection}
          {hubCardsSection}
        </>
      ) : (
        <>
          {hubCardsSection}
          {gallerySection}
        </>
      )}

      {config.taxonomy?.length ? (
        <section className="seo-section" aria-labelledby="taxonomy-heading">
          <h2 id="taxonomy-heading">{config.taxonomyHeading ?? "Browse by style"}</h2>
          <ul className="taxonomy-links">
            {config.taxonomy.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {config.difference ? (
        <section className="seo-section seo-prose" aria-labelledby="diff-heading">
          <h2 id="diff-heading">{config.difference.heading}</h2>
          <p>{config.difference.body}</p>
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
        <h2 id="how-heading">{config.howToHeading ?? `How to copy ${h1.toLowerCase()}`}</h2>
        <ol>
          {config.howToSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      {config.mobileHowTo ? (
        <section className="seo-section seo-prose" aria-labelledby="mobile-heading">
          <h2 id="mobile-heading">{config.mobileHeading ?? "On a phone"}</h2>
          <p>{config.mobileHowTo}</p>
        </section>
      ) : null}

      <section className="seo-section seo-prose" aria-labelledby="uses-heading">
        <h2 id="uses-heading">{config.usesHeading ?? "Where these fonts go"}</h2>
        <ul>
          {config.uses.map((use) => (
            <li key={use}>{use}</li>
          ))}
        </ul>
      </section>

      {config.extraSections?.length ? (
        <HelpSections sections={config.extraSections} />
      ) : null}

      {page ? (
        <FellowKeywords keywords={page.fellowKeywords} currentUrl={url} />
      ) : null}

      <BackToTool />
      <FaqSection items={config.faq} accordion />
      <RelatedTools pages={related} />
    </div>
  );
}
