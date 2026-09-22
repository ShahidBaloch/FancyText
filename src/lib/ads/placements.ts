/**
 * Where AdSense units may be mounted. Enforced by scripts/check-ads-gate.mjs.
 *
 * Forbidden (policy + UX):
 * - Inside `.tool-stage` or between a textarea/input and the first Copy control
 * - Between StyleGallery input/search and `.gallery-list`
 * - Inside `.page-hero` or SERP specimen blocks
 */

export const AD_ZONES = ["site-footer"] as const;

export type AdZone = (typeof AD_ZONES)[number];

/** Files allowed to mount the AdPlacement component (keep in sync with check-ads-gate.mjs). */
export const AD_PLACEMENT_ALLOWLIST = [
  "src/components/layout/SiteFooter.tsx",
] as const;

export function isAdZone(value: string): value is AdZone {
  return (AD_ZONES as readonly string[]).includes(value);
}

export function adSlotEnvKey(zone: AdZone): string {
  return `NEXT_PUBLIC_ADSENSE_SLOT_${zone.replace(/-/g, "_").toUpperCase()}`;
}

export function getAdSlotId(zone: AdZone): string | undefined {
  const key = adSlotEnvKey(zone);
  const raw = process.env[key]?.trim();
  return raw || undefined;
}
