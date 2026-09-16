import { BackToTool } from "@/components/seo/BackToTool";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FaqSection } from "@/components/seo/FaqSection";
import { FellowKeywords } from "@/components/seo/FellowKeywords";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { PageHero } from "@/components/seo/PageHero";
import { RelatedTools } from "@/components/seo/RelatedTools";
import { StyleSpokeTool } from "@/components/style/StyleSpokeTool";
import { SampleCopyList } from "@/components/tool/SampleCopyList";
import type { StyleSpokeConfig } from "@/data/style-spokes";
import { SITE_NAME, getPageByUrl, getTopicalRelated } from "@/data/pages/registry";

type StyleSpokeViewProps = {
  config: StyleSpokeConfig;
};

function capitalizeKeyword(kw: string): string {
  return kw.charAt(0).toUpperCase() + kw.slice(1);
}

export function StyleSpokeView({ config }: StyleSpokeViewProps) {
  const page = getPageByUrl(`/${config.slug}/`);
  const url = `/${config.slug}/`;
  const related = getTopicalRelated(url, 6);
  const h1 = page?.primaryKeyword
    ? capitalizeKeyword(page.primaryKeyword)
    : capitalizeKeyword(config.slug.replace(/-/g, " "));
  const shortName = h1.replace(/\s+generator$/i, "").trim() || h1;

  return (
    <div className="site-shell">
      {page ? (
        <PageJsonLd
          page={page}
          faq={config.faq}
          crumbName={h1}
          howTo={{ name: `How to use ${shortName.toLowerCase()}`, steps: config.howToSteps }}
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
        lead={page?.description ?? "Copy and paste Unicode fancy text instantly."}
      />

      <StyleSpokeTool
        config={config}
        placeholder={`Type ${shortName.toLowerCase()}…`}
      />

      {config.difference ? (
        <section className="seo-section seo-prose" aria-labelledby="diff-heading">
          <h2 id="diff-heading">{config.difference.heading}</h2>
          <p>{config.difference.body}</p>
        </section>
      ) : null}

      {!config.showGallery && config.variants?.length ? (
        <section className="seo-section seo-prose" aria-labelledby="variants-heading">
          <h2 id="variants-heading">Style variants</h2>
          <ul>
            {config.variants.map((v) => (
              <li key={v.styleId}>
                <strong>{v.name}</strong>
                {" — "}
                {v.blurb}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="seo-section" aria-labelledby="examples-heading">
        <h2 id="examples-heading">Examples for bios & nicknames</h2>
        <SampleCopyList samples={config.examples} styleId={config.styleId} />
      </section>

      <section className="seo-section seo-prose" aria-labelledby="how-heading">
        <h2 id="how-heading">How to use</h2>
        <ol>
          {config.howToSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="seo-section seo-prose" aria-labelledby="uses-heading">
        <h2 id="uses-heading">Where it works</h2>
        <ul>
          {config.uses.map((use) => (
            <li key={use}>{use}</li>
          ))}
        </ul>
      </section>

      <section className="seo-section seo-prose" aria-labelledby="compat-heading">
        <h2 id="compat-heading">Platform compatibility</h2>
        <ul>
          {config.compatibilityNotes.map((note) => (
            <li key={note}>{note}</li>
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
