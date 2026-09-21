import {
  KAOMOJI_HUB,
  KAOMOJI_HUB_AESTHETIC_SAMPLES,
  KAOMOJI_HUB_SERP,
  KAOMOJI_HUB_SLUGS,
  KAOMOJI_UNIQUE_COPY,
  getKaomojiHubSerp,
  isKaomojiHubSlug,
  type KaomojiHubSlug,
  type KaomojiProseSection,
} from "@/data/kaomoji-copy";

export {
  KAOMOJI_HUB,
  KAOMOJI_HUB_AESTHETIC_SAMPLES,
  KAOMOJI_HUB_SERP,
  KAOMOJI_HUB_SLUGS,
  getKaomojiHubSerp,
  isKaomojiHubSlug,
};
export type {
  KaomojiHubSlug,
  KaomojiProseSection,
  KaomojiSituationRow,
} from "@/data/kaomoji-copy";

export type KaomojiList = {
  slug: string;
  emotion: string;
  primaryKeyword: string;
  title: string;
  description: string;
  h1: string;
  fellowKeywords: string[];
  faces: string[];
  /** Meanings / when to use — unique body per emotion. */
  meanings: string;
  meaningsHeading?: string;
  howToHeading?: string;
  howToSteps?: string[];
  mobileNote?: string;
  canonicalLead?: string;
  ogSubtitle?: string;
  whereHeading?: string;
  whereBullets?: string[];
  extraSections?: KaomojiProseSection[];
  faq: { question: string; answer: string }[];
};

function list(
  slug: string,
  emotion: string,
  primaryKeyword: string,
  faces: string[],
  fellows: string[] = [],
  meanings?: string,
  description?: string,
  h1?: string,
): KaomojiList {
  const label = emotion.charAt(0).toUpperCase() + emotion.slice(1);
  return {
    slug,
    emotion,
    primaryKeyword,
    title: `${label} Kaomojis Copy and Paste | FancifyText`,
    description:
      description ??
      `Copy ${emotion} kaomoji and Japanese emoticons. Free ${emotion} text faces for Discord, Instagram, and chat.`,
    h1: h1 ?? `${label} Kaomojis`,
    fellowKeywords: fellows.length
      ? fellows
      : [`${emotion} kaomoji`, `kaomoji ${emotion}`, `${emotion} text face`],
    faces,
    meanings:
      meanings ??
      `Use ${emotion} kaomojis when you want a quick ${emotion} reaction in chat without sending a sticker. They work in Discord, Instagram captions, TikTok comments, and WhatsApp because they are plain Unicode text. Pick a face that matches the tone—mild for bios, stronger for memes—and keep messages short so the emoticon stays readable.`,
    faq: [
      {
        question: `What are these ${emotion} faces?`,
        answer: `Punctuation emoticons for a ${emotion} mood. Tap a face to copy it as plain text—no sticker pack.`,
      },
      {
        question: "Will they paste into Discord or Instagram?",
        answer:
          "Usually. If a face shows as boxes, pick a shorter one from higher in the list.",
      },
    ],
  };
}

