import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, type PageEntry } from "@/data/pages/registry";
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
export function pageMetadata(page: PageEntry): Metadata {
  const canonical = new URL(page.url, SITE_URL).toString();
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical },
    openGraph: {
      title: page.title,
      description: page.description,
      url: canonical,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
  };
}

/**
 * Shared metadata for every cursive capital + small letter page.
 * Pages stay live for old links / UX but must not be indexed.
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
    robots: { index: false, follow: true },
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
