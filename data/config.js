/* =============================================================
   Thangamey — EDIT THIS FILE AND ALMOST NOTHING ELSE
   -------------------------------------------------------------
   Anything wrapped in «guillemets» is a blank that still needs
   filling in; the site highlights it in gold so it can't be missed.
   ============================================================= */

window.WEDDING = {

  /* ---------- THE BASICS ---------- */
  couple: {
    one: "Akanksha",
    two: "Prateek",
    siteTitle: "Thangamey",
    tagline: "In the city of Lord Jagannath and by the coast of Puri. Two days, four parties. A respite from the cold.",
  },

  /* ---------- ARTWORK, LOGO, VIDEO ----------
     The paintings are your invitation. The photographs are what each one
     was painted from. Swap a path here and the whole site follows.       */
  media: {
    cover: "assets/art/cover.jpg",          // the invitation's first page — the hero
    logo: "assets/img/logo.png",
    logoHeading: "About the Logo",
    logoBody:
      "Hum do, humare do. " +
      "We got Dino Choudhary from an elderly Russian woman who sells crocheted plushies at Artjuna, Goa in 2023. And later in 2025 he found his sister, Bully. " +
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
     Everything this site collects goes to Google, which costs nothing.
     Paste each form's share link below. While a line is still wrapped in
     «guillemets» the button for it simply doesn't appear.

       itinerary   travel plans        (Travel & Stay)
       photos      mission one, I Spy
       quiz        mission two, Gather Intel                                */
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
        "Performances are welcome, encouraged, and gently capped at 2 songs. We love you. 2 songs.",
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
        url: "https://docs.google.com/spreadsheets/d/1eoR7vcG-116Bj16PCG8OXJWA5SulURvqJSYK3P2WYdI/edit?gid=393904024#gid=393904024",
        heading: "Pick a song, add your name",
        text:
          "We are trying to save everyone from some anxiety through this sheet. Add a song, put your name in the " +
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
        "Outdoors, bright and a little competitive. Wear light, carry sunglasses, umbrella and a hankerchief.",
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
    },
  ],

  /* Every dress code on the invite is prefixed "Optional Dress Code". */
  dressCodeIsOptional: true,

  /* ---------- TRAVEL & STAY ---------- */
  travel: {
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
        url: "https://maps.google.com/?q=Fortune+Beachfront+Puri",
      },
      {
        name: "The Chanakya BNR, Puri",
        note: "The second day is here — Vicco Turmeric on the front lawn, The Weeding on the " +
              "back one. A colonial-era hotel now owned by railways with very large rooms and very slow " +
              "ceiling fans, close to both the station and the beach. This is where " +
              "the family will be. Rooms blocked under the 'Akanksha & Prateek' from 8 to 10 December 2026.",
        url: "https://maps.google.com/?q=The+Chanakya+BNR+Puri",
      },
    ],
    shuttle:
      "We are running cabs between the two hotels for the events.",
  },

  /* ---------- GIFT REGISTRY ----------
     Three ways to give, then the list. The list below is a copy of the
     Gift Registry tab of the sheet at `sheetUrl`; the sheet is where people
     claim things, so when you change a row there, change it here too.     */
  gifts: {
    intro:
      "The honest answer is that we don't know the best practices. But people keep asking, and we'd rather " +
      "answer the question than be coy about it. So, here is a list.",
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

    sheetUrl: "https://docs.google.com/spreadsheets/d/1eoR7vcG-116Bj16PCG8OXJWA5SulURvqJSYK3P2WYdI/edit?gid=0#gid=0",

    items: [
      { name: "Contribute Towards a Cause", brand: "Vespa",
        note: "Enable Akanksha. Highest contributor gets to decide a JHATANG colour. We accept UPI, don't feel shy." },
      { name: "Non-toxic, Gift-ready Cookware", brand: "Cumin Co",
        note: "Enable Prateek." },
      { name: "Air Fryer", brand: "Cosori",
        note: "We are only allowed 1 tsp oil per meal per person." },
      { name: "Aeropress", brand: "Aeropress",
        note: "In case there is an apocalypse." },
      { name: "Microwave", brand: "",
        note: "Need to finish recurring meals." },
      { name: "Trek Voucher", brand: "Indiahikes",
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

    closing:
      "However you do it, update the sheet with your name, your group you'd pool to gift or WhatsApp DM us so we can keep the list updated. " +
      "And if you'd rather do none of this and gift something else or not at all, that is absoluetely okay too.",
  },

  /* ---------- MISSIONS ----------
     missions.html names two Google Forms and hands over the links, but only
     between `liveFrom` and `liveUntil`. Before that it says "not yet" and
     gives nothing else away. Add ?preview to the URL to see it open early. */
  games: {
    /* `live: true` forces them open and `live: false` forces them shut,
       whatever the dates say. Leave it out and the dates decide.         */
    liveFrom:  "2026-12-08T10:00:00+05:30",
    liveUntil: "2026-12-10T10:00:00+05:30",
    openLabel: "Both missions open on 8 December 10 am and close at 10 December 10 am.",
    closeLabel: "The couple makes the rules and their decision is binding." + " The winners will be announced on Akanksha's Instagram or DMed to you/your WhatsApp groups.",

    navLabel: "Missions",
    /* Only shown once the window is open — before that the page gives the
       two names and the opening time and nothing else. */
    intro:
      "Both are open NOW. We didn't tell you this before but there is are actual prizes for the winners.",

    photos: {
      eyebrow: "Mission 1",
      heading: "I Spy",
      openLabel: "Open I Spy",
      intro:
        "Something to keep you on your toes, either you click or get clicker.",

      /* The shared Google Photos album. Not shown on the page yet — paste the
         link here and wire it in when it exists. */
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
        title: "Secret Missions",
        body: "They open on when the times up." + " Keep an eye out for the details.",
        link: false,
      },
    ],
  },

  /* ---------- THE STORY ---------- */
  story: {
    heading: "How this Happened?",
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
       milliseconds. Set it to 0 to switch the rotation off. It holds still
       under the pointer, while off screen, for 15 seconds after a guest
       moves it, and for anyone whose system asks for less motion.        */
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
};
