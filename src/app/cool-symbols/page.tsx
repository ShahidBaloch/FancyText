import type { Metadata } from "next";
import { CoolSymbolsView } from "@/components/symbols/CoolSymbolsView";
import { pageMetadata } from "@/lib/seo/metadata";
import { getPageByUrl } from "@/data/pages/registry";

const page = getPageByUrl("/cool-symbols/")!;

export const metadata: Metadata = pageMetadata(page);

export default function CoolSymbolsPage() {
  return <CoolSymbolsView />;
}
