import type { PageEntry } from "@/data/pages/registry";
import { getPageByUrl } from "@/data/pages/registry";

export type PlatformToolType = "fonts" | "discord-color" | "html-rich" | "bio-builder";

/**
 * Whether a given profile field will accept Unicode styled text at all.
 * The near-universal rule is that @handles are ASCII-only while display names
 * and bios are not — which is why "my font worked in my name but not my
 * username" is the most common complaint in this niche.
 */
export type FieldUnicode = "yes" | "no" | "filtered";

export type PlatformField = {
  name: string;
  unicode: FieldUnicode;
  /** Character limit where it is stable and well documented; null when it varies. */
  limit: number | null;
  note: string;
};

export type PlatformConfig = {
  slug: string;
  toolType: PlatformToolType;
  styleIds?: string[];
  initialText: string;
  presets?: string[];
  howToHeading?: string;
  howToSteps: string[];
  usesHeading?: string;
  uses: string[];
  colorCodes?: boolean;
  fieldsHeading?: string;
  fieldsLead?: string;
  /** Per-field Unicode support, rendered as the "Where fonts work" table. */
  fields?: PlatformField[];
  extraSections?: {
    id: string;
    heading: string;
    paragraphs?: string[];
    bullets?: string[];
  }[];
  faq: { question: string; answer: string }[];
};

