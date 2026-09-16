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
    title: "Cursive Text Generator — Script Fonts Copy & Paste | FancifyText",
    description:
      "Type a name or phrase into cursive Unicode. Copy elegant script words plus the full A–Z alphabet—no font download.",
    fellowKeywords: fellows(
      "elegant cursive fonts copy and paste",
      "cursive copy and paste fonts",
      "cursive alphabet",
      "script font generator",
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
      "Make bold Unicode text instantly. Copy and paste bold fonts for Discord, Instagram, and bios.",
    fellowKeywords: fellows(
      "bold font generator",
      "bold text font",
      "text bold",
      "bolded text",
    ),
    navLabel: "Bold",
  },
  {
    phase: 2,
    priority: "P0",
    url: "/italic-text-generator/",
    group: "D_Style_Other",
    primaryKeyword: "italic text generator",
    title: "Italic Text Generator — Slanted Fonts Copy & Paste | FancifyText",
    description:
      "Convert text to italic Unicode fonts in one click. Copy slanted letters for quotes, captions, and bios.",
    fellowKeywords: fellows("italic font generator"),
    navLabel: "Italic",
  },
  {
    phase: 2,
    priority: "P1",
    url: "/bubble-text-generator/",
    group: "D_Style_Other",
    primaryKeyword: "bubble text generator",
    title: "Bubble Text Generator — Circled Letters Copy & Paste | FancifyText",
    description:
      "Generate circled bubble letters and numbers only. Cute fonts mix bubble with kawaii extras; this tool is the circled-letter converter.",
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
      "Turn text into small capitals (short-cap Unicode), not tiny superscript bios and not math subscripts. Includes why the letter x has no small-caps form.",
    fellowKeywords: fellows("small caps text", "small capital letters"),
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
      "Fixed-width Unicode letters and digits for bios and names. Includes what Discord does to them and when to use a real code block.",
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
      "Add strikethrough to any text with Unicode combining marks. Copy crossed-out text for jokes and bios.",
    fellowKeywords: fellows("strikethrough font"),
  },
  {
    phase: 2,
    priority: "P1",
    url: "/superscript-subscript-generator/",
    group: "D_Style_Other",
    primaryKeyword: "superscript and subscript generator",
    title: "Superscript & Subscript Generator — Math & Footnotes | FancifyText",
    description:
      "Raise or lower characters for math, chemistry-style notes, and footnotes (H₂O, x²). This is not a tiny-bio or small-caps tool.",
    fellowKeywords: fellows("superscript generator", "subscript generator"),
  },
  {
    phase: 2,
    priority: "P2",
    url: "/upside-down-text-generator/",
    group: "D_Style_Other",
    primaryKeyword: "upside down text",
    title: "Upside Down Text Generator — Flip Text Copy & Paste | FancifyText",
    description:
      "Flip your text upside down with Unicode. Copy reversed, inverted text for memes and novelty bios.",
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
      "Create glitchy Zalgo-style cursed text. Copy distorted combining-mark effects for horror aesthetics and usernames.",
    fellowKeywords: fellows("zalgo text"),
  },
  {
    phase: 3,
    priority: "P0",
    url: "/copy-paste-fonts/",
    group: "C_CopyPaste",
    primaryKeyword: "copy and paste fonts",
    title: "Copy and Paste Fonts — Unicode Font Collections | FancifyText",
    description:
      "Copy and paste fonts by collection: aesthetic, cute, cursive, cool lookalikes, platform fonts, and big ASCII. Unicode styles—not a second full fancy-text gallery.",
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
      "Aesthetic Unicode fonts: soft fullwidth, script, and delicate small caps. This page is not cute bubble/kawaii, not stylish bold/glitch, and not cool lookalikes.",
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
    title: "Cute Fonts Copy and Paste — Bubble & Kawaii Unicode | FancifyText",
    description:
      "Copy cute kawaii fonts: bubble letters, squared caps, hearts, and parenthesized glyphs. Not aesthetic fullwidth, not stylish bold, and not cool lookalikes.",
    fellowKeywords: fellows("cute font generator", "kawaii fonts"),
  },
  {
    phase: 3,
    priority: "P1",
    url: "/name-font-generator/",
    group: "G_Name",
    primaryKeyword: "name fonts",
    title: "Name Font Generator — Username-Safe Unicode Fonts | FancifyText",
    description:
      "Turn a name or username into copy-ready Unicode fonts. Compare sans bold, script, and small caps that survive most username filters—not cool lookalikes.",
    fellowKeywords: fellows("username fonts", "display name fonts"),
  },
  {
    phase: 3,
    priority: "P2",
    url: "/stylish-text-generator/",
    group: "G_Aesthetic_Cute",
    primaryKeyword: "stylish text generator",
    title: "Stylish Text Generator — Bold & Graphic Unicode | FancifyText",
    description:
      "Generate stylish text with bold, italic, glitch, and graphic Unicode. High-contrast—not cute bubble, not aesthetic fullwidth, and not cool lookalikes.",
    fellowKeywords: fellows("stylish fonts", "create stylish text"),
  },
  {
    phase: 6,
    priority: "P0",
    url: "/cool-text-generator/",
    group: "G_Aesthetic_Cute",
    primaryKeyword: "cool text generator",
    title: "Cool Text Generator — Japanese, Squared & Letterlike Styles | FancifyText",
    description:
      "Generate cool Unicode lookalikes: Japanese, CJK, Cherokee, fat, squared, and letterlike styles. Copy and paste cool fonts for Discord, bios, and gaming names — not TTF downloads.",
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
    title: "Discord Color Text Generator — ANSI Copy & Paste | FancifyText",
    description:
      "Make Discord colored text with ANSI code blocks. Copy red, blue, green, and more for messages and announcements.",
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
    title: "Discord Font Generator — Fancy Fonts Copy & Paste | FancifyText",
    description:
      "Generate Discord fonts and nicknames with Unicode. Copy bold, script, bubble, and monospace styles.",
    fellowKeywords: fellows(
      "discord font copy and paste",
      "discord text generator",
      "cute discord fonts",
    ),
    navLabel: "Discord",
  },
  {
    phase: 4,
    priority: "P1",
    url: "/tiktok-font-generator/",
    group: "E_Platform",
    primaryKeyword: "tiktok font generator",
    title: "TikTok Font Generator — Profile & Caption Fonts | FancifyText",
    description:
      "Create TikTok profile and caption fonts with aesthetic Unicode text. Copy and paste into your profile or posts.",
    fellowKeywords: fellows("tiktok bio fonts", "tiktok font name"),
  },
  {
    phase: 4,
    priority: "P1",
    url: "/instagram-font-generator/",
    group: "E_Platform",
    primaryKeyword: "instagram font generator",
    title: "Instagram Font Generator — Aesthetic Bio Font Changer | FancifyText",
    description:
      "Change Instagram bio text with fancy Unicode fonts. Copy script, aesthetic, and bold styles instantly.",
    fellowKeywords: fellows(
      "instagram font changer",
      "instagram fonts copy and paste",
      "instagram text generator",
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
      "Generate HTML and rich text snippets—bold, color spans, headings, and pre blocks to copy and paste.",
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
      "whatsapp stylish text",
    ),
  },
  {
    phase: 4,
    priority: "P2",
    url: "/social-media-bio-generator/",
    group: "E_Platform",
    primaryKeyword: "social media bio generator",
    title: "Social Media Bio Generator — Multi-Platform Bio Fonts | FancifyText",
    description:
      "Build a multi-line social bio with Instagram, TikTok, X, and Discord character counts. Style each line in Unicode and copy the stacked result.",
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
    title: "X / Twitter Font Generator — Display Name & Bio | FancifyText",
    description:
      "Style an X (Twitter) display name and 160-character bio with Unicode fonts. Copy short, readable styles that survive the profile fields.",
    fellowKeywords: fellows(
      "x font generator",
      "twitter fonts copy and paste",
      "twitter bio fonts",
    ),
  },
  {
    phase: 4,
    priority: "P2",
    url: "/roblox-font-generator/",
    group: "E_Platform",
    primaryKeyword: "roblox font generator",
    title: "Roblox Font Generator — Username & Display Name | FancifyText",
    description:
      "Preview Unicode styles for Roblox display names. See which fonts survive filters, plus a path to Roblox rich text tags.",
    fellowKeywords: fellows(
      "roblox fonts copy and paste",
      "roblox name fonts",
      "roblox stylish text",
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
      "Copy Snapchat display-name fonts with bubble, bold, and script Unicode. Keep names short so they fit the Snapchat profile field.",
    fellowKeywords: fellows(
      "snapchat fonts copy and paste",
      "snapchat stylish text",
      "snapchat name fonts",
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
      "Copy Facebook display-name fonts with bold, cursive, and small-caps Unicode. Keep the @username in plain letters so people can still find you.",
    fellowKeywords: fellows(
      "facebook fonts copy and paste",
      "facebook stylish text",
      "facebook name fonts",
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
      "Make small Unicode text for compact bios and tags (tiny superscript with small-caps fallback). Not a chemistry H₂O subscript tool and not a small-caps converter.",
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
      "Turn short text into large ASCII / block letters you can copy and paste. Banner art for Discord, comments, and titles—not a Unicode bio font.",
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
    title: "Mirror Text Generator — Reverse Text Copy & Paste | FancifyText",
    description:
      "Reverse your words into mirror-order text. Compare simple backwards letters with upside-down Unicode for memes and novelty bios.",
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
    title: "Old English Text Generator — Gothic Fraktur Fonts | FancifyText",
    description:
      "Generate old English / gothic Unicode (Fraktur). Copy blackletter names for bios and clan tags—not the same as mathematical bold.",
    fellowKeywords: fellows(
      "gothic font generator",
      "old english font copy paste",
      "fraktur text generator",
    ),
  },
  {
    phase: 6,
    priority: "P1",
    url: "/cool-symbols/",
    group: "C_CopyPaste",
    primaryKeyword: "cool symbols copy and paste",
    title: "Cool Symbols Copy and Paste — Stars, Arrows & Marks | FancifyText",
    description:
      "Copy cool Unicode symbols: stars, hearts, arrows, checks, and separators. A symbol list—not letter fonts and not kaomoji faces.",
    fellowKeywords: fellows(
      "cool symbols",
      "text symbols copy paste",
      "special symbols copy and paste",
    ),
    navLabel: "Symbols",
  },
  {
    phase: 6,
    priority: "P1",
    url: "/case-converter/",
    group: "D_Style_Other",
    primaryKeyword: "case converter",
    title: "Case Converter — Sentence, Title, Upper & Lower | FancifyText",
    description:
      "Convert text between sentence case, title case, capitalized, upper, lower, alternating, and inverse case. Plain readable text with a live word and character count.",
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
      "Copy invisible and blank characters that actually survive pasting. Compare blank glyphs against zero-width controls, with the right one for bios, names, and empty messages.",
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
      "Decorate a word with hearts, stars, flowers, or brackets around it. Copy wrapped text for bios—this is not a per-letter font changer.",
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
    title: "Kaomoji Copy and Paste — Japanese Emoticons | FancifyText",
    description:
      "Free kaomoji copy and paste. The canonical Japanese emoticon hub—cute, cry, and heart lists plus Lenny and shrug—with every face in one index.",
    fellowKeywords: fellows(
      "japanese emoticons",
      "text faces",
      "kaomoji copy and paste",
    ),
    navLabel: "Kaomoji",
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
    description: "Copy cat kaomoji and kitty text faces. Free feline Japanese emoticons.",
    fellowKeywords: fellows("cat face emoticon", "kitty kaomoji"),
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
    title: "Cry Kaomojis Copy and Paste | FancifyText",
    description:
      "Copy cry kaomoji and crying text faces. Free sad Japanese emoticons.",
    fellowKeywords: fellows("crying kaomoji", "kaomoji cry"),
  },
  {
    phase: 5,
    priority: "P1",
    url: "/cute-kaomojis/",
    group: "F_Kaomoji",
    primaryKeyword: "cute kaomoji",
    title: "Cute Kaomojis Copy and Paste | FancifyText",
    description: "Copy cute kaomoji and kawaii text faces for bios and chats.",
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
    title: "Heart Kaomojis Copy and Paste | FancifyText",
    description: "Copy heart kaomoji and love text faces for messages.",
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
    priority: "P2",
    url: "/lenny-face/",
    group: "F_Kaomoji",
    primaryKeyword: "lenny face",
    title: "Lenny Face Copy and Paste ( ͡° ͜ʖ ͡°) | FancifyText",
    description:
      "Copy Lenny face ( ͡° ͜ʖ ͡°) and variants. Free emoticon for Discord and Reddit.",
    fellowKeywords: fellows("lenny face copy paste", "lenny emoticon"),
  },
  {
    phase: 5,
    priority: "P2",
    url: "/shrug-emoticon/",
    group: "F_Kaomoji",
    primaryKeyword: "shrug emoticon",
    title: "Shrug Emoticon Copy and Paste ¯\\_(ツ)_/¯ | FancifyText",
    description:
      "Copy the shrug emoticon ¯\\_(ツ)_/¯ and variants. Free idk text faces.",
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
      "Who runs FancifyText, how the Unicode fancy text generator works, and how we keep these free copy-and-paste tools accurate.",
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
  },
  {
    phase: 6,
    priority: "P2",
    url: "/guides/discord-colored-text-not-working/",
    group: "I_Guides",
    primaryKeyword: "discord colored text not working",
    title: "Discord Colored Text Not Working — Fixes | FancifyText",
    description:
      "Why Discord ANSI colors fail (missing code block, mobile client, paste stripped) and how to fix them with a fresh ```ansi copy.",
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
      "Instagram has no font picker. This guide shows how to paste Unicode bio fonts, stay inside 150 characters, and keep the bio readable.",
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
      "Fancy social fonts are look-alike Unicode characters, not installed typefaces. Learn the blocks we map, why boxes appear, and how that affects search.",
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
      "Facebook has no name font picker. Paste Unicode into the display name, keep the username plain, and stay inside Facebook’s name rules.",
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
      "When to use WhatsApp’s *bold* markdown and when to paste Unicode stylish text in status, group names, and chats.",
    fellowKeywords: fellows(
      "whatsapp stylish fonts",
      "whatsapp fancy text",
      "whatsapp bold italic strike",
    ),
  },
  {
    phase: 6,
    priority: "P1",
    url: "/binary-text-generator/",
    group: "D_Style_Other",
    primaryKeyword: "binary text generator",
    title: "Binary Text Generator — Text to Binary Copy & Paste | FancifyText",
    description:
      "Convert text to UTF-8 binary (and Morse). Copy geeky encoded text for Discord, homework, and bios.",
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
      "How to use Unicode fancy text and limited rich-text tags in Roblox names, bios, and UI—plus what gets filtered.",
    fellowKeywords: fellows("roblox font generator", "roblox stylish name"),
  },
  {
    phase: 6,
    priority: "P2",
    url: "/guides/fancy-text-shows-boxes/",
    group: "I_Guides",
    primaryKeyword: "fancy text shows as boxes",
    title: "Why Fancy Text Shows as Boxes (and Fixes) | FancifyText",
    description:
      "Empty tofu boxes mean a missing glyph. Learn which Unicode styles are safest on iOS, Android, and Windows.",
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
      "NVDA 2025.1 now reads Unicode bold and cursive as plain words by default. What still breaks, what to do instead.",
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
      "Snapchat has no font picker. Paste Unicode into display names carefully—filters reject many symbols.",
    fellowKeywords: fellows("snapchat fancy name", "change snapchat font"),
  },
  {
    phase: 6,
    priority: "P2",
    url: "/search/",
    group: "H_Trust",
    primaryKeyword: "search fancifytext tools",
    title: "Search Fancy Text Tools | FancifyText",
    description:
      "Find FancifyText generators by keyword—bold, cursive, Discord, Instagram, kaomoji, and more.",
    fellowKeywords: fellows("fancy text tools list"),
  },
];

/** Highest build phase with live routes (bump as phases ship). */
export const LIVE_MAX_PHASE = 6;

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
    "/discord-color-text/",
    "/instagram-font-generator/",
    "/cool-text-generator/",
    "/big-text-generator/",
    "/cool-symbols/",
  ],
  "/bold-text-generator/": [
    "/",
    "/copy-paste-fonts/",
    "/italic-text-generator/",
    "/discord-font-generator/",
    "/instagram-font-generator/",
    "/whatsapp-fonts/",
    "/old-english-text-generator/",
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
    "/text-decorator/",
    "/kaomoji/",
    "/copy-paste-fonts/",
    "/cute-fonts/",
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
    "/small-text-generator/",
    "/big-text-generator/",
    "/bold-text-generator/",
    "/guides/how-unicode-fancy-fonts-work/",
    "/copy-paste-fonts/",
    "/binary-text-generator/",
  ],
  "/binary-text-generator/": [
    "/big-text-generator/",
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
    "/aesthetic-fonts/",
    "/whatsapp-fonts/",
  ],
  "/kaomoji/": [
    "/cute-kaomojis/",
    "/lenny-face/",
    "/shrug-emoticon/",
    "/discord-font-generator/",
    "/",
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
    "/superscript-subscript-generator/",
    "/copy-paste-fonts/",
    "/roblox-font-generator/",
    "/big-text-generator/",
    "/",
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
    "/bold-text-generator/",
    "/glitch-text-generator/",
  ],
};

const KAOMOJI_FALLBACK = [
  "/kaomoji/",
  "/cute-kaomojis/",
  "/heart-kaomojis/",
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
  "/kaomoji/",
];

export function getFooterPages(): PageEntry[] {
  return FOOTER_URLS.map((u) => getPageByUrl(u)).filter(
    (p): p is PageEntry => Boolean(p),
  );
}

const EXPLORE_URLS = [
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
  "/cool-text-generator/",
  "/instagram-font-generator/",
  "/discord-font-generator/",
  "/cool-symbols/",
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

/** Shared content freshness signal for sitemap lastmod. */
export const SITE_CONTENT_UPDATED = new Date("2026-09-16T12:00:00.000Z");

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
