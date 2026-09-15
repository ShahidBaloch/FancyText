export type GuideSection = {
  heading: string;
  body: string[];
};

export type GuideConfig = {
  slug: string;
  h1: string;
  datePublished: string;
  dateModified: string;
  howToSteps: string[];
  sections: GuideSection[];
  faq: { question: string; answer: string }[];
};

export const GUIDES: GuideConfig[] = [
  {
    slug: "discord-colored-text-not-working",
    h1: "Discord colored text not working",
    datePublished: "2026-03-01",
    dateModified: "2026-09-15",
    howToSteps: [
      "Copy a fresh ```ansi block from the Discord color text tool—do not type the codes by hand.",
      "Paste into a Discord message as the entire message (or a full code block), then send.",
      "If color still fails, check you are not in a plain-text context (forum titles, some mobile embeds) and try the desktop app.",
    ],
    sections: [
      {
        heading: "Colored text needs an ANSI code block",
        body: [
          "Discord does not color normal messages. It only paints text inside a fenced code block that starts with ```ansi and includes ANSI escape codes.",
          "If you paste the letters without the fence, Discord shows plain white (or theme) text. Generate the full block on the Discord color text tool and copy that, not just the inner sentence.",
        ],
      },
      {
        heading: "Fixes that actually work",
        body: [
          "Paste as a new message. Editing an old message sometimes drops the escape characters.",
          "Do not wrap the block in extra backticks. One opening ```ansi and one closing ``` is enough.",
          "Try the desktop app. Some mobile and in-game overlays render ANSI poorly or strip the escape sequence on paste.",
          "Avoid nicknames, channel topics, and forum post titles—those fields are not ANSI message bodies.",
          "If a bot or webhook posted the text, confirm the payload still contains the ESC character (U+001B), not a copied “missing glyph” square.",
        ],
      },
      {
        heading: "When to use fonts instead of color",
        body: [
          "Unicode fancy fonts (bold, cursive, bubble) work in nicknames and many bios. ANSI colors do not. If you need a colored-looking name, use the Discord font generator instead of ANSI.",
        ],
      },
    ],
    faq: [
      {
        question: "Why is my Discord color text not working on mobile?",
        answer:
          "Some mobile clients render ANSI weakly or strip the escape on paste. Generate a fresh ```ansi block and test in the desktop app. Color was never supported in nicknames.",
      },
      {
        question: "Does Discord colored text work in embeds?",
        answer:
          "Standard user messages with ```ansi work. Many embed fields and interaction responses do not paint ANSI the same way.",
      },
      {
        question: "Can I color a Discord nickname?",
        answer:
          "No. Use Unicode fonts for nicknames. ANSI color is for message code blocks only.",
      },
    ],
  },
  {
    slug: "instagram-bio-fonts",
    h1: "How to change your Instagram bio font",
    datePublished: "2026-03-01",
    dateModified: "2026-09-15",
    howToSteps: [
      "Type your bio in the Instagram font generator or the multi-line bio builder.",
      "Copy a style that stays readable (cursive, bold, or small caps).",
      "Open Instagram → Edit profile → Bio, paste, and check you are still under 150 characters.",
    ],
    sections: [
      {
        heading: "Instagram has no font picker",
        body: [
          "The Instagram app cannot load a custom TTF for your bio. “Changing the font” means pasting Unicode look-alike letters generated in a browser.",
          "That is why every Instagram font changer is a copy-and-paste tool, not a download.",
        ],
      },
      {
        heading: "Stay inside 150 characters",
        body: [
          "The bio field is 150 characters. Fancy letters still count as characters, and some look wider on a phone.",
          "If you need line breaks, spacers, and a live counter for Instagram vs TikTok vs X, use the social media bio generator. Use the Instagram font generator when you only need a single styled line.",
        ],
      },
      {
        heading: "Keep the bio searchable",
        body: [
          "Instagram search and some screen readers struggle with dense Unicode. Put your name or niche in plain letters, then add one stylish line for flair.",
          "Skip glitch and squared styles in the bio—they break more often and waste the limit.",
        ],
      },
    ],
    faq: [
      {
        question: "Can I change the Instagram font for my whole app?",
        answer:
          "No. You can only paste Unicode into fields like bio, name, and captions. The rest of the Instagram UI stays the system font.",
      },
      {
        question: "Why does my fancy bio look like boxes?",
        answer:
          "The device font is missing those Unicode glyphs. Switch to bold, sans bold, or cursive and paste again.",
      },
      {
        question: "Will a fancy bio hurt Instagram reach?",
        answer:
          "The bio is not a ranking caption. Still, keep keywords in plain text so people and assistive tech can read them.",
      },
    ],
  },
  {
    slug: "how-unicode-fancy-fonts-work",
    h1: "How Unicode fancy fonts work",
    datePublished: "2026-03-01",
    dateModified: "2026-09-15",
    howToSteps: [
      "Type a word on the fancy text generator and copy a style such as bold or cursive.",
      "Paste it into Notes or a chat and select one letter—you will see it is a different character, not a font setting.",
      "If a box appears, switch to a more common block (bold, sans bold) instead of installing a file.",
    ],
    sections: [
      {
        heading: "They are letters, not a downloaded font",
        body: [
          "Social apps do not let you install a custom typeface for your bio. A “fancy font” on Instagram or Discord is almost always a different Unicode character that happens to look like a styled A.",
          "FancifyText maps A–Z onto blocks such as Mathematical Alphanumeric Symbols (bold, italic, script, Fraktur, double-struck, sans). The clipboard still holds text, so you can paste it anywhere that accepts those code points.",
        ],
      },
      {
        heading: "Why some styles show as empty boxes",
        body: [
          "A box means the device font file does not include that glyph. Bold and sans-bold are widely covered. Old English (Fraktur), some superscript letters, and dense combining marks (glitch / slash overlay) fail more often.",
          "This is a font-coverage problem on the phone or app, not a broken generator. Try another style rather than downloading a TTF—the destination app would still draw its own font.",
        ],
      },
      {
        heading: "Combining marks are a different trick",
        body: [
          "Strikethrough, underline, slash overlay, and Zalgo do not replace the letter. They add extra marks on top of the original character. Those strings are longer than they look and can break layout in usernames.",
          "Keep combining styles to a short joke. Public bios should stay on mapped letters (bold, cursive, bubble) plus maybe one symbol from the cool symbols list.",
        ],
      },
      {
        heading: "Search, accessibility, and filters",
        body: [
          "Screen readers and in-app search often read fancy letters as symbols or skip them. Put your name and niche in plain ASCII, then add one stylish line for flair.",
          "Username filters (Roblox, some Discord servers, Facebook handles) reject unusual code points. Display names are usually looser than @usernames.",
        ],
      },
    ],
    faq: [
      {
        question: "Is Unicode fancy text the same as installing a font?",
        answer:
          "No. Installing a font changes how an app draws the same A–Z. Fancy text replaces those letters with other Unicode characters that already look styled.",
      },
      {
        question: "Can Google rank a page written entirely in fancy text?",
        answer:
          "It can index the characters, but people and many parsers still expect normal letters. Use fancy text for names and short bios, not articles.",
      },
      {
        question: "Why does copy-paste work across apps?",
        answer:
          "You are copying characters, not a font file. Any app that can render those Unicode points will show the style.",
      },
    ],
  },
  {
    slug: "facebook-name-fonts",
    h1: "How to change your Facebook name font",
    datePublished: "2026-03-15",
    dateModified: "2026-09-15",
    howToSteps: [
      "Generate a short display name on the Facebook font generator (sans bold or cursive).",
      "On Facebook, open Profile → Edit → Name (or the display name field). Paste the Unicode. Leave the username / handle in plain letters.",
      "Save and check the name on a phone. If Facebook rejects it, drop bubble or gothic styles and retry.",
    ],
    sections: [
      {
        heading: "Display name vs username",
        body: [
          "Facebook’s display name is the line friends see on your profile. That field often accepts Unicode. The @username (and many page usernames) is closer to a login handle and should stay A–Z, digits, and periods.",
          "If people cannot find you in search, the fancy name is usually the reason. Keep one searchable word in normal letters.",
        ],
      },
      {
        heading: "Name rules still apply",
        body: [
          "Facebook can still reject names that look like spam, impersonation, or strings of symbols. A single styled first name is safer than a sentence of hearts and blackletter.",
          "Page names used for a business should stay readable. Fancy letters in an ad or shop title can fail review or look like boxes on older phones.",
        ],
      },
      {
        heading: "Comments and posts",
        body: [
          "You can paste a short fancy word into a comment. Long Fraktur paragraphs are hard to read and more likely to render poorly. For a bio-style stack, the social media bio generator is built for Instagram/TikTok/X limits—not Facebook’s about fields, which are longer but still need plain keywords.",
        ],
      },
    ],
    faq: [
      {
        question: "Can I change the Facebook app font?",
        answer:
          "No. This only changes characters you paste into a name or comment. The rest of the Facebook UI stays the system font.",
      },
      {
        question: "Why did Facebook reject my stylish name?",
        answer:
          "Filters block some symbols and look-alike strings. Try sans bold or regular bold, shorten the name, and retry with a plain username.",
      },
      {
        question: "Do old English fonts work on Facebook?",
        answer:
          "Sometimes in a display name, often not. Test a short Fraktur word before you replace a business page title.",
      },
    ],
  },
  {
    slug: "whatsapp-stylish-text",
    h1: "WhatsApp stylish text vs built-in formatting",
    datePublished: "2026-03-15",
    dateModified: "2026-09-15",
    howToSteps: [
      "For a normal chat, try WhatsApp’s own markdown first: *bold*, _italic_, ~strike~, ```monospace```.",
      "For a status, group name, or display name that cannot use markdown, generate Unicode on the WhatsApp fonts tool and paste it.",
      "Keep the important words in plain letters so search and quotes still work.",
    ],
    sections: [
      {
        heading: "WhatsApp already has bold and italic",
        body: [
          "In chats, wrap words with *asterisks* for bold, _underscores_ for italic, and ~tildes~ for strikethrough. That formatting is real rich text. It stays readable, copies as normal letters, and does not depend on Unicode coverage.",
          "Use those marks when you are writing a message. Unicode stylish text is the workaround for fields that do not parse markdown—status, group titles, and some profile lines.",
        ],
      },
      {
        heading: "When Unicode still wins",
        body: [
          "Group names and status lines do not give you a font picker. Pasting sans bold or cursive is the same trick as Instagram bios.",
          "Bubble and fullwidth look playful but eat width on a phone. Glitch text can crash layout in a status. Prefer bold, cursive, or small caps.",
        ],
      },
      {
        heading: "Quoted replies and search",
        body: [
          "If someone quotes your message, Unicode letters travel with the quote. Chat search may not find a word you only typed in fancy letters. Put keywords in plain text, then add one stylish word for flair.",
        ],
      },
    ],
    faq: [
      {
        question: "Is WhatsApp stylish text the same as *bold*?",
        answer:
          "No. *bold* is WhatsApp markdown on normal letters. Stylish Unicode is different characters. Use markdown in chats; use Unicode in names and status.",
      },
      {
        question: "Will fancy WhatsApp fonts work on every phone?",
        answer:
          "Common bold and cursive usually will. Old English and combining marks often box out. Always preview on the device you care about.",
      },
      {
        question: "Can I use small text in a WhatsApp status?",
        answer:
          "Yes for a short line. Tiny superscript is hard to read; small caps is usually clearer. Generate it on the small text generator.",
      },
    ],
  },
  {
    slug: "roblox-fancy-text",
    h1: "Roblox fancy text and rich text",
    datePublished: "2026-09-15",
    dateModified: "2026-09-15",
    howToSteps: [
      "Generate a short Unicode name on the Roblox font generator.",
      "Paste into a display name or bio and check Roblox does not strip the characters.",
      "For UI labels that support rich text, prefer simple HTML-like tags from the HTML text generator instead of dense Zalgo.",
    ],
    sections: [
      {
        heading: "Unicode names vs rich text tags",
        body: [
          "Roblox chat and many name fields accept some Unicode fancy letters, but filters reject glitch marks and odd symbols. Start with sans bold or bubble.",
          "Experience UI text sometimes supports limited rich-text tags (bold, color). That is markup, not Unicode fonts—use the HTML text generator and test in Studio.",
        ],
      },
      {
        heading: "What usually fails",
        body: [
          "Zalgo / heavy combining marks, squared letters, and rare letterlike symbols often get filtered or show as boxes on console fonts.",
          "Keep usernames short. Long fancy strings look broken in the friends list.",
        ],
      },
    ],
    faq: [
      {
        question: "Can I use cursive in a Roblox username?",
        answer:
          "Sometimes in display-style fields. Account usernames are stricter. Always keep a plain backup name.",
      },
      {
        question: "Is Roblox fancy text a real font download?",
        answer:
          "No. Like other fancy text tools, you paste Unicode characters. Nothing installs on the device.",
      },
    ],
  },
  {
    slug: "fancy-text-shows-boxes",
    h1: "Why fancy text shows as boxes",
    datePublished: "2026-09-15",
    dateModified: "2026-09-15",
    howToSteps: [
      "If you see □ or empty glyphs, switch to bold, sans bold, or bubble.",
      "Shorten the string—rare letters in the middle of a word often fail first.",
      "Preview on the phone or OS where the bio will be read.",
    ],
    sections: [
      {
        heading: "Missing glyphs, not a broken generator",
        body: [
          "Fancy text is still text. Boxes (“tofu”) appear when the device font file does not include that Unicode code point.",
          "Mathematical bold and sans bold are widely covered. Fraktur, parenthesized, and some combining overlays fail more often on older Android skins and console overlays.",
        ],
      },
      {
        heading: "Safer style order",
        body: [
          "Try sans bold → bold → bubble → cursive → small caps → fullwidth. Keep glitch and squared for novelty only.",
        ],
      },
    ],
    faq: [
      {
        question: "Why does Instagram show boxes but Discord does not?",
        answer:
          "Each app embeds different fonts. Test in the destination app, not only in the browser preview.",
      },
      {
        question: "Do boxes hurt SEO?",
        answer:
          "On your own website, prefer plain keywords. Fancy Unicode in a public bio is fine for style but weak for search matching.",
      },
    ],
  },
  {
    slug: "snapchat-name-fonts",
    h1: "Snapchat name fonts",
    datePublished: "2026-09-15",
    dateModified: "2026-09-15",
    howToSteps: [
      "Generate a short name on the Snapchat font generator.",
      "Copy sans bold or bubble first—Snapchat filters reject many symbols.",
      "Paste into the display name field and confirm it saves.",
    ],
    sections: [
      {
        heading: "Snapchat is picky",
        body: [
          "Snapchat has no font picker. Unicode is the only workaround, and the app rejects a long list of symbols for abuse and spoofing reasons.",
          "If a paste fails, strip combining marks and try sans bold or small caps. Keep the username handle plain.",
        ],
      },
      {
        heading: "Bitmoji and search",
        body: [
          "Friends still find you by username more than by fancy display letters. Put searchable words in plain text when you can.",
        ],
      },
    ],
    faq: [
      {
        question: "Why won’t Snapchat save my fancy name?",
        answer:
          "The character set is filtered. Switch to a more compatible Unicode style or shorten the name.",
      },
      {
        question: "Can I use cursive on Snapchat?",
        answer:
          "Sometimes. Script letters are hit-or-miss; sans bold is the safer first try.",
      },
    ],
  },
  {
    slug: "do-fancy-fonts-break-screen-readers",
    h1: "Do fancy fonts break screen readers?",
    datePublished: "2026-09-15",
    dateModified: "2026-09-15",
    howToSteps: [
      "Decide whether the text is decoration (a display name, a one-line bio accent) or content people need to read.",
      "For decoration, style a short fragment and leave the words that carry meaning in ordinary letters.",
      "For content—captions, posts, headings, anything longer than a few words—use real bold or italic formatting instead of Unicode look-alikes.",
    ],
    sections: [
      {
        heading: "The short answer: less than they used to, but it depends on the reader",
        body: [
          "Almost every guide on this topic says the same thing: a screen reader hears “MATHEMATICAL BOLD SMALL H, MATHEMATICAL BOLD SMALL I” when you write 𝐡𝐢. That was true for years. It is no longer true everywhere, and the pages still repeating it have not been updated.",
          "NVDA—the most widely used screen reader on Windows—turned Unicode normalization on by default for speech in version 2025.1. With it on, 𝐡𝐞𝐥𝐥𝐨, 𝒽𝑒𝓁𝓁𝑜 and 𝗵𝗲𝗹𝗹𝗼 are all simply spoken as “hello”. The setting lives under Speech in NVDA’s settings dialog and can be switched off.",
          "So the honest answer in 2026 is: it depends on which reader, which version, and which output. That is less satisfying than a blanket warning, but a blanket warning would send you to the wrong decision half the time.",
        ],
      },
      {
        heading: "Why normalization works at all",
        body: [
          "These characters were never meant for prose. The Unicode standard’s own note on the Mathematical Alphanumeric Symbols block says they are “to be used for mathematical variables where style variations are important semantically. For general text, use standard Latin and Greek letters with markup.”",
          "Each one does carry a formal link back to its plain twin. U+1D41A MATHEMATICAL BOLD SMALL A has a decomposition type of “font” and a decomposition mapping to plain “a”. Normalization follows that mapping, which is how a screen reader can recover “hello” from 𝐡𝐞𝐥𝐥𝐨 without guessing.",
          "That also explains the limits. The mapping only exists for characters that have a plain equivalent. Anything without one cannot be recovered.",
        ],
      },
      {
        heading: "Where it still breaks",
        body: [
          "Braille displays. NVDA enabled normalization for speech, but left it off by default for braille output. A braille reader can still get an unreadable line where a speech user gets clean text—and braille users are exactly the people least likely to have a sighted person nearby to explain it.",
          "Other screen readers. VoiceOver on macOS and iOS, TalkBack on Android, and JAWS do not share NVDA’s default. Behaviour ranges from reading the formal character name, to spelling letters out, to skipping characters entirely. Do not assume NVDA’s fix is universal.",
          "Combining-mark styles. Normalization does not rescue these. Strikethrough, underline, and especially zalgo work by stacking extra marks on top of ordinary letters, and those marks have no plain equivalent to fall back to. A reader may announce every single one. Zalgo is the genuinely hostile case and always has been.",
          "Superscript and subscript. Here normalization actively costs you meaning: ⁱ becomes “i” and ₙ becomes “n”, so x² and x₂ can both flatten to “x2”. Fine for a bio, bad for anything where the position was the point.",
          "Search, mentions, and autocorrect. This is not accessibility, but it lands on the same people. Styled letters do not match plain-text search, @-mentions often fail, and spellcheck gives up. A name nobody can find or tag is its own kind of inaccessible.",
        ],
      },
      {
        heading: "What to actually do",
        body: [
          "Style the accent, not the information. A display name reading “Maya ✦ 𝓹𝓱𝓸𝓽𝓸𝓰𝓻𝓪𝓹𝓱𝔂” keeps the searchable, speakable part intact. A name fully converted to script does not.",
          "Never style a whole paragraph. A caption in Unicode cursive is slow to read for everyone, not only screen reader users—dyslexic readers, people on small phones, and anyone reading in bright sunlight all lose out.",
          "Use real formatting where the platform offers it. Discord’s **bold**, Markdown, and rich-text editors produce genuine semantic bold that announces correctly, survives copy-paste, and stays searchable. Unicode substitution is a workaround for fields that allow no formatting at all.",
          "On the web, you have a clean escape hatch: show the styled characters and hand assistive technology the plain word with aria-label. You get the visual and the accessible name, with no compromise.",
          "Skip zalgo anywhere it will be read rather than looked at.",
        ],
      },
      {
        heading: "How we handle this on FancifyText",
        body: [
          "Every style in our gallery carries a compatibility badge and a note, and styles that are known to cause trouble in usernames are flagged rather than quietly offered. The preview on each tool page is built from the same Unicode maps the copy button uses, so what you hear about is what you actually get.",
          "We also check our own character maps on every build: the Mathematical Alphanumeric block has 24 reserved gaps where a naive generator emits an unassigned character that renders as a tofu box, and a test fails the build if any style ever produces one.",
        ],
      },
    ],
    faq: [
      {
        question: "Do fancy fonts break screen readers?",
        answer:
          "Not as reliably as older guides claim. NVDA 2025.1 enabled Unicode normalization by default for speech, so styled letters like 𝐛𝐨𝐥𝐝 are read as ordinary words on Windows. VoiceOver, TalkBack and JAWS do not share that default, and NVDA leaves braille output un-normalized, so the safe rule is still to style short accents rather than whole sentences.",
      },
      {
        question: "Is Unicode bold accessible?",
        answer:
          "It is more accessible than it was, but it is not equivalent to real bold. Unicode bold replaces each letter with a separate character; real bold keeps the letter and adds styling. Real bold stays searchable, spellcheckable, and readable on every assistive technology, so use it wherever the platform allows formatting.",
      },
      {
        question: "Is zalgo text bad for accessibility?",
        answer:
          "Yes, and unlike plain styled letters this has not improved. Zalgo stacks combining marks that have no plain-text equivalent, so normalization cannot undo it. A screen reader may announce each mark individually. Avoid it anywhere the text needs to be read.",
      },
      {
        question: "Why does my styled name not show up in search or mentions?",
        answer:
          "Because the letters are different characters from the ones you typed. 𝐌𝐚𝐲𝐚 does not match a search for “Maya”. Keep your username plain and put styling in the display name, which is not used for lookups.",
      },
      {
        question: "What is the most accessible way to use fancy text?",
        answer:
          "Style a short fragment, keep the meaningful words in ordinary letters, avoid combining-mark styles, and use real formatting whenever the platform supports it. On your own site, pair the styled characters with an aria-label containing the plain text.",
      },
      {
        question: "Does this affect SEO too?",
        answer:
          "Yes. Search engines index the actual code points, so a heading written in Unicode cursive is not the same string as the plain word. Keep headings and body copy in ordinary letters and reserve styled text for visual accents.",
      },
    ],
  },
];

export const GUIDES_BY_SLUG = Object.fromEntries(
  GUIDES.map((g) => [g.slug, g]),
) as Record<string, GuideConfig>;

export function getGuide(slug: string): GuideConfig | undefined {
  return GUIDES_BY_SLUG[slug];
}

export const GUIDE_SLUGS = GUIDES.map((g) => g.slug);
