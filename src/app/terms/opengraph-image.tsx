import { OG_SIZE, renderOgImage } from "@/lib/seo/og-image";

export const alt = "Terms of Use — FancifyText";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderOgImage({
    title: "Terms of Use",
    subtitle: "Simple rules for using the free Unicode fancy text generator",
  });
}
