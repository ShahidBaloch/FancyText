/** Extra on-page sections for mood lists (indexed pages get richer prose). */
export type KaomojiProseSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

/** Unique meta + meanings + FAQ overlays for kaomoji lists (slug → copy). */
export type KaomojiUniqueCopy = {
  /** SERP title override (keyword + hook + | FancifyText). */
  title?: string;
  description: string;
  /** Open Graph / Twitter subtitle (sample faces + CTA). */
  ogSubtitle?: string;
  /** Visible lead under the hero—must not repeat the meta description verbatim. */
  canonicalLead?: string;
  meanings: string;
  meaningsHeading?: string;
  howToHeading?: string;
  howToSteps?: string[];
  mobileNote?: string;
  whereHeading?: string;
  whereBullets?: string[];
  extraSections?: KaomojiProseSection[];
  faq: { question: string; answer: string }[];
};

export type KaomojiSituationRow = {
  situation: string;
  face: string;
  href: string;
  linkLabel: string;
  hint: string;
};

export type KaomojiMisspelling = {
  /** How people often type the word in search. */
  typo: string;
  note: string;
};

export type KaomojiHubContent = {
  introBelowHero: string;
  editorial: KaomojiProseSection;
  /** Unique teaser under hub preview grids (slug without leading slash). */
  moodPreviewLeads: Record<string, string>;
  /** Top Search Console typos—same tool, helpful spelling section (not keyword stuffing). */
  commonMisspellings: KaomojiMisspelling[];
  sections: KaomojiProseSection[];
  situations: KaomojiSituationRow[];
  faq: { question: string; answer: string }[];
};

