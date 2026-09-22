/**
 * Google Search Console + AdSense alignment (publisher-side).
 * Automated checks: scripts/check-google-policy.mjs
 */
import {
  ADS_CONSENT_READY,
  isCertifiedCmpConfigured,
} from "@/lib/ads/consent";

/** Must stay true until a certified CMP is live (EEA/UK/CH ads). */
export const ADSENSE_REQUIRES_CERTIFIED_CMP = true;

/** AdSense / Google policy: no units between primary input and first Copy control. */
export const AD_PLACEMENT_FORBIDDEN_ZONES = [
  "between-text-input-and-first-copy",
] as const;

/** Trust URLs required for AdSense review + GSC transparency. */
export const GOOGLE_TRUST_PATHS = [
  "/about/",
  "/contact/",
  "/privacy/",
  "/terms/",
] as const;

export const GOOGLE_ADS_PUBLISHER_ID = "pub-1493183147218727";

/**
 * Single gate for any future AdSense / GPT script loader.
 * Do not load ads when false (current production default).
 */
export function mayLoadGoogleAds(): boolean {
  if (!isCertifiedCmpConfigured()) return false;
  if (ADSENSE_REQUIRES_CERTIFIED_CMP && !ADS_CONSENT_READY) return false;
  return true;
}
