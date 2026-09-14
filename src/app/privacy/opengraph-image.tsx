import { OG_SIZE, renderOgImage } from "@/lib/seo/og-image";

export const alt = "Privacy Policy — FancifyText";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderOgImage({
    title: "Privacy Policy",
    subtitle: "How FancifyText handles analytics, logs, and the text you type",
  });
}
