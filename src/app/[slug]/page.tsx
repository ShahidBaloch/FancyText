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
  KAOMOJI_SLUGS,
  getKaomojiList,
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
import {
  LETTERS,
  isLetter,
  letterDescription,
  letterTitle,
  type Letter,
  type LetterCase,
} from "@/lib/fonts/cursive";
import { pageMetadata } from "@/lib/seo/metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

type ParsedCursive = { kind: "cursive"; letter: Letter; letterCase: LetterCase };

function parseCursiveSlug(slug: string): ParsedCursive | null {
  const capital = /^cursive-capital-([a-z])$/i.exec(slug);
  if (capital && isLetter(capital[1].toLowerCase())) {
    return {
      kind: "cursive",
      letter: capital[1].toLowerCase() as Letter,
      letterCase: "capital",
    };
  }
  const small = /^cursive-small-([a-z])$/i.exec(slug);
  if (small && isLetter(small[1].toLowerCase())) {
    return {
      kind: "cursive",
      letter: small[1].toLowerCase() as Letter,
      letterCase: "small",
    };
  }
  return null;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const cursive = LETTERS.flatMap((letter) => [
    { slug: `cursive-capital-${letter}` },
    { slug: `cursive-small-${letter}` },
  ]);
  const spokes = STYLE_SPOKE_SLUGS.map((slug) => ({ slug }));
  const collections = COLLECTION_SLUGS.map((slug) => ({ slug }));
  const platforms = PLATFORM_SLUGS.map((slug) => ({ slug }));
  const kaomoji = ["kaomoji", ...KAOMOJI_SLUGS].map((slug) => ({ slug }));
  return [...cursive, ...spokes, ...collections, ...platforms, ...kaomoji];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!slug) return {};

  if (slug === "kaomoji") {
    const page = getPageByUrl("/kaomoji/");
    if (page) return pageMetadata(page);
  }

  const kaomoji = getKaomojiList(slug);
  if (kaomoji) {
    const page = getPageByUrl(`/${slug}/`);
    if (page) {
      return pageMetadata({
        ...page,
        title: kaomoji.title,
        description: kaomoji.description,
      });
    }
    const canonical = new URL(`/${slug}/`, SITE_URL).toString();
    return {
      title: { absolute: kaomoji.title },
      description: kaomoji.description,
      alternates: { canonical },
      openGraph: {
        title: kaomoji.title,
        description: kaomoji.description,
        url: canonical,
        siteName: SITE_NAME,
        type: "website",
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: kaomoji.title,
        description: kaomoji.description,
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
  const title = letterTitle(parsed.letter, parsed.letterCase);
  const description = letterDescription(parsed.letter, parsed.letterCase);
  const canonical = new URL(`/${slug}/`, SITE_URL).toString();
  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;
  if (!slug) notFound();

  if (slug === "kaomoji") {
    return <KaomojiHubView />;
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
