import {
  JsonLd,
  breadcrumbJsonLd,
  faqPageJsonLd,
  webApplicationJsonLd,
} from "@/components/seo/JsonLd";
import { SITE_NAME, SITE_URL, type PageEntry } from "@/data/pages/registry";

type PageJsonLdProps = {
  page: PageEntry;
  faq?: { question: string; answer: string }[];
  crumbName?: string;
};

export function PageJsonLd({ page, faq, crumbName }: PageJsonLdProps) {
  const absoluteUrl = new URL(page.url, SITE_URL).toString();
  const name = crumbName ?? page.primaryKeyword;

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
      <JsonLd
        data={breadcrumbJsonLd([
          { name: SITE_NAME, url: new URL("/", SITE_URL).toString() },
          { name, url: absoluteUrl },
        ])}
      />
    </>
  );
}
