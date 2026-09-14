import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, type PageEntry } from "@/data/pages/registry";

const DEFAULT_OG = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} — fancy text generator`,
};

export function pageMetadata(page: PageEntry): Metadata {
  const canonical = new URL(page.url, SITE_URL).toString();
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical },
    openGraph: {
      title: page.title,
      description: page.description,
      url: canonical,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [DEFAULT_OG],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [DEFAULT_OG.url],
    },
  };
}
