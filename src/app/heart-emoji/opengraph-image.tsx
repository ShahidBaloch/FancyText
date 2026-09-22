import { OG_SIZE, renderOgImage } from "@/lib/seo/og-image";
import { ogSubtitleForPath } from "@/lib/seo/specimens";

export const alt = "Heart emoji copy and paste";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderOgImage({
    title: "Heart emoji copy and paste",
    subtitle:
      ogSubtitleForPath("/heart-emoji/", "❤️ 💕 🥰 — tap to copy heart emoji") ??
      "❤️ 💕 🥰 — tap to copy heart emoji",
  });
}
