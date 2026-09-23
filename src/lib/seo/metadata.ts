import type { Metadata } from "next";
import { kaomojiPathIsIndexable } from "@/data/kaomoji-index";
import type { PageEntry } from "@/data/pages/registry";
import { SITE_NAME, SITE_URL } from "@/data/site";
import {
  metaDescriptionPlain,
  socialDescriptionForPath,
} from "@/lib/seo/meta-description";
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
  /** OG/Twitter snippet; defaults to meta description (SERP uses `description`). */
  socialDescription?: string;
};

export function pageMetadata(
  page: PageEntry,
  opts?: PageMetadataOptions,
): Metadata {
  const canonicalPath = opts?.canonicalPath ?? page.url;
  const canonical = new URL(canonicalPath, SITE_URL).toString();
  const pageUrl = new URL(page.url, SITE_URL).toString();
  const description = metaDescriptionPlain(page.description);
  const socialDescription =
    opts?.socialDescription ??
    socialDescriptionForPath(page.url, page.description);
  const indexable =
    page.index !== false && kaomojiPathIsIndexable(page.url);
  return {
    title: { absolute: page.title },
    description,
    ...(indexable ? {} : { robots: { index: false, follow: true } }),
    alternates: { canonical },
    openGraph: {
      title: page.title,
      description: socialDescription,
      url: pageUrl,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: socialDescription,
    },
  };
}

/**
 * Shared metadata for every cursive capital + small letter page.
 * Pages stay live for old links / UX but are not indexed (hub owns generator intent).
 */
export function cursiveLetterMetadata(
  letter: Letter,
  letterCase: LetterCase,
): Metadata {
  const title = letterTitle(letter, letterCase);
  const path = letterUrl(letter, letterCase);
  const baseDescription = letterDescription(letter, letterCase);
  const description = metaDescriptionPlain(baseDescription);
  const socialDescription = socialDescriptionForPath(path, baseDescription);
  const canonical = new URL(path, SITE_URL).toString();
  return {
    title: { absolute: title },
    description,
    robots: { index: false, follow: true },
    alternates: { canonical },
    openGraph: {
      title,
      description: socialDescription,
      url: canonical,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: socialDescription,
    },
  };
}
