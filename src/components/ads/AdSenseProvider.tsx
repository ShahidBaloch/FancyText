import Script from "next/script";
import { ADSENSE_CLIENT_ID, canServeAdSense } from "@/lib/ads/config";

/**
 * Loads the AdSense script once. Renders nothing until env + CMP gate pass.
 * Do not add a second loader elsewhere — check-ads-gate.mjs enforces this.
 */
export function AdSenseProvider() {
  if (!canServeAdSense()) return null;

  return (
    <Script
      id="adsense-init"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
      strategy="lazyOnload"
    />
  );
}
