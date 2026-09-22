#!/usr/bin/env node
/**
 * After `next build`, assert pre-rendered HTML includes a SERP specimen block
 * on every SERP_SPECIMEN_REQUIRED_PATHS URL (matches live audit grep).
 */
import { readFileSync, existsSync } from "node:fs";
import { build } from "esbuild";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const appDir = join(root, ".next/server/app");

const SPECIMEN_MARKERS = /serp-specimen|home-specimen/;

function htmlPathForUrl(url) {
  const trimmed = url.replace(/^\/|\/$/g, "");
  if (!trimmed) return join(appDir, "index.html");
  return join(appDir, `${trimmed}.html`);
}

const dir = await mkdtemp(join(tmpdir(), "fancify-serp-html-"));
const outfile = join(dir, "paths.mjs");

await build({
  absWorkingDir: root,
  entryPoints: [join(root, "src/lib/seo/required-indexable.ts")],
  bundle: true,
  format: "esm",
  platform: "node",
  outfile,
  logLevel: "silent",
  alias: { "@": join(root, "src") },
});

const { SERP_SPECIMEN_REQUIRED_PATHS } = await import(
  pathToFileURL(outfile).href
);
await rm(dir, { recursive: true, force: true });

if (!existsSync(appDir)) {
  console.error(
    "check:serp-specimen-html: missing .next/server/app — run npm run build first",
  );
  process.exit(1);
}

const missing = [];

for (const url of SERP_SPECIMEN_REQUIRED_PATHS) {
  const file = htmlPathForUrl(url);
  if (!existsSync(file)) {
    missing.push(`${url} (no HTML at ${file})`);
    continue;
  }
  const html = readFileSync(file, "utf8");
  if (!SPECIMEN_MARKERS.test(html)) {
    missing.push(`${url} (no serp-specimen / home-specimen in ${file})`);
  }
}

if (missing.length) {
  console.error("check:serp-specimen-html FAILED:");
  for (const line of missing) console.error(`  - ${line}`);
  process.exit(1);
}

console.log(
  `check:serp-specimen-html OK (${SERP_SPECIMEN_REQUIRED_PATHS.length} paths)`,
);
