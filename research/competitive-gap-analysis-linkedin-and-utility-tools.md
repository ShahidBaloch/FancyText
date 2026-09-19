# Competitive SEO / product research: LinkedIn, reverse-formatting and utility-tool gaps

Research date: 19 September 2026. All Google Trends figures below were measured directly during this
research and are reproducible; everything sourced from third parties is labelled as such.

---

## 0. Executive summary

**The single biggest finding: the core "fancy text generator" market is shrinking while the LinkedIn
professional-formatting and AI-text-cleanup markets are growing fast.**

Google Trends, worldwide, yearly average of weekly interest (one query group, so the numbers are
comparable within the group only):

| Query | 2021 | 2022 | 2023 | 2024 | 2025 | 2026 (partial) |
|---|---|---|---|---|---|---|
| fancy text generator | 7.8 | 10.9 | 8.9 | 6.3 | 4.9 | 4.6 |
| stylish text | 8.1 | 11.5 | 13.2 | 7.2 | 5.6 | 5.8 |
| word counter | 26.6 | 46.3 | 50.5 | 48.3 | 46.6 | 38.3 |

| Query | 2021 | 2022 | 2023 | 2024 | 2025 | 2026 (partial) |
|---|---|---|---|---|---|---|
| linkedin text formatter | 0.0 | 1.0 | 3.1 | 17.5 | 38.0 | 31.7 |
| linkedin bold text | 1.7 | 10.4 | 14.2 | 33.0 | 50.8 | 45.2 |
| linkedin formatting | 0.0 | 7.4 | 6.8 | 8.8 | 28.3 | 57.8 |
| markdown to linkedin | 0.0 | 0.1 | 0.0 | 0.1 | 6.6 | 35.1 |
| chatgpt to linkedin post | 0.0 | 0.0 | 4.0 | 4.5 | 14.9 | 18.6 |

"fancy text generator" is down roughly 58% from its 2022 peak. "linkedin text formatter" went from
essentially zero to a real market in three years, and "markdown to linkedin" grew more than 5x
year-over-year into 2026. This is the strategic story: the site's existing content sits on a
declining curve, and the adjacent professional/AI-cleanup curve is the one still rising.

### Ranked opportunities

1. **LinkedIn cluster (highest value, must-build).** The site has zero LinkedIn pages while
   competitors have dozens each. One third-party Semrush mirror reports "linkedin text formatter" at
   18,100 US searches/month with $4.71 CPC — the highest commercial intent found anywhere in this
   niche. The current #1 ranking page belongs to `linkedin-makeover.com`, a LinkedIn profile-writing
   *services* business whose entire tool footprint is a single page.
2. **ChatGPT/markdown → LinkedIn converter.** Fastest-growing query in the whole research set, and
   the only "new" intent that did not exist two years ago.
3. **Reverse / unformat (Unicode → plain text).** Already served by yaytext `/unstyle/` and
   convertcase `/remove-text-formatting/` + `/unicode-to-text-converter/`. A genuine hole in the
   current site, with a natural accessibility/ethics story attached.
4. **AI text cleaner (em dash, smart quotes, invisible Unicode, markdown residue).** An entire
   competitor, `cleantexttools.com`, exists for nothing else, with ~45 pages of app × problem
   long-tail.
5. **High-volume utility tools the site lacks entirely**: word/character counter, text repeater,
   emoji picker, symbol keyboard pages, line-break remover, bullet/divider libraries.
6. **Answer/QA page architecture.** `ultratextgen.com` has 4,685 sitemap URLs including 66
   `/answers/` pages and 339 `/library/` pages. This is the cheapest indexable surface area in the
   niche and the site has only 8 guides.

---

## 1. Competitor teardown

Site structures were taken from live sitemaps and homepage link graphs on 19 Sep 2026.

### 1.1 Direct Unicode-text competitors

**lingojam.com/FancyTextGenerator** — a user-generated *platform*, not a tool site: anyone can build
and publish a translator, with no signup. Third-party estimate (sitestatsdb.com, June 2026): Ahrefs
DR 72, ~6.58M organic visitors/month, 67,894 ranked keywords — treat as an estimate, not verified.
Individual translator pages are thin; the moat is volume and domain authority, not page quality.
*Missing from your site:* nothing tool-specific worth copying; the lesson is that its pages are
beatable on quality.

**yaytext.com** — 11,587 sitemap URLs, but only ~54 are real English pages. The rest is 1,604 emoji
pages replicated across 7 languages (es, vi, it, fr, pt, tl). Standout items you do not have:

- `/unstyle/` — reverse tool, strips Unicode styling back to plain text.
- `/line-breaks/` — a dedicated line-break tool.
- 35+ decorative/combining styles you lack: ransom note, clapback (6 skin-tone variants), hearts in
  7 colours, lightning above, under-arrow/under-seagull/under-asterisk, air quotes, diamonds,
  classified, do-not-enter, mini-me, Cherokee/Canadian-Aboriginal/Vai/Bamum/Cuneiform letterlike.
- A full emoji encyclopedia (1,604 pages) plus 19 emoji category hubs.
- Blog posts that are genuinely technical: `/blog/mathematical-unicode-letters/`,
  `/blog/vaporwave-unicode-analysis/`.
- 7-language i18n on every single style page.

**fsymbols.com** — small page count, huge per-page depth. Sections: `/all/`, `/emoticons/` (+
`/lenny-face/`, `/emoticons/maker/`), `/generators/` (blackboard-bold, carty, encool, tarty,
facebook-name), `/keyboard/` (Windows alt codes list + how-to, Mac, keyboard layouts),
`/letters/`, `/text-art/` (+ `/text-art/twitter/`), plus symbol pages (`/heart/`, `/music/`, `/tm/`,
`/copyright/`, `/signs/{arrow,bullet-point,cross,euro,evil,flower,hazard,moon,stars}`), 12 language
versions. *Missing from your site:* an **alt-codes / keyboard-shortcuts section** (Windows alt codes,
Mac option codes, keyboard layouts), a **bullet-point symbol page**, an **emoticon maker**, and
ASCII text-art generators (`tarty`, `carty`, `encool`).

