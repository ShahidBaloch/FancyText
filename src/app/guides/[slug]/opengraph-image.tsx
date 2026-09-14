import { getGuide } from "@/data/guides";
import { getPageByUrl } from "@/data/pages/registry";
import {
  OG_SIZE,
  renderOgImage,
  titleFromRegistryTitle,
} from "@/lib/seo/og-image";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "FancifyText guide";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getPageByUrl(`/guides/${slug}/`);
  const guide = getGuide(slug);
  const title = page
    ? titleFromRegistryTitle(page.title)
    : (guide?.h1 ?? "Guide");
  return renderOgImage({ title });
}
