import { OG_SIZE, renderOgImage } from "@/lib/seo/og-image";
import { ogSubtitleForPath } from "@/lib/seo/specimens";

export const alt = "Star emoji copy and paste";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderOgImage({
    title: "Star emoji copy and paste",
    subtitle:
      ogSubtitleForPath("/star-emoji/", "⭐ 🌟 ✨ — tap to copy star emoji") ??
      "⭐ 🌟 ✨ — tap to copy star emoji",
  });
}
