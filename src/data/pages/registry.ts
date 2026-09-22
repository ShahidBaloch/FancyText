import { KAOMOJI_HUB_VARIANTS } from "@/data/kaomoji-copy";

export type PageGroup =
  | "A_Hub"
  | "B_Cursive"
  | "C_CopyPaste"
  | "D_Bold"
  | "D_Style_Other"
  | "E_Platform"
  | "F_Kaomoji"
  | "G_Aesthetic_Cute"
  | "G_Name"
  | "H_Trust"
  | "I_Guides";

export type PageEntry = {
  phase: number;
  priority: "P0" | "P1" | "P2";
  url: string;
  group: PageGroup;
  primaryKeyword: string;
  title: string;
  description: string;
  fellowKeywords: string[];
  navLabel?: string;
  /** Defaults to true. False = live for old links, noindex, omitted from sitemap. */
  index?: boolean;
  /**
   * Optional per-URL sitemap lastmod (YYYY-MM-DD or ISO datetime).
   * Falls back to CONTENT_UPDATED_AT. Set only when that page actually changed.
   */
  updated?: string;
};

function fellows(...items: string[]): string[] {
  return items;
}

/** Registry driven by nextjs-page-blueprint.csv (planning folder). */
export const PAGES: PageEntry[] = [
  {
    phase: 0,
    priority: "P0",
    url: "/",
    group: "A_Hub",
    primaryKeyword: "fancy text generator",
    title: "Fancy Text Generator — Stylize Unicode Fonts | FancifyText",
    description:
      "Free fancy text generator. Convert normal letters into bold, cursive, bubble, and stylish Unicode for Discord, Instagram, TikTok, and more.",
    fellowKeywords: fellows(
      "special text generator",
      "word font generator",
      "pretty font generator",
      "font changer text",
      "font generators",
      "unicode text generator",
    ),
    navLabel: "Home",
  },
  {
    phase: 1,
    priority: "P0",
    url: "/cursive-text-generator/",
    group: "B_Cursive",
    primaryKeyword: "cursive text generator",
    title: "Cursive Text Generator — Script Fonts Copy & Paste",
    description:
      "Cursive text generator. Type a name or phrase into cursive Unicode. Copy elegant script words plus the full A–Z alphabet—no font download.",
    fellowKeywords: fellows(
      "elegant cursive fonts copy and paste",
      "cursive copy and paste fonts",
      "cursive alphabet",
      "script font generator",
      "names in cursive generator",
      "script letter generator",
    ),
    navLabel: "Cursive",
  },
  {
    phase: 2,
    priority: "P0",
    url: "/bold-text-generator/",
    group: "D_Bold",
    primaryKeyword: "bold text generator",
    title: "Bold Text Generator — Bold Fonts Copy & Paste | FancifyText",
    description:
      "Bold text generator. Make bold Unicode text instantly—bold text copy and paste for Discord, Instagram, and bios. Same tool people search as bold font generator or bold font style.",
    fellowKeywords: fellows(
      "bold font generator",
      "bold text font",
      "text bold",
      "bolded text",
      "bold text copy and paste",
      "bold copy paste",
      "bold font style",
    ),
    navLabel: "Bold",
  },
  {
    phase: 2,
    priority: "P0",
    url: "/italic-text-generator/",
    group: "D_Style_Other",
    primaryKeyword: "italic text generator",
    title: "Italic Text Generator — Slanted Fonts Copy & Paste",
    description:
      "Italic text generator. Convert text to italic Unicode fonts in one click. Copy slanted letters for quotes, captions, and bios.",
    fellowKeywords: fellows("italic font generator"),
    navLabel: "Italic",
  },
  {
    phase: 2,
    priority: "P1",
    url: "/bubble-text-generator/",
    group: "D_Style_Other",
    primaryKeyword: "bubble text generator",
    title: "Bubble Text Generator — Circled Letters Copy & Paste",
    description:
      "Bubble text generator. Generate circled bubble letters and numbers only. Cute fonts mix bubble with kawaii extras; this tool is the circled-letter converter.",
    fellowKeywords: fellows("bubble font generator"),
    navLabel: "Bubble",
  },
  {
    phase: 2,
    priority: "P1",
    url: "/small-caps-text-generator/",
    group: "D_Style_Other",
    primaryKeyword: "small caps generator",
    title: "Small Caps Generator — ꜱᴍᴀʟʟ ᴄᴀᴘꜱ Copy & Paste | FancifyText",
    description:
      "Small caps generator. Turn text into small capitals (short-cap Unicode), not tiny superscript bios and not math subscripts. Includes why the letter x has no small-caps form.",
    fellowKeywords: fellows(
      "small caps text",
      "small capital letters",
      "small caps fonts generator",
    ),
    navLabel: "Small Caps",
  },
  {
    phase: 2,
    priority: "P1",
    url: "/monospace-text-generator/",
    group: "D_Style_Other",
    primaryKeyword: "monospace text generator",
    title: "Monospace Text Generator — Typewriter Text | FancifyText",
    description:
      "Monospace text generator. Fixed-width Unicode letters and digits for bios and names. Includes what Discord does to them and when to use a real code block.",
    fellowKeywords: fellows("typewriter font generator", "monospace font copy paste"),
    navLabel: "Monospace",
  },
  {
    phase: 2,
    priority: "P1",
    url: "/strikethrough-text-generator/",
    group: "D_Style_Other",
    primaryKeyword: "strikethrough text generator",
    title: "Strikethrough Text Generator — Cross Out Text | FancifyText",
    description:
      "Strikethrough text generator. Add strikethrough to any text with Unicode combining marks. Copy crossed-out text for jokes and bios.",
    fellowKeywords: fellows("strikethrough font"),
  },
  {
    phase: 2,
    priority: "P1",
    url: "/superscript-subscript-generator/",
    group: "D_Style_Other",
    primaryKeyword: "superscript and subscript generator",
    title: "Superscript & Subscript Generator — Math & Footnotes",
    description:
      "Superscript and subscript generator. Raise or lower characters for math, chemistry-style notes, and footnotes (H₂O, x²). This is not a tiny-bio or small-caps tool.",
    fellowKeywords: fellows("superscript generator", "subscript generator"),
  },
  {
    phase: 2,
    priority: "P2",
    url: "/upside-down-text-generator/",
    group: "D_Style_Other",
    primaryKeyword: "upside down text",
    title: "Upside Down Text Generator — Flip Text Copy & Paste",
    description:
      "Upside down text. Flip your text upside down with Unicode. Copy reversed, inverted text for memes and novelty bios.",
    fellowKeywords: fellows("upside down text generator"),
  },
  {
    phase: 2,
    priority: "P2",
    url: "/glitch-text-generator/",
    group: "D_Style_Other",
    primaryKeyword: "glitch text generator",
    title: "Glitch Text Generator — Zalgo Cursed Text | FancifyText",
    description:
      "Glitch text generator. Create glitchy Zalgo-style cursed text. Copy distorted combining-mark effects for horror aesthetics and usernames.",
    fellowKeywords: fellows("zalgo text"),
  },
  {
    phase: 3,
    priority: "P0",
    url: "/copy-paste-fonts/",
    group: "C_CopyPaste",
    primaryKeyword: "copy and paste fonts",
    title: "Copy and Paste Fonts — Unicode Font Collections",
    description:
      "Copy and paste fonts by collection: aesthetic, cute, cursive, cool lookalikes, platform fonts, and big ASCII. Unicode styles—not a second full gallery.",
    fellowKeywords: fellows(
      "font copy and paste",
      "fonts copy paste",
      "copy paste fonts",
    ),
    navLabel: "Copy & Paste",
  },
  {
    phase: 3,
    priority: "P1",
    url: "/aesthetic-fonts/",
    group: "G_Aesthetic_Cute",
    primaryKeyword: "aesthetic fonts",
    title: "Aesthetic Fonts — Soft Wide & Script Unicode | FancifyText",
    description:
      "Aesthetic fonts. Aesthetic Unicode fonts: soft fullwidth, script, and delicate small caps. This page is not cute bubble/kawaii, not stylish bold/glitch, and not cool lookalikes.",
    fellowKeywords: fellows(
      "font generator aesthetic",
      "aesthetic font generator",
      "aesthetic text generator",
    ),
  },
  {
    phase: 3,
    priority: "P1",
    url: "/cute-fonts/",
    group: "G_Aesthetic_Cute",
    primaryKeyword: "cute fonts copy and paste",
    title: "Cute Fonts Copy and Paste — Bubble & Kawaii Unicode",
    description:
      "Cute fonts copy and paste. Copy cute kawaii fonts: bubble letters, squared caps, hearts, and parenthesized glyphs. Not aesthetic fullwidth, not stylish bold, and not cool lookalikes.",
    fellowKeywords: fellows(
      "cute font generator",
      "kawaii fonts",
      "kawaii fonts copy and paste",
      "cute kawaii fonts copy and paste",
      "kawaii letters copy and paste",
      "kawaii writing copy and paste",
    ),
  },
  {
    phase: 3,
    priority: "P1",
    url: "/name-font-generator/",
    group: "G_Name",
    primaryKeyword: "name fonts",
    title: "Name Font Generator — Username-Safe Unicode Fonts",
    description:
      "Name fonts. Turn a name or username into copy-ready Unicode fonts. Compare sans bold, script, and small caps that survive most username filters—not cool lookalikes.",
    fellowKeywords: fellows("username fonts", "display name fonts"),
  },
  {
    phase: 3,
    priority: "P2",
    url: "/stylish-text-generator/",
    group: "G_Aesthetic_Cute",
    primaryKeyword: "stylish text generator",
    title: "Stylish Text Generator — Bold & Graphic Unicode",
    description:
      "Stylish text generator. Generate stylish text with bold, italic, glitch, and graphic Unicode. High-contrast—not cute bubble, not aesthetic fullwidth, and not cool lookalikes.",
    fellowKeywords: fellows("stylish fonts", "create stylish text"),
  },
  {
    phase: 6,
    priority: "P0",
    url: "/cool-text-generator/",
    group: "G_Aesthetic_Cute",
    primaryKeyword: "cool text generator",
    title: "Cool Text Generator — Japanese, Squared & Letterlike Styles",
    description:
      "Cool Unicode lookalikes: Japanese, CJK, Cherokee, fat, and squared styles. Copy cool fonts for Discord, bios, and gaming names—not TTF downloads.",
    fellowKeywords: fellows(
      "cool fonts copy paste",
      "cool font generator",
      "cool letters copy paste",
      "japanese letters copy paste",
      "cool text copy paste",
      "cool text",
    ),
    navLabel: "Cool Text",
  },
  {
    phase: 4,
    priority: "P0",
    url: "/discord-color-text/",
    group: "E_Platform",
    primaryKeyword: "discord colored text generator",
    title: "Discord Color Text Generator — ANSI Copy & Paste",
    description:
      "Discord colored text generator. Make Discord colored text with ANSI code blocks. Copy red, blue, green, and more for messages and announcements.",
    fellowKeywords: fellows(
      "discord text color",
      "discord color text",
      "discord color codes",
      "discord colored text",
    ),
  },
  {
    phase: 4,
    priority: "P1",
    url: "/discord-font-generator/",
    group: "E_Platform",
    primaryKeyword: "discord font generator",
    title: "Discord Font Generator — Discord Fonts Copy & Paste",
    description:
      "Discord font generator for display names, nicknames, and about-me. Copy Discord fonts—bold, script, bubble, monospace—and fancy font for Discord without Nitro.",
    fellowKeywords: fellows(
      "discord font copy and paste",
      "discord text generator",
      "cute discord fonts",
      "discord fonts",
      "font for discord",
      "font generator discord",
      "fancy font discord",
      "discordfonts",
    ),
    navLabel: "Discord",
  },
  {
    phase: 4,
    priority: "P1",
    url: "/tiktok-font-generator/",
    group: "E_Platform",
    primaryKeyword: "tiktok font generator",
    title: "TikTok Font Generator — Profile & Caption Fonts",
    description:
      "TikTok font generator. Create TikTok profile and caption fonts with aesthetic Unicode text. Copy and paste into your profile or posts.",
    fellowKeywords: fellows("tiktok bio fonts", "tiktok font name"),
  },
  {
    phase: 4,
    priority: "P1",
    url: "/instagram-font-generator/",
    group: "E_Platform",
    primaryKeyword: "instagram font generator",
    title: "Instagram Font Generator — Aesthetic Bio Font Changer",
    description:
      "Instagram font generator. Change Instagram bio text and captions with fancy Unicode—Instagram font text in script, aesthetic, and bold styles you copy and paste.",
    fellowKeywords: fellows(
      "instagram font changer",
      "instagram fonts copy and paste",
      "instagram text generator",
      "instagram font text",
    ),
    navLabel: "Instagram",
  },
  {
    phase: 4,
    priority: "P1",
    url: "/html-text-generator/",
    group: "E_Platform",
    primaryKeyword: "html text generator",
    title: "HTML Text Generator — Rich Text Snippets | FancifyText",
    description:
      "HTML text generator. Generate HTML and rich text snippets—bold, color spans, headings, and pre blocks to copy and paste.",
    fellowKeywords: fellows(
      "rich text generator",
      "colored text copy and paste",
      "roblox rich text",
    ),
  },
  {
    phase: 4,
    priority: "P2",
    url: "/whatsapp-fonts/",
    group: "E_Platform",
    primaryKeyword: "whatsapp fonts",
    title: "WhatsApp Fonts — Stylish Text Copy & Paste | FancifyText",
    description:
      "Generate WhatsApp fonts for status, group names, and chats. Copy bold, cursive, bubble, and more Unicode styles.",
    fellowKeywords: fellows(
      "whatsapp font style",
      "fancy text for whatsapp",
    ),
  },
  {
    phase: 4,
    priority: "P2",
    url: "/social-media-bio-generator/",
    group: "E_Platform",
    primaryKeyword: "social media bio generator",
    title: "Social Media Bio Generator — Multi-Platform Bio Fonts",
    description:
      "Social media bio generator. Build a multi-line social bio with Instagram, TikTok, X, and Discord character counts. Style each line in Unicode and copy the stacked result.",
    fellowKeywords: fellows(
      "bio font generator",
      "social bio generator",
      "bio font maker",
    ),
  },
  {
    phase: 4,
    priority: "P2",
    url: "/twitter-font-generator/",
    group: "E_Platform",
    primaryKeyword: "twitter font generator",
    title: "X / Twitter Font Generator — Display Name & Bio",
    description:
      "Twitter font generator. Style an X (Twitter) display name and 160-character bio with Unicode fonts. Copy short, readable styles that survive the profile fields.",
    fellowKeywords: fellows(
      "x font generator",
      "twitter fonts copy and paste",
      "twitter bio fonts",
      "twitter fonts generator",
    ),
  },
  {
    phase: 4,
    priority: "P2",
    url: "/roblox-font-generator/",
    group: "E_Platform",
    primaryKeyword: "roblox font generator",
    title: "Roblox Font Generator — Username & Display Name",
    description:
      "Roblox font generator. Preview Unicode styles for Roblox display names. See which fonts survive filters, plus a path to Roblox rich text tags.",
    fellowKeywords: fellows(
      "roblox fonts copy and paste",
      "roblox name fonts",
      "roblox stylish text",
      "roblox rich text generator",
      "roblox friendly font",
    ),
  },
  {
    phase: 4,
    priority: "P2",
    url: "/snapchat-font-generator/",
    group: "E_Platform",
    primaryKeyword: "snapchat font generator",
    title: "Snapchat Font Generator — Display Name Styles | FancifyText",
    description:
      "Snapchat font generator. Copy Snapchat display-name fonts with bubble, bold, and script Unicode. Keep names short so they fit the Snapchat profile field.",
    fellowKeywords: fellows(
      "snapchat fonts copy and paste",
      "snapchat stylish text",
      "font for snapchat",
      "fonts on snapchat",
    ),
  },
  {
    phase: 7,
    priority: "P0",
    url: "/linkedin-text-formatter/",
    group: "E_Platform",
    primaryKeyword: "linkedin text formatter",
    title: "LinkedIn Text Formatter — Bold & Italic for Posts",
    description:
      "Bold and italic for LinkedIn posts, with a feed preview, “see more” fold, and field limits. Hand-format here—or paste AI Markdown into the ChatGPT tool.",
    fellowKeywords: fellows(
      "linkedin bold text",
      "linkedin font generator",
      "linkedin post formatter",
      "bold text for linkedin",
      "linkedin italic text",
    ),
    navLabel: "LinkedIn",
  },
  {
    phase: 7,
    priority: "P0",
    url: "/chatgpt-to-linkedin/",
    group: "E_Platform",
    primaryKeyword: "chatgpt to linkedin formatter",
    title: "ChatGPT to LinkedIn Formatter — Markdown to Post",
    description:
      "Paste Markdown from ChatGPT, Claude, or Gemini. Get LinkedIn-ready bold, headings, and bullets—em dashes tidied. Not a post writer or hand formatter.",
    fellowKeywords: fellows(
      "markdown to linkedin",
      "convert chatgpt text to linkedin post",
      "paste chatgpt into linkedin",
      "markdown not working on linkedin",
      "ai text formatter for linkedin",
    ),
  },
  {
    phase: 7,
    priority: "P1",
    url: "/unformat-text/",
    group: "D_Style_Other",
    primaryKeyword: "convert fancy text to normal",
    title: "Convert Fancy Text to Normal — Unicode to Plain Text",
    description:
      "Paste styled Unicode and get plain letters: bold, script, bubble, fullwidth, small caps, and Zalgo decoded. Reverse of a font generator—not a case tool.",
    fellowKeywords: fellows(
      "unicode to text converter",
      "remove fancy font from text",
      "unformat text",
      "fancy text to normal text",
      "strip unicode styling",
    ),
  },
  {
    phase: 6,
    priority: "P2",
    url: "/facebook-font-generator/",
    group: "E_Platform",
    primaryKeyword: "facebook font generator",
    title: "Facebook Font Generator — Display Name Styles | FancifyText",
    description:
      "Facebook font generator. Copy Facebook display-name fonts with bold, cursive, and small-caps Unicode. Keep the @username in plain letters so people can still find you.",
    fellowKeywords: fellows(
      "facebook fonts copy and paste",
      "facebook stylish text",
    ),
  },
  {
    phase: 6,
    priority: "P1",
    url: "/small-text-generator/",
    group: "D_Style_Other",
    primaryKeyword: "small text generator",
    title: "Small Text Generator — Tiny Letters for Bios | FancifyText",
    description:
      "Small Unicode text for compact bios (tiny superscript with small-caps fallback). Not chemistry H₂O subscripts and not the small-caps converter.",
    fellowKeywords: fellows(
      "tiny text generator",
      "small text copy and paste",
      "mini text generator",
    ),
  },
  {
    phase: 6,
    priority: "P1",
    url: "/big-text-generator/",
    group: "D_Style_Other",
    primaryKeyword: "big text generator",
    title: "Big Text Generator — Copy Huge ASCII Letters | FancifyText",
    description:
      "Big text generator. Turn short text into large ASCII / block letters you can copy and paste. Banner art for Discord, comments, and titles—not a Unicode bio font.",
    fellowKeywords: fellows(
      "ascii art text",
      "large text copy paste",
      "ascii banner generator",
      "block letters copy paste",
    ),
    navLabel: "Big Text",
  },
  {
    phase: 6,
    priority: "P2",
    url: "/mirror-text-generator/",
    group: "D_Style_Other",
    primaryKeyword: "mirror text generator",
    title: "Mirror Text Generator — Reverse Text Copy & Paste",
    description:
      "Mirror text generator. Reverse your words into mirror-order text. Compare simple backwards letters with upside-down Unicode for memes and novelty bios.",
    fellowKeywords: fellows(
      "backwards text generator",
      "reverse text generator",
      "mirror writing",
    ),
  },
  {
    phase: 6,
    priority: "P2",
    url: "/old-english-text-generator/",
    group: "D_Style_Other",
    primaryKeyword: "old english text generator",
    title: "Old English Text Generator — Gothic Fraktur Fonts",
    description:
      "Old English text generator. Generate old English / gothic Unicode (Fraktur). Copy blackletter names for bios and clan tags—not the same as mathematical bold.",
    fellowKeywords: fellows(
      "gothic font generator",
      "old english font copy paste",
      "fraktur text generator",
      "old fonts generator",
    ),
  },
  {
    phase: 6,
    priority: "P1",
    url: "/cool-symbols/",
    group: "C_CopyPaste",
    primaryKeyword: "cool symbols copy and paste",
    title: "Cool Symbols Copy and Paste — Stars, Arrows & Marks",
    description:
      "Cool symbols copy and paste. Copy cool Unicode symbols: stars, hearts, arrows, checks, and separators. A symbol list—not letter fonts and not kaomoji faces.",
    fellowKeywords: fellows(
      "cool symbols",
      "copy and paste symbols",
      "symbols copy and paste",
      "cute symbols",
      "text symbols copy paste",
      "special symbols copy and paste",
    ),
    navLabel: "Symbols",
  },
  {
    phase: 6,
    priority: "P0",
    url: "/emoji-combos/",
    group: "G_Aesthetic_Cute",
    primaryKeyword: "emoji combos",
    title: "Emoji Combos Copy and Paste — Cute & Aesthetic Strings",
    description:
      "Emoji combos copy and paste. Tap ready-made cute, aesthetic, and funny emoji strings for Discord and Instagram bios—not kaomoji text faces or Unicode fonts.",
    fellowKeywords: fellows(
      "emoji combo",
      "cute emoji combos",
      "aesthetic emoji combos",
      "emojis combined",
      "funny emoji combos",
    ),
    navLabel: "Emoji combos",
  },
  {
    phase: 6,
    priority: "P0",
    url: "/text-art/",
    group: "F_Kaomoji",
    primaryKeyword: "text art",
    title: "Text Art Copy and Paste — ASCII Faces & Dividers",
    description:
      "Text art copy and paste. Curated ASCII and Unicode art—faces, dividers, and mini scenes for chat. Tap to copy; not big FIGlet banners.",
    fellowKeywords: fellows(
      "text art copy and paste",
      "ascii art copy paste",
      "text art copy paste",
    ),
    navLabel: "Text art",
  },
  {
    phase: 6,
    priority: "P0",
    url: "/cute-symbols/",
    group: "C_CopyPaste",
    primaryKeyword: "cute symbols",
    title: "Cute Symbols Copy and Paste — Hearts, Stars & Dividers",
    description:
      "Cute symbols copy and paste. Hearts, stars, flowers, and kawaii dividers for bios—single marks, not bubble letter fonts.",
    fellowKeywords: fellows(
      "cute symbols copy and paste",
      "cute symbol",
      "copy and paste symbols",
      "symbols copy and paste",
    ),
  },
  {
    phase: 6,
    priority: "P1",
    url: "/aesthetic-symbols/",
    group: "C_CopyPaste",
    primaryKeyword: "aesthetic symbols",
    title: "Aesthetic Symbols Copy and Paste — Dividers & Stars",
    description:
      "Aesthetic symbols copy and paste. Minimal dividers, moons, stars, and brackets for soft bios—not aesthetic fullwidth fonts.",
    fellowKeywords: fellows(
      "aesthetic symbols copy and paste",
      "aesthetic copy and paste",
    ),
  },
  {
    phase: 6,
    priority: "P1",
    url: "/case-converter/",
    group: "D_Style_Other",
    primaryKeyword: "case converter",
    title: "Case Converter — Sentence, Title, Upper & Lower",
    description:
      "Convert sentence, title, upper, lower, alternating, and inverse case. Plain text with live word and character counts—not Unicode fonts.",
    fellowKeywords: fellows(
      "convert case",
      "title case converter",
      "sentence case converter",
      "uppercase to lowercase",
      "capitalize my title",
    ),
  },
  {
    phase: 6,
    priority: "P1",
    url: "/invisible-character/",
    group: "D_Style_Other",
    primaryKeyword: "invisible character",
    title: "Invisible Character — Blank Text Copy & Paste | FancifyText",
    description:
      "Copy invisible and blank characters that survive pasting. Compare blank glyphs vs zero-width controls for bios, names, and empty messages.",
    fellowKeywords: fellows(
      "blank text copy paste",
      "invisible text",
      "empty character copy paste",
      "blank space copy paste",
    ),
  },
  {
    phase: 6,
    priority: "P2",
    url: "/text-decorator/",
    group: "D_Style_Other",
    primaryKeyword: "text decorator",
    title: "Text Decorator — Wrap Words in Hearts & Frames | FancifyText",
    description:
      "Text decorator. Decorate a word with hearts, stars, flowers, or brackets around it. Copy wrapped text for bios—this is not a per-letter font changer.",
    fellowKeywords: fellows(
      "text decorator copy paste",
      "fancy text symbols around name",
      "name decorator",
    ),
  },
  {
    phase: 5,
    priority: "P1",
    url: "/kaomoji/",
    group: "F_Kaomoji",
    primaryKeyword: "kaomoji",
    title: KAOMOJI_HUB_VARIANTS.kaomoji.title,
    description: KAOMOJI_HUB_VARIANTS.kaomoji.description,
    fellowKeywords: fellows(
      "kaomoji copy paste",
      "kaomojis",
      "kamoji",
      "kaomiji",
      "kaimoji",
      "kaoemoji",
      "japanese emoticons",
      "text faces",
      "kao emoji",
    ),
    navLabel: "Kaomoji",
  },
  {
    phase: 5,
    priority: "P1",
    url: "/kamoji/",
    group: "F_Kaomoji",
    primaryKeyword: "kamoji",
    title: KAOMOJI_HUB_VARIANTS.kamoji.title,
    description: KAOMOJI_HUB_VARIANTS.kamoji.description,
    fellowKeywords: fellows("kaomoji", "kamoji copy paste", "kaomoji copy paste"),
    index: false,
  },
  {
    phase: 5,
    priority: "P1",
    url: "/kaomojis/",
    group: "F_Kaomoji",
    primaryKeyword: "kaomojis",
    title: KAOMOJI_HUB_VARIANTS.kaomojis.title,
    description: KAOMOJI_HUB_VARIANTS.kaomojis.description,
    fellowKeywords: fellows(
      "kaomojis copy paste",
      "kaomoji",
      "kaomoji copy paste",
    ),
    index: false,
  },
  {
    phase: 5,
    priority: "P1",
    url: "/angry-kaomojis/",
    group: "F_Kaomoji",
    primaryKeyword: "angry kaomoji",
    title: "Angry Kaomojis Copy and Paste | FancifyText",
    description:
      "Copy angry kaomoji and mad text faces. Free Japanese emoticons for Discord and chat.",
    fellowKeywords: fellows("mad kaomoji", "angry text face"),
  },
  {
    phase: 5,
    priority: "P1",
    url: "/bear-kaomojis/",
    group: "F_Kaomoji",
    primaryKeyword: "bear kaomoji",
    title: "Bear Kaomojis Copy and Paste | FancifyText",
    description: "Copy bear kaomoji faces like ʕ•ᴥ•ʔ. Free cute bear emoticons.",
    fellowKeywords: fellows("bear face emoticon", "cute bear kaomoji"),
  },
  {
    phase: 5,
    priority: "P1",
    url: "/cat-kaomojis/",
    group: "F_Kaomoji",
    primaryKeyword: "cat kaomoji",
    title: "Cat Kaomojis Copy and Paste | FancifyText",
    description:
      "Copy cute cat kaomoji—(=^･ω･^=) kitty & neko text faces for Discord and pet bios. Tap to copy; animal ears, not generic blush cute.",
    fellowKeywords: fellows(
      "cute cat kaomoji",
      "kitty kaomoji",
      "neko kaomoji",
    ),
  },
  {
    phase: 5,
    priority: "P1",
    url: "/confused-kaomojis/",
    group: "F_Kaomoji",
    primaryKeyword: "confused kaomoji",
    title: "Confused Kaomojis Copy and Paste | FancifyText",
    description: "Copy confused kaomoji and puzzled text faces for chat.",
    fellowKeywords: fellows("confused text face", "puzzled kaomoji"),
  },
  {
    phase: 5,
    priority: "P1",
    url: "/cry-kaomojis/",
    group: "F_Kaomoji",
    primaryKeyword: "cry kaomoji",
    title: "Cry Kaomoji Copy Paste — (T_T) Crying Faces | FancifyText",
    description:
      "Copy cry kaomoji free—(T_T), (╥_╥) & tearful text faces for Discord and chat. Tap any face; no app or login.",
    fellowKeywords: fellows("crying kaomoji", "kaomoji cry"),
  },
  {
    phase: 5,
    priority: "P1",
    url: "/cute-kaomojis/",
    group: "F_Kaomoji",
    primaryKeyword: "cute kaomoji",
    title: "Cute Kaomoji Copy Paste — (｡◕‿◕｡) Kawaii | FancifyText",
    description:
      "Copy cute kaomoji free—(｡◕‿◕｡) kawaii & blush text faces for Discord bios and Instagram. Tap to copy; works on mobile.",
    fellowKeywords: fellows("kawaii kaomoji", "cute text faces"),
  },
  {
    phase: 5,
    priority: "P1",
    url: "/drool-kaomojis/",
    group: "F_Kaomoji",
    primaryKeyword: "drool kaomoji",
    title: "Drool Kaomojis Copy and Paste | FancifyText",
    description: "Copy drool kaomoji and hungry text faces.",
    fellowKeywords: fellows("hungry kaomoji", "drooling face text"),
  },
  {
    phase: 5,
    priority: "P1",
    url: "/evil-kaomojis/",
    group: "F_Kaomoji",
    primaryKeyword: "evil kaomoji",
    title: "Evil Kaomojis Copy and Paste | FancifyText",
    description: "Copy evil kaomoji and mischievous text faces.",
    fellowKeywords: fellows("evil text face", "mischievous kaomoji"),
  },
  {
    phase: 5,
    priority: "P1",
    url: "/heart-kaomojis/",
    group: "F_Kaomoji",
    primaryKeyword: "heart kaomoji",
    title: "Heart Kaomoji Copy Paste — ♡ Love Text Faces | FancifyText",
    description:
      "Copy heart kaomoji with ♡ built in—love text faces for DMs, couple Discord & sweet bios. Free tap-to-copy; no sticker pack.",
    fellowKeywords: fellows("love kaomoji", "heart text face"),
  },
  {
    phase: 5,
    priority: "P1",
    url: "/hug-kaomojis/",
    group: "F_Kaomoji",
    primaryKeyword: "hug kaomoji",
    title: "Hug Kaomojis Copy and Paste | FancifyText",
    description: "Copy hug kaomoji and cuddle text faces.",
    fellowKeywords: fellows("hug text face", "cuddle kaomoji"),
  },
  {
    phase: 5,
    priority: "P1",
    url: "/kiss-kaomojis/",
    group: "F_Kaomoji",
    primaryKeyword: "kiss kaomoji",
    title: "Kiss Kaomojis Copy and Paste | FancifyText",
    description: "Copy kiss kaomoji and smooches text faces.",
    fellowKeywords: fellows("kiss text face", "smooch kaomoji"),
  },
  {
    phase: 5,
    priority: "P1",
    url: "/music-kaomojis/",
    group: "F_Kaomoji",
    primaryKeyword: "music kaomoji",
    title: "Music Kaomojis Copy and Paste | FancifyText",
    description: "Copy music kaomoji and singing text faces.",
    fellowKeywords: fellows("singing kaomoji", "music text face"),
  },
  {
    phase: 5,
    priority: "P1",
    url: "/sad-kaomojis/",
    group: "F_Kaomoji",
    primaryKeyword: "sad kaomoji",
    title: "Sad Kaomojis Copy and Paste | FancifyText",
    description: "Copy sad kaomoji and melancholy text faces.",
    fellowKeywords: fellows("sad text face", "melancholy kaomoji"),
  },
  {
    phase: 5,
    priority: "P1",
    url: "/shocked-kaomojis/",
    group: "F_Kaomoji",
    primaryKeyword: "shocked kaomoji",
    title: "Shocked Kaomojis Copy and Paste | FancifyText",
    description:
      "Copy shocked kaomoji and jaw-drop text faces for extreme reactions in Discord and chat.",
    fellowKeywords: fellows("shocked text face", "jaw drop kaomoji"),
  },
  {
    phase: 5,
    priority: "P1",
    url: "/thank-you-kaomojis/",
    group: "F_Kaomoji",
    primaryKeyword: "thank you kaomoji",
    title: "Thank You Kaomojis Copy and Paste | FancifyText",
    description: "Copy thank you kaomoji and grateful text faces.",
    fellowKeywords: fellows("thanks kaomoji", "arigatou emoticon"),
  },
  {
    phase: 5,
    priority: "P2",
    url: "/surprised-kaomojis/",
    group: "F_Kaomoji",
    primaryKeyword: "surprised kaomoji",
    title: "Surprised Kaomojis Copy and Paste | FancifyText",
    description:
      "Copy surprised kaomoji and soft OMG text faces for milder astonishment in chats and bios.",
    fellowKeywords: fellows("omg kaomoji", "astonished text face"),
  },
  {
    phase: 5,
    priority: "P2",
    url: "/shy-kaomojis/",
    group: "F_Kaomoji",
    primaryKeyword: "shy kaomoji",
    title: "Shy Kaomojis Copy and Paste | FancifyText",
    description: "Copy shy kaomoji and blushing text faces.",
    fellowKeywords: fellows("blushing kaomoji", "shy text face"),
  },
  {
    phase: 5,
    priority: "P2",
    url: "/excited-kaomojis/",
    group: "F_Kaomoji",
    primaryKeyword: "excited kaomoji",
    title: "Excited Kaomojis Copy and Paste | FancifyText",
    description: "Copy excited kaomoji and hyped text faces.",
    fellowKeywords: fellows("excited text face", "hype kaomoji"),
  },
  {
    phase: 5,
    priority: "P2",
    url: "/thinking-kaomojis/",
    group: "F_Kaomoji",
    primaryKeyword: "thinking kaomoji",
    title: "Thinking Kaomojis Copy and Paste | FancifyText",
    description: "Copy thinking kaomoji and pondering text faces.",
    fellowKeywords: fellows("thinking text face", "hmm kaomoji"),
  },
  {
    phase: 5,
    priority: "P2",
    url: "/scared-kaomojis/",
    group: "F_Kaomoji",
    primaryKeyword: "scared kaomoji",
    title: "Scared Kaomojis Copy and Paste | FancifyText",
    description: "Copy scared kaomoji and frightened text faces.",
    fellowKeywords: fellows("scared text face", "fear kaomoji"),
  },
  {
    phase: 5,
    priority: "P2",
    url: "/dog-kaomojis/",
    group: "F_Kaomoji",
    primaryKeyword: "dog kaomoji",
    title: "Dog Kaomojis Copy and Paste | FancifyText",
    description: "Copy dog kaomoji and puppy text faces.",
    fellowKeywords: fellows("dog face emoticon", "puppy kaomoji"),
  },
  {
    phase: 5,
    priority: "P2",
    url: "/funny-kaomojis/",
    group: "F_Kaomoji",
    primaryKeyword: "funny kaomoji",
    title: "Funny Kaomojis Copy and Paste | FancifyText",
    description: "Copy funny kaomoji and joking text faces.",
    fellowKeywords: fellows("funny text face", "lol kaomoji"),
  },
  {
    phase: 5,
    priority: "P2",
    url: "/proud-kaomojis/",
    group: "F_Kaomoji",
    primaryKeyword: "proud kaomoji",
    title: "Proud Kaomojis Copy and Paste | FancifyText",
    description: "Copy proud kaomoji and smug text faces.",
    fellowKeywords: fellows("proud text face", "smug kaomoji"),
  },
  {
    phase: 5,
    priority: "P1",
    url: "/hand-kaomojis/",
    group: "F_Kaomoji",
    primaryKeyword: "hand kaomoji",
    title: "Hand Kaomoji Copy Paste — Wave & Raise Arms | FancifyText",
    description:
      "Copy hand kaomoji free—(ﾉ◕ヮ◕)ﾉ, ＼(^o^)／ & arm-up text faces for Discord hype and hellos. Tap to copy; plain Unicode.",
    fellowKeywords: fellows("wave kaomoji", "arm up text face"),
  },
  {
    phase: 5,
    priority: "P1",
    url: "/star-kaomojis/",
    group: "F_Kaomoji",
    primaryKeyword: "star kaomoji",
    title: "Star Kaomoji Copy Paste — ☆ Aesthetic Sparkle | FancifyText",
    description:
      "Copy star kaomoji & sparkle text—☆(｡◕‿◕｡)☆, ⋆｡°✩ for aesthetic Discord & Instagram bios. Tap to copy; not picture emoji.",
    fellowKeywords: fellows("stars kaomoji aesthetic", "galaxy kaomoji"),
  },
  {
    phase: 5,
    priority: "P1",
    url: "/kaomoji-dot-art/",
    group: "F_Kaomoji",
    primaryKeyword: "dot art kaomoji",
    title: "Kaomoji Dot Art Copy Paste — Mini ASCII Faces | FancifyText",
    description:
      "Copy kaomoji dot art—compact mini ASCII faces like (•ᴗ•) & ʕ•ᴥ•ʔ for chat. One-line art only; tap to copy. Free, no login.",
    fellowKeywords: fellows("ascii kaomoji", "mini text art kaomoji"),
  },
  {
    phase: 5,
    priority: "P1",
    url: "/carrd-kaomojis/",
    group: "F_Kaomoji",
    primaryKeyword: "carrd kaomojis",
    title: "Carrd Kaomojis Copy Paste — Bio Dividers | FancifyText",
    description:
      "Copy Carrd kaomojis—bio divider lines, ⋆ separators & soft aesthetic strings for link-in-bio layouts. Tap to copy; pairs with plain text sections.",
    fellowKeywords: fellows("carrd bio dividers", "aesthetic bio lines"),
  },
  {
    phase: 5,
    priority: "P2",
    url: "/happy-kaomojis/",
    group: "F_Kaomoji",
    primaryKeyword: "happy kaomoji",
    title: "Happy Kaomojis Copy and Paste | FancifyText",
    description: "Copy happy kaomoji and cheerful text faces for upbeat chats.",
    fellowKeywords: fellows("cheerful kaomoji", "smile text face"),
  },
  {
    phase: 5,
    priority: "P2",
    url: "/sleep-kaomojis/",
    group: "F_Kaomoji",
    primaryKeyword: "sleep kaomoji",
    title: "Sleep Kaomojis Copy and Paste | FancifyText",
    description: "Copy sleep kaomoji and zzZ tired text faces for goodnight messages.",
    fellowKeywords: fellows("sleepy kaomoji", "tired text face"),
  },
  {
    phase: 5,
    priority: "P2",
    url: "/wink-kaomojis/",
    group: "F_Kaomoji",
    primaryKeyword: "wink kaomoji",
    title: "Wink Kaomojis Copy and Paste | FancifyText",
    description: "Copy wink kaomoji and playful teasing text faces.",
    fellowKeywords: fellows("winking text face", "playful kaomoji"),
  },
  {
    phase: 5,
    priority: "P2",
    url: "/bunny-kaomojis/",
    group: "F_Kaomoji",
    primaryKeyword: "bunny kaomoji",
    title: "Bunny Kaomojis Copy and Paste | FancifyText",
    description: "Copy bunny kaomoji and rabbit-ear text faces.",
    fellowKeywords: fellows("rabbit kaomoji", "bunny text face"),
  },
  {
    phase: 5,
    priority: "P2",
    url: "/lenny-face/",
    group: "F_Kaomoji",
    primaryKeyword: "lenny face",
    title: "Lenny Face Copy Paste — ( ͡° ͜ʖ ͡°) | FancifyText",
    description:
      "Copy Lenny face ( ͡° ͜ʖ ͡°) free—meme text emoticons for Discord and Reddit. Tap any variant; plain Unicode, no login.",
    fellowKeywords: fellows("lenny face copy paste", "lenny emoticon"),
  },
  {
    phase: 5,
    priority: "P2",
    url: "/shrug-emoticon/",
    group: "F_Kaomoji",
    primaryKeyword: "shrug emoticon",
    title: "Shrug Emoticon Copy Paste — ¯\\_(ツ)_/¯ | FancifyText",
    description:
      "Copy shrug ¯\\_(ツ)_/¯ free—idk text faces for Discord, Instagram & email. Tap to copy; works where emoji keyboards fail.",
    fellowKeywords: fellows("shrug face", "shrug emoji text"),
  },
  {
    phase: 0,
    priority: "P1",
    url: "/about/",
    group: "H_Trust",
    primaryKeyword: "about fancifytext",
    title: "About FancifyText — Unicode Fancy Text Tools",
    description:
      "About FancifyText. Who runs FancifyText, how the Unicode fancy text generator works, and how we keep these free copy-and-paste tools accurate.",
    fellowKeywords: fellows("about fancify text", "who made fancifytext"),
    navLabel: "About",
  },
  {
    phase: 6,
    priority: "P2",
    url: "/contact/",
    group: "H_Trust",
    primaryKeyword: "contact fancifytext",
    title: "Contact FancifyText — Email & Query Form | FancifyText",
    description:
      "Contact FancifyText by email (hello@fancifytext.com) or a short query form. We typically reply within one business day.",
    fellowKeywords: fellows("fancifytext contact", "fancy text support"),
    navLabel: "Contact",
    updated: "2026-09-20",
  },
  {
    phase: 6,
    priority: "P2",
    url: "/guides/discord-colored-text-not-working/",
    group: "I_Guides",
    primaryKeyword: "discord colored text not working",
    title: "Discord Colored Text Not Working — Fixes | FancifyText",
    description:
      "Discord colored text not working? Why Discord ANSI colors fail (missing code block, mobile client, paste stripped) and how to fix them with a fresh ```ansi copy.",
    fellowKeywords: fellows(
      "discord color text not working",
      "discord ansi not showing",
    ),
  },
  {
    phase: 6,
    priority: "P2",
    url: "/guides/instagram-bio-fonts/",
    group: "I_Guides",
    primaryKeyword: "how to change instagram bio font",
    title: "How to Change Your Instagram Bio Font | FancifyText",
    description:
      "How to change Instagram bio font. Instagram has no font picker. This guide shows how to paste Unicode bio fonts, stay inside 150 characters, and keep the bio readable.",
    fellowKeywords: fellows(
      "instagram bio font",
      "change instagram font",
      "instagram fonts for bio",
    ),
  },
  {
    phase: 6,
    priority: "P2",
    url: "/guides/how-unicode-fancy-fonts-work/",
    group: "I_Guides",
    primaryKeyword: "how unicode fancy fonts work",
    title: "How Unicode Fancy Fonts Work | FancifyText",
    description:
      "How Unicode fancy fonts work. Fancy social fonts are look-alike Unicode characters, not installed typefaces. Learn the blocks we map, why boxes appear, and how that affects search.",
    fellowKeywords: fellows(
      "unicode fonts copy paste",
      "why fancy text shows boxes",
      "mathematical alphanumeric symbols",
    ),
  },
  {
    phase: 6,
    priority: "P2",
    url: "/guides/facebook-name-fonts/",
    group: "I_Guides",
    primaryKeyword: "how to change facebook name font",
    title: "How to Change Your Facebook Name Font | FancifyText",
    description:
      "How to change Facebook name font. Facebook has no name font picker. Paste Unicode into the display name, keep the username plain, and stay inside Facebook’s name rules.",
    fellowKeywords: fellows(
      "facebook name fonts",
      "change facebook font",
      "facebook stylish name",
    ),
  },
  {
    phase: 6,
    priority: "P2",
    url: "/guides/whatsapp-stylish-text/",
    group: "I_Guides",
    primaryKeyword: "whatsapp stylish text",
    title: "WhatsApp Stylish Text vs Built-in Formatting | FancifyText",
    description:
      "WhatsApp stylish text. When to use WhatsApp’s *bold* markdown and when to paste Unicode stylish text in status, group names, and chats.",
    fellowKeywords: fellows(
      "whatsapp stylish fonts",
      "whatsapp fancy text",
      "whatsapp bold italic strike",
      "whatsapp markdown vs unicode",
    ),
  },
  {
    phase: 6,
    priority: "P1",
    url: "/binary-text-generator/",
    group: "D_Style_Other",
    primaryKeyword: "binary text generator",
    title: "Binary Text Generator — Text to Binary Copy & Paste",
    description:
      "Binary text generator. Convert text to UTF-8 binary (and Morse). Copy geeky encoded text for Discord, homework, and bios.",
    fellowKeywords: fellows("text to binary", "binary code generator", "morse code generator"),
    navLabel: "Binary",
  },
  {
    phase: 6,
    priority: "P2",
    url: "/guides/roblox-fancy-text/",
    group: "I_Guides",
    primaryKeyword: "roblox fancy text",
    title: "Roblox Fancy Text & Rich Text Guide | FancifyText",
    description:
      "Roblox fancy text. How to use Unicode fancy text and limited rich-text tags in Roblox names, bios, and UI—plus what gets filtered.",
    fellowKeywords: fellows(
      "roblox rich text tags",
      "roblox display name filter",
      "roblox unicode name",
    ),
  },
  {
    phase: 6,
    priority: "P2",
    url: "/guides/fancy-text-shows-boxes/",
    group: "I_Guides",
    primaryKeyword: "fancy text shows as boxes",
    title: "Why Fancy Text Shows as Boxes (and Fixes) | FancifyText",
    description:
      "Fancy text shows as boxes. Empty tofu boxes mean a missing glyph. Learn which Unicode styles are safest on iOS, Android, and Windows.",
    fellowKeywords: fellows("unicode tofu boxes", "fancy font not showing"),
  },
  {
    phase: 6,
    priority: "P1",
    url: "/guides/do-fancy-fonts-break-screen-readers/",
    group: "I_Guides",
    primaryKeyword: "do fancy fonts break screen readers",
    title: "Do Fancy Fonts Break Screen Readers? (2026) | FancifyText",
    description:
      "Do fancy fonts break screen readers? NVDA 2025.1 now reads Unicode bold and cursive as plain words by default. What still breaks, what to do instead.",
    fellowKeywords: fellows(
      "unicode text accessibility",
      "is unicode bold accessible",
      "zalgo text accessibility",
      "screen reader fancy text",
    ),
  },
  {
    phase: 6,
    priority: "P2",
    url: "/guides/snapchat-name-fonts/",
    group: "I_Guides",
    primaryKeyword: "snapchat name fonts",
    title: "Snapchat Name Fonts Copy and Paste | FancifyText",
    description:
      "Snapchat name fonts. Snapchat has no font picker. Paste Unicode into display names carefully—filters reject many symbols.",
    fellowKeywords: fellows(
      "snapchat fancy name",
      "change snapchat font",
      "snapchat display name unicode",
    ),
  },
  {
    phase: 7,
    priority: "P1",
    url: "/guides/linkedin-formatting-not-working/",
    group: "I_Guides",
    primaryKeyword: "linkedin formatting not working",
    title: "LinkedIn Formatting Not Working — Bold & Line Breaks",
    description:
      "Why bold fails in a LinkedIn headline, why blank lines vanish on mobile, and why pasted text loses its spacing — with the fix for each.",
    fellowKeywords: fellows(
      "linkedin bold not working",
      "linkedin line breaks not working",
      "linkedin invalid characters headline",
      "linkedin post spacing",
    ),
  },
  {
    phase: 6,
    priority: "P2",
    url: "/search/",
    group: "H_Trust",
    primaryKeyword: "search fancifytext tools",
    title: "Search Fancy Text Tools | FancifyText",
    description:
      "Search FancifyText tools. Find FancifyText generators by keyword—bold, cursive, Discord, Instagram, kaomoji, and more.",
    fellowKeywords: fellows("fancy text tools list"),
  },
];