export const KAOMOJI_LISTS: KaomojiList[] = [
  list(
    "angry-kaomojis",
    "angry",
    "angry kaomoji",
    [
      "(╬ Ò﹏Ó)",
      "(ノಠ益ಠ)ノ彡┻━┻",
      "ಠ_ಠ",
      "(╯°□°）╯︵ ┻━┻",
      "(＃`Д´)",
      "(-_-メ)",
      "(｀ε´)",
      "ヽ(｀⌒´メ)ノ",
      "(ง •̀_•́)ง",
      "(｀Д´*)",
      "щ(ºДºщ)",
      "(ノ｀Д´)ノ",
      "(ﾒ` ﾛ ´)",
      "٩(๑`^´๑)۶",
      "(╬ﾟдﾟ)▄︻┻┳═一",
      "凸(｀△´＋）",
      "(｀⌒´メ)",
      "＼＼\\٩(๑`^´๑)۶//／／",
      "(╬ಠ益ಠ)",
      "(눈_눈)",
      "(・`ω´・)",
      "(｀へ´)",
      "ヽ(`Д´)ﾉ",
      "(#｀皿´)",
      "( ≧Д≦)",
      "(ノ｀Д)ノ",
      "щ(ಠ益ಠщ)",
      "(╬￣皿￣)",
      "ヾ(｀⌒´メ)ﾉ",
      "(｀Д´)",
    ],
  ),
  list(
    "bear-kaomojis",
    "bear",
    "bear kaomoji",
    [
      "ʕ•ᴥ•ʔ",
      "ʕ·ᴥ·ʔ",
      "ʕ￫ᴥ￩ʔ",
      "ʕᵔᴥᵔʔ",
      "ʕʘ̅͜ʘ̅ʔ",
      "ʕ•̼͛•ʔ",
      "ʕっ•ᴥ•ʔっ",
      "ᶘ ᵒᴥᵒᶅ",
      "ʕ•̫͡•ʔ",
      "ʕ⁎̯͡⁎ʔ༄",
      "ʕ•͈ ̫ •͈ʔ",
      "ʕ•́ᴥ•̀ʔっ",
      "ʕ ͡° ͜ʖ ͡°ʔ",
      "୧ʕ•̀ᴥ•́ʔ୨",
      "ʕノ•ᴥ•ʔノ ︵ ┻━┻",
      "ᕦʕ •ᴥ•ʔᕤ",
      "ʕ￫ᴥ￩ʔ♡",
      "ʕ•ᴥ•ʔﾉ♡",
      "ʕ´•ᴥ•`ʔ",
      "ʕ≧ᴥ≦ʔ",
      "ʕ•̀ω•́ʔ✧",
      "ʕ•͓͡•ʔ",
      "ʕ•͡ᴥ•ʔ",
      "ʕ•ﻌ•ʔ",
      "ʕ ꈍᴥꈍʔ",
      "ʕ·͡ᴥ·ʔ",
      "ʕ•̀o•́ʔ",
      "ʕᵔᴥᵔʔ♡",
      "ʕっ•ᴥ•ʔっ💕",
      "ʕ￫ᴥ￩ʔﾉ",
    ],
  ),
  list(
    "cat-kaomojis",
    "cat",
    "cat kaomoji",
    [
      "(=^･ω･^=)",
      "(=^･ｪ･^=)",
      "(^・ω・^ )",
      "(=｀ω´=)",
      "ヾ(=･ω･=)o",
      "(^=◕ᴥ◕=^)",
      "(=①ω①=)",
      "ฅ^•ﻌ•^ฅ",
      "(=^‥^=)",
      "（ΦωΦ）",
      "(=ＴェＴ=)",
      "(=；ェ；=)",
      "(=｀ェ´=)",
      "∋(。・ω・。)∈",
      "(=^･^=)",
      "ﾐ(๑•ω•๑)っ",
      "(=^‥^)ﾉ",
      "ლ(=ↀωↀ=)ლ",
      "(=；ω；=)",
      "(=｀ェ´=)ﾉ",
      "ฅ(≈>ܫ<≈)ฅ",
      "(ΦзΦ)",
      "(=ω=)",
      "(=ↀωↀ=)",
      "∪･ω･∪",
      "(=^・^=)",
      "ヾ(=`ω´=)ノ”",
      "(=^ ◡ ^=)",
      "ฅ(⌯͒• ɪ •⌯͒)ฅ",
      "(=^･ω･^)y＝",
    ],
  ),
  list(
    "confused-kaomojis",
    "confused",
    "confused kaomoji",
    [
      "(・・？)",
      "(・_・ヾ",
      "(・・;)?",
      "(？ω？)",
      "(￣ω￣;)",
      "(๑•̆૩•̆)",
      "(⊙_☉)",
      "(・ヘ・)",
      "(´･_･`)",
      "(。ヘ°)",
      "(・・〃)",
      "(゜-゜)",
      "(・∀・；)",
      "(´・ω・`)?",
      "(◎_◎;)",
      "(・□・；)",
      "؟(＾＾؟)",
      "(。゜ω゜)？",
      "(｀・ω・´)?",
      "(・ω・｀)?",
      "( ˘･з･)",
      "(・・*)",
      "(￣ヘ￣)",
      "(・・)？",
      "(•ิ_•ิ)?",
      "(⊙﹏⊙)",
      "(´・｀)",
      "(´～｀；)",
      "(。・_・。)?",
      "(・ω・；)",
    ],
  ),
  list(
    "cry-kaomojis",
    "cry",
    "cry kaomoji",
    [
      "(Ｔ▽Ｔ)",
      "( ; ω ; )",
      "(´；ω；`)",
      "(｡•́︿•̀｡)",
      "(╥_╥)",
      "(ಥ﹏ಥ)",
      "(つ﹏⊂)",
      "(；д；)",
      "(ノД`)・゜・。",
      "(இ﹏இ`｡)",
      "(๑´•.̫ •̀๑)",
      "(っ˘̩╭╮˘̩)っ",
      "(个_个)",
      "(ಥ_ಥ)",
      "｡ﾟ(ﾟ´Д｀ﾟ)ﾟ｡",
      "(´；д；`)",
      "(；へ：)",
      "(ノ﹏ヽ)",
      "(´°̥̥̥̥̥̥̥̥ω°̥̥̥̥̥̥̥̥｀)",
      "(。﹏。)",
      "(〒﹏〒)",
      "(´＿｀。)",
      "(；＿；)",
      "(つд⊂)",
      "(｡ŏ﹏ŏ)",
      "(இωஇ )",
      "༼;´༎ຶ ۝ ༎ຶ༽",
      "(๑•́ ₃ •̀๑)",
      "(´；ω；｀)",
      "(╥﹏╥)",
    ],
    ["crying kaomoji", "kaomoji cry", "sad cry face"],
  ),
  list(
    "cute-kaomojis",
    "cute",
    "cute kaomoji",
    [
      "(◕‿◕)",
      "(｡♥‿♥｡)",
      "(✿◠‿◠)",
      "(≧◡≦)",
      "(◠‿◠✿)",
      "ʕ•ᴥ•ʔ",
      "(´｡• ᵕ •｡`)",
      "(●´ω｀●)",
      "(๑>◡<๑)",
      "(◕ᴗ◕✿)",
      "♡(˃͈ દ ˂͈ ༶ )",
      "(｡◕‿◕｡)",
      "(づ｡◕‿‿◕｡)づ",
      "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧",
      "(❁´◡`❁)",
      "(☆ω☆)",
      "(´∩｡• ᵕ •｡∩`)",
      "(๑˃́ꇴ˂̀๑)",
      "(≧∇≦)/",
      "(๑•ᴗ•๑)",
      "♪( ´θ｀)ノ",
      "(๑´ڡ`๑)",
      "(＾▽＾)",
      "(≧ω≦)",
      "(｡･ω･｡)",
      "(*^‿^*)",
      "(✿´‿`)",
      "ヽ(♡‿♡)ノ",
      "(◡ ‿ ◡ ✿)",
      "(๑˘︶˘๑)",
    ],
    ["kawaii kaomoji", "cute text faces", "cute japanese emoticons"],
  ),
  list(
    "drool-kaomojis",
    "drool",
    "drool kaomoji",
    [
      "(￣口水￣)",
      "( ¯﹃¯ )",
      "(￣﹃￣)",
      "(´ڡ`)",
      "(っ˘ڡ˘ς)",
      "(๑´ڡ`๑)",
      "( ˘͈ ᵕ ˘͈ )",
      "(￣ω￣)",
      "(¯▽¯；)",
      "(´～｀ヾ)",
      "(￣ヘ￣)",
      "( ˘͈ε ˘͈ )",
      "(´∀｀*)",
      "(￣▽￣)ノ",
      "(¯﹃¯)",
      "( ˶˘ ³˘(˘ω˘ )",
      "(っ˘з(˘⌣˘ )",
      "(´ڡ｀)",
      "(￣ε￣＠)",
      "(¯ε¯；)",
      "(´～｀)",
      "(￣▽￣*)ゞ",
      "( ¯∀¯ )",
      "(´ε｀ )♡",
      "(っ˘зʕ•ᴥ•ʔ",
      "(￣ω￣;)",
      "(´ー｀)",
      "(¯▽¯*)",
      "(´∀｀)",
      "(￣ρ￣)..zzZ",
    ],
  ),
  list(
    "evil-kaomojis",
    "evil",
    "evil kaomoji",
    [
      "(҂⌣̀_⌣́)",
      "(｀∀´)Ψ",
      "ψ(｀∇´)ψ",
      "(⊙_◎)",
      "(｀ε´)",
      "щ(゜ロ゜щ)",
      "(｀∀´)",
      "（＞ｙ＜）",
      "(｀Д´)",
      "(╬ಠ益ಠ)",
      "(¬‿¬)",
      "(｀⌒´メ)",
      "ψ(｀ヘ´)ψ",
      "(｀ω´)",
      "(｀ε´；)",
      "（｀ー´）",
      "(ΦωΦ)",
      "(｀∀´)ノ",
      "(｀皿´）",
      "(｀ヘ´)",
      "(｀д´)",
      "(¬_¬)",
      "ψ(*｀ー´)ψ",
      "(｀ー´)",
      "(｀ε´メ)",
      "(｀◇´)",
      "(｀∀´メ)",
      "ψ(｀∇´)ψ",
      "(｀д´*)",
      "(｀ε´ノ)",
    ],
  ),
  list(
    "heart-kaomojis",
    "heart",
    "heart kaomoji",
    [
      "(♥ω♥*)",
      "(✿ ♥‿♥)",
      "♡(˃͈ દ ˂͈ ༶ )",
      "(´∀｀)♡",
      "(｡♥‿♥｡)",
      "♡〜٩( ˃́▿˂̀ )۶〜♡",
      "(♡´౪`♡)",
      "♥(ˆ⌣ˆԅ)",
      "(づ￣ ³￣)づ",
      "♡(ŐωŐ人)",
      "(´ε｀ )♡",
      "ヽ(♡‿♡)ノ",
      "(๑♡⌓♡๑)",
      "♥╣[-_-]╠♥",
      "(ღ˘⌣˘ღ)",
      "(♡˙︶˙♡)",
      "♡＼(￣▽￣)／♡",
      "(人-ω-)｡o.♡",
      "( ˘ ³˘)♥",
      "♡( ◡‿◡ )",
      "(っ˘з(˘⌣˘ )♡",
      "♡＾▽＾♡",
      "(´♡‿♡`)",
      "٩(♡ε♡)۶",
      "(ﾉ´ з `)ノ",
      "♡(≧▽≦)",
      "(ღ˘⌣˘ღ)♡",
      "(*♥д♥)",
      "♡(｡- ω -)",
      "( ˘⌣˘)♡(˘⌣˘ )",
    ],
  ),
  list(
    "hug-kaomojis",
    "hug",
    "hug kaomoji",
    [
      "(づ｡◕‿‿◕｡)づ",
      "(つ≧▽≦)つ",
      "(っ˘зʕ•ᴥ•ʔ",
      "(つ▀¯▀)つ",
      "(⊃｡•́‿•̀｡)⊃",
      "(つ´∀｀)つ",
      "(づ￣ ³￣)づ",
      "(っ˘з(˘⌣˘ )",
      "༼ つ ◕_◕ ༽つ",
      "(⊃•̀ω•́)⊃",
      "(つ•̀ᴥ•́)つ",
      "(つ≧Д≦)つ",
      "(っ˘̩╭╮˘̩)っ",
      "(つ☯ᗜ☯)つ",
      "(⊃｡•́‿•̀｡)⊃♡",
      "⊂(・﹏・⊂)",
      "(っ´ω`c)",
      "(つ✧ω✧)つ",
      "⊂((・⊥・))⊃",
      "(つ◕౪◕)つ",
      "༼つ ் ▽ ் ༽つ",
      "(つ˘зʕ•ᴥ•ʔ",
      "(⊃｡•́‿•̀｡)⊃♥",
      "(つ´∀｀)つ♡",
      "⊂(◉‿◉)つ",
      "(っ˘з˘ς)",
      "༼ つ ▀̿_▀̿ ༽つ",
      "(つ•̀_•́)つ",
      "(⊃ω⊂)",
      "(つ≧ω≦)つ",
    ],
  ),
  list(
    "kiss-kaomojis",
    "kiss",
    "kiss kaomoji",
    [
      "( ˘ ³˘)♥",
      "(*￣з￣)",
      "(´ε｀ )♡",
      "(づ￣ ³￣)づ",
      "(っ˘зʕ•ᴥ•ʔ",
      "( ˘з˘)",
      "（*＾3＾）/～☆",
      "(っ˘з(˘⌣˘ )",
      "(￣ε￣＠)",
      "(*¯ ³¯*)♡",
      "( ´з｀)ノ",
      "(๑´ڡ`๑)",
      "σ(≧ε≦σ) ♡",
      "( ˘͈ ᵕ ˘͈ )",
      "(´ε｀*)",
      "(*´з｀*)",
      "(っ˘з˘ς)",
      "(¯ε¯；)",
      "(* ˘³˘*)",
      "( ´з`)",
      "(˶˘з˘˶)",
      "(っ˘зʕ￫ᴥ￩ʔ",
      "（＾3＾♪",
      "(*ε*)",
      "( ˘з˘)♡",
      "(￣з￣)",
      "(*＾3＾)/～♡",
      "(´ε｀)",
      "(*¯ε¯*)",
      "(っ˘з˘ς)♡",
    ],
  ),
  list(
    "music-kaomojis",
    "music",
    "music kaomoji",
    [
      "♪(´ε｀ )",
      "♪～(´ε｀ )",
      "♪(´▽｀)",
      "ヽ(´▽｀)/♪",
      "♪♪♪ d(⌒o⌒)b♪♪♪",
      "♪(๑ᴖ◡ᴖ๑)♪",
      "ヾ(´〇`)ﾉ♪♪♪",
      "♪┏(・o･)┛♪",
      "♪♪♪(o⌒∇⌒o)♪♪♪",
      "♪(*^^)o∀*∀o(^^*)♪",
      "♪(´ε｀ )ﾉ",
      "♪ヽ(･ˇ∀ˇ･ゞ)♪",
      "♪(o_ _)o♪",
      "♪♪(・∀・)♪♪",
      "♪(´∀｀●)ﾉ",
      "♪(๑ÒωÓ๑)♪",
      "♪┏(＾0＾)┛♪",
      "♪(´▽｀*)",
      "♪♪♪(o^∀^o)♪♪♪",
      "♪ヽ( ˘ω˘ )ゝ♪",
      "♪(´ε｀*)",
      "♪(ﾉ´∀｀*)",
      "♪♪ d(⌒o⌒)b ♪♪",
      "♪(´ω｀)♪",
      "♪ヽ(´∀｀)ﾉ♪",
      "♪(๑˃̵ᴗ˂̵)و ♪",
      "♪♪♪(´∀｀*)♪♪♪",
      "♪(´ー｀*)",
      "♪(´ε｀ )♡",
      "♪♪♪ヽ(´∀｀)ﾉ♪♪♪",
    ],
  ),
  list(
    "sad-kaomojis",
    "sad",
    "sad kaomoji",
    [
      "(´；ω；`)",
      "(｡•́︿•̀｡)",
      "(╯︵╰,)",
      "(´-ω-`)",
      "(；一_一)",
      "(´･ω･`)",
      "(｡ŏ﹏ŏ)",
      "(´＿｀。)",
      "(つ﹏⊂)",
      "(；´Д｀)",
      "(。_。)",
      "(´-ι_-｀)",
      "(´°̥̥̥̥̥̥̥̥ω°̥̥̥̥̥̥̥̥｀)",
      "(・_・。)",
      "(´∩ω∩｀)",
      "(´・ω・`)",
      "(´；д；`)",
      "(。ヘ°)",
      "(´～｀；)",
      "(个_个)",
      "(´-ω-`；)",
      "(。・＿・。)",
      "(´・｀)",
      "(´□｀川)",
      "(。-ω-)ﾉ",
      "(´；ω；｀)",
      "(´-_-`)",
      "(。_°)",
      "(´・д・`)",
      "(´･_･`)",
    ],
  ),
  list(
    "shocked-kaomojis",
    "shocked",
    "shocked kaomoji",
    [
      "(⊙_⊙)",
      "(゜o゜;",
      "(°□°；)",
      "(；〇□〇）",
      "(☉_☉)",
      "(・o・)",
      "(ﾟДﾟ；)",
      "(◎_◎;)",
      "(°ロ°)!",
      "(⊙﹏⊙)",
      "(；゜〇゜)",
      "(・□・；)",
      "(°□°)",
      "(゜Д゜)",
      "(⊙_◎)",
      "(・∀・；)",
      "(ﾟ∀ﾟ；)",
      "(；゜д゜)",
      "(◎_◎)",
      "(°◇°；)",
      "(・◇・；)",
      "(゜ロ゜)",
      "(☉∀☉)",
      "(°o°；)",
      "(・_・；)",
      "(◎o◎)",
      "(°□°)!?",
      "(・ω・；)",
      "(ﾟ〇ﾟ；)",
      "(⊙д⊙)",
    ],
    ["shocked text face", "jaw drop kaomoji"],
  ),
  list(
    "thank-you-kaomojis",
    "thank you",
    "thank you kaomoji",
    [
      "m(_ _)m",
      "(\\_/)",
      "(シ_ _)シ",
      "m(._.)m",
      "(人´∀｀)．☆．。．：＊：・'゜",
      "(*_ _)人",
      "(´人｀)",
      "人(_ _*)",
      "m(￣ー￣)m",
      "(。・_・)ノ",
      "(*＾▽＾)／",
      "(人´∀｀)",
      "m(｡≧Д≦｡)m",
      "(シ_ _)シ♡",
      "(*´∀｀*)人",
      "人(￣ω￣；)",
      "m(>ω<)m",
      "(。・∀・)ノ",
      "(*_ _)m",
      "人(_ _。)",
      "(シ_ _)シありがとう",
      "m(＞ω＜)m",
      "(*´人｀*)",
      "人(￣▽￣)",
      "m(＿ ＿)m",
      "(。´∀｀)ノ",
      "(*＾人＾*)",
      "m(´・ω・｀)m",
      "人(´∀｀*)",
      "(シ_ _)シ☆",
    ],
    ["thanks kaomoji", "arigatou emoticon", "thank you text face"],
  ),
  list(
    "surprised-kaomojis",
    "surprised",
    "surprised kaomoji",
    [
      "(ﾟ▽ﾟ*)",
      "w(°ｏ°)w",
      "(o_O)",
      "(O_O)",
      "(°▽°)",
      "ヽ(°〇°)ﾉ",
      "(ﾟωﾟ)",
      "Σ(ﾟﾛﾟ;)",
      "(*ﾟﾛﾟ)",
      "(●__●)",
      "(✧ω✧)",
      "(ﾟoﾟ)",
      "w(ﾟｏﾟ)w",
      "(ﾉﾟ0ﾟ)ﾉ",
      "(*ﾟ∀ﾟ)",
      "(°∀°)",
      "(O.O)",
      "(゜▽゜)",
      "∑(O_O;)",
      "(ﾟoﾟ;",
      "wow (ﾟ∀ﾟ)",
      "(o_O)!",
      "(°ロ° )",
      "(*ﾟ▽ﾟ*)",
      "(ﾟﾛﾟ )",
      "ヽ(ﾟ〇ﾟ)ﾉ",
      "(☆▽☆)",
      "(ﾟ∀ﾟ *)",
      "Σ(O_O)",
      "(°o° *)",
    ],
    ["omg kaomoji", "astonished text face"],
  ),
  list(
    "shy-kaomojis",
    "shy",
    "shy kaomoji",
    [
      "(⁄ ⁄•⁄ω⁄•⁄ ⁄)",
      "(〃ω〃)",
      "(⁄ ⁄>⁄ ▽ ⁄<⁄ ⁄)",
      "(*ﾉωﾉ)",
      "(*/ω＼*)",
      "(〃▽〃)",
      "(⁄ ⁄•⁄-⁄•⁄ ⁄)",
      "(*´ｪ｀*)",
      "(〃´∀｀)",
      "(*≧艸≦)",
      "(⁄ ⁄•⁄□⁄•⁄ ⁄)",
      "(*ﾉ∀ﾉ)",
      "(〃ω〃)♡",
      "(*´∀｀*)",
      "(⁄˘⁄ ⁄ ω⁄ ⁄˘⁄)",
      "(*≧∀≦*)",
      "(〃´∀｀〃)",
      "(*´ω｀*)",
      "(⁄ ⁄•⁄∇⁄•⁄ ⁄)",
      "(*ﾉεﾉ)",
      "(〃▽〃)♡",
      "(*´ー｀*)",
      "(⁄˘˘⁄)",
      "(*≧▽≦)",
      "(〃ω〃)ﾉ",
      "(*´д｀*)",
      "(⁄ ⁄•⁄ε⁄•⁄ ⁄)",
      "(*ﾉ∀`*)",
      "(〃´Д｀)",
      "(*≧ω≦*)",
    ],
  ),
  list(
    "excited-kaomojis",
    "excited",
    "excited kaomoji",
    [
      "ヽ(≧∀≦)ﾉ",
      "ヾ(≧▽≦*)o",
      "٩(◕‿◕｡)۶",
      "ヽ(＾Д＾)ﾉ",
      "＼(≧▽≦)／",
      "ヽ(★ω★)ノ",
      "٩(ˊᗜˋ*)و",
      "ヾ(｡･ω･｡)",
      "ヽ(>∀<☆)ノ",
      "＼(＾▽＾)／",
      "٩(๑❛ᴗ❛๑)۶",
      "ヽ(*≧ω≦)ﾉ",
      "ヾ(≧∪≦*)ﾉ〃",
      "ヽ(´▽｀)/",
      "＼(￣▽￣)／",
      "٩(｡•́‿•̀｡)۶",
      "ヽ(ﾟ∀ﾟ)ﾉ",
      "ヾ(＠⌒ー⌒＠)ノ",
      "ヽ(★＞∀＜★)ノ",
      "＼(*T▽T*)／",
      "٩(◕‿◕)۶",
      "ヽ(ｏ`皿′ｏ)ﾉ",
      "ヾ(≧ヘ≦)〃",
      "ヽ(´∀｀○)ﾉ",
      "＼(≧∀≦)／",
      "٩(๑òωó๑)۶",
      "ヽ(≧Д≦)ノ",
      "ヾ(≧∇≦)ﾉ",
      "ヽ(´▽｀*)ﾉ",
      "＼(＾∀＾)／",
    ],
  ),
  list(
    "thinking-kaomojis",
    "thinking",
    "thinking kaomoji",
    [
      "(´･_･`)",
      "(・_・ヾ",
      "(￣ヘ￣)",
      "(・ω・｀)",
      "(´ー｀)",
      "(・∀・)",
      "(￣ω￣)",
      "(´・ω・`)",
      "(・・；)",
      "(´～｀)",
      "(・◇・)",
      "(￣ー￣)",
      "(´･ω･｀)",
      "(・_・。)",
      "(´∀｀)",
      "(・ω・；)",
      "(￣▽￣；)",
      "(´□｀川)",
      "(・∀・；)",
      "(´・｀)",
      "(￣ε￣)",
      "(・□・)",
      "(´ｰ｀)",
      "(・・*)",
      "(￣◇￣)",
      "(´ω｀)",
      "(・ω・)",
      "(￣_￣)",
      "(´∩｀)",
      "(・－・)",
    ],
  ),
  list(
    "scared-kaomojis",
    "scared",
    "scared kaomoji",
    [
      "(ノД`)・゜・。",
      "(´；ω；`)",
      "(゜゜;",
      "(´Д｀；)",
      "(；゜〇゜)",
      "(ﾟДﾟ；)",
      "(；ω；)",
      "(´°̥̥̥̥̥̥̥̥ω°̥̥̥̥̥̥̥̥｀)",
      "(；一_一)",
      "(´□｀川)",
      "(・_・；)",
      "(´；д；`)",
      "(；´Д｀)",
      "(´･_･`)",
      "(；゜д゜)",
      "(´□｀；)",
      "(・◇・；)",
      "(；´∀｀)",
      "(´Д`；)",
      "(；ω｀)",
      "(´・ω・｀；)",
      "(；゜∀゜)",
      "(´д｀；)",
      "(；´□｀)",
      "(´∀｀；)",
      "(；・∀・)",
      "(´；□；`)",
      "(；´д｀)",
      "(´ﾟДﾟ｀)",
      "(；≧Д≦)",
    ],
  ),
  list(
    "dog-kaomojis",
    "dog",
    "dog kaomoji",
    [
      "U・ᴥ・U",
      "▼・ᴥ・▼",
      "U＾ェ＾U",
      "(❍ᴥ❍ʋ)",
      "V●ᴥ●V",
      "U´ᴥ`U",
      "(◕ᴥ◕)",
      "U・ェ・U",
      "▼(´ᴥ`)▼",
      "U｡･ｪ･｡U",
      "(ᵔᴥᵔ)",
      "U^ｪ^U",
      "▼・ェ・▼",
      "U´ェ｀U",
      "(◕‿◕✿)ﾉわん",
      "U・ω・U",
      "▼＾ω＾▼",
      "U￣ｪ￣U",
      "(ᵔᴥᵔ)ﾉ",
      "U・□・U",
      "▼´ᴥ`▼",
      "U。・∀・。U",
      "(◕ᴥ◕ʋ)",
      "U´∀｀U",
      "▼・∀・▼",
      "U・ェ・*U",
      "(ᵔェᵔ)",
      "U＾∀＾U",
      "▼ω▼",
      "U・ᴥ・*U",
    ],
  ),
  list(
    "funny-kaomojis",
    "funny",
    "funny kaomoji",
    [
      "(≧▽≦)",
      "(＾▽＾)",
      "(≧∀≦)",
      "(´∀｀)",
      "(≧ω≦)",
      "(＾∀＾)",
      "(≧∇≦)",
      "(´▽｀)",
      "(≧◇≦)",
      "(＾ω＾)",
      "(≧∪≦)",
      "(´∀｀*)",
      "(≧Д≦)",
      "(＾∇＾)",
      "(≧ヘ≦)",
      "(*≧▽≦)",
      "(＾◇＾)",
      "(≧∀≦*)",
      "(´ω｀)",
      "(≧□≦)",
      "ヽ(≧∀≦)ﾉ",
      "(＾∀＾●)",
      "(≧▽≦)/",
      "(*´∀｀*)",
      "(＾▽＾*)",
      "(≧ω≦)/",
      "ヽ(´▽｀)/",
      "(*≧∀≦*)",
      "(＾ω＾*)",
      "ヾ(≧∀≦)ﾉ",
    ],
  ),
  list(
    "proud-kaomojis",
    "proud",
    "proud kaomoji",
    [
      "(｀∀´)",
      "(￣ー￣)",
      "(｀⌒´)",
      "(￣∇￣)",
      "(｀ω´)",
      "(￣∀￣)",
      "(｀ー´)",
      "(￣◇￣)",
      "(｀∇´)",
      "(￣ω￣)",
      "(｀ε´)",
      "(￣▽￣)ゞ",
      "(｀Д´)",
      "(￣ヘ￣)",
      "(｀∀´)ノ",
      "(￣ー￣)ゞ",
      "(｀⌒´メ)",
      "(￣∇￣)ノ",
      "(｀ω´*)",
      "(￣∀￣)ゞ",
      "ᕦ(ò_óˇ)ᕤ",
      "(￣ー￣)ノ",
      "(｀ー´)ノ",
      "(￣◇￣)ゞ",
      "(｀ε´)ゞ",
      "(￣ω￣)ノ",
      "(｀∇´*)",
      "(￣▽￣)ノ",
      "(｀Д´)ゞ",
      "(￣ヘ￣)ゞ",
    ],
  ),
  list(
    "hand-kaomojis",
    "hand",
    "hand kaomoji",
    [
      "ヽ(・∀・)ﾉ",
      "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧",
      "＼(^o^)／",
      "＼(＾▽＾)／",
      "ヾ(＾∇＾)/",
      "(ノ°▽°)ノ",
      "ヽ(´▽`)/",
      "ヾ(´∀｀)/",
      "(ﾉ≧∀≦)ﾉ",
      "＼(≥▽≤)／",
      "ヽ(；▽；)ノ",
      "(ノ；▽；)ノ",
      "ヽ(；´Д｀)ノ",
      "(ノ｀Д´)ノ",
      "┗(＾0＾)┓",
      "┏(＾0＾)┛",
      "(ノ^o^)ノ",
      "＼( ^o^ )／",
      "(ﾉ>ω<)ﾉ",
      "ヾ(´∀｀*)ﾉ",
      "ヽ(*´▽)ノ",
      "( ﾟ▽ﾟ)/",
      "╭( ･∀･)つ",
      "(っ◔◡◔)っ",
      "(づ｡◕‿◕｡)づ",
      "☜(ﾟヮﾟ☜)",
      "(☞ﾟ∀ﾟ)☞",
      "ヾ(•ω•`)o",
      "ヽ(≧∀≦)ﾉ",
      "(ﾉ*･ω･)ﾉ",
    ],
  ),
  list(
    "star-kaomojis",
    "star",
    "star kaomoji",
    [
      "☆(｡◕‿◕｡)☆",
      "⋆｡°✩",
      "✩₊˚.⋆",
      "˚ ༘ ⋆｡˚",
      "★(ﾉ◕ヮ◕)ﾉ",
      "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧",
      "☆ﾟ.*･｡ﾟ",
      "⋆⭒˚.⋆",
      "｡･:*:･ﾟ★",
      "☆.*･｡ﾟ",
      "✧･ﾟ: *✧",
      "⋆ ˚｡⋆୨୧˚",
      "°.✩┈───┈✩.°",
      "✩ ⋆ ˚｡",
      "(★^O^★)",
      "☆(>_<)☆",
      "⋆｡‧˚ʚɞ˚‧｡⋆",
      "★~(◡﹏◕✿)",
      "✩˚｡⋆｡˚✩",
      "☆(°▽°*)",
      "✧*｡(｡◕‿◕｡)✧",
      "(★‿★)",
      "⋆｡°✩˚",
      "★☆★",
      "✩♡✩",
      "⋆ ˚｡⋆｡˚ ☾ ˚｡⋆",
      "★~☆~★",
      "✩°｡ ⋆",
      "⋆｡˚☁︎˚｡⋆",
      "☆ミ",
      "･:*:･ﾟ★",
    ],
  ),
  list(
    "kaomoji-dot-art",
    "dot art",
    "dot art kaomoji",
    [
      "(•ᴗ•)",
      "(•̀ᴗ•́)و",
      "(◠‿◠)",
      "( ˘ ³˘)♥",
      "⊂(◉‿◉)つ",
      "(づ｡◕‿◕｡)づ",
      "(っ˘ω˘)っ",
      "(ノ◕ヮ◕)ノ",
      "┬─┬ノ( º _ ºノ)",
      "(╯✧▽✧)╯",
      "ヽ(≧Д≦)ノ",
      "(づ￣ ³￣)づ",
      "( ˘▽˘)っ",
      "◕‿◕",
      "•ᴥ•",
      "ʕ•ᴥ•ʔ",
      "(='X'=)",
      "(=^･^=)",
      "(=^ェ^=)",
      "(=^‥^=)",
      "(^._.^)ﾉ",
      "(^人^)",
      "(^・ω・^)",
      "(^ω^)",
      "(^◕ᴥ◕^)",
      "(ᵔᴥᵔ)",
      "(◕ᴥ◕)",
      "(◕‿◕)",
      "( ･ω･)ﾉ",
      "(^>^)",
      "(^u^)",
    ],
    [],
    undefined,
    undefined,
    "Kaomoji Dot Art (Mini ASCII)",
  ),
  list(
    "carrd-kaomojis",
    "carrd",
    "carrd kaomojis",
    [
      "· · ─ ·✶· ─ · ·",
      "───── ⋆ ⋆ ⋆ ─────",
      "┈┈┈───━━━───┈┈┈",
      "₊˚⊹♡⊹˚₊",
      "♡ ─── ♡ ─── ♡",
      "═══════",
      "╭───────────╮",
      "╰───────────╯",
      "· · · ୨୧ · · ·",
      "°。°。°。°。°。",
      "⊹ ࣪ ˖ ⊹ ࣪ ˖",
      "୨୧ ┈┈┈ ୨୧",
      "─ · · ─ · ─ · · ─",
      "❀ ─── ❀ ─── ❀",
      "╭───♡ · ♡───╮",
      "‧₊˚ ✩ ‧₊˚",
      "♡ ｡˚ ✧ ˚｡ ♡",
      "─── ･ ｡ﾟ☆: *. ☆ .*:･ﾟ ───",
      "‧₊˚ ♡ ‧₊˚",
      "✩°｡⋆",
      "♡ ⊹ ˖ ♡ ⊹ ˖ ♡",
      "╭────── · · ── ♡ ── · · ──────╮",
      "˚ ༘♡ ⋆｡˚",
      "· · ─────── · ·",
      "▰▱▰▱▰▱▰",
      "╰┈➤",
      "◜◡◝",
      "┈┈┈┈┈┈┈┈┈",
      "╭┄┄┄┄╮",
      "╰┄┄┄┄╯",
      "· · ──────── · ·",
      "▬▬▬▬▬▬▬▬",
    ],
    [],
    undefined,
    undefined,
    "Carrd Kaomoji Bio Dividers",
  ),
  list("happy-kaomojis", "happy", "happy kaomoji", [
    "(＾▽＾)",
    "(≧▽≦)",
    "(＾∀＾)",
    "(≧∀≦)",
    "(´▽｀)",
    "(＾ω＾)",
    "(≧ω≦)",
    "(*^▽^*)",
    "(＾∇＾)",
    "(≧∇≦)",
    "(´∀｀)",
    "(＾◇＾)",
    "(≧◇≦)",
    "(*≧▽≦*)",
    "(＾∀＾*)",
    "(≧∀≦*)",
    "ヽ(≧∀≦)ﾉ",
    "(＾▽＾*)",
    "(*´∀｀*)",
    "(≧▽≦)/",
    "ヾ(≧∀≦)ﾉ",
    "(＾ω＾*)",
    "(*≧ω≦*)",
    "(≧∪≦)",
    "(＾∪＾)",
    "(≧ヘ≦)",
    "(*≧ヘ≦*)",
    "(＾ヘ＾)",
    "(≧□≦)",
    "(*≧□≦*)",
  ]),
  list("sleep-kaomojis", "sleep", "sleep kaomoji", [
    "(－_－) zzZ",
    "(－.－)...zzz",
    "(－ω－) zzZ",
    "(－.-) zZ",
    "(－o－) zzZ",
    "(ᵕ≀　≀ᵕ) zzz",
    "(-_-) zZz",
    "(∪｡∪) zzz",
    "(－_－)…zzzZZ",
    "(－.－) zzZ",
    "(－ω－)...zzz",
    "(－_－) Zzz",
    "(－.-)...zzz",
    "(－o－)...zzz",
    "(－_－) zzZ…",
    "(－.－) zzz",
    "(－ω－) zZ",
    "(－_－) zZ",
    "(－.-) Zzz",
    "(－o－) zZ",
    "(－_－)...zzz",
    "(－.－)…zzz",
    "(－ω－) Zzz",
    "(－_－) Zzz",
    "(－.-) zzz",
    "(－o－) Zzz",
    "(－_－)…Zzz",
    "(－.－) Zzz",
    "(－ω－)…zzz",
    "(－_－) zzZzz",
  ]),
  list("wink-kaomojis", "wink", "wink kaomoji", [
    "(^_-)",
    "(^_~)",
    "(^ω~)",
    "(^ω^)",
    "(^u^)",
    "(^‿^)",
    "(^◡^)",
    "(^∀^)",
    "(^▽^)",
    "(^∇^)",
    "(^◇^)",
    "(^ω^)♪",
    "(^_-)☆",
    "(^_~)♡",
    "(^ω~)♪",
    "(^‿^)ノ",
    "(^◡^)ノ",
    "(^∀^)ノ",
    "(^▽^)ノ",
    "(^∇^)ノ",
    "(^◇^)ノ",
    "(^_-)ノ",
    "(^_~)ノ",
    "(^ω^)ノ",
    "(^u^)ノ",
    "(^‿^)☆",
    "(^◡^)♡",
    "(^∀^)♪",
    "(^▽^)✧",
    "(^∇^)～",
  ]),
  list("bunny-kaomojis", "bunny", "bunny kaomoji", [
    "／( ・×・)＼",
    "／(≧ x ≦)＼",
    "(=\\(=^･^=)/=)",
    "(\\(=^･^=)/)",
    "U・x・U",
    "（・⊖・）",
    "／(；･ω･)／",
    "／(≧▽≦)＼",
    "／(≧ω≦)＼",
    "／(≧∀≦)＼",
    "(\\(●●)ノ",
    "(\\(≧∇≦)/)",
    "(\\(≧ω≦)/)",
    "(\\(≧∀≦)/)",
    "／(◕ x ◕)＼",
    "／(◕ω◕)＼",
    "／(◕‿◕)＼",
    "／(◕∀◕)＼",
    "(\\(・x・)/)",
    "(\\(・ω・)/)",
    "(\\(・∀・)/)",
    "／(・×・)／",
    "／(・ω・)／",
    "(\\(≧∇≦)ゞ",
    "(\\(≧ω≦)ゞ",
    "U・ェ・U",
    "U・∀・U",
    "／(≧ヘ≦)＼",
    "(\\(◕ᴥ◕)/)",
    "(\\(◕∀◕)ゞ",
  ]),
];

