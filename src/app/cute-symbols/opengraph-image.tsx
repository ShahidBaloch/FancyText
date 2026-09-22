import { OG_SIZE, renderOgImage } from "@/lib/seo/og-image";
import { ogSubtitleForPath } from "@/lib/seo/specimens";

export const alt = "Cute symbols copy and paste";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderOgImage({
    title: "Cute symbols copy and paste",
    subtitle:
      ogSubtitleForPath(
        "/cute-symbols/",
        "Hearts, stars, and kawaii marks for bios",
      ) ?? "Hearts, stars, and kawaii marks for bios",
  });
}
