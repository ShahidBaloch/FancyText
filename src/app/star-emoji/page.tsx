import type { Metadata } from "next";
import { EmojiTopicView } from "@/components/emoji/EmojiTopicView";
import { getEmojiTopic } from "@/data/emoji-topics";
import { getPageByUrl } from "@/data/pages/registry";
import { pageMetadata } from "@/lib/seo/metadata";

const config = getEmojiTopic("star-emoji")!;
const page = getPageByUrl("/star-emoji/")!;

export const metadata: Metadata = pageMetadata(page);

export default function StarEmojiPage() {
  return <EmojiTopicView config={config} />;
}