for (const entry of KAOMOJI_LISTS) {
  const unique = KAOMOJI_UNIQUE_COPY[entry.slug];
  if (!unique) continue;
  if (unique.title) entry.title = unique.title;
  entry.description = unique.description;
  entry.meanings = unique.meanings;
  entry.faq = unique.faq;
  if (unique.ogSubtitle) entry.ogSubtitle = unique.ogSubtitle;
  if (unique.meaningsHeading) entry.meaningsHeading = unique.meaningsHeading;
  if (unique.howToHeading) entry.howToHeading = unique.howToHeading;
  if (unique.howToSteps) entry.howToSteps = unique.howToSteps;
  if (unique.mobileNote) entry.mobileNote = unique.mobileNote;
  if (unique.extraSections) entry.extraSections = unique.extraSections;
  if (unique.canonicalLead) entry.canonicalLead = unique.canonicalLead;
  if (unique.whereHeading) entry.whereHeading = unique.whereHeading;
  if (unique.whereBullets) entry.whereBullets = unique.whereBullets;
}

export const SPECIAL_KAOMOJI: KaomojiList[] = [
  {
    slug: "lenny-face",
    emotion: "lenny",
    primaryKeyword: "lenny face",
    title: "Lenny Face Copy and Paste ( ͡° ͜ʖ ͡°) | FancifyText",
    description:
      "Copy the classic Lenny face and variants. Free ( ͡° ͜ʖ ͡°) emoticons for Discord, Reddit, and chat.",
    h1: "Lenny Face",
    fellowKeywords: ["lenny face copy paste", "lenny emoticon", "( ͡° ͜ʖ ͡°)"],
    meanings:
      "Use Lenny face when you want dry humor or a knowing meme beat. It is common on Reddit, Discord, and forums. Keep it for jokes—avoid overusing it in professional messages.",
    faces: [
      "( ͡° ͜ʖ ͡°)",
      "( ͡~ ͜ʖ ͡°)",
      "( ͡° ʖ̯ ͡°)",
      "( ͡◉ ͜ʖ ͡◉)",
      "( ͡°╭͜ʖ╮͡° )",
      "( ͡ᵔ ͜ʖ ͡ᵔ )",
      "( ͡° ل͜ ͡°)",
      "ᕦ( ͡° ͜ʖ ͡°)ᕤ",
      "( ͡☉ ͜ʖ ͡☉)",
      "( ͡° ͜ʖ ͡°)つ━━✫・*。",
      "( ͠° ͟ʖ ͡°)",
      "( ͡° ͜ʖ ͡°)╯︵ ┻━┻",
      "┬─┬ノ( ͡° ͜ʖ ͡°ノ)",
      "( ͡° ͜ʖ ͡°)つ✂",
      "ᕙ( ͡° ͜ʖ ͡°)ᕗ",
      "( ͡° ͜ʖ ͡°)╭∩╮",
      "( ͡° ͜ʖ ͡°)つ──☆*:・ﾟ",
      "( ͡ᵔ ͜ʖ ͡ᵔ )",
      "( ͡◉ ͜ʖ ͡◉)",
      "( ͡° ʖ̯ ͡°)",
      "( ͡ ͜ʖ ͡°)",
      "( ͡° ͜ʖ ͡°)っ✂",
      "ᕦʕ ͡° ͜ʖ ͡°ʔᕤ",
      "( ͡° ͜ʖ ͡°)ﾉ",
      "( ͡° ل͜ ͡°)☆",
      "( ͡° ͜ʖ ͡°)━☆ﾟ.*･｡ﾟ",
      "( ͡° ͜ʖ ͡° )",
      "( ͡ಠ ʖ̯ ͡ಠ)",
      "( ͡° ͜ʖ ͡°)つ",
      "( ͡° ͜ʖ ͡°)━☆",
    ],
    faq: [
      {
        question: "What is the Lenny face?",
        answer:
          "The Lenny face is the emoticon ( ͡° ͜ʖ ͡°), used to imply sarcasm, mischief, or knowing humor online.",
      },
      {
        question: "How do I copy Lenny face?",
        answer:
          "Tap any Lenny variant below to copy it, then paste into Discord, Reddit, Instagram, or any chat that supports Unicode.",
      },
      {
        question: "Does Lenny face work on mobile?",
        answer:
          "Yes. It is plain Unicode text, so it pastes into most mobile apps without special fonts.",
      },
      {
        question: "Where did Lenny face come from?",
        answer:
          "It became popular on forums and imageboards as a shorthand for a suggestive or sarcastic reaction.",
      },
      {
        question: "When should I use Lenny face?",
        answer:
          "Best for jokes, memes, and casual chats. Skip it in formal or work messages where sarcasm can be misread.",
      },
    ],
  },
  {
    slug: "shrug-emoticon",
    emotion: "shrug",
    primaryKeyword: "shrug emoticon",
    title: "Shrug Emoticon Copy and Paste ¯\\_(ツ)_/¯ | FancifyText",
    description:
      "Copy the shrug emoticon ¯\\_(ツ)_/¯ and variants. Free shrug text faces for chat and social media.",
    h1: "Shrug Emoticon",
    fellowKeywords: ["shrug face", "shrug emoji text", "idk emoticon"],
    meanings:
      "Use the shrug emoticon when you mean “I don’t know,” “whatever,” or “not my problem.” It is a friendly way to show uncertainty without writing a full sentence.",
    faces: [
      "¯\\_(ツ)_/¯",
      "┐(´д｀)┌",
      "¯\\_(⊙_ʖ⊙)_/¯",
      "┐(￣ヘ￣)┌",
      "¯\\_(ツ)_/¯☆",
      "┐( ˘_˘ )┌",
      "╮(╯_╰)╭",
      "¯\\_(⊙︿⊙)_/¯",
      "┐(シ)┌",
      "¯\\_(ツ)_/¯♡",
      "┐(´∀｀)┌",
      "¯\\_(ツ)_/¯♪",
      "╮(＾▽＾)╭",
      "┐(´д`)┌",
      "¯\\_(ツ)_/¯✧",
      "┐(・。・;)┌",
      "╮(╯∀╰)╭",
      "┐(´～｀；)┌",
      "╮(￣▽￣)╭",
      "¯\\_(⊙_⊙)_/¯",
      "┐(´ー｀)┌",
      "╮(･ᴗ･｡)╭",
      "¯\\(°_o)/¯",
      "┐(ﾟ～ﾟ)┌",
      "¯\\_(ツ)_/¯!",
      "╮(─▽─)╭",
      "┐(￣ヮ￣)┌",
      "¯\\_(ツ)_/¯…",
      "┐(・ω・)┌",
      "╮(︶︿︶)╭",
    ],
    faq: [
      {
        question: "What is the shrug emoticon?",
        answer:
          "The shrug emoticon ¯\\_(ツ)_/¯ means “I don’t know” or “whatever.” It is a text face made of Unicode characters.",
      },
      {
        question: "How do I type shrug face?",
        answer:
          "Easiest way: copy ¯\\_(ツ)_/¯ from this page and paste it. You can also use system emoji pickers that include a shrug emoji.",
      },
      {
        question: "Does the shrug emoticon work on Discord?",
        answer:
          "Yes. Paste it into Discord messages, nicknames, or statuses. Some clients also have a shrug emoji shortcut.",
      },
      {
        question: "Is shrug the same as a shrug emoji?",
        answer:
          "The shrug emoticon is a text face. The shrug emoji (🤷) is a separate emoji character—both express uncertainty.",
      },
      {
        question: "When should I use the shrug emoticon?",
        answer:
          "Use it for light uncertainty, jokes, or “idk” replies. Prefer clearer words when the answer matters.",
      },
    ],
  },
];

