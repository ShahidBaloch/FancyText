import { OG_SIZE, renderOgImage } from "@/lib/seo/og-image";
import { ogSubtitleForPath } from "@/lib/seo/specimens";

export const alt = "Text art copy and paste";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderOgImage({
    title: "Text art copy and paste",
    subtitle:
      ogSubtitleForPath(
        "/text-art/",
        "ASCII faces and dividers — tap to copy",
      ) ?? "ASCII faces and dividers — tap to copy",
  });
}
