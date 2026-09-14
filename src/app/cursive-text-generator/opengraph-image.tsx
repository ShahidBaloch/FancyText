import { OG_SIZE, renderOgImage } from "@/lib/seo/og-image";

export const alt = "Cursive text generator — FancifyText";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderOgImage({
    title: "Cursive text generator",
    subtitle: "Script Unicode fonts and A–Z cursive letters to copy and paste",
  });
}
