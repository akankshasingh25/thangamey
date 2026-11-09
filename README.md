# Thangamey, The Weeding

A wedding website for Akanksha & Prateek — Puri, 8 & 9 December 2026.

No build step. No npm. No framework. A handful of files and a folder of pictures.
Open `index.html` in a browser and it works; upload the folder and it's live.

---

## Editing it

Almost everything you'll ever want to change lives in **two files**:

| File | What's in it |
|---|---|
| `data/config.js` | Names, dates, events, venues, dress codes, hotels, travel, gift note, contact |
| `data/posts.js`  | The feed — your blog posts |

Change a value, save, refresh. That's the whole workflow.

### The «guillemets»

Anything still wrapped in `«...»` is a placeholder. On the live site it shows up
**highlighted in gold**, so you can't miss it. Delete the `«` and `»` and the
highlight disappears.

What's already real: both your names, all four events (dates, times, venues,
optional dress codes), your email and WhatsApp number (see below — both are
scrambled), both hotels, the airport and the station.

What's still marked unfinished — every one shows up highlighted in gold on the
live site. All of them are in `data/config.js`:

**The four Google links** — see [GOOGLE-SETUP.md](GOOGLE-SETUP.md):

- `collect.itinerary`, `collect.photos`, `collect.quiz`
- `gifts.sheetUrl` — the registry sheet

**The rest:**

- `games.quiz.questions` — four of the ten are templates. Write the question,
  the four options, and point `answer` at the right one.
- `travel.air.note` — «by early morning on 8 December», if that's the advice
  you want to give.
- `photoPlace` for the Vicco Turmeric painting — is Lagos the one in Portugal?
- `games.photos.albumUrl` — optional, a shared album for everything that isn't
  one of the ten.

## The gift registry

The page is live and linked from the nav. **The quickest way to finish it is a
Google Sheet**: make one, share it as "anyone with the link can view", and paste
the link into `gifts.sheetUrl`. See [GOOGLE-SETUP.md](GOOGLE-SETUP.md).

It reads everything from the `gifts` block in `data/config.js`:

- `ways` — the three ways to give. Reword them, or delete one.
- `sheetUrl` — your sheet. Paste the "anyone with the link can view" URL and the
  **Open the full sheet** button appears. This is the quickest way to finish the
  page.
- `items` — optional rows shown on the page itself. Each takes `name`, and
  optionally `price`, `note` and `url`. It ships empty.
- `brands` — the gift-card shops, shown as chips. Empty hides the whole section.

The page works out which of those you've filled in:

| What's in config | What the page shows |
|---|---|
| Nothing yet | "We are still writing it down" |
| `sheetUrl` only | A gold **Open the full sheet** button |
| `items` only | The rows |
| Both | The rows, with the sheet as a second button under them |

## The email address and the phone number

Both are shown on the site, and neither is harvestable by the usual means.

They are stored **scrambled** in `data/config.js`:

```js
email:    "4b414b444159424b5943444d42181f474b5849426a4d474b434604494547",
whatsapp: "01131b0a1d191f181d181f1b1a1a",
```

and — this is the part that matters — they are **not written into the page
when it loads**. A contact link shows a label ("Email us", "WhatsApp") with no
`href` at all. Only when somebody reaches for it — pointer down, a tap, or
keyboard focus — does `site.js` unscramble the value, put it in the `href` and
show it as text.

Addresses get harvested by running a regular expression over page source,
looking for an `@` or a long run of digits. Neither exists here: not in the
HTML, not in `config.js`, not in this public repo. A person gets the address on
the first click, as normal; a scraper gets the word "email".

It is a speed bump, not a lock. Anyone who opens the console and types
`BB.unmask(WEDDING.contact.email)` has it. That's fine — the point is to not be
the easy one.

**To change either**, open the site, press F12 for the console, and run:

```js
BB.mask("new@address.com")
```

Paste what it prints into `config.js`. `BB.unmask("...")` goes the other way, so
you can always check what's in there.

Marked up as `<a data-contact="email">` or `<a data-contact="whatsapp">`. Add
`data-contact-label` to keep your own wording on the link (the home page's
buttons do this) instead of swapping it for the address.

## The missions

`missions.html` holds two missions — ten photographs to find, and ten questions
about the two of you. **Both are forms**, so the answers come back to you.
Everything on the page comes from the `games` block in `data/config.js`.

### Switching them on and off

```js
live: true,                               // up now, linked in the nav
liveFrom:  "2026-12-08T09:00:00+05:30",   // used when live is "auto"
liveUntil: "2026-12-10T12:00:00+05:30",   // delete this and they stay up
```

