# AdSense gate (Task 8)

Ads stay **off** in production until every item below is checked. Code enforces this: `canServeAdSense()` requires both env **and** `ADS_CONSENT_READY` in `src/lib/ads/consent.ts`.

## Pre-flight checklist

| Step | Status |
|------|--------|
| `public/ads.txt` lists `google.com, pub-…, DIRECT` | File present in repo |
| Privacy (`/privacy/`) discloses Google ads + CMP for EEA/UK/CH | Done |
| **No** AdSense script in `layout` except `AdSenseProvider` | Gated component |
| **No** ads between textarea/input and first Copy (home, galleries, kaomoji tap grids are OK after the grid) | Comments in `HomePlayground`, `CollectionView`, `StyleGallery` |
| Certified CMP + IAB TCF configured for EEA/UK/CH | **Not done** — `ADS_CONSENT_READY = false` |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-…` set on deployment | Publisher sets when approved |
| Slot env e.g. `NEXT_PUBLIC_ADSENSE_SLOT_SITE_FOOTER=…` | Optional until go-live |
| `npm run check:ads` passes in CI / before release | Run manually |
| Mobile layout: see `docs/seo-responsive-qa.md` | Task 7 |
| Content depth on money pages (not thin tool-only) | SEO tasks 1–6 |

## Turning ads on (after CMP)

1. Complete CMP integration; test consent in EEA/UK/CH.
2. Set `ADS_CONSENT_READY = true` in `consent.ts` **only** after legal/CMP sign-off.
3. Set env vars on the host (Vercel etc.):
   - `NEXT_PUBLIC_ADSENSE_CLIENT_ID`
   - `NEXT_PUBLIC_ADSENSE_SLOT_SITE_FOOTER` (matches AdSense ad unit)
4. Deploy; verify one footer unit on desktop + mobile; confirm **no** unit inside `.tool-stage`.
5. Re-run `npm run check:ads`.

## Approved placements

| Zone | Component location | Env slot key |
|------|-------------------|--------------|
| `site-footer` | `SiteFooter.tsx` | `NEXT_PUBLIC_ADSENSE_SLOT_SITE_FOOTER` |

To add a zone: extend `AD_ZONES` and `AD_PLACEMENT_ALLOWLIST` in `src/lib/ads/placements.ts`, update this doc, and allowlist the file in `scripts/check-ads-gate.mjs`.

## Forbidden placements

- Inside `.tool-stage` or `.style-gallery` between input/search and `.gallery-list`
- Inside `.page-hero` / SERP specimen
- Between kaomoji grid and first instructional copy if it interrupts the primary copy action (prefer footer or post-FAQ sections)

## Commands

```bash
npm run check:ads
```
