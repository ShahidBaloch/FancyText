import { OG_SIZE, renderOgImage } from "@/lib/seo/og-image";

export const alt = "Text decorator";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderOgImage({
    title: "Text decorator",
    subtitle: "Wrap a name in hearts, stars, flowers, or brackets",
  });
}
