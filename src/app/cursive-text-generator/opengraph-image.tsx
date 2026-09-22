import { OG_SIZE, renderOgImage } from "@/lib/seo/og-image";
import { ogSubtitleForPath } from "@/lib/seo/specimens";

export const alt = "Cursive text generator — FancifyText";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderOgImage({
    title: "Cursive text generator",
    subtitle:
      ogSubtitleForPath(
        "/cursive-text-generator/",
        "Type a name, then copy script Unicode and the A–Z cursive alphabet",
      ) ?? "Type a name, then copy script Unicode and the A–Z cursive alphabet",
  });
}
