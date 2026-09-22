/**
 * Long-tail and synonym queries mapped to kaomoji list slugs.
 * Used for hub keyword filter + /search/ haystack (not shown as on-page keyword spam).
 */
export const KAOMOJI_SEARCH_INTENT_BY_SLUG: Record<string, readonly string[]> = {
  kaomoji: [
    "kaomoji copy paste",
    "copy paste kaomoji",
    "japanese emoticon",
    "japanese text face",
    "text emoticon",
    "emoticon copy paste",
    "discord kaomoji",
    "instagram kaomoji",
    "tiktok kaomoji",
    "unicode emoticon",
    "ascii emoticon",
  ],
  "multiline-kaomojis": [
    "multiline kaomoji",
    "multiline ascii kaomoji",
    "multiline emoticon",
    "multiline text face",
    "angry multiline kaomoji",
    "happy multiline kaomoji",
    "sad multiline kaomoji",
    "ascii kaomoji copy paste",
    "stacked kaomoji",
    "multi row kaomoji",
  ],
  "coquette-kaomojis": [
    "aesthetic kaomoji",
    "aesthetic text art",
    "coquette text art",
    "coquette ascii",
    "coquette cat",
    "coquette bear",
    "coquette bunny",
    "soft aesthetic kaomoji",
    "y2k kaomoji",
    "carrd kaomoji",
    "carrd text art",
    "carrd aesthetic kaomoji",
    "link in bio kaomoji",
    "tiktok text art kaomoji",
    "multiline kaomoji",
    "multiline ascii kaomoji",
    "multiline text art",
    "ascii kaomoji art",
    "ascii animal kaomoji",
    "text art copy paste",
    "viral kaomoji",
    "tulip bunny",
    "tulip bunny kaomoji",
    "bunny and tulip ascii",
    "dog ascii kaomoji",
    "standing dog ascii",
    "dog text art",
    "૮ kaomoji",
    "heart text art kaomoji",
    "cute text art",
    "kawaii text art",
    "pastebin aesthetic text",
    "bio text art",
  ],
  "cat-kaomojis": [
    "neko kaomoji",
    "kitty kaomoji",
    "cute cat text art",
    "coquette cat kaomoji",
    "aesthetic cat kaomoji",
    "cat ascii art",
    "whiskers text face",
    "pet bio kaomoji",
  ],
  "bunny-kaomojis": [
    "rabbit kaomoji",
    "rabbit text art",
    "bunny text art",
    "spring bunny ascii",
    "tulip bunny copy paste",
    "easter bunny kaomoji",
  ],
  "bear-kaomojis": [
    "teddy kaomoji",
    "panda kaomoji text",
    "coquette bear",
    "cute bear text art",
    "ʕ•ᴥ•ʔ copy paste",
  ],
  "dog-kaomojis": [
    "puppy kaomoji",
    "dog text art",
    "dog ascii art copy paste",
    "anime dog ascii",
    "cute dog kaomoji",
  ],
  "cute-kaomojis": [
    "kawaii kaomoji",
    "kawaii text face",
    "blush kaomoji",
    "cute text face copy paste",
  ],
  "heart-kaomojis": [
    "love kaomoji",
    "romance text face",
    "couple kaomoji",
    "heart text art",
  ],
  "cry-kaomojis": ["crying kaomoji", "sad kaomoji", "tear kaomoji"],
  "star-kaomojis": [
    "aesthetic kaomoji divider",
    "galaxy kaomoji",
    "sparkle text art",
    "y2k sparkle kaomoji",
  ],
  "carrd-kaomojis": [
    "carrd divider",
    "bio divider ascii",
    "linktree divider",
    "coquette divider",
  ],
  "kaomoji-dot-art": [
    "dot art ascii",
    "mini kaomoji",
    "one line kaomoji",
    "compact ascii face",
  ],
  "hand-kaomojis": ["wave kaomoji", "hype kaomoji", "arm up emoticon"],
  "lenny-face": ["lenny copy paste", "le lenny", "meme face text"],
  "shrug-emoticon": ["shrug copy paste", "idk emoticon", "whatever face"],
  "angry-kaomojis": [
    "mad kaomoji",
    "table flip",
    "rage text face",
    "angry emoticon text",
    "angry ascii art",
    "multiline angry kaomoji",
    "table flip ascii",
  ],
  "sad-kaomojis": ["depressed kaomoji", "upset text face", "lonely kaomoji"],
  "funny-kaomojis": ["lol kaomoji", "meme text face", "laughing kaomoji"],
  "happy-kaomojis": [
    "smile kaomoji",
    "cheerful text face",
    "happy ascii art",
    "multiline happy kaomoji",
  ],
  "sleep-kaomojis": ["goodnight kaomoji", "zzz text face", "tired kaomoji"],
  "wink-kaomojis": ["flirty kaomoji", "teasing text face"],
  "music-kaomojis": ["note kaomoji", "singing text face"],
  "hug-kaomojis": ["hug text face", "comfort kaomoji"],
  "kiss-kaomojis": ["kiss text face", "smooch kaomoji"],
  "thank-you-kaomojis": ["bow kaomoji", "thanks text face", "arigatou kaomoji"],
  "shy-kaomojis": ["blush shy kaomoji", "embarrassed text face"],
  "excited-kaomojis": ["hype kaomoji", "celebration text face"],
};

export function kaomojiSlugFromUrl(url: string): string | undefined {
  const slug = url.replace(/^\/|\/$/g, "");
  if (slug === "kaomoji" || slug === "kamoji" || slug === "kaomojis") return "kaomoji";
  if (Object.hasOwn(KAOMOJI_SEARCH_INTENT_BY_SLUG, slug)) return slug;
  return undefined;
}

export function getKaomojiSearchIntentsForUrl(url: string): string[] {
  const slug = kaomojiSlugFromUrl(url);
  if (!slug) return [];
  return [...(KAOMOJI_SEARCH_INTENT_BY_SLUG[slug] ?? [])];
}

export function getKaomojiSearchIntentsForSlug(slug: string): string[] {
  return [...(KAOMOJI_SEARCH_INTENT_BY_SLUG[slug] ?? [])];
}
