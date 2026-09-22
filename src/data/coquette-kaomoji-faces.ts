/**
 * Coquette / aesthetic multiline text art — generated from layout parts so
 * common viral combinations (heads × faces × paws × props) are all present.
 * Full catalog: /coquette-kaomojis/ only; animal pages use COQUETTE_*_HIGHLIGHTS.
 */

import { COQUETTE_ANIMAL_HIGHLIGHT_LIMIT } from "@/data/kaomoji-catalog-policy";

const FEET = "じしˍ,)ノ";

/** User / viral reference blocks — always first in the catalog. */
const CANONICAL_COQUETTE_FACES = [
  `   ⠀ ⠀ へ ♡ ╱|、
     ૮  -  ՛ )
       /   ⁻  ៸|
   乀 (ˍ, ل  ل 
       じしˍ,)ノ`,
  `╱|、
(˚ˎ 。7  
|、˜〵
じしˍ,)ノ`,
  `╱|、
(\`   -  7
|、⁻〵
じしˍ,)ノ`,
  `/\\_/\\
(˶ᵔ ᵕ ᵔ˶)
/ >🌷<\\~♡`,
  `               ／＞　 フ
               | 　_　_| 
          ／\` ミ＿xノ 
         /　　　　 |
        /　 ヽ　　 ﾉ
        │　　|　|　|
／￣|　　 |　|　|
(￣ヽ＿_ヽ_)__)
＼二)`,
] as const;

const ARMS_TOP = [
  "   ⠀ ⠀ へ ♡ ╱|、",
  "   ♡ へ ♡ ╱|、",
  "⠀ ⠀ へ ♡ ╱|、",
  "   へ ♡",
  "♡ へ ♡ ╱|、",
  "♡╱|、",
  "╱|、 ♡",
  "   ⠀♡⠀",
] as const;

const EAR_LINES = [
  "     ૮  -  ՛ )",
  "     ૮ - ՛ ) ♡",
  "  ૮ - ՛ )",
  "  ૮  -  ՛ ) ♡",
] as const;

const CHEEK_LINES = [
  "       /   ⁻  ៸|",
  "  / ⁻ ៸|",
  "    /   ⁻  ៸|",
  null,
] as const;

const PAW_FOOTERS: readonly string[] = [
  "   乀 (ˍ, ل  ل \n       じしˍ,)ノ",
  "  乀 (ˍ, ل ل\n     じしˍ,)ノ",
  "     じしˍ,)ノ",
  "       じしˍ,)ノ",
];

const ARMS_SIMPLE = ["╱|、", "╱|、 ♡", "♡╱|、", "   ╱|、♡", "♡ ╱|、"] as const;

const FACE_MID = [
  "(˚ˎ 。7",
  "(`   -  7",
  "(˶ᵔ ᵕ ᵔ˶)",
  "( ˶ᵔ ᵕ ᵔ˶ )",
  "૮ ˶ᵔ ᵕ ᵔ˶ ა",
  "( ˶˘ ᵕ ˘˶ )♡",
  "( ˶˃ ᵕ ˂˶ )",
  "(˶˘з˘˶)",
  "( ˶ᵔ ᵕ ᵔ˶ )♡",
] as const;

const LEG_MID = ["|、˜〵", "|、⁻〵", "|、˜ 〵"] as const;

const BUNNY_EARS = ["/\\_/\\", "(\\(o\\)/)", "／( ・×・)＼", "U・x・U"] as const;

const BUNNY_FACES = [
  "(˶ᵔ ᵕ ᵔ˶)",
  "( ˶ᵔ ᵕ ᵔ˶ )",
  "(˶˃ ᵕ ˂˶ )",
  "( ˶˘ ᵕ ˘˶ )",
  "(｡•ᴗ•｡)",
  "(◕‿◕)",
  "( ˶˃ ᵕ ˂˶ )♡",
] as const;

const BUNNY_PROPS = [
  "/ >🌷<\\~♡",
  "/ >🌷<\\~⁠♡",
  "( >🌷< )♡",
  "/ >♡<\\~",
  "/ >🌷< ♡",
  "( >♡< )",
  "/ >★<\\~♡",
  "/ >🌷<\\~",
  "( >🌷< )",
  "♡ / >🌷< \\~ ♡",
] as const;

const BEAR_HEADS = ["ʕ•ᴥ•ʔ♡", "ʕ•ᴥ•ʔ", "ʕ·ᴥ·ʔ", "ʕᵔᴥᵔʔ♡", "ʕ￫ᴥ￩ʔ♡"] as const;

const DOG_BOTTOM = [
  "(∪･ω･∪)",
  "(ΦωΦ)",
  "(ᵔᴥᵔ)",
  "(◕ᴥ◕)",
  "(ﾐ^^ﾐ)",
  "(U・ω・U)",
  "(￣ヽ＿_ヽ_)__",
] as const;

const DOG_COMPACT = [
  `／＞　 フ
|　　_　 _|
／\` ミ＿xノ`,
  `　　／＞　 フ
　　|　　_　 _|
　／\` ミ_xノ`,
  `／＞ フ
| _ _|
／\` ミ＿xノ`,
] as const;

