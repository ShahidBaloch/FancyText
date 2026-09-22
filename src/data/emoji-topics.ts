export type EmojiTopicConfig = {
  slug: string;
  h1: string;
  /** Picture emoji — not kaomoji punctuation faces. */
  emojis: string[];
  /** Optional short strings (heart stacks, etc.). */
  combos?: string[];
  kaomojiSlug: string;
  kaomojiLinkLabel: string;
  prose: {
    id: string;
    heading: string;
    paragraphs: string[];
  };
  faq: { question: string; answer: string }[];
};

export const EMOJI_TOPICS: EmojiTopicConfig[] = [
  {
    slug: "heart-emoji",
    h1: "Heart emoji copy and paste",
    emojis: [
      "❤️",
      "🧡",
      "💛",
      "💚",
      "💙",
      "💜",
      "🖤",
      "🤍",
      "🤎",
      "💔",
      "❤️‍🔥",
      "❤️‍🩹",
      "💕",
      "💞",
      "💓",
      "💗",
      "💖",
      "💘",
      "💝",
      "💟",
      "♥️",
      "😍",
      "🥰",
      "😘",
      "💋",
      "💌",
      "🫶",
    ],
    combos: [
      "❤️✨❤️",
      "💕💖💗",
      "🥰💞🫶",
      "♥️♥️♥️",
      "💘💝💓",
    ],
    kaomojiSlug: "heart-kaomojis",
    kaomojiLinkLabel: "heart kaomoji text faces",
    prose: {
      id: "heart-emoji-vs-kaomoji",
      heading: "Heart emoji vs heart kaomoji",
      paragraphs: [
        "Heart emoji are colorful picture characters from your device’s emoji font—❤️, 💕, 🥰. Heart kaomoji are text built from symbols like ♡ and (♡‿♡). Searchers typing “heart emoji” usually want the picture set first; open heart kaomojis when you need a punctuation love face for Discord.",
        "For Unicode heart marks without color (♥ ♡), use cute symbols or cool symbols. For styled love words, try cute fonts or the text decorator.",
      ],
    },
    faq: [
      {
        question: "How do I copy heart emoji?",
        answer:
          "Tap any heart below—it copies as one character or emoji sequence. Paste into Instagram, Discord, TikTok, or messages. No emoji keyboard app required.",
      },
      {
        question: "Heart emoji copy and paste on iPhone?",
        answer:
          "Tap to copy here, then long-press in Notes or your bio field and choose Paste. Works the same as copying from the iOS emoji keyboard.",
      },
      {
        question: "Is this the same as heart symbol text?",
        answer:
          "Heart emoji are full-color emoji. Text symbols like ♡ and ♥ are on the cute symbols page. Kaomoji faces with hearts in them are on heart kaomojis.",
      },
      {
        question: "Why do some hearts look different after paste?",
        answer:
          "Apps render emoji with their own font—Apple, Google, or Discord style. The character is the same Unicode; the drawing varies by platform.",
      },
    ],
  },
  {
    slug: "star-emoji",
    h1: "Star emoji copy and paste",
    emojis: [
      "⭐",
      "🌟",
      "✨",
      "💫",
      "⭐️",
      "🌠",
      "☄️",
      "⚡",
      "🔯",
      "✡️",
      "🌃",
      "🌌",
      "🪐",
      "🌙",
      "🌛",
      "🌜",
      "🌞",
      "☀️",
      "🌈",
      "🔆",
      "🔅",
      "💥",
    ],
    combos: [
      "⭐✨⭐",
      "🌟💫🌟",
      "✨🌙✨",
      "⭐️🌟⭐️",
      "💫✨💫",
    ],
    kaomojiSlug: "star-kaomojis",
    kaomojiLinkLabel: "star kaomoji sparkle text",
    prose: {
      id: "star-emoji-vs-kaomoji",
      heading: "Star emoji vs star kaomoji vs ☆ symbols",
      paragraphs: [
        "Star emoji (⭐ 🌟 ✨) are picture characters—what most “star emoji” searches expect. Star kaomoji wrap faces with text stars like ☆(｡◕‿◕｡)☆. Plain star glyphs (★ ☆ ✦) live on cute symbols and cool symbols for minimal bios.",
      ],
    },
    faq: [
      {
        question: "What is the copy and paste star emoji?",
        answer:
          "Tap ⭐ or 🌟 in the grid to copy. Paste anywhere that accepts standard emoji—bios, Discord status, captions.",
      },
      {
        question: "Star emoji vs star symbol?",
        answer:
          "Emoji stars are colorful (⭐). Unicode symbols ★ ☆ are text-sized marks on the symbols pages—better when you want a thin, non-emoji look.",
      },
      {
        question: "Can I use star emoji in Discord names?",
        answer:
          "Often in display names and about-me text; some servers block emoji in nicknames. Test after paste.",
      },
    ],
  },
  {
    slug: "cat-emoji",
    h1: "Cat emoji copy and paste",
    emojis: [
      "🐱",
      "🐈",
      "🐈‍⬛",
      "😺",
      "😸",
      "😹",
      "😻",
      "😼",
      "😽",
      "🙀",
      "😿",
      "😾",
      "🐾",
      "🦁",
      "🐯",
      "🐆",
      "🐅",
      "🧶",
      "🐟",
      "🥛",
      "🎀",
    ],
    combos: [
      "🐱🐾🐱",
      "😺✨😸",
      "🐈‍⬛🌙🐾",
      "🐱🎀🐾",
      "😻💕😺",
    ],
    kaomojiSlug: "cat-kaomojis",
    kaomojiLinkLabel: "cat kaomoji text faces",
    prose: {
      id: "cat-emoji-vs-kaomoji",
      heading: "Cat emoji vs cat kaomoji",
      paragraphs: [
        "Cat emoji are picture characters like 🐱 and 😺—the usual result for “cat emoji” searches. Cat kaomoji are text faces such as (=^･ω･^=) made from keyboard symbols. Use this page for emoji; use cat kaomojis when you want a neko text face in chat.",
      ],
    },
    faq: [
      {
        question: "How do I copy cat emoji?",
        answer:
          "Tap any cat emoji in the grid. It copies to the clipboard—paste into bios, pet accounts, or Discord like any other emoji.",
      },
      {
        question: "Cat emoji vs cat emoticon?",
        answer:
          "Emoji are full-color pictures (🐱). Emoticons/kaomoji are text art faces—see cat kaomojis for (=^･ω･^=) style copies.",
      },
      {
        question: "Black cat emoji copy paste?",
        answer:
          "Use 🐈‍⬛ in the grid—it is the standard black cat emoji sequence on modern phones.",
      },
    ],
  },
];

export function getEmojiTopic(slug: string): EmojiTopicConfig | undefined {
  return EMOJI_TOPICS.find((t) => t.slug === slug);
}

export const EMOJI_TOPIC_SLUGS = EMOJI_TOPICS.map((t) => t.slug);
