/* =============================================================
   Thangamey, The Weeding — EDIT THIS FILE AND ALMOST NOTHING ELSE
   -------------------------------------------------------------
   Names, dates, times, venues and dress codes below are taken
   verbatim from your invitation PDF and should be correct.

   Anything still wrapped in «guillemets» is a guess or a blank
   that needs you. Search this file for «  to find them all.
   ============================================================= */

window.WEDDING = {

  /* ---------- THE BASICS ---------- */
  couple: {
    one: "Akanksha",
    two: "Prateek",
    siteTitle: "Thangamey",
    tagline: "In the city of Lord Jagannath and by the coast of Puri. Two days, four parties. A respite from the cold.",
    /* The name in its own script, shown small beside the wordmark in the
       header and footer. Uncomment to switch it on. Thangamey is Tamil. */
    // script: "தங்கமே",
    // hashtag: "«#ThangameyTheWeeding»",
  },

  /* ---------- ARTWORK, LOGO, VIDEO ----------
     The paintings are your invitation. The photographs are what each one
     was painted from. Swap a path here and the whole site follows.       */
  media: {
    cover: "assets/art/cover.jpg",          // the invitation's first page — the hero
    logo: "assets/img/logo.png",
    logoInspiration: "assets/photos/bully-dino.jpg",
    logoHeading: "About the logo",
    logoBody:
      "Hum do, humare do. " +
      "We got Dino Choudhary from an elderly Roman woman who sells crocheted plushies at Artjuna, Goa in 2023. And later in 2025 he found his sister, Bully. " +
      "We think their names are obvious.",
    videoHeading: "Save the Date",
    videoBody: "We are too shy for pre-wedding photoshoots. Hope you enjoyed catching this STD.",
    video: "assets/video/save-the-date.mp4",
    videoPoster: "assets/art/save-the-date.jpg",  // the film's own closing frame
  },

  /* Countdown target — the first event, Daler Mehandi. */
  mainDate: "2026-12-08T11:00:00+05:30",
  mainDateLabel: "8 & 9 December 2026",
  mainCityLabel: "Puri, Odisha",

  /* ---------- WHERE THE ANSWERS GO ----------
     Everything this site collects goes to Google, which costs nothing and
     which you already have. Three forms and one sheet:

       collect.itinerary   travel plans          -> a Sheet
       collect.photos      mission one           -> a Sheet + one Drive
                                                    folder per photograph
       collect.quiz        mission two's scores  -> a Sheet
       gifts.sheetUrl      the registry          -> a Sheet people read

     GOOGLE-SETUP.md has the questions to put in each form, in order.

     Paste each form's share link here. While a line is still wrapped in
     «guillemets» the site falls back: the itinerary shows its own built-in
     form, and the missions just don't offer anywhere to send things. So you
     can fill these in one at a time.                                       */
  collect: {
    itinerary: "https://forms.gle/oRqP1xSoYq6crHvU7",
    photos:    "https://forms.gle/LU5mbAN6VAecZZWn6",
    quiz:      "https://forms.gle/WTG3wNVdbDWzvz1VA",
  },

  /* ---------- HOW TO REACH YOU ---------- */
  contact: {
    /* Scrambled on purpose. Harvesters work by running a regular expression
       over the page source looking for an @ or a run of digits — neither is
       here, in the HTML or in this file, and this file is public. site.js
       unscrambles them only when a visitor actually clicks.

       To change one, open the site, press F12 for the console, and run:
           BB.mask("new@address.com")
       then paste what it gives you below. BB.unmask() goes the other way.  */
    email:    "4b414b444159424b5943444d42181f474b5849426a4d474b434604494547",
    whatsapp: "01131b0a1d191f181d181f1b1a1a",
    helpText:
      "Stuck on anything — what to pack, sweaters or beach clothes? how long can you perform? a dietary thing, a train that only runs on Tuesdays? Ask us. We do not mind.",
  },

  /* ---------- THE EVENTS ----------
     All four are real, straight off the invite.

     `sky` picks a painted sky (see style.css → [data-sky]). The four
     here are colour-matched to your own invitation artwork:
       hues-of-earth       turquoise + earth      (Daler Mehandi)
       shades-of-sunset    amber + coral          (Sang-it)
       tints-of-sunflower  bright blue + gold     (Vicco Turmeric)
       lotus-reverie       deep teal + lotus pink (The Weeding)
       puri-night          navy + gaslight gold   (used for the hero)

     `logo` is the hand-lettered name lifted out of your invite PDF.
     `slug` is the anchor in the URL: events.html#sangeet.             */
  events: [
    {
      slug: "mehandi",
      art: "assets/art/mehandi.jpg",            // the postcard, straight off the invitation
      photo: "assets/photos/wayanad.jpg",      // the photograph it was painted from
      photoPlace: "Wayanad, Kerala",
      photoNote: "Sunrise view from Zostel Wayanad located at the base of Chembra Peak. Fun Trivia: The property was an old hospital in the colonial period.",
      name: "Daler Mehandi",
      logo: "assets/img/logo-mehandi.png",
      sky: "hues-of-earth",
      day: "Tuesday",
      date: "8 December 2026",
      time: "11 am – 2 pm",
      venue: "Poolside Deck, Fortune Beachfront",
      dress: "Traditional Casual; Hues of the Earth",
      mapUrl: "https://maps.google.com/?q=Fortune+Beachfront+Puri",
      note:
        "We tried to be punny. Come with your hands free; you will not be able to use them afterwards.",
    },
    {
      slug: "sangeet",
      art: "assets/art/sangeet.jpg",            // the postcard, straight off the invitation
      photo: "assets/photos/goa.jpg",      // the photograph it was painted from
      photoPlace: "Goa",
      photoNote: "A sunset off the shacks, which is where Shades of Sunset comes from.",
      name: "Sang-it",
      logo: "assets/img/logo-sangit.png",
      sky: "shades-of-sunset",
      day: "Tuesday",
      date: "8 December 2026",
      time: "7 pm – 11 pm",
      venue: "Ikshana Lawn, Fortune Beachfront",
      dress: "Traditional Partywear; Shades of Sunset",
      mapUrl: "https://maps.google.com/?q=Fortune+Beachfront+Puri",
      note:
        "Performances are welcome, encouraged, and gently capped at four minutes. We love you. Four minutes.",
      /* ---- An optional sign-up sheet, shown inside this event's panel ----
         Any event can have one: give it a `sheet` block like this and it
         appears; delete the block and it disappears. This points at the
         Sangeet tab of the same workbook the gift registry lives in — the
         #gid is what opens it on that tab rather than on the registry.

         IMPORTANT: the workbook is currently shared "anyone with the link
         can VIEW", so guests can read the song list but cannot add to it.
         To let them add rows, open it in Sheets -> Share -> Anyone with
         the link -> Editor. That makes the gift registry tab editable by
         anyone too, so keep a copy if that worries you.                  */
      sheet: {
        url: "https://docs.google.com/spreadsheets/d/1eoR7vcG-116Bj16PCG8OXJWA5SulURvqJSYK3P2WYdI/edit?usp=sharing#gid=393904024",
        heading: "Pick a song, add your name",
        text:
          "We are trying to save everyone from some through this sheet. Add a song, put your name in the " +
          "last column, and drop in a choreography link if there isn't any. No song twice \u2014 if " +
          "yours is already there, add your name to that row and dance together.",
        label: "Open the Sang-it sheet",
        note:
          "Rate each choreography out of 5 for an absolute beginner, 1 easy and 5 hard, " +
          "so we can pick the one everybody learns together.",
      },
    },
    {
      slug: "haldi",
      art: "assets/art/haldi.jpg",            // the postcard, straight off the invitation
      photo: "assets/photos/lagos.jpg",      // the photograph it was painted from
      photoPlace: "Lagos, Portugal",
      photoNote: "Clicked at the base of Ponta de Piedade after failing to reach on time for the sunrise.",
      name: "Vicco Turmeric",
      logo: "assets/img/logo-turmeric.png",
      sky: "tints-of-sunflower",
      day: "Wednesday",
      date: "9 December 2026",
      time: "11 am – 2 pm",
      venue: "Front Lawn, The Chanakya BNR",
      dress: "Traditional Daywear; Tints of Sunflower",
      mapUrl: "https://maps.google.com/?q=The+Chanakya+BNR+Puri",
      note:
        "Outdoors, bright and will be competitive. Wear light, carry sunglasses, umbrella and a hankerchief.",
    },
    {
      slug: "wedding",
      art: "assets/art/wedding.jpg",            // the postcard, straight off the invitation
      photo: "assets/photos/aurora.jpg",      // the photograph it was painted from
      photoPlace: "Tromsø, Norway",
      photoNote: "Should call our trips as Series of Fortunate Events. After days of rain and snow, we saw the Northern Lights in all its glory amidst the citylights.",
      name: "The Weeding",
      logo: "assets/img/logo-weeding.png",
      sky: "lotus-reverie",
      day: "Wednesday",
      date: "9 December 2026",
      time: "5 pm – 11 pm",
      venue: "Back Lawn, The Chanakya BNR",
      dress: "Traditional; Reverie of Lotus and Rajanigandha",
      mapUrl: "https://maps.google.com/?q=The+Chanakya+BNR+Puri",
      note: "The main event, under an actual sky, which we have been assured will cooperate.",
      isMain: true,
    },
  ],

  /* Every dress code on the invite is prefixed "Optional Dress Code". */
  dressCodeIsOptional: true,

  /* ---------- TRAVEL & STAY ----------
     The airport and station are real. The times, the hotel list and
     the shuttle are «yours to confirm».                             */
  travel: {
    /* NOT SHOWN ANYWHERE at the moment. It used to be the lede in the
       painted band at the top of the page, and that band has gone in
       favour of the Commute / Stay / Roam Around bar. Kept because it is
       good copy — say the word and it can go under "Getting to Puri",
       though that step is already a full screen's worth. */
    intro:
      "Puri is on the Bay of Bengal, about two hours " +
      "down the coast from Bhubaneswar. Both venues are in Puri itself and about ten " +
      "minutes apart, so once you have arrived you have arrived at everything.",
    air: {
      name: "Biju Patnaik International, Bhubaneswar (BBI)",
      note:
        "The nearest airport, 60 km away and roughly two hours by road on a good " +
        "day. Direct flights from Delhi, Mumbai, Bengaluru, Hyderabad, Ranchi and Kolkata; from " +
        "anywhere else you will change at one of those. Aim to land by early morning on " +
        "8 December if you can — it makes the drive easier. " +
        "Put your flight on the form below and we will sort your car out.",
    },
    rail: {
      name: "Puri Junction (PURI)",
      note:
        "Puri is a terminus, so the train stops whether you are awake or not. The station is 5–15 minutes from either hotel. " +
        "Book early: December is peak season here and AC berths go long before the date.",
    },
    hotels: [
      {
        name: "Fortune Beachfront, Puri",
        note: "The first day is here, Daler Mehandi by the pool, Sang-it on Ikshana Lawn " +
              "after sunset. It sits right on the promenade, the best possible distance from " +
              "the city: close enough to commute, far enough for the peace. Rooms are blocked for " +
              "friends under 'Akanksha & Prateek' from 8 to 10 December 2026.",
        url: "https://www.google.com/search?q=Fortune%20Beachfront%2C%20Puri",
      },
      {
        name: "The Chanakya BNR, Puri",
        note: "The second day is here — Vicco Turmeric on the front lawn, The Weeding on the " +
              "back one. A colonial-era hotel now owned by railways with very large rooms and very slow " +
              "ceiling fans, close to both the station and the beach. This is where " +
              "the family will be. Rooms blocked under the 'Akanksha & Prateek' from 8 to 10 December 2026.",
        url: "https://www.google.com/search?q=chanakya+bnr+puri",
      },
    ],
    shuttle:
      "We are running cabs between the two hotels and every event. ",
    // visaNote:
    //   "«Need a signed invitation letter for a visa application? Tick the box on the form " +
    //   "and we will send one. Please give us six weeks.»",
  },

  /* ---------- SUSTAINABILITY ----------
     Switched off: the whole block is commented out, so the "Big party, small
     footprint" section on the home page hides itself. Uncomment it and the
     section comes back exactly as it was.                                  */
  // sustainable: {
  //   intro:
  //     "We're trying to throw a two-day wedding on the Odisha coast without it costing the earth quite so literally. None of this is a rule. All of it helps.",
  //   points: [
  //     {
  //       title: "Wear something you already own",
  //       body:
  //         "Every dress code on the invitation says Optional, and we meant it. Borrow, rent, or raid your parents' almirah. The best-dressed person at every wedding we've been to was wearing something with a story.",
  //     },
  //     {
  //       title: "Share the ride from Bhubaneswar",
  //       body:
  //         "It's 60 km from the airport, and cars are the one of the biggest line in the footprint of a wedding people fly to. Tell us your arrival time and we'll put six of you in one car instead of six separate ones.",
  //     },
  //     {
  //       title: "Use the gift registry to help us",
  //       body:
  //         "You can help us fulfill our wishes — contribute towards an item, buy gift cards for brands we use, or gift something outright. Or if you really know us and what we might appreciate, we absolutely adore thoughtful gifts. Or nothing at all — you came to Puri, that's the gift.",
  //     },
  //     {
  //       title: "No floral foam, nothing binned",
  //       body:
  //         "Local and seasonal flowers, no imported blooms, no floral foam, and everything composted the morning after rather than thrown.",
  //     },
  //     {
  //       title: "A website that weighs nothing",
  //       body:
  //         "No tracking, no analytics, no cookie banner because there are no cookies. It will still load on a 3G signal in Puri.",
  //     },
  //   ],
  // },

  /* ---------- GIFT REGISTRY ----------
     This page is live. Three ways to give, then the list.

     The list can come from either place and the page works out which:
       • paste your sheet into `sheetUrl` and the page sends people there
       • or type the rows into `items` below and the page shows them
     Do both and you get both — the rows, with the sheet as a button under them.
     Do neither and the section politely says the list is still coming.     */
  gifts: {
    intro:
      "The honest answer is that we don't know the best practices. But people keep asking, and we'd rather " +
      "answer the question than be coy about it. So: here is a list.",
    ways: [
      {
        title: "Gift an item",
        body: "Pick something off the list and it's yours to give. Tell us which one " +
              "so we can cross it off and we don't end up with two.",
      },
      {
        title: "Chip in towards one",
        body: "Some of the things on the list are bigger than one gift. Put in whatever " +
              "you like towards one and we'll pool it",
      },
      {
        title: "Buy a gift card",
        body: "If you'd rather not choose, a gift card for one of the brands.",
      },
    ],

    /* Your registry sheet. Paste the share link here, set to "anyone with the
       link can view", and the "Open the full sheet" button appears. This is
       the quickest way to finish this page.                                 */
    sheetUrl: "https://docs.google.com/spreadsheets/d/1eoR7vcG-116Bj16PCG8OXJWA5SulURvqJSYK3P2WYdI/edit?usp=sharing",

    /* The list, copied from the Gift Registry tab of the sheet above. The
       sheet is still where people claim things — the Contribute and Buy Out
       columns are there and this page can't be written to — so when you add
       or change a row there, change it here too or the two drift apart.

         { name: "Cast iron kadhai", brand: "Meyer", price: "₹3,400",
           note: "The big one. We will use it twice a week.",
           url: "https://..." },

       `brand`, `price`, `note` and `url` are each optional.                 */
    items: [
      { name: "Contribute Towards a Cause", brand: "Vespa",
        note: "Enable Akanksha. Highest contributor gets to decide a JHATANG colour. We accept UPI, don't feel shy." },
      { name: "Non-toxic, Gift-ready Cookware", brand: "Cumin Co",
        note: "Enable Prateek." },
      { name: "Air Fryer", brand: "Cosori",
        note: "We are only allowed 1 tsp oil per meal per person." },
      { name: "Aeropress", brand: "Aeropress",
        note: "In case there is an apocalypse." },
      { name: "Gift Card", brand: "Indiahikes",
        note: "To touch grass ;) ;)" },
      { name: "Gift Card", brand: "Cult.fit",
        note: "Can't touch grass unprepared, part one." },
      { name: "Gift Card", brand: "Decathlon / Trekkit India",
        note: "Can't touch grass unprepared, part two." },
      { name: "Spa Voucher", brand: "Meraki",
        note: "Love Language: physical touch." },
      { name: "Gift Card", brand: "Dyson",
        note: "For Prateek or Akanksha, depends on what we buy." },
      { name: "Gift Card", brand: "Crossword",
        note: "Home decor." },
      { name: "Gift Card", brand: "Nike",
        note: "Second only to samosa for Prateek." },
      { name: "Annual Membership", brand: "Spotify" },
      { name: "Premium Subscription", brand: "YouTube" },
      { name: "Annual Subscription", brand: "Netflix" },
    ],

    /* Gift-card shops, shown as chips. Empty hides the whole section —
       add names like: ["Fabindia", "IKEA", "Amazon"]                        */
    brands: [],

    closing:
      "However you do it, WhatsApp DM us so we can keep the list updated. " +
      "And if you'd rather do none of this and gift something else or not at all, that is absoluetely okay too.",
  },

  /* ---------- MISSIONS ----------
     One page, missions.html, with two missions on it: a photo hunt and a
     quiz about the two of you. Both are forms — the answers come back to you.

       live: true     up now, linked in the nav              <- currently this
       live: "auto"   appears on its own between the dates below
       live: false    off, whatever the dates say

     Whatever the setting, adding ?preview to the URL always opens the page
     for you, so you can check it while it is switched off.

     Worth knowing: this is a static site, so "off" means hidden, not locked,
     and the quiz answers sit in this file where anyone can read them. For a
     wedding game that is the right trade — it is not a sealed exam. */
  games: {
    /* `live` overrides the window: true forces them open, false forces them
       shut, and leaving it out — as it is now — lets the two dates decide.
       Add ?preview to the URL to see them open before the window. */
    // live: true,
    liveFrom:  "2026-12-08T10:00:00+05:30",
    liveUntil: "2026-12-10T10:00:00+05:30",
    openLabel: "Both missions open on 8 December 10 am and close at 10 December 10 am.",
    closeLabel: "The couple makes the rules and their decision is binding." + "The winners will be annouched on Akanksha's Instagram or DMed to you/your WhatsApp groups.",

    navLabel: "Missions",
    heading: "Two missions",
    /* Only shown once the window is open — before that the page gives the
       two names and the opening time and nothing else. */
    intro:
      "Both are open NOW. We didn't tell you this before but there is an actual prize for the winners.",

    /* ---- Your TO-DOs ----
       NOT SHOWN ANYWHERE at the moment. It was built onto the missions
       page and taken off again — the home page is where it belongs. Say
       where it should sit there and it can go back up; nothing renders
       `todos` until it does. */
    todos: {
      heading: "Your TO-DOs",
      intro:
        "We are not telling you what the missions are. We are telling you how " +
        "not to be caught out by them.",
      items: [
        "Clear a gigabyte on your phone. You will want the room.",
        "Charge it overnight. Charge it again at lunch.",
        "Sit with the people you have only ever heard about.",
        "Listen to the aunties, particularly when they are talking about us.",
        "Set one alarm earlier than you would like.",
      ],
    },

    photos: {
      eyebrow: "Mission 1",
      heading: "I Spy",
      openLabel: "Open I Spy",
      intro:
        "Something to keep you on your toes, either you click or get clicker.",

      /* Reorder, reword or cut a few — the form follows whatever is here.
         If you change the NUMBER of prompts, update the hidden detection
         form at the top of missions.html to match (it is commented there). */
      prompts: [
        "Someone you have only ever met in a family WhatsApp group.",
        "A pair of hands straight after Daler Mehandi. The messier the better.",
        "The worst possible photograph of the bride. One of the groom too. We will be judging.",
        "Sunrise over the Bay of Bengal. You will have to actually get up.",
        "Turmeric in mid-air.",
        "Somebody asleep in a chair between two and five in the afternoon.",
        "Four generations in one frame.",
        "Whatever was on the plate that you went back for twice.",
        "A stranger in Puri who made your day — ask them first.",
        "The last song of Sang-it, from the middle of the floor and not the edge.",
      ],

      /* Optional. A shared album for everything that isn't one of the ten. */
      albumUrl: "«https://photos.app.goo.gl/...»",
      albumNote:
        "Use this shared album to get all your photos while you upload the ones on your phone.",
    },

    quiz: {
      eyebrow: "Mission 2",
      heading: "Gather Intel",
      openLabel: "Open Gather Intel",
      intro:
        "Questions about the two of us. You get your score when you send it, and so do we.",

      /* `answer` is the position of the right option, counting from 0.
         The four still in «guillemets» need real answers from you — write the
         question, the four options, and point `answer` at the right one.

         If you change the NUMBER of questions, update the hidden detection
         form at the top of missions.html to match.                        */
      questions: [
        {
          q: "The two animals on our logo are…",
          options: ["A dragon and a whale", "A dinosaur and a shark",
                    "A lion and a fish", "Two slightly different bears"],
          answer: 0,
          because: "Both crocheted, both live on a sofa, both predate the wedding.",
        },
        {
          q: "Which of the four events involves actual turmeric?",
          options: ["Daler Mehandi", "Sang-it", "Vicco Turmeric", "The Weeding"],
          answer: 2,
          because: "The clue was generous.",
        },
        {
          q: "The Daler Mehandi painting was made from a photograph taken where?",
          options: ["Goa", "Wayanad, Kerala", "Tromsø, Norway", "Puri"],
          answer: 1,
          because: "Sunrise from the base of Chembra Peak, out of a hostel that used to be a colonial hospital.",
        },
        {
          q: "And the one on The Weeding card?",
          options: ["The Northern Lights over Tromsø", "A Goan sunset",
                    "The Bay of Bengal", "The Algarve coast"],
          answer: 0,
          because: "After days of rain and snow, on what should rightly be called a Series of Fortunate Events.",
        },
        {
          q: "Performances at Sang-it are capped at…",
          options: ["Three minutes", "Five minutes", "Ten minutes", "There is no cap"],
          answer: 1,
          because: "We love you. Five minutes.",
        },
        {
          q: "Why does a train to Puri never leave you asleep past your stop?",
          options: ["There is a guard who checks", "It is a terminus — the line ends there",
                    "It only runs in daylight", "It is the first stop out of Bhubaneswar"],
          answer: 1,
          because: "Puri is the end of the line in every sense.",
        },
        {
          q: "«Where did the two of us actually meet?»",
          options: ["«Option one»", "«Option two»", "«Option three»", "«Option four»"],
          answer: 0,
          because: "«One line of explanation, if it is a good story.»",
        },
        {
          q: "«Who said it first?»",
          options: ["«Akanksha»", "«Prateek»", "«Both, at once, awkwardly»", "«Nobody has yet»"],
          answer: 0,
          because: "«»",
        },
        {
          q: "«Which one of us is going to be late to their own wedding?»",
          options: ["«Akanksha»", "«Prateek»", "«Both»", "«Neither, somehow»"],
          answer: 0,
          because: "«»",
        },
        {
          q: "«Your fourth question — make it one only four people could get right.»",
          options: ["«Option one»", "«Option two»", "«Option three»", "«Option four»"],
          answer: 0,
          because: "«»",
        },
      ],

      /* What we say at the end, worst to best. The last one is kept for a
         perfect score. */
      verdicts: [
        "You came for the food. Entirely respectable.",
        "You know us about as well as our bank does.",
        "Solid. You have been paying attention at the family lunches.",
        "Suspiciously good. Either you listen, or you have been through a phone.",
        "Flawless. You are either family or you have read the whole website.",
      ],
    },
  },

  /* ---------- THE SHORT VERSION ----------
     The strip of cards under the hero, for the guest who opens the site on
     a phone, reads two lines and closes it again. Everything here is a link
     that already exists elsewhere on the site — this is a shortcut, not a
     second copy, so there is nothing extra to keep in step.

     Each card takes its link from one of:
       from:  "collect.itinerary"   a path into this file
       event: "sangeet"             that event's `sheet` block
       url:   "https://..."         anything else

     A card whose link is missing or still in «guillemets» leaves itself
     out, and if all of them are missing the whole section disappears.   */
  quick: {
    eyebrow: "We made a website for this",
    heading: "Your TO-DOs",
    items: [
      {
        title: "Tell us your travel plans",
        body: "When you arrive, when you depart, and how. It is how we know who needs a car and when.",
        from: "collect.itinerary",
        label: "Open the form",
      },
      {
        title: "The gift registry",
        body: "A list to help you help us, not necessary to be followed.",
        from: "gifts.sheetUrl",
        label: "See the list",
      },
      {
        title: "Dance at the Sang-it",
        body: "Pick a song, add your name, leave a choreography link. No song gets danced twice.",
        event: "sangeet",
        label: "Open the sheet",
      },
      {
        /* `link: false` means this one is deliberately a dead end, not a
           card whose link hasn't been pasted in yet — so it shows without
           a button instead of leaving itself out. */
        title: "The two missions",
        body: "They open on the morning of the 8th and nothing about them goes up before " +
              "that. Come with your phone charged and some room on it.",
        link: false,
      },
    ],
  },

  /* ---------- THE STORY ---------- */
  story: {
    heading: "How this happened",
    paragraphs: [
      "Depends on who is asking. Maybe ask us at the wedding and we will let you know",
    ],
    /* The carousel beside the story. Add, remove or reorder freely — the
       arrows and dots follow this list, and if you empty it the carousel
       disappears and the text goes back to full width.

       Drop new files in assets/photos/story/. The frame is 9:16, the shape
       a phone shoots in; anything portrait and about 1400px tall is right.
       A photo that isn't 9:16 is cropped at the sides to fit — `focus:
       "60% center"` on it moves which part survives, and `fit: "contain"`
       keeps one whole against a blurred copy of itself if it can't take a
       crop at all. `alt` is read aloud to anyone using a screen reader, and
       shows if the photo fails to load — describe it, don't label it.     */
    /* How long each photograph holds before the next one slides in, in
       milliseconds. Set it to 0 to switch the rotation off and leave the
       arrows and dots to do the work. It pauses while the pointer is over
       it, while it is off screen, and for anyone whose system asks for
       less motion — and it stops for good the moment a guest touches the
       arrows, the dots or the photographs themselves.                     */
    rotateEvery: 5000,
    photos: [
      { src: "assets/photos/story/01.jpg",
        alt: "Ghent Half Marathon Ghent, Belgium, March 2026" },
      { src: "assets/photos/story/02.jpg",
        alt: "Under the Mango Tree Bhopal, March 2023" },
      { src: "assets/photos/story/03.jpg",
        alt: "Dressed up by a river with hills behind — one in a turban and cream kurta, one in a yellow saree" },
      { src: "assets/photos/story/04.jpg",
        alt: "Hope on the Stage Concert Singapore, April 2025" },
      { src: "assets/photos/story/05.jpg",
        alt: "Bungalow 12 Jodhpur, Jan 2024" },
    ],
  },

  /* ---------- FORM BACKEND ----------
     Only used by the built-in itinerary form, which is itself only shown
     while `collect.itinerary` above is still a placeholder. Once that is a
     real Google Form link, nothing on this site posts anywhere and none of
     this matters.

     "netlify"   zero config if you host on Netlify (see README)
     "formspree" set formspreeId below
     "demo"      no backend — submissions stay in your browser only  */
  formBackend: "netlify",
  formspreeId: "",
};
