import type { Metadata } from "next";
import { EmojiCombosView } from "@/components/emoji/EmojiCombosView";
import { getPageByUrl } from "@/data/pages/registry";
import { pageMetadata } from "@/lib/seo/metadata";

const page = getPageByUrl("/emoji-combos/")!;

export const metadata: Metadata = pageMetadata(page);

export default function EmojiCombosPage() {
  return <EmojiCombosView />;
}
