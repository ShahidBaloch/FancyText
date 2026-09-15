import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FaqSection } from "@/components/seo/FaqSection";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { PageHero } from "@/components/seo/PageHero";
import { RelatedTools } from "@/components/seo/RelatedTools";
import type { GuideConfig } from "@/data/guides";
import {
  SITE_NAME,
  SITE_URL,
  getPageByUrl,
  getTopicalRelated,
} from "@/data/pages/registry";

type GuideViewProps = {
  config: GuideConfig;
};

export function GuideView({ config }: GuideViewProps) {
  const url = `/guides/${config.slug}/`;
  const page = getPageByUrl(url);
  const related = getTopicalRelated(url, 6);
  const absoluteUrl = new URL(url, SITE_URL).toString();

  return (
    <div className="site-shell">
      {page ? (
        <PageJsonLd
          page={page}
          kind="article"
          faq={config.faq}
          crumbName={config.h1}
          datePublished={config.datePublished}
          dateModified={config.dateModified}
          crumbs={[
            { name: SITE_NAME, url: new URL("/", SITE_URL).toString() },
            { name: config.h1, url: absoluteUrl },
          ]}
          howTo={{ name: config.h1, steps: config.howToSteps }}
        />
      ) : null}

      <Breadcrumbs
        items={[
          { name: SITE_NAME, href: "/" },
          { name: config.h1 },
        ]}
      />

      <PageHero h1={config.h1} lead={page?.description ?? ""} />

      <section className="seo-section seo-prose" aria-labelledby="how-heading">
        <h2 id="how-heading">Quick steps</h2>
        <ol>
          {config.howToSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      {config.sections.map((section, index) => (
        <section
          key={section.heading}
          className="seo-section seo-prose"
          aria-labelledby={`guide-${index}`}
        >
          <h2 id={`guide-${index}`}>{section.heading}</h2>
          {section.body.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </section>
      ))}

      <FaqSection items={config.faq} accordion />
      <RelatedTools pages={related} />
    </div>
  );
}
