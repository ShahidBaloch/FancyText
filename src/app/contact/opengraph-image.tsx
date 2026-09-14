import { OG_SIZE, renderOgImage } from "@/lib/seo/og-image";

export const alt = "Contact FancifyText";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderOgImage({
    title: "Contact FancifyText",
    subtitle: "Email or a short query form",
  });
}
