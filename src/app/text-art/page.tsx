import type { Metadata } from "next";
import { TextArtView } from "@/components/text-art/TextArtView";
import { getPageByUrl } from "@/data/pages/registry";
import { pageMetadata } from "@/lib/seo/metadata";

const page = getPageByUrl("/text-art/")!;

export const metadata: Metadata = pageMetadata(page);

export default function TextArtPage() {
  return <TextArtView />;
}
