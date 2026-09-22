import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import {
  JsonLd,
  breadcrumbJsonLd,
  webPageJsonLd,
} from "@/components/seo/JsonLd";
import { PageHero } from "@/components/seo/PageHero";
import { ToolSearch, type SearchEntry } from "@/components/tool/ToolSearch";
import { getKaomojiSearchIntentsForUrl } from "@/data/kaomoji-search-intent";
import {
  SITE_NAME,
  SITE_URL,
  getLivePages,
  getPageByUrl,
} from "@/data/pages/registry";
import { pageMetadata } from "@/lib/seo/metadata";

const page = getPageByUrl("/search/")!;
const absoluteUrl = new URL("/search/", SITE_URL).toString();

const SEARCH_ENTRIES: SearchEntry[] = getLivePages().map((entry) => ({
  href: entry.url,
  label: entry.navLabel ?? entry.primaryKeyword,
  description: entry.description,
  haystack: [
    entry.primaryKeyword,
    entry.title,
    entry.description,
    ...entry.fellowKeywords,
    ...getKaomojiSearchIntentsForUrl(entry.url),
    entry.url,
  ]
    .join(" ")
    .toLowerCase(),
  featured: entry.group !== "H_Trust",
}));

type Props = {
  searchParams: Promise<{ q?: string | string[] }>;
};

function readQuery(raw: string | string[] | undefined): string {
  return (Array.isArray(raw) ? (raw[0] ?? "") : (raw ?? "")).trim();
}

/**
 * The bare index is worth indexing; `?q=` permutations are infinite thin
 * variants of it, so they are noindexed and canonicalised back to the index.
 */
export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const base = pageMetadata(page);
  if (!readQuery((await searchParams).q)) return base;
  return { ...base, robots: { index: false, follow: true } };
}

export default async function SearchPage({ searchParams }: Props) {
  const initialQuery = readQuery((await searchParams).q);

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
        <ToolSearch entries={SEARCH_ENTRIES} initialQuery={initialQuery} />
      </section>
    </div>
  );
}
