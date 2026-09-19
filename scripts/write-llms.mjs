/**
 * Emit public/llms.txt from the page registry + sitemap indexable set.
 * Run with: node scripts/write-llms.mjs
 */

import { build } from "esbuild";
import { mkdir, mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dest = join(root, "public/llms.txt");
const dir = await mkdtemp(join(tmpdir(), "fancify-llms-"));
const outfile = join(dir, "llms-txt.mjs");

await build({
  absWorkingDir: root,
  entryPoints: [join(root, "src/lib/seo/llms-txt.ts")],
  bundle: true,
  format: "esm",
  platform: "node",
  outfile,
  logLevel: "silent",
  alias: { "@": join(root, "src") },
});

const { assertLlmsInvariants, getLlmsPaths, renderLlmsTxt } = await import(
  pathToFileURL(outfile).href,
);

const paths = getLlmsPaths();
const body = renderLlmsTxt();
assertLlmsInvariants(body, paths);

await mkdir(dirname(dest), { recursive: true });
await writeFile(dest, body, "utf8");
await rm(dir, { recursive: true, force: true });

console.log(`Wrote ${dest} (${paths.length} URLs).`);
