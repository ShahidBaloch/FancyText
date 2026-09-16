import { OG_SIZE, renderOgImage } from "@/lib/seo/og-image";

export const alt = "Big text generator";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderOgImage({
    title: "Big text generator",
    subtitle: "Copy huge ASCII letters for Discord, comments, and banners",
  });
}
