import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/pages/registry";

export default function robots(): MetadataRoute.Robots {
  const isPreview = process.env.VERCEL_ENV === "preview";

  if (isPreview) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  const publicAllow = { allow: "/" as const, disallow: ["/api/"] as string[] };
  return {
    rules: [
      { userAgent: "*", ...publicAllow },
      // Explicit allow for answer-engine / agentic fetchers (same policy as *).
      { userAgent: "GPTBot", ...publicAllow },
      { userAgent: "ChatGPT-User", ...publicAllow },
      { userAgent: "OAI-SearchBot", ...publicAllow },
      { userAgent: "ClaudeBot", ...publicAllow },
      { userAgent: "anthropic-ai", ...publicAllow },
      { userAgent: "PerplexityBot", ...publicAllow },
      { userAgent: "Google-Extended", ...publicAllow },
    ],
    sitemap: new URL("/sitemap.xml", SITE_URL).toString(),
    host: new URL(SITE_URL).host,
  };
}
