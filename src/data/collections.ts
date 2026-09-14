import type { PageEntry } from "@/data/pages/registry";
import { getPageByUrl } from "@/data/pages/registry";
import { STYLE_IDS } from "@/lib/fonts/styles";

export type CollectionConfig = {
  slug: string;
  /** Empty = show all registered styles. */
  styleIds: string[];
  initialText: string;
  presets?: string[];
  howToSteps: string[];
  uses: string[];
  taxonomy?: { label: string; href: string }[];
  /** Optional H2 buckets (aesthetic / cute / cool…). */
  buckets?: { heading: string; body: string; href?: string }[];
  mobileHowTo?: string;
  /** Unique positioning vs overlapping collections. */
  difference?: { heading: string; body: string };
  faq: { question: string; answer: string }[];
};

function collection(
  slug: string,
  styleIds: string[],
  partial: Omit<CollectionConfig, "slug" | "styleIds">,
): CollectionConfig {
  return { slug, styleIds, ...partial };
}

export const COLLECTIONS: CollectionConfig[] = [
  collection("copy-paste-fonts", STYLE_IDS, {
    initialText: "Copy Paste Fonts",
    presets: ["Instagram Bio", "Cool Username", "Discord Name", "Aesthetic"],
    howToSteps: [
      "Type any word, name, or phrase in the gallery input.",
      "Scroll the font list—every row updates live with a different Unicode style.",
      "Tap Copy on the style you like and paste into Instagram, Discord, TikTok, WhatsApp, or anywhere Unicode works.",
    ],
    mobileHowTo:
      "On iPhone or Android, open this page in your browser, type in the box, tap Copy on a font row, switch to Instagram/Discord/WhatsApp, then long-press and Paste. No font install is required.",
    uses: [
      "Instagram and TikTok bios and captions",
      "Discord nicknames and server names",
      "WhatsApp status and group titles",
      "Gaming usernames and profile flair",
    ],
    taxonomy: [
      { label: "Aesthetic fonts", href: "/aesthetic-fonts/" },
      { label: "Cute fonts", href: "/cute-fonts/" },
      { label: "Name fonts", href: "/name-font-generator/" },
      { label: "Stylish text", href: "/stylish-text-generator/" },
      { label: "Bold text", href: "/bold-text-generator/" },
      { label: "Cursive text", href: "/cursive-text-generator/" },
      { label: "Bubble text", href: "/bubble-text-generator/" },
      { label: "WhatsApp fonts", href: "/whatsapp-fonts/" },
      { label: "Small text", href: "/small-text-generator/" },
      { label: "Old English", href: "/old-english-text-generator/" },
      { label: "Cool symbols", href: "/cool-symbols/" },
      { label: "Text decorator", href: "/text-decorator/" },
    ],
    buckets: [
      {
        heading: "Aesthetic fonts",
        body: "Fullwidth, cursive, and soft script styles for Instagram and TikTok vibes.",
        href: "/aesthetic-fonts/",
      },
      {
        heading: "Cute fonts",
        body: "Bubble, small caps, and playful Unicode for soft bios and nicknames.",
        href: "/cute-fonts/",
      },
      {
        heading: "Cool / bold / elegant fonts",
        body: "Bold, sans bold, italic, and fraktur for emphasis and elegant display names.",
        href: "/bold-text-generator/",
      },
    ],
    faq: [
      {
        question: "What are copy and paste fonts?",
        answer:
          "Copy and paste fonts are Unicode character styles—not downloadable font files. You generate fancy text here, copy it, and paste it into apps that support Unicode symbols.",
      },
      {
        question: "Are font copy and paste tools free?",
        answer:
          "Yes. FancifyText runs in your browser with no account. Generate as many styles as you need and copy them instantly.",
      },
      {
        question: "Do copy paste fonts work on Instagram?",
        answer:
          "Instagram bios and captions do not have a native font picker. Unicode copy paste fonts are the standard workaround—paste directly into the bio field.",
      },
      {
        question: "Why do some fonts show as boxes?",
        answer:
          "Your device may not support every Unicode symbol. Try bold, sans bold, or bubble styles if a row fails to render on your phone.",
      },
      {
        question: "Is this the same as fonts copy and paste or fonts copy paste?",
        answer:
          "Yes. People search many word orders for the same intent—cool fonts you can copy and paste without installing anything.",
      },
      {
        question: "How many fonts can I copy?",
        answer:
          "The gallery lists every style FancifyText supports. Scroll, preview live, and copy as many as you want—there is no download limit.",
      },
      {
        question: "Can I use these fonts on Discord and WhatsApp?",
        answer:
          "Yes for most bold, cursive, and bubble styles. Use the Discord and WhatsApp tools for platform-focused presets.",
      },
    ],
  }),
  collection(
    "aesthetic-fonts",
    [
      "fullwidth",
      "cursive",
      "bold-cursive",
      "small-caps",
      "fraktur",
      "double-struck",
    ],
    {
      initialText: "aesthetic",
      presets: ["aesthetic", "soft vibes", "dreamy", "minimal"],
      howToSteps: [
        "Enter your aesthetic caption or username idea.",
        "Browse wide, script, and soft Unicode styles in the grid.",
        "Copy the row that matches your vibe and paste into your bio or post.",
      ],
      uses: [
        "Aesthetic Instagram and TikTok bios",
        "Soft captions and quote posts",
        "Minimal username flair where Unicode is allowed",
      ],
      difference: {
        heading: "Aesthetic vs cute vs stylish",
        body: "This collection is the soft, wide, script set—fullwidth spacing, cursive, and delicate small caps. Cute fonts are bubble and squared kawaii letters. Stylish text is the bold, italic, and glitch set. Use the copy-and-paste gallery when you want every style on one page.",
      },
      faq: [
        {
          question: "What are aesthetic fonts?",
          answer:
            "Aesthetic fonts are Unicode text styles—often wide fullwidth, script, or delicate small caps—that give bios and captions a curated, soft, or vaporwave-adjacent look.",
        },
        {
          question: "Can I copy aesthetic fonts for Instagram?",
          answer:
            "Yes. Generate aesthetic Unicode here and paste into your Instagram bio or captions. No font download is required.",
        },
        {
          question: "What is an aesthetic font generator?",
          answer:
            "An aesthetic font generator converts plain text into styled Unicode characters optimized for social bios—same tool, different style filter than a general copy paste font list.",
        },
        {
          question: "Are aesthetic letters the same as aesthetic text?",
          answer:
            "Searchers use both phrases for the same output: fancy Unicode letters you can copy and paste into profiles and posts.",
        },
      ],
    },
  ),
  collection(
    "cute-fonts",
    ["bubble", "squared", "small-caps", "hearts", "parenthesized"],
    {
      initialText: "cute",
      presets: ["cute", "kawaii", "hello", "sweet"],
      howToSteps: [
        "Type a cute phrase, name, or bio line.",
        "Pick bubble, squared, small-caps, hearts, or parenthesized letters from the live grid.",
        "Copy and paste into Discord, Instagram, or messages.",
      ],
      uses: [
        "Kawaii-style bios and captions",
        "Playful Discord and Roblox-style nicknames",
        "Cute group chat names and status lines",
      ],
      difference: {
        heading: "What makes these cute fonts",
        body: "Cute fonts here are circled bubble letters, squared caps, compact small caps, heart letters, and parenthesized glyphs—the kawaii set. Soft wide script lives on aesthetic fonts. High-contrast bold and glitch live on stylish text. Open those pages if you want a different vibe.",
      },
      faq: [
        {
          question: "What are cute fonts copy and paste?",
          answer:
            "They are playful Unicode styles—especially bubble letters, squared caps, and compact small caps—you copy from a generator and paste into social apps.",
        },
        {
          question: "Is this a cute font generator?",
          answer:
            "Yes. People search cute font generator and cute text generator for the same tool: turn normal text into cute Unicode you can paste anywhere.",
        },
        {
          question: "Do kawaii fonts work on TikTok?",
          answer:
            "TikTok bios and captions often accept Unicode cute styles. Copy a short bubble or squared row and test on your device.",
        },
        {
          question: "Can I use cute fonts on Discord?",
          answer:
            "Discord display names and topics frequently use bubble and squared Unicode. Keep names short for best results.",
        },
      ],
    },
  ),
  collection(
    "name-font-generator",
    [
      "sans-bold",
      "bold",
      "cursive",
      "bold-cursive",
      "small-caps",
      "monospace",
      "double-struck",
    ],
    {
      initialText: "Luna",
      presets: ["Luna", "Alex", "gamerX", "username"],
      howToSteps: [
        "Type your name or username into the gallery.",
        "Compare bold, cursive, bubble, and clean sans styles side by side.",
        "Copy the version that fits your platform’s character rules and paste it in.",
      ],
      uses: [
        "Instagram and TikTok display names",
        "Discord nicknames and clan tags",
        "Facebook display names (keep the @username plain)",
        "Game usernames and profile titles",
        "Snapchat and WhatsApp name styling",
      ],
      difference: {
        heading: "Name fonts, not a full gallery",
        body: "This page is for short names and usernames: clean sans bold, script signatures, and compact small caps. It skips bubble and glitch styles that often fail username filters. For a full bio with line breaks, use the social media bio generator.",
      },
      faq: [
        {
          question: "What are name fonts?",
          answer:
            "Name fonts are Unicode styles applied to a first name, nickname, or username so it stands out in bios and gaming profiles.",
        },
        {
          question: "Can I use this as a username font generator?",
          answer:
            "Yes. Username fonts and name fonts searches mean the same thing—stylish Unicode for display names you can copy and paste.",
        },
        {
          question: "Do cool name fonts work everywhere?",
          answer:
            "Platforms limit which characters usernames allow. If one style fails, try sans bold or a shorter name variant.",
        },
        {
          question: "How do I make a custom name font?",
          answer:
            "Type your name here, preview multiple Unicode styles, and copy the one you like—no custom font file or design software needed.",
        },
      ],
    },
  ),
  collection(
    "stylish-text-generator",
    [
      "sans-bold",
      "bold",
      "italic",
      "sans-italic",
      "bold-italic",
      "monospace",
      "glitch",
      "strikethrough",
      "slash",
    ],
    {
      initialText: "stylish",
      presets: ["stylish", "cool text", "profile", "caption"],
      howToSteps: [
        "Enter the phrase you want to stylize.",
        "Browse bold, italic, and graphic Unicode rows—not the soft aesthetic set.",
        "Copy your favorite stylish text and paste into any supported app.",
      ],
      uses: [
        "High-contrast bios and CTAs",
        "Cool captions and comment flair",
        "Discord nicknames with bold or graphic punch",
      ],
      difference: {
        heading: "Stylish is the graphic set",
        body: "Stylish text is bold, italic, monospace, strikethrough, and glitch—high contrast, not soft. Bubble and squared kawaii letters are on cute fonts. Wide script is on aesthetic fonts. Pick the collection that matches the look, instead of ranking the same gallery three times.",
      },
      faq: [
        {
          question: "What is a stylish text generator?",
          answer:
            "It converts normal words into bold, italic, and graphic Unicode styles so you can copy a modern high-contrast look for profiles and captions.",
        },
        {
          question: "How is this different from aesthetic fonts?",
          answer:
            "Stylish text leans bold and graphic. Aesthetic fonts lean soft, wide, and script. Use the matching collection for each vibe.",
        },
        {
          question: "Can I create stylish fonts for free?",
          answer:
            "FancifyText is free in the browser—no signup. Generate and copy as many stylish variants as you need.",
        },
        {
          question: "Which stylish font works best on mobile?",
          answer:
            "Sans bold, bold, and italic styles tend to render reliably on phones. Keep glitch and squared styles short.",
        },
      ],
    },
  ),
];

export const COLLECTIONS_BY_SLUG = Object.fromEntries(
  COLLECTIONS.map((c) => [c.slug, c]),
) as Record<string, CollectionConfig>;

export function getCollection(slug: string): CollectionConfig | undefined {
  return COLLECTIONS_BY_SLUG[slug];
}

export function getCollectionPage(slug: string): PageEntry | undefined {
  return getPageByUrl(`/${slug}/`);
}

export const COLLECTION_SLUGS = COLLECTIONS.map((c) => c.slug);
