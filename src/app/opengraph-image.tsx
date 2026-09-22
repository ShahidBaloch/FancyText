import { OG_SIZE, renderOgImage } from "@/lib/seo/og-image";
import { ogSubtitleForPath } from "@/lib/seo/specimens";

export const alt = "FancifyText — fancy text generator";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderOgImage({
    title: "Fancy text generator",
    subtitle:
      ogSubtitleForPath(
        "/",
        "Cool Unicode fonts to copy and paste for Instagram, Discord, TikTok & more",
      ) ?? "Cool Unicode fonts to copy and paste for Instagram, Discord, TikTok & more",
  });
}