/** Highest build phase with live routes (bump as phases ship). */
export const LIVE_MAX_PHASE = 7;

export function getPageByUrl(url: string): PageEntry | undefined {
  return PAGES.find((p) => p.url === url);
}

/** Related links for live pages only — prefer same group, then backfill. */
export function getRelatedPages(
  currentUrl: string,
  limit = 8,
  maxPhase = LIVE_MAX_PHASE,
): PageEntry[] {
  const current = getPageByUrl(currentUrl);
  const live = PAGES.filter(
    (p) => p.url !== currentUrl && p.phase <= maxPhase,
  );
  if (!current) return live.slice(0, limit);

  const sameGroup = live.filter((p) => p.group === current.group);
  if (sameGroup.length >= limit) return sameGroup.slice(0, limit);

  const others = live.filter((p) => p.group !== current.group);
  return [...sameGroup, ...others].slice(0, limit);
}

/** Curated topical neighbors (falls back to sequential related). */
const TOPICAL_RELATED: Record<string, string[]> = {
  "/": [
    "/copy-paste-fonts/",
    "/bold-text-generator/",
    "/cursive-text-generator/",
    "/linkedin-text-formatter/",
    "/discord-color-text/",
    "/instagram-font-generator/",
    "/cool-text-generator/",
    "/unformat-text/",
  ],
  "/bold-text-generator/": [
    "/",
    "/copy-paste-fonts/",
    "/italic-text-generator/",
    "/linkedin-text-formatter/",
    "/discord-font-generator/",
    "/instagram-font-generator/",
    "/whatsapp-fonts/",
  ],
  "/linkedin-text-formatter/": [
    "/chatgpt-to-linkedin/",
    "/guides/linkedin-formatting-not-working/",
    "/bold-text-generator/",
    "/unformat-text/",
    "/social-media-bio-generator/",
    "/guides/do-fancy-fonts-break-screen-readers/",
  ],
  "/chatgpt-to-linkedin/": [
    "/linkedin-text-formatter/",
    "/guides/linkedin-formatting-not-working/",
    "/unformat-text/",
    "/html-text-generator/",
    "/case-converter/",
    "/guides/how-unicode-fancy-fonts-work/",
  ],
  "/unformat-text/": [
    "/case-converter/",
    "/linkedin-text-formatter/",
    "/chatgpt-to-linkedin/",
    "/guides/how-unicode-fancy-fonts-work/",
    "/guides/do-fancy-fonts-break-screen-readers/",
    "/",
  ],
  "/guides/linkedin-formatting-not-working/": [
    "/linkedin-text-formatter/",
    "/chatgpt-to-linkedin/",
    "/unformat-text/",
    "/invisible-character/",
    "/guides/do-fancy-fonts-break-screen-readers/",
  ],
  "/italic-text-generator/": [
    "/bold-text-generator/",
    "/cursive-text-generator/",
    "/copy-paste-fonts/",
    "/instagram-font-generator/",
  ],
  "/bubble-text-generator/": [
    "/cute-fonts/",
    "/aesthetic-fonts/",
    "/stylish-text-generator/",
    "/discord-font-generator/",
  ],
  "/strikethrough-text-generator/": [
    "/bold-text-generator/",
    "/glitch-text-generator/",
    "/copy-paste-fonts/",
  ],
  "/small-caps-text-generator/": [
    "/small-text-generator/",
    "/superscript-subscript-generator/",
    "/monospace-text-generator/",
    "/aesthetic-fonts/",
    "/instagram-font-generator/",
    "/name-font-generator/",
  ],
  "/monospace-text-generator/": [
    "/small-caps-text-generator/",
    "/discord-font-generator/",
    "/copy-paste-fonts/",
    "/guides/how-unicode-fancy-fonts-work/",
  ],
  "/superscript-subscript-generator/": [
    "/small-text-generator/",
    "/small-caps-text-generator/",
    "/html-text-generator/",
    "/bold-text-generator/",
  ],
  "/small-text-generator/": [
    "/superscript-subscript-generator/",
    "/small-caps-text-generator/",
    "/social-media-bio-generator/",
    "/instagram-font-generator/",
    "/big-text-generator/",
  ],
  "/big-text-generator/": [
    "/",
    "/discord-font-generator/",
    "/discord-color-text/",
    "/copy-paste-fonts/",
    "/binary-text-generator/",
    "/html-text-generator/",
  ],
  "/mirror-text-generator/": [
    "/upside-down-text-generator/",
    "/glitch-text-generator/",
    "/copy-paste-fonts/",
    "/",
  ],
  "/old-english-text-generator/": [
    "/cool-text-generator/",
    "/bold-text-generator/",
    "/name-font-generator/",
    "/discord-font-generator/",
    "/copy-paste-fonts/",
  ],
  "/cool-symbols/": [
    "/cute-symbols/",
    "/aesthetic-symbols/",
    "/emoji-combos/",
    "/text-decorator/",
    "/kaomoji/",
    "/copy-paste-fonts/",
  ],
  "/emoji-combos/": [
    "/cute-symbols/",
    "/kaomoji/",
    "/cute-fonts/",
    "/text-art/",
    "/cool-symbols/",
    "/",
  ],
  "/text-art/": [
    "/kaomoji/",
    "/kaomoji-dot-art/",
    "/emoji-combos/",
    "/big-text-generator/",
    "/lenny-face/",
    "/",
  ],
  "/cute-symbols/": [
    "/emoji-combos/",
    "/aesthetic-symbols/",
    "/cool-symbols/",
    "/cute-fonts/",
    "/kaomoji/",
    "/text-art/",
  ],
  "/aesthetic-symbols/": [
    "/aesthetic-fonts/",
    "/cute-symbols/",
    "/emoji-combos/",
    "/carrd-kaomojis/",
    "/cool-symbols/",
    "/",
  ],
  "/text-decorator/": [
    "/cool-symbols/",
    "/name-font-generator/",
    "/cute-fonts/",
    "/copy-paste-fonts/",
  ],
  "/case-converter/": [
    "/",
    "/unformat-text/",
    "/small-text-generator/",
    "/big-text-generator/",
    "/bold-text-generator/",
    "/guides/how-unicode-fancy-fonts-work/",
    "/chatgpt-to-linkedin/",
  ],
  "/binary-text-generator/": [
    "/big-text-generator/",
    "/monospace-text-generator/",
    "/html-text-generator/",
    "/copy-paste-fonts/",
    "/",
  ],
  "/invisible-character/": [
    "/social-media-bio-generator/",
    "/name-font-generator/",
    "/instagram-font-generator/",
    "/cool-symbols/",
    "/guides/how-unicode-fancy-fonts-work/",
    "/",
  ],
  "/facebook-font-generator/": [
    "/instagram-font-generator/",
    "/guides/facebook-name-fonts/",
    "/social-media-bio-generator/",
    "/name-font-generator/",
  ],
  "/contact/": [
    "/about/",
    "/",
    "/privacy/",
  ],
  "/guides/how-unicode-fancy-fonts-work/": [
    "/",
    "/copy-paste-fonts/",
    "/guides/do-fancy-fonts-break-screen-readers/",
    "/unformat-text/",
    "/bold-text-generator/",
  ],
  "/guides/facebook-name-fonts/": [
    "/facebook-font-generator/",
    "/name-font-generator/",
    "/social-media-bio-generator/",
  ],
  "/guides/whatsapp-stylish-text/": [
    "/whatsapp-fonts/",
    "/bold-text-generator/",
    "/guides/how-unicode-fancy-fonts-work/",
  ],
  "/upside-down-text-generator/": [
    "/mirror-text-generator/",
    "/glitch-text-generator/",
    "/copy-paste-fonts/",
    "/",
  ],
  "/glitch-text-generator/": [
    "/upside-down-text-generator/",
    "/discord-font-generator/",
    "/copy-paste-fonts/",
  ],
  "/copy-paste-fonts/": [
    "/",
    "/cool-text-generator/",
    "/aesthetic-fonts/",
    "/cute-fonts/",
    "/cursive-text-generator/",
    "/instagram-font-generator/",
    "/big-text-generator/",
    "/stylish-text-generator/",
    "/name-font-generator/",
  ],
  "/cursive-text-generator/": [
    "/",
    "/bold-text-generator/",
    "/italic-text-generator/",
    "/copy-paste-fonts/",
    "/instagram-font-generator/",
    "/name-font-generator/",
    "/aesthetic-fonts/",
    "/guides/how-unicode-fancy-fonts-work/",
  ],
  "/discord-color-text/": [
    "/discord-font-generator/",
    "/bold-text-generator/",
    "/big-text-generator/",
    "/kaomoji/",
    "/",
  ],
  "/whatsapp-fonts/": [
    "/bold-text-generator/",
    "/copy-paste-fonts/",
    "/instagram-font-generator/",
    "/guides/whatsapp-stylish-text/",
    "/social-media-bio-generator/",
  ],
  "/social-media-bio-generator/": [
    "/instagram-font-generator/",
    "/tiktok-font-generator/",
    "/linkedin-text-formatter/",
    "/aesthetic-fonts/",
    "/whatsapp-fonts/",
  ],
  "/kaomoji/": [
    "/emoji-combos/",
    "/text-art/",
    "/cute-kaomojis/",
    "/hand-kaomojis/",
    "/carrd-kaomojis/",
    "/star-kaomojis/",
    "/lenny-face/",
  ],
  "/aesthetic-fonts/": [
    "/copy-paste-fonts/",
    "/cute-fonts/",
    "/cool-text-generator/",
    "/stylish-text-generator/",
    "/instagram-font-generator/",
    "/tiktok-font-generator/",
    "/",
  ],
  "/cute-fonts/": [
    "/aesthetic-fonts/",
    "/cool-text-generator/",
    "/bubble-text-generator/",
    "/cute-kaomojis/",
    "/copy-paste-fonts/",
    "/text-decorator/",
    "/cool-symbols/",
  ],
  "/name-font-generator/": [
    "/cool-text-generator/",
    "/copy-paste-fonts/",
    "/cursive-text-generator/",
    "/bold-text-generator/",
    "/discord-font-generator/",
    "/stylish-text-generator/",
  ],
  "/stylish-text-generator/": [
    "/",
    "/cool-text-generator/",
    "/aesthetic-fonts/",
    "/copy-paste-fonts/",
    "/bold-text-generator/",
    "/instagram-font-generator/",
  ],
  "/cool-text-generator/": [
    "/name-font-generator/",
    "/copy-paste-fonts/",
    "/aesthetic-fonts/",
    "/discord-font-generator/",
    "/roblox-font-generator/",
    "/old-english-text-generator/",
    "/cute-fonts/",
    "/cool-symbols/",
  ],
  "/discord-font-generator/": [
    "/discord-color-text/",
    "/cool-text-generator/",
    "/bold-text-generator/",
    "/copy-paste-fonts/",
    "/big-text-generator/",
    "/kaomoji/",
    "/",
  ],
  "/tiktok-font-generator/": [
    "/instagram-font-generator/",
    "/aesthetic-fonts/",
    "/social-media-bio-generator/",
    "/copy-paste-fonts/",
    "/cute-fonts/",
  ],
  "/instagram-font-generator/": [
    "/tiktok-font-generator/",
    "/facebook-font-generator/",
    "/social-media-bio-generator/",
    "/aesthetic-fonts/",
    "/cursive-text-generator/",
    "/copy-paste-fonts/",
  ],
  "/html-text-generator/": [
    "/bold-text-generator/",
    "/chatgpt-to-linkedin/",
    "/superscript-subscript-generator/",
    "/copy-paste-fonts/",
    "/roblox-font-generator/",
    "/big-text-generator/",
  ],
  "/twitter-font-generator/": [
    "/social-media-bio-generator/",
    "/instagram-font-generator/",
    "/facebook-font-generator/",
    "/name-font-generator/",
    "/copy-paste-fonts/",
  ],
  "/roblox-font-generator/": [
    "/cool-text-generator/",
    "/html-text-generator/",
    "/name-font-generator/",
    "/discord-font-generator/",
    "/copy-paste-fonts/",
  ],
  "/snapchat-font-generator/": [
    "/instagram-font-generator/",
    "/tiktok-font-generator/",
    "/cute-fonts/",
    "/name-font-generator/",
  ],
  "/guides/discord-colored-text-not-working/": [
    "/discord-color-text/",
    "/discord-font-generator/",
    "/",
  ],
  "/guides/instagram-bio-fonts/": [
    "/instagram-font-generator/",
    "/social-media-bio-generator/",
    "/aesthetic-fonts/",
  ],
  "/guides/do-fancy-fonts-break-screen-readers/": [
    "/guides/how-unicode-fancy-fonts-work/",
    "/guides/fancy-text-shows-boxes/",
    "/unformat-text/",
    "/linkedin-text-formatter/",
    "/glitch-text-generator/",
  ],
};

