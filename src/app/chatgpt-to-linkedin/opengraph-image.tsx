import { OG_SIZE, renderOgImage } from "@/lib/seo/og-image";

export const alt = "ChatGPT to LinkedIn formatter";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderOgImage({
    title: "ChatGPT to LinkedIn",
    subtitle: "Turn Markdown from any AI into a LinkedIn-ready post",
  });
}
