import { OG_SIZE, renderOgImage } from "@/lib/seo/og-image";

export const alt = "LinkedIn text formatter";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderOgImage({
    title: "LinkedIn text formatter",
    subtitle: "Bold and italic for posts, with the see-more fold shown",
  });
}