const KAOMOJI_FALLBACK = [
  "/kaomoji/",
  "/cute-kaomojis/",
  "/heart-kaomojis/",
  "/hand-kaomojis/",
  "/carrd-kaomojis/",
  "/lenny-face/",
  "/shrug-emoticon/",
];

/** Sibling emotions so lists do not all point at the same two winners. */
const KAOMOJI_FAMILIES: Record<string, string[]> = {
  "angry-kaomojis": [
    "/evil-kaomojis/",
    "/scared-kaomojis/",
    "/funny-kaomojis/",
    "/kaomoji/",
  ],
  "evil-kaomojis": [
    "/angry-kaomojis/",
    "/proud-kaomojis/",
    "/funny-kaomojis/",
    "/kaomoji/",
  ],
  "cry-kaomojis": [
    "/sad-kaomojis/",
    "/scared-kaomojis/",
    "/hug-kaomojis/",
    "/kaomoji/",
  ],
  "sad-kaomojis": [
    "/cry-kaomojis/",
    "/thinking-kaomojis/",
    "/hug-kaomojis/",
    "/kaomoji/",
  ],
  "cute-kaomojis": [
    "/bear-kaomojis/",
    "/cat-kaomojis/",
    "/heart-kaomojis/",
    "/shy-kaomojis/",
  ],
  "bear-kaomojis": [
    "/cute-kaomojis/",
    "/cat-kaomojis/",
    "/dog-kaomojis/",
    "/kaomoji/",
  ],
  "cat-kaomojis": [
    "/cute-kaomojis/",
    "/bear-kaomojis/",
    "/dog-kaomojis/",
    "/kaomoji/",
  ],
  "dog-kaomojis": [
    "/bear-kaomojis/",
    "/cat-kaomojis/",
    "/cute-kaomojis/",
    "/kaomoji/",
  ],
  "heart-kaomojis": [
    "/kiss-kaomojis/",
    "/hug-kaomojis/",
    "/cute-kaomojis/",
    "/shy-kaomojis/",
  ],
  "kiss-kaomojis": [
    "/heart-kaomojis/",
    "/shy-kaomojis/",
    "/hug-kaomojis/",
    "/kaomoji/",
  ],
  "hug-kaomojis": [
    "/heart-kaomojis/",
    "/cute-kaomojis/",
    "/sad-kaomojis/",
    "/kaomoji/",
  ],
  "shocked-kaomojis": [
    "/surprised-kaomojis/",
    "/scared-kaomojis/",
    "/confused-kaomojis/",
    "/kaomoji/",
  ],
  "surprised-kaomojis": [
    "/shocked-kaomojis/",
    "/excited-kaomojis/",
    "/confused-kaomojis/",
    "/kaomoji/",
  ],
  "scared-kaomojis": [
    "/shocked-kaomojis/",
    "/confused-kaomojis/",
    "/cry-kaomojis/",
    "/kaomoji/",
  ],
  "confused-kaomojis": [
    "/thinking-kaomojis/",
    "/surprised-kaomojis/",
    "/scared-kaomojis/",
    "/kaomoji/",
  ],
  "thinking-kaomojis": [
    "/confused-kaomojis/",
    "/proud-kaomojis/",
    "/funny-kaomojis/",
    "/kaomoji/",
  ],
  "shy-kaomojis": [
    "/cute-kaomojis/",
    "/kiss-kaomojis/",
    "/heart-kaomojis/",
    "/kaomoji/",
  ],
  "excited-kaomojis": [
    "/funny-kaomojis/",
    "/proud-kaomojis/",
    "/surprised-kaomojis/",
    "/kaomoji/",
  ],
  "funny-kaomojis": [
    "/excited-kaomojis/",
    "/proud-kaomojis/",
    "/lenny-face/",
    "/kaomoji/",
  ],
  "proud-kaomojis": [
    "/funny-kaomojis/",
    "/evil-kaomojis/",
    "/excited-kaomojis/",
    "/kaomoji/",
  ],
  "music-kaomojis": [
    "/excited-kaomojis/",
    "/cute-kaomojis/",
    "/funny-kaomojis/",
    "/kaomoji/",
  ],
  "drool-kaomojis": [
    "/funny-kaomojis/",
    "/cute-kaomojis/",
    "/excited-kaomojis/",
    "/kaomoji/",
  ],
  "thank-you-kaomojis": [
    "/hug-kaomojis/",
    "/heart-kaomojis/",
    "/cute-kaomojis/",
    "/kaomoji/",
  ],
  "lenny-face": [
    "/shrug-emoticon/",
    "/funny-kaomojis/",
    "/kaomoji/",
    "/discord-font-generator/",
  ],
  "shrug-emoticon": [
    "/lenny-face/",
    "/confused-kaomojis/",
    "/thinking-kaomojis/",
    "/kaomoji/",
  ],
  "hand-kaomojis": [
    "/hug-kaomojis/",
    "/excited-kaomojis/",
    "/cute-kaomojis/",
    "/kaomoji/",
  ],
  "star-kaomojis": [
    "/heart-kaomojis/",
    "/carrd-kaomojis/",
    "/cool-symbols/",
    "/aesthetic-fonts/",
    "/kaomoji/",
  ],
  "kaomoji-dot-art": [
    "/funny-kaomojis/",
    "/cute-kaomojis/",
    "/kaomoji/",
    "/big-text-generator/",
  ],
  "carrd-kaomojis": [
    "/star-kaomojis/",
    "/social-media-bio-generator/",
    "/aesthetic-fonts/",
    "/cute-kaomojis/",
    "/kaomoji/",
  ],
  "happy-kaomojis": [
    "/excited-kaomojis/",
    "/funny-kaomojis/",
    "/cute-kaomojis/",
    "/kaomoji/",
  ],
  "sleep-kaomojis": [
    "/sad-kaomojis/",
    "/thinking-kaomojis/",
    "/cute-kaomojis/",
    "/kaomoji/",
  ],
  "wink-kaomojis": [
    "/shy-kaomojis/",
    "/kiss-kaomojis/",
    "/cute-kaomojis/",
    "/kaomoji/",
  ],
  "bunny-kaomojis": [
    "/cat-kaomojis/",
    "/bear-kaomojis/",
    "/cute-kaomojis/",
    "/kaomoji/",
  ],
};