**coolsymbol.com** — 37 pages, all symbol-category pages plus 3 generators. Notable page you lack:
`zero-width-space-joiner-non-joiner-ltr-rtl-lrm-rlm-characters-symbols.html` (your invisible-character
page probably overlaps but not on the ZWJ/ZWNJ/LRM/RLM terms), `alt-codes-alt-key-codes-for-special-symbols.html`,
`phonetic-symbols.html`, `text-art-pictures-images-ascii-characters-symbols.html`, and per-script
pages (Chinese/Japanese/Korean/Latin characters).

**messletters.com** — sections: `/big-text/`, `/characters/`, `/emoji/`, `/emoticons/`, `/flip-text/`,
`/stacked-text/`, `/symbols/`, `/text-art/` (with a `/decorations/#dividers` anchor and a `?waves`
variant), `/zalgo-text/`, `/search/`, `/add-to-homescreen/`, 13 languages. *Missing from your site:*
**stacked text** (text stacked into vertical columns), a **divider/decoration library**, an on-site
search that is promoted as a page, and a PWA "add to home screen" flow.

**fancytextguru.com** — WordPress + Yoast; its `sitemap_index.xml` is behind ModSecurity and returned
"Not Acceptable" to every crawler UA tried. Could not enumerate; flag as unverified.

**igfonts.io / instafonts.io** — igfonts.io is a thin shell around instafonts.io (Cloudflare content
signals in robots.txt, `ai-train`/`ai-input` restrictions). InstaFonts offers **90+ bio fonts**,
**user-created saveable font collections protected by a password** (a genuinely unusual UGC feature),
and long-form explainer copy on ASCII→Unicode history. *Missing from your site:* the "save and share
a named collection" mechanic, which generates indexable UGC pages at zero content cost.

**qaz.wtf (Unicode Toys / unicode-text-converter)** — the technically deepest site in the niche and
the most under-exploited SEO-wise (it explicitly `Disallow`s all Google crawlers in robots.txt, with a
profane comment; it is effectively invisible in Google). Tools: the converter itself (17 "true"
transforms and 16 "pseudo" transforms, documented as such), **six-dot Braille conversion**,
**fraction builder from super/subscripts**, **punycode IDN encode and decode**, **whitespace
interleaving**, **Zalgo combining-character dresser**, **Unicode name grep with regex support**, and
**codepoint/range inspector** (`U+CODEPOINT`, hex range, int range). It also exposes the **Tags block
(U+E0000)** for invisible metadata tagging. *Missing from your site:* Unicode character search by
name, a codepoint inspector, punycode tools, Braille, and the fraction builder. Because qaz.wtf
blocks Google, all of its keywords are effectively unclaimed by the best implementation.

### 1.2 Utility-tool competitors (the "convert" cluster)

**convertcase.net** — 126 sitemap URLs, 13 languages, and the most complete tool inventory in the
space. Tools it has that you do not, grouped:

- *Reverse / cleanup:* `remove-text-formatting`, `unicode-to-text-converter`, `plain-text-converter`,
  **`em-dash-remover`**, `remove-line-breaks`, `whitespace-remover`, `remove-underscores`,
  `duplicate-line-remover`, `duplicate-word-finder`, `letter-character-removal-tool`, `replace-text`.
- *Markdown:* `markdown-formatter`, `html-markdown-converter`, `word-to-markdown-converter`,
  `pdf-to-markdown-converter`, `markdown-table-generator`.
- *Counting/analysis:* `online-sentence-counter`, `word-frequency-counter`, `word-cloud-generator`.
- *Generators:* `lorem-ipsum-generator`, `repeat-text`, `random-{number,letter,month,date,ip-address,choice}-generator`,
  `strong-password-generator`, `uuid-generator`, `qr-code-generator`, `utm-generator`.
- *Dev tools:* JSON/YAML/XML/CSS/SCSS/HTML/JS/TS formatters, `csv-to-json`, `json-to-yaml`,
  `base64-decode-encode`, `md5-hash-generator`, `url-encode-decode`, `utf8-encoding`, `regex-tester-tool`.
- *Ciphers/novelty:* `a1z26-cipher`, `caesar-cipher-encryption`, `rot13-encoder-decoder`,
  `morse-code-translator`, `nato-alphabet-translator`, `pig-latin-translator`, `wingdings-converter`,
  `phonetic-spelling-generator`, `roman-numeral-date-converter`, `number-to-words-converter`.
- *Case formats:* camel, pascal, snake, kebab, dot, title, sentence.
- *Distribution:* a `browser-extension` page, a `mobile-app` page, and a `suggest-tool` page.

**capitalizemytitle.com** — ~220 pages and the most aggressive *diversification* strategy in the
niche: it started as a title-case tool and now ranks on word games (Wordle/Quordle/Strands/Connections
solvers and hint pages), writing calculators (`reading-time`, `writing-time`, `speech-length`,
`page-count`, `flesch-kincaid-readability-calculator`), random generators, an `api/` page, a
`wordpress-plugin`, a paid membership (`cmt-plus`), and a `no-ai` positioning page. It also runs the
same Unicode font pages you have (instagram-fonts, discord-fonts, roblox-fonts, fortnite-fonts,
tiktok-fonts, cursed-text, zalgo). *Missing from your site:* the entire calculator family
(reading time, speech length, page count, readability score) and the `headline-analyzer` /
`email-subject-tester` / `meta-title-tag-checker` marketing-utility family.

**textfixer.com** — a small, old, very high-authority utility site (remove line breaks, remove
whitespace, alphabetize, case conversion, word count, HTML conversion), positioned entirely on
"private, runs in your browser, no upload". Its homepage copy leans hard on privacy — a useful framing
to copy for any AI-text tool, where users are pasting unpublished drafts.

### 1.3 The LinkedIn-native competitor set (this is the real competition for the gap)

