/**
 * Multiline kaomoji / mini ASCII blocks by mood (angry, happy, sad, cry, etc.).
 * Full matrix lives on /multiline-kaomojis/ only; other URLs get editorial highlights.
 */

import { multilineHighlightLimitForSlug } from "@/data/kaomoji-catalog-policy";

function dedupeFaces(faces: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const face of faces) {
    const normalized = face.replace(/\r\n/g, "\n").trimEnd();
    if (seen.has(normalized)) continue;
    seen.add(normalized);
    out.push(normalized);
  }
  return out;
}

function buildAngry(): string[] {
  const flipTops = [
    "(╯°□°）╯︵",
    "(╯°益°）╯︵",
    "(ノ`Д´)ノ",
    "(ノ=`Д´)ノ",
    "ヽ(`⌒´メ)ノ",
    "(ง •̀_•́)ง",
    "(╬`益´)",
    "凸(`△´＋)",
  ];
  const tables = ["┻━┻", "  ┻━┻", "━━━┻━┻", "┻━━┻", "╰（‵□′）╯︵ ┻━┻"];
  const out: string[] = [];
  for (const top of flipTops) {
    for (const table of tables) {
      out.push(`${top}\n${table}`);
    }
  }
  const banners = ["  ┏━┓", " ╔══╗", "【怒】", "  MAD", "  (╬)", "  ｀Д´!!"];
  const rageFaces = [
    "(╬ Ò﹏Ó)",
    "(`ε´)",
    "(｀Д´*)",
    "(╬`益´)",
    "щ(ºДºщ)",
    "(｀⌒´メ)",
    "٩(๑`^´๑)۶",
  ];
  for (const banner of banners) {
    for (const face of rageFaces) {
      out.push(`${banner}\n${face}`);
      out.push(`${banner}\n${face}\n┻━┻`);
    }
  }
  const glares = ["  ಠ_ಠ", " (¬_¬)", " (눈_눈)", " (⇀‸↼‶)"];
  const actions = ["  ……", "  ┻━┻", "  凸", "  (ノ#`Д´)ノ"];
  for (const g of glares) {
    for (const a of actions) {
      out.push(`${g}\n${a}`);
    }
  }
  return out;
}

function buildHappy(): string[] {
  const tops = ["  ♪", "  ☆", "  ✧", "  ♡", "  \\   /", "  * ･", "  ～"];
  const faces = [
    "(≧▽≦)",
    "(＾▽＾)",
    "(´∀`)",
    "(≧ω≦)",
    "(＾ω＾)",
    "(ﾉ◕ヮ◕)ﾉ",
    "＼(^o^)／",
    "(^人^)",
    "(≧∇≦)",
  ];
  const bottoms = ["  ／", "  ✧｡", "  ♪～", "  \\(^o^)/", "  ヽ(´▽`)/", ""];
  const out: string[] = [];
  for (const top of tops) {
    for (const face of faces) {
      for (const bottom of bottoms) {
        const lines = [top, face];
        if (bottom) lines.push(bottom);
        out.push(lines.join("\n"));
      }
    }
  }
  const duos = [
    "  ( ´ ▽ ` )",
    " ( ´ ▽ ` )ﾉ",
    "   ♪( ´▽` )人( ´▽` )♪",
  ];
  for (const line of duos) {
    out.push(`  ☆\n${line}\n  ☆`);
    out.push(`  ♡\n${line}`);
  }
  return out;
}

function buildSad(): string[] {
  const clouds = ["  ...", "  ,,,", "  ···", "  ~~~", "  .·´"];
  const faces = [
    "(个_个)",
    "(T_T)",
    "(╥_╥)",
    "(;ω;)",
    "(´；ω；`)",
    "(っ˘̩╭╮˘̩)っ",
    "(´･_･`)",
    "(｡•́︿•̀｡)",
  ];
  const tears = ['  """', "  ~~~", "  ,,,", "  ···", "  (tear)"];
  const out: string[] = [];
  for (const c of clouds) {
    for (const f of faces) {
      for (const t of tears) {
        out.push(`${c}\n${f}\n${t}`);
      }
    }
  }
  const rain = ["   .", "  . .", " . . ."];
  for (const r of rain) {
    for (const f of ["(个_个)", "(T_T)", "(;_;)"]) {
      out.push(`${r}\n${f}`);
    }
  }
  return out;
}

