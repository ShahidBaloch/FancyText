import type { PageEntry } from "@/data/pages/registry";
import { getPageByUrl } from "@/data/pages/registry";
import { COOL_PAGE_STYLE_IDS } from "@/lib/fonts/styles";

export type CollectionConfig = {
  slug: string;
  /** Empty = show all registered styles. */
  styleIds: string[];
  initialText: string;
  presets?: string[];
  /** Show live gallery before hub cards (competitor-style “fonts first”). */
  contentOrder?: "gallery-first" | "cards-first";
  howToSteps: string[];
  uses: string[];
  taxonomy?: { label: string; href: string }[];
  /** Optional H2 buckets (aesthetic / cute / cool…). */
  buckets?: { heading: string; body: string; href?: string }[];
  /** Collections-first hub cards (copy-paste fonts). Rendered before the gallery. */
  hubCards?: { title: string; body: string; href: string }[];
  galleryHeading?: string;
  galleryLead?: string;
  howToHeading?: string;
  usesHeading?: string;
  mobileHeading?: string;
  mobileHowTo?: string;
  hubHeading?: string;
  hubLead?: string;
  taxonomyHeading?: string;
  howToName?: string;
  /** Unique positioning vs overlapping collections. */
  difference?: { heading: string; body: string };
  extraSections?: {
    id: string;
    heading: string;
    paragraphs?: string[];
    bullets?: string[];
  }[];
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
  collection(
    "copy-paste-fonts",
    [
      "bold",
      "sans-bold",
      "cursive",
      "italic",
      "bubble",
      "small-caps",
      "fullwidth",
      "fraktur",
    ],
    {
      initialText: "copy paste",
      presets: ["copy paste", "Instagram Bio", "Discord Name", "username"],
      contentOrder: "gallery-first",
      galleryHeading: "Copy and paste fonts — live preview",
      galleryLead:
        "Type or pick a preset, then copy bold, cursive, italic, or bubble Unicode—font copy and paste without installing anything. This sample grid is the fast path; the homepage has every style with search. Cherokee / Japanese lookalikes stay on cool text.",
      hubHeading: "Font collections (when you know the vibe)",
      hubLead:
        "Each card opens a filtered page. Bookmark this hub for “fonts copy paste” browsing; use the grid above when you want copy paste fonts immediately.",
      howToHeading: "How to pick a collection",
      howToName: "How to pick a copy-and-paste font collection",
      howToSteps: [
        "Decide the job: a vibe (aesthetic / cute / stylish), a lookalike clan tag (cool text), a script alphabet (cursive), an app’s name field, or a huge ASCII banner.",
        "Open that card. You get a filtered grid, not the same dump of every style.",
        "Copy from that page. Come back here when you want a different category.",
      ],
      mobileHeading: "On a phone",
      mobileHowTo:
        "Tap a collection card first (Cool, aesthetic, cute, cursive, Instagram, or Big Text). Copy there, then long-press Paste in the app. You are not installing a font file.",
      usesHeading: "When this hub is the right bookmark",
      uses: [
        "You want a catalog of styles, not a how-to converter",
        "You are sending someone a link for “fonts you can paste”",
        "You already know the vibe and do not want to scroll the full homepage set",
      ],
      taxonomyHeading: "Jump to a filtered page",
      hubCards: [
        {
          title: "Cool text / lookalikes",
          body: "Cherokee, Japanese, CJK, fat, and letterlike letters. Owns “cool text” and “cool fonts.” Not for most @handles.",
          href: "/cool-text-generator/",
        },
        {
          title: "Aesthetic fonts",
          body: "Soft fullwidth, script, and delicate small caps—vaporwave / dreamy bios, not kawaii bubbles.",
          href: "/aesthetic-fonts/",
        },
        {
          title: "Cute fonts",
          body: "Bubble, squared, hearts, and parenthesized kawaii letters. Not aesthetic fullwidth.",
          href: "/cute-fonts/",
        },
        {
          title: "Cursive / script",
          body: "Handwritten Unicode script plus the A–Z alphabet. The cursive hub, not this index.",
          href: "/cursive-text-generator/",
        },
        {
          title: "Stylish / graphic",
          body: "Bold, italic, glitch, and high-contrast rows—not cute and not soft aesthetic.",
          href: "/stylish-text-generator/",
        },
        {
          title: "Instagram & platforms",
          body: "Field-aware generators for Instagram, Discord, TikTok, WhatsApp, and more.",
          href: "/instagram-font-generator/",
        },
        {
          title: "Big ASCII text",
          body: "Huge banner letters for Discord and comments. Not Unicode bio fonts.",
          href: "/big-text-generator/",
        },
        {
          title: "Name / username fonts",
          body: "Short username-safer sans, script, and small caps. Cool lookalikes stay on Cool.",
          href: "/name-font-generator/",
        },
      ],
      taxonomy: [
        { label: "Fancy text generator (home)", href: "/" },
        { label: "Aesthetic fonts", href: "/aesthetic-fonts/" },
        { label: "Cute fonts", href: "/cute-fonts/" },
        { label: "Cool text", href: "/cool-text-generator/" },
        { label: "Cursive text", href: "/cursive-text-generator/" },
        { label: "Stylish text", href: "/stylish-text-generator/" },
        { label: "Bubble letters", href: "/bubble-text-generator/" },
        { label: "Name fonts", href: "/name-font-generator/" },
        { label: "Instagram fonts", href: "/instagram-font-generator/" },
        { label: "Discord fonts", href: "/discord-font-generator/" },
        { label: "Big text (ASCII)", href: "/big-text-generator/" },
        { label: "WhatsApp fonts", href: "/whatsapp-fonts/" },
        { label: "Cool symbols", href: "/cool-symbols/" },
      ],
      difference: {
        heading: "A catalog, not a second fancy text generator",
        body: "Home is the converter: type once, preview every Unicode style, copy. This page is the index of collections. Cool for lookalikes, aesthetic for soft fullwidth/script, cute for kawaii bubbles, cursive for script alphabets, platform tools for Instagram or Discord field rules, Big Text for ASCII banners. If you want the full live grid, go home.",
      },
      buckets: [
        {
          heading: "Cool lookalikes (not this sample grid)",
          body: "Japanese, Cherokee, fat, squared, and letterlike mappings. Unicode, not a TTF download. That is why the cool text generator exists—do not hunt those letters here.",
          href: "/cool-text-generator/",
        },
        {
          heading: "Soft vs kawaii vs graphic",
          body: "Aesthetic is wide and script. Cute is bubble and kawaii extras. Stylish is bold, glitch, and high contrast. Open the matching collection instead of mixing all three on one page.",
          href: "/aesthetic-fonts/",
        },
        {
          heading: "When the app is the problem",
          body: "Instagram bios, Discord nicknames, TikTok captions, and WhatsApp status have different limits. Use a platform tool when the field rules matter more than the vibe.",
          href: "/instagram-font-generator/",
        },
        {
          heading: "Huge letters vs paste-able letters",
          body: "Discord banners are ASCII art on the big text generator. Copy-paste fonts here are still normal-size Unicode you drop into a bio.",
          href: "/big-text-generator/",
        },
      ],
      faq: [
        {
          question: "What are copy and paste fonts?",
          answer:
            "Styled Unicode characters—not a downloadable TTF. You copy the symbols and paste them into apps that accept them. This page lists those collections; it is not a second homepage gallery.",
        },
        {
          question: "Should I stay here or go to the homepage converter?",
          answer:
            "Stay here if you want a catalog (aesthetic, cute, cool, platforms). Go home if you want to type one phrase and see every live style, including search and favorites.",
        },
        {
          question: "I searched “cool fonts copy paste.” Where do I go?",
          answer:
            "The cool text generator. This hub only points there so those lookalikes do not compete with the fancy-text homepage.",
        },
        {
          question: "Do I install anything?",
          answer:
            "No. The look travels with the characters you paste.",
        },
        {
          question: "Which card should I open first?",
          answer:
            "Vibe → aesthetic, cute, or stylish. Clan-tag lookalikes → cool text. Script alphabet → cursive. A social app’s name or bio → that platform generator. Huge letters → big text.",
        },
        {
          question: "Font copy and paste — is this the right page?",
          answer:
            "Yes. Copy and paste fonts, font copy and paste, and fonts copy paste all mean Unicode you copy from a preview. Use the live grid at the top, or open a collection card for a filtered set.",
        },
        {
          question: "Fonts copy and paste vs fancy text generator?",
          answer:
            "Same Unicode trick. Home is the full converter with every row. This URL is the catalog plus a classic sample grid for people who searched “copy paste fonts” and want one-tap copies.",
        },
      ],
      extraSections: [
        {
          id: "copy-paste-phrases",
          heading: "Common searches that land here",
          paragraphs: [
            "People type copy and paste fonts, font copy and paste, fonts copy paste, copy paste fonts, and fonts copy and paste for the same workflow: preview styled letters, tap Copy, paste into Instagram, Discord, TikTok, or WhatsApp.",
            "Nothing here downloads a TTF. If an app shows boxes, switch to bold, sans bold, or bubble in the grid—those glyphs survive more filters than Fraktur or fullwidth.",
          ],
          bullets: [
            "copy and paste fonts → live grid + collections below",
            "font copy and paste → same tool; try preset “copy paste”",
            "cool fonts copy paste → cool text generator (lookalikes)",
          ],
        },
      ],
    },
  ),
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
        "Type the caption or username you actually want to publish—not a paragraph.",
        "Look for fullwidth spacing, script, and quiet small caps. Skip bubble and glitch; those live on other pages.",
        "Copy the row that still reads on a phone, then paste into the bio.",
      ],
      usesHeading: "Where a dreamy line fits",
      uses: [
        "Instagram and TikTok bios that want space between letters",
        "Quote posts that should feel soft, not shouty",
        "A display name with a little width, if the field allows Unicode",
      ],
      difference: {
        heading: "Soft and wide, not cute bubbles",
        body: "This set is fullwidth spacing, script, and delicate small caps (dreamy / vaporwave bios). Cute fonts are bubble and kawaii extras. Stylish text is bold, italic, and glitch. Cool text is Cherokee, Japanese, and fat lookalikes. Circled letters as a standalone tool live on the bubble generator.",
      },
      faq: [
        {
          question: "What are aesthetic fonts?",
          answer:
            "Wide fullwidth letters, script, and quiet small caps. The point is space and softness, not circled bubbles or heavy bold.",
        },
        {
          question: "Will Instagram keep the extra spacing?",
          answer:
            "Fullwidth characters are real letters, so the gaps usually survive a bio paste. They still count toward the 150-character limit—wide styles run out of room fast.",
        },
        {
          question: "I wanted cute bubble letters. Wrong page?",
          answer:
            "Yes. Open cute fonts (or the bubble generator if you only want circled A–Z). This URL is the soft/wide set.",
        },
        {
          question: "Why does fullwidth look huge on TikTok?",
          answer:
            "TikTok bios are only 80 characters, and fullwidth glyphs are visually wide. Use a short word, or switch to script / small caps.",
        },
      ],
    },
  ),
  collection(
    "cute-fonts",
    ["bubble", "squared", "hearts", "parenthesized"],
    {
      initialText: "cute",
      presets: ["cute", "kawaii", "hello", "sweet"],
      howToSteps: [
        "Type a short name or hello—circled letters get wide fast.",
        "Choose bubble, squared caps, hearts, or parenthesized glyphs. Fullwidth script is on aesthetic fonts, not here.",
        "Copy one row. Paste into Discord or Instagram and check it still fits the field.",
      ],
      usesHeading: "Playful names, not vaporwave bios",
      uses: [
        "Kawaii Discord nicknames and group-chat titles",
        "A single cute word in an Instagram or TikTok bio",
        "Roblox-style display names if the filter lets the circles through",
      ],
      difference: {
        heading: "Kawaii extras, not aesthetic fullwidth",
        body: "Cute fonts here are circled bubble letters, squared caps, heart letters, and parenthesized glyphs. Soft wide script lives on aesthetic fonts. Cool lookalikes live on the cool text generator. High-contrast bold and glitch live on stylish text. Circled letters as a dedicated converter live on the bubble text generator.",
      },
      extraSections: [
        {
          id: "kawaii-writing",
          heading: "Kawaii fonts, letters, and writing to copy",
          paragraphs: [
            "Cute kawaii fonts copy and paste as Unicode—bubble, squared, hearts, and parenthesized glyphs. That is different from kaomoji (punctuation faces such as (´・ω・`)). Use this page when you want kawaii letters or kawaii writing for a name. Open the kaomoji hub when you want a face, not a font.",
          ],
          bullets: [
            "Keep the word short: circled letters get wide fast in Discord nicks and Instagram bios.",
            "If a circle boxes out, try squared caps or a shorter bubble word.",
            "Leave @usernames in plain letters so people can still find you.",
          ],
        },
      ],
      faq: [
        {
          question: "What are cute fonts copy and paste?",
          answer:
            "Bubble circles, squared caps, heart letters, and parenthesized glyphs. Soft fullwidth script is on aesthetic fonts, not here.",
        },
        {
          question: "Will TikTok show circled letters?",
          answer:
            "Often in bios and captions. If a circle boxes out, try squared caps or a shorter bubble word.",
        },
        {
          question: "Can I use this as a Discord nickname?",
          answer:
            "Display names often allow bubble and squared Unicode. Keep it to a few characters so the member list does not clip it. The @username stays plain.",
        },
        {
          question: "Is this the same as the bubble generator?",
          answer:
            "The bubble generator is circled A–Z only. This collection mixes bubble with other kawaii extras. Open bubble if you just want circles.",
        },
        {
          question: "Is this kawaii writing or kaomoji?",
          answer:
            "This page is kawaii letters (bubble, hearts, squared). Kaomoji are Japanese text faces you copy from the kaomoji hub. You can mix a cute font name with a kaomoji in the same bio.",
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
        "Type the name you log in with, or the display name you actually want to show.",
        "Compare sans bold, script, and small caps. Bubble, glitch, and Cherokee lookalikes are on other pages because they fail username filters.",
        "Copy the shortest row that still looks like you, then paste it into the display-name field—not the @handle.",
      ],
      usesHeading: "Display names, not login handles",
      uses: [
        "Instagram and TikTok display names (the @handle stays plain)",
        "Discord nicknames and clan tags that need to stay readable",
        "Facebook display names—keep the username in normal letters",
        "Game profile titles when the filter is strict",
      ],
      difference: {
        heading: "Username-safer styles, not the cool lookalike set",
        body: "This page is for short names: clean sans bold, script signatures, and compact small caps. It skips bubble, glitch, and cool lookalikes (Cherokee, Japanese, fat letters) that often fail username filters. Those live on the cool text generator. For a stacked bio with line breaks, use the social media bio generator.",
      },
      faq: [
        {
          question: "What are name fonts?",
          answer:
            "Unicode applied to a first name, nickname, or display name. The @username / login is a different field and usually has to stay A–Z.",
        },
        {
          question: "Will this survive a username filter?",
          answer:
            "Better odds than bubble or Cherokee, not a guarantee. If it fails, try sans bold or a shorter string. Cool lookalikes belong on the cool text generator, then test in the game.",
        },
        {
          question: "Can I style the login handle too?",
          answer:
            "Almost never. Discord, Instagram, TikTok, X, and Roblox account names want plain ASCII. Put the fancy version in the display name.",
        },
        {
          question: "I need a whole bio, not a name.",
          answer:
            "Use the social media bio generator for stacked lines and character counts. This grid is for a short name.",
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
      presets: ["stylish", "graphic bio", "profile", "caption"],
      howToSteps: [
        "Type the phrase you want to punch up—a CTA, a nick, a caption.",
        "Stay on bold, italic, monospace, strikethrough, and glitch. Soft fullwidth and bubble are on other collections.",
        "Copy the row that still reads at small sizes. Glitch is for a joke, not a whole bio.",
      ],
      usesHeading: "When you want punch, not softness",
      uses: [
        "High-contrast bios and short calls to action",
        "Discord nicknames that need to stand out in a member list",
        "Captions where bold Unicode is the only “bold” you can get",
      ],
      difference: {
        heading: "Graphic and loud, not cute or aesthetic",
        body: "Stylish text is bold, italic, monospace, strikethrough, and glitch. It is not cute bubble/kawaii, not soft fullwidth aesthetic, and not cool lookalike alphabets. Open cute fonts, aesthetic fonts, or the cool text generator when that is the modifier you meant.",
      },
      extraSections: [
        {
          id: "stylish-not-home-or-bold",
          heading: "Stylish text—not the homepage or bold-only tool",
          paragraphs: [
            "The homepage is the all-styles fancy text generator. The bold text generator is for mathematical bold only. This collection is high-contrast graphic styles (glitch, strikethrough, monospace mixes)—bookmark it when that is the job.",
          ],
        },
      ],
      faq: [
        {
          question: "What is a stylish text generator?",
          answer:
            "Bold, italic, graphic, and glitch Unicode—high contrast. Not the soft aesthetic set and not kawaii bubbles.",
        },
        {
          question: "How is this different from aesthetic fonts?",
          answer:
            "Stylish leans bold and loud. Aesthetic leans wide, script, and quiet. Use the matching collection.",
        },
        {
          question: "Which row survives a phone bio?",
          answer:
            "Sans bold, bold, and italic. Keep glitch and squared tags to a few characters.",
        },
        {
          question: "Can I use glitch in a public profile?",
          answer:
            "You can, but it is hard to read and some apps clip the combining marks. Save it for a meme, not your legal name.",
        },
      ],
    },
  ),
  collection(
    "cool-text-generator",
    COOL_PAGE_STYLE_IDS,
    {
      initialText: "Cool Text",
      presets: ["Cool Text", "gamer tag", "clan", "username"],
      howToSteps: [
        "Type a short name, clan tag, or bio line. Lookalikes fall apart on long sentences.",
        "Browse Cherokee, Japanese, CJK, fat, letterlike, and squared rows. Each one is Unicode, not a TTF.",
        "Read the badge. “Not for usernames” means @handles and most game logins will bounce it.",
        "Copy the row and paste into a display name, nickname, or bio—not the login field.",
      ],
      usesHeading: "Where lookalikes survive (and where they do not)",
      uses: [
        "Discord display names, nicknames, and status (keep the @username plain ASCII)",
        "Clan tags and profile flair when the game allows Unicode",
        "Instagram, TikTok, and Snapchat bios—not the @handle",
        "Roblox display names only as a test: filters often strip lookalikes",
        "A one-line caption, not a whole paragraph",
      ],
      taxonomy: [
        { label: "Name fonts (username-safer)", href: "/name-font-generator/" },
        { label: "Aesthetic fonts", href: "/aesthetic-fonts/" },
        { label: "Cute fonts", href: "/cute-fonts/" },
        { label: "Stylish text", href: "/stylish-text-generator/" },
        { label: "Copy and paste fonts", href: "/copy-paste-fonts/" },
        { label: "Discord fonts", href: "/discord-font-generator/" },
        { label: "Roblox fonts", href: "/roblox-font-generator/" },
        { label: "Old English / gothic", href: "/old-english-text-generator/" },
        { label: "Cool symbols", href: "/cool-symbols/" },
      ],
      difference: {
        heading: "Cool lookalikes, not installable fonts",
        body: "Every style on this page is a Unicode lookalike: Cherokee syllabary, CJK strokes, halfwidth kana, Canadian Aboriginal “fat” letters, Letterlike Symbols, and similar mappings. They are not trademarked typefaces and not TTF downloads. Name fonts stay on the username-safer sans/script set. Cute fonts are bubble and kawaii. Aesthetic fonts are wide fullwidth and script. Use this page when you specifically want cool letters that look borrowed from other writing systems.",
      },
      buckets: [
        {
          heading: "Japanese, CJK, and Bopomofo",
          body: "East-Asian stroke and kana lookalikes for short tags. Phones with Japanese or Chinese fonts usually render them; screen readers will not read them as English.",
        },
        {
          heading: "Cherokee, fat, and syllabics",
          body: "Chunky capitals popular for Discord and clan tags. Most @username fields still reject them — paste into a display name or bio instead.",
        },
        {
          heading: "Squared, bubble, and letterlike",
          body: "Boxed capitals, circled letters, and Åℂℝ-style Letterlike Symbols. Some platforms draw the boxed set as emoji tiles.",
        },
      ],
      mobileHowTo:
        "Type in the box, tap Copy, switch to Discord or Instagram, long-press Paste. Empty boxes mean your phone’s fonts skip that glyph—try Fat Letters, Accent Mashup, or sans bold on the name fonts page.",
      faq: [
        {
          question: "What is a cool text generator?",
          answer:
            "Unicode lookalikes: Cherokee, Japanese/CJK strokes, fat syllabics, squared caps, and similar mappings. You copy characters. There is no font file and no trademarked typeface attached to a row.",
        },
        {
          question: "Can I download these as cool fonts?",
          answer:
            "No. The look is the character itself. Installing a TTF would not change what Discord or Instagram draws in a bio field.",
        },
        {
          question: "Will this work as my username?",
          answer:
            "Usually not. Discord @handles, Instagram handles, Roblox account names, and most game logins want ASCII. Use a display name, nickname, or bio, and keep the login plain.",
        },
        {
          question: "Does Discord show these in nicknames?",
          answer:
            "Often in display names, nicknames, and about-me. If mobile shows boxes, switch to Fat Letters or a simpler bold style. The @username must stay plain letters.",
        },
        {
          question: "Can I use this for a clan tag?",
          answer:
            "Where the game allows Unicode in a display name or tag. Roblox and similar filters frequently strip Cherokee and CJK. Test in the game, and keep a sans-bold backup.",
        },
        {
          question: "Why does a screen reader say the wrong language?",
          answer:
            "Lookalikes are real letters from other scripts. A reader may announce Cherokee syllables or Japanese kana instead of your English word. Keep important names in plain text.",
        },
        {
          question: "What do Mixed support and Not for usernames mean?",
          answer:
            "Mixed support: some devices show empty boxes. Not for usernames: login and @handle fields typically reject the characters even when a bio renders them.",
        },
        {
          question: "How is this different from cool symbols?",
          answer:
            "This page restyles your letters into lookalike alphabets. Cool symbols is a list of stars, arrows, and marks—it does not rewrite a whole word.",
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