for (const entry of SPECIAL_KAOMOJI) {
  const unique = KAOMOJI_UNIQUE_COPY[entry.slug];
  if (!unique) continue;
  if (unique.title) entry.title = unique.title;
  entry.description = unique.description;
  entry.meanings = unique.meanings;
  entry.faq = unique.faq;
  if (unique.ogSubtitle) entry.ogSubtitle = unique.ogSubtitle;
  if (unique.meaningsHeading) entry.meaningsHeading = unique.meaningsHeading;
  if (unique.howToHeading) entry.howToHeading = unique.howToHeading;
  if (unique.howToSteps) entry.howToSteps = unique.howToSteps;
  if (unique.mobileNote) entry.mobileNote = unique.mobileNote;
  if (unique.extraSections) entry.extraSections = unique.extraSections;
  if (unique.canonicalLead) entry.canonicalLead = unique.canonicalLead;
  if (unique.whereHeading) entry.whereHeading = unique.whereHeading;
  if (unique.whereBullets) entry.whereBullets = unique.whereBullets;
}

export function kaomojiOgSubtitle(slug: string): string | undefined {
  if (isKaomojiHubSlug(slug))
    return getKaomojiHubSerpForMetadata(slug).ogSubtitle;
  const list = getKaomojiList(slug);
  return list?.ogSubtitle;
}