`live: true` is the current setting — the page is public and "Missions" is in
the nav. `live: "auto"` hides it outside the window above; `live: false` hides
it always. Whatever it says, **`missions.html?preview` always opens the page for
you**, with a banner reminding you guests can't see it.

> This is a static site, so hidden means hidden, not locked, and the quiz
> answers sit in `data/config.js` where anyone can read them. For a wedding game
> that's the right trade — it isn't an exam.

### Mission one — the photographs

The ten prompts live in `games.photos.prompts`. Reword, reorder or cut them
freely; the page follows whatever is there.

They go to a **Google Form with one file-upload question per prompt**, which is
the only arrangement that gives you a folder per photograph:

```
Thangamey — ten photographs (File responses)/
  Someone you have only ever met in a family WhatsApp group/
  A pair of hands straight after Daler Mehandi…/
  …
```

Open a folder, see everyone's attempt at that one prompt side by side. Set
`collect.photos` and the attach buttons on the page are replaced by a button
through to the form. **The ten prompts stay listed on your page either way** —
people still need to know what they are looking for.

Two things to tell guests, both on the form's description:

- **File uploads require a Google account.** There is no way round it, and it is
  the price of the folders.
- Uploads land in **your** Drive and count against your 15 GB.

Until `collect.photos` is set, the page shows its own upload form. That one
posts to Netlify, which caps a whole submission at 8 MB and takes one file per
field — so it manages two or three photographs at a time and warns you when
you're over. Fine for a look; not the real thing.

### Mission two — the quiz

Ten questions, marked in the browser the moment it's sent so the guest gets
their score straight away, and posted to you with the score and every answer
written out in words (not option numbers).

**Four of the ten are still templates.** A question with «guillemets» left in it
is one you haven't written, so guests don't see it at all — right now the quiz
shows them the six finished ones and scores out of six. Open
`missions.html?preview` and you see all ten, gold marks and all, so you can tell
what is still outstanding. Fill one in and it appears for everyone, keeping its
original slot, so answers you've already collected stay lined up.

### If you add or remove a prompt or a question

On the website itself: nothing. Both missions are drawn from `config.js`, so
adding a prompt adds a row and adding a question adds a question.

Two places to keep in step:

- **Your Google Form.** Add the matching file-upload question (titled the same
  as the prompt) or multiple-choice question. The site doesn't do this for you.
- **`netlify-forms.html`**, only if you're still on the fallback forms. It
  declares the field names Netlify would otherwise not see (`shot_01…`,
  `q0…`). Once the Google links are in, it does nothing.

## The feed

Removed. `feed.html` is gone and nothing loads `data/posts.js`. The post file is
still there with your posts in it, so bringing it back is a small job rather than
a rewrite — ask and I'll put the page back.

## Changing the events

Edit the `events` array in `data/config.js` — that's the only place. Add an entry
and a new panel appears on the events page, a new card on the home page and a new
entry in the jump bar. Delete one and it all disappears again. `slug` is just
the anchor in the URL (`events.html#sangeet`), so keep it lowercase and hyphen-free.

`city` is optional — all four events are in Puri and the page already says so, so
it's left out and the "Where" row shows the venue alone.

Panels alternate sides automatically — odd ones put the painting on the left,
even ones on the right.

### Artwork and colours

Each event carries three things in `config.js`:

- `art` — its postcard, lifted out of `Weddin Invite Postcards.pdf`
- `photo`, `photoPlace`, `photoNote` — the photograph it was painted from
- `sky` — a palette name, defined in `assets/css/style.css` under `[data-sky]`

The palettes were sampled pixel-by-pixel from the paintings themselves, and they
drive the text colour and the wash that keeps words readable over the picture.
To retheme an event, change the five colours on its `[data-sky]` line.

The site used to draw its own Van Gogh skies in SVG, because the real paintings
weren't available yet. They are now, so that engine is gone.

---

## Deploying

The site is plain files — 34 of them, 22 MB, 19 MB of which is
`save-the-date.mp4`. There is no build step and, once the Google links are in,
**nothing posts to a server**. So any free static host will do, and you should
pick the one with the most generous bandwidth, because of the video.

### GitHub Pages — where it actually lives

