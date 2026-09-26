import {
  isKaomojiRouteSlug,
  kaomojiPathIsIndexable,
} from "@/data/kaomoji-index";
import {
  buildKaomojiIntentFingerprint,
  indexableKaomojiHasIntentScope,
} from "@/lib/seo/kaomoji-intent-fingerprint";
import { getCollection } from "@/data/collections";
import { getPlatform } from "@/data/platforms";
import { getLivePages, type PageEntry } from "@/data/pages/registry";
import { getStyleSpoke } from "@/data/style-spokes";
import { getEmojiTopic } from "@/data/emoji-topics";
import { getGuide } from "@/data/guides";
import { buildOnPageIntentFingerprint } from "@/lib/seo/page-intent-fingerprint";

const MIN_DIFFERENCE_CHARS = 60;
const MIN_ON_PAGE_FINGERPRINT_CHARS = 120;

function isIndexablePage(page: PageEntry): boolean {
  if (page.index === false) return false;
  return kaomojiPathIsIndexable(page.url);
}

/**
 * People-first checks: each indexable URL must ship a distinct on-page job,
 * not only a unique meta keyword (Google helpful content / scaled-content guard).
 */
export function runUserIntentFulfillmentCheck(): void {
  for (const page of getLivePages()) {
    if (!isIndexablePage(page)) continue;

    const slug = page.url.replace(/^\/|\/$/g, "");
    const fingerprint = buildOnPageIntentFingerprint(page.url).trim();

    const collection = getCollection(slug);
    const spoke = getStyleSpoke(slug);
    const platform = getPlatform(slug);

    if (collection && collection.styleIds.length > 0) {
      const diff = collection.difference?.body?.trim() ?? "";
      if (diff.length < MIN_DIFFERENCE_CHARS) {
        throw new Error(
          `User intent: ${page.url} is a filtered collection but missing a substantive difference block — explain how it differs from the homepage hub`,
        );
      }
    }

    if (spoke && !spoke.showGallery) {
      const diff = spoke.difference?.body?.trim() ?? "";
      const spokeRichEnough =
        diff.length >= MIN_DIFFERENCE_CHARS ||
        (spoke.compatibilityNotes.length >= 3 &&
          spoke.faq.length >= 4 &&
          spoke.uses.length >= 2);
      if (!spokeRichEnough) {
        throw new Error(
          `User intent: ${page.url} style spoke needs difference copy or deeper FAQ/compat notes vs overlapping tools`,
        );
      }
    }

    if (platform) {
      if (platform.toolType === "fonts") {
        if (!platform.fields?.length || platform.fields.length < 2) {
          throw new Error(
            `User intent: ${page.url} platform font page needs a “where fonts work” field table (limits + @handle rules)`,
          );
        }
      } else if (platform.toolType === "discord-color") {
        if (!platform.colorCodes) {
          throw new Error(
            `User intent: ${page.url} Discord color page must expose ANSI color codes`,
          );
        }
      } else if (
        platform.toolType === "bio-builder" ||
        platform.toolType === "html-rich"
      ) {
        if (!platform.extraSections?.length && platform.faq.length < 3) {
          throw new Error(
            `User intent: ${page.url} needs extraSections or richer FAQ for its distinct tool type`,
          );
        }
      }
    }

    if (page.intentClusterRole === "supporting") {
      const diff =
        collection?.difference?.body?.trim() ??
        spoke?.difference?.body?.trim() ??
        "";
      if (diff.length < MIN_DIFFERENCE_CHARS) {
        throw new Error(
          `User intent: ${page.url} is a supporting spoke in an intent cluster — difference copy must state the specialized job vs ${page.intentCluster ?? "cluster owner"}`,
        );
      }
    }

    const guideMatch = page.url.match(/^\/guides\/([^/]+)\/?$/);
    const guideConfig = guideMatch ? getGuide(guideMatch[1]) : undefined;

    const indexableKaomoji =
      isKaomojiRouteSlug(slug) && kaomojiPathIsIndexable(page.url);

    if (indexableKaomoji) {
      if (!buildKaomojiIntentFingerprint(slug).trim()) {
        throw new Error(
          `User intent: ${page.url} is indexable kaomoji but missing KAOMOJI_UNIQUE_COPY / hub prose in kaomoji-copy.ts`,
        );
      }
      if (!indexableKaomojiHasIntentScope(slug)) {
        throw new Error(
          `User intent: ${page.url} needs catalogNote or canonicalLead in kaomoji-copy.ts (mood scope vs hub/siblings)`,
        );
      }
    }

    const needsRichBody =
      collection ||
      spoke ||
      platform ||
      guideConfig ||
      getEmojiTopic(slug) ||
      indexableKaomoji;
    if (needsRichBody && page.url !== "/" && fingerprint.length < MIN_ON_PAGE_FINGERPRINT_CHARS) {
      throw new Error(
        `User intent: ${page.url} on-page fingerprint too thin (${fingerprint.length} chars) — add FAQ, uses, or platform/collection copy`,
      );
    }
  }
}
