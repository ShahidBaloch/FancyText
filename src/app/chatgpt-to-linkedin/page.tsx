import type { Metadata } from "next";
import { AiToLinkedInView } from "@/components/linkedin/AiToLinkedInView";
import { getPageByUrl } from "@/data/pages/registry";
import { pageMetadata } from "@/lib/seo/metadata";

const page = getPageByUrl("/chatgpt-to-linkedin/")!;

export const metadata: Metadata = pageMetadata(page);

export default function ChatGptToLinkedInPage() {
  return <AiToLinkedInView />;
}