**Live at [akankshasingh25.github.io/thangamey](https://akankshasingh25.github.io/thangamey/)**,
served from `main` at the repo root. Every `git push` rebuilds it; allow a
minute or two.

The repo is **public**, because GitHub Pages on a free account will not serve a
private one. That is why two things in here are the way they are:

- **The email address and the phone number are scrambled** in `config.js` and
  never written into the page until a visitor reaches for them. See *The email
  address and the phone number* above.
- **Every page carries `<meta name="robots" content="noindex, nofollow">`.**
  `robots.txt` only works at a domain root, and this site sits in a subfolder,
  so the file in this repo is ignored — the one crawlers read belongs to
  GitHub and allows everything. The meta tags are the only thing keeping the
  site out of search results. **Don't remove them.**

**Three things GitHub Pages ignores**, which matter if you ever move hosts:

| File | Effect on GitHub Pages |
|---|---|
| `_headers` | Ignored. No CSP, no `nosniff`, no referrer policy. |
| `netlify.toml` | Ignored. |
| `_redirects` | Ignored — `/photos.html` 404s instead of forwarding. |

It serves everything with a flat `cache-control: max-age=600`, so an edit can
take ten minutes to reach somebody who visited recently. Cloudflare Pages
honoured all three files; if you want the security headers and the cache rules
back, that is where they work.

### No custom domain

There isn't one and none is planned, so the address is the github.io one above
and the site lives in a subfolder rather than at a domain root. Two things
follow from that, and both are already handled:

- **`robots.txt` will never apply.** It only works at a domain root. The
  `noindex, nofollow` meta tag on every page is what keeps the site out of
  search results — the file in this repo is decorative. Don't remove the tags.
- **Every link in the site is relative** (`events.html`, `assets/…`), which is
  what lets it work from a subfolder at all. Don't change any of them to start
  with `/`.

If a domain ever does turn up: buy it, add a `CNAME` file to this repo
containing just the domain, then Settings → Pages → Custom domain. GitHub
issues the certificate itself, and `robots.txt` starts working as a second
layer alongside the meta tags.

### Netlify — also fine

Same shape: **Add new site → Import an existing project**, build command empty,
publish directory `.` Or, for a first look with no accounts at all, drag the
folder onto [app.netlify.com/drop](https://app.netlify.com/drop) and it is live
in a minute.

Worth knowing if you go this way: since April 2026 Netlify's free plan runs on a
monthly credit pool rather than fixed quotas, and **when the credits run out the
site pauses until the next billing month** — there is no overage to absorb a
spike. Sources disagree on how far the free pool stretches for bandwidth, so
check their current pricing page. With a 19 MB video on the home page that is a
real consideration; on Cloudflare it isn't.

`netlify.toml` is ignored by every other host, so it does no harm wherever you
land.

### GitHub Pages, Vercel, or any old web host

All work. Upload the folder. Nothing needs configuring.

### About that video

22 MB of the site's 22 MB is basically `save-the-date.mp4`. It is set to
`preload="none"`, so it costs nothing until somebody presses play — but a few
hundred guests each pressing play is several GB. On Cloudflare that is fine. If
you want it smaller anyway, 30 seconds at 1080×1920 should re-encode to 4–6 MB
with no visible loss — ask and I'll do it.

---

## Where the answers go

Everything the site collects goes to **Google** — free, and on an account you
already have. Nothing posts to a server, which is why the site can be hosted
anywhere.

| What | Goes to | Config key |
|---|---|---|
| Travel itinerary | A Google Form → Sheet | `collect.itinerary` |
| Mission one, the photographs | A Google Form → **one Drive folder per prompt** | `collect.photos` |
| Mission two, the scores | A Google Form → Sheet | `collect.quiz` |
| The gift registry | A Google Sheet people read | `gifts.sheetUrl` |
| The Sang-it song list | The same workbook, Sangeet tab, people **write** to | `events[].sheet` |

The song list is the one thing guests are meant to type into rather than read,
so the workbook has to be shared **"anyone with the link can edit"**, not view.
That makes the gift registry tab editable by anyone too — it's the same file —
so keep a duplicate of the registry somewhere if that bothers you. The `#gid=`
on the end of the URL is what opens it on the Sangeet tab instead of the first
one; it is not optional.

Any event can carry a sheet. Give it a `sheet` block in `data/config.js` —
`url`, `heading`, `text`, `label`, `note` — and a panel appears inside that
event, under the when/where/dress facts. Delete the block and it's gone.

**[GOOGLE-SETUP.md](GOOGLE-SETUP.md) has the questions to put in each form, in
order, with the settings that matter.** It takes about twenty minutes.

Fill them in one at a time — while a link is still in «guillemets» the site
falls back rather than breaking:

- **No `collect.itinerary`?** `travel.html` shows its own built-in form instead.
- **No `collect.photos`?** Mission one shows its own upload form instead. That
  one is a stopgap: Netlify caps a submission at 8 MB, so it only carries two or
  three photographs at a time.
- **No `collect.quiz`?** The quiz still marks itself; it just doesn't offer
  anywhere to record the score.

The quiz is worth understanding: **the questions and the marking live on the
website**, because that needs no server at all and it's the nicest thing on the
page. The Google Form only records the result — name and score — so it's two
boxes, not ten. If you'd rather have every answer in a Sheet, rebuild all ten
questions in the form and point `collect.quiz` at it; the on-site quiz carries
on working as the practice round.

### The fallback forms

`netlify-forms.html` and the built-in itinerary form are still in the project.
They cost nothing, nothing links to them once the Google links are in, and they
are what shows if a link is ever missing. If you want them gone once Google is
set up, say so.

## Working on it locally

```bash
python3 -m http.server 8788 --directory .
```

Then open http://localhost:8788. You *can* just double-click `index.html`, but
serving it over http is closer to the real thing.

---

## Deliberate choices

- **No webfonts.** System fonts only. The hand-lettering from the invitation
  carries the character, so there was nothing here worth 300 KB of Google Fonts.
- **The cover is the closing frame of the save-the-date film**, pulled straight
  out of the video rather than redrawn.
- **The paintings are the design.** Each event shows its own postcard whole, at
  its own proportions, with a soft blown-up copy of the same file behind the text
  for colour. One download, used twice.
- **No analytics, no tracking, no cookies.** Hence no cookie banner.
- **`robots.txt` blocks search engines.** A wedding isn't for the open internet.
  Delete it if you disagree.
- **Dark mode** follows the reader's system setting, on every page.
- **Works without JavaScript**, degraded: backdrops fall back to flat colour and
  the forms post normally instead of in-place. The story carousel is the one
  thing that needs it — it's built from `story.photos`, so with scripting off
  the text simply takes the full width and no photographs appear.
- **The short version** — the three cards under the hero — is `quick` in the
  config. Every card points at a link that already exists elsewhere on the
  site, so there is no second copy to keep in step; a card whose link isn't
  filled in yet leaves itself out, and if none of them resolve the whole
  section disappears.
- **The story carousel** is a scroll-snap track in a 9:16 frame: a swipe is the
  browser's own scrolling, the arrows and dots only scroll it, and it wraps at
  both ends. Photographs keep their own shape against a blurred copy of
  themselves rather than being cropped, so a landscape one would letterbox
  rather than lose its edges. Add or reorder them in `story.photos`. Put the
  files in `assets/photos/story/` at about 1400px on the long side; they were
  stripped of their camera metadata on the way in, which is worth repeating
  for any you add, since the repo is public.
- **It rotates by itself** every `story.rotateEvery` milliseconds — set that to
  0 to stop it. It pauses under the pointer, while it is off screen or the tab
  is in the background, and entirely for anyone whose system asks for reduced
  motion. The first time a guest uses the arrows, the dots or a swipe it stops
  for good and the small pause button becomes a play button: a carousel that
  resumes on its own moves the photograph out from under whoever is looking at
  it. That button is also what makes the rotation accessible — moving content
  needs a control a keyboard can reach.

### About the weight

The site is about **22 MB**, and 19 MB of that is `save-the-date.mp4`. The video
is set to `preload="none"`, so it costs a visitor nothing until they press play —
the home page itself is roughly 1 MB, and most of that is lazy-loaded artwork:
only the first carousel photograph is fetched up front, the other four wait
until you scroll to them.

If you want it lighter, re-encode the video (30 seconds at 1080×1920 should
compress to 4–6 MB without visible loss) or host it on YouTube/Vimeo and embed it.

## Files

```
index.html  events.html  travel.html  gifts.html  404.html
missions.html            ← the two missions; see `games` in config
netlify-forms.html       ← fallback form declarations. Unlinked. Harmless.
GOOGLE-SETUP.md          ← how to build the three Forms and the Sheet
data/config.js      ← you edit this
data/posts.js       ← the feed's posts; nothing loads it while the feed is off
assets/css/style.css
assets/js/site.js   ← wiring
assets/art/         ← the paintings, plus the save-the-date card used as the cover
assets/img/         ← logo, hand-lettering, the Jagannath eyes
assets/photos/      ← the photographs each painting was made from
assets/video/       ← the save the date
netlify.toml  robots.txt
```
