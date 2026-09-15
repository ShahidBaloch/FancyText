import type { Metadata } from "next";
import { CaseConverterView } from "@/components/text/CaseConverterView";
import { getPageByUrl } from "@/data/pages/registry";
import { pageMetadata } from "@/lib/seo/metadata";

const page = getPageByUrl("/case-converter/")!;

export const metadata: Metadata = pageMetadata(page);

export default function CaseConverterPage() {
  return <CaseConverterView />;
}
