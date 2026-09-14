export type DecoratorWrap = {
  id: string;
  label: string;
  blurb: string;
  before: string;
  after: string;
};

export const DECORATOR_WRAPS: DecoratorWrap[] = [
  {
    id: "hearts",
    label: "Hearts",
    blurb: "A heart on both sides of the word.",
    before: "♥ ",
    after: " ♥",
  },
  {
    id: "outline-hearts",
    label: "Outline hearts",
    blurb: "Lighter hearts for softer bios.",
    before: "♡ ",
    after: " ♡",
  },
  {
    id: "stars",
    label: "Stars",
    blurb: "Filled stars as a simple name frame.",
    before: "★ ",
    after: " ★",
  },
  {
    id: "sparkle",
    label: "Sparkles",
    blurb: "Sparkle marks around a short nickname.",
    before: "✦ ",
    after: " ✦",
  },
  {
    id: "flowers",
    label: "Flowers",
    blurb: "Floral marks for cute or spring captions.",
    before: "❀ ",
    after: " ❀",
  },
  {
    id: "blossom",
    label: "Blossom",
    blurb: "A slightly denser flower wrap.",
    before: "✿ ",
    after: " ✿",
  },
  {
    id: "brackets",
    label: "Lenticular brackets",
    blurb: "【name】 style used in many East Asian bios.",
    before: "【",
    after: "】",
  },
  {
    id: "corner",
    label: "Corner brackets",
    blurb: "『name』 for a compact title look.",
    before: "『",
    after: "』",
  },
  {
    id: "waves",
    label: "Waves",
    blurb: "Tilde waves—keep the name short so it still fits a bio line.",
    before: "≈ ",
    after: " ≈",
  },
  {
    id: "dots",
    label: "Dot line",
    blurb: "A quiet separator wrap for stacked bios.",
    before: "· ",
    after: " ·",
  },
  {
    id: "bars",
    label: "Bars",
    blurb: "Simple pipes for lists and Discord topics.",
    before: "| ",
    after: " |",
  },
  {
    id: "music",
    label: "Music",
    blurb: "Notes around a track title or artist name.",
    before: "♪ ",
    after: " ♪",
  },
];

export const DECORATOR_FAQ = [
  {
    question: "What is a text decorator?",
    answer:
      "It wraps your words with symbols on both sides (♥ name ♥) instead of changing each letter into a different Unicode font.",
  },
  {
    question: "Is this the same as a fancy font generator?",
    answer:
      "No. Font generators map A–Z to look-alike letters. This tool leaves your letters alone and only adds frames. Combine both if you want a styled word inside a wrap.",
  },
  {
    question: "Will decorated text fit an Instagram bio?",
    answer:
      "The wrap characters count toward the 150-character limit. Use a short name. For a full multi-line bio with a counter, use the social media bio generator.",
  },
  {
    question: "Why not generate hundreds of random frames?",
    answer:
      "Most “Tai Viet / sniper / neon” wrapper pages are the same letters with a different emoji glued on. These wraps are a small, readable set you can actually paste.",
  },
];

export function wrapText(text: string, wrap: DecoratorWrap): string {
  const inner = text.trim() || "name";
  return `${wrap.before}${inner}${wrap.after}`;
}