const CURSIVE_LETTER_FALLBACK = [
  "/cursive-text-generator/",
  "/",
  "/copy-paste-fonts/",
  "/name-font-generator/",
  "/instagram-font-generator/",
  "/bold-text-generator/",
];

function pagesFromUrls(urls: string[], currentUrl: string, limit: number): PageEntry[] {
  return urls
    .map((u) => getPageByUrl(u))
    .filter((p): p is PageEntry => Boolean(p && p.url !== currentUrl))
    .slice(0, limit);
}

export function getTopicalRelated(
  currentUrl: string,
  limit = 6,
): PageEntry[] {
  const urls = TOPICAL_RELATED[currentUrl];
  if (urls?.length) {
    return pagesFromUrls(urls, currentUrl, limit);
  }

  if (
    currentUrl.includes("kaomoji") ||
    currentUrl === "/lenny-face/" ||
    currentUrl === "/shrug-emoticon/"
  ) {
    const slug = currentUrl.replace(/^\/|\/$/g, "");
    const family = KAOMOJI_FAMILIES[slug];
    if (family?.length) {
      return pagesFromUrls(family, currentUrl, limit);
    }
    return pagesFromUrls(KAOMOJI_FALLBACK, currentUrl, limit);
  }

  if (
    currentUrl.startsWith("/cursive-capital-") ||
    currentUrl.startsWith("/cursive-small-")
  ) {
    return pagesFromUrls(CURSIVE_LETTER_FALLBACK, currentUrl, limit);
  }

  return getRelatedPages(currentUrl, limit);
}

