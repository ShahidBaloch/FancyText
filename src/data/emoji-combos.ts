export type EmojiComboCategory = {
  id: string;
  heading: string;
  blurb: string;
  combos: string[];
};

export const EMOJI_COMBO_CATEGORIES: EmojiComboCategory[] = [
  {
    id: "cute",
    heading: "Cute emoji combos",
    blurb:
      "Short strings for bios and nicknames. Tap a row to copy the whole combo—paste into Discord, Instagram, or TikTok.",
    combos: [
      "🌸✨💕",
      "🐰🎀🩷",
      "🧸☁️💗",
      "🍓🎀✨",
      "🐱💖🌙",
      "☁️🫧💞",
      "🎀🌷🩵",
      "🍡🌸⭐",
      "🦋💜✨",
      "🐾💕🌟",
    ],
  },
  {
    id: "aesthetic",
    heading: "Aesthetic emoji combos",
    blurb:
      "Soft, minimal stacks for Carrd-style bios and captions. Pair with plain text—do not restyle every word as Unicode fonts.",
    combos: [
      "⋆｡°✩",
      "✧･ﾟ: *✧",
      "🌙✨🌌",
      "🕯️🤍📎",
      "🫧💿🌊",
      "☁️🪽🤍",
      "🖤⛓️🥀",
      "🌿🍃🫒",
      "📎🗒️✏️",
      "🎧🌃💫",
    ],
  },
  {
    id: "love",
    heading: "Heart & love combos",
    blurb:
      "Romantic stacks for DMs and couple bios. These are picture emoji, not heart kaomoji text faces.",
    combos: [
      "❤️‍🔥💋❤️",
      "💕💖💗",
      "💘💝💞",
      "🥰😘💓",
      "💑💐🌹",
      "♥️✨♥️",
      "💌🫶💍",
      "🩷🩵💜",
    ],
  },
  {
    id: "funny",
    heading: "Funny emoji combos",
    blurb:
      "Meme-friendly stacks for replies. One combo per message reads cleaner than a whole paragraph of emoji.",
    combos: [
      "💀😭🙏",
      "🤡✨💅",
      "😭🔥💀",
      "👀🍿😳",
      "🫠☕️📉",
      "🗿🧢🤨",
      "😂🤣💀",
      "🙃🫠🔁",
    ],
  },
  {
    id: "gaming",
    heading: "Gaming & hype combos",
    blurb:
      "Victory and squad-energy lines for chat. Test in your game overlay—some titles strip emoji in usernames.",
    combos: [
      "🔥🏆⚔️",
      "🎮🕹️👾",
      "💥🎯🔫",
      "👑🗡️🛡️",
      "⚡️🐉🔥",
      "🚀🌟🎉",
      "🏁💨🏆",
      "🧨💣💥",
    ],
  },
  {
    id: "nature",
    heading: "Nature & flower combos",
    blurb:
      "Garden and sky themes for calm bios. Good next to a single aesthetic font word from the cute fonts page.",
    combos: [
      "🌻🌼🌸",
      "🌊🐚🐬",
      "🌲🍄🦌",
      "🌈☀️🌧️",
      "🪴🌿🍃",
      "🌺🦋🌷",
      "🏔️❄️⛄",
      "🍂🍁🎃",
    ],
  },
];

/** Single emoji for “pick one character” intent (cat, star, heart, etc.). */
export const EMOJI_COMBO_SINGLES = [
  "❤️",
  "💖",
  "💕",
  "⭐",
  "🌟",
  "✨",
  "🐱",
  "🐶",
  "🐰",
  "🌸",
  "🎀",
  "🔥",
  "😭",
  "💀",
  "👑",
  "🎮",
  "🎵",
  "🌙",
  "☁️",
  "🦋",
  "🍓",
  "🫶",
  "💯",
  "✅",
];

export const EMOJI_COMBO_FAQ = [
  {
    question: "What are emoji combos?",
    answer:
      "Emoji combos are ready-made strings of two or more picture emoji you copy and paste together—like 🌸✨💕 for a cute bio line. They are not kaomoji (text faces made from punctuation) and not Unicode letter fonts.",
  },
  {
    question: "How is this different from emojicombos-style sites?",
    answer:
      "Same job: tap to copy. FancifyText also links to kaomoji, symbol lists, and font generators so you can mix one combo with styled text without leaving a cluttered page.",
  },
  {
    question: "Do emoji combos work in Discord and Instagram?",
    answer:
      "Yes in most messages and bios. Usernames and some app fields reject emoji or limit length—paste in the bio or status first and shorten if it wraps badly on mobile.",
  },
  {
    question: "Can I mix emoji combos with fancy text?",
    answer:
      "Yes. Copy a combo here, then copy a Unicode font word from the homepage or cute fonts page. Keep bios short—emoji and fancy letters both count toward character limits.",
  },
  {
    question: "Are these the same as emoji kitchen?",
    answer:
      "No. Emoji Kitchen merges glyphs in Google’s sticker tool. These are standard Unicode emoji sequences you paste anywhere that accepts normal emoji.",
  },
];

export const EMOJI_COMBO_PROSE = {
  id: "emoji-combos-explainer",
  heading: "Emoji combos vs kaomoji vs fonts",
  paragraphs: [
    "Emoji combos use colorful picture characters from the Unicode emoji set. Kaomoji on this site are text faces built from keyboard symbols like (｡◕‿◕｡). Fancy fonts restyle the alphabet into bold, cursive, or bubble letters.",
    "Searchers typing “emoji combos” usually want a copied string for a bio or caption—not a font file and not a ASCII table flip. Start here for stacks; open the kaomoji hub when you want a punctuation face instead.",
  ],
  bullets: [
    "Combos: 🌸✨💕 — paste as one line",
    "Kaomoji: (T_T) — plain text emoticons",
    "Fonts: 𝓬𝓾𝓽𝓮 — letter-by-letter Unicode styles",
  ],
};
