import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionView } from "@/components/collection/CollectionView";
import { CursiveLetterView } from "@/components/cursive/CursiveLetterView";
import {
  KaomojiHubView,
  KaomojiListView,
} from "@/components/kaomoji/KaomojiView";
import { PlatformView } from "@/components/platform/PlatformView";
import { StyleSpokeView } from "@/components/style/StyleSpokeView";
import {
  COLLECTION_SLUGS,
  getCollection,
  getCollectionPage,
} from "@/data/collections";
import {
  KAOMOJI_HUB_SLUGS,
  KAOMOJI_SLUGS,
  getKaomojiHubSerpForMetadata,
  getKaomojiList,
  getKaomojiListSerpForMetadata,
  isKaomojiHubSlug,
  kaomojiHubCanonicalPath,
  kaomojiPathIsIndexable,
} from "@/data/kaomoji";
import {
  PLATFORM_SLUGS,
  getPlatform,
  getPlatformPage,
} from "@/data/platforms";
import { SITE_NAME, SITE_URL, getPageByUrl } from "@/data/pages/registry";
import {
  getStyleSpoke,
  getStyleSpokePage,
  STYLE_SPOKE_SLUGS,
} from "@/data/style-spokes";
import { LETTERS, parseCursiveSlug } from "@/lib/fonts/cursive";
import { cursiveLetterMetadata, pageMetadata } from "@/lib/seo/metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const cursive = LETTERS.flatMap((letter) => [
    { slug: `cursive-capital-${letter}` },
    { slug: `cursive-small-${letter}` },
  ]);
  const spokes = STYLE_SPOKE_SLUGS.map((slug) => ({ slug }));
  const collections = COLLECTION_SLUGS.map((slug) => ({ slug }));
  const platforms = PLATFORM_SLUGS.map((slug) => ({ slug }));
  const kaomoji = [...KAOMOJI_HUB_SLUGS, ...KAOMOJI_SLUGS].map((slug) => ({
    slug,
  }));
  return [...cursive, ...spokes, ...collections, ...platforms, ...kaomoji];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!slug) return {};

  if (isKaomojiHubSlug(slug)) {
    const serp = getKaomojiHubSerpForMetadata(slug);
    const page = getPageByUrl(`/${slug}/`);
    if (page) {
      return pageMetadata(
        {
          ...page,
          title: serp.title,
          description: serp.description,
        },
        { canonicalPath: kaomojiHubCanonicalPath(slug) },
      );
    }
  }

  const kaomoji = getKaomojiList(slug);
  if (kaomoji) {
    const page = getPageByUrl(`/${slug}/`);
    const noindex = !kaomojiPathIsIndexable(slug);
    const serp = getKaomojiListSerpForMetadata(slug);
    const title = serp?.title ?? kaomoji.title;
    const description = serp?.description ?? kaomoji.description;
    const socialDescription = serp?.socialDescription ?? description;
    if (page) {
      return pageMetadata(
        {
          ...page,
          title,
          description,
          ...(noindex ? { index: false } : {}),
        },
        { socialDescription },
      );
    }
    const canonical = new URL(`/${slug}/`, SITE_URL).toString();
    return {
      title: { absolute: title },
      description,
      ...(noindex ? { robots: { index: false, follow: true } } : {}),
      alternates: { canonical },
      openGraph: {
        title,
        description: socialDescription,
        url: canonical,
        siteName: SITE_NAME,
        type: "website",
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description: socialDescription,
      },
    };
  }

  const platform = getPlatform(slug);
  if (platform) {
    const page = getPlatformPage(slug);
    if (page) return pageMetadata(page);
  }

  const collection = getCollection(slug);
  if (collection) {
    const page = getCollectionPage(slug);
    if (page) return pageMetadata(page);
  }

  const spoke = getStyleSpoke(slug);
  if (spoke) {
    const page = getStyleSpokePage(slug);
    if (page) return pageMetadata(page);
  }

  const parsed = parseCursiveSlug(slug);
  if (!parsed) return {};
  return cursiveLetterMetadata(parsed.letter, parsed.letterCase);
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;
  if (!slug) notFound();

  if (isKaomojiHubSlug(slug)) {
    return <KaomojiHubView hubSlug={slug} />;
  }

  const kaomoji = getKaomojiList(slug);
  if (kaomoji) {
    return <KaomojiListView config={kaomoji} />;
  }

  const platform = getPlatform(slug);
  if (platform) {
    return <PlatformView config={platform} />;
  }

  const collection = getCollection(slug);
  if (collection) {
    return <CollectionView config={collection} />;
  }

  const spoke = getStyleSpoke(slug);
  if (spoke) {
    return <StyleSpokeView config={spoke} />;
  }

  const parsed = parseCursiveSlug(slug);
  if (!parsed) notFound();

  return (
    <CursiveLetterView
      letter={parsed.letter}
      letterCase={parsed.letterCase}
    />
  );
}
