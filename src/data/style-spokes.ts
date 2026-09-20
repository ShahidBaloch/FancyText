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
  howToHeading?: string;
  howToSteps: string[];
  usesHeading?: string;
  uses: string[];
  compatHeading?: string;
  compatibilityNotes: string[];
  examplesHeading?: string;
  /** Named variants for SEO H2 (serif / sans / squared…). */
  variants?: { name: string; styleId: string; blurb: string }[];
  /** Show a multi-row style gallery below the primary tool. */
  showGallery?: boolean;
  /** Unique positioning vs overlapping style tools. */
  difference?: { heading: string; body: string };
  extraSections?: {
    id: string;
    heading: string;
    paragraphs?: string[];
    bullets?: string[];
  }[];
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
    howToHeading: "Make a word look bold without a bold button",
    howToSteps: [
      "Type the word you want heavier.",
      "Tap a bold chip. Sans bold is the safer fallback if a glyph boxes out.",
      "Copy, then paste into a bio or nick. Discord messages can use **markdown** instead—this Unicode is for fields with no formatting.",
    ],
    usesHeading: "Fields that cannot do real bold",
    uses: [
      "Discord nicknames and server titles",
      "Instagram and TikTok bios",
      "WhatsApp status lines and group names",
      "Captions where you want emphasis without real bold formatting",
      "Gaming tags and profile CTAs",
    ],
    compatHeading: "What usually survives paste",
    compatibilityNotes: [
      "Bold Unicode works in most modern apps and browsers.",
      "Some older devices may show boxes for rare characters—try sans bold as a fallback.",
      "Username fields may reject squared or fraktur symbols—test before locking a handle.",
    ],
    extraSections: [
      {
        id: "bold-copy-paste",
        heading: "Bold copy and paste, not a font download",
        paragraphs: [
          "A bold text generator (also searched as bold font generator or bold font style) swaps each letter for Mathematical Bold Unicode. You copy the result and paste it. Nothing installs, and Discord / Instagram still draw the characters in their own typeface.",
          "In a Discord message you can type **bold** markdown instead. Use this Unicode when the field has no bold button: nicknames, Instagram bios, group names, and captions.",
        ],
        bullets: [
          "Sans bold is the safest fallback if a glyph boxes out.",
          "Keep @usernames in plain letters so people can find you.",
          "Style a short word, not a whole paragraph—screen readers and search prefer ordinary text.",
        ],
      },
    ],
    faq: [
      {
        question: "What is a bold text generator?",
        answer:
          "A bold text generator swaps letters for Mathematical Bold Unicode. The weight travels with the text. Discord chats can use **markdown** instead; this is for bios and nicks with no bold button.",
      },
      {
        question: "Sans bold or mathematical bold?",
        answer:
          "Mathematical bold looks a bit more serif. Sans bold is cleaner and often renders more reliably on phones. Start there if you saw boxes.",
      },
      {
        question: "Will Instagram show it in a bio?",
        answer:
          "Usually. There is no bold button in the bio field, so Unicode is the workaround. Keep the @username plain.",
      },
      {
        question: "Does this hurt search?",
        answer:
          "In-app search prefers ordinary letters. Style a display line; keep keywords in normal type.",
      },
      {
        question: "Is this the same as bold copy paste or a bold font generator?",
        answer:
          "Yes—same tool. Bold copy paste, bold font generator, and bold font style all mean Unicode letters you copy. There is no TTF to download.",
      },
    ],
  }),
  spoke("italic-text-generator", "italic", ["italic", "sans-italic", "bold-italic", "cursive"], {
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
        name: "Sans-serif italic",
        styleId: "sans-italic",
        blurb: "A cleaner slant without serifs—often easier to read in bios.",
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
    howToHeading: "Slant a quote when the app has no italic",
    howToSteps: [
      "Type the quote or soft bio line.",
      "Copy the italic preview. Cursive is a different, more handwritten Unicode set—do not mix them up.",
      "Paste into a bio or caption. Long italic strings clip in username fields.",
    ],
    usesHeading: "Quotes and soft emphasis",
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
          "It turns plain letters into Unicode italic so a quote can look slanted in apps with no italic button. Cursive/script is a different, more handwritten Unicode set.",
      },
      {
        question: "Is italic the same as cursive?",
        answer:
          "No. Italic is slanted mathematical letters. Cursive/script is a different Unicode block with more handwritten curves. Use the cursive generator for script names.",
      },
      {
        question: "Will Instagram keep the slant?",
        answer:
          "Usually in bios and captions. It works because Instagram reads the characters, not an italic toggle.",
      },
      {
        question: "Can I combine italic with bold?",
        answer:
          "Use the bold-italic chip for both weight and slant in one string.",
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
    howToHeading: "Circle each letter",
    howToSteps: [
      "Type a short word. Circled letters eat width fast.",
      "Copy the bubble row, or squared if you want boxes instead of circles.",
      "Paste into a nick or bio and check it still fits.",
    ],
    usesHeading: "Short playful tags",
    examplesHeading: "Circled samples",
    uses: [
      "Playful Discord and Roblox-style usernames",
      "Fun Instagram or TikTok bios",
      "Bubble letter titles for aesthetic posts",
    ],
    compatibilityNotes: [
      "Bubble letters work best for short names and headlines.",
      "Digits use circled number Unicode; some platforms limit mixed symbols in usernames.",
    ],
    difference: {
      heading: "This page is the circled-letter tool, not the cute collection",
      body: "Bubble text here is enclosed alphanumerics—letters and digits inside circles. Cute fonts mix bubble with squared, hearts, and parenthesized kawaii extras. Aesthetic fonts are wide fullwidth/script. Stylish text is bold/glitch. Use this URL for “bubble letters / circle text,” not for aesthetic or stylish queries.",
    },
    faq: [
      {
        question: "What is a bubble text generator?",
        answer:
          "A bubble text generator makes Unicode enclosed alphanumerics—letters and digits inside circles. Not a rounded font file.",
      },
      {
        question: "What is bubble text?",
        answer:
          "Bubble text is those circled letters and numbers. Same tool as the bubble text generator on this page.",
      },
      {
        question: "Do numbers work?",
        answer:
          "Digits 0–9 map to circled number characters where the device font includes them.",
      },
      {
        question: "Cute fonts vs this page?",
        answer:
          "This generator is circled letters only. Cute fonts add squared, hearts, and parenthesized kawaii extras. Aesthetic fonts are soft fullwidth and script.",
      },
      {
        question: "Why is a letter missing a circle?",
        answer:
          "Not every letter has a perfect circled twin on every device. Keep names short and test on the app you care about.",
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
      howToHeading: "Draw a line through each letter",
      howToSteps: [
        "Type the text you want crossed out.",
        "The generator adds a Unicode combining strikethrough mark to each character.",
        "Copy and paste into chats, bios, or posts.",
      ],
      uses: [
        "Joke posts and meme captions",
        "Showing old vs new text in bios",
        "Light spoiler or “done” styling in messages",
        "Sale prices with the old amount visibly crossed out",
      ],
      compatibilityNotes: [
        "Combining marks depend on app support—works in many modern messengers.",
        "Very dense strikethrough on long paragraphs can look cluttered on small screens.",
        "Discord messages have native ~~markdown~~ strikethrough; Unicode strikethrough is for nicknames and apps without markdown.",
        "Underline uses a separate combining mark in the second chip—do not stack both on the same word unless you want a messy overlay.",
      ],
      difference: {
        heading: "Unicode strikethrough, not Discord markdown",
        body: "This tool draws a line through each letter with combining marks, so it works anywhere Unicode paste is allowed—including display names. Discord chat already supports ~~strikethrough~~ markdown; use that in messages and this generator when you need crossed-out text outside markdown fields.",
      },
      faq: [
      {
        question: "What is a strikethrough text generator?",
        answer:
          "A strikethrough text generator adds a Unicode combining long stroke overlay to each letter. The base letter stays readable with a line through it.",
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
      {
        question: "Can I underline instead of cross out?",
        answer:
          "Yes. Switch to the underline chip to add a combining underline mark. It uses the same paste-anywhere Unicode approach as strikethrough.",
      },
    ],
    },
  ),
  spoke(
    "small-caps-text-generator",
    "small-caps",
    ["small-caps", "sans-bold", "monospace", "fullwidth"],
    {
      sampleInput: "small caps",
      examples: [
        "small caps",
        "now playing",
        "read more",
        "coming soon",
        "photography",
        "link in bio",
      ],
      howToHeading: "Turn letters into short capitals",
      howToSteps: [
        "Type your text—capitals and lowercase both come out as small capitals.",
        "Check the preview for the letter x, which Unicode has no small-capital form for.",
        "Copy and paste into a bio, display name, or caption.",
      ],
      usesHeading: "Quiet labels, not tiny superscript",
      uses: [
        "Quiet section labels in a bio, where full caps would feel like shouting",
        "Display names that need emphasis without looking aggressive",
        "Menu-style or editorial captions",
      ],
      compatHeading: "The letter x problem, and other gaps",
      compatibilityNotes: [
        "There is no small capital X in Unicode, so x stays a normal lowercase x. In a word like “box” the mismatch is visible—that is the font, not a bug in the tool.",
        "Q uses ǫ (o with ogonek) as a stand-in. A true small capital Q exists but was only added in Unicode 11, so it is still missing on many older phones.",
        "F and S come from a later Unicode block than the other letters and can render slightly differently in some fonts.",
        "These are phonetic letters, not a typeface, so search and @-mentions will not match them against plain text.",
        "This is not tiny superscript for bios and not math H₂O subscripts. Those are the small text generator and the superscript/subscript generator.",
      ],
      difference: {
        heading: "Small caps are short capitals, not tiny bios",
        body: "Small caps replace letters with short-capital Unicode (ꜱᴍᴀʟʟ ᴄᴀᴘꜱ). They stay roughly normal x-height. The small text generator makes compact superscript-style bios. The superscript & subscript generator raises or lowers characters for math and footnotes. Use this page only when you want small capitals.",
      },
      extraSections: [
        {
          id: "small-caps-how",
          heading: "How a small caps fonts generator works",
          paragraphs: [
            "This small caps fonts generator maps A–Z to phonetic small-capital letters. It is copy and paste—not a downloadable small-caps typeface. Words with x will always look slightly uneven because Unicode has no small capital X.",
          ],
          bullets: [
            "Good for quiet bio labels and display names that should not shout.",
            "Not tiny superscript bios and not math H₂O subscripts.",
            "Usernames still want plain letters; paste small caps in the display name instead.",
          ],
        },
      ],
      faq: [
        {
          question: "What is a small caps generator?",
          answer:
            "A small caps generator turns letters into short-capital Unicode (ꜱᴍᴀʟʟ ᴄᴀᴘꜱ) at normal reading size. It is not tiny superscript bios and not math subscripts.",
        },
        {
          question: "Why is the letter x not in small caps?",
          answer:
            "Unicode never encoded a small capital X. The small-capital letters come mostly from the phonetic alphabet, which had no use for one, so every small caps generator on the web falls back to a normal lowercase x. Words containing x will always look slightly uneven.",
        },
        {
          question: "Is small caps the same as small text or subscript?",
          answer:
            "No. Small caps are short capital letters at normal reading size. Small text is tiny superscript-style bios. Subscript/superscript is for math and chemistry (H₂O, x²). Open those other two tools when that is the job.",
        },
        {
          question: "Does small caps work on Instagram and TikTok?",
          answer:
            "Yes, in bios, captions and display names on both. It is one of the more widely supported styles because the characters are old and well covered by system fonts. Usernames are a different matter—those are restricted to plain characters.",
        },
        {
          question: "Can screen readers read small caps?",
          answer:
            "Better than most styled text. NVDA 2025.1 normalizes them to ordinary letters for speech by default. Other screen readers may read them as phonetic characters, so keep the meaningful words in plain text. See our screen reader guide for the full picture.",
        },
        {
          question: "Why do some letters look different from the others?",
          answer:
            "The set was assembled from several Unicode blocks over many years rather than designed as one font. F, S and Q in particular come from different additions, so a font may style them inconsistently.",
        },
      ],
    },
  ),
  spoke(
    "monospace-text-generator",
    "monospace",
    ["monospace", "small-caps", "fullwidth", "double-struck"],
    {
      sampleInput: "monospace",
      examples: [
        "monospace",
        "SYSTEM ONLINE",
        "hello world",
        "01 02 03",
        "terminal",
        "loading...",
      ],
      howToHeading: "Get typewriter letters (not a code block)",
      howToSteps: [
        "Type your text, including numbers—monospace covers digits as well as letters.",
        "Copy the preview.",
        "Paste anywhere that will not let you set a real font, such as a bio or display name.",
      ],
      uses: [
        "Typewriter or terminal aesthetics in a bio",
        "Retro and coding-adjacent display names",
        "Short lines where every character occupying the same width looks deliberate",
      ],
      compatibilityNotes: [
        "Discord and Slack may re-render this inside their own code formatting, which can override the look you copied.",
        "Fixed-width only holds if the receiving app uses a font that respects it. In a proportional font the spacing advantage largely disappears.",
        "Digits are included, unlike several other styles, so times and numbers stay consistent.",
        "This is not a code block. If you want real monospaced code on a platform that supports it, use that platform's code formatting instead—it stays searchable and copyable.",
      ],
      faq: [
        {
          question: "What is a monospace text generator?",
          answer:
            "A monospace text generator swaps letters for fixed-width Unicode so a bio or display name can look typewritten. It is not a code block.",
        },
        {
          question: "Is this the same as a code block?",
          answer:
            "No. A code block is formatting applied to ordinary letters; this swaps each letter for a separate Unicode character that happens to look monospaced. Use a real code block for code—it stays searchable, selectable and readable by screen readers.",
        },
        {
          question: "Why does my monospace text change in Discord?",
          answer:
            "Discord applies its own formatting to text it treats as code, which can re-render the characters in its own monospaced font. The characters are still there; the display is being overridden. It usually holds in nicknames.",
        },
        {
          question: "Does monospace include numbers?",
          answer:
            "Yes. Letters and digits 0–9 all have monospace forms, which is not true of every style here. That makes it a reasonable pick for dates, scores, or countdowns in a bio.",
        },
        {
          question: "Will monospace letters actually line up in columns?",
          answer:
            "Only if the app renders them in a font that honours the fixed width. Many social apps substitute a fallback font for these characters, so treat the alignment as a bonus rather than something to rely on.",
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
      howToHeading: "Raise or lower characters for H₂O and x²",
      howToSteps: [
        "Type text with letters and numbers (e.g. H2O or x2).",
        "Copy the superscript preview for raised text, or use the subscript row below for lowered text.",
        "Paste into notes, math captions, or footnote-style social posts.",
      ],
      usesHeading: "Math and footnotes, not tiny bios",
      uses: [
        "Chemistry-style notation (H₂O) in captions",
        "Math exponents and footnote markers",
        "Not whole-word tiny bios (use the small text generator) and not small capitals (use small caps)",
      ],
      compatibilityNotes: [
        "Superscript has more letter coverage than subscript in Unicode.",
        "Complex formulas may need plain text for accessibility.",
      ],
      difference: {
        heading: "Math/footnote positions, not a tiny-bio font",
        body: "This tool raises (superscript) or lowers (subscript) supported characters for H₂O, x², and footnotes. It is not the small text generator (whole words in tiny type for bios) and not small caps (short capitals at normal size). If your query is “tiny text for Instagram,” go to small text. If you want ꜱᴍᴀʟʟ ᴄᴀᴘꜱ, use the small caps generator.",
      },
      faq: [
        {
          question: "What is a superscript and subscript generator?",
          answer:
            "It converts supported characters into raised Unicode superscript or lowered subscript forms—useful for chemistry, math, and footnote-style text. It is not a small-text bio font.",
        },
        {
          question: "Can I make superscript text online?",
          answer:
            "Yes. The superscript preview raises digits and many letters. Copy it directly—no keyboard shortcuts needed.",
        },
        {
          question: "Is this the same as a small text generator or small caps?",
          answer:
            "No. This page is for math and chemistry-style H₂O and x². The small text generator is for tiny bios and tags. Small caps are short capitals at normal size, not raised or lowered digits.",
        },
        {
          question: "Does every letter have a superscript or subscript twin?",
          answer:
            "No. Digits and common letters work in most apps; some letters have no superscript or subscript form and stay plain.",
        },
      ],
    },
  ),
  spoke("upside-down-text-generator", "upside-down", ["upside-down"], {
    sampleInput: "flip me",
    examples: ["flip me", "hello", "lol", "reverse"],
    howToHeading: "Flip the letters upside down",
    howToSteps: [
      "Type the phrase you want flipped.",
      "The generator reverses character order and maps to upside-down Unicode.",
      "Copy the flipped result and paste into chats or bios.",
    ],
    uses: [
      "Funny messages and meme captions",
      "Reverse jokes in Discord or WhatsApp",
      "Novelty social bios",
      "Puzzle captions where readers turn their phone upside down",
    ],
    compatibilityNotes: [
      "Not every letter has a perfect upside-down mirror.",
      "Punctuation may flip oddly—that is normal for Unicode flip tools.",
      "This page rotates glyphs and reverses order. The mirror text generator only reverses letter order without rotating shapes.",
      "Long flipped strings can be hard to read on narrow screens—keep jokes to one short line.",
    ],
    difference: {
      heading: "Upside-down glyphs, not just backwards spelling",
      body: "Upside-down text maps letters to inverted Unicode symbols and reverses the string so it reads flipped. The mirror text generator only reverses order (hello → olleh) without rotating each character. Use this URL for “flip text upside down”; use mirror when you only want backwards spelling.",
    },
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
        question: "Upside down vs mirror text?",
        answer:
          "Upside-down flips glyph shapes and reverses order. Mirror text only reverses order with normal letters. Both are on this site as separate tools when you need one effect without the other.",
      },
    ],
  }),
  spoke("glitch-text-generator", "glitch", ["glitch"], {
    sampleInput: "glitch",
    examples: ["glitch", "cursed", "zalgo", "error"],
    howToHeading: "Stack combining marks (keep it short)",
    howToSteps: [
      "Enter the text you want to distort.",
      "Preview the Zalgo-style glitch output with combining marks.",
      "Copy and paste into Discord, usernames, or horror-aesthetic posts.",
    ],
    uses: [
      "Horror / creepypasta aesthetic usernames",
      "Meme and glitch-art captions",
      "Novelty Discord nicknames (where allowed)",
      "Short horror-game or ARG-style status lines",
    ],
    compatibilityNotes: [
      "Heavy glitch text can break layout in some apps—use shorter strings.",
      "Screen readers may struggle with dense combining marks; avoid for important info.",
      "This is not the stylish text generator: that page mixes bold, italic, and glitch in a gallery. Here every character is mark-heavy Zalgo output.",
      "Platforms with strict moderation may reject extreme nicknames—test a short version before committing.",
    ],
    difference: {
      heading: "Zalgo combining marks, not a bold font swap",
      body: "Glitch text stacks Unicode combining diacritical marks above and below each letter. Stylish text and bold generators replace letters with mathematical alphanumeric symbols. If you want readable bold with a glitch option in one gallery, use stylish text; use this page when the whole string should look corrupted.",
    },
    faq: [
      {
        question: "What is a glitch text generator?",
        answer:
          "A glitch text generator stacks Unicode combining diacritical marks above and below letters to create a corrupted Zalgo / cursed effect.",
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
      {
        question: "Glitch vs stylish text?",
        answer:
          "Stylish text is a multi-style gallery (bold, italic, glitch as one chip). This generator applies Zalgo-style marks to the whole input by default—better when every letter should look cursed.",
      },
    ],
  }),
  spoke("small-text-generator", "tiny", ["tiny", "superscript", "small-caps", "subscript"], {
    sampleInput: "small text",
    examples: ["small text", "tiny bio", "mini caption", "footnote"],
    showGallery: true,
    variants: [
      {
        name: "Tiny superscript",
        styleId: "tiny",
        blurb: "Raised small letters for compact tags and bios.",
      },
      {
        name: "Superscript numbers",
        styleId: "superscript",
        blurb: "Best when you need x² / footnotes rather than a whole bio.",
      },
      {
        name: "Small caps",
        styleId: "small-caps",
        blurb: "Short, even-height letters—more readable than tiny superscript.",
      },
    ],
    howToHeading: "Shrink a bio line, not a math formula",
    howToSteps: [
      "Type a short word or bio line.",
      "Copy the tiny row for superscript-style small text, or small caps if you need it more readable.",
      "Paste into a bio, nickname, or caption. Keep it short—tiny letters are hard to read in long sentences.",
    ],
    usesHeading: "Compact tags, with a readable fallback",
    examplesHeading: "Tiny samples",
    uses: [
      "Compact Instagram and TikTok bio lines",
      "Tiny Discord nicknames and tags",
      "Footnote-style captions next to a normal sentence",
    ],
    compatibilityNotes: [
      "Not every letter has a superscript twin (Q is a common miss). Small caps covers more of the alphabet.",
      "This page is for tiny display text. Use the superscript & subscript generator for chemistry-style H₂O. Use small caps when you want short capitals at normal size—not tiny letters.",
    ],
    difference: {
      heading: "Tiny bios, not math subscripts and not small caps",
      body: "Small text here is a compact bio style: mostly superscript letters, with small caps as a more readable fallback when a glyph is missing. It is not the superscript & subscript generator (H₂O, x², footnotes) and it is not the small caps generator (ꜱᴍᴀʟʟ ᴄᴀᴘꜱ at normal reading size). Three tools, three mechanics.",
    },
    faq: [
      {
        question: "What is a small text generator?",
        answer:
          "A small text generator turns normal letters into tiny Unicode (mostly superscript) so you can paste compact text into bios and usernames. It is not a smaller installed font.",
      },
      {
        question: "Is small text the same as superscript or small caps?",
        answer:
          "Tiny bios usually use superscript letters, which is why a small-caps fallback exists here when a letter is missing. The superscript & subscript tool is aimed at math and chemistry, not a whole bio. Small caps are short capitals at normal size—use that generator when you want ꜱᴍᴀʟʟ ᴄᴀᴘꜱ, not microscopic type.",
      },
      {
        question: "Why are some tiny letters missing?",
        answer:
          "Unicode does not have a superscript Q and a few other glyphs. Switch to small caps for a full alphabet.",
      },
      {
        question: "Can I use small text in an Instagram bio?",
        answer:
          "Yes for a short line. Tiny letters still count toward the 150-character limit and can be hard to read—keep the important words in normal type.",
      },
    ],
  }),
  spoke("mirror-text-generator", "mirror", ["mirror", "upside-down"], {
    sampleInput: "mirror",
    examples: ["mirror", "hello", "backwards", "secret"],
    showGallery: true,
    variants: [
      {
        name: "Reverse / mirror order",
        styleId: "mirror",
        blurb: "Flips the letter order: hello becomes olleh.",
      },
      {
        name: "Upside down",
        styleId: "upside-down",
        blurb: "Flips and rotates letters. Different from a simple reverse.",
      },
    ],
    howToHeading: "Reverse the letter order",
    howToSteps: [
      "Type the word you want reversed.",
      "Copy the mirror row for backwards order, or upside-down if you want flipped glyphs too.",
      "Paste into a chat or bio. Read it in a mirror or from the end of the string.",
    ],
    uses: [
      "Novelty Discord messages and memes",
      "Backwards usernames where the platform allows it",
      "Puzzle or “secret” captions",
    ],
    compatibilityNotes: [
      "Reverse text is plain letters, so it works almost everywhere.",
      "Upside-down uses special Unicode and may box out on older phones.",
      "Pick mirror when you only need backwards spelling; pick upside-down when the joke depends on rotated glyphs.",
      "Very long reversed sentences are still readable but annoying—one or two words land best in usernames.",
    ],
    difference: {
      heading: "Backwards order with an upside-down option in the gallery",
      body: "Mirror text reverses character order using normal letters (hello → olleh). The dedicated upside-down text generator rotates glyphs and reverses the string. This page is the hub for both: copy the mirror row for simple reverse, or the upside-down row when you want flipped shapes.",
    },
    faq: [
      {
        question: "What is a mirror text generator?",
        answer:
          "A mirror text generator reverses the order of your characters so the word reads backwards. That is different from upside-down text, which also swaps in flipped Unicode letters.",
      },
      {
        question: "Is mirror text the same as upside down text?",
        answer:
          "No. Mirror/reverse keeps the same letters in reverse order. Upside-down maps each letter to a rotated look-alike and usually reverses as well.",
      },
      {
        question: "Will backwards text work on Instagram?",
        answer:
          "Yes—it is still normal A–Z. People can copy it. It is just hard to read on purpose.",
      },
      {
        question: "Can I mirror a whole sentence?",
        answer:
          "You can, but long reversed sentences are painful to type replies to. Keep it to a word or a short joke.",
      },
    ],
  }),
  spoke(
    "old-english-text-generator",
    "fraktur",
    ["fraktur", "bold-fraktur"],
    {
      sampleInput: "Old English",
      examples: ["Old English", "Gothic", "Clan Name", "Ye Olde"],
      showGallery: true,
      variants: [
        {
          name: "Fraktur / gothic",
          styleId: "fraktur",
          blurb: "Classic blackletter Unicode for titles and usernames.",
        },
        {
          name: "Bold old English",
          styleId: "bold-fraktur",
          blurb: "Heavier blackletter for short display names.",
        },
      ],
      howToHeading: "Map letters to blackletter Unicode",
      howToSteps: [
        "Type a short name or title.",
        "Copy fraktur for a classic gothic look, or bold old English for extra weight.",
        "Paste into a bio or username and check it on your phone—blackletter is ornate.",
      ],
      uses: [
        "Gaming clan tags and gothic usernames",
        "Halloween and metal-aesthetic bios",
        "Titles where a medieval look is the point",
      ],
      compatibilityNotes: [
        "Fraktur is less compatible than bold or sans bold. Test before locking a username.",
        "Keep old English text short. Long blackletter paragraphs are hard to read and may fail filters.",
      ],
      faq: [
        {
          question: "What is an old English text generator?",
          answer:
            "It maps your letters to Unicode Fraktur (blackletter) characters that look like gothic / medieval type. You copy them—no font file to install.",
        },
        {
          question: "Is old English the same as gothic or Fraktur?",
          answer:
            "On this site, yes: Unicode blackletter. It is not a medieval TTF you install, and it is not mathematical bold.",
        },
        {
          question: "Can I use old English fonts on Discord?",
          answer:
            "Often in nicknames and messages. Some servers or mobile fonts will show empty boxes—keep a sans-bold backup.",
        },
        {
          question: "Why not put old English on the bold page?",
          answer:
            "Bold is mathematical bold. Old English is a different Unicode block with a different look and worse compatibility. It needs its own tool.",
        },
      ],
    },
  ),
  spoke("binary-text-generator", "binary", ["binary", "morse", "monospace", "fullwidth"], {
    sampleInput: "Hello",
    examples: ["Hello", "Code", "Hack", "UTF-8"],
    showGallery: true,
    howToHeading: "Encode as UTF-8 bits (or Morse)",
    howToSteps: [
      "Type plain text in the box.",
      "Copy Binary for UTF-8 bit groups, or Morse for dit-dah sequences.",
      "Paste into homework, Discord, or a geeky bio line.",
    ],
    uses: [
      "CS homework and UTF-8 demos",
      "Hacker-aesthetic bios and Discord status",
      "Morse novelty messages",
    ],
    compatibilityNotes: [
      "Binary and Morse are plain ASCII — they work everywhere.",
      "This is encoding, not a font. Pair with monospace if you want a code look on the original letters.",
    ],
    faq: [
      {
        question: "What is a binary text generator?",
        answer:
          "It encodes your text as UTF-8 bytes shown as 8-bit binary groups you can copy and paste.",
      },
      {
        question: "Can I decode binary back to text?",
        answer:
          "This page focuses on encode-for-copy. For decode, paste binary into a UTF-8 binary decoder or a programming console.",
      },
      {
        question: "Is Morse complete for every character?",
        answer:
          "Letters, digits, and spaces are mapped. Punctuation may stay as the original character (partial map).",
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