export const KAOMOJI_UNIQUE_COPY: Record<string, KaomojiUniqueCopy> = {
  "angry-kaomojis": {
    description:
      "Copy furious angry kaomojis and mad text faces like (ノಠ益ಠ)ノ. Express rage and frustration in Discord, chats, and comments.",
    whereHeading: "Where mad kaomoji fit",
    whereBullets: [
      "Meme replies and game rage threads—not formal support tickets.",
      "Table-flip faces are long; use them in messages, not compact nicknames.",
      "Pair one angry face with words so tone stays obvious in notifications.",
      "For villain smirks instead of frustration, try evil kaomojis.",
    ],
    meanings:
      "Angry kaomojis exaggerate furrowed eyes, gritted teeth, or table flips. Use them when a sticker feels too soft—venting in Discord, roasting a bug, or reacting to unfair rules. Keep extreme faces for jokes; milder mad eyes work better in bios.",
    faq: [
      {
        question: "What does an angry kaomoji look like?",
        answer:
          "Mad text faces use furrowed eyes (ಠ), gritted mouths, or table-flip arms. (ノಠ益ಠ)ノ彡┻━┻ is the classic rage flip.",
      },
      {
        question: "When is a table-flip face too much?",
        answer:
          "Save the full flip for jokes and memes. In nicknames or work chats, a short glare like ಠ_ಠ reads angry without looking like spam.",
      },
      {
        question: "Can I put angry kaomoji in a Discord nickname?",
        answer:
          "Short faces usually work. Long combining-mark stacks can fail Discord’s nickname filter—trim to one line.",
      },
      {
        question: "Angry vs evil kaomoji — what’s the difference?",
        answer:
          "Angry faces show frustration. Evil faces smirk or scheme. Use this list to vent; use evil kaomojis for mischievous plotting.",
      },
      {
        question: "Why do some angry faces show as boxes?",
        answer:
          "Some symbols sit outside common mobile fonts. If a face breaks, copy a shorter glare from higher in the list.",
      },
    ],
  },
  "bear-kaomojis": {
    description:
      "Bear kaomoji. Browse Japanese bear emoticons like ʕ•ᴥ•ʔ. Cute bear, panda, and teddy text faces to copy for Discord and social bios.",
    meanings:
      "Bear kaomojis use round ears and a snout (often ᴥ) for a cuddly animal vibe. Popular for soft Discord names, cozy captions, and “hibernating” jokes. Pair with cute or hug faces when you want warmth without hearts.",
    faq: [
      {
        question: "What is a bear kaomoji?",
        answer:
          "ʕ•ᴥ•ʔ is the classic bear kaomoji. The ʕ ʔ marks are ears and ᴥ is the snout. It is one of the most copied animal text faces online.",
      },
      {
        question: "Are bear kaomojis the same as panda faces?",
        answer:
          "Panda variants usually add extra dots or blush. This list mixes teddy, bear, and panda-style snouts so you can pick the mood.",
      },
      {
        question: "Do bear ears work in Instagram bios?",
        answer:
          "Usually yes. Keep the bio to one short bear face plus plain text so the ears stay readable on a phone.",
      },
      {
        question: "Bear vs cat vs dog kaomoji?",
        answer:
          "Bears are round and cozy, cats are pointy-eared and aloof, dogs are floppy and playful. Open the matching animal list for a full set.",
      },
      {
        question: "Can I use a bear face as a Discord name?",
        answer:
          "Yes if it is short. ʕ•ᴥ•ʔ is a common nickname. Longer ear stacks may get clipped in the member list.",
      },
    ],
  },
  "cat-kaomojis": {
    description:
      "Cat kaomoji. Find Japanese cat emoticons (=^･ω･^=) and kitty text faces. Copy feline kaomojis for Discord, TikTok, and bios.",
    meanings:
      "Cat kaomojis lean on pointed ears and ^ω^ eyes for playful or aloof energy. Great for pet accounts, kawaii bios, and sarcastic “meh” reactions. Shorter faces render more reliably on mobile than dense ear stacks.",
    faq: [
      {
        question: "What is a cat kaomoji?",
        answer:
          "Pointed ears (=^ ω ^=) and a small ω or ﻌ mouth. Kitty faces are narrower than bear snouts.",
      },
      {
        question: "Which cat kaomoji is best for a pet account?",
        answer:
          "Short faces like (=^･ω･^=) read clearly next to a handle. Save extra-whisker stacks for comments.",
      },
      {
        question: "Do cat kaomojis work in TikTok captions?",
        answer:
          "Most do. If a whisker character boxes out, switch to a simpler (=^・^=) from the list.",
      },
      {
        question: "Cat vs cute kaomoji?",
        answer:
          "Cat faces are animal-shaped. Cute kaomojis are generic kawaii blushes and round eyes without ears.",
      },
      {
        question: "Can I copy cat kaomoji for Discord emotes?",
        answer:
          "Paste them as plain text in messages or nicknames. They are not custom server emotes—just Unicode.",
      },
    ],
  },
  "confused-kaomojis": {
    description:
      "Copy confused kaomoji and puzzled text faces for “huh?” moments in chat, Discord, and comments.",
    meanings:
      "Confused faces tilt eyes, add question marks, or freeze mid-thought. Use them when you need a light “I don’t get it” without typing a paragraph—support threads, group chats, and meme replies. For “whatever / idk,” use the shrug emoticon page instead of this list.",
    faq: [
      {
        question: "What is a confused kaomoji?",
        answer:
          "A puzzled text face with tilted eyes, a question mark, or a stalled mouth—like (・・？) or (⊙_☉).",
      },
      {
        question: "Confused vs thinking kaomoji?",
        answer:
          "Confused is “I don’t get it.” Thinking is “I’m working it out.” Use thinking faces for decisions; use this list for huh-moments.",
      },
      {
        question: "Should I use a shrug for confusion?",
        answer:
          "The shrug emoticon ¯\\_(ツ)_/¯ means “whatever / I don’t know.” It has its own page. This list is for puzzled eyes, not shoulder shrugs.",
      },
      {
        question: "Do confused faces work in support tickets?",
        answer:
          "A short (・・？) is fine in casual Discord help. Skip dense faces in formal email.",
      },
      {
        question: "Why do some confused kaomojis include semicolons?",
        answer:
          "The semicolon is a sweat drop in Japanese emoticons—awkward confusion rather than anger.",
      },
    ],
  },
  "cry-kaomojis": {
    title: "Cry Kaomoji Copy Paste — (T_T) Crying Faces | FancifyText",
    ogSubtitle: "(T_T) (╥_╥) + more cry kaomoji — tap to copy for Discord & chat",
    description:
      "Copy cry kaomoji free—(T_T), (╥_╥) & tearful text faces for Discord and chat. Tap any face; no app or login.",
    canonicalLead:
      "This is the dedicated crying set—faces with visible tears for memes, apologies, and dramatic reactions. Quiet down moods without waterworks are on the sad kaomoji list; the hub only shows a small cry sample.",
    whereHeading: "Where crying text faces fit",
    whereBullets: [
      "Discord threads: one (T_T) or (╥_╥) next to words reads clearer than three faces in a row.",
      "Game chat: comic defeat or patch-day grief—keep nicknames tear-free.",
      "Comments: dramatic tone works; avoid dense tear stacks that break on mobile fonts.",
      "Support DMs: a single short cry face can soften an apology; add a plain sentence too.",
    ],
    meaningsHeading: "Tears vs a quiet frown",
    meanings:
      "Cry kaomojis show falling tears or sob lines. Use them for over-the-top apology memes and dramatic reactions. Prefer sad kaomojis when you want melancholy without the waterworks.",
    extraSections: [
      {
        id: "cry-vs-sad",
        heading: "Cry kaomoji vs sad kaomoji",
        paragraphs: [
          "Cry faces show waterworks—T_T, ╥, or visible drip marks. Sad faces droop without pouring tears. Use cry when the joke is dramatic (“I failed the boss again”); use sad when the mood is quiet disappointment.",
          "In support chats, one short (T_T) next to an apology reads sincere without sounding performative. Stack three crying faces and it starts to look like spam in notification previews.",
        ],
      },
      {
        id: "compatible-cry",
        heading: "Crying faces that survive mobile",
        paragraphs: [
          "Punctuation-heavy cries copy cleanly because they use symbols every phone font already has. Ornate fullwidth tear stacks look impressive on desktop but are the first to box out on older Android.",
        ],
        bullets: [
          "(T_T) and (╥_╥) — safest for comments and bios",
          "(；ω；) — soft sob; common in anime-flavored chats",
          "(╯︵╰,) — curled defeat; meme tone, not grief",
        ],
      },
    ],
    howToHeading: "Copy a crying face",
    howToSteps: [
      "Pick a face with visible tears, not just a downturned mouth.",
      "Tap it. Short marks like (T_T) survive phones better than dense drip stacks.",
      "Paste in a reply. One crying face is enough next to plain words.",
    ],
    mobileNote:
      "On a phone, (╥_╥) and (T_T) rarely box out. If a fancy tear glyph fails, use those.",
    faq: [
      {
        question: "What is a cry kaomoji?",
        answer:
          "A text face with tears or sob marks such as (Ｔ▽Ｔ) or (╥﹏╥). The crying is visible, not just a downturned mouth.",
      },
      {
        question: "Cry vs sad kaomoji?",
        answer:
          "Cry faces leak tears. Sad faces droop without the waterworks. Use sad for quiet moods and cry for dramatic ones.",
      },
      {
        question: "Are crying kaomojis okay in Discord?",
        answer:
          "Yes in messages and topics. Very long tear stacks can wrap badly in nicknames—keep those short.",
      },
      {
        question: "Which cry face is the most compatible?",
        answer:
          "(╥_╥) and (T_T) style faces use common punctuation and rarely box out on phones.",
      },
      {
        question: "Can I use cry kaomoji in an Instagram caption?",
        answer:
          "Yes. Pair one short crying face with plain words so the caption still searches well.",
      },
    ],
  },
  "cute-kaomojis": {
    title: "Cute Kaomoji Copy Paste — (｡◕‿◕｡) Kawaii | FancifyText",
    ogSubtitle: "(｡◕‿◕｡) kawaii kaomoji — tap to copy for Discord bios & Instagram",
    description:
      "Copy cute kaomoji free—(｡◕‿◕｡) kawaii & blush text faces for Discord bios and Instagram. Tap to copy; works on mobile.",
    canonicalLead:
      "Every kawaii face on this page is curated for short bios and soft replies—round eyes and blush, not animal-ear mascots (those live on the cat and bear lists). The mixed kaomoji hub is for browsing; this URL is the full cute set.",
    whereHeading: "Where cute kaomoji work best",
    whereBullets: [
      "Discord about-me: one blush face after plain words; skip long stacks in nicknames.",
      "Instagram and TikTok captions: pair a single (｡◕‿◕｡)-style face with your sentence.",
      "WhatsApp status: short faces only—the status line wraps on small screens.",
      "For styled names (bubble letters), use the cute fonts generator; kaomoji stay as emoticons beside the name.",
    ],
    meaningsHeading: "Kawaii faces, not animal ears",
    meanings:
      "Cute kaomojis prioritize blush (///), round eyes, and gentle mouths. They are people-shaped, not cat/bear/dog. Keep them short so the details stay readable on a phone bio.",
    extraSections: [
      {
        id: "discord-bio",
        heading: "Best cute kaomoji for Discord bios",
        paragraphs: [
          "Discord about-me and nicknames truncate fast. A single compact face like (｡◕‿◕｡) or (⁄ ⁄>⁄ ▽ ⁄<⁄ ⁄) reads as kawaii without eating the whole line. Put plain words first, then one face at the end so mobile still shows your message.",
          "Avoid table-flips and long combining stacks in nicknames—the client may reject them. Messages and topics tolerate longer faces; bios and display names should stay under one screen width.",
        ],
        bullets: [
          "(｡◕‿◕｡) — friendly default; works almost everywhere",
          "(◕‿◕) — even shorter; good when the bio is already full",
          "(⁄ ⁄>⁄ ▽ ⁄<⁄ ⁄) — heavy blush; test on your phone first",
        ],
      },
      {
        id: "pair-fonts",
        heading: "Cute kaomoji with styled names",
        paragraphs: [
          "Kaomoji are emoticons, not letter fonts. For a decorated username, generate bubble or script letters on the cute fonts page, then paste one kaomoji beside the name—not inside every character.",
        ],
      },
    ],
    howToHeading: "Copy a blush or round-eye face",
    howToSteps: [
      "Skip animal-ear lists—those are cat, bear, and dog pages.",
      "Prefer a compact smile like (｡◕‿◕｡) if the bio is already crowded; dense blush slashes eat width.",
      "Paste one face. Extra kaomoji get truncated in Discord’s member list.",
    ],
    mobileNote:
      "Blush slashes (／) sometimes box out on older Androids. Fall back to a short punctuation smile.",
    faq: [
      {
        question: "What is a cute kaomoji?",
        answer:
          "Round eyes, blush (///), and small smiles. They are kawaii people-faces, not animal ears (those live on cat/bear/dog lists).",
      },
      {
        question: "Which cute face is safest for a bio?",
        answer:
          "Short blushes like (⁄ ⁄>⁄ ▽ ⁄<⁄ ⁄) can be dense. Prefer a compact (｡◕‿◕｡) or similar short smile if the bio is already crowded.",
      },
      {
        question: "Cute kaomoji vs cute Unicode fonts?",
        answer:
          "Kaomoji are emoticons. Cute fonts (bubble letters) are styled A–Z on the cute fonts generator. You can combine both in a bio.",
      },
      {
        question: "Do cute kaomojis work on WhatsApp?",
        answer:
          "Most do in chats and status. If a blush slash shows as a box, pick a face made of common punctuation.",
      },
      {
        question: "Can I spam cute faces in a Discord nickname?",
        answer:
          "One face is enough. Extra kaomoji get truncated in the member list and look noisy.",
      },
    ],
  },
  "drool-kaomojis": {
    description:
      "Drool kaomoji. Copy drool and hungry kaomoji faces for food posts, craving jokes, and playful chats.",
    meanings:
      "Drool faces add saliva lines or open mouths to signal hunger or desire. Perfect under food pics, game loot reveals, and “I want that” comments. Avoid stacking too many drip marks in usernames.",
    faq: [
      {
        question: "When should I use a drool kaomoji?",
        answer:
          "Food photos, unboxing, wishlists, and “I want that” replies. It reads as craving, not sadness.",
      },
      {
        question: "Are drool faces the same as hungry emojis?",
        answer:
          "The drooling emoji (🤤) is a picture character. Drool kaomoji are punctuation faces you can mix with words.",
      },
      {
        question: "Will drool kaomoji work in TikTok comments?",
        answer:
          "Usually. Keep drip marks light so the comment does not look broken on smaller screens.",
      },
      {
        question: "Can I use drool faces in a username?",
        answer:
          "Risky. Extra saliva lines look messy in tiny UI. Use them in captions instead.",
      },
      {
        question: "Drool vs funny kaomoji?",
        answer:
          "Drool is specifically hungry or wanting. Funny faces are generic lol energy.",
      },
    ],
  },
  "evil-kaomojis": {
    description:
      "Evil kaomoji. Copy evil and mischievous kaomoji for scheming jokes, villain vibes, and playful Discord chaos.",
    meanings:
      "Evil kaomojis use sharp grins, shaded eyes, or horn-like marks for mischief. Great for gaming trash talk, April Fools energy, and “plotting” memes—less ideal for professional bios.",
    faq: [
      {
        question: "What is an evil kaomoji used for?",
        answer:
          "Playful villain energy—scheming in games, prank warnings, or “hehe” Discord replies. It is mischief, not real hostility.",
      },
      {
        question: "Evil vs angry kaomoji?",
        answer:
          "Evil smirks. Angry glares or flips tables. Pick evil when you are plotting; pick angry when you are frustrated.",
      },
      {
        question: "Are horned faces okay in school chats?",
        answer:
          "They can look aggressive out of context. Use a small grin instead of a dense “demon” stack.",
      },
      {
        question: "Do evil kaomojis render on iPhone?",
        answer:
          "Simple grins do. Rare symbol mixes may box out—copy a short face from the top of the list first.",
      },
      {
        question: "Can I use evil kaomoji in a gaming clan name?",
        answer:
          "If the platform allows the characters. Test in the name field; some games strip unusual punctuation.",
      },
    ],
  },
  "heart-kaomojis": {
    title: "Heart Kaomoji Copy Paste — ♡ Love Text Faces | FancifyText",
    ogSubtitle: "♡ heart kaomoji — tap to copy for DMs, bios & couple Discord",
    description:
      "Copy heart kaomoji with ♡ built in—love text faces for DMs, couple Discord & sweet bios. Free tap-to-copy; no sticker pack.",
    canonicalLead:
      "Hearts here are woven into the face—not a lone ♡ emoji. Use this list for affectionate DMs, thank-yous, and couple bios; flirty smooch marks are on kiss kaomojis, comfort arms on hug kaomojis.",
    whereHeading: "Where heart kaomoji land well",
    whereBullets: [
      "Couple Discord: one heart face in a shared topic or status, not both nicknames filled with symbols.",
      "Instagram bio: one ♡ face plus a short line—150 characters go quickly.",
      "WhatsApp DMs: heart-in-face text pastes reliably; ornate hearts are the ones that box out.",
      "Public comments: heart faces read warmer than kiss faces when the audience is mixed.",
    ],
    meaningsHeading: "Affection in punctuation",
    meanings:
      "Heart kaomojis weave ♡ or similar marks into a face. Use them in DMs, thank-you notes, and soft bios. Kiss lists are flirty; hug lists are comfort. Mix only if the message is clearly friendly or romantic.",
    extraSections: [
      {
        id: "heart-bio",
        heading: "Heart kaomoji in Instagram and TikTok bios",
        paragraphs: [
          "One heart face plus a short line beats a wall of ♡ characters. Instagram caps bios at 150 characters; TikTok is tighter. Pick a face where the heart is obvious at a glance—readers should not have to squint at combining marks.",
          "Handles stay plain ASCII; hearts live in the bio body, captions, and comments only.",
        ],
      },
      {
        id: "heart-tone",
        heading: "Hearts vs hugs vs kisses",
        paragraphs: [
          "Heart kaomoji signal general affection—thanks, pride in a friend, soft couple energy. Kiss faces add smooch marks for flirting. Hug faces stretch arms for comfort after bad news. Matching tone to relationship avoids awkward group-chat reads.",
        ],
        bullets: [
          "Heart — thank-yous, anniversaries, wholesome hype",
          "Hug — support when someone shares rough news",
          "Kiss — DMs and couple nicknames; lighter in public threads",
        ],
      },
    ],
    howToHeading: "Copy a face that includes a heart",
    howToSteps: [
      "Pick a face with ♡ or heart arms, not a lone emoji.",
      "Tap a short one for a bio—Instagram’s 150-character limit goes fast.",
      "Paste. If a fancy heart boxes out, use a simple ♡ from the list.",
    ],
    mobileNote:
      "Simple ♡ usually shows in Discord and WhatsApp. Rare ornate hearts are the ones that fail.",
    faq: [
      {
        question: "What is a heart kaomoji?",
        answer:
          "A text face that includes ♡, ❤, or heart-shaped arms. It is affection in punctuation, not the standalone heart emoji.",
      },
      {
        question: "Heart vs kiss vs hug kaomoji?",
        answer:
          "Hearts are general love. Kisses are flirty. Hugs are comfort. Mix them only if the message is clearly romantic or friendly.",
      },
      {
        question: "Will ♡ show in Discord?",
        answer:
          "Yes on modern clients. If a fancy heart boxes out, use a simple ♡ from the list.",
      },
      {
        question: "Are heart kaomojis good for Instagram bios?",
        answer:
          "One short heart face is plenty. Too many hearts waste the 150-character limit.",
      },
      {
        question: "Can I copy heart kaomoji for WhatsApp status?",
        answer:
          "Yes. Paste a single face plus a short line so status text stays readable.",
      },
    ],
  },
  "hug-kaomojis": {
    description:
      "Hug kaomoji. Copy hug and cuddle kaomoji to send comfort, support, or friendly hellos in text.",
    meanings:
      "Hug faces stretch arms outward (often with つ or similar) to offer comfort. Ideal after sad news, for “miss you” messages, and wholesome Discord replies. Softer than kiss faces for friend groups.",
    faq: [
      {
        question: "How do hug kaomojis work?",
        answer:
          "They stretch arms (つ or づ) around a face, like (つ≧▽≦)つ, to look like an embrace in text.",
      },
      {
        question: "When should I send a hug kaomoji?",
        answer:
          "After someone shares bad news, when you cannot be there in person, or as a wholesome hello. It is support, not flirting (use kiss for that).",
      },
      {
        question: "Do hug faces work in Discord DMs?",
        answer:
          "Yes. They are plain Unicode. Long arm stacks may wrap—prefer a compact hug in nicknames.",
      },
      {
        question: "Hug vs cute kaomoji?",
        answer:
          "Cute is generic kawaii. Hug specifically offers an embrace. Use hug when the point is comfort.",
      },
      {
        question: "Can I use a hug kaomoji in an email signature?",
        answer:
          "Only in casual mail. Formal signatures should stay plain text.",
      },
    ],
  },
  "kiss-kaomojis": {
    description:
      "Kiss kaomoji. Copy kiss and smooch kaomoji for flirty chats, couple Discord, and romantic bios.",
    meanings:
      "Kiss kaomojis add 3, *, or cheek marks for smooches. Best for private chats and couple nicknames. For public bios, prefer a single short kiss face so it does not look spammy.",
    faq: [
      {
        question: "What does a kiss kaomoji look like?",
        answer:
          "A face with a 3, *, or cheek kiss mark—like (*^3^)/~☆. It is more intimate than a heart-only face.",
      },
      {
        question: "Are kiss kaomojis okay in public comments?",
        answer:
          "Use them with people who expect flirting. In group chats, a heart or cute face is less loaded.",
      },
      {
        question: "Kiss vs heart kaomoji?",
        answer:
          "Hearts are general affection. Kisses imply a smooch. Pick the intensity that matches the relationship.",
      },
      {
        question: "Do kiss faces work on Instagram?",
        answer:
          "Yes in DMs and captions. Keep bios to one short face so the profile still scans.",
      },
      {
        question: "Why do some kiss kaomojis have stars?",
        answer:
          "The sparkles are extra kawaii decoration. They are optional—copy a starless face if you want a cleaner look.",
      },
    ],
  },
  "music-kaomojis": {
    description:
      "Music kaomoji. Copy music and singing kaomoji for playlist shares, concert posts, and musical Discord vibes.",
    meanings:
      "Music faces add ♪ ♫ notes or singing mouths. Drop them under song links, karaoke nights, and “currently listening” statuses. Notes travel well across apps because they are common Unicode.",
    faq: [
      {
        question: "What is a music kaomoji?",
        answer:
          "A text face with ♪ ♫ notes or a singing mouth. Use it when sharing a track, not as a generic smile.",
      },
      {
        question: "Do music notes work everywhere?",
        answer:
          "♪ and ♫ are widely supported. Unusual karaoke stacks may fail—copy a short note face first.",
      },
      {
        question: "Can I use music kaomoji in a Spotify-related Discord topic?",
        answer:
          "Yes if the channel topic allows Unicode. Keep it short so the topic still states the channel purpose.",
      },
      {
        question: "Music kaomoji vs emoji notes?",
        answer:
          "🎵 is an emoji. Music kaomoji combine a face plus notes, which looks more like a singer.",
      },
      {
        question: "Are these good for TikTok sounds captions?",
        answer:
          "A single ♪ face works. Long singing stacks waste caption space and can clip on mobile.",
      },
    ],
  },
  "sad-kaomojis": {
    description:
      "Sad kaomoji. Copy sad and melancholy kaomoji for quiet down moods—less tearful than cry faces.",
    meanings:
      "Sad kaomojis droop eyes or mouths without heavy tears. Use for soft disappointment, rainy-day captions, and reflective posts. Switch to cry kaomojis when you want dramatic sobbing energy.",
    faq: [
      {
        question: "What is a sad kaomoji compared with a cry face?",
        answer:
          "Sad faces droop without pouring tears. Cry faces add ╥ or T_T waterworks. Use sad for melancholy, cry for drama.",
      },
      {
        question: "Which sad face is best for a caption?",
        answer:
          "A short (´･_･`) or (._.) stays readable beside a sentence. Dense rain-of-tears marks belong on the cry list.",
      },
      {
        question: "Do sad kaomojis work in Discord statuses?",
        answer:
          "Yes. Custom statuses accept most of these characters. Avoid huge stacks that wrap.",
      },
      {
        question: "Sad vs scared kaomoji?",
        answer:
          "Sad is down. Scared is fear or jump-scare. Different mood, different list.",
      },
      {
        question: "Can I use sad kaomoji in a username?",
        answer:
          "A tiny downturned face is fine. Long gloomy stacks look broken in compact UI.",
      },
    ],
  },
  "shocked-kaomojis": {
    description:
      "Copy shocked kaomoji with jaw-drop energy for extreme “no way” reactions in chat.",
    meanings:
      "Shocked faces open the mouth wide (□ О ﾟДﾟ) for hard surprise or horror. Reserve them for big reveals and punchline replies. For milder “oh!” moments, use the surprised kaomoji list instead.",
    faq: [
      {
        question: "What makes a kaomoji look shocked?",
        answer:
          "A wide-open mouth (□, ﾟДﾟ, 〇) and staring eyes. It should feel like a jaw drop, not a polite “oh.”",
      },
      {
        question: "Shocked vs surprised kaomoji?",
        answer:
          "Shocked is extreme—horror, plot twists, huge news. Surprised is a softer OMG. The two lists no longer share the same faces.",
      },
      {
        question: "Which shocked face is most compatible?",
        answer:
          "(⊙_⊙) and (°□°) use common symbols. Heavy fullwidth stacks are more likely to box out.",
      },
      {
        question: "Can I use shocked kaomoji in a Twitch chat?",
        answer:
          "Plain Unicode usually works. Some clients collapse tall faces—keep to one line.",
      },
      {
        question: "Are shocked faces okay in professional Slack?",
        answer:
          "A small (⊙_⊙) can be a joke. Skip the densest horror stacks in work channels.",
      },
    ],
  },
  "thank-you-kaomojis": {
    description:
      "Thank you kaomoji. Copy thank-you and grateful kaomoji—including arigatou-style text faces—for polite chats.",
    meanings:
      "Thank-you faces bow, clasp hands, or smile softly. Perfect after favors, feedback, and community help. They read warmer than a plain “thanks” in Discord and group chats.",
    faq: [
      {
        question: "What is a thank you kaomoji?",
        answer:
          "A bowing or hand-clasping face such as m(_ _)m. It is the text version of a polite Japanese bow.",
      },
      {
        question: "Is m(_ _)m the same as arigatou?",
        answer:
          "m(_ _)m is a bow that people use to mean thanks. Some faces on this list also include ありがとう in the characters.",
      },
      {
        question: "When should I send a thank-you kaomoji?",
        answer:
          "After someone helps in Discord, reviews your work, or shares a resource. It is warmer than a bare “ty.”",
      },
      {
        question: "Do bowing faces work on mobile?",
        answer:
          "Short bows do. Extra sparkle decoration may fail—copy m(_ _)m if anything boxes out.",
      },
      {
        question: "Thank-you vs cute kaomoji?",
        answer:
          "Thank-you is gratitude (bows). Cute is generic kawaii. Use this list when you actually mean thanks.",
      },
    ],
  },
  "surprised-kaomojis": {
    description:
      "Copy surprised kaomoji and soft OMG faces for milder astonishment than full shock.",
    meanings:
      "Surprised kaomojis use round eyes and lighter mouths for soft amazement. Great for pleasant surprises, cute reveals, and gentle reactions. Use shocked kaomojis when the reaction should feel extreme.",
    faq: [
      {
        question: "How is surprised different from shocked?",
        answer:
          "Surprised is a pleasant or mild “oh!” Shocked is a jaw-on-the-floor twist. This list uses softer faces; shocked keeps the wide □ / ﾟДﾟ mouths.",
      },
      {
        question: "Which surprised kaomoji is good for a compliment?",
        answer:
          "Round, happy surprise like (ﾟ▽ﾟ*) or w(°ｏ°)w. Avoid horror-open mouths—those belong on the shocked page.",
      },
      {
        question: "Do surprised faces work in Instagram comments?",
        answer:
          "Yes. One short OMG face plus text is enough; repeating faces looks like spam.",
      },
      {
        question: "Surprised vs excited kaomoji?",
        answer:
          "Surprised is a reaction to news. Excited is hype you already feel (wins, launches). Different timing.",
      },
      {
        question: "Can I use these in a Discord reaction role name?",
        answer:
          "If the role name allows Unicode. Keep it to one compact face so the role list stays scannable.",
      },
    ],
  },
  "shy-kaomojis": {
    description:
      "Shy kaomoji. Copy shy and blushing kaomoji for awkward cute moments, flirty nerves, and soft bios.",
    meanings:
      "Shy faces hide behind hands or heavy blush marks (⁄ ⁄). Ideal for compliment replies, crush energy, and kawaii bios. They pair naturally with cute and kiss collections.",
    faq: [
      {
        question: "What is a shy kaomoji?",
        answer:
          "A blushing or hiding face, often with ⁄ ⁄ marks or hands covering the cheeks. It reads as embarrassed-cute.",
      },
      {
        question: "Shy vs cute kaomoji?",
        answer:
          "Cute is openly kawaii. Shy is kawaii plus nerves. Use shy when someone just complimented you.",
      },
      {
        question: "Do the slash blush marks work on Android?",
        answer:
          "Often yes, but dense ⁄ stacks can look messy. Copy a simpler (*ﾉωﾉ) if the slashes break.",
      },
      {
        question: "Are shy faces okay in a public bio?",
        answer:
          "One short blush is fine. A wall of hiding-hands faces wastes bio space.",
      },
      {
        question: "Can I combine shy kaomoji with kiss faces?",
        answer:
          "Yes in DMs. In public comments, shy alone is usually clearer than shy + kiss stacked.",
      },
    ],
  },
  "excited-kaomojis": {
    description:
      "Excited kaomoji. Copy excited and hype kaomoji for wins, launches, and high-energy Discord cheers.",
    meanings:
      "Excited faces sparkle, jump, or throw arms up. Use them for launch days, game wins, and party invites. Keep one face per message so the hype stays readable.",
    faq: [
      {
        question: "When should I use an excited kaomoji?",
        answer:
          "Wins, releases, concert tickets, and “we did it” Discord messages. It is hype you already feel.",
      },
      {
        question: "Excited vs surprised?",
        answer:
          "Excited is celebration. Surprised is a reaction to unexpected news. Use this list for planned hype.",
      },
      {
        question: "Which excited face is safest on mobile?",
        answer:
          "Short sparkle or raised-arm faces. Avoid giant stacked jumps that wrap in chat bubbles.",
      },
      {
        question: "Can I use excited kaomoji in a Twitch title?",
        answer:
          "If the title field allows the characters. Test a short face; some dashboards strip unusual symbols.",
      },
      {
        question: "Do these work in WhatsApp group names?",
        answer:
          "Often. Keep the group name mostly words plus one hype face so notifications still make sense.",
      },
    ],
  },
  "thinking-kaomojis": {
    description:
      "Thinking kaomoji. Copy thinking and hmm kaomoji for pondering, deciding, and “let me check” replies.",
    meanings:
      "Thinking faces add hand-on-chin poses or dotted thought marks. Useful in support chats, brainstorming threads, and decision memes. Less aggressive than confused faces.",
    faq: [
      {
        question: "What is a thinking kaomoji for?",
        answer:
          "“Hmm,” “let me check,” and decision threads. It shows you are working the problem, not lost.",
      },
      {
        question: "Thinking vs confused kaomoji?",
        answer:
          "Thinking is active. Confused is stuck. Use thinking in support replies so you do not sound helpless.",
      },
      {
        question: "Is there a text version of the thinking emoji?",
        answer:
          "Yes—these faces. The 🤔 emoji is a picture; thinking kaomoji are punctuation poses you can paste beside words.",
      },
      {
        question: "Do thinking faces work in GitHub comments?",
        answer:
          "Simple faces do. Unusual combining marks may render oddly in some fonts—prefer short ones.",
      },
      {
        question: "Can I use a thinking kaomoji in a Discord bot status?",
        answer:
          "If the status field accepts Unicode. A short hmm face plus “checking…” is readable.",
      },
    ],
  },
  "scared-kaomojis": {
    description:
      "Scared kaomoji. Copy scared and fear kaomoji for jump-scare jokes, horror nights, and anxious reactions.",
    meanings:
      "Scared faces widen eyes or shrink bodies for fear. Fun for horror watch parties and “don’t @ me” jokes. Avoid dense combining marks in usernames where apps reject symbols.",
    faq: [
      {
        question: "What is a scared kaomoji?",
        answer:
          "A fear face: wide eyes, shrinking body, or a scream mouth used for jump-scares—not the same as shocked plot-twist faces.",
      },
      {
        question: "Scared vs shocked?",
        answer:
          "Scared is fear. Shocked is surprise. Horror night chat → scared. Breaking news → shocked.",
      },
      {
        question: "Are scream kaomojis okay in school group chats?",
        answer:
          "As jokes, yes. Dense scream stacks can look like spam in notification previews.",
      },
      {
        question: "Do scared faces work on iMessage?",
        answer:
          "Most punctuation faces do. Rare symbols may fall back to tofu boxes—copy a simpler one.",
      },
      {
        question: "Can I use scared kaomoji in a Halloween Discord topic?",
        answer:
          "Yes. One short fear face plus the event name is clearer than a wall of screams.",
      },
    ],
  },
  "dog-kaomojis": {
    description:
      "Dog kaomoji. Copy dog and puppy kaomoji—loyal, playful canine text faces for Discord and pet accounts.",
    meanings:
      "Dog kaomojis use floppy ears or snouts for playful loyalty vibes. Great for pet pages, “good boy” jokes, and friendly bios. Swap to bear/cat lists for other animal aesthetics.",
    faq: [
      {
        question: "How is a dog kaomoji different from a bear face?",
        answer:
          "Dog faces are floppy or snouty and playful. Bear faces use ʕ ʔ ears and an ᴥ snout for a rounder teddy look.",
      },
      {
        question: "Which dog kaomoji is good for a pet Instagram?",
        answer:
          "A short puppy face in the bio plus the pet’s name in plain text. Save long ear stacks for captions.",
      },
      {
        question: "Do dog kaomojis work in TikTok bios?",
        answer:
          "Short ones do. TikTok bios are only 80 characters—one face is plenty.",
      },
      {
        question: "Cat vs dog kaomoji for a Discord server?",
        answer:
          "Match the mascot. Cat servers want pointed ears; dog servers want floppy snouts. Mixing both is fine in a general pet chat.",
      },
      {
        question: "Can I use a dog face as a Roblox name?",
        answer:
          "Only if Roblox allows those characters in the field. Many username filters block unusual punctuation—test a short face.",
      },
    ],
  },
  "funny-kaomojis": {
    description:
      "Funny kaomoji. Copy funny and lol kaomoji for jokes, roasting threads, and light Discord chaos.",
    meanings:
      "Funny faces exaggerate laughs or silly mouths. Drop them under memes and banter. For smug wins, try proud kaomojis; for cursed jokes, pair with lenny variants.",
    faq: [
      {
        question: "What is a funny kaomoji for?",
        answer:
          "Laughs, roast threads, and silly replies. It is generic lol energy—not a specific animal or emotion.",
      },
      {
        question: "Funny vs lenny vs proud?",
        answer:
          "Funny is goofy laughter. Lenny is knowing sarcasm. Proud is a smug win. Pick the joke’s tone.",
      },
      {
        question: "Will funny kaomojis work in Reddit comments?",
        answer:
          "Yes. They are plain text. Very wide faces can break mobile layout—keep them compact.",
      },
      {
        question: "Can I use funny faces in a YouTube comment?",
        answer:
          "Usually. One face plus the joke is clearer than a row of laughs that look like spam.",
      },
      {
        question: "Do these replace the laughing emoji?",
        answer:
          "They are an alternative. 😂 is an emoji; funny kaomojis are punctuation faces you can mix with words.",
      },
    ],
  },
  "lenny-face": {
    title: "Lenny Face Copy Paste — ( ͡° ͜ʖ ͡°) | FancifyText",
    ogSubtitle: "( ͡° ͜ʖ ͡°) Lenny face variants — tap to copy for Discord & Reddit",
    description:
      "Copy Lenny face ( ͡° ͜ʖ ͡°) free—meme text emoticons for Discord and Reddit. Tap any variant; plain Unicode, no login.",
    canonicalLead:
      "Lenny is a single famous emoticon family—not a full kaomoji mood list. Variants below are plain Unicode for memes and friend chats; the kaomoji hub links here when you search by name.",
    whereHeading: "Where Lenny face is appropriate",
    whereBullets: [
      "Meme replies and friend Discord channels: one face after the punchline.",
      "Reddit comments: plain text survives formatting; keep it one line wide.",
      "Skip work email, client Slack, and public brand accounts—tone is easy to misread.",
      "Not a sticker: paste like any other character; no server emote upload needed.",
    ],
    meanings:
      "Lenny face is the raised-eyebrow smirk of text chat—dry humor, sarcasm, or a knowing meme beat. It spread from forums into Discord and Reddit because it is plain Unicode, not a custom emote. One Lenny per message keeps the joke; stacking them reads as spam.",
    extraSections: [
      {
        id: "lenny-tone",
        heading: "When Lenny face lands (and when it does not)",
        paragraphs: [
          "Use Lenny after a punchline, a mild roast, or an obvious in-joke. Skip it in work Slack, support tickets, and first messages to strangers—it is easy to misread as hostile or unprofessional.",
          "If a client shows broken boxes, copy a shorter variant from the top of the list; the classic ( ͡° ͜ʖ ͡°) uses common Latin symbols.",
        ],
      },
    ],
    faq: [
      {
        question: "What is the Lenny face?",
        answer:
          "The Lenny face is ( ͡° ͜ʖ ͡°)—a text emoticon for knowing humor, sarcasm, or mischief. It is not an emoji sticker.",
      },
      {
        question: "How do I copy Lenny face on mobile?",
        answer:
          "Tap any variant below. Safari and Chrome copy plain Unicode; paste into Discord, Instagram, or Reddit.",
      },
      {
        question: "Does Lenny face work on Discord?",
        answer:
          "Yes in messages and topics. Nicknames may reject dense combining marks—test a one-line face.",
      },
      {
        question: "Lenny face vs kaomoji?",
        answer:
          "Lenny is one famous Western-leaning emoticon. Kaomoji is the wider Japanese style (cute, cry, animal ears). Both paste as text.",
      },
      {
        question: "Is Lenny face appropriate everywhere?",
        answer:
          "No. Keep it to casual memes and friend servers. Professional or public-facing accounts should use words instead.",
      },
    ],
  },
  "shrug-emoticon": {
    title: "Shrug Emoticon Copy Paste — ¯\\_(ツ)_/¯ | FancifyText",
    ogSubtitle: "¯\\_(ツ)_/¯ idk shrug — tap to copy for Discord, chat & email",
    description:
      "Copy shrug ¯\\_(ツ)_/¯ free—idk text faces for Discord, Instagram & email. Tap to copy; works where emoji keyboards fail.",
    canonicalLead:
      "Western shrug ¯\\_(ツ)_/¯ and raised-arm Japanese-style shrugs share this page. Use it when you mean “not sure” or “whatever” without sounding cold—confused kaomoji are for “huh?” moments instead.",
    whereHeading: "Where shrug text faces work",
    whereBullets: [
      "Discord and Twitch chat: idk replies without typing a paragraph.",
      "Email and docs: Unicode shrug pastes where emoji pickers are blocked.",
      "Instagram comments: one shrug plus words—repeating ¯\\_(ツ)_/¯ looks like spam.",
      "Versus 🤷 emoji: text shrugs are editable characters; emoji is a single picture glyph.",
    ],
    meanings:
      "The shrug emoticon softens “I don’t know” so you do not sound dismissive. Western chats use ¯\\_(ツ)_/¯; Japanese-style shrugs use raised-arm faces like ┐(´д｀)┌ on the same page. Pick one line—repeating shrugs in a nickname looks like noise.",
    extraSections: [
      {
        id: "shrug-vs-emoji",
        heading: "Shrug text vs 🤷 emoji",
        paragraphs: [
          "The shrug emoji is a single picture character from the phone keyboard. ¯\\_(ツ)_/¯ is built from slash, underscore, and ツ—so it survives in plain-text email, code comments, and apps that strip custom emoji.",
          "Both mean uncertainty. Text shrugs feel more meme-native in Discord and Reddit; the emoji reads cleaner in SMS to people who never use kaomoji.",
        ],
      },
    ],
    faq: [
      {
        question: "What does ¯\\_(ツ)_/¯ mean?",
        answer:
          "“I don’t know,” “whatever,” or “not sure”—a light non-answer that keeps tone friendly.",
      },
      {
        question: "How do I type shrug face?",
        answer:
          "Fastest: tap ¯\\_(ツ)_/¯ here and paste. Manual typing is error-prone because of backslashes and underscores.",
      },
      {
        question: "Does the shrug emoticon work on Discord?",
        answer:
          "Yes in messages, statuses, and most nicknames. It is shorter than a table-flip face.",
      },
      {
        question: "Shrug vs confused kaomoji?",
        answer:
          "Shrug = uncertainty or indifference. Confused faces = “huh?” with puzzled eyes. Use shrug for idk; use confused when something makes no sense.",
      },
      {
        question: "Can I use shrug in a work chat?",
        answer:
          "A single shrug after a joke is usually fine. Avoid it when you owe a clear yes/no answer.",
      },
    ],
  },
  "proud-kaomojis": {
    description:
      "Proud kaomoji. Copy proud and smug kaomoji for flex moments, wins, and playful arrogance in chat.",
    meanings:
      "Proud faces lift chins or smirk after a win. Perfect for scoreboards, finished projects, and cheeky comebacks. Softer than evil faces when you still want to stay friendly.",
    faq: [
      {
        question: "When should I use a proud kaomoji?",
        answer:
          "After a win, a shipped project, or a cheeky “told you so.” It is smug, not angry.",
      },
      {
        question: "Proud vs evil kaomoji?",
        answer:
          "Proud is a flex after success. Evil is plotting beforehand. Different moment in the joke.",
      },
      {
        question: "Are smug faces okay in a professional Discord?",
        answer:
          "A small smirk after a launch can be fun. Skip the densest flex stacks in client-facing chats.",
      },
      {
        question: "Do proud kaomojis render on Android?",
        answer:
          "Simple raised-chin faces do. Unusual glyphs may fail—copy a short smirk if you see boxes.",
      },
      {
        question: "Can I put a proud face in a gaming clan tag?",
        answer:
          "If the game allows the characters. Test in-game; many tag filters are stricter than Discord.",
      },
    ],
  },
  "hand-kaomojis": {
    title: "Hand Kaomoji Copy Paste — Wave & Raise Arms | FancifyText",
    ogSubtitle: "(ﾉ◕ヮ◕)ﾉ hand kaomoji — tap to copy for hype & greetings",
    description:
      "Copy hand kaomoji free—(ﾉ◕ヮ◕)ﾉ, ＼(^o^)／ & arm-up text faces for Discord hype and hellos. Tap to copy; plain Unicode.",
    canonicalLead:
      "Hand kaomoji are faces with visible arms—waves, cheers, and reach-outs. They are not hug lists (cuddle arms) and not star dividers. The kaomoji hub mixes moods; this page is only arm-forward reactions.",
    meaningsHeading: "Arms that read as action",
    meanings:
      "Hand kaomoji use raised punctuation arms to signal hype, greeting, surrender, or presentation. They work when a static smile feels too quiet—game wins, welcome messages, and “look at this” moments.",
    whereHeading: "Where hand kaomoji paste",
    whereBullets: [
      "Discord announcements: one arm-up face after plain text; skip long stacks in nicknames.",
      "Instagram captions: pair a single ＼(^o^)／ with your sentence—not a wall of arms.",
      "TikTok comments: short arm faces survive mobile fonts better than dense ASCII blocks.",
    ],
    howToHeading: "Copy a wave or cheer face",
    howToSteps: [
      "Pick an arm-up face that matches hype (cheer) vs hello (small wave).",
      "Tap once—the whole kaomoji copies as plain text.",
      "Paste after your sentence in Discord or Instagram; avoid stacking three arm faces in one bio line.",
    ],
    extraSections: [
      {
        id: "hand-vs-hug",
        heading: "Hand kaomoji vs hug kaomoji",
        paragraphs: [
          "Hand lists show arms reaching outward—celebration, presentation, or “hi.” Hug lists wrap arms around a face for comfort after bad news. If you wanted sympathy, open hug kaomojis; if you wanted a welcome message, stay here.",
        ],
      },
    ],
    faq: [
      {
        question: "What is a hand kaomoji?",
        answer:
          "A Japanese-style text face with visible arms—often (ﾉ◕ヮ◕)ﾉ or ＼(^o^)／—used for waves, cheers, or presenting something.",
      },
      {
        question: "Hand kaomoji vs hug kaomoji?",
        answer:
          "Hand lists focus on raised arms and hype. Hug lists use wrap-around arms for comfort. Pick hand for greetings; hug for sympathy.",
      },
      {
        question: "Best hand kaomoji for Discord?",
        answer:
          "Short lines like (ﾉ◕ヮ◕)ﾉ or ＼(^o^)／ paste cleanly in messages. Test nicknames on your phone—some clients truncate arm marks.",
      },
      {
        question: "Is this the same as the kaomoji hub?",
        answer:
          "The hub is for general browsing. This URL is the full hand/arm set so search engines and bookmarks land on one topic.",
      },
      {
        question: "Can I use hand kaomoji in a work announcement?",
        answer:
          "One calm wave is fine for “thanks everyone.” Save loud cheer arms for casual channels.",
      },
    ],
  },
  "star-kaomojis": {
    title: "Star Kaomoji Copy Paste — ☆ Aesthetic Sparkle | FancifyText",
    ogSubtitle: "⋆｡°✩ star kaomoji — galaxy-style text for bios",
    description:
      "Copy star kaomoji & sparkle text—☆(｡◕‿◕｡)☆, ⋆｡°✩ for aesthetic Discord & Instagram bios. Tap to copy; not picture emoji.",
    canonicalLead:
      "Star kaomoji mix sparkle marks (★ ⋆ ✩) with optional faces. They are not heart kaomoji (love mouths) and not plain symbol lists. Use heart lists for ♡ inside a face; use this page for galaxy/coquette-style lines.",
    meaningsHeading: "Sparkle lines vs love hearts",
    meanings:
      "These entries decorate a bio or caption with stars—sometimes wrapping a cute face, sometimes standing alone as a divider. They target aesthetic and y2k-style layouts without turning into full ASCII posters.",
    whereHeading: "Where star kaomoji work",
    whereBullets: [
      "Link-in-bio pages: one sparkle line between sections; pair with the Carrd divider list for layout ideas.",
      "Discord about-me: keep one star line—member lists truncate quickly.",
      "For arrows and checks without stars, use the cool symbols page instead.",
    ],
    howToHeading: "Copy a sparkle line",
    howToSteps: [
      "Choose a short line if your bio is almost full—dense moon or bow marks truncate first.",
      "Tap to copy; paste above or below a text block, not inside a username.",
      "Need a section break without stars? Try Carrd kaomojis for dash-style dividers.",
    ],
    extraSections: [
      {
        id: "y2k-coquette",
        heading: "Aesthetic, y2k, and coquette-style bios",
        paragraphs: [
          "Star kaomoji lines are the text version of soft glitter dividers—common on coquette and y2k-themed link pages. They are not a substitute for styled letters: write your name in plain text or aesthetic fonts, then paste one sparkle row as decoration.",
          "Keep one theme per bio. Mixing galaxy stars, hearts, and three different dividers looks cluttered in mobile previews.",
        ],
      },
    ],
    faq: [
      {
        question: "What are star kaomoji?",
        answer:
          "Text lines that combine star characters (★ ☆ ⋆ ✩) with optional kaomoji faces—popular for aesthetic and galaxy-themed bios.",
      },
      {
        question: "Star kaomoji vs heart kaomoji?",
        answer:
          "Heart lists emphasize ♡ and love mouths. Star lists emphasize sparkle and night-sky decoration. You can use both in one bio, but bookmark separate pages for each mood.",
      },
      {
        question: "Do star characters show on iPhone?",
        answer:
          "Common stars paste fine. Rare moon or ornamental glyphs may box out—copy a shorter line from the top of the list.",
      },
      {
        question: "Is this a font generator?",
        answer:
          "No—ready-made lines to copy. For styled letters, use aesthetic fonts; for lone ★ symbols, use cool symbols.",
      },
      {
        question: "Stars kaomoji aesthetic — is that this page?",
        answer:
          "Yes. This list targets galaxy and soft aesthetic dividers. Carrd kaomojis focuses on horizontal rules between sections.",
      },
    ],
  },
  "kaomoji-dot-art": {
    title: "Kaomoji Dot Art Copy Paste — Mini ASCII Faces | FancifyText",
    ogSubtitle: "Compact dot-style kaomoji — tap to copy (no huge posters)",
    description:
      "Copy kaomoji dot art—compact mini ASCII faces like (•ᴗ•) & ʕ•ᴥ•ʔ for chat. One-line art only; tap to copy. Free, no login.",
    canonicalLead:
      "This list is mini dot-style and one-line ASCII faces—not multi-page text posters. For giant block ASCII, use a dedicated ASCII art tool; here every row stays short so mobile copy stays fast.",
    meaningsHeading: "Small art that still counts as kaomoji",
    meanings:
      "Dot art kaomoji use bullet-like eyes (•) and simple mouths so the face reads even at small sizes. They suit memes, quick reactions, and comments where a full-width table-flip would wrap awkwardly.",
    extraSections: [
      {
        id: "not-block-art",
        heading: "Why we skip huge ASCII blocks",
        paragraphs: [
          "Large dot-art posters slow down phones, break in nicknames, and are hard to edit after paste. This page curates short faces only—same expressive intent, less layout risk.",
          "If you need a tall ASCII drawing, generate it elsewhere and paste once; keep kaomoji pages focused on copy-friendly lines.",
        ],
      },
    ],
    howToHeading: "Copy mini dot-style art",
    howToSteps: [
      "Pick a one-line face—every row here is short on purpose.",
      "Tap to copy; paste in chat or a caption.",
      "If you need a tall ASCII poster, use the big text generator instead of stretching this list.",
    ],
    whereHeading: "Where mini dot art works",
    whereBullets: [
      "Discord messages and replies: dot eyes stay readable at small sizes.",
      "Comments under posts: one line beats a multi-row poster that wraps.",
      "Nicknames: prefer (•ᴗ•) over wide animal faces if space is tight.",
    ],
    faq: [
      {
        question: "What is kaomoji dot art?",
        answer:
          "Small text faces built with dot-like eyes (•) and simple ASCII—one line each, meant for chat and captions.",
      },
      {
        question: "Dot art vs emoji?",
        answer:
          "Dot art is plain Unicode you copy from this page. Emoji are colorful picture characters from your keyboard.",
      },
      {
        question: "Will dot art paste in Discord code blocks?",
        answer:
          "Yes as text, but monospace may change spacing. Paste in normal messages for the intended look.",
      },
      {
        question: "Where are the big ASCII drawings?",
        answer:
          "Not on this page by design—large posters hurt mobile performance. Use short faces here; use big text tools for banners.",
      },
      {
        question: "Dot art kaomoji vs ascii art memes?",
        answer:
          "This page curates faces that still read as expressions. Giant copypasta blocks belong in meme threads, not tap-to-copy tool grids.",
      },
    ],
  },
  "carrd-kaomojis": {
    title: "Carrd Kaomojis Copy Paste — Bio Dividers & Lines | FancifyText",
    ogSubtitle: "Carrd-style bio dividers — ⋆ lines to copy for link pages",
    description:
      "Copy Carrd kaomojis—bio divider lines, ⋆ separators & soft aesthetic strings for link-in-bio layouts. Tap to copy; pairs with plain text sections.",
    canonicalLead:
      "Carrd kaomojis here means divider lines and spacing strings for link-in-bio pages—not full site templates. Combine one divider with your words; use the social media bio generator for styled text, not for these Unicode lines.",
    meaningsHeading: "Dividers, not full page layouts",
    meanings:
      "Each row is a horizontal accent—stars, dashes, or soft coquette-style marks—meant to sit between sections on Carrd, Linktree-style pages, or long Discord about-me blocks. They are decorative text, not faces, though some rows include ♡ or ⋆.",
    whereHeading: "How to use these on Carrd or bios",
    whereBullets: [
      "Paste one divider between two text blocks—avoid stacking five lines; mobile readers scroll past.",
      "Keep link titles in plain letters; put dividers above or below, not inside URLs.",
      "For star-heavy lines, also see star kaomoji; for faces, open cute or hand lists.",
    ],
    howToHeading: "Add a divider to a link-in-bio page",
    howToSteps: [
      "Write your section title in plain text (or styled text from a font generator).",
      "Tap one divider here and paste it between sections—one line is enough.",
      "Add a single face from cute or hand kaomoji if you want expression below the rule.",
    ],
    extraSections: [
      {
        id: "carrd-workflow",
        heading: "Typical Carrd or Linktree layout",
        paragraphs: [
          "Most one-page bios follow the same rhythm: title, divider, links, divider, socials. Copy dividers from this list instead of retyping dashes by hand—Unicode rules look cleaner and save time.",
          "This page does not host templates or images. You still choose colors and blocks in Carrd; we only supply the text accents.",
        ],
        bullets: [
          "Title in plain or aesthetic font",
          "One divider from this list",
          "Links in default site font",
          "Optional kaomoji face from a mood list",
        ],
      },
    ],
    faq: [
      {
        question: "What are Carrd kaomojis?",
        answer:
          "Copy-paste divider lines and aesthetic strings people use on Carrd and similar one-page bios—not animated stickers.",
      },
      {
        question: "Carrd kaomojis vs cute kaomoji?",
        answer:
          "Cute lists are facial expressions. Carrd lists are layout dividers. Use both: divider here, one face from cute or heart lists.",
      },
      {
        question: "Do I need a Carrd account?",
        answer:
          "No—this page only copies text. Paste into any bio field that accepts Unicode.",
      },
      {
        question: "Can I combine dividers with fancy fonts?",
        answer:
          "Yes. Generate styled words on aesthetic or cute fonts, then paste a plain divider line between sections.",
      },
      {
        question: "Linktree or Beacons — same dividers?",
        answer:
          "Yes. Any bio field that accepts Unicode text can use these lines; the tool is not limited to one host.",
      },
    ],
  },
  "happy-kaomojis": {
    description:
      "Happy kaomoji copy and paste. Cheerful text faces for good news, sunny replies, and upbeat group chats—tap any row to copy.",
    canonicalLead:
      "Happy kaomoji emphasize open smiles rather than kawaii blush (cute list) or victory flex (proud list). This browse list is not indexed; for search-friendly kawaii smiles, use cute kaomojis.",
    meaningsHeading: "Cheer without hype",
    meanings:
      "Happy faces use wide smiles and lifted eyes—lighter than excited hype and softer than proud smugness. Good for congratulations, Friday messages, and friendly check-ins.",
    howToSteps: [
      "Match intensity: mild (＾▽＾) for polite good news, louder (≧▽≦) for group celebrations.",
      "Tap to copy; paste one face per message.",
    ],
    faq: [
      {
        question: "Happy vs excited kaomoji?",
        answer:
          "Happy is general cheer. Excited faces amp energy for wins and announcements. Both are noindex lists—use cute or funny indexed pages for SEO bookmarks.",
      },
      {
        question: "Happy vs cute kaomoji?",
        answer:
          "Cute emphasizes blush and kawaii round eyes. Happy emphasizes open smiles. Cute list is indexed for search; this list is for browsing only.",
      },
      {
        question: "Is there a happy kaomoji indexed page?",
        answer:
          "Not separately—we keep cute kaomojis as the indexed kawaii/smile URL to avoid duplicate SERP listings.",
      },
    ],
  },
  "sleep-kaomojis": {
    description:
      "Sleep kaomoji copy and paste. Sleepy zzZ text faces for late-night chats, tired jokes, and goodnight messages.",
    canonicalLead:
      "Sleep kaomoji add zzZ or droopy eyes for goodnight humor—not grief (sad list) and not neutral thinking faces. Browse-only list; not indexed in search.",
    meaningsHeading: "Goodnight tone",
    meanings:
      "Sleep faces add zzZ or closed-eye lines. Keep them to one per message so the tired joke reads clearly.",
    howToSteps: [
      "Pick a zzZ face; tap to copy.",
      "Paste once at the end of a goodnight message—stacking three sleep faces looks like spam.",
    ],
    faq: [
      {
        question: "Sleep kaomoji vs sad kaomoji?",
        answer:
          "Sleep is tired or goodnight humor. Sad faces carry disappointment or grief. Different tone.",
      },
      {
        question: "Best sleep kaomoji for Discord goodnight?",
        answer:
          "Short (－_－) zzZ lines paste reliably. Long zzZ strings may wrap on mobile.",
      },
      {
        question: "Why is this list not in Google search?",
        answer:
          "FancifyText indexes cry and cute for main moods; sleep stays a browse helper so it does not compete with those URLs.",
      },
    ],
  },
  "wink-kaomojis": {
    description:
      "Wink kaomoji copy and paste. Playful wink text faces for teasing friends and light flirtation in chat.",
    canonicalLead:
      "Wink kaomoji use one closed or tilted eye for teasing tone. Shy kaomoji hide the whole face in blush—different social signal. Browse-only; not indexed.",
    meaningsHeading: "Tease, not blush",
    meanings:
      "Wink faces asymmetry the eyes—(^_-) style marks. Use sparingly in professional spaces; great for friends-only threads.",
    howToSteps: [
      "Choose a subtle wink for work-friendly jokes; louder winks for friend chats.",
      "Tap to copy; one wink per message keeps the tone clear.",
    ],
    faq: [
      {
        question: "Wink vs shy kaomoji?",
        answer:
          "Wink is playful tease. Shy faces hide behind blush. Shy list covers embarrassment; wink covers joking tone.",
      },
      {
        question: "Wink kaomoji vs kiss kaomoji?",
        answer:
          "Kiss lists use hearts or puckered mouths. Wink lists signal “just kidding” or flirt—pick the mood that matches.",
      },
      {
        question: "Can I use a wink kaomoji at work?",
        answer:
          "Stick to mild (^‿^) style faces in professional threads; save (^_-)/(^ω~) for friends who know your tone.",
      },
    ],
  },
  "bunny-kaomojis": {
    description:
      "Bunny kaomoji copy and paste. Rabbit-ear text faces for spring vibes, pet jokes, and soft kawaii replies.",
    canonicalLead:
      "Bunny kaomoji highlight rabbit ears or hop brackets—not cat whiskers. Cat kaomojis cover feline faces; cute kaomojis is the indexed kawaii hub. This animal list stays browse-only to prevent SERP overlap.",
    meaningsHeading: "Rabbit ears vs cat whiskers",
    meanings:
      "Bunny faces emphasize long ears or rabbit silhouettes—not the same as cat whiskers. For indexed feline faces, use cat kaomojis; this list stays browse-only to avoid competing with cat/cute URLs.",
    howToSteps: [
      "Look for ear slashes or U・x・U snout shapes.",
      "Tap to copy; paste in pet or spring-themed captions.",
    ],
    faq: [
      {
        question: "Bunny vs cat kaomoji?",
        answer:
          "Bunny lists focus on rabbit ears and hop motifs. Cat lists use whisker mouths like (=^･ω･^=). Pick the animal that matches the joke.",
      },
      {
        question: "Bunny vs bear kaomoji?",
        answer:
          "Bear faces use round snouts like ʕ•ᴥ•ʔ. Bunny faces lean on long ears or /(・×・)\\ frames.",
      },
      {
        question: "Which page is indexed for kawaii animals?",
        answer:
          "Cute kaomojis is indexed for general kawaii. Cat and bear lists exist for browsing; they are not separate indexed URLs.",
      },
    ],
  },
};

