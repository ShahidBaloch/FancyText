import type { Metadata } from "next";
import { LinkedInFormatterView } from "@/components/linkedin/LinkedInFormatterView";
import { getPageByUrl } from "@/data/pages/registry";
import { pageMetadata } from "@/lib/seo/metadata";

const page = getPageByUrl("/linkedin-text-formatter/")!;

export const metadata: Metadata = pageMetadata(page);

export default function LinkedInTextFormatterPage() {
  return <LinkedInFormatterView />;
}
