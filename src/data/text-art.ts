export type TextArtPiece = {
  id: string;
  title: string;
  /** Plain-text ASCII / Unicode art; copied as-is. */
  art: string;
};

export const TEXT_ART_PIECES: TextArtPiece[] = [
  {
    id: "heart-small",
    title: "Small heart",
    art: "♡",
  },
  {
    id: "heart-line",
    title: "Heart divider",
    art: "♡ ─── ♡ ─── ♡",
  },
  {
    id: "cat-small",
    title: "Cat face (compact)",
    art: "(=^･ω･^=)",
  },
  {
    id: "bear",
    title: "Bear",
    art: "ʕ•ᴥ•ʔ",
  },
  {
    id: "shrug",
    title: "Shrug",
    art: "¯\\_(ツ)_/¯",
  },
  {
    id: "table-flip",
    title: "Table flip",
    art: "(╯°□°）╯︵ ┻━┻",
  },
  {
    id: "sparkle-line",
    title: "Sparkle line",
    art: "⋆ ˚｡⋆୨୧˚",
  },
  {
    id: "star-face",
    title: "Star frame face",
    art: "☆(｡◕‿◕｡)☆",
  },
  {
    id: "bunny-ears",
    title: "Bunny ears",
    art: "(\\(\\\n( -.-)\no_(\"|(\")",
  },
  {
    id: "fish",
    title: "Fish",
    art: "><((((º>",
  },
  {
    id: "flowers",
    title: "Flower marks",
    art: "✿ ✽ ✾",
  },
  {
    id: "wave",
    title: "Wave",
    art: "＼(^o^)／",
  },
  {
    id: "sleep",
    title: "Sleepy",
    art: "(－_－) zzZ",
  },
  {
    id: "box-cat",
    title: "Cat in box",
    art: "┌(˘▾˘)┘",
  },
  {
    id: "divider-soft",
    title: "Soft divider",
    art: "· · ─ ·✧· ─ · ·",
  },
  {
    id: "arrow-heart",
    title: "Arrow to heart",
    art: "───＞ ♡",
  },
];

export const TEXT_ART_FAQ = [
  {
    question: "What is text art copy and paste?",
    answer:
      "Text art is pictures built from keyboard characters—ASCII or Unicode symbols you copy as plain text. It shows up in Discord, Reddit, and bios without uploading an image file.",
  },
  {
    question: "Is text art the same as kaomoji?",
    answer:
      "Overlap exists: many kaomoji are small text art faces. This page focuses on copy-ready lines and mini pictures. The kaomoji hub groups faces by mood with more lists.",
  },
  {
    question: "Will wide art break on mobile?",
    answer:
      "Long lines may wrap. Copy from the grid, paste in a monospace-friendly field (Discord code block, notes app), or pick a shorter piece from the top of the list.",
  },
  {
    question: "Can I use text art in Instagram bios?",
    answer:
      "Short lines usually work. Very wide art wraps awkwardly in the 150-character bio—test on your phone after pasting.",
  },
  {
    question: "Where do big ASCII banners go?",
    answer:
      "Multi-line block letters belong on the big text generator. This page is for compact art and dividers you paste into chat.",
  },
];

export const TEXT_ART_PROSE = {
  id: "text-art-explainer",
  heading: "Text art vs big ASCII vs emoji combos",
  paragraphs: [
    "Text art here is character art you copy in one tap—faces, dividers, and small scenes. Big text generator builds large FIGlet-style banners. Emoji combos use picture emoji like 🌸✨💕 instead of punctuation.",
    "Competitor pages often dump huge galleries. This list curates pieces that still paste cleanly into Discord and mobile chat without horizontal scrolling.",
  ],
};