/** Hub-only aesthetic samples — links out to full topic lists (no duplicate grids). */
export const KAOMOJI_HUB_AESTHETIC_SAMPLES = [
  { line: "· · ─ ·✶· ─ · ·", href: "/carrd-kaomojis/", label: "Carrd bio dividers" },
  { line: "⋆ ˚｡⋆୨୧˚", href: "/star-kaomojis/", label: "Star kaomoji" },
  { line: "☆(｡◕‿◕｡)☆", href: "/star-kaomojis/", label: "Star + face combo" },
  { line: "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧", href: "/hand-kaomojis/", label: "Hand kaomoji" },
  { line: "(•ᴗ•)", href: "/kaomoji-dot-art/", label: "Mini dot art" },
  { line: "♡ ─── ♡ ─── ♡", href: "/carrd-kaomojis/", label: "Soft bio separator" },
] as const;

/** Indexable kaomoji hub URL slugs (typo landings + main). */
export type KaomojiHubSlug = "kaomoji" | "kamoji" | "kaomojis";

export type KaomojiHubSerpBundle = {
  title: string;
  description: string;
  heroLead: string;
  ogSubtitle: string;
  h1: string;
  introBelowHero: string;
  breadcrumbLabel: string;
  primaryKeyword: string;
  /** Extra FAQ shown first on this URL only (FAQ rich results). */
  leadFaq?: { question: string; answer: string };
};

