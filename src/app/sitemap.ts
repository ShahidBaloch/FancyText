import type { MetadataRoute } from "next";
import {
  getLivePages,
  SITE_CONTENT_UPDATED,
  SITE_URL,
} from "@/data/pages/registry";

/** Cache aggressively — URL set only changes on deploy/content updates. */
export const revalidate = 86400;

export default function sitemap(): MetadataRoute.Sitemap {
  try {
    const pages = getLivePages().map((page) => ({
      url: new URL(page.url, SITE_URL).toString(),
      lastModified: SITE_CONTENT_UPDATED,
      changeFrequency: (page.url.startsWith("/guides/")
        ? "monthly"
        : "weekly") as "monthly" | "weekly",
      priority:
        page.url === "/"
          ? 1
          : page.url === "/about/" || page.url.startsWith("/guides/")
            ? 0.45
            : 0.85,
    }));

    // Cursive capital/small letter URLs stay live for old links but are
    // noindexed — do not submit them. The hub is /cursive-text-generator/.

    const legal = ["/privacy/", "/terms/"].map((path) => ({
      url: new URL(path, SITE_URL).toString(),
      lastModified: SITE_CONTENT_UPDATED,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    }));

    return [...pages, ...legal];
  } catch {
    // Never 500 the sitemap — fall back to hub so crawlers still get a seed URL.
    return [
      {
        url: new URL("/", SITE_URL).toString(),
        lastModified: SITE_CONTENT_UPDATED,
        changeFrequency: "weekly",
        priority: 1,
      },
    ];
  }
}
