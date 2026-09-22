/**
 * Google Search Console–oriented HTTP smoke tests.
 *
 * Validates live HTML signals Google uses for indexing: robots.txt, sitemap
 * reachability, canonical + robots meta on sitemap URLs, noindex on browse
 * tails and infinite search permutations, and GSC site-verification tag.
 *
 * Run after: npm run build && npm run start
 *   node scripts/check-gsc.mjs
 *
 * Optional: GSC_BASE=https://fancifytext.com node scripts/check-gsc.mjs
 */
import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import esbuild from "esbuild";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const PORT = process.env.PORT ?? "3000";
const BASE = (process.env.GSC_BASE ?? `http://127.0.0.1:${PORT}`).replace(
  /\/$/,
  "",
);
const CONCURRENCY = 10;

const errors = [];
const warnings = [];

function parseHead(html) {
  const canonical =
    html.match(
      /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i,
    )?.[1] ??
    html.match(
      /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i,
    )?.[1];
  const robots =
    html.match(
      /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i,
    )?.[1] ??
    html.match(
      /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']robots["']/i,
    )?.[1];
  const gsc =
    html.match(
      /<meta[^>]+name=["']google-site-verification["'][^>]+content=["']([^"']+)["']/i,
    )?.[1] ??
    html.match(
      /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']google-site-verification["']/i,
    )?.[1];
  const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim();
  const hasJsonLd = /application\/ld\+json/i.test(html);
  const is404 =
    /^Page not found\b/i.test(title ?? "") ||
    /<h1[^>]*>\s*Page not found\s*<\/h1>/i.test(html);
  return { canonical, robots, gsc, title, hasJsonLd, is404 };
}

function isNoindex(robots) {
  return robots ? /noindex/i.test(robots) : false;
}

function pathnameFromUrl(url) {
  return new URL(url).pathname;
}

async function fetchHtml(path) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { Accept: "text/html" },
    redirect: "follow",
  });
  const html = await res.text();
  return { status: res.status, html, finalUrl: res.url };
}

async function mapPool(items, fn) {
  const results = [];
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await fn(items[idx], idx);
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, items.length) }, worker),
  );
  return results;
}

