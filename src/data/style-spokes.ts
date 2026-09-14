import type { PageEntry } from "@/data/pages/registry";
import { getPageByUrl } from "@/data/pages/registry";

export type StyleSpokeConfig = {
  slug: string;
  styleId: string;
  /** Extra chips shown on the tool (primary first). */
  styleIds: string[];
  secondaryStyleId?: string;
  sampleInput: string;
  examples: string[];
  howToSteps: string[];
  uses: string[];
  compatibilityNotes: string[];
  /** Named variants for SEO H2 (serif / sans / squared…). */
  variants?: { name: string; styleId: string; blurb: string }[];
  /** Show a multi-row style gallery below the primary tool. */
  showGallery?: boolean;
  faq: { question: string; answer: string }[];
};

function spoke(
  slug: string,
  styleId: string,
  styleIds: string[],
  partial: Omit<
    StyleSpokeConfig,
    "slug" | "styleId" | "styleIds"
  >,
): StyleSpokeConfig {
  return { slug, styleId, styleIds, ...partial };
}

export const STYLE_SPOKES: StyleSpokeConfig[] = [
  spoke("bold-text-generator", "bold", ["bold", "sans-bold", "bold-italic", "fraktur", "double-struck", "squared"], {
    sampleInput: "Bold Text",
    examples: [
      "Bold Text",
      "Discord Name",
      "Instagram Bio",
      "Make it bold",
      "Sale Now",
      "VIP Access",
      "Game Tag",
      "Call to Action",
    ],
    showGallery: true,
    variants: [
      {
        name: "Mathematical bold (serif)",
        styleId: "bold",
        blurb: "Classic bold Unicode—great for bios and nicknames.",
      },
      {
        name: "Sans-serif bold",
        styleId: "sans-bold",
        blurb: "Cleaner bold look; often the most compatible fallback.",
      },
      {
        name: "Bold italic",
        styleId: "bold-italic",
        blurb: "Emphasis with slant—good for short captions.",
      },
      {
        name: "Fraktur / gothic bold",
        styleId: "fraktur",
        blurb: "Ornate blackletter vibe for titles and usernames.",
      },
      {
        name: "Double-struck",
        styleId: "double-struck",
        blurb: "Outlined “blackboard bold” style for flair.",
      },
      {
        name: "Squared",
        styleId: "squared",
        blurb: "Letters in squares—short names and tags only.",
      },
    ],
    howToSteps: [
      "Type or paste your words into the box above.",
      "Pick a bold style chip — preview updates instantly.",
      "Tap Copy, or scroll to More looks to compare and copy another variant.",
    ],
    uses: [
      "Discord nicknames and server titles",
      "Instagram and TikTok bios",
      "WhatsApp status lines and group names",
      "Captions where you want emphasis without real bold formatting",
      "Gaming tags and profile CTAs",
    ],
    compatibilityNotes: [
      "Bold Unicode works in most modern apps and browsers.",
      "Some older devices may show boxes for rare characters—try sans bold as a fallback.",
      "Username fields may reject squared or fraktur symbols—test before locking a handle.",
    ],
    faq: [
      {
        question: "What is a bold text generator?",
        answer:
          "A bold text generator converts normal letters into Unicode bold characters you can copy and paste. It is not a downloadable font—the bold look travels with the text.",
      },
      {
        question: "Is this the same as a bold font generator?",
        answer:
          "Yes. People search for both bold text generator and bold font generator for the same job: make text look bold in apps that do not offer formatting.",
      },
      {
        question: "Can I copy bold fonts for Discord?",
        answer:
          "Discord supports many Unicode bold styles. Copy from the preview and paste into your nickname, channel name, or about-me text.",
      },
      {
        question: "How do I make text bold on Instagram?",
        answer:
          "Instagram bios and captions do not have a bold button. Generate bold Unicode here, copy it, and paste into your bio or caption field.",
      },
      {
        question: "Why does bold text look like boxes on my phone?",
        answer:
          "Your device font may not include every Unicode symbol. Try sans bold or shorten the text if a character fails to render.",
      },
      {
        question: "What is the difference between bold and sans bold?",
        answer:
          "Mathematical bold has a serif-leaning look. Sans bold uses a cleaner sans-serif Unicode set and often renders more reliably on phones.",
      },
      {
        question: "Can I use bold text in WhatsApp?",
        answer:
          "Yes. Paste Unicode bold into status or messages. WhatsApp also supports *markdown bold* in chats—Unicode is better when you need the style outside markdown fields.",
      },
      {
        question: "Does bold Unicode hurt SEO?",
        answer:
          "Search engines prefer plain text for keywords. Use bold fancy text for display flair and keep important searchable words in normal letters when you can.",
      },
    ],
  }),
  spoke("italic-text-generator", "italic", ["italic", "bold-italic", "cursive"], {
    sampleInput: "Italic Text",
    examples: ["Italic Text", "Elegant quote", "Soft emphasis", "Stylish bio"],
    showGallery: true,
    variants: [
      {
        name: "Mathematical italic",
        styleId: "italic",
        blurb: "Clean slanted Unicode for quotes and bios.",
      },
      {
        name: "Bold italic",
        styleId: "bold-italic",
        blurb: "Stronger slant with weight for short CTAs.",
      },
      {
        name: "Cursive / script",
        styleId: "cursive",
        blurb: "Handwritten look—different Unicode block from italic.",
      },
    ],
    howToSteps: [
      "Enter the phrase you want in italic Unicode.",
      "Copy the slanted preview output.",
      "Paste into bios, chats, or captions anywhere italic formatting is not built in.",
    ],
    uses: [
      "Quotes and aesthetic captions",
      "Soft emphasis in Discord or Instagram bios",
      "Titles and subtitles in social profiles",
    ],
    compatibilityNotes: [
      "Italic Unicode is widely supported on mobile and desktop.",
      "Very long strings may clip in username fields with character limits.",
    ],
    faq: [
      {
        question: "What is an italic text generator?",
        answer:
          "It turns plain text into Unicode italic letters that look slanted when pasted—no font install required.",
      },
      {
        question: "Can I use italic text on Instagram?",
        answer:
          "Yes. Paste italic Unicode into your bio or captions. It works because Instagram reads the characters, not app-level italic styling.",
      },
      {
        question: "Is italic text the same as cursive?",
        answer:
          "No. Italic uses slanted mathematical letters. Cursive/script uses a different Unicode set with more handwritten curves.",
      },
      {
        question: "Does italic Unicode work in Discord?",
        answer:
          "Usually yes for nicknames and messages. If a character fails, try bold italic or a shorter phrase.",
      },
      {
        question: "Is this an italics generator or italic font maker?",
        answer:
          "Yes—those searches point to the same Unicode italic converter for copy and paste.",
      },
      {
        question: "Can I combine italic with bold?",
        answer:
          "Use the bold italic chip for both weight and slant in one string.",
      },
    ],
  }),
  spoke("bubble-text-generator", "bubble", ["bubble", "squared"], {
    sampleInput: "Bubble",
    examples: ["Bubble", "Cool Name", "Fun Bio", "Circled ABC"],
    showGallery: true,
    variants: [
      {
        name: "Circled bubble letters",
        styleId: "bubble",
        blurb: "Classic enclosed alphanumerics for playful names.",
      },
      {
        name: "Squared letters",
        styleId: "squared",
        blurb: "Boxy alternative when you want a logo-like tag.",
      },
    ],
    howToSteps: [
      "Type your word or phrase.",
      "See circled bubble letters in the preview.",
      "Copy and paste into Discord, Instagram, or games that allow Unicode nicknames.",
    ],
    uses: [
      "Playful Discord and Roblox-style usernames",
      "Fun Instagram or TikTok bios",
      "Bubble letter titles for aesthetic posts",
    ],
    compatibilityNotes: [
      "Bubble letters work best for short names and headlines.",
      "Digits use circled number Unicode; some platforms limit mixed symbols in usernames.",
    ],
    faq: [
      {
        question: "What is bubble text?",
        answer:
          "Bubble text uses Unicode enclosed alphanumerics—letters and numbers inside circles—so you can copy and paste a fun rounded look.",
      },
      {
        question: "Can I copy bubble letters for Discord?",
        answer:
          "Yes. Bubble text is popular for Discord display names and server titles when the platform allows the characters.",
      },
      {
        question: "Do bubble fonts include numbers?",
        answer:
          "Yes. Digits 0–9 map to circled number characters where supported.",
      },
      {
        question: "Why are some bubble letters missing?",
        answer:
          "Not every letter has a perfect circled Unicode twin on all devices. Keep names short and test on your target app.",
      },
      {
        question: "Is bubble text the same as circle text?",
        answer:
          "Mostly yes. Circle text, bubble letters, and enclosed alphanumeric searches usually mean this Unicode style.",
      },
      {
        question: "Can I use bubble fonts in WhatsApp status?",
        answer:
          "Often yes for short status lines. Test on your phone—very long bubble strings can look cramped.",
      },
    ],
  }),
  spoke(
    "strikethrough-text-generator",
    "strikethrough",
    ["strikethrough", "underline"],
    {
      sampleInput: "crossed out",
      examples: ["crossed out", "old price", "spoiler text", "done task"],
      howToSteps: [
        "Type the text you want crossed out.",
        "The generator adds a Unicode combining strikethrough mark to each character.",
        "Copy and paste into chats, bios, or posts.",
      ],
      uses: [
        "Joke posts and meme captions",
        "Showing old vs new text in bios",
        "Light spoiler or “done” styling in messages",
      ],
      compatibilityNotes: [
        "Combining marks depend on app support—works in many modern messengers.",
        "Very dense strikethrough on long paragraphs can look cluttered on small screens.",
      ],
      faq: [
      {
        question: "How does strikethrough text work?",
        answer:
          "The tool adds a Unicode combining long stroke overlay to each letter. The base letter stays readable with a line through it.",
      },
      {
        question: "Can I strikethrough text on Instagram?",
        answer:
          "Instagram does not offer native strikethrough in bios. Unicode strikethrough is a workaround that works in many cases when pasted.",
      },
      {
        question: "Is this the same as cross out text?",
        answer:
          "Yes. Cross out text, strikethrough font, and line-through text searches usually mean the same Unicode effect.",
      },
      {
        question: "Does strikethrough work on Discord?",
        answer:
          "Discord has its own ~~markdown~~ strikethrough in messages. Unicode strikethrough is still useful for nicknames and platforms without markdown.",
      },
    ],
    },
  ),
  spoke(
    "superscript-subscript-generator",
    "superscript",
    ["superscript", "subscript"],
    {
      secondaryStyleId: "subscript",
      sampleInput: "H2O",
      examples: ["H2O", "x2", "E=mc2", "footnote"],
      howToSteps: [
        "Type text with letters and numbers (e.g. H2O or x2).",
        "Copy the superscript preview for raised text, or use the subscript row below for lowered text.",
        "Paste into notes, math captions, or footnote-style social posts.",
      ],
      uses: [
        "Chemistry-style notation (H₂O) in captions",
        "Math exponents and footnote markers",
        "Tiny text accents in bios where allowed",
      ],
      compatibilityNotes: [
        "Superscript has more letter coverage than subscript in Unicode.",
        "Complex formulas may need plain text for accessibility.",
      ],
      faq: [
        {
          question: "What is a subscript generator?",
          answer:
            "It converts supported characters into lowered Unicode subscript forms—useful for chemistry, math, and footnote-style text.",
        },
        {
          question: "Can I make superscript text online?",
          answer:
            "Yes. The superscript preview raises digits and many letters. Copy it directly—no keyboard shortcuts needed.",
        },
        {
          question: "Does tiny text work everywhere?",
          answer:
            "Support varies. Digits and common letters work in most apps; exotic symbols may not have subscript or superscript twins.",
        },
        {
          question: "Is this a tiny text generator?",
          answer:
            "People also call superscript and subscript tools tiny text generators because the output looks smaller than normal letters.",
        },
      ],
    },
  ),
  spoke("upside-down-text-generator", "upside-down", ["upside-down"], {
    sampleInput: "flip me",
    examples: ["flip me", "hello", "lol", "reverse"],
    howToSteps: [
      "Type the phrase you want flipped.",
      "The generator reverses character order and maps to upside-down Unicode.",
      "Copy the flipped result and paste into chats or bios.",
    ],
    uses: [
      "Funny messages and meme captions",
      "Reverse jokes in Discord or WhatsApp",
      "Novelty social bios",
    ],
    compatibilityNotes: [
      "Not every letter has a perfect upside-down mirror.",
      "Punctuation may flip oddly—that is normal for Unicode flip tools.",
    ],
    faq: [
      {
        question: "What is upside down text?",
        answer:
          "Upside down text replaces characters with inverted Unicode symbols and reverses their order so the string reads flipped.",
      },
      {
        question: "Can I flip text for Instagram?",
        answer:
          "Yes. Copy the flipped output into captions or bios for a novelty effect.",
      },
      {
        question: "Why do some letters not flip perfectly?",
        answer:
          "Unicode only provides upside-down shapes for a subset of Latin letters and symbols. Unmapped characters stay as-is.",
      },
      {
        question: "Is this an upside down text generator or flip text generator?",
        answer:
          "Both terms describe the same tool—people search either phrase for reversed, inverted text.",
      },
    ],
  }),
  spoke("glitch-text-generator", "glitch", ["glitch"], {
    sampleInput: "glitch",
    examples: ["glitch", "cursed", "zalgo", "error"],
    howToSteps: [
      "Enter the text you want to distort.",
      "Preview the Zalgo-style glitch output with combining marks.",
      "Copy and paste into Discord, usernames, or horror-aesthetic posts.",
    ],
    uses: [
      "Horror / creepypasta aesthetic usernames",
      "Meme and glitch-art captions",
      "Novelty Discord nicknames (where allowed)",
    ],
    compatibilityNotes: [
      "Heavy glitch text can break layout in some apps—use shorter strings.",
      "Screen readers may struggle with dense combining marks; avoid for important info.",
    ],
    faq: [
      {
        question: "What is glitch text / Zalgo text?",
        answer:
          "Glitch or Zalgo text stacks Unicode combining diacritical marks above and below letters to create a corrupted, creepy effect.",
      },
      {
        question: "Is a glitch text generator safe to use?",
        answer:
          "It is harmless Unicode text, but very long glitch strings can lag some apps or get moderated on strict platforms.",
      },
      {
        question: "Can I use cursed text on Discord?",
        answer:
          "Discord often allows moderate glitch nicknames, but extreme Zalgo may hit character limits or moderation. Test a short version first.",
      },
      {
        question: "Why does glitch text look broken on mobile?",
        answer:
          "Many combining marks in one character cell can overflow line height on small screens. Reduce length for better readability.",
      },
    ],
  }),
];

export const STYLE_SPOKES_BY_SLUG = Object.fromEntries(
  STYLE_SPOKES.map((s) => [s.slug, s]),
) as Record<string, StyleSpokeConfig>;

export function getStyleSpoke(slug: string): StyleSpokeConfig | undefined {
  return STYLE_SPOKES_BY_SLUG[slug];
}

export function getStyleSpokePage(slug: string): PageEntry | undefined {
  return getPageByUrl(`/${slug}/`);
}

export const STYLE_SPOKE_SLUGS = STYLE_SPOKES.map((s) => s.slug);
