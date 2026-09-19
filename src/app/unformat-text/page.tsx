import type { Metadata } from "next";
import { UnformatView } from "@/components/text/UnformatView";
import { getPageByUrl } from "@/data/pages/registry";
import { pageMetadata } from "@/lib/seo/metadata";

const page = getPageByUrl("/unformat-text/")!;

export const metadata: Metadata = pageMetadata(page);

export default function UnformatTextPage() {
  return <UnformatView />;
}