function buildCry(): string[] {
  const out = buildSad();
  const extraFaces = ["(T_T)", "(╥_╥)", "(;´༎ຶД༎ຶ`)", "(っ-﹏-c)", "(´；д；`)"];
  const streams = ["  ~~~", '  """', "  ╥╥", "  ,,,"];
  for (const f of extraFaces) {
    for (const s of streams) {
      out.push(`${f}\n${s}\n${s}`);
      out.push(`  ,,\n${f}\n${s}`);
    }
  }
  return out;
}

function buildFunny(): string[] {
  const tops = ["  lol", "  wkwk", "  (y)", "  →", "  ｗ"];
  const faces = [
    "(≧▽≦)",
    "(＾∀＾)",
    "(≧∀≦)",
    "(´∀`)",
    "(≧∇≦)",
    "┐(´д`)┌",
    "¯\\_(ツ)_/¯",
  ];
  const out: string[] = [];
  for (const top of tops) {
    for (const face of faces) {
      out.push(`${top}\n${face}`);
    }
  }
  out.push("( ͡° ͜ʖ ͡°)\n  …\n┬─┬ノ( º _ ºノ)");
  out.push("  (≧∀≦)\n   ｲﾔｯ\n  (≧∀≦)");
  return out;
}

function buildExcited(): string[] {
  const spark = ["  ✧", "  ★", "  ♪", "  ‼", "  !!"];
  const faces = [
    "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧",
    "＼(^o^)／",
    "ヾ(≧▽≦)ノ",
    "(≧∇≦)",
    "(≧Д≦)",
    "ヽ(>∀<)ﾉ",
  ];
  const out: string[] = [];
  for (const s of spark) {
    for (const f of faces) {
      out.push(`${s}\n${f}\n${s}`);
    }
  }
  return out;
}

function buildShy(): string[] {
  const blush = ["  //", "  ////", "  (*////*)", "  …"];
  const faces = [
    "(*/ω＼*)",
    "(//▽//)",
    "(*/∇＼*)",
    "(⁄ ⁄>⁄ ▽ ⁄<⁄ ⁄)",
    "(//ω//)",
    "(*/ω＼*)",
  ];
  const out: string[] = [];
  for (const b of blush) {
    for (const f of faces) {
      out.push(`${b}\n${f}`);
    }
  }
  return out;
}

function buildSleep(): string[] {
  const zzz = ["  zzz", "  Zzz", "  zzZ", "  …zzZ", "  -.-"];
  const faces = [
    "(－_－) zzZ",
    "(－ω－) zzZ",
    "(ᴗ_ᴗ)",
    "(－.－)",
    "(ᵕ≀　≀ᵕ) zzz",
    "(∪･ω･∪)",
  ];
  const out: string[] = [];
  for (const z of zzz) {
    for (const f of faces) {
      out.push(`${z}\n${f}`);
    }
  }
  return out;
}

function buildWink(): string[] {
  const lines = ["  ~", "  ♪", "  ;)", "  ✧"];
  const faces = ["(^_-) ", "(^_-)☆", "(^ω~)", "(^_<)", "(>ω^)", "(^‿^)"];
  const out: string[] = [];
  for (const l of lines) {
    for (const f of faces) {
      out.push(`${l}\n${f}`);
    }
  }
  return out;
}

function buildKiss(): string[] {
  const hearts = ["  ♡", "  ♥", "  ~♡", "  *"];
  const faces = [
    "( ˘ ³˘)♥",
    "(´ε｀ )♡",
    "( ˘з˘)♡",
    "(*¯ ³¯*)♡",
    "(っ˘з(˘⌣˘ )♡",
    "( ˘ω˘ )♡",
  ];
  const out: string[] = [];
  for (const h of hearts) {
    for (const f of faces) {
      out.push(`${h}\n${f}\n${h}`);
    }
  }
  return out;
}

function buildHug(): string[] {
  const arms = ["  (づ", "  ⊂(", "  (つ", "  づ"];
  const mids = ["(づ｡◕‿◕｡)づ", "(つ≧▽≦)つ", "(づ￣ ³￣)づ", "(⊃｡•́‿•̀｡)⊃"];
  const ends = ["  )", "  )♡", "  )～", "  )っ"];
  const out: string[] = [];
  for (const a of arms) {
    for (const m of mids) {
      for (const e of ends) {
        out.push(`${a}\n${m}\n${e}`);
      }
    }
  }
  return out;
}

