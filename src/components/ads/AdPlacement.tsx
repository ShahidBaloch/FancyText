"use client";

import { useEffect, useRef } from "react";
import { ADSENSE_CLIENT_ID, canServeAdSense } from "@/lib/ads/config";
import { getAdSlotId, type AdZone } from "@/lib/ads/placements";

type AdPlacementProps = {
  zone: AdZone;
  className?: string;
};

/**
 * Renders one AdSense unit in an approved zone. Returns null when ads are gated off
 * or the slot env var is missing.
 */
export function AdPlacement({ zone, className }: AdPlacementProps) {
  const pushed = useRef(false);
  const slotId = getAdSlotId(zone);

  useEffect(() => {
    if (!canServeAdSense() || !slotId || pushed.current) return;
    try {
      (
        window as unknown as { adsbygoogle?: unknown[] }
      ).adsbygoogle = (window as unknown as { adsbygoogle?: unknown[] })
        .adsbygoogle || [];
      (
        window as unknown as { adsbygoogle: unknown[] }
      ).adsbygoogle.push({});
      pushed.current = true;
    } catch {
      // Ad blockers or CSP — fail silently
    }
  }, [slotId]);

  if (!canServeAdSense() || !slotId) return null;

  return (
    <div
      className={className ?? "ad-placement"}
      data-ad-safe-zone={zone}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
