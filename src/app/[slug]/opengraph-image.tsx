import { getKaomojiList, kaomojiOgSubtitle } from "@/data/kaomoji";
import { getCollectionPage } from "@/data/collections";
import { getPlatformPage } from "@/data/platforms";
import { getPageByUrl } from "@/data/pages/registry";
import { getStyleSpokePage } from "@/data/style-spokes";
import { letterTitle, parseCursiveSlug } from "@/lib/fonts/cursive";
import {
  OG_SIZE,
  renderOgImage,
  titleFromRegistryTitle,
} from "@/lib/seo/og-image";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "FancifyText";

function ogTitle(slug: string): string {
  if (slug === "kaomoji") {
    const page = getPageByUrl("/kaomoji/");
    return titleFromRegistryTitle(page?.title ?? "Kaomoji copy and paste");
  }

  const kaomoji = getKaomojiList(slug);
  if (kaomoji) return titleFromRegistryTitle(kaomoji.title);

  const platform = getPlatformPage(slug);
  if (platform) return titleFromRegistryTitle(platform.title);

  const collection = getCollectionPage(slug);
  if (collection) return titleFromRegistryTitle(collection.title);

  const spoke = getStyleSpokePage(slug);
  if (spoke) return titleFromRegistryTitle(spoke.title);

  const parsed = parseCursiveSlug(slug);
  if (parsed) return titleFromRegistryTitle(letterTitle(parsed.letter, parsed.letterCase));

  return slug.replace(/-/g, " ");
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return renderOgImage({
    title: ogTitle(slug),
    subtitle: kaomojiOgSubtitle(slug),
  });
}
