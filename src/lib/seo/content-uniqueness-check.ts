import { ALL_KAOMOJI_PAGES } from "@/data/kaomoji";
import { kaomojiPathIsIndexable } from "@/data/kaomoji-index";
import { getLivePages, getPageByUrl, type PageEntry } from "@/data/pages/registry";
import {
  LETTERS,
  letterDescription,
  letterTitle,
  letterUrl,
} from "@/lib/fonts/cursive";

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[.…]+/g, ".")
    .trim();
}

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
}
