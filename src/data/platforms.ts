import type { PageEntry } from "@/data/pages/registry";
import { getPageByUrl } from "@/data/pages/registry";

export type PlatformToolType = "fonts" | "discord-color" | "html-rich" | "bio-builder";

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
      "Discord nicknames and clan tags (display name ≠ username)",
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
          "Yes. FancifyText runs in your browser. Generate and copy as many Discord font styles as you need.",
      },
      {
        question: "Do cute Discord fonts work in usernames?",
        answer:
          "Discord allows many Unicode symbols in display names, but some characters may be rejected. Try sans bold or bubble styles if one fails. Your @username should stay plain ASCII.",
      },
      {
        question: "Unicode fonts vs Discord ANSI color—what is the difference?",
        answer:
          "Fancy fonts work in nicknames and many text fields. ANSI colors only work inside ```ansi message code blocks—see the Discord color text tool.",
      },
      {
        question: "Is this the same as discord font copy and paste?",
        answer:
          "Yes. Discord font copy paste searches mean copying pre-styled Unicode text into Discord fields.",
      },
      {
        question: "Why does my Discord nickname show boxes on mobile?",
        answer:
          "Mobile clients use different fonts. Switch to sans bold or monospace, or shorten the nickname.",
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
      "Instagram bio and display name styling (150-character bio limit)",
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
          "Yes. Generate styled text here, tap Copy, and paste directly into your Instagram bio field. Stay under 150 characters—fancy letters still count.",
      },
      {
        question: "Which styles does Instagram reject or break?",
        answer:
          "Dense Zalgo/glitch, some squared letters, and rare letterlike symbols often show as boxes or fail to save. Prefer cursive, bold, sans bold, bubble, or small caps.",
      },
      {
        question: "Do Instagram fonts copy and paste work on Reels captions?",
        answer:
          "Unicode styles usually work in captions and bios. Keep text short for best rendering on all devices.",
      },
      {
        question: "Is this an Instagram text generator?",
        answer:
          "People search Instagram font generator, Instagram font changer, and Instagram fonts copy and paste for this gallery. For a stacked profile with character limits, use the social media bio generator instead.",
      },
      {
        question: "Will a fancy bio hurt Instagram search?",
        answer:
          "Put your niche keywords in plain letters. Use one stylish line for flair so people and assistive tech can still read the important words.",
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
  platform("social-media-bio-generator", "bio-builder", {
    initialText: "your name\ncreator · city",
    howToHeading: "How to build a multi-platform bio",
    howToSteps: [
      "Type each bio line on its own row—name, role, location, or a short tagline.",
      "Pick Instagram, TikTok, X, or Discord to see that platform’s character limit.",
      "Choose a Unicode style, insert spacers if you want, then copy the full stacked bio.",
    ],
    uses: [
      "Instagram 150-character profile bios",
      "TikTok 80-character bios",
      "X / Twitter 160-character bios",
      "Discord About Me (190 characters)",
    ],
    faq: [
      {
        question: "What is a social media bio generator?",
        answer:
          "This tool builds a multi-line profile bio with live character counts for Instagram, TikTok, X, and Discord—then styles those lines with Unicode fonts you can paste.",
      },
      {
        question: "How is this different from the Instagram font generator?",
        answer:
          "The Instagram font generator is a single-line font gallery for captions and names. This bio generator is for stacked profile text, spacers, and per-platform length limits.",
      },
      {
        question: "How long should a fancy bio be?",
        answer:
          "Stay inside the chip you selected: 150 for Instagram, 80 for TikTok, 160 for X, 190 for Discord About Me. Fancy letters still count as characters.",
      },
      {
        question: "Will fancy bios hurt discoverability?",
        answer:
          "In-app search prefers plain text. Keep your handle and one keyword in normal letters; use fancy styles for the display line.",
      },
      {
        question: "Can I reuse one bio on Instagram and TikTok?",
        answer:
          "Yes—switch the platform chips and shorten TikTok first. Copy once it fits the smallest network you need.",
      },
    ],
  }),
  platform("twitter-font-generator", "fonts", {
    styleIds: [
      "sans-bold",
      "bold",
      "italic",
      "cursive",
      "small-caps",
      "monospace",
    ],
    initialText: "display name",
    presets: ["display name", "bio line", "creator", "hello"],
    howToHeading: "How to use X / Twitter fonts",
    howToSteps: [
      "Type a short display name (X allows 50 characters) or a bio line (160).",
      "Preview clean Unicode styles—skip glitch and dense bubble stacks that break the profile.",
      "Copy and paste into X → Edit profile. Check the live character count on X after pasting.",
    ],
    uses: [
      "X / Twitter display names",
      "160-character profile bios",
      "Reply flair where Unicode is allowed",
    ],
    faq: [
      {
        question: "Does X (Twitter) allow fancy fonts in names?",
        answer:
          "Display names accept many Unicode letters. Usernames (@handles) are much stricter—keep the handle in plain ASCII.",
      },
      {
        question: "What is a Twitter font generator?",
        answer:
          "It converts normal letters into Unicode styles you paste into an X profile. X has no native font picker for bios or display names.",
      },
      {
        question: "How long can a fancy X bio be?",
        answer:
          "The bio field is 160 characters. Fancy letters still count. Use the social media bio generator if you want a live 160-character counter.",
      },
      {
        question: "Which styles are safest on X?",
        answer:
          "Sans bold, bold, italic, and cursive usually render. Glitch, squared, and heavy combining marks often fail or look like boxes.",
      },
      {
        question: "Is this an X font generator or Twitter fonts copy and paste?",
        answer:
          "Same tool. People still search Twitter fonts; the product is X. This page is for profile fields, not tweet body styling.",
      },
    ],
  }),
  platform("roblox-font-generator", "fonts", {
    styleIds: ["sans-bold", "bold", "small-caps", "monospace", "italic"],
    initialText: "Roblox",
    presets: ["Roblox", "DisplayName", "clan", "user"],
    howToHeading: "How to use Roblox fonts",
    howToSteps: [
      "Type the display name you want (not the account username if filters are strict).",
      "Preview conservative Unicode styles—Roblox filters block many novelty symbols.",
      "Copy and test in Roblox settings. If it rejects the name, try sans bold or plain small caps.",
    ],
    uses: [
      "Roblox display names where Unicode is allowed",
      "Experience titles and UI labels you type yourself",
      "Jumping to HTML/rich text tags for supported Roblox UI",
    ],
    faq: [
      {
        question: "Can I use fancy fonts in a Roblox username?",
        answer:
          "Account usernames are tightly filtered. Display names are more flexible but still reject many symbols. Always test in Roblox after copying.",
      },
      {
        question: "Why did Roblox reject my stylish name?",
        answer:
          "Filters block unusual Unicode, lookalike letters, and some punctuation. Sans bold and small caps fail less often than bubble or glitch.",
      },
      {
        question: "Is this the same as Roblox rich text?",
        answer:
          "No. This page is Unicode letters. Roblox rich text uses tags like <b> in some UI—open the HTML text generator for those snippets.",
      },
      {
        question: "Do Roblox fonts copy and paste into chat?",
        answer:
          "Sometimes. Chat filters are stricter than display names. If chat strips the style, keep fancy text for the profile only.",
      },
      {
        question: "Which Roblox name fonts are safest?",
        answer:
          "Sans bold, bold, italic, and small caps. Skip zalgo, fullwidth, and squared letters for names.",
      },
    ],
  }),
  platform("facebook-font-generator", "fonts", {
    styleIds: [
      "sans-bold",
      "bold",
      "italic",
      "cursive",
      "small-caps",
      "bubble",
    ],
    initialText: "display name",
    presets: ["display name", "page title", "hello", "bio line"],
    howToHeading: "How to use Facebook fonts",
    howToSteps: [
      "Type a short display name or a single bio line—not a whole post.",
      "Preview readable Unicode (sans bold, bold, cursive). Skip glitch and dense hearts.",
      "Copy and paste into Facebook → Profile → Edit. Usernames (@handles) stay plain ASCII.",
    ],
    uses: [
      "Facebook display names",
      "Page names where Unicode is allowed",
      "Comments and intros that need a short stylish word",
    ],
    faq: [
      {
        question: "Does Facebook allow fancy fonts in names?",
        answer:
          "Display names often accept Unicode letters. The @username field is much stricter. Keep the handle in normal A–Z so people can find you.",
      },
      {
        question: "What is a Facebook font generator?",
        answer:
          "It converts normal letters into Unicode styles you paste into Facebook. Facebook has no font picker for names or bios.",
      },
      {
        question: "Will fancy text work in Facebook comments?",
        answer:
          "Usually yes for a short word. Long blackletter or glitch strings can look like boxes on some phones and may get extra spam scrutiny.",
      },
      {
        question: "Which styles are safest on Facebook?",
        answer:
          "Sans bold, bold, italic, and cursive are the most reliable. Bubble is playful but wide. Old English and combining-mark styles fail more often.",
      },
      {
        question: "Is this the same as changing Facebook’s app font?",
        answer:
          "No. You cannot install a custom typeface in the Facebook app. This tool only changes the characters you paste into a field.",
      },
    ],
  }),
  platform("snapchat-font-generator", "fonts", {
    styleIds: [
      "bubble",
      "bold",
      "sans-bold",
      "cursive",
      "small-caps",
      "italic",
    ],
    initialText: "Snapchat",
    presets: ["Snapchat", "display name", "story", "friends"],
    howToHeading: "How to use Snapchat fonts",
    howToSteps: [
      "Type a short display name or story line.",
      "Preview bubble, bold, and script styles that stay readable on a tiny profile row.",
      "Copy and paste into Snapchat profile settings. Keep it under a few words.",
    ],
    uses: [
      "Snapchat display names",
      "Short story or spotlight captions",
      "Bitmoji-adjacent profile flair",
    ],
    faq: [
      {
        question: "Can I change Snapchat fonts in the app?",
        answer:
          "Snapchat has no full font picker for your display name. Unicode copy-and-paste is the usual workaround.",
      },
      {
        question: "Do Snapchat fonts copy and paste into stories?",
        answer:
          "Some captions accept Unicode; others flatten to a default font. Test a short bubble or bold line on your device.",
      },
      {
        question: "Which Snapchat name fonts fit the profile?",
        answer:
          "Bubble and bold are popular. Long cursive names get clipped—keep two or three words.",
      },
      {
        question: "Is this different from Instagram fonts?",
        answer:
          "Same Unicode idea, tighter space. Snapchat profiles are shorter than Instagram bios, so skip fullwidth and glitch.",
      },
      {
        question: "Will Snapchat ban stylish letters?",
        answer:
          "Unusual symbols can fail the name filter. If save fails, drop bubble and try sans bold.",
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
