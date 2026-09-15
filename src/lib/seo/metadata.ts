import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, type PageEntry } from "@/data/pages/registry";

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
