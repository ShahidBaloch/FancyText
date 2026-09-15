import {
  JsonLd,
  articleJsonLd,
  breadcrumbJsonLd,
  faqPageJsonLd,
  howToJsonLd,
  webApplicationJsonLd,
  webPageJsonLd,
} from "@/components/seo/JsonLd";
import { SITE_NAME, SITE_URL, type PageEntry } from "@/data/pages/registry";

type CrumbItem = { name: string; url: string };

type PageJsonLdProps = {
  page: PageEntry;
  faq?: { question: string; answer: string }[];
  crumbName?: string;
  crumbs?: CrumbItem[];
  howTo?: { name: string; steps: string[] };
  /** tool = WebApplication (default); article = Article; page = WebPage */
  kind?: "tool" | "article" | "page";
  datePublished?: string;
  dateModified?: string;
};

export function PageJsonLd({
  page,
  faq,
  crumbName,
  crumbs,
  howTo,
  kind = "tool",
  datePublished,
  dateModified,
}: PageJsonLdProps) {
  const absoluteUrl = new URL(page.url, SITE_URL).toString();
  const name = crumbName ?? page.primaryKeyword;
  const displayName = page.title.split("|")[0].trim();
  const breadcrumbItems =
    crumbs ??
    [
      { name: SITE_NAME, url: new URL("/", SITE_URL).toString() },
      { name, url: absoluteUrl },
    ];

  const primary =
    kind === "article"
      ? articleJsonLd({
          headline: displayName,
          description: page.description,
          url: absoluteUrl,
          siteName: SITE_NAME,
          siteUrl: SITE_URL,
          datePublished,
          dateModified,
        })
      : kind === "page"
        ? webPageJsonLd({
            name: displayName,
            description: page.description,
            url: absoluteUrl,
            siteName: SITE_NAME,
            siteUrl: SITE_URL,
          })
        : webApplicationJsonLd({
            name: displayName,
            description: page.description,
            url: absoluteUrl,
          });

  return (
    <>
      <JsonLd data={primary} />
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
