/**
 * Consent / CMP stub — do not wire a half-installed CMP.
 *
 * Before serving Google ads to users in the EEA, UK, or Switzerland, the
 * publisher must integrate a Google-certified Consent Management Platform
 * with IAB TCF (v2.3+ as of Google’s public 1 Mar 2026 deadline) and obtain
 * the required storage / ads consent. This file is a placeholder so the
 * requirement is visible in code; it is intentionally a no-op.
 *
 * Do not load AdSense, Funding Choices, or a third-party CMP from here until
 * a certified CMP is fully configured (Google as vendor, purposes, and
 * regional gating). A broken CMP is worse than no ads.
 *
 * Related: /privacy/ discloses advertising partners and the Google partners
 * data-use link. Footer already links Privacy sitewide.
 *
 * Enable checklist: docs/seo-adsense-gate.md — set ADS_CONSENT_READY only after
 * CMP verification; run `npm run check:ads`.
 */

export const CMP_REQUIRED_REGIONS = ["EEA", "UK", "CH"] as const;

/** Always false until a certified CMP is installed and verified. */
export const ADS_CONSENT_READY = false;

export function isCertifiedCmpConfigured(): boolean {
  return ADS_CONSENT_READY;
}
