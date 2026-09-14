import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideView } from "@/components/guides/GuideView";
import { GUIDE_SLUGS, getGuide } from "@/data/guides";
import { getPageByUrl } from "@/data/pages/registry";
import { pageMetadata } from "@/lib/seo/metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageByUrl(`/guides/${slug}/`);
  if (!page) return {};
  return pageMetadata(page);
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  return <GuideView config={guide} />;
}