function buildThankYou(): string[] {
  const bows = ["  m(_ _)m", "  m(._.)m", "  （人_ _)ﾉ", "  o(_ _)o"];
  const thanks = ["  ありがと", "  thank you", "  thx", "  ♡"];
  const out: string[] = [];
  for (const b of bows) {
    for (const t of thanks) {
      out.push(`${b}\n${t}`);
    }
  }
  return out;
}

function buildConfused(): string[] {
  const qs = ["  ?", "  ??", "  ???", "  (?) ", "  …?"];
  const faces = ["(・・)?", "(・_・)?", "(⊙_☉)", "(´･_･`)", "(・・;)?", "(￣ω￣;)"];
  const out: string[] = [];
  for (const q of qs) {
    for (const f of faces) {
      out.push(`${q}\n${f}`);
    }
  }
  return out;
}

function buildEvil(): string[] {
  const aura = ["  …", "  ━", "  ╰", "  邪"];
  const faces = ["(∀｀∈)", "(｀∀´)", "(￣ω￣)", "(≖‿≖)", "( ｀ω´)", "(σ｀д′)σ"];
  const out: string[] = [];
  for (const a of aura) {
    for (const f of faces) {
      out.push(`${a}\n${f}`);
    }
  }
  return out;
}

function buildMusic(): string[] {
  const notes = ["  ♪", "  ♫", "  ♬", "  ♩", "  ~♪"];
  const faces = [
    "♪(´ε｀ )",
    "♪(´▽｀)",
    "♪(´∀｀)",
    "(ﾉ◕ヮ◕)ﾉ*:･ﾟ♪",
    "♪(´ε｀ )♡",
  ];
  const out: string[] = [];
  for (const n of notes) {
    for (const f of faces) {
      out.push(`${n}\n${f}\n${n}`);
    }
  }
  return out;
}

function buildProud(): string[] {
  const flex = ["  ＼＼", "  ᕦ", "  ୧", "  ドヤ"];
  const faces = ["(￣ー￣)", "( ｀ー´)", "( ｀ｪ´)", "( ｀ｖ´)", "( ｀ω´)", "ᕦ(ò_ó)ᕤ"];
  const out: string[] = [];
  for (const fl of flex) {
    for (const f of faces) {
      out.push(`${fl}\n${f}`);
    }
  }
  return out;
}

function buildThinking(): string[] {
  const hmm = ["  hmm", "  …", "  🤔", "  (thinking)"];
  const faces = ["(・・ )?", "(´･_･`)", "(￣ヘ￣)", "( ˘•ω•˘ )", "(・_・;)", "(；・ω・)"];
  const out: string[] = [];
  for (const h of hmm) {
    for (const f of faces) {
      out.push(`${h}\n${f}`);
    }
  }
  return out;
}

function buildDrool(): string[] {
  const drip = ["  ~", "  …", "  🤤", "  ヨダ"];
  const faces = ["(¯﹃¯)", "(´～`)", "(～o～)", "(´∀`)", "(≧∇≦)", "(◡ ω ◡)"];
  const out: string[] = [];
  for (const d of drip) {
    for (const f of faces) {
      out.push(`${d}\n${f}`);
    }
  }
  return out;
}

function buildBlush(): string[] {
  return buildShy();
}

function buildCute(): string[] {
  const decor = ["  ♡", "  ✧", "  ☆", "  …", "  //"];
  const faces = [
    "(｡◕‿◕｡)",
    "(⁄ ⁄>⁄ ▽ ⁄<⁄ ⁄)",
    "(✿◠‿◠)",
    "(◕‿◕)",
    "(｡•̀ᴗ-)✧",
    "( ´ ▽ ` )",
  ];
  const out: string[] = [];
  for (const d of decor) {
    for (const f of faces) {
      out.push(`${d}\n${f}`);
    }
  }
  return out;
}

function buildHeart(): string[] {
  const hearts = ["  ♡", "  ♡♡", "  ♥", "  ～♡", "  ♡～"];
  const faces = [
    "(♡ω♡)",
    "(´ε｀ )♡",
    "♡(˃͈ દ ˂͈ ༶ )",
    "ヽ(♡‿♡)ノ",
    "(♡˙︶˙♡)",
    "( ˘з˘)♡",
  ];
  const out: string[] = [];
  for (const h of hearts) {
    for (const f of faces) {
      out.push(`${h}\n${f}\n${h}`);
    }
  }
  return out;
}