/** Hub SERP bundles — registry titles/descriptions should match each URL. */
export const KAOMOJI_HUB_VARIANTS: Record<KaomojiHubSlug, KaomojiHubSerpBundle> = {
  kaomoji: {
    title: "Kaomoji Copy Paste — 840+ Free Kaomojis (｡◕‿◕｡) | FancifyText",
    description:
      "Kaomoji copy paste in 1 tap—840+ curated text faces (｡◕‿◕｡) (T_T) ¯\\_(ツ)_/¯ for Discord & Instagram. No app · No login.",
    heroLead:
      "Tap a face → instant copy paste for Discord, Instagram, TikTok, or chat. Free kaomoji—no download.",
    ogSubtitle:
      "Kaomoji copy paste · (｡◕‿◕｡) (T_T) ¯\\_(ツ)_/¯ · 840+ curated faces",
    h1: "Kaomoji Copy Paste",
    introBelowHero:
      "Japanese text faces (often typed kamoji, kaomiji, or kaomojis) as plain Unicode—not emoji stickers. Indexed topic pages: cute, cry, heart, hand, star, Carrd dividers, mini dot art, Lenny, shrug.",
    breadcrumbLabel: "Kaomoji",
    primaryKeyword: "kaomoji",
    leadFaq: {
      question: "How do I kaomoji copy paste?",
      answer:
        "Tap any face in the grid—it copies as plain text. Paste into Discord, Instagram, or chat. No typing symbols yourself and no sticker app.",
    },
  },
  kamoji: {
    title: "Kamoji Copy Paste — Kaomoji Text Faces (｡◕‿◕｡) | FancifyText",
    description:
      "Kamoji copy paste = kaomoji. Tap 840+ curated text faces (｡◕‿◕｡) (T_T) for Discord & Instagram. Common misspelling—same Japanese emoticons.",
    heroLead:
      "You typed kamoji—this is kaomoji copy paste. Tap a face, paste in Discord or Instagram. Free, no account.",
    ogSubtitle: "Kamoji → kaomoji · tap (｡◕‿◕｡) to copy paste",
    h1: "Kamoji Copy Paste",
    introBelowHero:
      "Kamoji is a frequent misspelling of kaomoji (顔文字). The faces below are the same tap-to-copy Japanese text emoticons; the standard spelling is on the kaomoji page too.",
    breadcrumbLabel: "Kamoji",
    primaryKeyword: "kamoji",
    leadFaq: {
      question: "Is kamoji the same as kaomoji?",
      answer:
        "Yes. Kamoji is a typo for kaomoji—Japanese text faces made from keyboard symbols. Copy paste works the same: tap a face here and paste anywhere that accepts Unicode.",
    },
  },
  kaomojis: {
    title: "Kaomojis Copy Paste — Free Kaomoji List (｡◕‿◕｡) | FancifyText",
    description:
      "Kaomojis copy paste: 840+ curated kaomoji text faces. Tap (｡◕‿◕｡) (T_T) ¯\\_(ツ)_/¯ for Discord. Plural kaomojis = this copy-paste list.",
    heroLead:
      "Kaomojis copy paste—tap any Japanese text face in the grid, then paste in Discord, Instagram, or chat. Free list, no login.",
    ogSubtitle: "Kaomojis copy paste · 840+ kaomoji text faces",
    h1: "Kaomojis Copy Paste",
    introBelowHero:
      "Kaomojis is the English plural of kaomoji. This page is the full copy-paste list of Japanese-style text faces; singular kaomoji uses the same characters.",
    breadcrumbLabel: "Kaomojis",
    primaryKeyword: "kaomojis",
    leadFaq: {
      question: "Kaomojis copy paste — how does it work?",
      answer:
        "Kaomojis are plural kaomoji. Tap any face to copy the whole emoticon as text, then paste into Discord, Instagram, TikTok, or email—no keyboard chart needed.",
    },
  },
};

