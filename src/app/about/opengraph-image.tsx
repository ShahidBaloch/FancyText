import { OG_SIZE, renderOgImage } from "@/lib/seo/og-image";

export const alt = "About FancifyText";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderOgImage({
    title: "About FancifyText",
    subtitle: "Free Unicode fancy text tools for bios, nicknames, and captions",
  });
}