/** Hub-focused footer — style tools (platforms live in Explore). */
const FOOTER_URLS = [
  "/",
  "/cursive-text-generator/",
  "/bold-text-generator/",
  "/copy-paste-fonts/",
  "/small-text-generator/",
  "/big-text-generator/",
  "/cool-symbols/",
  "/text-decorator/",
  "/aesthetic-fonts/",
  "/cute-fonts/",
  "/cool-text-generator/",
  "/unformat-text/",
];

export function getFooterPages(): PageEntry[] {
  return FOOTER_URLS.map((u) => getPageByUrl(u)).filter(
    (p): p is PageEntry => Boolean(p),
  );
}

const EXPLORE_URLS = [
  "/linkedin-text-formatter/",
  "/chatgpt-to-linkedin/",
  "/instagram-font-generator/",
  "/tiktok-font-generator/",
  "/twitter-font-generator/",
  "/facebook-font-generator/",
  "/discord-font-generator/",
  "/whatsapp-fonts/",
  "/roblox-font-generator/",
  "/snapchat-font-generator/",
  "/social-media-bio-generator/",
  "/name-font-generator/",
  "/cool-text-generator/",
  "/html-text-generator/",
  "/unformat-text/",
  "/binary-text-generator/",
  "/invisible-character/",
  "/case-converter/",
  "/search/",
];