function parseSitemapXml(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

async function loadExpectedSitemap() {
  const dir = await mkdtemp(join(tmpdir(), "gsc-"));
  try {
    await esbuild.build({
      entryPoints: ["scripts/kaomoji-seo-audit-entry.mjs"],
      bundle: true,
      platform: "node",
      format: "esm",
      outfile: join(dir, "bundle.mjs"),
      packages: "external",
      logLevel: "silent",
    });
    const { getSitemapEntries, ALL_KAOMOJI_PAGES, INDEXABLE_KAOMOJI_SLUGS } =
      await import(`file://${join(dir, "bundle.mjs")}`);
    return {
      entries: getSitemapEntries(),
      browseSlugs: ALL_KAOMOJI_PAGES.filter(
        (p) => !INDEXABLE_KAOMOJI_SLUGS.has(p.slug),
      ).map((p) => p.slug),
    };
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

async function main() {
  try {
    await fetch(`${BASE}/`, { method: "HEAD" });
  } catch {
    console.error(
      `GSC check: cannot reach ${BASE} — run npm run build && npm run start (or set GSC_BASE).`,
    );
    process.exit(1);
  }

  const { entries: expectedEntries, browseSlugs } = await loadExpectedSitemap();
  const expectedPaths = new Set(
    expectedEntries.map((e) => pathnameFromUrl(e.url)),
  );

  const robotsRes = await fetch(`${BASE}/robots.txt`);
  if (!robotsRes.ok) {
    errors.push(`robots.txt HTTP ${robotsRes.status}`);
  } else {
    const robotsTxt = await robotsRes.text();
    if (!/Allow:\s*\//m.test(robotsTxt)) {
      errors.push("robots.txt missing Allow: /");
    }
    if (!/Disallow:\s*\/api\//m.test(robotsTxt)) {
      errors.push("robots.txt must Disallow: /api/");
    }
    if (!/Sitemap:\s*https?:\/\//m.test(robotsTxt)) {
      errors.push("robots.txt missing Sitemap: absolute URL");
    }
  }

  const sitemapRes = await fetch(`${BASE}/sitemap.xml`);
  if (!sitemapRes.ok) {
    errors.push(`sitemap.xml HTTP ${sitemapRes.status}`);
  } else {
    const liveLocs = parseSitemapXml(await sitemapRes.text());
    const livePaths = new Set(liveLocs.map(pathnameFromUrl));
    if (liveLocs.length !== expectedEntries.length) {
      errors.push(
        `sitemap URL count ${liveLocs.length} ≠ expected ${expectedEntries.length}`,
      );
    }
    for (const e of expectedEntries) {
      const p = pathnameFromUrl(e.url);
      if (!livePaths.has(p)) {
        errors.push(`sitemap.xml missing expected path ${p}`);
      }
    }
    for (const loc of liveLocs) {
      const p = pathnameFromUrl(loc);
      if (!expectedPaths.has(p)) {
        warnings.push(`sitemap.xml extra URL not in getSitemapEntries(): ${p}`);
      }
    }
  }

  const home = await fetchHtml("/");
  if (home.status !== 200) {
    errors.push(`Home HTTP ${home.status}`);
  } else {
    const h = parseHead(home.html);
    if (!h.gsc?.includes("google991fcccf4c181387")) {
      errors.push("Home missing google-site-verification meta tag");
    }
    if (isNoindex(h.robots)) {
      errors.push("Home is noindex");
    }
  }

  const sitemapPaths = [...expectedPaths];
  const sitemapResults = await mapPool(sitemapPaths, async (path) => {
    const { status, html } = await fetchHtml(path);
    const head = parseHead(html);
    return { path, status, head };
  });

  let indexedOk = 0;
  for (const { path, status, head } of sitemapResults) {
    if (status !== 200) {
      errors.push(`Sitemap URL ${path} HTTP ${status}`);
      continue;
    }
    if (head.is404) {
      errors.push(`Sitemap URL ${path} renders 404 / not-found`);
      continue;
    }
    if (isNoindex(head.robots)) {
      errors.push(`Sitemap URL ${path} is noindex (${head.robots})`);
      continue;
    }
    const expectedCanon = new URL(path, "https://fancifytext.com/").toString();
    if (head.canonical && head.canonical !== expectedCanon) {
      const gotPath = pathnameFromUrl(head.canonical);
      if (gotPath !== path) {
        errors.push(
          `Sitemap URL ${path} canonical ${head.canonical} (expected path ${path})`,
        );
      }
    }
    if (!head.title || head.title.length < 10) {
      errors.push(`Sitemap URL ${path} missing/short <title>`);
    }
    indexedOk++;
  }

  const noindexProbes = [
    { path: "/angry-kaomojis/", label: "browse angry" },
    { path: "/happy-kaomojis/", label: "browse happy" },
    { path: "/search/?q=kaomoji", label: "search ?q= thin URL" },
    { path: "/kaomojis/", label: "alias hub" },
    { path: "/kamoji/", label: "typo hub alias" },
  ];
  for (const slug of browseSlugs.slice(0, 3)) {
    noindexProbes.push({ path: `/${slug}/`, label: `browse ${slug}` });
  }

  for (const { path, label } of noindexProbes) {
    const { status, html } = await fetchHtml(path);
    if (status !== 200) {
      errors.push(`${label} ${path} HTTP ${status}`);
      continue;
    }
    const head = parseHead(html);
    if (!isNoindex(head.robots)) {
      errors.push(`${label} ${path} should be noindex (got: ${head.robots ?? "none"})`);
    }
    if (path === "/kaomojis/" || path === "/kamoji/") {
      const canonPath = pathnameFromUrl(head.canonical ?? "");
      if (canonPath !== "/kaomoji/") {
        errors.push(`${path} canonical should be /kaomoji/ (got ${head.canonical})`);
      }
    }
  }

  const searchBare = await fetchHtml("/search/");
  if (!isNoindex(parseHead(searchBare.html).robots)) {
    // bare /search/ is indexable
  }

  const kaomojiHub = await fetchHtml("/multiline-kaomojis/");
  if (kaomojiHub.status === 200 && !parseHead(kaomojiHub.html).hasJsonLd) {
    warnings.push("/multiline-kaomojis/ has no JSON-LD block (optional rich result)");
  }

  const staticSitemap = await readFile(join(root, "public/sitemap.xml"), "utf8");
  const staticCount = parseSitemapXml(staticSitemap).length;
  if (staticCount !== expectedEntries.length) {
    errors.push(
      `public/sitemap.xml stale (${staticCount} URLs) — run npm run check:sitemap`,
    );
  }

  if (warnings.length) {
    console.warn(
      "GSC warnings:\n" + warnings.map((w) => `  - ${w}`).join("\n"),
    );
  }

  if (errors.length) {
    console.error(
      "GSC check failed:\n" + errors.map((e) => `  - ${e}`).join("\n"),
    );
    process.exit(1);
  }

  console.log(
    `GSC HTTP checks OK on ${BASE} (${indexedOk}/${sitemapPaths.length} sitemap URLs indexable, robots.txt + verification + browse noindex probes).`,
  );
}

await main();
