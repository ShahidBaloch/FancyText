import { PAGES, getPageByUrl } from "@/data/pages/registry";
import {
  KAOMOJI_LISTS,
  SPECIAL_KAOMOJI,
} from "@/data/kaomoji";
import { KAOMOJI_UNIQUE_COPY, KAOMOJI_HUB_VARIANTS } from "@/data/kaomoji-copy";
import { COLLECTIONS } from "@/data/collections";
import { PLATFORMS } from "@/data/platforms";
import { EMOJI_TOPICS } from "@/data/emoji-topics";
import { GUIDES } from "@/data/guides";
import { SYMBOL_FAQ, SYMBOL_CATEGORIES } from "@/data/symbols";
import {
  CUTE_SYMBOLS_FAQ,
  CUTE_SYMBOLS_PROSE,
  CUTE_SYMBOL_CATEGORIES,
} from "@/data/cute-symbols";
import {
  AESTHETIC_SYMBOLS_FAQ,
  AESTHETIC_SYMBOLS_PROSE,
  AESTHETIC_SYMBOL_CATEGORIES,
} from "@/data/aesthetic-symbols";
import { EMOJI_COMBO_FAQ } from "@/data/emoji-combos";
import { TEXT_ART_FAQ } from "@/data/text-art";

function normalize(s: string): string {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

function bigramSimilarity(a: string, b: string): number {
  const na = normalize(a);
  const nb = normalize(b);
  if (na === nb) return 1;
  if (na.length < 2 || nb.length < 2) return na === nb ? 1 : 0;
  const bigrams = (s: string) => {
    const m = new Map<string, number>();
    for (let i = 0; i < s.length - 1; i++) {
      const bg = s.slice(i, i + 2);
      m.set(bg, (m.get(bg) ?? 0) + 1);
    }
    return m;
  };
  const ba = bigrams(na);
  const bb = bigrams(nb);
  let inter = 0;
  for (const [k, v] of ba) {
    if (bb.has(k)) inter += Math.min(v, bb.get(k)!);
  }
  const total =
    [...ba.values()].reduce((s, v) => s + v, 0) +
    [...bb.values()].reduce((s, v) => s + v, 0);
  return (2 * inter) / total;
}

function findClusters(
  items: { id: string; text: string }[],
  threshold = 0.8,
): { similarity: number; ids: string[]; sample: string }[] {
  const clusters: { similarity: number; ids: string[]; sample: string }[] = [];
  const used = new Set<number>();
  for (let i = 0; i < items.length; i++) {
    if (used.has(i)) continue;
    const group = [i];
    for (let j = i + 1; j < items.length; j++) {
      const sim = bigramSimilarity(items[i]!.text, items[j]!.text);
      if (sim >= threshold) group.push(j);
    }
    if (group.length > 1) {
      for (const idx of group) used.add(idx);
      let minSim = 1;
      for (let a = 0; a < group.length; a++) {
        for (let b = a + 1; b < group.length; b++) {
          minSim = Math.min(
            minSim,
            bigramSimilarity(
              items[group[a]!]!.text,
              items[group[b]!]!.text,
            ),
          );
        }
      }
      clusters.push({
        similarity: minSim,
        ids: group.map((idx) => items[idx]!.id),
        sample: items[group[0]!]!.text.slice(0, 120),
      });
    }
  }
  clusters.sort((a, b) => b.ids.length - a.ids.length);
  return clusters;
}

function exactDupes(items: { id: string; text: string }[]) {
  const by = new Map<string, string[]>();
  for (const { id, text } of items) {
    const key = normalize(text);
    const list = by.get(key) ?? [];
    list.push(id);
    by.set(key, list);
  }
  return [...by.entries()].filter(([, ids]) => ids.length > 1);
}

export function runAudit() {
  const report: Record<string, unknown> = {};

  const regTitles = PAGES.map((p) => ({ id: p.url, text: p.title }));
  const regDescs = PAGES.map((p) => ({ id: p.url, text: p.description }));

  report.registry = {
    pageCount: PAGES.length,
    exactDuplicateTitles: exactDupes(regTitles).map(([text, ids]) => ({
      text,
      urls: ids,
    })),
    exactDuplicateDescriptions: exactDupes(regDescs).map(([text, ids]) => ({
      text: text.slice(0, 200),
      urls: ids,
    })),
    nearDuplicateTitlesClusters80: findClusters(regTitles, 0.8),
    nearDuplicateDescriptionsClusters80: findClusters(regDescs, 0.8),
  };

  const kaomojiMismatch: {
    url: string;
    field: string;
    registry: string;
    live: string;
    similarity: number;
  }[] = [];
  const allKaomoji = [...KAOMOJI_LISTS, ...SPECIAL_KAOMOJI];
  for (const k of allKaomoji) {
    const page = getPageByUrl(`/${k.slug}/`);
    if (!page) continue;
    for (const field of ["title", "description"] as const) {
      const reg = page[field];
      const live = k[field];
      const sim = bigramSimilarity(reg, live);
      if (normalize(reg) !== normalize(live)) {
        kaomojiMismatch.push({
          url: page.url,
          field,
          registry: reg,
          live,
          similarity: Math.round(sim * 1000) / 1000,
        });
      }
    }
  }
  report.kaomojiRegistryVsLiveMeta = {
    mismatchCount: kaomojiMismatch.length,
    mismatches: kaomojiMismatch.sort((a, b) => a.similarity - b.similarity),
  };

  const liveDescs = allKaomoji.map((k) => ({
    id: `/${k.slug}/`,
    text: k.description,
    emotion: k.emotion,
    hasUniqueCopy: Boolean(KAOMOJI_UNIQUE_COPY[k.slug]),
  }));

  report.kaomojiLiveDescriptions = {
    withoutUniqueCopy: liveDescs.filter((d) => !d.hasUniqueCopy).map((d) => d.id),
    templatedShortPattern: liveDescs.filter((d) =>
      /^Copy \w+ kaomoji and \w+ text faces\.?$/.test(d.text),
    ),
    exactDuplicateLiveDescriptions: exactDupes(
      liveDescs.map(({ id, text }) => ({ id, text })),
    ),
    nearDuplicateLiveDescriptions80: findClusters(
      liveDescs.map(({ id, text }) => ({ id, text })),
      0.8,
    ),
    nearDuplicateLiveTitles80: findClusters(
      allKaomoji.map((k) => ({ id: `/${k.slug}/`, text: k.title })),
      0.8,
    ),
  };

  const genericFaqAnswer =
    "Usually. If a face shows as boxes, pick a shorter one from higher in the list.";
  const genericFaqPages: string[] = [];
  for (const k of allKaomoji) {
    const hasGeneric = k.faq.some((f) => f.answer === genericFaqAnswer);
    if (hasGeneric) genericFaqPages.push(`/${k.slug}/`);
  }
  report.kaomojiSharedFaqAnswer = {
    answer: genericFaqAnswer,
    pageCount: genericFaqPages.length,
    urls: genericFaqPages,
  };

  const meaningsTemplate = (emotion: string) =>
    `Use ${emotion} kaomojis when you want a quick ${emotion} reaction in chat without sending a sticker. They work in Discord, Instagram captions, TikTok comments, and WhatsApp because they are plain Unicode text. Pick a face that matches the tone—mild for bios, stronger for memes—and keep messages short so the emoticon stays readable.`;
  const templatedMeanings: string[] = [];
  for (const k of allKaomoji) {
    if (k.meanings === meaningsTemplate(k.emotion))
      templatedMeanings.push(`/${k.slug}/`);
  }
  report.kaomojiTemplatedMeanings = { count: 0, urls: templatedMeanings };

  type FaqItem = { page: string; question: string; answer: string };
  const allFaq: FaqItem[] = [];
  for (const c of COLLECTIONS) {
    for (const f of c.faq) allFaq.push({ page: `/${c.slug}/`, ...f });
  }
  for (const pl of PLATFORMS) {
    for (const f of pl.faq) allFaq.push({ page: `/${pl.slug}/`, ...f });
  }
  for (const k of allKaomoji) {
    for (const f of k.faq) allFaq.push({ page: `/${k.slug}/`, ...f });
  }
  for (const t of EMOJI_TOPICS) {
    for (const f of t.faq) allFaq.push({ page: `/${t.slug}/`, ...f });
  }
  for (const g of GUIDES) {
    for (const f of g.faq) allFaq.push({ page: `/guides/${g.slug}/`, ...f });
  }
  const symbolFaqs = [
    { page: "/cool-symbols/", items: SYMBOL_FAQ },
    { page: "/cute-symbols/", items: CUTE_SYMBOLS_FAQ },
    { page: "/aesthetic-symbols/", items: AESTHETIC_SYMBOLS_FAQ },
    { page: "/emoji-combos/", items: EMOJI_COMBO_FAQ },
    { page: "/text-art/", items: TEXT_ART_FAQ },
  ];
  for (const { page, items } of symbolFaqs) {
    for (const f of items) allFaq.push({ page, ...f });
  }

  const faqAnswers = allFaq.map((f) => ({
    id: `${f.page} | Q: ${f.question.slice(0, 40)}`,
    text: f.answer,
    page: f.page,
    question: f.question,
  }));
  const faqByAnswer = new Map<
    string,
    { answer: string; entries: typeof faqAnswers }
  >();
  for (const item of faqAnswers) {
    const key = normalize(item.text);
    const bucket = faqByAnswer.get(key) ?? { answer: item.text, entries: [] };
    bucket.entries.push(item);
    faqByAnswer.set(key, bucket);
  }
  const duplicateFaqAnswers = [...faqByAnswer.values()]
    .filter((b) => b.entries.length > 1)
    .map((b) => ({
      answerPreview: b.answer.slice(0, 160),
      count: b.entries.length,
      pages: [...new Set(b.entries.map((e) => e.page))],
      questions: b.entries.map((e) => ({ page: e.page, question: e.question })),
    }))
    .sort((a, b) => b.count - a.count);

  report.duplicateFaqAnswersExact = {
    totalFaqItems: allFaq.length,
    duplicateAnswerGroups: duplicateFaqAnswers.length,
    groups: duplicateFaqAnswers,
  };

  const uniqueAnswers = [...new Set(faqAnswers.map((f) => f.text))].map(
    (text, i) => ({
      id: `faq-answer-${i}`,
      text,
    }),
  );
  report.nearDuplicateFaqAnswers80 = findClusters(uniqueAnswers, 0.8);

  const hubLeads = COLLECTIONS.filter((c) => c.hubLead).map((c) => ({
    id: `/${c.slug}/`,
    text: c.hubLead!,
  }));
  report.hubLead = {
    definedOn: hubLeads,
    exactDupes: exactDupes(hubLeads),
    nearDupes80: findClusters(hubLeads, 0.8),
  };

  const galleryLeads = COLLECTIONS.filter((c) => c.galleryLead).map((c) => ({
    id: `/${c.slug}/`,
    text: c.galleryLead!,
  }));
  report.galleryLead = {
    definedOn: galleryLeads.map((g) => g.id),
    nearDupes80: findClusters(galleryLeads, 0.8),
  };

  const dividerStrings = new Map<string, string[]>();
  const collectSymbols = (
    page: string,
    categories: { symbols: string[] }[],
  ) => {
    for (const cat of categories) {
      for (const sym of cat.symbols) {
        if (sym.length > 8) {
          const list = dividerStrings.get(sym) ?? [];
          list.push(page);
          dividerStrings.set(sym, list);
        }
      }
    }
  };
  collectSymbols("/cool-symbols/", SYMBOL_CATEGORIES);
  collectSymbols("/cute-symbols/", CUTE_SYMBOL_CATEGORIES);
  collectSymbols("/aesthetic-symbols/", AESTHETIC_SYMBOL_CATEGORIES);
  report.sharedSymbolStrings = [...dividerStrings.entries()]
    .filter(([, pages]) => new Set(pages).size > 1)
    .map(([sym, pages]) => ({
      symbol: sym.slice(0, 60),
      pages: [...new Set(pages)],
    }))
    .sort((a, b) => b.pages.length - a.pages.length);

  const proseBlocks: { id: string; text: string }[] = [];
  for (const t of EMOJI_TOPICS) {
    for (const p of t.prose.paragraphs)
      proseBlocks.push({ id: `/${t.slug}/`, text: p });
  }
  proseBlocks.push({
    id: "/cute-symbols/",
    text: CUTE_SYMBOLS_PROSE.paragraphs.join(" "),
  });
  proseBlocks.push({
    id: "/aesthetic-symbols/",
    text: AESTHETIC_SYMBOLS_PROSE.paragraphs.join(" "),
  });
  report.proseNearDupes80 = findClusters(proseBlocks, 0.8);

  report.kaomojiHubVariants = {
    descriptions: Object.fromEntries(
      Object.entries(KAOMOJI_HUB_VARIANTS).map(([k, v]) => [k, v.description]),
    ),
    hubDescriptionSimilarity: (() => {
      const keys = Object.keys(KAOMOJI_HUB_VARIANTS) as (keyof typeof KAOMOJI_HUB_VARIANTS)[];
      const pairs: { a: string; b: string; sim: number }[] = [];
      for (let i = 0; i < keys.length; i++) {
        for (let j = i + 1; j < keys.length; j++) {
          const da = KAOMOJI_HUB_VARIANTS[keys[i]!]!.description;
          const db = KAOMOJI_HUB_VARIANTS[keys[j]!]!.description;
          pairs.push({
            a: `/${keys[i]}/`,
            b: `/${keys[j]}/`,
            sim: Math.round(bigramSimilarity(da, db) * 1000) / 1000,
          });
        }
      }
      return pairs;
    })(),
  };

  const kaomojiTitleSuffix = allKaomoji.filter((k) =>
    / Kaomojis Copy and Paste \| FancifyText$/.test(k.title),
  );
  report.kaomojiTitleSuffixPattern = {
    count: kaomojiTitleSuffix.length,
    urls: kaomojiTitleSuffix.map((k) => `/${k.slug}/`),
  };

  return report;
}
