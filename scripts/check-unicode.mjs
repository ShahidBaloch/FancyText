/**
 * Correctness check for the Unicode style maps.
 *
 * The Mathematical Alphanumeric Symbols block (U+1D400–U+1D7FF) has 24
 * deliberately reserved gaps, because those glyphs already existed in
 * Letterlike Symbols and Unicode unified them rather than duplicating them.
 * Any map built by adding a fixed offset to a base code point will emit an
 * unassigned character at each gap, which renders as tofu on every device.
 *
 * This is the single most common correctness bug in this category of tool, so
 * it is checked on every build rather than trusted to review.
 *
 * Run with: node scripts/check-unicode.mjs
 */

import { build } from "esbuild";
import { rm, mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

/** The 24 reserved code points, with the Letterlike Symbols character each one expects. */
const RESERVED = new Map([
  [0x1d455, "U+210E italic small h"],
  [0x1d49d, "U+212C script capital B"],
  [0x1d4a0, "U+2130 script capital E"],
  [0x1d4a1, "U+2131 script capital F"],
  [0x1d4a3, "U+210B script capital H"],
  [0x1d4a4, "U+2110 script capital I"],
  [0x1d4a7, "U+2112 script capital L"],
  [0x1d4a8, "U+2133 script capital M"],
  [0x1d4ad, "U+211B script capital R"],
  [0x1d4ba, "U+212F script small e"],
  [0x1d4bc, "U+210A script small g"],
  [0x1d4c4, "U+2134 script small o"],
  [0x1d506, "U+212D fraktur capital C"],
  [0x1d50b, "U+210C fraktur capital H"],
  [0x1d50c, "U+2111 fraktur capital I"],
  [0x1d515, "U+211C fraktur capital R"],
  [0x1d51d, "U+2128 fraktur capital Z"],
  [0x1d53a, "U+2102 double-struck capital C"],
  [0x1d53f, "U+210D double-struck capital H"],
  [0x1d545, "U+2115 double-struck capital N"],
  [0x1d547, "U+2119 double-struck capital P"],
  [0x1d548, "U+211A double-struck capital Q"],
  [0x1d549, "U+211D double-struck capital R"],
  [0x1d551, "U+2124 double-struck capital Z"],
]);

/** Unassigned ranges we also refuse to emit, beyond the 24 gaps. */
function isUnassigned(cp) {
  // Enclosed Alphanumeric Supplement has holes around the squared sets.
  if (cp >= 0x1f16a && cp <= 0x1f16f) return true;
  // Surrogates must never appear as a standalone code point.
  if (cp >= 0xd800 && cp <= 0xdfff) return true;
  return false;
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const dir = await mkdtemp(join(tmpdir(), "fancify-unicode-"));
const outfile = join(dir, "styles.mjs");

await build({
  entryPoints: ["src/lib/fonts/styles.ts"],
  bundle: true,
  format: "esm",
  platform: "neutral",
  outfile,
  logLevel: "silent",
});

const { STYLES } = await import(pathToFileURL(outfile).href);

let failures = 0;
const checked = [];

for (const style of STYLES) {
  for (const ch of ALPHABET) {
    const output = style.transform(ch);
    for (const outChar of output) {
      const cp = outChar.codePointAt(0);
      if (RESERVED.has(cp)) {
        failures += 1;
        console.error(
          `FAIL  ${style.id}: "${ch}" emitted reserved U+${cp
            .toString(16)
            .toUpperCase()} — should be ${RESERVED.get(cp)}`,
        );
      } else if (isUnassigned(cp)) {
        failures += 1;
        console.error(
          `FAIL  ${style.id}: "${ch}" emitted unassigned U+${cp
            .toString(16)
            .toUpperCase()}`,
        );
      }
    }
  }
  checked.push(style.id);
}

// Every style must declare its compatibility, or the badges lie.
for (const style of STYLES) {
  if (!style.support || !style.supportNote) {
    failures += 1;
    console.error(`FAIL  ${style.id}: missing compatibility metadata`);
  }
  if (typeof style.usernameSafe !== "boolean") {
    failures += 1;
    console.error(`FAIL  ${style.id}: missing usernameSafe flag`);
  }
}

await rm(dir, { recursive: true, force: true });

console.log(
  `Checked ${checked.length} styles × ${ALPHABET.length} characters against ${RESERVED.size} reserved code points.`,
);
if (failures > 0) {
  console.error(`\n${failures} problem(s) found.`);
  process.exit(1);
}
console.log("All style maps clean.");
