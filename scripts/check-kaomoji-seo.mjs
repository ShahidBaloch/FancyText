/**
 * Kaomoji SEO + Google helpful-content guardrails:
 * - Index policy ↔ hub nav ↔ sitemap stay aligned
 * - Indexed URLs: unique meta, prose (canonicalLead), FAQ depth, multiline teaser caps
 * - No sitemap leaks for noindex browse tails
 *
 * Run: node scripts/check-kaomoji-seo.mjs
 */
import esbuild from "esbuild";
import { mkdtemp, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";

const INDEXED_CATALOG_NOTE_SLUGS = new Set([
  "cute-kaomojis",
  "cry-kaomojis",
  "heart-kaomojis",
  "hand-kaomojis",
  "star-kaomojis",
  "kaomoji-dot-art",
  "carrd-kaomojis",
  "multiline-kaomojis",
  "coquette-kaomojis",
]);

const CANONICAL_LEAD_OPTIONAL = new Set(["lenny-face", "shrug-emoticon"]);

const COQUETTE_BLOCKED_INTENTS = new Set([
  "multiline kaomoji",
  "multiline ascii kaomoji",
  "multiline text art",
]);

const dir = await mkdtemp(join(tmpdir(), "fancify-kaomoji-seo-"));
try {
  await esbuild.build({
    entryPoints: ["scripts/kaomoji-seo-audit-entry.mjs"],
    bundle: true,
    platform: "node",
    format: "esm",
    outfile: join(dir, "audit.bundle.mjs"),
    packages: "external",
  });

  const {
    INDEXABLE_KAOMOJI_SLUGS,
    ALL_KAOMOJI_PAGES,
    kaomojiPathIsIndexable,
    KAOMOJI_UNIQUE_COPY,
    KAOMOJI_HUB_NAV_GROUPS,
    KAOMOJI_SEARCH_INTENT_BY_SLUG,
    getSitemapEntries,
  } = await import(`file://${join(dir, "audit.bundle.mjs")}`);

  const errors = [];

  const indexedFromNav = new Set();
  for (const g of KAOMOJI_HUB_NAV_GROUPS) {
    if (g.indexable) for (const s of g.slugs) indexedFromNav.add(s);
  }
  for (const s of INDEXABLE_KAOMOJI_SLUGS) {
    if (!indexedFromNav.has(s)) {
      errors.push(`INDEXABLE_KAOMOJI_SLUGS has ${s} but hub nav indexable groups omit it`);
    }
  }
  for (const s of indexedFromNav) {
    if (!INDEXABLE_KAOMOJI_SLUGS.has(s)) {
      errors.push(`Hub nav lists ${s} as indexed but INDEXABLE_KAOMOJI_SLUGS omits it`);
    }
  }

  const indexedPages = ALL_KAOMOJI_PAGES.filter((p) =>
    INDEXABLE_KAOMOJI_SLUGS.has(p.slug),
  );
  const descSeen = new Map();
  const titleSeen = new Map();

  for (const p of indexedPages) {
    const d = p.description.trim();
    if (descSeen.has(d)) {
      errors.push(
        `Duplicate indexed meta description: ${p.slug} vs ${descSeen.get(d)}`,
      );
    } else descSeen.set(d, p.slug);

    const t = p.title.trim();
    if (titleSeen.has(t)) {
      errors.push(`Duplicate indexed title: ${p.slug} vs ${titleSeen.get(t)}`);
    } else titleSeen.set(t, p.slug);

    if (t.length < 25 || t.length > 72) {
      errors.push(`${p.slug}: title length ${t.length} (want 25–72)`);
    }
    if (d.length < 70 || d.length > 320) {
      errors.push(`${p.slug}: description length ${d.length} (want 70–320)`);
    }
    if (/\u2026|\.{3}\s*$/.test(d) || d.includes("…")) {
      errors.push(`${p.slug}: meta description must not use “…” (looks truncated on SERP)`);
    }
    if (/\|\s*FancifyText\s*$/i.test(t)) {
      errors.push(
        `${p.slug}: drop "| FancifyText" from title — Google already shows sitename; brand burns mobile pixels and often gets rewritten away`,
      );
    }
    // Faces in titles only where they win CTR. Wide/complex faces belong in the meta description.
    const FACE_IN_TITLE_SLUGS = new Set([
      "cute-kaomojis",
      "cry-kaomojis",
      "heart-kaomojis",
      "lenny-face",
      "shrug-emoticon",
    ]);
    if (FACE_IN_TITLE_SLUGS.has(p.slug)) {
      const faceEarly =
        /\([^)]{1,28}\)/.test(t.slice(0, 42)) ||
        /[♡¯ツ͡°ʖ]/.test(t.slice(0, 42));
      if (!faceEarly) {
        errors.push(
          `${p.slug}: this query wins CTR with one compact specimen early in the title`,
        );
      }
    }

    const copy = KAOMOJI_UNIQUE_COPY[p.slug];
    if (!copy) {
      errors.push(`${p.slug}: missing KAOMOJI_UNIQUE_COPY overlay`);
      continue;
    }
    if (!copy.canonicalLead && !CANONICAL_LEAD_OPTIONAL.has(p.slug)) {
      errors.push(`${p.slug}: missing canonicalLead (visible prose ≠ meta description)`);
    }
    if ((copy.faq?.length ?? 0) < 3) {
      errors.push(`${p.slug}: FAQ has ${copy.faq?.length ?? 0} items (want ≥3)`);
    }
    if (INDEXED_CATALOG_NOTE_SLUGS.has(p.slug) && !copy.catalogNote) {
      errors.push(`${p.slug}: indexed catalog page missing catalogNote`);
    }

    const multilineRows = p.faces.filter((f) => f.includes("\n"));
    const isFullHub =
      p.slug === "multiline-kaomojis" || p.slug === "coquette-kaomojis";
    if (!isFullHub && multilineRows.length > 16) {
      errors.push(
        `${p.slug}: indexed page has ${multilineRows.length} multiline rows (max 16 teaser)`,
      );
    }
  }

  for (const p of ALL_KAOMOJI_PAGES) {
    if (INDEXABLE_KAOMOJI_SLUGS.has(p.slug)) continue;
    if (kaomojiPathIsIndexable(p.slug)) {
      errors.push(`${p.slug}: browse list but kaomojiPathIsIndexable() is true`);
    }
    const intents = KAOMOJI_SEARCH_INTENT_BY_SLUG[p.slug];
    if (!intents?.length) {
      errors.push(
        `${p.slug}: browse/noindex list missing KAOMOJI_SEARCH_INTENT_BY_SLUG (hub filter + /search/)`,
      );
    }
  }

  const origin = new URL(getSitemapEntries()[0]?.url ?? "https://fancifytext.com/").origin;
  const sitemap = getSitemapEntries();
  for (const p of ALL_KAOMOJI_PAGES) {
    if (INDEXABLE_KAOMOJI_SLUGS.has(p.slug)) continue;
    const url = `${origin}/${p.slug}/`;
    if (sitemap.some((e) => e.url === url)) {
      errors.push(`Sitemap includes noindex kaomoji tail: ${p.slug}`);
    }
  }
  for (const alias of ["kamoji", "kaomojis"]) {
    const url = `${origin}/${alias}/`;
    if (sitemap.some((e) => e.url === url)) {
      errors.push(`Sitemap must omit alias /${alias}/ (canonical /kaomoji/)`);
    }
  }

  const coquetteIntents = KAOMOJI_SEARCH_INTENT_BY_SLUG["coquette-kaomojis"] ?? [];
  for (const term of coquetteIntents) {
    const lower = term.toLowerCase();
    if (COQUETTE_BLOCKED_INTENTS.has(lower)) {
      errors.push(
        `coquette-kaomojis search intent overlaps multiline hub: "${term}"`,
      );
    }
    const multilineIntents =
      KAOMOJI_SEARCH_INTENT_BY_SLUG["multiline-kaomojis"] ?? [];
    if (
      multilineIntents.some((m) => m.toLowerCase() === lower) &&
      !COQUETTE_BLOCKED_INTENTS.has(lower)
    ) {
      errors.push(
        `Shared search intent on coquette + multiline hubs: "${term}"`,
      );
    }
  }

  const multiline = indexedPages.find((p) => p.slug === "multiline-kaomojis");
  const coquette = indexedPages.find((p) => p.slug === "coquette-kaomojis");
  if (multiline && coquette) {
    if (
      multiline.description.toLowerCase().includes("coquette") ||
      multiline.description.toLowerCase().includes("tulip")
    ) {
      errors.push("multiline-kaomojis description bleeds coquette keywords");
    }
    if (coquette.description.toLowerCase().includes("table-flip")) {
      errors.push("coquette-kaomojis description bleeds angry multiline keywords");
    }
  }

  if (errors.length) {
    console.error(
      "Kaomoji SEO policy check failed:\n" +
        errors.map((e) => `  - ${e}`).join("\n"),
    );
    process.exit(1);
  }
  console.log(
    `Kaomoji SEO policy OK (${indexedPages.length} indexed spokes, ${ALL_KAOMOJI_PAGES.length - indexedPages.length} browse/noindex lists).`,
  );
} finally {
  await rm(dir, { recursive: true, force: true });
}