function buildHand(): string[] {
  const cheer = ["  \\", "  ／", "  ＼", "  ☆"];
  const faces = [
    "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧",
    "＼(^o^)／",
    "ヾ(≧▽≦)ノ",
    "(ﾉ´ヮ`)ﾉ*: ･ﾟ",
    "ヽ(´▽`)/",
  ];
  const out: string[] = [];
  for (const c of cheer) {
    for (const f of faces) {
      out.push(`${c}\n${f}\n${c}`);
    }
  }
  return out;
}

const BUILDERS: Record<string, () => string[]> = {
  "angry-kaomojis": buildAngry,
  "happy-kaomojis": buildHappy,
  "sad-kaomojis": buildSad,
  "cry-kaomojis": buildCry,
  "funny-kaomojis": buildFunny,
  "excited-kaomojis": buildExcited,
  "shy-kaomojis": buildShy,
  "sleep-kaomojis": buildSleep,
  "wink-kaomojis": buildWink,
  "kiss-kaomojis": buildKiss,
  "hug-kaomojis": buildHug,
  "thank-you-kaomojis": buildThankYou,
  "confused-kaomojis": buildConfused,
  "evil-kaomojis": buildEvil,
  "music-kaomojis": buildMusic,
  "proud-kaomojis": buildProud,
  "thinking-kaomojis": buildThinking,
  "drool-kaomojis": buildDrool,
  "blush-kaomojis": buildBlush,
  "cute-kaomojis": buildCute,
  "heart-kaomojis": buildHeart,
  "hand-kaomojis": buildHand,
};

export const MULTILINE_KAOMOJI_BY_SLUG: Record<string, string[]> = Object.fromEntries(
  Object.entries(BUILDERS).map(([slug, fn]) => [slug, dedupeFaces(fn())]),
);

/** Hand-picked rows that should lead each mood list (unique, recognizable). */
export const MULTILINE_EDITORIAL_PRIORITY: Record<string, readonly string[]> = {
  "angry-kaomojis": [
    "(╯°□°）╯︵\n┻━┻",
    "(ノ`Д´)ノ\n  ┻━┻",
    "ヽ(`⌒´メ)ノ\n┻━┻",
    "  MAD\n(╬ Ò﹏Ó)",
    "  ಠ_ಠ\n  ┻━┻",
  ],
  "happy-kaomojis": [
    "  ♪\n(≧▽≦)\n  ／",
    "  ☆\n＼(^o^)／\n  ☆",
    "  ♡\n(＾▽＾)\n  ♪～",
    "  \\   /\n(ﾉ◕ヮ◕)ﾉ\n  ／",
  ],
  "sad-kaomojis": [
    "  ...\n(个_个)\n  \"\"\"",
    "  ,,,\n(T_T)\n  ~~~",
    "  ···\n(╥_╥)\n  ,,,",
  ],
  "cry-kaomojis": [
    "  ,,\n(T_T)\n  \"\"\"",
    "(╥_╥)\n  ~~~\n  ~~~",
    "  ...\n(;ω;)\n  \"\"\"",
  ],
  "funny-kaomojis": [
    "  lol\n(≧∀≦)",
    "  wkwk\n¯\\_(ツ)_/¯",
    "( ͡° ͜ʖ ͡°)\n  …\n┬─┬ノ( º _ ºノ)",
  ],
};

export function getMultilineKaomojiForSlug(slug: string): string[] {
  return MULTILINE_KAOMOJI_BY_SLUG[slug] ?? [];
}

/** Curated subset for mood pages — avoids duplicating the full multiline hub in Google’s index. */
export function getMultilineHighlightsForSlug(slug: string): string[] {
  const all = MULTILINE_KAOMOJI_BY_SLUG[slug] ?? [];
  if (!all.length) return [];
  const limit = multilineHighlightLimitForSlug(slug);
  const priority = MULTILINE_EDITORIAL_PRIORITY[slug] ?? [];
  const out: string[] = [];
  for (const face of priority) {
    if (out.length >= limit) break;
    out.push(face);
  }
  for (const face of all) {
    if (out.length >= limit) break;
    if (!out.includes(face)) out.push(face);
  }
  return dedupeFaces(out).slice(0, limit);
}

export const MULTILINE_KAOMOJI_HUB_FACES = dedupeFaces(
  Object.values(MULTILINE_KAOMOJI_BY_SLUG).flat(),
);

export const MULTILINE_KAOMOJI_STATS = Object.fromEntries(
  Object.entries(MULTILINE_KAOMOJI_BY_SLUG).map(([slug, faces]) => [slug, faces.length]),
) as Record<string, number>;
