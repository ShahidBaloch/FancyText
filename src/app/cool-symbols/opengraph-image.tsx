import { OG_SIZE, renderOgImage } from "@/lib/seo/og-image";

export const alt = "Cool symbols copy and paste";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderOgImage({
    title: "Cool symbols copy and paste",
    subtitle: "Stars, arrows, hearts, and marks for bios — not letter fonts",
  });
}
