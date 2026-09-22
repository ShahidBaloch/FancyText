/** Site identity + canonical origin — import this instead of full `registry.ts` in layout/metadata. */

export const SITE_NAME = "FancifyText";

const DEFAULT_SITE_URL = "https://fancifytext.com";

function normalizeOrigin(raw: string | undefined): string | null {
  const value = raw?.trim();
  if (!value) return null;
  try {
    const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
    return new URL(withProtocol).origin;
  } catch {
    return null;
  }
}

/** Reject placeholder / junk values like "aaa" that break canonicals. */
function isUsableSiteOrigin(origin: string): boolean {
  try {
    const { hostname } = new URL(origin);
    if (!hostname.includes(".")) return false;
    if (hostname === "localhost" || hostname === "aaa") return false;
    if (hostname.endsWith(".vercel.app")) return false;
    return true;
  } catch {
    return false;
  }
}

/**
 * Canonical site origin used in metadata, sitemap, and JSON-LD.
 * Prefer NEXT_PUBLIC_SITE_URL; otherwise always apex (never *.vercel.app).
 */
export function resolveSiteUrl(): string {
  const fromEnv = normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL);
  if (fromEnv && isUsableSiteOrigin(fromEnv)) return fromEnv;
  return DEFAULT_SITE_URL;
}

export const SITE_URL = resolveSiteUrl();
