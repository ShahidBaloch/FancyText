import type { MetadataRoute } from "next";
import {
  getLivePages,
  SITE_CONTENT_UPDATED,
  SITE_URL,
} from "@/data/pages/registry";
import { LETTERS, letterUrl } from "@/lib/fonts/cursive";

export default function sitemap(): MetadataRoute.Sitemap {
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
}
