import type { MetadataRoute } from "next";
import { getLivePages, SITE_URL } from "@/data/pages/registry";
import { LETTERS, letterUrl } from "@/lib/fonts/cursive";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = getLivePages().map((page) => ({
    url: new URL(page.url, SITE_URL).toString(),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: page.url === "/" ? 1 : 0.85,
  }));

  const letters = LETTERS.flatMap((letter) =>
    (["capital", "small"] as const).map((letterCase) => ({
      url: new URL(letterUrl(letter, letterCase), SITE_URL).toString(),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  const legal = ["/privacy/", "/terms/"].map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [...pages, ...letters, ...legal];
}
