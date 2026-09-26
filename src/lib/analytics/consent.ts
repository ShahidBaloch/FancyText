/**
 * Analytics consent — separate from AdSense CMP (src/lib/ads/consent.ts).
 *
 * GA4 uses Google Consent Mode v2: tags may load, but storage stays denied
 * until a certified CMP calls `grantAnalyticsStorage()` or you explicitly opt in
 * for deployments where analytics without a CMP is legally acceptable.
 */

/** Set true only after CMP grants analytics_storage (EEA/UK/CH) or legal sign-off. */
export const ANALYTICS_STORAGE_GRANTED_BY_CMP = false;

/**
 * When true, gtag receives analytics_storage "granted" on first load.
 * Use only outside CMP-required regions; default false.
 */
export function analyticsStorageGrantedOnLoad(): boolean {
  if (ANALYTICS_STORAGE_GRANTED_BY_CMP) return true;
  const flag = process.env.NEXT_PUBLIC_GA_CONSENT_GRANTED?.trim().toLowerCase();
  return flag === "1" || flag === "true" || flag === "granted";
}
