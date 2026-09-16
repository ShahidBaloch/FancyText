/** Unique meta + meanings + FAQ overlays for kaomoji lists (slug → copy). */
export type KaomojiUniqueCopy = {
  description: string;
  meanings: string;
  meaningsHeading?: string;
  howToHeading?: string;
  howToSteps?: string[];
  mobileNote?: string;
  faq: { question: string; answer: string }[];
};

export const KAOMOJI_UNIQUE_COPY: Record<string, KaomojiUniqueCopy> = {
  "angry-kaomojis": {
    description:
      "Copy furious angry kaomojis and mad text faces like (ノಠ益ಠ)ノ. Express rage and frustration in Discord, chats, and comments.",
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
      "Bear kaomoji like ʕ•ᴥ•ʔ—cute bear, panda, and teddy text faces to copy for Discord and social bios.",
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
      "Cat kaomoji like (=^･ω･^=) and kitty text faces. Copy feline Japanese emoticons for Discord, TikTok, and bios.",
    meanings:
      "Cat kaomojis lean on pointed ears and ^ω^ eyes for playful or aloof energy. Great for pet accounts, kawaii bios, and sarcastic “meh” reactions. Shorter faces render more reliably on mobile than dense ear stacks.",
    faq: [
      {
        question: "What makes a kaomoji look like a cat?",
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
    description:
      "Copy cry kaomoji and tearful text faces like (Ｔ▽Ｔ) and (╥﹏╥). Dramatic replies—not the quiet sad list.",
    meaningsHeading: "Tears vs a quiet frown",
    meanings:
      "Cry kaomojis show falling tears or sob lines. Use them for over-the-top apology memes and dramatic reactions. Prefer sad kaomojis when you want melancholy without the waterworks.",
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
    description:
      "Copy cute kaomoji: blush marks, round eyes, and small smiles—kawaii people-faces, not cat ears. For bios and soft Discord nicks.",
    meaningsHeading: "Kawaii faces, not animal ears",
    meanings:
      "Cute kaomojis prioritize blush (///), round eyes, and gentle mouths. They are people-shaped, not cat/bear/dog. Keep them short so the details stay readable on a phone bio.",
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
      "Copy drool kaomoji and hungry faces for food posts, craving jokes, and playful chats.",
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
      "Copy evil kaomoji and mischievous faces for scheming jokes, villain vibes, and playful Discord chaos.",
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
    description:
      "Copy heart kaomoji — faces with ♡ or heart-shaped arms for DMs and soft bios, not a standalone heart emoji.",
    meaningsHeading: "Affection in punctuation",
    meanings:
      "Heart kaomojis weave ♡ or similar marks into a face. Use them in DMs, thank-you notes, and soft bios. Kiss lists are flirty; hug lists are comfort. Mix only if the message is clearly friendly or romantic.",
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
      "Copy hug kaomoji and cuddle faces to send comfort, support, or friendly hellos in text.",
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
      "Copy kiss kaomoji and smooch faces for flirty chats, couple Discord, and romantic bios.",
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
      "Copy music kaomoji and singing faces for playlist shares, concert posts, and musical Discord vibes.",
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
      "Copy sad kaomoji and melancholy faces for quiet down moods—less tearful than cry faces.",
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
      "Copy thank you kaomoji and grateful arigatou-style text faces for polite chats.",
    meanings:
      "Thank-you faces bow, clasp hands, or smile softly. Perfect after favors, feedback, and community help. They read warmer than a plain “thanks” in Discord and group chats.",
    faq: [
      {
        question: "What is a thank-you kaomoji?",
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
      "Copy shy kaomoji and blushing faces for awkward cute moments, flirty nerves, and soft bios.",
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
      "Copy excited kaomoji and hype faces for wins, launches, and high-energy Discord cheers.",
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
      "Copy thinking kaomoji and hmm faces for pondering, deciding, and “let me check” replies.",
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
      "Copy scared kaomoji and fear faces for jump-scare jokes, horror nights, and anxious reactions.",
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
      "Copy dog kaomoji and puppy faces—loyal, playful canine text for Discord and pet accounts.",
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
      "Copy funny kaomoji and lol faces for jokes, roasting threads, and light Discord chaos.",
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
  "proud-kaomojis": {
    description:
      "Copy proud kaomoji and smug faces for flex moments, wins, and playful arrogance in chat.",
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
};