**postformatter.com** — 277 sitemap URLs across **13 languages**. The most complete LinkedIn-first
architecture found. English pages: `linkedin-text-formatter`, `linkedin-font-generator`,
`linkedin-character-counter`, `linkedin-post-preview`, `linkedin-symbols`, `linkedin-banner-maker`,
`linkedin-carousel-maker`, `linkedin-video-downloader`, `chatgpt-to-linkedin-formatter`,
`facebook-text-formatter`, `x-twitter-text-formatter`, `threads-text-formatter`,
`how-to-bold-text-on-linkedin`, `how-to-italicize-on-linkedin`, `how-to-add-bullet-points-on-linkedin`,
`linkedin-post-formatting-guide`, 16 generic style generators, and — importantly — **five competitor
"alternative" pages** (`typegrow-alternative`, `yaytext-alternative`, `authoredup-alternative`,
`perfectpost-alternative`, `taplio-alternative`). Business model: free web tool + freemium Chrome
extension (Pro from $8/mo, $29/yr, or $49 lifetime).

**liftli.ai** — 151 URLs. Its `/tools/` directory is the best idea list in the category: `hook-generator`,
`post-generator`, `post-rewriter`, `content-ideas`, `comment-generator`, `carousel-outline`,
`poll-generator`, `linkedin-to-x`, `contrarian-angles`, `devlog-to-post`, `meeting-to-post`,
`hot-take-check`, `headline-generator`, `headline-analyzer`, `about-generator`, `profile-checker`,
`ai-visibility-checker`, `character-counter`, `post-preview`, `post-analyzer`,
**`ai-sounding-post-checker`**, `text-formatter`, **`line-break-fixer`**, `engagement-rate-calculator`,
`follower-growth-calculator`, `best-time-to-post`, `ghostwriter-cost-calculator`, `image-sizes`. It
also runs a 60+ page `/glossary/` and audience pages (`for-founders`, `for-consultants`, …).

**linkedinformatter.net** — 33 URLs, tightly focused: `fonts`, `post-preview`,
`linkedin-headline-builder`, `linkedin-about-section-builder`, `linkedin-carousel-maker`,
`linkedin-image-size-checker`, `profile-name-formatter`, eight single-style pages
(bold/italic/strikethrough/underline/cursive/monospace/small-caps/fraktur), an
`linkedin-emoji-guide`, a blog covering character limits / bullet points / line breaks / special
characters / unicode text, and — worth copying — a **`/how-we-test`** page. That transparency page is
a cheap trust and E-E-A-T asset nobody else in the fancy-text niche has.

**ultratextgen.com** — 4,685 sitemap URLs (1,211 English). Architecture: `/library/` (339 symbol and
emoji-combo collections), `/printables/` (211), `/symbol/` (118 per-character pages), `/answers/` (66
question pages), `/usecase/` (41), `/guide/` (33), `/events/` (17), `/category/` (26), ~20 languages.
Its `/answers/` set is a masterclass in long-tail question targeting and directly overlaps your
existing guides: `is-fancy-text-bad-for-accessibility`, `is-fancy-text-bad-for-seo`,
`is-linkedin-bold-text-safe`, `can-you-search-fancy-text`, `why-is-my-name-showing-as-boxes`,
`why-does-copied-fancy-text-lose-formatting`, `why-fancy-text-looks-different-on-iphone-vs-android`,
`why-wont-instagram-accept-my-fancy-username`, `what-font-does-{linkedin,discord,tiktok,…}-use`,
`how-to-remove-zalgo-text`, `how-to-make-a-blank-name`, plus seasonal/greeting pages
(`christmas-card-what-to-write`, `eid-mubarak-meaning-and-reply`, `diwali-wishes-what-to-say`).

**cleantexttools.com** — ~45 URLs, a pure-play AI-cleanup site, and the clearest template for
intent-combination long-tail: `remove-asterisks-linkedin`, `remove-asterisks-outlook`,
`remove-markdown-from-chatgpt-linkedin`, `remove-chatgpt-formatting`, `remove-chatgpt-filler-phrases`,
`convert-chatgpt-to-plain-text`, `clean-chatgpt-{linkedin,gmail,outlook,word,google-docs}`,
`clean-chatgpt-google-docs-{academic,bullets,resumes,students}`, `fix-chatgpt-spacing{,-linkedin,-google-docs}`,
`ai-linkedin-post-formatter`, `outlook-double-spacing-fix`, `outlook-filler-phrases-remover`, plus
blog posts (`does-linkedin-support-markdown`, `why-does-chatgpt-add-asterisks`,
`how-to-remove-chatgpt-formatting-in-word`). Every page is one (AI problem × destination app) pair.

**linkedin-makeover.com** — the incumbent that currently ranks #1 for the money keywords. It is a
LinkedIn profile-writing agency; its entire tool footprint is `/linkedin-text-formatter/` plus
`/linkedin-headline-generator/` and three quiz-style tools. **A single page on a services site owns an
18,100/mo keyword.** That is the clearest sign the SERP is soft.

Other tools observed ranking: `typefully.com/tools/linkedin-text-formatter`, `typegrow.com/tools/linkedin-text-formatter`,
`taplio.com` free tools, `lessie.ai/linkedin-text-formatter`, `keep.md/tools/linkedin-text-formatter`,
`postbeam.ai/tools/linkedin-bullet-points`, `linkedinpreview.com`, `linkedinformatter.com` (distinct
from `.net`), `unwrite.co/gpt/`, `unaimytext.com`, `humanize-ai.click`, `gofortool.com`,
`markdownme.com/tools/markdown-to-linkedin`, `nickleeder.com/markedown-linkedin`.

---

## 2. Keyword clusters and demand signals

### 2.1 Measured relative demand (Google Trends, 12-month average, worldwide)

Every term below was measured in a group anchored on "fancy text generator" and normalised so that
**fancy text generator = 100**. This is relative search interest, not absolute volume.

