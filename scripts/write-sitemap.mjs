/**
 * Emit a static app/sitemap.xml from the page registry.
 *
 * Next.js 16 treats sitemap.(xml|js|ts) as a special metadata file. A folder
 * named sitemap.xml with a GET route handler is not that convention and can
 * 500 for some fetchers while curl still sees cached XML. A static XML file
 * in src/app/sitemap.xml is served with no request-time JS.
 *
 * Run with: node scripts/write-sitemap.mjs
 */

import { build } from "esbuild";
import { mkdir, mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dest = join(root, "src/app/sitemap.xml");
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
