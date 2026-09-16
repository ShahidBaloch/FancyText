import type { Metadata } from "next";
import { BigTextView } from "@/components/text/BigTextView";
import { getPageByUrl } from "@/data/pages/registry";
import { pageMetadata } from "@/lib/seo/metadata";

const page = getPageByUrl("/big-text-generator/")!;

export const metadata: Metadata = pageMetadata(page);

export default function BigTextGeneratorPage() {
  return <BigTextView />;
}