| Relative index | Keyword | Site has it? |
|---|---|---|
| 1,077 | text art | partial (big-text-ascii) |
| 903 | word counter | **no** |
| 748 | emoji copy paste | **no** |
| 317 | symbols copy and paste | partial (cool-symbols) |
| 287 | text repeater | **no** |
| 223 | character counter | **no** |
| 191 | humanize ai text | **no** |
| 146 | bubble text | yes |
| 109 | discord fonts | yes |
| 79 | lorem ipsum generator | **no** |
| 70 | remove formatting | **no** |
| 63 | nickname generator | **no** |
| 62 | hashtag generator | **no** |
| 56 | strikethrough text | yes |
| 55 | unicode to text | **no** |
| 39 | small text generator | yes |
| 39 | upside down text | yes |
| 28 | linkedin bold text | **no** |
| 24 | bullet point copy paste | **no** |
| 20 | linkedin text formatter | **no** |
| 19 | random text generator | **no** |
| 17 | markdown to linkedin | **no** |
| 14 | linkedin post preview | **no** |
| 14 | text divider | **no** |
| 11 | zero width space | partial |
| 7.7 | linkedin font generator | **no** |
| 0.2 | line break remover | **no** |
| 0.1 | em dash remover | **no** |

Caveats worth stating plainly: "text art" is polysemous (it also captures ASCII art, tattoo lettering
and text-based art generally), so its 1,077 is inflated relative to what a tool page could capture.
"em dash remover" and "line break remover" score near zero as *exact phrases* — the demand there is
real but expressed in other words ("remove em dash", "chatgpt em dash remove", "remove line breaks"),
which is why the trend table in §0 and the autocomplete evidence in §2.3 matter more than the index
for those two.

### 2.2 Third-party absolute volumes (single source, treat as indicative)

A scraped Semrush mirror (`srush.toolspur.com`, a third-party reseller page for
`linkedin-makeover.com`) reports:

| Keyword | Volume | CPC (USD) | Position held by linkedin-makeover.com |
|---|---|---|---|
| linkedin text formatter | 18,100 | $4.71 | 1 |
| linkedin formatter | 14,800 | $6.17 | 1 |
| linkedin bold text | 2,900 | $0 | 1 |
| linkedin bold text generator | 2,900 | $0 | 1 |
| linkedin font generator | 1,600 | $0 | 1 |

**I could not verify these figures against Ahrefs or Semrush directly** (the Ahrefs MCP integration in
this environment requires interactive authentication, which is unavailable to a background agent, and
the mirror site timed out on repeat requests). Treat them as one indicative datapoint. The
$4.71–$6.17 CPC is the important part: it is far above anything in the consumer fancy-text niche and
indicates B2B advertiser competition, which is exactly what makes this cluster worth more per visit.

### 2.3 Google autocomplete (ordered by Google's own popularity ranking)

These are live suggestion sets, which is the cleanest free evidence of long-tail shape:

- **linkedin text formatter** → free · online free · online · "- typegrow" · bold · tool · extension ·
  chrome extension · **bullet points**
- **linkedin bold** → bold text · bold text generator · bold font · bold formatter · bold text
  formatter · bold formatting · bold text editor · bold text generator free
- **markdown to linkedin** → markdown to linkedin **article** · **post** · **converter** · post
  converter · **formatter** · format
- **chatgpt to linkedin** → chatgpt to linkedin **post** · **formatter** · connect chatgpt to linkedin
- **text formatter** → online · **linkedin** (2nd suggestion overall) · ai · facebook · twitter · free
- **how to bold text on** → iphone · discord · reddit · facebook post · instagram · facebook ·
  **linkedin** · **linkedin post** · youtube · whatsapp
- **bullet point copy paste** → symbol · **linkedin** (3rd) · cute · aesthetic · discord · excel ·
  word · emoji · small
- **remove unicode** → characters · from text · online · **from chatgpt** · **characters from chatgpt
  text**
- **chatgpt em dash** → example · meme · usage · **reddit** · update · **remove** · **problem fix** ·
  prompt
- **convert fancy text** → **to normal** (top suggestion) · convert stylish text · translate fancy text
- **ai text** → detector · humanizer · to speech · generator · checker · **cleaner** · remover
- **unformat text** → online · in word · unformatted text shortcut key · paste shortcut
- **linkedin symbols** → meaning · next to name · **copy and paste** · list · **for posts** · and icons
  · **for resume**
- **linkedin post** → size · **formatter** · inspector · dimensions · image size · **formatting** ·
  **character limit** · **preview**
- **zero width space** → copy paste · copy · character · unicode · alt code · **detector** ·
  **generator** · **decoder**
- **text divider** → copy and paste · line · tumblr · line copy and paste · **symbols** · aesthetic · cute
- **word counter** / **character counter** / **text repeater** / **lorem ipsum** / **hashtag
  generator** / **nickname generator** / **emoji copy paste** all return dense, commercially shaped
  suggestion sets — these are mature, high-volume utility markets.

Two specific observations: `convert fancy text` autocompletes **first** to "to normal", which is a
direct statement that reverse-conversion demand exists and is unserved on your domain. And
`bullet point copy paste linkedin` is Google's third suggestion for that phrase, tying the bullet
cluster to the LinkedIn cluster.

### 2.4 Competition read

- **Low competition, high value:** everything LinkedIn-formatting. The incumbent is a services site
  with one page; the rest of the SERP is SaaS lead-magnet pages (Typefully, Taplio, Typegrow) that are
  thin by design because their job is to sell a subscription, not to answer the query.
- **Medium competition:** reverse/unformat, markdown→LinkedIn, AI cleanup. Real specialists exist
  (convertcase, cleantexttools, postformatter) but the category is young.
- **High competition, commodity:** word counter, character counter, lorem ipsum, hashtag generator.
  Dominated by wordcounter.net, capitalizemytitle, convertcase and similar. Worth building as
  *supporting* tools for internal linking and session depth, not as primary bets — except a
  **LinkedIn-specific** character counter, which is a different, softer keyword.

---

## 3. Evidence of AI → LinkedIn formatting demand

The answer to "is there real demand here" is yes, and it is documented in three independent ways.

