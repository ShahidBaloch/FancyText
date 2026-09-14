import {
  JsonLd,
  breadcrumbJsonLd,
  faqPageJsonLd,
  howToJsonLd,
  webApplicationJsonLd,
} from "@/components/seo/JsonLd";
import { SITE_NAME, SITE_URL, type PageEntry } from "@/data/pages/registry";

type CrumbItem = { name: string; url: string };

type PageJsonLdProps = {
  page: PageEntry;
  faq?: { question: string; answer: string }[];
  crumbName?: string;
  crumbs?: CrumbItem[];
  howTo?: { name: string; steps: string[] };
};

export function PageJsonLd({
  page,
  faq,
  crumbName,
  crumbs,
  howTo,
}: PageJsonLdProps) {
  const absoluteUrl = new URL(page.url, SITE_URL).toString();
  const name = crumbName ?? page.primaryKeyword;
  const breadcrumbItems =
    crumbs ??
    [
      { name: SITE_NAME, url: new URL("/", SITE_URL).toString() },
      { name, url: absoluteUrl },
    ];

  return (
    <>
      <JsonLd
        data={webApplicationJsonLd({
          name: page.title.split("|")[0].trim(),
          description: page.description,
          url: absoluteUrl,
        })}
      />
      {faq?.length ? <JsonLd data={faqPageJsonLd(absoluteUrl, faq)} /> : null}
      {howTo?.steps.length ? (
        <JsonLd
          data={howToJsonLd({
            name: howTo.name,
            description: page.description,
            url: absoluteUrl,
            steps: howTo.steps,
          })}
        />
      ) : null}
      <JsonLd data={breadcrumbJsonLd(breadcrumbItems)} />
    </>
  );
}
