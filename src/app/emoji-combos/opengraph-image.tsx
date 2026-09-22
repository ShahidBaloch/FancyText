import { OG_SIZE, renderOgImage } from "@/lib/seo/og-image";
import { ogSubtitleForPath } from "@/lib/seo/specimens";

export const alt = "Emoji combos copy and paste";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderOgImage({
    title: "Emoji combos copy and paste",
    subtitle:
      ogSubtitleForPath(
        "/emoji-combos/",
        "Cute and aesthetic emoji strings — tap to copy",
      ) ?? "Cute and aesthetic emoji strings — tap to copy",
  });
}