**Trend data.** `markdown to linkedin` went 0.1 → 6.6 → 35.1 across 2024/2025/2026 and
`chatgpt to linkedin post` went 4.5 → 14.9 → 18.6 over the same period (worldwide, same query group).
The `humanize ai text` curve went 0 → 8.1 → 47.6 → 68.9 → 42.6 across 2022–2026, peaking in 2025.

**A whole competitor category built on it.** `cleantexttools.com` exists solely to serve these
queries, with pages such as `remove-asterisks-linkedin`, `remove-markdown-from-chatgpt-linkedin`,
`fix-chatgpt-spacing-linkedin`, `convert-chatgpt-to-plain-text` and blog posts titled
"Does LinkedIn Support Markdown?" and "Why Does ChatGPT Add Asterisks?". `postformatter.com` has a
dedicated `/chatgpt-to-linkedin-formatter/` tool page plus a long-form post
"How to Paste From ChatGPT to LinkedIn Without Losing Your Formatting" (published 31 July 2026).
`gofortool.com` claims "over 85% of our users are converting AI-generated content" on its
markdown→LinkedIn page. `keep.md` ships an `ai-text-cleaner` alongside its LinkedIn formatter.

**Named forum threads.** Real, citable discussions:

- r/PromptEngineering — "Made lightweight tool to remove ChatGPT-detection symbols"
  (`humanize-ai.click`): deletes invisible Unicode, replaces curly quotes and em dashes. Comments add
  requests for en-dashes, ellipsis characters, non-breaking spaces (U+00A0), zero-width spaces, and
  curly apostrophes — a ready-made feature spec.
  https://www.reddit.com/r/PromptEngineering/comments/1k932ph/made_lightweight_tool_to_remove_chatgptdetection/
- r/PromptEngineering — "Created a simple tool to Humanize AI-Generated text - UnAIMyText":
  "removes invisible unicode characters, replaces fancy quotes and em-dashes".
  https://www.reddit.com/r/PromptEngineering/comments/1mw9oov/created_a_simple_tool_to_humanize_aigenerated/
- r/saasbuild — "Sick of 'AI-isms'? I made a tool to auto-remove em dashes (—), annoying links, and
  emojis from ChatGPT and AI chat outputs."
  https://www.reddit.com/r/saasbuild/comments/1sc2x5v/sick_of_aiisms_i_made_a_tool_to_autoremove_em/
- r/ClaudeAI — "unslop-text", built from an analysis of ~90,000 Reddit posts about what readers flag
  as AI-written; em dashes ranked as the single most-cited tell in that corpus.
  https://www.reddit.com/r/ClaudeAI/comments/1udl9hg/unsloptext_a_claude_skill_that_flags_and_removes/
- Google autocomplete for `chatgpt em dash` includes `reddit`, `remove` and `problem fix`; for
  `remove unicode` it includes `from chatgpt` and `characters from chatgpt text`.

The most useful nuance, from the Reddit comments: users are split between people who want the
markdown/em-dash artefacts **removed** (plain-text purists) and people who want them **converted**
into Unicode styling (LinkedIn posters). A tool that does both, with a toggle, covers both intents on
one page. Also worth noting, because it affects how you position such a tool: multiple commenters
observe that stripping punctuation artefacts does *not* defeat AI detectors, which key on sentence
rhythm and structure. `unwrite.co` explicitly disclaims academic-evasion use. Positioning the tool as
"clean up formatting artefacts", not "beat AI detection", is both more honest and less risky.

---

## 4. What the LinkedIn SaaS tools gate — and what a free static tool can take

| Tool | Free without signup | Gated behind account/paywall | Price |
|---|---|---|---|
| **AuthoredUp** | Post Preview Generator, Headline Optimization (both stated "no limitations") | Editor with text styling + bullets, unlimited drafts, **snippets**, **300+ hooks and post endings**, content analytics, profile growth tracking, saved-post filters, **best time to post**, **content calendar**, 1-click post reuse, team features | $19.95/mo individual; $14.95/profile/mo business (3 min); 14-day trial, no card; **no free tier** |
| **Taplio** | Post generator, carousel maker, **post formatter**, headline generator (stated free forever) | AI writing (Growth+), 5M+ viral post library, scheduling, analytics, auto-reply/comment credits, 3M+ lead database, auto-DM | $39 / $69 / $199 per mo; 7-day Pro trial; no free plan |
| **Typefully** | LinkedIn Text Formatter tool page (no account) | Everything above 15 posts/month, AI writing, more than 1 social set | Free (1 set, 15 posts/mo, no AI); Pro $10/mo |
| **Typegrow** | Standalone `/tools/linkedin-text-formatter` (stated free, no registration) | Suite requires an account; company-page posting and unlimited usage require Pro | Free plan with caps; Pro $29/mo ($20 annual) |
| **Supergrow** | Nothing permanent | Entire product | $19 / $39 / $139 per mo; 7-day trial only |
| **liftli** | All `/tools/*` pages run in-browser, no login (formatter, character counter, post preview, line-break fixer, AI-sounding-post checker, calculators) | Post/comment generation beyond 3 posts and 10 comments lifetime, strategy, scheduling | Free lifetime allowance; Pro $29/mo; Business $79/mo |
| **postformatter** | Online formatter, all tool pages, extension free core (bold, italic, bold-italic, strikethrough, underline, case) | **AI proofreading**, **20+ premium styles**, **multi-platform preview**, **Drafts Pro**, Smart Paste | Pro $8/mo, $29/yr, or **$49 lifetime** |
| **SocialCal** | Standalone browser tools (downloaders, carousel generator, previewers) | Scheduling, publishing, AI captions, analytics | $9 / $19–29 / $49 per mo; no free plan, $1 trial activation |
| **FinalLayer** | LinkedIn post generator, no signup, no payment | Publishing/scheduling (requires LinkedIn connection), personalisation, carousels, company pages | Free tier + paid Plus/Business |

**Specific gated features a free, static, client-side site could offer outright:**

1. **Drafts and snippets.** AuthoredUp charges $19.95/mo partly for saved drafts and reusable
   snippets. `localStorage` gives you both for free, with a stronger privacy story (nothing leaves the
   browser).
