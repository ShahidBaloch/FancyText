import {
  getLivePages,
  SITE_CONTENT_UPDATED,
  SITE_URL,
  type PageEntry,
} from "@/data/pages/registry";
import { kaomojiPathIsIndexable } from "@/data/kaomoji";

export type SitemapEntry = {
  url: string;
  lastModified: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
};

const SITE_ORIGIN = safeOrigin(SITE_URL) ?? "https://fancifytext.com";

/**
 * W3C Datetime date (YYYY-MM-DD) for lastmod.
 * Avoids millisecond ISO strings that some sitemap parsers reject.
 */
export function toSitemapLastmod(value: Date | string | undefined): string {
  const fallback = new Date().toISOString().slice(0, 10);
  try {
    const date =
      value instanceof Date
        ? value
        : value
          ? new Date(value)
          : SITE_CONTENT_UPDATED instanceof Date
            ? SITE_CONTENT_UPDATED
            : new Date(SITE_CONTENT_UPDATED);
    if (Number.isNaN(date.getTime())) return fallback;
    return date.toISOString().slice(0, 10);
  } catch {
    return fallback;
  }
}

function safeOrigin(raw: string): string | null {
  try {
    return new URL(raw).origin;
  } catch {
    return null;
  }
}

function toAbsoluteUrl(path: string): string | null {
  try {
    const url = new URL(path, `${SITE_ORIGIN}/`);
    if (url.origin !== SITE_ORIGIN) return null;
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

function isLetterPath(url: string): boolean {
  return (
    url.includes("/cursive-capital-") || url.includes("/cursive-small-")
  );
}

function isIndexablePage(page: PageEntry): boolean {
  if (page.index === false) return false;
  if (!kaomojiPathIsIndexable(page.url)) return false;
  if (isLetterPath(page.url)) return false;
  return true;
}

function entryFor(
  path: string,
  changeFrequency: SitemapEntry["changeFrequency"],
  priority: number,
  lastModified: string,
): SitemapEntry | null {
  const url = toAbsoluteUrl(path);
  if (!url) return null;
  return { url, lastModified, changeFrequency, priority };
}

function fallbackEntries(): SitemapEntry[] {
  return [
    {
      url: `${SITE_ORIGIN}/`,
      lastModified: toSitemapLastmod(SITE_CONTENT_UPDATED),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}

/**
 * Indexable URL set for /sitemap.xml.
 * Cursive letter pages and thin kaomoji emotion tails stay live for old links
 * but are noindex + omitted here (same pattern as the cursive hub).
 *
 * Optional per-page `updated` on PageEntry is used when present; otherwise
 * SITE_CONTENT_UPDATED.
 */
export function getSitemapEntries(): SitemapEntry[] {
  try {
    const seen = new Set<string>();
    const entries: SitemapEntry[] = [];

    const push = (entry: SitemapEntry | null) => {
      if (!entry || seen.has(entry.url)) return;
      seen.add(entry.url);
      entries.push(entry);
    };

    for (const page of getLivePages()) {
      if (!isIndexablePage(page)) continue;
      const lastModified = toSitemapLastmod(
        page.updated ?? SITE_CONTENT_UPDATED,
      );
      const changeFrequency: SitemapEntry["changeFrequency"] =
        page.url.startsWith("/guides/") ? "monthly" : "weekly";
      const priority =
        page.url === "/"
          ? 1
          : page.url === "/about/" || page.url.startsWith("/guides/")
            ? 0.45
            : 0.85;
      push(entryFor(page.url, changeFrequency, priority, lastModified));
    }

    const legalLastmod = toSitemapLastmod(SITE_CONTENT_UPDATED);
    for (const path of ["/privacy/", "/terms/"]) {
      push(entryFor(path, "yearly", 0.3, legalLastmod));
    }

    return entries.length > 0 ? entries : fallbackEntries();
  } catch {
    return fallbackEntries();
  }
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
  const urls = (entries.length > 0 ? entries : fallbackEntries())
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
  return renderSitemapXml(fallbackEntries());
}

/** Invariants for build-time checks. Throws if the URL set is unsafe to submit. */
export function assertSitemapInvariants(xml: string, entries: SitemapEntry[]): void {
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (locs.length === 0) {
    throw new Error("sitemap has no <loc> entries");
  }
  if (locs.length !== entries.length) {
    throw new Error(
      `sitemap loc count ${locs.length} !== entries ${entries.length}`,
    );
  }
  if (new Set(locs).size !== locs.length) {
    throw new Error("sitemap contains duplicate loc values");
  }
  if (!xml.startsWith("<?xml")) {
    throw new Error("sitemap missing XML declaration");
  }
  if (!xml.includes("<urlset")) {
    throw new Error("sitemap missing urlset");
  }
  if (!locs.includes(`${SITE_ORIGIN}/`)) {
    throw new Error("sitemap missing homepage");
  }
  const leakedLetters = locs.filter(
    (loc) => loc.includes("/cursive-capital-") || loc.includes("/cursive-small-"),
  );
  if (leakedLetters.length) {
    throw new Error(`sitemap includes noindex letter URLs: ${leakedLetters.join(", ")}`);
  }
  const leakedKaomoji = locs.filter((loc) => {
    try {
      const path = new URL(loc).pathname;
      return !kaomojiPathIsIndexable(path);
    } catch {
      return true;
    }
  });
  if (leakedKaomoji.length) {
    throw new Error(
      `sitemap includes noindex kaomoji tails: ${leakedKaomoji.join(", ")}`,
    );
  }
  const required = [
    "/kaomoji/",
    "/cute-kaomojis/",
    "/cry-kaomojis/",
    "/heart-kaomojis/",
    "/lenny-face/",
    "/shrug-emoticon/",
    "/privacy/",
    "/terms/",
  ];
  for (const path of required) {
    const abs = `${SITE_ORIGIN}${path}`;
    if (!locs.includes(abs)) {
      throw new Error(`sitemap missing required URL ${abs}`);
    }
  }
  const lastmods = [...xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map(
    (m) => m[1],
  );
  for (const lastmod of lastmods) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(lastmod)) {
      throw new Error(`invalid lastmod (want YYYY-MM-DD): ${lastmod}`);
    }
  }
}
