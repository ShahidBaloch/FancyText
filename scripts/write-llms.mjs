/**
 * Emit public/llms.txt and public/llms-full.txt from the page registry + sitemap.
 * Run with: node scripts/write-llms.mjs
 */

import { build } from "esbuild";
import { mkdir, mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = await mkdtemp(join(tmpdir(), "fancify-llms-"));
const outfile = join(dir, "llms-bundle.mjs");

await build({
  absWorkingDir: root,
  entryPoints: [join(root, "scripts/llms-write-entry.mjs")],
  bundle: true,
  format: "esm",
  platform: "node",
  outfile,
  logLevel: "silent",
  alias: { "@": join(root, "src") },
});

const {
  assertLlmsInvariants,
  assertLlmsFullInvariants,
  getLlmsPaths,
  renderLlmsTxt,
  renderLlmsFullTxt,
} = await import(pathToFileURL(outfile).href);

const paths = getLlmsPaths();
const body = renderLlmsTxt();
assertLlmsInvariants(body, paths);

const fullBody = renderLlmsFullTxt();
assertLlmsFullInvariants(fullBody);

await mkdir(join(root, "public"), { recursive: true });
await writeFile(join(root, "public/llms.txt"), body, "utf8");
await writeFile(join(root, "public/llms-full.txt"), fullBody, "utf8");
await rm(dir, { recursive: true, force: true });

console.log(`Wrote public/llms.txt (${paths.length} URLs).`);
console.log(`Wrote public/llms-full.txt (${fullBody.length} chars).`);
