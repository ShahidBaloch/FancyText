import {
  CONTENT_UPDATED_AT,
  getLivePages,
  SITE_URL,
  type PageEntry,
} from "@/data/pages/registry";
import { kaomojiPathIsIndexable } from "@/data/kaomoji";
import { LETTERS, letterUrl } from "@/lib/fonts/cursive";

export { CONTENT_UPDATED_AT };

export type SitemapEntry = {
  url: string;
  /** YYYY-MM-DD from CONTENT_UPDATED_AT or PageEntry.updated. Omit if unknown. */
  lastModified?: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
};

const SITE_ORIGIN = safeOrigin(SITE_URL) ?? "https://fancifytext.com";
const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Honest W3C date (YYYY-MM-DD) for lastmod.
 * Never uses "now" / build time — fake daily lastmod creates GSC churn.
 * Returns undefined if the value cannot be parsed (omit lastmod instead).
 */
export function toSitemapLastmod(
  value: Date | string | undefined = CONTENT_UPDATED_AT,
): string | undefined {
  try {
    if (value instanceof Date) {
      if (Number.isNaN(value.getTime())) return undefined;
      return value.toISOString().slice(0, 10);
    }
    const raw = (value ?? CONTENT_UPDATED_AT).trim();
    if (!raw) return undefined;
    if (DATE_ONLY.test(raw)) return raw;
    const parsed = new Date(raw);
    if (Number.isNaN(parsed.getTime())) return undefined;
    return parsed.toISOString().slice(0, 10);
  } catch {
    return undefined;
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

function isIndexablePage(page: PageEntry): boolean {
  if (page.index === false) return false;
  if (!kaomojiPathIsIndexable(page.url)) return false;
  return true;
}

function entryFor(
  path: string,
  changeFrequency: SitemapEntry["changeFrequency"],
  priority: number,
  lastModified: string | undefined,
): SitemapEntry | null {
  const url = toAbsoluteUrl(path);
  if (!url) return null;
  return lastModified
    ? { url, lastModified, changeFrequency, priority }
    : { url, changeFrequency, priority };
}

function fallbackEntries(): SitemapEntry[] {
  return [
    {
      url: `${SITE_ORIGIN}/`,
      lastModified: toSitemapLastmod(CONTENT_UPDATED_AT),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

/**
 * Indexable URL set for /sitemap.xml.
 * Cursive letter spokes are included at lower priority than /cursive-text-generator/.
 * Thin kaomoji emotion tails stay live for old links but are noindex + omitted here.
 *
 * lastmod comes from PageEntry.updated or CONTENT_UPDATED_AT — never build time.
 * Bump CONTENT_UPDATED_AT only when intentionally publishing changes; after GSC
 * submit the site is meant for infrequent updates (monthly / quarterly / yearly).
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
        page.updated ?? CONTENT_UPDATED_AT,
      );
      const changeFrequency: SitemapEntry["changeFrequency"] = "monthly";
      const priority =
        page.url === "/"
          ? 1
          : page.url === "/about/" || page.url.startsWith("/guides/")
            ? 0.45
            : 0.85;
      push(entryFor(page.url, changeFrequency, priority, lastModified));
    }

    const letterLastmod = toSitemapLastmod(CONTENT_UPDATED_AT);
    for (const letter of LETTERS) {
      for (const letterCase of ["capital", "small"] as const) {
        push(
          entryFor(
            letterUrl(letter, letterCase),
            "monthly",
            0.55,
            letterLastmod,
          ),
        );
      }
    }

    const legalLastmod = toSitemapLastmod(CONTENT_UPDATED_AT);
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

/** Always-valid urlset. lastmod is omitted when we do not have an honest date. */
export function renderSitemapXml(entries: SitemapEntry[]): string {
  const urls = (entries.length > 0 ? entries : fallbackEntries())
    .map((entry) => {
      const lastmod = entry.lastModified
        ? `\n    <lastmod>${escapeXml(entry.lastModified)}</lastmod>`
        : "";
      return `  <url>
    <loc>${escapeXml(entry.url)}</loc>${lastmod}
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority.toFixed(entry.priority % 1 === 0 ? 1 : 2)}</priority>
  </url>`;
    })
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
  const letterLocs = locs.filter(
    (loc) => loc.includes("/cursive-capital-") || loc.includes("/cursive-small-"),
  );
  const expectedLetterCount = LETTERS.length * 2;
  if (letterLocs.length !== expectedLetterCount) {
    throw new Error(
      `sitemap must include ${expectedLetterCount} cursive letter URLs, found ${letterLocs.length}`,
    );
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
    "/hand-kaomojis/",
    "/star-kaomojis/",
    "/kaomoji-dot-art/",
    "/carrd-kaomojis/",
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
  const allowed = new Set<string>([CONTENT_UPDATED_AT]);
  for (const page of getLivePages()) {
    const honest = toSitemapLastmod(page.updated);
    if (honest) allowed.add(honest);
  }
  for (const lastmod of lastmods) {
    if (!DATE_ONLY.test(lastmod)) {
      throw new Error(`invalid lastmod (want YYYY-MM-DD): ${lastmod}`);
    }
    if (!allowed.has(lastmod)) {
      throw new Error(
        `unstable lastmod ${lastmod}: must be CONTENT_UPDATED_AT (${CONTENT_UPDATED_AT}) or a PageEntry.updated, never build time`,
      );
    }
  }
}