2. **A hook / post-ending library.** AuthoredUp's "300+ hooks and post endings" is a paid feature and
   is, functionally, a static content list. This is a pure content asset.
3. **Post preview with the real fold.** Free at AuthoredUp and liftli, paid-adjacent elsewhere. A
   desktop-vs-mobile preview that draws the "…see more" line is the highest-utility free tool in the
   category and the natural companion to a formatter.
4. **Selective, in-place formatting.** Most free generators are all-or-nothing (style the whole
   input). Only the better tools (liftli, lessie, Typefully) let you select a phrase and style only
   it. That is a UI feature, not a paid one, and it is the single biggest quality differentiator.
5. **"Clear formatting" / reverse.** liftli advertises a clear-formatting button as a differentiator.
   Trivially free, and it doubles as your standalone reverse tool.
6. **Character counter with per-field limits** (post 3,000 / headline 220 / About 2,600 /
   comment 1,250 / connection note 300, plus the fold). Free at liftli and postformatter, but almost
   nobody does it *correctly for Unicode* — see §5.
7. **Line-break fixer / blank-line preserver.** liftli gates nothing here, but the tool is rare and
   solves a genuinely painful documented bug (§5).
8. **Multi-platform preview.** postformatter charges for this in Pro. It is client-side CSS.
9. **Best-time-to-post and engagement-rate calculators.** AuthoredUp gates "best time to post"; liftli
   offers calculators free. These are static-data or arithmetic tools.
10. **An "AI-sounding post" checker.** liftli has one free; nobody in the fancy-text niche does.

---

## 5. What actually renders on LinkedIn, and what LinkedIn does to your text

### 5.1 Characters that render reliably

Consensus across four independent LinkedIn-focused sources (`connectsafely.ai`, `linkedinformatter.net`,
`ultratextgen.com`, `postbeam.ai`), none of them authoritative individually but agreeing:

- **Safest, universally rendered:** `•` U+2022 (bullet), `→` U+2192 (rightwards arrow),
  `✓` U+2713 (check mark). These are the three every source lists as reliable.
- **Generally reliable:** `▪` U+25AA (black small square), `◦` U+25E6 (white bullet),
  `▸` U+25B8, `◆` U+25C6, `★` U+2605, `✦` U+2726, `▶` U+25B6, `━` box-drawing for dividers.
- **Risky on older Android:** `‣` U+2023 (triangular bullet) and `▸` are both specifically called out
  as inconsistent on older Android font stacks, despite `▸` appearing on "tested" lists elsewhere —
  the sources disagree on this one, which is itself a signal to prefer `•`.
- **Most likely to show tofu (□):** Fraktur and Double-Struck alphabets, because they draw on Unicode
  blocks with the thinnest system-font coverage.
- Email notification previews are reported to strip or substitute some characters even when the feed
  renders them correctly.

### 5.2 Documented LinkedIn behaviours

**LinkedIn blocks styled Unicode in the headline field.** Reported August 2024 by Donna Serdula (a
LinkedIn profile-writing specialist): attempting to save a styled headline triggers
"Saving failed... there are invalid characters." Plain Unicode *symbols* still save fine; it is the
mathematical-alphanumeric letterforms that are rejected.
https://www.linkedin.com/posts/todonna_lately-ive-heard-from-several-people-that-activity-7229531262510632960-bjBo

**LinkedIn extended the block to About summaries on 25 January 2025**, auto-converting existing
stylized text to standard fonts. Reported independently by Kevin D. Turner (in his running
"NEW LinkedIn Features Captured in the Wild" log), Lynnaire Johnston, and Mary Fain Brandt.
**Flagged: I could not find an official LinkedIn announcement or help-centre article confirming
either block.** All three reports trace to the same observer community, so treat "About blocked on
25 Jan 2025" as strongly-reported community consensus rather than documented fact. It should be
verified by direct testing before being stated as fact on a live page.

**Line breaks and blank lines are collapsed inconsistently.** This is the most-complained-about
formatting behaviour on the platform, and it is device- and paste-source-dependent:

- Posts, desktop: single Enter preserved; double Enter usually preserved.
- Posts, mobile app: single Enter preserved; extra blank lines frequently stripped. More than one
  blank line is reported as reliably collapsed.
- Comments: single Enter preserved; blank lines between paragraphs not supported.
- Messages: Enter sends; Shift+Enter inserts a break.
- Pasting from Google Docs, Notion or a notes app is the most common trigger for collapse.
- The widely-used workaround is to place an invisible character (zero-width space) or a period on each
  intended blank line so the line is not "empty".
- There is a separate, ongoing About-section bug where formatting looks correct to the profile owner
  but renders as a single block to visitors. See Beth Granger's PSA thread and its comment chain,
  which is full of users confirming it and swapping unsuccessful workarounds:
  https://www.linkedin.com/posts/bethgranger_psa-its-not-just-you-there-seems-to-be-activity-7436238662775832577-dz20

**Search indexing.** The near-universal claim is that LinkedIn's internal search does not match
Unicode-styled text to plain queries, so bolding a keyword makes it undiscoverable. One source
(`lettertype.org`) claims LinkedIn does *partial* normalisation and that common keywords do still
surface. **Neither claim is verifiable from outside** — LinkedIn publishes nothing about its
normalisation pipeline, and I could not run authenticated search tests. What is technically certain,
and is the correct thing to publish, is the underlying mechanism: U+1D5EF (𝗯) is a distinct code point
from U+0062 (b), and matching them requires an explicit compatibility folding step (Unicode UTR #30,
"Character Foldings", http://www.unicode.org/reports/tr30/tr30-2.html; NFKC folding would map them,
plain NFC would not). Any platform that does not apply compatibility folding will fail to match. The
safe, defensible advice: never style keywords, names, job titles or hashtags.

**ATS export risk.** For job-seekers specifically, some applicant tracking systems strip non-ASCII on
import, which can turn a styled headline into replacement characters in a recruiter's system. Worth a
warning line on any LinkedIn page aimed at job seekers.

