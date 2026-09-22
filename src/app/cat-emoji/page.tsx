import type { Metadata } from "next";
import { EmojiTopicView } from "@/components/emoji/EmojiTopicView";
import { getEmojiTopic } from "@/data/emoji-topics";
import { getPageByUrl } from "@/data/pages/registry";
import { pageMetadata } from "@/lib/seo/metadata";

const config = getEmojiTopic("cat-emoji")!;
const page = getPageByUrl("/cat-emoji/")!;

export const metadata: Metadata = pageMetadata(page);

export default function CatEmojiPage() {
  return <EmojiTopicView config={config} />;
}
