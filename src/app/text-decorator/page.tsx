import type { Metadata } from "next";
import { TextDecoratorView } from "@/components/decorator/TextDecoratorView";
import { pageMetadata } from "@/lib/seo/metadata";
import { getPageByUrl } from "@/data/pages/registry";

const page = getPageByUrl("/text-decorator/")!;

export const metadata: Metadata = pageMetadata(page);

export default function TextDecoratorPage() {
  return <TextDecoratorView />;
}
