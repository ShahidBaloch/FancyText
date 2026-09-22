#!/usr/bin/env node
import { build } from "esbuild";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = await mkdtemp(join(tmpdir(), "fancify-audit-"));
const outfile = join(dir, "audit.mjs");

await build({
  absWorkingDir: root,
  entryPoints: [join(root, "scripts/audit-content-uniqueness-entry.ts")],
  bundle: true,
  format: "esm",
  platform: "node",
  outfile,
  logLevel: "silent",
  alias: { "@": join(root, "src") },
});

const { runAudit } = await import(pathToFileURL(outfile).href);
console.log(JSON.stringify(runAudit(), null, 2));
await rm(dir, { recursive: true, force: true });
