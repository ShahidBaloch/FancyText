import {
  getSitemapEntries,
  renderFallbackSitemapXml,
  renderSitemapXml,
} from "@/lib/seo/sitemap-xml";

/**
 * Custom sitemap route (not MetadataRoute.sitemap).
 *
 * Production /sitemap.xml returned HTTP 500 for some fetchers (WebFetch and
 * similar) while curl still received valid XML. Next.js' metadata sitemap
 * helper can 500 during serialization or a cache-miss regenerate. This handler
 * is force-static, builds XML ourselves, and always returns 200.
 *
 * Still omitted: noindex cursive letter URLs and noindex kaomoji emotion tails.
 */
export const dynamic = "force-static";
export const revalidate = 3600;

const XML_HEADERS = {
  "Content-Type": "application/xml; charset=utf-8",
  "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
};

export function GET() {
  try {
    const xml = renderSitemapXml(getSitemapEntries());
    return new Response(xml, { status: 200, headers: XML_HEADERS });
  } catch {
    return new Response(renderFallbackSitemapXml(), {
      status: 200,
      headers: XML_HEADERS,
    });
  }
}
