#!/usr/bin/env node
/**
 * AdSense gate — static checks before enabling ads in production.
 * Run: npm run check:ads
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "src");

const placementAllowlist = new Set([
  "src/components/layout/SiteFooter.tsx",
]);

const forbiddenPatterns = [
  { re: /pagead2\.googlesyndication\.com/g, label: "AdSense script URL" },
  { re: /adsbygoogle\.js/g, label: "adsbygoogle.js" },
];

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, files);
    else if (/\.(tsx?|jsx?|mjs)$/.test(name)) files.push(full);
  }
  return files;
}

function rel(file) {
  return path.relative(root, file).split(path.sep).join("/");
}

let failed = false;

for (const file of walk(src)) {
  const text = fs.readFileSync(file, "utf8");
  const r = rel(file);
  const isAdsComponent = r.startsWith("src/components/ads/");

  for (const { re, label } of forbiddenPatterns) {
    re.lastIndex = 0;
    if (!re.test(text)) continue;
    if (isAdsComponent && r === "src/components/ads/AdSenseProvider.tsx") continue;
    console.error(`FAIL: ${label} found outside AdSenseProvider in ${r}`);
    failed = true;
  }

  if (text.includes("<AdPlacement") && !placementAllowlist.has(r) && !isAdsComponent) {
    console.error(
      `FAIL: <AdPlacement /> in ${r} — only allowlisted in SiteFooter (see placements.ts)`,
    );
    failed = true;
  }

  if (
    text.includes('className="tool-stage"') &&
    text.includes("<AdPlacement")
  ) {
    console.error(`FAIL: <AdPlacement /> inside tool-stage in ${r}`);
    failed = true;
  }
}

const adsTxt = path.join(root, "public", "ads.txt");
if (!fs.existsSync(adsTxt)) {
  console.error("FAIL: public/ads.txt missing");
  failed = true;
} else {
  const adsBody = fs.readFileSync(adsTxt, "utf8");
  if (!/google\.com,\s*pub-\d+,\s*DIRECT/i.test(adsBody)) {
    console.error("FAIL: public/ads.txt missing google.com pub-DIRECT line");
    failed = true;
  }
}

if (failed) {
  process.exit(1);
}

console.log("check:ads OK — loader isolated, placements allowlisted, ads.txt present");
