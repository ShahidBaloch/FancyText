#!/usr/bin/env node
import { build } from "esbuild";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = await mkdtemp(join(tmpdir(), "fancify-cannibal-"));
const outfile = join(dir, "cannibal.mjs");

await build({
  absWorkingDir: root,
  entryPoints: [join(root, "src/lib/seo/cannibalization-check.ts")],
  bundle: true,
  format: "esm",
  platform: "node",
  outfile,
  logLevel: "silent",
  alias: { "@": join(root, "src") },
});

const { runCannibalizationCheck } = await import(
  pathToFileURL(outfile).href
);
runCannibalizationCheck();
await rm(dir, { recursive: true, force: true });
console.log("check:cannibalization OK");