export const ALL_KAOMOJI_PAGES: KaomojiList[] = [
  ...KAOMOJI_LISTS,
  ...SPECIAL_KAOMOJI,
];

export const KAOMOJI_BY_SLUG = Object.fromEntries(
  ALL_KAOMOJI_PAGES.map((k) => [k.slug, k]),
) as Record<string, KaomojiList>;

export function getKaomojiList(slug: string): KaomojiList | undefined {
  return KAOMOJI_BY_SLUG[slug];
}

export const KAOMOJI_SLUGS = ALL_KAOMOJI_PAGES.map((k) => k.slug);

/**
 * Canonical kaomoji URLs that stay indexable.
 * Hub + core moods (cute, cry, heart) + Lenny/shrug + topic spokes (hand, star,
 * mini dot art, Carrd dividers). Each spoke owns a distinct primary keyword so
 * it does not compete with the hub or with cute/heart lists. Other emotion URLs
 * stay live for old links but are noindex + sitemap-dropped.
 */
export const INDEXABLE_KAOMOJI_SLUGS = new Set([
  "cute-kaomojis",
  "cry-kaomojis",
  "heart-kaomojis",
  "lenny-face",
  "shrug-emoticon",
  "hand-kaomojis",
  "star-kaomojis",
  "kaomoji-dot-art",
  "carrd-kaomojis",
]);