**Character limits (widely reported, and consistent across five sources):** post 3,000; headline 220
(≈60–70 visible in search results and comment bylines); About 2,600 (≈300 before "See more");
comment 1,250; connection note 300; DM 8,000; InMail subject 200; article title 150; position
description 2,000; poll question 140, options 30 each. The "…see more" fold is **≈210 characters on
desktop and ≈140 on mobile** — explicitly *not* published by LinkedIn and subject to UI change, so it
should be presented as an observed range. One further detail worth building correctly: emoji and
styled Unicode can count as more than one character against these limits, so a counter that uses
JavaScript `String.length` will over-count astral-plane characters (each mathematical alphanumeric
letter is a surrogate pair). Counting by code point (`[...str].length`) versus UTF-16 length versus
grapheme clusters gives three different numbers, and no competitor tool observed explains which one it
uses. That is a real, checkable differentiator.

---

## 6. Accessibility: the 2026 state of play

This is where the received wisdom in the niche is **out of date**, and that is an opportunity.

### 6.1 What actually changed: NVDA now normalises

From NVDA's own changelog (nvaccess.org, verified directly against the release documentation):

- **NVDA 2024.3** introduced Unicode normalization as an option for both speech and braille output,
  described in NVDA's own words as "useful when reading characters that are unknown to a particular
  speech synthesizer or braille table and which have a compatible alternative, **like the bold and
  italic characters commonly used on social media**" (#11570, #16466).
- **NVDA 2025.1** made **Unicode normalization enabled by default for speech output** (#17017).
- **NVDA 2026.2** extended normalization to decorative letters that were previously unsupported:
  "negative squared, negative circled, and regional indicator symbol characters are now normalized to
  their base Latin letters when Unicode normalization is enabled" (#19608).

Source: https://download.nvaccess.org/releases/2026.2beta6/documentation/changes.html (cumulative
changelog; section headings confirm which release each entry belongs to).

So for NVDA users on a current version, mathematical bold/italic text is read as ordinary text by
default, and as of 2026.2 so are ⓑⓤⓑⓑⓛⓔ and 🄽🄴🄶🄰🅃🄸🅅🄴-🅂🅀🅄🄰🅁🄴🄳 styles.

### 6.2 What has not changed

The behaviour remains **inconsistent across screen readers**, which is the actual accessibility
problem — a writer cannot predict which experience a given reader gets:

- **JAWS** (the most-used desktop screen reader, ~40.5% primary usage per WebAIM's 2024 survey, as
  cited by givemefonts.com) is reported to read the full formal Unicode name of each character:
  "Mathematical Bold Capital H, Mathematical Bold Small E, …".
- **Windows Narrator** is reported to announce nothing meaningful.
- **VoiceOver on iOS** is reported as version-dependent and inconsistent.

The best single piece of first-hand evidence found is a comment thread on Anna Cook's LinkedIn post
(8 March 2026), where a reader tested the same Unicode headline across three screen readers and
reported: NVDA read it with no issue; JAWS read one character at a time announcing caps and lowercase;
Narrator substituted "%" for the entire headline.
https://www.linkedin.com/posts/annaecook_accessibility-inclusivedesign-productdesign-activity-7436464571600486400-WIDS

That result lines up exactly with the NVDA changelog and is a strong signal that the honest 2026
framing is: **"NVDA fixed this by default in 2025; JAWS, Narrator and VoiceOver did not, so the
outcome still depends on which screen reader your reader uses."** No competitor page found makes this
distinction — they all still repeat the flat "screen readers can't read it" line, which is now only
partly true.

### 6.3 LinkedIn-specific accessibility discourse worth citing

