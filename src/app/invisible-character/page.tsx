import type { Metadata } from "next";
import { InvisibleTextView } from "@/components/invisible/InvisibleTextView";
import { getPageByUrl } from "@/data/pages/registry";
import { pageMetadata } from "@/lib/seo/metadata";

const page = getPageByUrl("/invisible-character/")!;

export const metadata: Metadata = pageMetadata(page);

export default function InvisibleCharacterPage() {
  return <InvisibleTextView />;
}