/** Layout / body-part lists—distinct from mood animals (cat, bear) and cute/heart. */
export const KAOMOJI_TOPIC_SPOKE_SLUGS = new Set([
  "hand-kaomojis",
  "star-kaomojis",
  "kaomoji-dot-art",
  "carrd-kaomojis",
]);

export function isKaomojiTopicSpoke(slug: string): boolean {
  return KAOMOJI_TOPIC_SPOKE_SLUGS.has(slug);
}

export type KaomojiHubJump = {
  label: string;
  href: string;
  keywords: string[];
  /** Noindex browse list — shown in hub finder, not sitemap. */
  browseOnly?: boolean;
};

/** Keyword → list links for the hub filter (client-side, no API). */
export function getKaomojiHubJumps(): KaomojiHubJump[] {
  const jumps: KaomojiHubJump[] = [];

  for (const slug of INDEXABLE_KAOMOJI_SLUGS) {
    const page = getKaomojiList(slug);
    if (!page) continue;
    jumps.push({
      label: page.h1,
      href: `/${page.slug}/`,
      keywords: [
        page.primaryKeyword,
        page.emotion,
        page.slug.replace(/-/g, " "),
        ...page.fellowKeywords,
      ].map((k) => k.toLowerCase()),
    });
  }

  const browseSlugs = [
    "cat-kaomojis",
    "bunny-kaomojis",
    "music-kaomojis",
    "sleep-kaomojis",
    "happy-kaomojis",
    "wink-kaomojis",
    "angry-kaomojis",
    "sad-kaomojis",
  ] as const;
  for (const slug of browseSlugs) {
    const page = getKaomojiList(slug);
    if (!page) continue;
    jumps.push({
      label: page.h1,
      href: `/${page.slug}/`,
      browseOnly: true,
      keywords: [
        page.primaryKeyword,
        page.emotion,
        page.slug.replace(/-/g, " "),
        ...page.fellowKeywords,
      ].map((k) => k.toLowerCase()),
    });
  }

  return jumps;
}