- **Alistair Croll**, "Fake boldface is killing the accessibility of LinkedIn posts" (6 April 2025) —
  the most-linked artefact in this debate. Makes the screen-reader argument, the search argument, and
  a pointed attack on font-generator sites themselves ("those boldface sites install tracking cookies,
  and are often run by offshore sites on dubious servers"). Also republished at
  https://www.alistaircroll.com/updates/fake-boldface-is-killing-the-accessibility-of-the-internet/
- **CAST (Center for Applied Special Technology)**, August 2026 — an institutional accessibility
  organisation stating it uses plain text in every post.
  https://www.linkedin.com/posts/castorg_accessiblesocialmedia-activity-7493119809505705984-Wxa-
- **Content Design Ireland**, June 2026 — includes the U+1D407 U+1D41E U+1D425 U+1D425 U+1D428
  ("Hello") illustration, and constructive alternatives: front-load emphasis, use short paragraphs
  and lists.
  https://www.linkedin.com/posts/contentdesignireland_fonts-accessibility-styling-activity-7470087386220187648-Ej8R
- **Anna Cook**, March 2026 — the most nuanced take, arguing the root cause is a *platform* failure
  (LinkedIn provides no headings, no hierarchy, no emphasis) and that the fix is a basic WYSIWYG
  editor, not scolding individual authors. This is the framing a tool site should adopt.
- **Nigel Cliffe** — "Why I don't use bold or italic text on LinkedIn", with a comment thread of
  people who stopped after learning about screen readers. Useful for the "what to do instead" list:
  line breaks, white space, bullets, sparing capitalisation, strong hooks.
- **m365princess.com/blogs/bold/** — the strongest-worded piece ("that's not clever, that's
  unethical"), useful to cite precisely because it is hostile; engaging with it directly is more
  credible than ignoring it.
- **LinkedIn Help, "Screen reader support"** (https://www.linkedin.com/help/linkedin/answer/a1431878)
  — LinkedIn's only official accessibility page found. It covers how to *use* LinkedIn with a screen
  reader; **it says nothing about Unicode styling in posts.** LinkedIn has published no guidance on
  this at all, which is itself a citable fact.

**The opportunity:** the site already has a guide at `/guides/do-fancy-fonts-break-screen-readers`.
It is almost certainly repeating the pre-2025 consensus. Updating it with the NVDA version history
above would make it the most accurate page on this topic on the open web, and it is exactly the kind
of page that earns links from the accessibility community that currently links only to Croll.

---

## 7. Ranked gap list with concrete recommendations

### Tier 1 — build first

1. **`/linkedin-text-formatter/`** — the money page. Must have: selection-based styling (not
   whole-input), bold / italic / bold-italic / underline / strikethrough / monospace as the primary
   six, a live LinkedIn-shaped preview with the desktop and mobile fold lines drawn, a per-field
   character counter, a one-click "clear formatting" reverse, and an honest accessibility note. Every
   competitor's page is missing at least three of those.
2. **`/chatgpt-to-linkedin/`** (or `/markdown-to-linkedin/`) — paste markdown, get LinkedIn-ready
   text. Must handle `**bold**`, `*italic*`, `~~strike~~`, `` `code` ``, `#`/`##`/`###` headings,
   `-`/`*`/`1.` lists → real `•`, links → `label (url)`, and tables → something survivable. Offer a
   toggle between "convert to Unicode styling" and "strip to clean plain text", because the two user
   intents are roughly equal in size.
3. **`/unformat-text/`** (Unicode → plain) — the reverse tool. `convert fancy text` autocompletes to
   "to normal" as its top suggestion. Should handle all mathematical alphanumeric blocks, enclosed
   alphanumerics, fullwidth, small caps, and combining-mark (Zalgo) stripping. This page is also the
   ethical counterweight to the rest of the site and pairs naturally with the accessibility guide.
4. **`/ai-text-cleaner/`** — em dashes, en dashes, curly quotes, curly apostrophes, ellipsis
   character, non-breaking spaces (U+00A0), zero-width spaces (U+200B), zero-width joiners, and
   leftover markdown. Individually toggleable. Position as "clean up formatting artefacts", not "beat
   AI detectors".
5. **`/linkedin-character-counter/`** and **`/linkedin-post-preview/`** — small, cheap, and they
   internally link to everything else. The counter should be the only one on the web that explains
   UTF-16 length vs code points vs grapheme clusters and counts correctly.

### Tier 2 — supporting surface

6. **Bullet, divider and symbol libraries scoped to LinkedIn** — `/linkedin-symbols/`,
   `/bullet-point-symbols/`, `/text-dividers/`. Rank the characters by rendering reliability rather
   than just dumping a grid; that is what no competitor does.
7. **`/word-counter/` and `/character-counter/`** — the highest relative-demand terms in the whole
   research set after "text art". Commodity keywords, but they anchor a utility hub and generate
   internal links.
8. **`/text-repeater/`, `/remove-line-breaks/`, `/em-dash-remover/`, `/remove-formatting/`,
   `/lorem-ipsum-generator/`** — each is one small component, and each is already proven by
   convertcase.
9. **Emoji picker / emoji hub** — 748 relative index, and yaytext built 1,604 pages on it. Even a
   single well-built picker page with category anchors captures a slice.
10. **An `/answers/` section** modelled on ultratextgen: short, single-question pages
    (`why-is-my-name-showing-as-boxes`, `can-you-search-fancy-text`, `is-linkedin-bold-text-safe`,
    `does-linkedin-support-markdown`, `what-font-does-linkedin-use`, `why-does-copied-fancy-text-lose-formatting`).
    Cheapest indexable surface area available.

### Tier 3 — differentiation

11. **"X vs Y" and alternative pages.** postformatter runs five `*-alternative` pages and they clearly
    work. Equivalents: `yaytext-alternative`, `lingojam-alternative`, `authoredup-alternative`,
    `unicode-bold-vs-real-bold`, `linkedin-articles-vs-posts-formatting`.
12. **A `/how-we-test/` page** (copied from linkedinformatter.net) documenting which devices, apps and
    screen readers you verified rendering on. Nobody in the fancy-text niche has one, and it is the
    cheapest E-E-A-T asset available.
13. **Alt-codes / keyboard section** (fsymbols owns this; coolsymbol has one page). Windows alt codes,
    Mac option codes, iOS/Android text-replacement setup for `•`.
14. **A Unicode character inspector and name search** (qaz.wtf has both and blocks Google entirely, so
    the keywords are unclaimed by the best implementation).
15. **Drafts and snippets in `localStorage`** — takes a paid AuthoredUp feature and makes it free with
    a better privacy story.
16. **A hook / post-ending library** — AuthoredUp charges for "300+ hooks"; it is a static list.

---

## 8. Things I could not verify — flagged explicitly

- **Absolute search volumes.** The Ahrefs MCP integration in this environment requires interactive
  OAuth, which a background agent cannot complete. The volume figures in §2.2 come from a single
  scraped Semrush mirror and repeated attempts to re-fetch that mirror (and sitestatsdb.com) timed out
  or returned HTTP 429. All Google Trends figures are my own measurements and are reproducible, but
  they are *relative* interest, never absolute volume.
- **US-specific LinkedIn demand.** A US-geo Trends query anchored on "word counter" returned ≈0.0–0.1
  for "linkedin text formatter" against ≈39–59 for "word counter". Because Trends rounds low-volume
  terms to zero when grouped with a much larger anchor, that result is unreliable rather than
  meaningful, and I am not drawing a conclusion from it.
- **LinkedIn's About-section fancy-font block (25 Jan 2025)** and the **headline "invalid characters"
  rejection**. Multiple independent practitioners report both; LinkedIn has published neither. Test
  directly before asserting them on a live page.
- **Whether LinkedIn search normalises Unicode.** Sources contradict each other and it is not testable
  without an authenticated account and controlled experiments. Publish the code-point mechanism (which
  is certain) rather than the indexing claim (which is not).
- **fancytextguru.com's site structure.** ModSecurity blocked every sitemap and page request.
- **Competitor traffic and DR figures** beyond the single lingojam datapoint, for the same rate-limit
  reasons.
- **Screen reader behaviour for JAWS, Narrator and VoiceOver** in 2026. The NVDA facts come from
  NVDA's official changelog and are solid. The JAWS/Narrator/VoiceOver claims are drawn from
  secondary sources and one first-hand LinkedIn comment thread; Freedom Scientific and Apple publish
  nothing comparable to NVDA's changelog on this. Real-device testing would be needed to state these
  as facts.
