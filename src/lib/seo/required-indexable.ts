import { getPageByUrl } from "@/data/pages/registry";
import { getSerpSpecimen } from "@/lib/seo/specimens";

/**
 * P0 indexable URLs that must never drop from sitemap.xml.
 * Keep in sync with docs/seo-plumbing.md and assertSitemapInvariants.
 */
/** Must have a live `PAGES` registry row and stay indexable. */
export const SITEMAP_REQUIRED_REGISTRY_PATHS = [
  "/",
  "/copy-paste-fonts/",
  "/cursive-text-generator/",
  "/cool-symbols/",
  "/cute-symbols/",
  "/aesthetic-symbols/",
  "/emoji-combos/",
  "/text-art/",
  "/heart-emoji/",
  "/star-emoji/",
  "/cat-emoji/",
  "/kaomoji/",
  "/cute-kaomojis/",
  "/cry-kaomojis/",
  "/heart-kaomojis/",
  "/hand-kaomojis/",
  "/star-kaomojis/",
  "/kaomoji-dot-art/",
  "/carrd-kaomojis/",
  "/lenny-face/",
  "/shrug-emoticon/",
] as const;

/** Legal URLs appended in sitemap builder (not in PAGES). */
export const SITEMAP_REQUIRED_LEGAL_PATHS = ["/privacy/", "/terms/"] as const;

export const SITEMAP_REQUIRED_PATHS = [
  ...SITEMAP_REQUIRED_REGISTRY_PATHS,
  ...SITEMAP_REQUIRED_LEGAL_PATHS,
] as const;

/** URLs that must have SERP_SPECIMENS (hero + meta line). Cursive letters use dynamic specimens (Task 6). */
export const SERP_SPECIMEN_REQUIRED_PATHS = [
  "/",
  "/copy-paste-fonts/",
  "/cool-symbols/",
  "/cute-symbols/",
  "/aesthetic-symbols/",
  "/emoji-combos/",
  "/text-art/",
  "/heart-emoji/",
  "/star-emoji/",
  "/cat-emoji/",
  "/kaomoji/",
  "/lenny-face/",
] as const;

/** Indexed kaomoji moods should have curated RelatedTools neighbors. */
export const TOPICAL_RELATED_REQUIRED_PATHS = [
  "/heart-kaomojis/",
  "/star-kaomojis/",
  "/cute-kaomojis/",
  "/kaomoji-dot-art/",
  "/heart-emoji/",
  "/star-emoji/",
  "/cat-emoji/",
  "/emoji-combos/",
  "/text-art/",
  "/copy-paste-fonts/",
] as const;

export function assertSeoPlumbingInvariants(
  topicalRelatedKeys: ReadonlySet<string>,
): void {
  for (const path of SITEMAP_REQUIRED_REGISTRY_PATHS) {
    const page = getPageByUrl(path);
    if (!page) {
      throw new Error(`SEO plumbing: missing registry entry for ${path}`);
    }
    if (page.index === false) {
      throw new Error(`SEO plumbing: ${path} is noindex but sitemap-required`);
    }
  }

  for (const path of SERP_SPECIMEN_REQUIRED_PATHS) {
    if (!getSerpSpecimen(path)) {
      throw new Error(`SEO plumbing: missing SERP specimen for ${path}`);
    }
  }

  for (const path of TOPICAL_RELATED_REQUIRED_PATHS) {
    if (!topicalRelatedKeys.has(path)) {
      throw new Error(
        `SEO plumbing: missing TOPICAL_RELATED[${path}] in registry`,
      );
    }
  }
}