export const FIELD_UNICODE_LABELS: Record<FieldUnicode, string> = {
  yes: "Fancy fonts work",
  no: "Plain text only",
  filtered: "Partly filtered",
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
      "Type the announcement and tap an ANSI color chip.",
      "Copy the whole ```ansi code block—not just the inner sentence.",
      "Paste it as a new Discord message and send. Nicknames cannot use this trick.",
    ],
    usesHeading: "What ANSI is for",
    uses: [
      "Colored welcome, rules, and announcement messages",
      "Emphasis inside a code block, not in a display name",
    ],
    colorCodes: true,
    faq: [
      {
        question: "What is a Discord colored text generator?",
        answer:
          "Discord colored text uses ANSI escape codes inside a ```ansi code block. It paints a message, not a nickname.",
      },
      {
        question: "What is Discord colored text?",
        answer:
          "Same trick: ANSI color inside a Discord code block. Nicknames cannot use it—open the Discord font generator for Unicode names.",
      },
      {
        question: "Why is my nickname still not colored?",
        answer:
          "ANSI only paints text inside a ```ansi message block. Nicknames and about-me need Unicode fonts instead—open the Discord font generator.",
      },
      {
        question: "How do I actually get the color to show?",
        answer:
          "Copy the full fenced block from this tool and paste it as a new message. Extra backticks or an edited old message often drop the escape character.",
      },
      {
        question: "Does this work on the phone app?",
        answer:
          "Current Discord mobile apps usually paint ```ansi blocks. Some overlays and in-game clients strip the escape. Test in your server before a big announcement.",
      },
      {
        question: "What are the numbers like 31 and 34?",
        answer:
          "ANSI foreground codes (31–37) after the escape sequence. This tool writes the sequence; you should not type the codes by hand.",
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
      "italic",
      "hearts",
    ],
    initialText: "Discord",
    presets: ["Discord", "Server Name", "Nickname", "Cool Status"],
    howToHeading: "How to use Discord fonts",
    howToSteps: [
      "Type the nickname, channel title, or about-me line.",
      "Prefer sans bold, bubble, or script for nicknames. Heart letters are the cute option; Cherokee and Japanese lookalikes are on the cool text generator.",
      "Copy a row and paste into Display name, Server nickname, or About me—never the @username field.",
      "If Discord rejects the name, shorten it or switch to sans bold / monospace and try again.",
    ],
    usesHeading: "Fields that can take Unicode",
    uses: [
      "Display names and per-server nicknames (32 characters). Keep the @username plain.",
      "Server names and channel titles when the characters save",
      "About-me text—Discord also has real **bold** markdown there, which is easier on screen readers",
      "Channel topics and forum tags when a short styled word still reads in the sidebar",
    ],
    fieldsHeading: "Display name vs @username vs about me",
    fieldsLead:
      "The handle is ASCII. The name people see, and the about-me box, are where Unicode usually lives. Nitro is not required for these letters.",
    fields: [
      {
        name: "Display name",
        unicode: "yes",
        limit: 32,
        note: "Your global name across servers. Accepts Unicode styles.",
      },
      {
        name: "Username (@handle)",
        unicode: "no",
        limit: 32,
        note: "Lowercase letters, numbers, underscores, and periods only. Styled characters cannot be used here.",
      },
      {
        name: "Server nickname",
        unicode: "yes",
        limit: 32,
        note: "Set per server, so you can style your name in one community and leave it plain in another.",
      },
      {
        name: "About me",
        unicode: "yes",
        limit: 190,
        note: "Accepts Unicode styles, but Discord also supports real **bold** and *italic* markdown here, which stays readable to screen readers.",
      },
    ],
    extraSections: [
      {
        id: "discord-fonts-not-nitro",
        heading: "Discord fonts are not a Nitro pack",
        paragraphs: [
          "These rows are Unicode look-alike letters. Anyone can paste them into a display name or nickname—Nitro is not required, and no bot has to run. Discord still draws them in its own typeface; you are changing the characters, not installing a font file.",
          "Colored chat is a different trick: ANSI codes inside a ```ansi message block. Use the Discord color text tool for announcements. Use this page for names, about-me, and fancy font Discord nicknames.",
        ],
      },
      {
        id: "discord-fonts-tips",
        heading: "What usually saves vs what Discord rejects",
        bullets: [
          "Sans bold, bubble, small caps, and short script names save most often.",
          "Heart letters and cute circled text can fail nickname filters—try a shorter word.",
          "Glitch / Zalgo and long combining marks almost never belong in a nick.",
          "If a phone shows empty boxes, switch to sans bold or monospace on this page.",
          "Keep the login username in plain lowercase so friends can still find and mention you.",
        ],
      },
    ],
    faq: [
      {
        question: "What is a Discord font generator?",
        answer:
          "It converts plain text into Unicode letters you paste into Discord display names, nicknames, and about-me. No bot or Nitro required. The @username stays lowercase ASCII.",
      },
      {
        question: "Where do I get Discord fonts to copy and paste?",
        answer:
          "Type here, pick a row (bold, script, bubble, monospace), and copy. Paste into Display name, Server nickname, or About me—not the @username field. That is what people mean by Discord fonts or font for Discord.",
      },
      {
        question: "Can I use fancy font on Discord without Nitro?",
        answer:
          "Yes for Unicode nicknames and about-me text. Fancy letters are plain characters, not a Discord font pack. Colored chat needs the separate ANSI color tool, not this page.",
      },
      {
        question: "Can I change my Discord username to fancy letters?",
        answer:
          "No. Discord usernames are lowercase ASCII. Paste Unicode into the display name or a server nickname instead. No bot or Nitro needed for that.",
      },
      {
        question: "Cute letters failed in my nick. Now what?",
        answer:
          "Try sans bold or bubble. Dense hearts and rare symbols get rejected. Cherokee, Japanese, and fat lookalikes belong on the cool text generator—and still will not work in the @handle.",
      },
      {
        question: "Should I use this or the color tool?",
        answer:
          "This page is Unicode for names and bios. Color is ANSI inside a ```ansi message block. They are different tricks.",
      },
      {
        question: "Why boxes on mobile but not desktop?",
        answer:
          "The phone font is missing those glyphs. Switch to sans bold or monospace, or shorten the nick.",
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
      "Type the bio line or caption. TikTok bios are only 80 characters—wide fullwidth runs out of room first.",
      "Preview script, small caps, or sans bold. Skip glitch.",
      "Copy and paste into Edit profile. Keep hashtags in plain letters so they stay clickable.",
    ],
    usesHeading: "Profile and caption, not the @handle",
    uses: [
      "The 80-character bio (tightest of the major apps)",
      "The 30-character nickname—TikTok also limits how often you can change it",
      "Video captions, with hashtags left in normal type",
    ],
    fieldsHeading: "TikTok name, handle, bio, and captions",
    fieldsLead:
      "The @handle is letters, numbers, underscores, and periods only. The nickname and bio are where Unicode usually works—and the bio is short.",
    fields: [
      {
        name: "Name (nickname)",
        unicode: "yes",
        limit: 30,
        note: "Accepts Unicode styles, and TikTok limits changes to roughly once a week.",
      },
      {
        name: "Username (@handle)",
        unicode: "no",
        limit: null,
        note: "Letters, numbers, underscores, and periods only. Styled characters are rejected outright.",
      },
      {
        name: "Bio",
        unicode: "yes",
        limit: 80,
        note: "The tightest bio limit of the major platforms, so wide styles such as fullwidth run out of room quickly.",
      },
      {
        name: "Video captions",
        unicode: "yes",
        limit: null,
        note: "Styled text works, but keep hashtags plain so they stay clickable and searchable.",
      },
    ],
    faq: [
      {
        question: "What is a TikTok font generator?",
        answer:
          "TikTok has no font picker. This tool makes Unicode letters for the 80-character bio, the nickname, and captions. The @handle stays plain.",
      },
      {
        question: "Why is my bio suddenly too long?",
        answer:
          "Fancy letters still count, and fullwidth looks even wider. Cut the line or switch to small caps / sans bold. The limit is 80.",
      },
      {
        question: "Can I style the TikTok @handle?",
        answer:
          "No. Styled characters are rejected. Put Unicode in the nickname or bio instead. Nickname changes are limited to roughly once a week.",
      },
      {
        question: "Will this show on iPhone and Android?",
        answer:
          "Most common styles will. If you see a box, try sans bold or drop fullwidth.",
      },
      {
        question: "Should I use this or the homepage converter?",
        answer:
          "This page is filtered for TikTok-friendly styles and field limits. The homepage is every style at once, including ones that will not fit an 80-character bio.",
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
      "Type the bio, display name, or caption. Watch the 150-character bio limit—script still counts.",
      "Preview cursive, bold, or small caps. Skip dense zalgo; Instagram often will not save it.",
      "Copy and paste into Edit profile. Leave the @username in lowercase letters so search still works.",
    ],
    usesHeading: "Bio and captions, not the handle",
    uses: [
      "The 150-character bio (blank lines collapse unless a line holds an invisible character)",
      "The 30-character display name—Instagram also limits how often you can change it",
      "Captions and comments, with hashtags left in plain letters",
    ],
    fieldsHeading: "Instagram name, username, bio, and captions",
    fieldsLead:
      "Instagram will not load a custom typeface. Unicode in the bio is the workaround. The @handle is the field that never accepts it.",
    fields: [
      {
        name: "Name (display name)",
        unicode: "yes",
        limit: 30,
        note: "Accepts Unicode styles. Instagram limits how often this can be changed, so settle on a style before saving repeatedly.",
      },
      {
        name: "Username (@handle)",
        unicode: "no",
        limit: 30,
        note: "Restricted to lowercase letters, numbers, periods, and underscores. No Unicode style can be used here, and this is also what keeps you findable in search.",
      },
      {
        name: "Bio",
        unicode: "yes",
        limit: 150,
        note: "The best place for styled text. Blank lines are collapsed unless the line holds an invisible character.",
      },
      {
        name: "Captions and comments",
        unicode: "yes",
        limit: null,
        note: "Styled text works, but keep hashtags and keywords in plain letters or they stop matching searches.",
      },
    ],
    extraSections: [
      {
        id: "instagram-font-text",
        heading: "Instagram font text without a font picker",
        paragraphs: [
          "Instagram never installs a typeface from this site. The letters you copy are Unicode look-alikes, so they show up in the bio and display name using Instagram’s own font. That is what people mean by Instagram font text or an Instagram font changer.",
          "Leave hashtags, your @handle, and the words people search in plain letters. Style one short line for flair so the bio still reads on a phone.",
        ],
        bullets: [
          "Bios: 150 characters, including fancy letters.",
          "Display name: 30 characters, and Instagram limits how often you can change it.",
          "Usernames: lowercase ASCII only—never paste styled text there.",
        ],
      },
    ],
    faq: [
      {
        question: "What is an Instagram font generator?",
        answer:
          "Instagram has no font picker for bios. An Instagram font generator converts letters to Unicode look-alikes you paste in. Nothing installs. The @handle stays lowercase letters.",
      },
      {
        question: "What is an Instagram font changer?",
        answer:
          "An Instagram font changer is the same tool: convert normal text into Unicode fancy fonts because Instagram does not let you pick installed fonts in the app.",
      },
      {
        question: "Why won’t Instagram let me pick a font?",
        answer:
          "The app has no font picker for bios. This page converts letters to Unicode look-alikes you paste in. Nothing installs.",
      },
      {
        question: "What gets rejected or boxed?",
        answer:
          "Dense Zalgo/glitch, some squared letters, and rare letterlike symbols. Prefer cursive, bold, sans bold, bubble, or small caps. Stay under 150 characters.",
      },
      {
        question: "Do Reels captions keep the style?",
        answer:
          "Usually. Keep the line short and leave hashtags in plain type so they stay searchable.",
      },
      {
        question: "I need a stacked bio with spacers.",
        answer:
          "Use the social media bio generator for line breaks and a live 150-character counter. This gallery is for a single styled line.",
      },
      {
        question: "Will a fancy bio hurt search?",
        answer:
          "Put niche keywords in plain letters. One stylish line for flair is enough so people and assistive tech can still read the important words.",
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
      "For a chat message, try WhatsApp’s own *bold*, _italic_, and ~strike~ first—those stay searchable.",
      "For status, About, or a group name (no markdown there), type a short line here and pick bold, cursive, or bubble.",
      "Copy and paste. If a glyph boxes out, switch to sans bold.",
    ],
    usesHeading: "Status and group names, not chat markdown",
    uses: [
      "About / status lines that cannot use *bold*",
      "Group names (keep them short)",
      "A single stylish word in a chat, if you really want Unicode instead of markdown",
    ],
    fieldsHeading: "WhatsApp name, About, groups, and chats",
    fieldsLead:
      "WhatsApp already has markdown in chats. Unicode is the workaround for fields that do not parse *asterisks*.",
    fields: [
      {
        name: "Profile name",
        unicode: "yes",
        limit: 25,
        note: "Short Unicode usually saves. Keep it to a couple of words.",
      },
      {
        name: "About",
        unicode: "yes",
        limit: 139,
        note: "The best WhatsApp slot for a stylish line. Markdown does not apply here.",
      },
      {
        name: "Group name",
        unicode: "yes",
        limit: 25,
        note: "Fancy letters often work. Skip glitch and long bubble strings.",
      },
      {
        name: "Chat messages",
        unicode: "yes",
        limit: null,
        note: "Unicode pastes, but *bold* _italic_ ~strike~ markdown is cleaner and stays searchable.",
      },
    ],
    faq: [
      {
        question: "What are WhatsApp fonts?",
        answer:
          "WhatsApp fonts usually mean Unicode you paste into About, status, or a group name. In chats, *bold* _italic_ ~strike~ markdown is cleaner and stays searchable.",
      },
      {
        question: "Should I use *bold* or this Unicode?",
        answer:
          "In chats, *bold* is better: it is real formatting on normal letters. Use this page for About, status, and group names, where markdown does not run.",
      },
      {
        question: "Will this show on iPhone and Android?",
        answer:
          "Bold, cursive, and bubble usually do. If a character fails, try sans bold. You do not need a paid font pack.",
      },
      {
        question: "Can I fancy-text a group name?",
        answer:
          "Often, if you keep it short. Test on the phones in the group—some symbols render differently.",
      },
      {
        question: "Why can’t people find my name in search?",
        answer:
          "Chat search looks for ordinary letters. Keep the words you care about in plain type, then add one stylish word if you want.",
      },
    ],
  }),
  platform("social-media-bio-generator", "bio-builder", {
    initialText: "your name\ncreator · city",
    howToHeading: "How to build a multi-platform bio",
    usesHeading: "Character limits this counter knows",
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
      "Type a short display name (50 characters) or a bio line (160).",
      "Stay on sans bold, bold, italic, or cursive. Skip glitch and dense bubble stacks.",
      "Copy, then paste in Edit profile. Check X’s own counter after pasting.",
    ],
    usesHeading: "Profile fields, not tweet search",
    uses: [
      "The display name people see",
      "The 160-character bio",
      "A short reply flourish—knowing search will not match the fancy spelling",
    ],
    fieldsHeading: "X display name vs @handle vs bio",
    fieldsLead:
      "The handle is 15 characters of letters, numbers, and underscores. Unicode belongs in the display name and bio.",
    fields: [
      {
        name: "Display name",
        unicode: "yes",
        limit: 50,
        note: "Accepts Unicode styles and can be changed as often as you like.",
      },
      {
        name: "Username (@handle)",
        unicode: "no",
        limit: 15,
        note: "Letters, numbers, and underscores only, with the shortest handle limit of any major platform.",
      },
      {
        name: "Bio",
        unicode: "yes",
        limit: 160,
        note: "Accepts Unicode styles. Links and @mentions still work around styled text.",
      },
      {
        name: "Posts",
        unicode: "yes",
        limit: null,
        note: "Styled text posts fine, but it is excluded from search results because it no longer matches the plain words people type.",
      },
    ],
    extraSections: [
      {
        id: "twitter-fonts-generator",
        heading: "Twitter fonts generator for names, not tweets",
        paragraphs: [
          "X (Twitter) has no font picker. This Twitter fonts generator makes Unicode for the 50-character display name and 160-character bio. Posts can take the same letters, but search will not match them—keep tweet copy in normal type.",
        ],
        bullets: [
          "Sans bold, bold, italic, and short script names survive most often.",
          "The @handle is 15 characters of letters, numbers, and underscores only.",
          "Check X’s own counter after you paste; fancy letters still count.",
        ],
      },
    ],
    faq: [
      {
        question: "What is a Twitter font generator?",
        answer:
          "X (Twitter) has no font picker. This generator makes Unicode for the display name and 160-character bio. The @handle stays letters, numbers, and underscores.",
      },
      {
        question: "Does X (Twitter) allow fancy fonts in names?",
        answer:
          "Display names usually accept Unicode. The @handle does not.",
      },
      {
        question: "Can the @handle be fancy?",
        answer:
          "No. Display names accept many Unicode letters. The @handle is the shortest of the major apps (15 characters) and stays plain.",
      },
      {
        question: "How long can a fancy bio be?",
        answer:
          "160 characters, and fancy letters still count. Use the social media bio generator if you want a live 160-character counter.",
      },
      {
        question: "Which styles usually survive on X?",
        answer:
          "Sans bold, bold, italic, and cursive. Glitch, squared, and heavy combining marks often fail or look like boxes.",
      },
      {
        question: "Will people find my tweets if the words are styled?",
        answer:
          "Search matches ordinary letters. Styled posts often drop out of search. Keep the tweet body plain; style the name if you want.",
      },
    ],
  }),
  platform("roblox-font-generator", "fonts", {
    styleIds: ["sans-bold", "bold", "small-caps", "monospace", "italic"],
    initialText: "Roblox",
    presets: ["Roblox", "DisplayName", "clan", "user"],
    howToHeading: "How to use Roblox fonts",
    howToSteps: [
      "Type the display name you want—not the account username, which is stricter.",
      "Start with sans bold or small caps. Roblox strips a lot of novelty symbols.",
      "Copy, paste in Roblox settings, and see if it saves. If it bounces, shorten it or drop bubble.",
    ],
    usesHeading: "Display names and UI labels",
    uses: [
      "Display names after you confirm Roblox does not strip the characters",
      "Experience titles you type yourself",
      "A jump to HTML-like tags for supported Roblox UI (that is markup, not this Unicode)",
    ],
    fieldsHeading: "Roblox username vs display name vs chat",
    fieldsLead:
      "Roblox filters novelty letters aggressively. Always paste in the app and check that the name saves before you tell anyone the new look.",
    fields: [
      {
        name: "Display name",
        unicode: "filtered",
        limit: 20,
        note: "Looser than the account username, but still strips many symbols. Sans bold and small caps fail less often.",
      },
      {
        name: "Account username",
        unicode: "no",
        limit: 20,
        note: "Login handle. Fancy letters almost never save here—keep it plain.",
      },
      {
        name: "Chat",
        unicode: "filtered",
        limit: null,
        note: "Stricter than display names. If chat strips the style, keep fancy text on the profile only.",
      },
    ],
    extraSections: [
      {
        id: "roblox-unicode-vs-rich",
        heading: "Roblox fonts vs Roblox rich text",
        paragraphs: [
          "This page previews Unicode letters you paste into a display name. That is not the same as Roblox rich text tags such as <b> or <font> in experience UI. If you searched for a Roblox rich text generator or a Roblox friendly font, use Unicode here for names, and the HTML text generator for tag snippets.",
        ],
        bullets: [
          "Start with sans bold, small caps, or monospace—those survive filters more often than bubble or glitch.",
          "Always test in Roblox after copying. A preview that looks fine here can still bounce in the app.",
          "Account usernames stay plain so friends can still search for you.",
        ],
      },
    ],
    faq: [
      {
        question: "What is a Roblox font generator?",
        answer:
          "It previews Unicode for Roblox display names. Account usernames are much stricter. Always paste in Roblox and see if it saves—filters strip a lot of novelty symbols.",
      },
      {
        question: "Can I use fancy fonts in a Roblox username?",
        answer:
          "Account usernames almost never accept them. Display names are looser but still reject many symbols. Always test after pasting.",
      },
      {
        question: "Can the account username be cursive?",
        answer:
          "Almost never. Account usernames are tightly filtered. Display names are looser but still reject many symbols. Always test after pasting.",
      },
      {
        question: "Why did Roblox bounce my name?",
        answer:
          "Filters block unusual Unicode, lookalike letters, and some punctuation. Sans bold and small caps fail less often than bubble or glitch. Cherokee and CJK belong on the cool text generator, then test—they often get stripped.",
      },
      {
        question: "Is this the same as Roblox rich text tags?",
        answer:
          "No. This page is Unicode letters. Some experience UI supports tags like <b>—open the HTML text generator for those snippets.",
      },
      {
        question: "Will chat keep the style?",
        answer:
          "Chat filters are stricter than display names. If chat strips it, keep fancy text on the profile only.",
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
      "Type a short display name—not a whole post.",
      "Preview sans bold, bold, or cursive. Skip glitch and dense hearts; Facebook may treat them as spam.",
      "Copy and paste under Profile → Edit. Leave the username / handle in plain letters so people can find you.",
    ],
    usesHeading: "Names friends see, not the login",
    uses: [
      "The display name on a profile",
      "Page names, if they stay readable and pass review",
      "A short stylish word in a comment",
    ],
    fieldsHeading: "Facebook display name vs username vs comments",
    fieldsLead:
      "Facebook can still reject names that look fake or like a string of symbols. Keep the @username plain.",
    fields: [
      {
        name: "Display name",
        unicode: "filtered",
        limit: null,
        note: "Often accepts Unicode, but Facebook can still reject names that look fake, spammy, or like a string of symbols.",
      },
      {
        name: "Username (@handle)",
        unicode: "no",
        limit: null,
        note: "Letters, digits, and periods. Keep this plain so people can find the profile.",
      },
      {
        name: "Intro / about",
        unicode: "yes",
        limit: null,
        note: "A short stylish word is fine. Long blackletter paragraphs are hard to read and box out on some phones.",
      },
      {
        name: "Comments",
        unicode: "yes",
        limit: null,
        note: "A single fancy word usually pastes. Dense zalgo looks like spam.",
      },
    ],
    faq: [
      {
        question: "What is a Facebook font generator?",
        answer:
          "Facebook has no name font picker. This generator makes Unicode for the display name. Keep the @username in plain letters so people can find you.",
      },
      {
        question: "Does Facebook allow fancy fonts in names?",
        answer:
          "Display names often accept Unicode. The @username is much stricter. If save fails, drop bubble or gothic and retry with a shorter name.",
      },
      {
        question: "Will Facebook save a cursive first name?",
        answer:
          "Sometimes. Display names often accept Unicode. The @username is much stricter. If save fails, drop bubble or gothic and retry with a shorter name.",
      },
      {
        question: "Can I change the Facebook app font?",
        answer:
          "No. You cannot install a typeface in the app. This only changes the characters you paste into a field.",
      },
      {
        question: "Do comments keep fancy letters?",
        answer:
          "A short word usually yes. Long Fraktur or glitch strings look like boxes on some phones and may get extra spam scrutiny.",
      },
      {
        question: "Which styles are least likely to bounce?",
        answer:
          "Sans bold, bold, italic, and cursive. Bubble is playful but wide. Old English and combining marks fail more often.",
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
      "Type two or three words—Snapchat profiles are tiny.",
      "Start with sans bold or bubble. Script and combining marks fail more often.",
      "Copy, paste into profile settings, and confirm it saves. If it does not, strip symbols and retry.",
    ],
    usesHeading: "Short display names, picky filters",
    uses: [
      "The display name friends see on the profile row",
      "A short story caption, knowing some snaps flatten Unicode to the default font",
    ],
    fieldsHeading: "Snapchat display name vs username vs stories",
    fieldsLead:
      "Snapchat has no font picker and rejects a long list of symbols. Friends still find you by the plain username.",
    fields: [
      {
        name: "Display name",
        unicode: "filtered",
        limit: null,
        note: "Unicode sometimes saves. If save fails, try sans bold or bubble, then shorten the name.",
      },
      {
        name: "Username",
        unicode: "no",
        limit: null,
        note: "The login handle stays plain. Friends find you by this, not the fancy display line.",
      },
      {
        name: "Story / Spotlight captions",
        unicode: "filtered",
        limit: null,
        note: "Some captions keep Unicode; others flatten to the default font. Test a short line on your device.",
      },
    ],
    extraSections: [
      {
        id: "snapchat-fonts-how",
        heading: "Fonts on Snapchat without a font picker",
        paragraphs: [
          "Snapchat does not let you pick a typeface. A font for Snapchat is Unicode you paste into the display name. Filters reject a long list of symbols, so save often and fall back to sans bold or bubble if the name will not stick.",
        ],
        bullets: [
          "Keep the login username plain—friends still find you by that handle.",
          "Two or three words is enough; long script names fail more often.",
          "Story captions sometimes flatten styled text to the default font. Test on your phone.",
        ],
      },
    ],
    faq: [
      {
        question: "What is a Snapchat font generator?",
        answer:
          "Snapchat has no font picker for display names. This generator makes Unicode you paste in. Filters reject many symbols—try sans bold or bubble, then shorten if save fails.",
      },
      {
        question: "Can I change Snapchat fonts in the app?",
        answer:
          "No. There is no font picker. You paste Unicode into the display name, and filters still reject many symbols.",
      },
      {
        question: "Why won’t Snapchat save my fancy name?",
        answer:
          "The character set is filtered for abuse and spoofing. Drop combining marks, try sans bold or bubble, and keep the username handle plain.",
      },
      {
        question: "Do story captions keep the style?",
        answer:
          "Sometimes. Some captions accept Unicode; others flatten. Test a short bold or bubble line on your device.",
      },
      {
        question: "Cursive or bubble for the profile row?",
        answer:
          "Bubble and bold are the usual first try. Long cursive names get clipped—two or three words max.",
      },
      {
        question: "Is this looser than Instagram?",
        answer:
          "No. Same Unicode idea, tighter space and pickier filters. Skip fullwidth and glitch.",
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