/**
 * Indexable kaomoji URLs — one search hub (/kaomoji/) plus mood/Lenny/shrug spokes.
 * /kamoji/ and /kaomojis/ stay live for users but are noindex + canonical to the hub.
 */
export function kaomojiPathIsIndexable(urlOrSlug: string): boolean {
  const slug = urlOrSlug.replace(/^\/|\/$/g, "");
  if (slug === "kaomoji") return true;
  if (slug === "kamoji" || slug === "kaomojis") return false;
  if (!KAOMOJI_BY_SLUG[slug]) return true;
  return INDEXABLE_KAOMOJI_SLUGS.has(slug);
}

export function kaomojiHubCanonicalPath(slug: string): string | undefined {
  if (slug === "kamoji" || slug === "kaomojis") return "/kaomoji/";
  return undefined;
}

/** Picture emoji for users who expected the phone keyboard — tap to copy like kaomoji. */
export const POPULAR_CHAT_EMOJI = [
  "😀",
  "😂",
  "❤️",
  "🔥",
  "✨",
  "👍",
  "🎉",
  "😭",
  "🥺",
  "💀",
  "🙏",
  "😊",
  "🥰",
  "💕",
  "⭐",
  "✅",
  "❌",
  "👀",
  "🫡",
  "😎",
  "🤔",
  "😡",
  "🎵",
  "💯",
];

export function getKaomojiCatalogStats(): {
  uniqueFaces: number;
  listCount: number;
} {
  const seen = new Set<string>();
  for (const page of ALL_KAOMOJI_PAGES) {
    for (const face of page.faces) seen.add(face);
  }
  return { uniqueFaces: seen.size, listCount: ALL_KAOMOJI_PAGES.length };
}

