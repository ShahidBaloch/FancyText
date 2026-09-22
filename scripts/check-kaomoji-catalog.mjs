/**
 * Ensures kaomoji pages follow catalog policy:
 * - Full multiline/coquette grids on hub slugs + browse-only mood/animal lists.
 * - Indexed mood URLs keep a small multiline teaser only.
 *
 * Run: node scripts/check-kaomoji-catalog.mjs
 */
import esbuild from "esbuild";
import { mkdtemp, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";

const FULL = new Set(["multiline-kaomojis", "coquette-kaomojis"]);
const INDEXED_TEASER_MAX = 16;
const BROWSE_MULTILINE_MAX = 500;

const dir = await mkdtemp(join(tmpdir(), "fancify-kaomoji-catalog-"));
try {
  await esbuild.build({
    entryPoints: ["src/data/kaomoji.ts"],
    bundle: true,
    platform: "node",
    format: "esm",
    outfile: join(dir, "kaomoji.bundle.mjs"),
    packages: "external",
  });
  const { ALL_KAOMOJI_PAGES, INDEXABLE_KAOMOJI_SLUGS } = await import(
    `file://${join(dir, "kaomoji.bundle.mjs")}`,
  );

  const errors = [];
  for (const page of ALL_KAOMOJI_PAGES) {
    if (FULL.has(page.slug)) continue;
    const multilineRows = page.faces.filter((f) => f.includes("\n"));
    const indexedTeaser =
      INDEXABLE_KAOMOJI_SLUGS.has(page.slug) && !FULL.has(page.slug);
    const max = indexedTeaser ? INDEXED_TEASER_MAX : BROWSE_MULTILINE_MAX;
    if (multilineRows.length > max) {
      errors.push(
        `${page.slug}: ${multilineRows.length} multiline rows (max ${max})`,
      );
    }
  }

  const multilineHub = ALL_KAOMOJI_PAGES.find((p) => p.slug === "multiline-kaomojis");
  if (!multilineHub || multilineHub.faces.length < 500) {
    errors.push("multiline-kaomojis hub should contain 500+ multiline faces");
  }

  if (errors.length) {
    console.error(
      "Kaomoji catalog policy check failed:\n" +
        errors.map((e) => `  - ${e}`).join("\n"),
    );
    process.exit(1);
  }
  console.log("Kaomoji catalog policy OK.");
} finally {
  await rm(dir, { recursive: true, force: true });
}
