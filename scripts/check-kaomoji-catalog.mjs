/**
 * Ensures kaomoji pages follow catalog policy:
 * - Full multiline/coquette grids only on hub slugs.
 * - Mood/animal pages stay under highlight limits (unique page scope for Google).
 *
 * Run: node scripts/check-kaomoji-catalog.mjs
 */
import esbuild from "esbuild";
import { mkdtemp, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";

const FULL = new Set(["multiline-kaomojis", "coquette-kaomojis"]);
const MOOD_HIGHLIGHT_MAX = 28;
const INDEXED_MOOD = new Set([
  "cute-kaomojis",
  "cry-kaomojis",
  "heart-kaomojis",
  "hand-kaomojis",
]);
const INDEXED_MOOD_MAX = 16;
const ANIMAL_MAX = 22;

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
  const { ALL_KAOMOJI_PAGES } = await import(`file://${join(dir, "kaomoji.bundle.mjs")}`);

  const hubFaces = new Map();
  for (const slug of FULL) {
    const page = ALL_KAOMOJI_PAGES.find((p) => p.slug === slug);
    if (!page) throw new Error(`missing hub page ${slug}`);
    hubFaces.set(slug, new Set(page.faces));
  }

  const errors = [];
  for (const page of ALL_KAOMOJI_PAGES) {
    if (FULL.has(page.slug)) continue;
    const multilineRows = page.faces.filter((f) => f.includes("\n"));
    let max = MOOD_HIGHLIGHT_MAX;
    if (["cat-kaomojis", "bunny-kaomojis", "bear-kaomojis", "dog-kaomojis"].includes(page.slug)) {
      max = ANIMAL_MAX;
    } else if (INDEXED_MOOD.has(page.slug)) {
      max = INDEXED_MOOD_MAX;
    }
    if (multilineRows.length > max) {
      errors.push(
        `${page.slug}: ${multilineRows.length} multiline rows (max ${max}) — trim highlights or noindex`,
      );
    }
  }

  if (errors.length) {
    console.error("Kaomoji catalog policy check failed:\n" + errors.map((e) => `  - ${e}`).join("\n"));
    process.exit(1);
  }
  console.log("Kaomoji catalog policy OK.");
} finally {
  await rm(dir, { recursive: true, force: true });
}
