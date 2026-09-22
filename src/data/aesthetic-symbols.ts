import type { SymbolCategory } from "@/data/symbols";

export const AESTHETIC_SYMBOL_CATEGORIES: SymbolCategory[] = [
  {
    id: "stars",
    heading: "Aesthetic stars & moons",
    blurb: "Minimal sky motifs for dark or soft bios. Works with aesthetic fonts (fullwidth script), not bubble cute fonts.",
    symbols: ["⋆", "✦", "✧", "☆", "★", "✩", "🌙", "🌑", "🌒", "🌕", "💫", "🌌"],
  },
  {
    id: "dividers",
    heading: "Aesthetic dividers",
    blurb: "Line breaks for Carrd, Linktree, and Discord about-me sections.",
    symbols: [
      "──────────",
      "┈┈┈┈┈┈┈┈┈┈",
      "· · ─ ·✧· ─ · ·",
      "⋆｡°✩",
      "✧･ﾟ: *✧",
      "───── ⋆⋅☆⋅⋆ ─────",
      "˚ ༘♡ ⋆｡˚ ♡ ˚｡⋆ ༘˚",
      "▁ ▂ ▄ ▅ ▆ ▇",
    ],
  },
  {
    id: "brackets",
    heading: "Fullwidth & book brackets",
    blurb: "Wide punctuation that reads “aesthetic” next to lowercase bios.",
    symbols: ["【", "】", "『", "』", "「", "」", "〖", "〗", "《", "》", "〈", "〉"],
  },
  {
    id: "music",
    heading: "Music & vibe",
    blurb: "Notes and media marks for playlist bios.",
    symbols: ["♪", "♫", "♬", "♩", "♭", "♯", "🎧", "📼", "💿", "🎵", "🎶"],
  },
  {
    id: "arrows",
    heading: "Thin arrows",
    blurb: "Point to links without heavy emoji color.",
    symbols: ["→", "←", "↠", "↞", "⇢", "⇠", "⟶", "⟵", "➳", "➵", "➸", "➺"],
  },
  {
    id: "misc",
    heading: "Misc aesthetic marks",
    blurb: "Checks, circles, and corners for layout-heavy bios.",
    symbols: ["✓", "✔", "○", "●", "◯", "◉", "▢", "▣", "▤", "▥", "▦", "▧", "▨", "▩"],
  },
];

export const AESTHETIC_SYMBOLS_FAQ = [
  {
    question: "What are aesthetic symbols copy and paste?",
    answer:
      "Decorative Unicode marks—stars, dividers, brackets—for soft or dark bios. They are not aesthetic fonts (fullwidth letters); those live on aesthetic fonts.",
  },
  {
    question: "Aesthetic symbols vs aesthetic emoji combos?",
    answer:
      "Symbols here are mostly text glyphs (⋆, ───). Emoji combos use picture emoji like 🌙✨. Mix both in one bio if you stay under character limits.",
  },
  {
    question: "Why separate from cute symbols?",
    answer:
      "Cute symbols targets kawaii hearts and 🌸. This page targets minimal dividers and moon/star layouts searchers label “aesthetic.”",
  },
  {
    question: "Do these work on Discord?",
    answer:
      "Yes in messages and about-me fields. Very long divider lines may wrap on mobile—copy a shorter divider if needed.",
  },
];

export const AESTHETIC_SYMBOLS_PROSE = {
  id: "aesthetic-symbols-explainer",
  heading: "Aesthetic symbols vs aesthetic fonts",
  paragraphs: [
    "Aesthetic symbols are single characters or short lines you paste around plain text. Aesthetic fonts reshape every letter into fullwidth or script Unicode. Use symbols for dividers; use the aesthetic fonts page when the whole word should look wide and soft.",
  ],
};
