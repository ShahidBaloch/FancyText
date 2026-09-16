import {
  getLivePages,
  SITE_CONTENT_UPDATED,
  SITE_URL,
} from "@/data/pages/registry";
import { kaomojiPathIsIndexable } from "@/data/kaomoji";

export type SitemapEntry = {
  url: string;
  lastModified: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
};

/**
 * Indexable URL set for /sitemap.xml.
 * Cursive letter pages and thin kaomoji emotion tails stay live for old links
 * but are noindex + omitted here (same pattern as the cursive hub).
 */
export function getSitemapEntries(): SitemapEntry[] {
  const lastModified =
    SITE_CONTENT_UPDATED instanceof Date
      ? SITE_CONTENT_UPDATED.toISOString()
      : new Date(SITE_CONTENT_UPDATED).toISOString();

  const pages = getLivePages()
    .filter((page) => page.index !== false)
    .filter((page) => kaomojiPathIsIndexable(page.url))
    .map((page) => ({
      url: new URL(page.url, SITE_URL).toString(),
      lastModified,
      changeFrequency: (page.url.startsWith("/guides/")
        ? "monthly"
        : "weekly") as "weekly" | "monthly",
      priority:
        page.url === "/"
          ? 1
          : page.url === "/about/" || page.url.startsWith("/guides/")
            ? 0.45
            : 0.85,
    }));

  const legal = ["/privacy/", "/terms/"].map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified,
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [...pages, ...legal];
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

/** Always-valid urlset. Callers should still try/catch and fall back. */
export function renderSitemapXml(entries: SitemapEntry[]): string {
  const urls = entries
    .map(
      (entry) => `  <url>
    <loc>${escapeXml(entry.url)}</loc>
    <lastmod>${escapeXml(entry.lastModified)}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority.toFixed(entry.priority % 1 === 0 ? 1 : 2)}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export function renderFallbackSitemapXml(): string {
  return renderSitemapXml([
    {
      url: new URL("/", SITE_URL).toString(),
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ]);
}