/** Rounded face count for SERP titles (853 unique → "850+"). */
export function getKaomojiCatalogPublicClaim(): string {
  const { uniqueFaces } = getKaomojiCatalogStats();
  return `${Math.floor(uniqueFaces / 10) * 10}+`;
}

function withCatalogClaim(text: string, claim: string): string {
  return text.replace(/\d+\+/g, claim);
}

/** Hub SERP with live catalog count substituted into title/description. */
export function getKaomojiHubSerpForMetadata(slug: KaomojiHubSlug) {
  const bundle = getKaomojiHubSerp(slug);
  const claim = getKaomojiCatalogPublicClaim();
  return {
    ...bundle,
    title: withCatalogClaim(bundle.title, claim),
    description: withCatalogClaim(bundle.description, claim),
    ogSubtitle: withCatalogClaim(bundle.ogSubtitle, claim),
  };
}

export function getFeaturedKaomojiLists(): KaomojiList[] {
  return ALL_KAOMOJI_PAGES.filter((k) => INDEXABLE_KAOMOJI_SLUGS.has(k.slug));
}

export function getTailKaomojiLists(): KaomojiList[] {
  return ALL_KAOMOJI_PAGES.filter((k) => !INDEXABLE_KAOMOJI_SLUGS.has(k.slug));
}

/** Hub showcase: featured emotions first, then remaining lists. */
export function getHubShowcase(): { emotion: string; href: string; sample: string }[] {
  const featured = KAOMOJI_LISTS.filter((k) => INDEXABLE_KAOMOJI_SLUGS.has(k.slug));
  const rest = KAOMOJI_LISTS.filter((k) => !INDEXABLE_KAOMOJI_SLUGS.has(k.slug));
  return [...featured, ...rest].map((k) => ({
    emotion: k.emotion,
    href: `/${k.slug}/`,
    sample: k.faces[0] ?? "",
  }));
}

/** Mixed popular faces for the hub so visitors can copy without leaving. */
export function getHubFaces(limit = 96): string[] {
  const seen = new Set<string>();
  const out: string[] = [];

  const pushFrom = (pages: KaomojiList[], maxPerList: number) => {
    for (const page of pages) {
      for (const face of page.faces.slice(0, maxPerList)) {
        if (seen.has(face)) continue;
        seen.add(face);
        out.push(face);
        if (out.length >= limit) return;
      }
    }
  };

  const tail = ALL_KAOMOJI_PAGES.filter((k) => !INDEXABLE_KAOMOJI_SLUGS.has(k.slug));
  const featured = ALL_KAOMOJI_PAGES.filter((k) =>
    INDEXABLE_KAOMOJI_SLUGS.has(k.slug),
  );

  // Prefer noindex / tail lists so the hub does not mirror indexed mood pages.
  pushFrom(tail, 4);
  if (out.length < limit) pushFrom(featured, 2);

  return out;
}

export type KaomojiMeaning = {
  face: string;
  name: string;
  meaning: string;
};

/**
 * The faces people actually search by name, with what each one signals.
 * Hub-only content: mood pages explain their own set in `meanings`.
 */
export const KAOMOJI_MEANINGS: KaomojiMeaning[] = [
  {
    face: "¯\\_(ツ)_/¯",
    name: "Shrug",
    meaning:
      "“I don’t know” or “whatever.” Softens a non-answer without sounding rude.",
  },
  {
    face: "( ͡° ͜ʖ ͡°)",
    name: "Lenny face",
    meaning:
      "Knowing smirk for memes and dry humor. Keep it in casual chats—not work messages.",
  },
  {
    face: "(╯°□°）╯︵ ┻━┻",
    name: "Table flip",
    meaning:
      "Comic rage or giving up. Long, so it fails most nickname fields—use it in messages.",
  },
  {
    face: "┬─┬ノ( º _ ºノ)",
    name: "Table unflip",
    meaning:
      "The calm reply to a table flip: “put it back.” Usually sent as a follow-up joke.",
  },
  {
    face: "ಠ_ಠ",
    name: "Look of disapproval",
    meaning:
      "Skeptical staring. Short enough for nicknames and reads as deadpan judgment.",
  },
  {
    face: "(づ｡◕‿‿◕｡)づ",
    name: "Hug",
    meaning:
      "Offering comfort or affection. Common reply to bad news in friend servers.",
  },
  {
    face: "(◕‿◕)",
    name: "Cute smile",
    meaning:
      "Plain friendly warmth. The safest kaomoji for bios because it is short and widely supported.",
  },
  {
    face: "(T_T)",
    name: "Crying",
    meaning:
      "Sad or overwhelmed. Doubles as playful “I’m dying” when the tone is light.",
  },
  {
    face: "(ノ_<。)",
    name: "Wiping tears",
    meaning: "Softer crying—disappointed rather than devastated.",
  },
  {
    face: "(*≧ω≦*)",
    name: "Excited / squealing",
    meaning: "Hype and delight. Fits fandom replies and good-news reactions.",
  },
  {
    face: "(¬‿¬)",
    name: "Smug",
    meaning: "Teasing confidence—“told you so” without typing it.",
  },
  {
    face: "(⁄ ⁄•⁄ω⁄•⁄ ⁄)",
    name: "Blushing / shy",
    meaning: "Flustered or embarrassed. Popular in flirty and soft-aesthetic bios.",
  },
  {
    face: "ʕ•ᴥ•ʔ",
    name: "Bear",
    meaning:
      "Cozy animal face. The ʕ ʔ are ears and ᴥ is the snout—widely copied for cute names.",
  },
  {
    face: "(=^･ω･^=)",
    name: "Cat",
    meaning: "Playful feline. Works as a signature in chats and group titles.",
  },
  {
    face: "(*・ω・)ﻭ",
    name: "Thumbs up / cheer",
    meaning: "Encouragement—“you got this.” Reads friendlier than a plain 👍.",
  },
  {
    face: "(；一_一)",
    name: "Unimpressed",
    meaning: "Tired resignation. Good for “again?” moments without complaining.",
  },
  {
    face: "m(_ _)m",
    name: "Thank-you bow",
    meaning:
      "Polite gratitude—the text version of a small bow. Common after help in Discord or forums.",
  },
  {
    face: "(╥_╥)",
    name: "Tearing up",
    meaning:
      "Crying with visible tears. Dramatic but still short enough for most chats.",
  },
  {
    face: "(・・？)",
    name: "Confused",
    meaning:
      "Puzzled “huh?”—tilted eyes and a question mark. Lighter than a full shocked mouth.",
  },
  {
    face: "(♡ω♡)",
    name: "Heart eyes",
    meaning:
      "Love or excitement with hearts in the face. Softer than kiss marks for public comments.",
  },
  {
    face: "┐(´д｀)┌",
    name: "Arms-up shrug",
    meaning:
      "Japanese-style shrug—hands raised instead of ¯\\_(ツ)_/¯. Same “idk” energy, different look.",
  },
  {
    face: "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧",
    name: "Sparkle hype",
    meaning:
      "Celebration or fandom excitement. Long—use in messages, not nicknames.",
  },
  {
    face: "(｡•́︿•̀｡)",
    name: "Quiet sad",
    meaning:
      "Disappointed or pouty without big tears. Between cute and sad lists.",
  },
];

export type HubMoodCopySet = {
  slug: string;
  h1: string;
  faces: string[];
};

/**
 * Extra copy grids on the hub only for moods that stay noindex.
 * Indexable lists (cute, cry, heart, Lenny, shrug) link out via cards so
 * they do not compete with their own URLs in search.
 */
export function getHubMoodCopySets(perList = 12): HubMoodCopySet[] {
  const slugs = ["funny-kaomojis", "cat-kaomojis", "angry-kaomojis", "thank-you-kaomojis"];
  const sets: HubMoodCopySet[] = [];
  for (const slug of slugs) {
    const list = getKaomojiList(slug);
    if (!list) continue;
    sets.push({
      slug: list.slug,
      h1: list.h1,
      faces: list.faces.slice(0, perList),
    });
  }
  return sets;
}