const SPECIAL_EXTRAS = [
  `╭──♡──╮
│ ૮ ˶ᵔ ᵕ ᵔ˶ ა │
╰──♡──╯`,
  `   ⠀♡⠀
  ૮(˶ᵔ ᵕ ᵔ˶)ა
   ╱|、♡
  じしˍ,)ノ`,
  `♡ (\\(o\\)/) ♡
( ˶ᵔ ᵕ ᵔ˶ )
  じしˍ,)ノ`,
  `／l、
（ﾟ･ω･ﾟ）
／ 　 ＼
( _ _ )`,
  `♡ ⸜(｡˃ ᵕ ˂ )⸝ ♡
   ╱|、
   じしˍ,)ノ`,
  `♡╱|、
(˶ᵔ ᵕ ᵔ˶)
|、˜〵
じしˍ,)ノ`,
  `♡╱|、
૮ - ՛ ) ♡
  / ⁻ ៸|
  じしˍ,)ノ`,
  `　　／＞　 フ
　　|　　_　 _|
　／\` ミ_xノ
 /　 　|
/  ／
(ﾐ^^ﾐ)`,
] as const;

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

function buildCoquetteTypeA(): string[] {
  const out: string[] = [];
  for (const top of ARMS_TOP) {
    for (const ear of EAR_LINES) {
      for (const cheek of CHEEK_LINES) {
        for (const footer of PAW_FOOTERS) {
          const lines: string[] = [top, ear];
          if (cheek) lines.push(cheek);
          lines.push(footer);
          out.push(lines.join("\n"));
        }
      }
    }
  }
  return out;
}

function buildCoquetteTypeB(): string[] {
  const out: string[] = [];
  for (const top of ARMS_SIMPLE) {
    for (const face of FACE_MID) {
      for (const leg of LEG_MID) {
        out.push(`${top}\n${face}\n${leg}\n${FEET}`);
      }
    }
  }
  return out;
}

function buildBunnyCombinations(): string[] {
  const out: string[] = [];
  for (const ears of BUNNY_EARS) {
    for (const face of BUNNY_FACES) {
      for (const prop of BUNNY_PROPS) {
        out.push(`${ears}\n${face}\n${prop}`);
      }
    }
  }
  return out;
}

function buildBearCoquette(): string[] {
  const out: string[] = [];
  for (const head of BEAR_HEADS) {
    for (const top of ["╱|、", "╱|、 ♡", "♡╱|、"] as const) {
      out.push(`${head}\n${top}\n  ${FEET}`);
      out.push(`${top}\n${head}\n  ${FEET}`);
    }
  }
  return out;
}

function buildDogCombinations(): string[] {
  const out: string[] = [];
  for (const compact of DOG_COMPACT) {
    for (const bottom of DOG_BOTTOM) {
      out.push(`${compact}\n${bottom}`);
    }
  }
  return out;
}

function buildAllCoquetteFaces(): string[] {
  const generated = [
    ...CANONICAL_COQUETTE_FACES,
    ...SPECIAL_EXTRAS,
    ...buildCoquetteTypeA(),
    ...buildCoquetteTypeB(),
    ...buildBunnyCombinations(),
    ...buildBearCoquette(),
    ...buildDogCombinations(),
  ];
  return dedupeFaces(generated);
}

export const COQUETTE_KAOMOJI_FACES = buildAllCoquetteFaces();

export const COQUETTE_BUNNY_TULIP = `/\\_/\\
(˶ᵔ ᵕ ᵔ˶)
/ >🌷<\\~♡`;

/** Every ears × face × prop bunny block (also on coquette hub). */
export const COQUETTE_BUNNY_ALL = dedupeFaces(buildBunnyCombinations());

export const COQUETTE_DOG_ALL = dedupeFaces([
  CANONICAL_COQUETTE_FACES[4],
  ...buildDogCombinations(),
]);

export const COQUETTE_CAT_ALL = dedupeFaces([
  ...buildCoquetteTypeA(),
  ...buildCoquetteTypeB(),
]);

export const COQUETTE_BEAR_ALL = dedupeFaces(buildBearCoquette());

export const COQUETTE_DOG_ASCII = CANONICAL_COQUETTE_FACES[4];

function coquetteHighlights(full: string[], extraCanonical: string[] = []): string[] {
  return dedupeFaces([...extraCanonical, ...full]).slice(
    0,
    COQUETTE_ANIMAL_HIGHLIGHT_LIMIT,
  );
}

/** Curated coquette rows on animal browse pages (full matrix stays on /coquette-kaomojis/). */
export const COQUETTE_CAT_HIGHLIGHTS = coquetteHighlights(COQUETTE_CAT_ALL, [
  ...CANONICAL_COQUETTE_FACES.slice(0, 3),
]);

export const COQUETTE_BEAR_HIGHLIGHTS = coquetteHighlights(COQUETTE_BEAR_ALL);

export const COQUETTE_BUNNY_HIGHLIGHTS = coquetteHighlights(COQUETTE_BUNNY_ALL, [
  COQUETTE_BUNNY_TULIP,
]);

export const COQUETTE_DOG_HIGHLIGHTS = coquetteHighlights(COQUETTE_DOG_ALL, [
  CANONICAL_COQUETTE_FACES[4],
]);

export const COQUETTE_COMBO_STATS = {
  typeA: buildCoquetteTypeA().length,
  typeB: buildCoquetteTypeB().length,
  bunny: buildBunnyCombinations().length,
  bear: buildBearCoquette().length,
  dog: buildDogCombinations().length,
  totalUnique: COQUETTE_KAOMOJI_FACES.length,
} as const;