export function getExplorePages(): PageEntry[] {
  return EXPLORE_URLS.map((u) => getPageByUrl(u)).filter(
    (p): p is PageEntry => Boolean(p),
  );
}

const NAV_URLS = [
  "/",
  "/cursive-text-generator/",
  "/bold-text-generator/",
  "/copy-paste-fonts/",
  "/linkedin-text-formatter/",
  "/cool-text-generator/",
  "/instagram-font-generator/",
  "/discord-font-generator/",
  "/cool-symbols/",
  "/emoji-combos/",
  "/kaomoji/",
] as const;

export function getNavPages(): PageEntry[] {
  return NAV_URLS.map((url) => getPageByUrl(url)).filter(
    (p): p is PageEntry => Boolean(p?.navLabel),
  );
}

export function getLivePages(): PageEntry[] {
  return PAGES.filter((p) => p.phase <= LIVE_MAX_PHASE);
}

export const SITE_NAME = "FancifyText";

const DEFAULT_SITE_URL = "https://fancifytext.com";

/**
 * Canonical site origin used in metadata, sitemap, and JSON-LD.
 * Prefer NEXT_PUBLIC_SITE_URL; otherwise always apex (never *.vercel.app).
 */
export const SITE_URL = resolveSiteUrl();

/**
 * Publisher-bumped sitemap lastmod (YYYY-MM-DD).
 *
 * Bump this only when intentionally publishing content changes. After Google
 * Search Console submit, this site is meant for infrequent updates (monthly /
 * quarterly / yearly). Do not set it to "today" on every deploy — that makes
 * every URL look freshly updated and creates false churn in GSC.
 */
export const CONTENT_UPDATED_AT = "2026-09-22";

/** Date form of CONTENT_UPDATED_AT (UTC midnight). Same bump rule as above. */
export const SITE_CONTENT_UPDATED = new Date(`${CONTENT_UPDATED_AT}T00:00:00.000Z`);

function resolveSiteUrl(): string {
  const fromEnv = normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL);
  if (fromEnv && isUsableSiteOrigin(fromEnv)) return fromEnv;
  return DEFAULT_SITE_URL;
}

function normalizeOrigin(raw: string | undefined): string | null {
  const value = raw?.trim();
  if (!value) return null;
  try {
    const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
    return new URL(withProtocol).origin;
  } catch {
    return null;
  }
}

/** Reject placeholder / junk values like "aaa" that break canonicals. */
function isUsableSiteOrigin(origin: string): boolean {
  try {
    const { hostname } = new URL(origin);
    if (!hostname.includes(".")) return false;
    if (hostname === "localhost" || hostname === "aaa") return false;
    if (hostname.endsWith(".vercel.app")) return false;
    return true;
  } catch {
    return false;
  }
}
