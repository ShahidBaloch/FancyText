import { OG_SIZE, renderOgImage } from "@/lib/seo/og-image";
import { ogSubtitleForPath } from "@/lib/seo/specimens";

export const alt = "Aesthetic symbols copy and paste";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderOgImage({
    title: "Aesthetic symbols copy and paste",
    subtitle:
      ogSubtitleForPath(
        "/aesthetic-symbols/",
        "Dividers, moons, and minimal marks",
      ) ?? "Dividers, moons, and minimal marks",
  });
}
