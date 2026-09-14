import type { PageEntry } from "@/data/pages/registry";
import { getPageByUrl } from "@/data/pages/registry";

export type PlatformToolType = "fonts" | "discord-color" | "html-rich";

export type PlatformConfig = {
  slug: string;
  toolType: PlatformToolType;
  styleIds?: string[];
  initialText: string;
  presets?: string[];
  howToHeading?: string;
  howToSteps: string[];
  uses: string[];
  colorCodes?: boolean;
  faq: { question: string; answer: string }[];
};

function platform(
  slug: string,
  toolType: PlatformToolType,
  partial: Omit<PlatformConfig, "slug" | "toolType">,
): PlatformConfig {
  return { slug, toolType, ...partial };
}

export const PLATFORMS: PlatformConfig[] = [
  platform("discord-color-text", "discord-color", {
    initialText: "Hello Discord",
    presets: ["Welcome", "Rules", "Announcement", "Nickname"],
    howToHeading: "How to use Discord color text",
    howToSteps: [
      "Type your message and pick an ANSI color chip.",
      "Copy the full ```ansi code block (recommended for Discord).",
      "Paste into a Discord message and send—Discord renders the color inside the code block.",
    ],
    uses: [
      "Colored welcome messages and rules posts",
      "Server announcements with emphasis",
      "Nicknames and about-me sections where ANSI is supported",
    ],
    colorCodes: true,
    faq: [
      {
        question: "What is Discord colored text?",
        answer:
          "Discord colored text uses ANSI escape codes inside ```ansi code blocks. Discord reads the codes and shows colored (or bold) characters in supported clients.",
      },
      {
        question: "How do I make Discord text color?",
        answer:
          "Generate a ```ansi block here, copy it, and paste into Discord. Each color maps to an ANSI code like 31 for red or 34 for blue.",
      },
      {
        question: "Do Discord color codes work on mobile?",
        answer:
          "Yes on current Discord mobile apps for messages using ```ansi blocks. Always test in your server before large announcements.",
      },
      {
        question: "Is this a discord colored text generator?",
        answer:
          "Yes. People also search discord text color, discord color text, and discord colored text generator for the same ANSI workflow.",
      },
      {
        question: "What are Discord color codes?",
        answer:
          "They are numeric ANSI foreground codes (31–37) placed after \\u001b[0; in the escape sequence. This tool handles the formatting for you.",
      },
    ],
  }),
  platform("discord-font-generator", "fonts", {
    styleIds: [
      "sans-bold",
      "bold",
      "monospace",
      "cursive",
      "bold-cursive",
      "bubble",
      "small-caps",
      "double-struck",
    ],
    initialText: "Discord",
    presets: ["Discord", "Server Name", "Nickname", "Cool Status"],
    howToHeading: "How to use Discord fonts",
    howToSteps: [
      "Type your nickname, server title, or status line.",
      "Browse Unicode font rows that render in Discord.",
      "Copy a row and paste into Discord display name, channel topic, or message.",
    ],
    uses: [
      "Discord nicknames and clan tags",
      "Server names and channel titles",
      "About-me and status text with fancy Unicode",
    ],
    faq: [
      {
        question: "What is a Discord font generator?",
        answer:
          "It converts plain text into Unicode “fonts” you can paste into Discord where special characters are allowed—no bot or Nitro required for basic Unicode styles.",
      },
      {
        question: "Can I copy Discord fonts for free?",
        answer:
          "Yes. FancyText runs in your browser. Generate and copy as many Discord font styles as you need.",
      },
      {
        question: "Do cute Discord fonts work in usernames?",
        answer:
          "Discord allows many Unicode symbols in display names, but some characters may be rejected. Try sans bold or bubble styles if one fails.",
      },
      {
        question: "Is this the same as discord font copy and paste?",
        answer:
          "Yes. Discord font copy paste searches mean copying pre-styled Unicode text into Discord fields.",
      },
    ],
  }),
  platform("tiktok-font-generator", "fonts", {
    styleIds: [
      "fullwidth",
      "cursive",
      "bold",
      "sans-bold",
      "small-caps",
      "bubble",
      "bold-cursive",
      "double-struck",
    ],
    initialText: "TikTok Bio",
    presets: ["TikTok Bio", "aesthetic", "viral", "creator"],
    howToHeading: "How to use TikTok fonts",
    howToSteps: [
      "Enter your bio line, username idea, or caption.",
      "Pick a Unicode style from the live grid.",
      "Copy and paste into your TikTok bio or caption field.",
    ],
    uses: [
      "TikTok profile bios",
      "Video captions and on-screen text ideas",
      "Aesthetic creator branding",
    ],
    faq: [
      {
        question: "What is a TikTok font generator?",
        answer:
          "It creates fancy Unicode text for TikTok bios and captions because TikTok does not include a native font picker.",
      },
      {
        question: "Do TikTok bio fonts work on iPhone and Android?",
        answer:
          "Most Unicode styles work on mobile TikTok profiles. If a character shows as a box, try fullwidth or sans bold styles.",
      },
      {
        question: "Can I change my TikTok font name?",
        answer:
          "Your display name can include many Unicode symbols. Generate a short stylish name here and paste it into TikTok profile settings.",
      },
      {
        question: "Are TikTok fonts the same as copy paste fonts?",
        answer:
          "Yes. TikTok font generator and copy paste fonts searches describe the same Unicode copy workflow with a platform focus.",
      },
    ],
  }),
  platform("instagram-font-generator", "fonts", {
    styleIds: [
      "cursive",
      "bold-cursive",
      "fullwidth",
      "bold",
      "small-caps",
      "bubble",
      "sans-bold",
      "fraktur",
    ],
    initialText: "Instagram Bio",
    presets: ["Instagram Bio", "aesthetic", "link in bio", "caption"],
    howToHeading: "How to use Instagram fonts",
    howToSteps: [
      "Type your bio, name, or caption text.",
      "Preview script, aesthetic, and bold Unicode styles.",
      "Copy your favorite row and paste into Instagram profile or caption.",
    ],
    uses: [
      "Instagram bio and display name styling",
      "Captions and comment flair",
      "Highlight text for link-in-bio pages",
    ],
    faq: [
      {
        question: "What is an Instagram font changer?",
        answer:
          "An Instagram font changer converts normal text into Unicode fancy fonts because Instagram does not let you pick installed fonts in the app.",
      },
      {
        question: "Can I copy Instagram fonts for my bio?",
        answer:
          "Yes. Generate styled text here, tap Copy, and paste directly into your Instagram bio field.",
      },
      {
        question: "Do Instagram fonts copy and paste work on Reels captions?",
        answer:
          "Unicode styles usually work in captions and bios. Keep text short for best rendering on all devices.",
      },
      {
        question: "Is this an Instagram text generator?",
        answer:
          "People search Instagram font generator, Instagram font changer, and Instagram fonts copy and paste for the same tool.",
      },
    ],
  }),
  platform("html-text-generator", "html-rich", {
    initialText: "Hello World",
    presets: ["Hello World", "Title", "Warning", "Note"],
    howToHeading: "How to use HTML snippets",
    howToSteps: [
      "Enter plain text in the input box.",
      "Copy the HTML snippet you need—bold, color span, heading, or preformatted block.",
      "Paste into HTML editors, rich text fields, or Roblox-style markup where tags are supported.",
    ],
    uses: [
      "Simple HTML formatting for blogs and emails",
      "Rich text snippets for editors that accept HTML",
      "Roblox and game UI text that supports basic tags",
    ],
    faq: [
      {
        question: "What is an HTML text generator?",
        answer:
          "It wraps your plain text in common HTML tags so you can copy ready-made markup instead of typing tags manually.",
      },
      {
        question: "Is this a rich text generator?",
        answer:
          "Yes. Rich text generator searches often mean HTML or styled markup snippets you paste into supported fields.",
      },
      {
        question: "Can I copy colored HTML text?",
        answer:
          "Use the red or blue span rows to copy inline color styles. Adjust the hex code in your editor if needed.",
      },
      {
        question: "Does this work for Roblox rich text?",
        answer:
          "Roblox supports limited rich text tags in some contexts. Copy the bold or span snippets and test in your experience UI.",
      },
    ],
  }),
  platform("whatsapp-fonts", "fonts", {
    styleIds: [
      "bold",
      "sans-bold",
      "italic",
      "cursive",
      "bubble",
      "fullwidth",
      "small-caps",
      "monospace",
    ],
    initialText: "WhatsApp",
    presets: ["WhatsApp", "Status", "Group name", "Hello"],
    howToHeading: "How to use WhatsApp fonts",
    howToSteps: [
      "Type your status line, group name, or chat message.",
      "Pick a Unicode style that WhatsApp can display.",
      "Copy and paste into WhatsApp—native *bold* markdown still works separately for messages.",
    ],
    uses: [
      "WhatsApp status updates",
      "Group chat names and descriptions",
      "Stylish chat messages where Unicode is allowed",
    ],
    faq: [
      {
        question: "What are WhatsApp fonts?",
        answer:
          "WhatsApp fonts usually mean Unicode fancy text you paste into status or chats. WhatsApp also has its own *bold* and _italic_ markdown for messages.",
      },
      {
        question: "Can I change WhatsApp font style for free?",
        answer:
          "Yes. Generate Unicode styles here and paste them. No paid font pack is required for basic fancy text.",
      },
      {
        question: "Do WhatsApp fonts work on iPhone and Android?",
        answer:
          "Most bold, cursive, and bubble styles work on both. If a character fails, try sans bold.",
      },
      {
        question: "Is Unicode better than WhatsApp markdown?",
        answer:
          "Markdown (*bold*) only works inside WhatsApp message formatting. Unicode fonts travel into status fields and other apps too.",
      },
      {
        question: "Can I use fancy text in WhatsApp group names?",
        answer:
          "Often yes. Keep names short and test—some symbols may be limited by your device.",
      },
    ],
  }),
  platform("social-media-bio-generator", "fonts", {
    styleIds: [
      "cursive",
      "bold-cursive",
      "fullwidth",
      "bold",
      "sans-bold",
      "small-caps",
      "bubble",
      "double-struck",
    ],
    initialText: "My Bio",
    presets: ["My Bio", "Creator", "link in bio", "aesthetic life"],
    howToHeading: "How to generate a social media bio",
    howToSteps: [
      "Type a short bio line (keep it under ~150 characters for most apps).",
      "Preview stylish Unicode options in the gallery.",
      "Copy the best line and paste into Instagram, TikTok, Twitter/X, or Discord about-me.",
    ],
    uses: [
      "Instagram and TikTok profile bios",
      "Twitter/X and Threads profile text",
      "Discord about-me and server intros",
    ],
    faq: [
      {
        question: "What is a social media bio generator?",
        answer:
          "It helps you style a short profile bio with Unicode fancy fonts you can copy into Instagram, TikTok, and other networks.",
      },
      {
        question: "How long should a fancy bio be?",
        answer:
          "Keep it short. Fancy characters can use more width—aim for one or two lines so phones stay readable.",
      },
      {
        question: "Will fancy bios hurt discoverability?",
        answer:
          "Search inside apps prefers plain text. Use fancy text for flair, but keep your handle and key words readable.",
      },
      {
        question: "Can I use this for Instagram and TikTok together?",
        answer:
          "Yes. Generate once and paste into both—just check each app’s character limit.",
      },
      {
        question: "Which bio fonts look best?",
        answer:
          "Cursive, bold, and aesthetic fullwidth are popular. Bubble works for playful brands; avoid heavy glitch in bios.",
      },
    ],
  }),
];

export const PLATFORMS_BY_SLUG = Object.fromEntries(
  PLATFORMS.map((p) => [p.slug, p]),
) as Record<string, PlatformConfig>;

export function getPlatform(slug: string): PlatformConfig | undefined {
  return PLATFORMS_BY_SLUG[slug];
}

export function getPlatformPage(slug: string): PageEntry | undefined {
  return getPageByUrl(`/${slug}/`);
}

export const PLATFORM_SLUGS = PLATFORMS.map((p) => p.slug);