export function getKaomojiHubSerp(slug: KaomojiHubSlug): KaomojiHubSerpBundle {
  return KAOMOJI_HUB_VARIANTS[slug];
}

export const KAOMOJI_HUB_SLUGS: KaomojiHubSlug[] = ["kaomoji", "kamoji", "kaomojis"];

export function isKaomojiHubSlug(slug: string): slug is KaomojiHubSlug {
  return slug === "kaomoji" || slug === "kamoji" || slug === "kaomojis";
}

/** @deprecated Use getKaomojiHubSerp("kaomoji") */
export const KAOMOJI_HUB_SERP = KAOMOJI_HUB_VARIANTS.kaomoji;

export const KAOMOJI_HUB: KaomojiHubContent = {
  introBelowHero: KAOMOJI_HUB_VARIANTS.kaomoji.introBelowHero,
  editorial: {
    id: "editorial",
    heading: "How FancifyText builds these lists",
    paragraphs: [
      "Faces are grouped by mood so each page explains one use case instead of repeating the same grid everywhere. We favor characters that paste as plain Unicode in common mobile fonts, and we keep copy instructions on the page so you do not need an account or download.",
      "FancifyText is free to use. If advertising is enabled on the site, it is described in our privacy policy and is never placed between a generator field and its first copy control—kaomoji pages use tap-to-copy grids only.",
    ],
  },
  commonMisspellings: [
    { typo: "kamoji", note: "Missing one “o”—same Japanese text faces as kaomoji." },
    { typo: "kaomojis", note: "Plural; this page is a free kaomoji copy-paste list." },
    { typo: "kaomiji", note: "Transposed letters—still means 顔文字-style text emoticons." },
    { typo: "kaimoji", note: "Common typo; copy the faces here, not a different tool." },
    { typo: "kaoemoji", note: "Mixed “kao” + emoji—kaomoji are text, not picture emoji." },
    { typo: "kaemoji", note: "Missing “m”—same tap-to-copy Unicode faces." },
    { typo: "komoji", note: "Wrong first letter; correct word is kaomoji (face + character)." },
    { typo: "koamoji", note: "Extra vowel swap—faces below are what you wanted." },
    { typo: "kao emoji", note: "Two words; standard spelling is kaomoji as one word." },
    { typo: "kaomoji copy paste", note: "Exact intent—tap any face in the grid to copy." },
  ],
  moodPreviewLeads: {
    "funny-kaomojis":
      "Laugh and meme reactions—preview only; the funny list has the full lol set for roasting threads.",
    "cat-kaomojis":
      "Pointed ears and whisker mouths for pet accounts—open the cat list for every kitty variant.",
    "angry-kaomojis":
      "Table-flip energy and glares—indexed separately so this hub does not compete with mood URLs.",
    "thank-you-kaomojis":
      "Bowing and arigatou-style gratitude faces—a sample before the complete thank-you list.",
  },
  sections: [
    {
      id: "anatomy",
      heading: "How to read a kaomoji",
      paragraphs: [
        "Most kaomoji read left to right like a tiny portrait. Parentheses or special brackets frame the face. Characters in the middle are usually eyes; a mouth sits below (ω, ▽, ‿, or a line). Extra marks on the sides are arms—table-flip arms, hug arms, or raised shoulders for a shrug.",
        "Vertical Japanese-style faces use fewer parentheses and more punctuation stacked in one column. Once you spot the eyes, the rest is tone: wide eyes shock, downturned lines sad, blush slashes shy.",
      ],
    },
    {
      id: "emoji-vs-kaomoji",
      heading: "Kaomoji vs picture emoji vs symbols",
      paragraphs: [
        "Picture emoji (😀 🔥 ❤️) come from your phone’s emoji keyboard—one character, full color. Kaomoji are text faces built from punctuation (｡◕‿◕｡)—they paste anywhere Unicode works, including places that block colorful emoji.",
        "If you wanted a single emoji to copy, use the emoji row on this page. If you wanted a Japanese-style emoticon, use the kaomoji grid. For stars, arrows, and decorative symbols—not faces—open the cool symbols list.",
      ],
      bullets: [
        "Emoji — colorful, one glyph, best for SMS and social apps",
        "Kaomoji — text face, best for Discord, bios, and memes",
        "Symbols — ♡ ★ → decorative marks, not expressions",
      ],
    },
    {
      id: "japanese-vs-western",
      heading: "Kaomoji vs Western emoticons",
      paragraphs: [
        "Western emoticons like :) or :D usually turn sideways and stay minimal. Kaomoji often face upright, use fullwidth punctuation, and add arms or props (┻━┻ tables, ♪ notes, ♡ hearts). Both are plain text; kaomoji just carry more expression per character.",
        "Lenny ( ͡° ͜ʖ ͡°) and shrug ¯\\_(ツ)_/¯ sit in between—famous text faces that are not quite emoji but not always “kawaii” either. This hub groups them with Japanese-style lists so you can copy any mood from one place.",
      ],
      bullets: [
        ":) — quick smile; no arms",
        "(｡◕‿◕｡) — upright cute kaomoji",
        "¯\\_(ツ)_/¯ — shrug “idk”",
        "( ͡° ͜ʖ ͡°) — Lenny smirk",
      ],
    },
    {
      id: "history",
      heading: "Why kaomoji spread outside Japan",
      paragraphs: [
        "They grew up in Japanese bulletin boards and mobile mail where picture emoji were limited. ASCII artists competed to express sarcasm, grief, and excitement in one line. Global anime fandom, gaming chats, and Discord carried the same faces west—still as Unicode text, still copy-paste friendly.",
        "That history is why kaomoji beat GIF stickers in bios and usernames: there is nothing to upload, and the face stays editable like ordinary letters.",
      ],
    },
    {
      id: "topic-spokes",
      heading: "Hand, star, Carrd, and dot-art lists",
      paragraphs: [
        "Some searches are not moods—they are layouts or body parts. Hand kaomoji collect arm-up cheers. Star kaomoji collect sparkle lines for aesthetic bios. Carrd kaomojis are divider strings for link-in-bio pages. Kaomoji dot art keeps mini one-line ASCII faces without huge posters that slow phones.",
        "Each topic has its own URL so this hub stays the general kaomoji copy-paste page. Open the topic list when you know the layout you need; stay here when you want a mixed sample grid.",
      ],
      bullets: [
        "Hand kaomoji — waves and hype arms",
        "Star kaomoji — ★ ⋆ ✩ aesthetic lines",
        "Carrd kaomojis — bio dividers between sections",
        "Kaomoji dot art — compact (•ᴗ•)-style faces",
      ],
    },
  ],
  situations: [
    {
      situation: "Discord bio or about-me",
      face: "(｡◕‿◕｡)",
      href: "/cute-kaomojis/",
      linkLabel: "Cute kaomojis",
      hint: "One short face; words first, kaomoji last.",
    },
    {
      situation: "Dramatic apology or meme fail",
      face: "(T_T)",
      href: "/cry-kaomojis/",
      linkLabel: "Cry kaomojis",
      hint: "Visible tears; keep to one face per message.",
    },
    {
      situation: "Sweet DM or couple chat",
      face: "(♡ω♡)",
      href: "/heart-kaomojis/",
      linkLabel: "Heart kaomojis",
      hint: "Hearts in the face, not a lone ♡ emoji.",
    },
    {
      situation: "“I don’t know” / whatever",
      face: "¯\\_(ツ)_/¯",
      href: "/shrug-emoticon/",
      linkLabel: "Shrug emoticon",
      hint: "Softer than leaving a question on read.",
    },
    {
      situation: "Knowing meme reply",
      face: "( ͡° ͜ʖ ͡°)",
      href: "/lenny-face/",
      linkLabel: "Lenny face",
      hint: "Friends-only humor; skip work chats.",
    },
    {
      situation: "Cozy animal nickname",
      face: "ʕ•ᴥ•ʔ",
      href: "/bear-kaomojis/",
      linkLabel: "Bear kaomojis",
      hint: "Round ears + snout; very copy-friendly.",
    },
    {
      situation: "Comfort after bad news",
      face: "(づ｡◕‿‿◕｡)づ",
      href: "/hug-kaomojis/",
      linkLabel: "Hug kaomojis",
      hint: "Arms-out hug; warmer than a heart alone.",
    },
    {
      situation: "Polite thanks",
      face: "m(_ _)m",
      href: "/thank-you-kaomojis/",
      linkLabel: "Thank-you kaomojis",
      hint: "Bow face; common after favors in servers.",
    },
    {
      situation: "Link-in-bio section break",
      face: "· · ─ ·✶· ─ · ·",
      href: "/carrd-kaomojis/",
      linkLabel: "Carrd kaomojis",
      hint: "Divider line; one between text blocks.",
    },
    {
      situation: "Hype or hello with arms up",
      face: "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧",
      href: "/hand-kaomojis/",
      linkLabel: "Hand kaomojis",
      hint: "Arm-forward cheer; not a hug.",
    },
  ],
  faq: [
    {
      question: "What is kaomoji copy paste?",
      answer:
        "Copy paste means you tap a text face here and paste it into Discord, Instagram, or chat—no typing the symbols yourself. Every face is plain Unicode, not a sticker download.",
    },
    {
      question: "What are kaomoji?",
      answer:
        "顔文字 (kaomoji): face characters made from punctuation and letters. They paste as plain text in Discord, Instagram, TikTok, and email—not picture emoji.",
    },
    {
      question: "Kaomoji or kaomojis — which is correct?",
      answer:
        "Both work in English. “Kaomoji” is the usual singular; “kaomojis” is the common plural for lists like this one.",
    },
    {
      question: "Is kamoji the same as kaomoji?",
      answer:
        "Yes—kamoji is a frequent misspelling. The correct word is kaomoji (顔 + 文字). The copy-paste faces on this page are the same either way.",
    },
    {
      question: "What about kaomiji, kaimoji, or kaemoji?",
      answer:
        "Those are keyboard typos for kaomoji. If your search looked like kaomiji, kaimoji, kaoemoji, or komoji, you still want Japanese-style text faces—use the grid above.",
    },
    {
      question: "Is it kamoji, kaemoji, or kao emoji?",
      answer:
        "The standard spelling is kaomoji (face + character). Kamoji, kaemoji, komoji, and “kao emoji” are frequent typos—the faces are the same tap-to-copy text here.",
    },
    {
      question: "How is kaomoji different from emoji?",
      answer:
        "Emoji are picture characters from a keyboard palette. Kaomoji are typed symbols you highlight and copy—like a font made of punctuation.",
    },
    {
      question: "Why do my kaomoji show as empty boxes?",
      answer:
        "The app font lacks a rare symbol. Copy a shorter face from the top of a list—(T_T), (◕‿◕), and ¯\\_(ツ)_/¯ use common characters.",
    },
    {
      question: "Can I use kaomoji in a Discord nickname?",
      answer:
        "Often yes if the face is one short line. Long table-flips and dense combining marks get rejected—try cute or heart lists for safe nicknames.",
    },
    {
      question: "Do kaomoji work on Instagram and TikTok?",
      answer:
        "Yes in bios, captions, and comments. Usernames stay lowercase ASCII; put kaomoji in the bio body instead.",
    },
    {
      question: "Are kaomoji GIFs or stickers?",
      answer:
        "No—they are text. Use Discord or Instagram GIF pickers if you want motion; use this page when you need copy-paste Unicode.",
    },
    {
      question: "What does ¯\\_(ツ)_/¯ or ( ͡° ͜ʖ ͡°) mean?",
      answer:
        "Shrug = “idk / whatever.” Lenny = knowing or mischievous smirk. The meanings table lists other famous faces by name.",
    },
    {
      question: "Which kaomoji lists are best to bookmark?",
      answer:
        "This hub for mixed search; cute, cry, heart, Lenny, and shrug for moods; hand, star, Carrd dividers, and mini dot art for layout topics. Other emotion URLs stay online for old links but are not indexed.",
    },
    {
      question: "Carrd kaomojis — do I paste a whole template?",
      answer:
        "No—copy one divider line at a time between your own text sections. Styled names belong on font generators; faces belong on mood lists.",
    },
  ],
};
