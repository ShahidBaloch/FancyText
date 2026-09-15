import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import {
  JsonLd,
  breadcrumbJsonLd,
  webPageJsonLd,
} from "@/components/seo/JsonLd";
import { PageHero } from "@/components/seo/PageHero";
import { ToolSearch } from "@/components/tool/ToolSearch";
import { SITE_NAME, SITE_URL, getPageByUrl } from "@/data/pages/registry";
import { pageMetadata } from "@/lib/seo/metadata";

const page = getPageByUrl("/search/")!;
const absoluteUrl = new URL("/search/", SITE_URL).toString();

export const metadata: Metadata = pageMetadata(page);

type Props = {
  searchParams: Promise<{ q?: string | string[] }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const raw = params.q;
  const initialQuery = Array.isArray(raw) ? (raw[0] ?? "") : (raw ?? "");

  return (
    <div className="site-shell">
      <JsonLd
        data={webPageJsonLd({
          name: "Search FancifyText tools",
          description: page.description,
          url: absoluteUrl,
          siteName: SITE_NAME,
          siteUrl: SITE_URL,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: SITE_NAME, url: new URL("/", SITE_URL).toString() },
          { name: "Search", url: absoluteUrl },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: SITE_NAME, href: "/" },
          { name: "Search" },
        ]}
      />
      <PageHero
        h1="Search fancy text tools"
        lead="Find a generator by keyword—styles, platforms, kaomoji, and guides."
      />
      <section className="seo-section">
        <ToolSearch initialQuery={initialQuery} />
      </section>
    </div>
  );
}
