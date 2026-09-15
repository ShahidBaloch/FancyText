import type { MetadataRoute } from "next";
import {
  getLivePages,
  SITE_CONTENT_UPDATED,
  SITE_URL,
} from "@/data/pages/registry";
import { LETTERS, letterUrl } from "@/lib/fonts/cursive";

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

    const letters = LETTERS.flatMap((letter) =>
      (["capital", "small"] as const).map((letterCase) => ({
        url: new URL(letterUrl(letter, letterCase), SITE_URL).toString(),
        lastModified: SITE_CONTENT_UPDATED,
        changeFrequency: "monthly" as const,
        priority: 0.4,
      })),
    );

    const legal = ["/privacy/", "/terms/"].map((path) => ({
      url: new URL(path, SITE_URL).toString(),
      lastModified: SITE_CONTENT_UPDATED,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    }));

    return [...pages, ...letters, ...legal];
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
