import {
  AESTHETIC_SYMBOLS_FAQ,
  AESTHETIC_SYMBOLS_PROSE,
} from "@/data/aesthetic-symbols";
import { getCollection } from "@/data/collections";
import {
  CUTE_SYMBOLS_FAQ,
  CUTE_SYMBOLS_PROSE,
} from "@/data/cute-symbols";
import {
  EMOJI_COMBO_FAQ,
  EMOJI_COMBO_PROSE,
} from "@/data/emoji-combos";
import { getEmojiTopic } from "@/data/emoji-topics";
import { getGuide } from "@/data/guides";
import { getPlatform } from "@/data/platforms";
import { SYMBOL_CATEGORIES, SYMBOL_FAQ } from "@/data/symbols";
import { getStyleSpoke } from "@/data/style-spokes";
import { TEXT_ART_FAQ, TEXT_ART_PROSE } from "@/data/text-art";
import { buildKaomojiIntentFingerprint } from "@/lib/seo/kaomoji-intent-fingerprint";

/**
 * Visible, page-specific copy Google should treat as the “main content” signal
 * (not shared nav/footer). Used for uniqueness and intent checks.
 */
export function buildOnPageIntentFingerprint(path: string): string {
  const slug = path.replace(/^\/|\/$/g, "");
  const parts: string[] = [];

  const collection = getCollection(slug);
  if (collection) {
    if (collection.difference) {
      parts.push(collection.difference.heading, collection.difference.body);
    }
    if (collection.usesHeading) parts.push(collection.usesHeading);
    parts.push(...collection.uses);
    if (collection.buckets) {
      parts.push(...collection.buckets.map((b) => `${b.heading} ${b.body}`));
    }
    if (collection.hubCards) {
      parts.push(...collection.hubCards.map((c) => `${c.title} ${c.body}`));
    }
    parts.push(collection.styleIds.join(" "));
    parts.push(
      ...collection.faq.slice(0, 4).map((f) => `${f.question} ${f.answer}`),
    );
    return parts.join(" ");
  }

  const spoke = getStyleSpoke(slug);
  if (spoke) {
    if (spoke.difference) {
      parts.push(spoke.difference.heading, spoke.difference.body);
    }
    parts.push(spoke.styleId, ...spoke.styleIds);
    parts.push(...spoke.compatibilityNotes);
    parts.push(...spoke.uses);
    if (spoke.variants) {
      parts.push(...spoke.variants.map((v) => `${v.name} ${v.blurb}`));
    }
    parts.push(
      ...spoke.faq.slice(0, 3).map((f) => `${f.question} ${f.answer}`),
    );
    return parts.join(" ");
  }

  const platform = getPlatform(slug);
  if (platform) {
    if (platform.fieldsLead) parts.push(platform.fieldsLead);
    if (platform.fields) {
      parts.push(
        ...platform.fields.map(
          (f) => `${f.name} ${f.unicode} ${f.limit ?? ""} ${f.note}`,
        ),
      );
    }
    parts.push(...platform.uses);
    if (platform.extraSections) {
      parts.push(
        ...platform.extraSections.flatMap((s) => [
          s.heading,
          ...(s.paragraphs ?? []),
          ...(s.bullets ?? []),
        ]),
      );
    }
    parts.push(
      ...platform.faq.slice(0, 4).map((f) => `${f.question} ${f.answer}`),
    );
    return parts.join(" ");
  }

  const emoji = getEmojiTopic(slug);
  if (emoji) {
    return [
      emoji.h1,
      emoji.prose.heading,
      ...emoji.prose.paragraphs,
      ...emoji.faq.map((f) => `${f.question} ${f.answer}`),
    ].join(" ");
  }

  const guideMatch = path.match(/^\/guides\/([^/]+)\/?$/);
  if (guideMatch) {
    const guide = getGuide(guideMatch[1]);
    if (guide) {
      return [
        guide.h1,
        ...guide.sections.flatMap((s) => [s.heading, ...s.body]),
        ...guide.faq.map((f) => `${f.question} ${f.answer}`),
      ].join(" ");
    }
  }

  if (slug === "text-art") {
    return [
      TEXT_ART_PROSE.heading,
      ...TEXT_ART_PROSE.paragraphs,
      ...TEXT_ART_FAQ.map((f) => `${f.question} ${f.answer}`),
    ].join(" ");
  }

  if (slug === "cool-symbols") {
    return [
      ...SYMBOL_CATEGORIES.map((c) => `${c.heading} ${c.blurb}`),
      ...SYMBOL_FAQ.map((f) => `${f.question} ${f.answer}`),
    ].join(" ");
  }

  if (slug === "cute-symbols") {
    return [
      CUTE_SYMBOLS_PROSE.heading,
      ...CUTE_SYMBOLS_PROSE.paragraphs,
      ...CUTE_SYMBOLS_FAQ.map((f) => `${f.question} ${f.answer}`),
    ].join(" ");
  }

  if (slug === "aesthetic-symbols") {
    return [
      AESTHETIC_SYMBOLS_PROSE.heading,
      ...AESTHETIC_SYMBOLS_PROSE.paragraphs,
      ...AESTHETIC_SYMBOLS_FAQ.map((f) => `${f.question} ${f.answer}`),
    ].join(" ");
  }

  if (slug === "emoji-combos") {
    return [
      EMOJI_COMBO_PROSE.heading,
      ...EMOJI_COMBO_PROSE.paragraphs,
      ...EMOJI_COMBO_FAQ.map((f) => `${f.question} ${f.answer}`),
    ].join(" ");
  }

  const kaomojiFingerprint = buildKaomojiIntentFingerprint(slug);
  if (kaomojiFingerprint) {
    return kaomojiFingerprint;
  }

  return "";
}
