import { OG_SIZE, renderOgImage } from "@/lib/seo/og-image";
import { ogSubtitleForPath } from "@/lib/seo/specimens";

export const alt = "Cat emoji copy and paste";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderOgImage({
    title: "Cat emoji copy and paste",
    subtitle:
      ogSubtitleForPath("/cat-emoji/", "🐱 😺 🐾 — tap to copy cat emoji") ??
      "🐱 😺 🐾 — tap to copy cat emoji",
  });
}
