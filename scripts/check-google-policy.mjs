/**
 * Google Search Console + AdSense publisher policy smoke tests (repo/static).
 * Run: node scripts/check-google-policy.mjs
 */
import { readFile, readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

async function read(path) {
  return readFile(join(root, path), "utf8");
}

async function walk(dir, acc = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const ent of entries) {
    const p = join(dir, ent.name);
    if (ent.name === "node_modules" || ent.name === ".next") continue;
    if (ent.isDirectory()) await walk(p, acc);
    else if (/\.(tsx?|jsx?|mjs)$/.test(ent.name)) acc.push(p);
  }
  return acc;
}

// —— AdSense: no live ad scripts without consent gate ——
const forbiddenAdPatterns = [
  /adsbygoogle/i,
  /googlesyndication\.com\/pagead/i,
  /pagead2\.googlesyndication/i,
];
const files = await walk(join(root, "src"));
for (const file of files) {
  const text = await readFile(file, "utf8");
  for (const re of forbiddenAdPatterns) {
    if (re.test(text)) {
      errors.push(`Forbidden ad loader pattern in ${file.replace(root, "")}: ${re}`);
    }
  }
}

const consent = await read("src/lib/ads/consent.ts");
if (!/ADS_CONSENT_READY\s*=\s*false/.test(consent)) {
  errors.push("ADS_CONSENT_READY must stay false until CMP is certified");
}

const googlePolicy = await read("src/lib/ads/google-policy.ts");
if (!/mayLoadGoogleAds/.test(googlePolicy)) {
  errors.push("google-policy.ts must export mayLoadGoogleAds gate");
}

// —— ads.txt (Authorized Digital Sellers) ——
const adsTxt = await read("public/ads.txt");
const adsLine = adsTxt.trim().split("\n").find((l) => l.startsWith("google.com,"));
if (!adsLine?.includes("pub-1493183147218727") || !adsLine.includes("DIRECT")) {
  errors.push("public/ads.txt must declare google.com pub-1493183147218727 DIRECT");
}

// —— Privacy / AdSense disclosure ——
const privacy = await read("src/app/privacy/page.tsx");
const privacyMust = [
  "AdSense",
  "Consent Management Platform",
  "Google Analytics",
  "partner disclosure",
  "first Copy control",
];
for (const phrase of privacyMust) {
  if (!privacy.includes(phrase)) {
    errors.push(`Privacy page missing AdSense/GSC-related phrase: ${phrase}`);
  }
}

// —— Terms: acceptable use ——
const terms = await read("src/app/terms/page.tsx");
if (!terms.includes("Do not abuse, scrape")) {
  errors.push("Terms must prohibit abusive scraping (AdSense / GSC quality)");
}

// —— Footer trust links ——
const footer = await read("src/components/layout/SiteFooter.tsx");
for (const path of ["/about/", "/contact/", "/privacy/", "/terms/"]) {
  if (!footer.includes(`"${path}"`)) {
    errors.push(`Site footer missing link to ${path}`);
  }
}

// —— GSC: sitemap + trust URLs + kaomoji index policy ——
const dir = await mkdtemp(join(tmpdir(), "google-policy-"));
const outfile = join(dir, "bundle.mjs");
await build({
  absWorkingDir: root,
  entryPoints: [join(root, "src/lib/seo/sitemap-xml.ts")],
  bundle: true,
  format: "esm",
  platform: "node",
  outfile,
  logLevel: "silent",
  alias: { "@": join(root, "src") },
});
const { getSitemapEntries } = await import(`file://${outfile}`);
const sitemapPaths = getSitemapEntries().map((e) => new URL(e.url).pathname);
await rm(dir, { recursive: true, force: true });

for (const path of ["/about/", "/contact/", "/privacy/", "/terms/", "/sitemap.xml"]) {
  if (path === "/sitemap.xml") {
    try {
      await read("public/sitemap.xml");
    } catch {
      errors.push("public/sitemap.xml missing — run npm run check:sitemap");
    }
    continue;
  }
  if (!sitemapPaths.includes(path)) {
    errors.push(`Sitemap missing trust URL ${path} (GSC / AdSense review)`);
  }
}

const robots = await read("src/app/robots.ts");
if (!robots.includes("sitemap:")) {
  errors.push("robots.ts must reference sitemap.xml for GSC");
}
if (!robots.includes('VERCEL_ENV === "preview"')) {
  errors.push("robots.ts must noindex preview deployments");
}

// Search: infinite ?q= noindex (GSC thin URLs)
const searchPage = await read("src/app/search/page.tsx");
if (!searchPage.includes("robots: { index: false")) {
  errors.push("/search/?q= must set noindex when query present");
}

// Layout: AdSense warning comment
const layout = await read("src/app/layout.tsx");
if (!layout.includes("do not load AdSense")) {
  errors.push("Root layout must document AdSense/CMP gating");
}

if (errors.length) {
  console.error(
    "Google policy check failed:\n" + errors.map((e) => `  - ${e}`).join("\n"),
  );
  process.exit(1);
}

console.log(
  "Google Search Console + AdSense policy checks OK (no live ad scripts; ads.txt + trust pages + sitemap + privacy disclosures).",
);
