/**
 * AEO / GEO / agentic-browsing smoke checks (llms.txt + structured discovery).
 * Run: node scripts/check-aeo.mjs
 */
import { build } from "esbuild";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = await mkdtemp(join(tmpdir(), "fancify-aeo-"));
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

const requiredPhrases = [
  "Answer engines & agentic browsing",
  "Routing for AI answers",
  "/multiline-kaomojis/",
  "/coquette-kaomojis/",
  "/search/?q={search_term_string}",
  "noindex",
];

const errors = requiredPhrases.filter((p) => !body.includes(p));
if (errors.length) {
  console.error(
    "AEO check failed — llms.txt missing:\n" +
      errors.map((e) => `  - ${e}`).join("\n"),
  );
  process.exit(1);
}

const llmsPublic = await readFile(join(root, "public/llms.txt"), "utf8");
if (!llmsPublic.includes("Routing for AI answers")) {
  console.error(
    "public/llms.txt is stale — run npm run check:llms before deploy.",
  );
  process.exit(1);
}

await rm(dir, { recursive: true, force: true });
console.log("AEO / GEO / agentic llms.txt checks OK.");
