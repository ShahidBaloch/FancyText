import type { Metadata } from "next";
import { kaomojiPathIsIndexable } from "@/data/kaomoji";
import { SITE_NAME, SITE_URL, type PageEntry } from "@/data/pages/registry";
import { descriptionWithSerpSpecimen } from "@/lib/seo/specimens";
import {
  letterDescription,
  letterTitle,
  letterUrl,
  type Letter,
  type LetterCase,
} from "@/lib/fonts/cursive";

/**
 * Page metadata without hardcoding og:image / twitter:image.
 * File-based `opengraph-image.tsx` (and twitter) route handlers supply images.
 */
type PageMetadataOptions = {
  /** Consolidate duplicate hubs (e.g. /kamoji/ → /kaomoji/). */
  canonicalPath?: string;
};

export function pageMetadata(
  page: PageEntry,
  opts?: PageMetadataOptions,
): Metadata {
  const canonicalPath = opts?.canonicalPath ?? page.url;
  const canonical = new URL(canonicalPath, SITE_URL).toString();
  const pageUrl = new URL(page.url, SITE_URL).toString();
  const description = descriptionWithSerpSpecimen(page.url, page.description);
  const indexable =
    page.index !== false && kaomojiPathIsIndexable(page.url);
  return {
    title: { absolute: page.title },
    description,
    ...(indexable ? {} : { robots: { index: false, follow: true } }),
    alternates: { canonical },
    openGraph: {
      title: page.title,
      description,
      url: pageUrl,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description,
    },
  };
}

/**
 * Shared metadata for every cursive capital + small letter page.
 * Long-tail spokes (e.g. “s in cursive”); hub stays canonical for generator intent.
 */
export function cursiveLetterMetadata(
  letter: Letter,
  letterCase: LetterCase,
): Metadata {
  const title = letterTitle(letter, letterCase);
  const description = letterDescription(letter, letterCase);
  const canonical = new URL(letterUrl(letter, letterCase), SITE_URL).toString();
  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
