import {
  KAOMOJI_HUB,
  KAOMOJI_UNIQUE_COPY,
  type KaomojiUniqueCopy,
} from "@/data/kaomoji-copy";
import { isKaomojiRouteSlug } from "@/data/kaomoji-index";

function fingerprintFromUniqueCopy(copy: KaomojiUniqueCopy): string {
  const parts: string[] = [];
  if (copy.title) parts.push(copy.title);
  parts.push(copy.description);
  if (copy.canonicalLead) parts.push(copy.canonicalLead);
  if (copy.catalogNote) parts.push(copy.catalogNote);
  if (copy.meaningsHeading) parts.push(copy.meaningsHeading);
  parts.push(copy.meanings);
  if (copy.whereHeading) parts.push(copy.whereHeading);
  if (copy.whereBullets?.length) parts.push(...copy.whereBullets);
  if (copy.howToHeading) parts.push(copy.howToHeading);
  if (copy.howToSteps?.length) parts.push(...copy.howToSteps);
  if (copy.mobileNote) parts.push(copy.mobileNote);
  if (copy.emojiPickerLead) parts.push(copy.emojiPickerLead);
  if (copy.extraSections?.length) {
    parts.push(
      ...copy.extraSections.flatMap((s) => [
        s.heading,
        ...s.paragraphs,
        ...(s.bullets ?? []),
      ]),
    );
  }
  parts.push(...copy.faq.map((f) => `${f.question} ${f.answer}`));
  return parts.join(" ");
}

function fingerprintFromHub(): string {
  const hub = KAOMOJI_HUB;
  return [
    hub.introBelowHero,
    hub.editorial.heading,
    ...hub.editorial.paragraphs,
    ...hub.sections.flatMap((s) => [
      s.heading,
      ...s.paragraphs,
      ...(s.bullets ?? []),
    ]),
    ...hub.situations.map(
      (row) => `${row.situation} ${row.hint} ${row.linkLabel}`,
    ),
    ...hub.faq.map((f) => `${f.question} ${f.answer}`),
    ...Object.entries(hub.moodPreviewLeads).map(
      ([mood, lead]) => `${mood} ${lead}`,
    ),
  ].join(" ");
}

/**
 * On-page intent text for indexable kaomoji hubs and mood lists (from kaomoji-copy).
 */
export function buildKaomojiIntentFingerprint(slug: string): string {
  const normalized = slug.replace(/^\/|\/$/g, "");
  if (!isKaomojiRouteSlug(normalized)) return "";

  if (normalized === "kaomoji") {
    return fingerprintFromHub();
  }

  const copy = KAOMOJI_UNIQUE_COPY[normalized];
  if (!copy) return "";

  return fingerprintFromUniqueCopy(copy);
}

/** Indexed mood/spoke lists must explain scope vs /kaomoji/ and sibling moods. */
export function indexableKaomojiHasIntentScope(slug: string): boolean {
  if (slug === "kaomoji") return true;
  const copy = KAOMOJI_UNIQUE_COPY[slug];
  if (!copy) return false;
  const scope = `${copy.catalogNote ?? ""} ${copy.canonicalLead ?? ""}`.trim();
  return scope.length >= 40;
}
