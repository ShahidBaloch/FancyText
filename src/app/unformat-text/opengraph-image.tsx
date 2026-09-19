import { OG_SIZE, renderOgImage } from "@/lib/seo/og-image";

export const alt = "Convert fancy text to normal";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderOgImage({
    title: "Fancy text to normal",
    subtitle: "Paste styled Unicode, get plain letters back",
  });
}
