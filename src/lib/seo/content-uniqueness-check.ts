import { ALL_KAOMOJI_PAGES } from "@/data/kaomoji";
import { kaomojiPathIsIndexable } from "@/data/kaomoji-index";
import { getLivePages, getPageByUrl, type PageEntry } from "@/data/pages/registry";
import {
  CURSIVE_LETTER_PAGES_INDEXABLE,
  LETTERS,
  letterDescription,
  letterTitle,
  letterUrl,
} from "@/lib/fonts/cursive";
import { metaDescriptionPlain } from "@/lib/seo/meta-description";
import { buildOnPageIntentFingerprint } from "@/lib/seo/page-intent-fingerprint";
import { resolveIntentCluster } from "@/lib/seo/intent-clusters";
import { runUserIntentFulfillmentCheck } from "@/lib/seo/user-intent-check";

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[.…]+/g, ".")
    .trim();
}

function wordSet(text: string): Set<string> {
  const words = normalizeText(text)
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2);
  return new Set(words);
}

/** Jaccard similarity on word sets — flags near-duplicate prose in registry copy. */
function jaccardSimilarity(a: string, b: string): number {
  const setA = wordSet(a);
  const setB = wordSet(b);
  if (!setA.size && !setB.size) return 1;
  let intersection = 0;
  for (const w of setA) {
    if (setB.has(w)) intersection += 1;
  }
  const union = setA.size + setB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

/** Registry meta similarity (title + description only). */
const META_SIMILARITY_THRESHOLD = 0.82;
/** Full page intent fingerprint — includes on-page FAQ/uses/platform tables. */
const INTENT_FINGERPRINT_THRESHOLD = 0.76;
/** Supporting vs owner in same cluster may share vocabulary; still must differ on-page. */
const SAME_CLUSTER_INTENT_THRESHOLD = 0.86;

function isIndexablePage(page: PageEntry): boolean {
  if (page.index === false) return false;
  return kaomojiPathIsIndexable(page.url);
}

/** Minimum unique meta description length for indexable money pages (excluding legal). */
const MIN_INDEXABLE_DESCRIPTION_CHARS = 80;

const LEGAL_PATHS = new Set(["/privacy/", "/terms/"]);

const KAOMOJI_BY_SLUG = new Map(
  ALL_KAOMOJI_PAGES.map((page) => [page.slug, page]),
);

/** Matches `generateMetadata` on kaomoji list routes — not registry text alone. */
function effectiveRegistryMeta(page: PageEntry): {
  url: string;
  title: string;
  description: string;
} {
  const slug = page.url.replace(/^\/|\/$/g, "");
  const kaomoji = KAOMOJI_BY_SLUG.get(slug);
  return {
    url: page.url,
    title: kaomoji?.title ?? page.title,
    description: kaomoji?.description ?? page.description,
  };
}

function recordMeta(
  byDescription: Map<string, string[]>,
  byTitle: Map<string, string[]>,
  url: string,
  title: string,
  description: string,
): void {
  const descKey = normalizeText(description);
  if (descKey.length >= 40) {
    const list = byDescription.get(descKey) ?? [];
    list.push(url);
    byDescription.set(descKey, list);
  }
  const titleKey = normalizeText(title);
  const titles = byTitle.get(titleKey) ?? [];
  titles.push(url);
  byTitle.set(titleKey, titles);
}

/**
 * Ensures indexable URLs do not share duplicate meta descriptions or titles.
 * Does not validate or mutate primaryKeyword / fellowKeywords (SEO targets stay fixed).
 */
export function runContentUniquenessCheck(): void {
  const byDescription = new Map<string, string[]>();
  const byTitle = new Map<string, string[]>();

  for (const page of getLivePages()) {
    if (!isIndexablePage(page)) continue;

    const meta = effectiveRegistryMeta(page);
    recordMeta(byDescription, byTitle, meta.url, meta.title, meta.description);

    if (
      !LEGAL_PATHS.has(page.url) &&
      meta.description.trim().length < MIN_INDEXABLE_DESCRIPTION_CHARS
    ) {
      throw new Error(
        `Content uniqueness: ${page.url} description too short (${meta.description.trim().length} chars) — expand prose, keep primaryKeyword unchanged`,
      );
    }
  }

  for (const letter of LETTERS) {
    if (!CURSIVE_LETTER_PAGES_INDEXABLE) continue;
    for (const letterCase of ["capital", "small"] as const) {
      const path = letterUrl(letter, letterCase);
      const page = getPageByUrl(path);
      if (page?.index === false) continue;
      const title = letterTitle(letter, letterCase);
      const description = letterDescription(letter, letterCase);
      recordMeta(byDescription, byTitle, path, title, description);
      if (description.trim().length < 60) {
        throw new Error(
          `Content uniqueness: ${path} cursive letter description too short — expand copy, keep letter keyword`,
        );
      }
    }
  }

  for (const [desc, urls] of byDescription) {
    if (urls.length <= 1) continue;
    throw new Error(
      `Duplicate indexable meta description (${urls.length} URLs): ${urls.join(", ")} — rewrite descriptions; do not change primaryKeyword`,
    );
  }

  for (const [title, urls] of byTitle) {
    if (urls.length <= 1) continue;
    throw new Error(
      `Duplicate indexable title (${urls.length} URLs): ${urls.join(", ")} — rewrite titles while keeping target keywords`,
    );
  }

  /** GSC-facing descriptions include SERP specimen prefix from pageMetadata(). */
  const byEffectiveDescription = new Map<string, string[]>();
  const ellipsisUrls: string[] = [];

  for (const page of getLivePages()) {
    if (!isIndexablePage(page)) continue;
    const meta = effectiveRegistryMeta(page);
    const effective = metaDescriptionPlain(meta.description);
    if (/\u2026|\.{3}\s*$/.test(effective) || effective.includes("…")) {
      ellipsisUrls.push(meta.url);
    }
    const key = normalizeText(effective);
    if (key.length < 40) continue;
    const list = byEffectiveDescription.get(key) ?? [];
    list.push(meta.url);
    byEffectiveDescription.set(key, list);
  }

  for (const letter of LETTERS) {
    if (!CURSIVE_LETTER_PAGES_INDEXABLE) continue;
    for (const letterCase of ["capital", "small"] as const) {
      const path = letterUrl(letter, letterCase);
      const page = getPageByUrl(path);
      if (page?.index === false) continue;
      const effective = metaDescriptionPlain(
        letterDescription(letter, letterCase),
      );
      if (/\u2026|\.{3}\s*$/.test(effective) || effective.includes("…")) {
        ellipsisUrls.push(path);
      }
      const key = normalizeText(effective);
      if (key.length < 40) continue;
      const list = byEffectiveDescription.get(key) ?? [];
      list.push(path);
      byEffectiveDescription.set(key, list);
    }
  }

  if (ellipsisUrls.length) {
    throw new Error(
      `Effective meta description must not use “…” / “...” (looks truncated on SERP): ${ellipsisUrls.join(", ")}`,
    );
  }

  for (const [, urls] of byEffectiveDescription) {
    if (urls.length <= 1) continue;
    throw new Error(
      `Duplicate indexable effective meta description (${urls.length} URLs): ${urls.join(", ")} — adjust SERP metaLine or page description; do not change primaryKeyword`,
    );
  }

  const indexablePages = getLivePages().filter(isIndexablePage);

  const metaBodies: { url: string; page: PageEntry; body: string }[] = [];
  const intentBodies: { url: string; page: PageEntry; body: string }[] = [];

  for (const page of indexablePages) {
    const meta = effectiveRegistryMeta(page);
    metaBodies.push({
      url: meta.url,
      page,
      body: [meta.title, meta.description].join(" "),
    });
    intentBodies.push({
      url: meta.url,
      page,
      body: [
        meta.title,
        meta.description,
        buildOnPageIntentFingerprint(meta.url),
      ].join(" "),
    });
  }

  function sameDocumentedCluster(a: PageEntry, b: PageEntry): boolean {
    if (resolveIntentCluster(a) !== resolveIntentCluster(b)) return false;
    const roles = new Set(
      [a.intentClusterRole, b.intentClusterRole].filter(Boolean),
    );
    return roles.has("owner") && roles.has("supporting");
  }

  for (let i = 0; i < metaBodies.length; i += 1) {
    for (let j = i + 1; j < metaBodies.length; j += 1) {
      const left = metaBodies[i];
      const right = metaBodies[j];
      if (sameDocumentedCluster(left.page, right.page)) continue;
      const sim = jaccardSimilarity(left.body, right.body);
      if (sim >= META_SIMILARITY_THRESHOLD) {
        throw new Error(
          `Near-duplicate meta copy (${Math.round(sim * 100)}% word overlap): ${left.url} vs ${right.url} — rewrite titles/descriptions; do not change primaryKeyword`,
        );
      }
    }
  }

  for (let i = 0; i < intentBodies.length; i += 1) {
    for (let j = i + 1; j < intentBodies.length; j += 1) {
      const left = intentBodies[i];
      const right = intentBodies[j];
      const sameCluster = sameDocumentedCluster(left.page, right.page);
      const threshold = sameCluster
        ? SAME_CLUSTER_INTENT_THRESHOLD
        : INTENT_FINGERPRINT_THRESHOLD;
      const sim = jaccardSimilarity(left.body, right.body);
      if (sim >= threshold) {
        throw new Error(
          `Near-duplicate user intent (${Math.round(sim * 100)}% overlap in meta + on-page copy): ${left.url} vs ${right.url} — add distinct FAQ/uses/platform data or noindex; do not change primaryKeyword`,
        );
      }
    }
  }

  runUserIntentFulfillmentCheck();
}
