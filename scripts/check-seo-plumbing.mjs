#!/usr/bin/env node
/**
 * Registry + sitemap + SERP specimen invariants for P0 SEO URLs.
 * Run: npm run check:seo
 */
import { build } from "esbuild";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = await mkdtemp(join(tmpdir(), "fancify-seo-plumbing-"));
const outfile = join(dir, "plumbing-check.mjs");

await build({
  absWorkingDir: root,
  entryPoints: [join(root, "src/lib/seo/plumbing-check.ts")],
  bundle: true,
  format: "esm",
  platform: "node",
  outfile,
  logLevel: "silent",
  alias: { "@": join(root, "src") },
});

const { runSeoPlumbingCheck } = await import(pathToFileURL(outfile).href);
runSeoPlumbingCheck();
await rm(dir, { recursive: true, force: true });
console.log("check:seo plumbing OK");
