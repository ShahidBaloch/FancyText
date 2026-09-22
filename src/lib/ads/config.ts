/**
 * AdSense is opt-in via env and blocked until a certified CMP is verified.
 * See docs/seo-adsense-gate.md and src/lib/ads/consent.ts.
 */

import { isCertifiedCmpConfigured } from "@/lib/ads/consent";

const CLIENT_RAW = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim() ?? "";

/** Publisher ID from ads.txt / AdSense (ca-pub-XXXXXXXX). */
export const ADSENSE_CLIENT_ID = CLIENT_RAW;

export function isAdSenseClientConfigured(): boolean {
  return /^ca-pub-\d+$/.test(ADSENSE_CLIENT_ID);
}

/** True only when publisher ID is set and CMP gate passes. */
export function canServeAdSense(): boolean {
  return isAdSenseClientConfigured() && isCertifiedCmpConfigured();
}
