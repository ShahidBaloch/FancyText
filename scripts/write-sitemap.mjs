/**
 * Emit public/sitemap.xml from the page registry.
 *
 * Next.js 16 special-cases app/sitemap.(xml|js|ts) and app/sitemap.xml/route.ts
 * as a metadata sitemap pipeline. Production curl is 200 (CDN HIT) while some
 * fetchers (WebFetch) get HTTP 500 on /sitemap.xml only — / and /robots.txt
 * succeed for the same client. Serving a public static file bypasses that
 * pipeline entirely (no request-time JS, no ISR regenerate).
 *
 * Run with: node scripts/write-sitemap.mjs
 */

import { build } from "esbuild";
import { mkdir, mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dest = join(root, "public/sitemap.xml");
const dir = await mkdtemp(join(tmpdir(), "fancify-sitemap-"));
const outfile = join(dir, "sitemap-xml.mjs");

await build({
  absWorkingDir: root,
  entryPoints: [join(root, "src/lib/seo/sitemap-xml.ts")],
  bundle: true,
  format: "esm",
  platform: "node",
  outfile,
  logLevel: "silent",
  alias: { "@": join(root, "src") },
});

const {
  assertSitemapInvariants,
  getSitemapEntries,
  renderSitemapXml,
} = await import(pathToFileURL(outfile).href);

const entries = getSitemapEntries();
const xml = renderSitemapXml(entries);
assertSitemapInvariants(xml, entries);

await mkdir(dirname(dest), { recursive: true });
await writeFile(dest, xml, "utf8");
await rm(dir, { recursive: true, force: true });

console.log(`Wrote ${dest} (${entries.length} URLs).`);
