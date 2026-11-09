# Setting up the Google side

Everything this site collects goes to Google: three Forms and one Sheet. All
free, all on the account you already have.

Make them in any order. Paste each share link into the `collect` block near the
top of `data/config.js`, and the registry sheet into `gifts.sheetUrl`. Until a
link is filled in the site falls back gracefully — nothing on the page breaks
and no button goes anywhere dead.

```js
collect: {
  itinerary: "https://forms.gle/…",
  photos:    "https://forms.gle/…",
  quiz:      "https://forms.gle/…",
},
```

**For every form**, in Settings:

- **Responses → Collect email addresses: Off.** The form asks for an email
  itself, and leaving this on forces guests to sign in to Google.
- **Limit to 1 response: Off.** People will want to send twice.
- Link it to a Sheet: Responses tab → the green Sheets icon.
- Share with `forms.gle` short links (Send → the link icon → Shorten URL).

> **The one exception is the photo form.** File uploads *always* require the
> guest to be signed in to a Google account — there is no way round it. That
> is the price of getting a folder per photograph. Say so on the form's
> description so nobody is surprised.

---

## 1. Travel itinerary

Title it something like **Thangamey — your travel plans**.

| # | Question | Type | Notes |
|---|---|---|---|
| 1 | Your name | Short answer | Required |
| 2 | Email | Short answer | Required |
| 3 | How are you getting here? | Multiple choice | Flying / Train / Driving / Already nearby |
| 4 | Flight or train number | Short answer | e.g. 6E 6383, or 12801 Purushottam Express |
| 5 | Arriving | Date and time | |
| 6 | Leaving | Date and time | |
| 7 | Where are you staying? | Multiple choice | Fortune Beachfront / The Chanakya BNR / Somewhere else in Puri / With family / Not booked yet |
| 8 | Happy to share a car from the airport? | Multiple choice | Happy to share / Rather not / I have my own |
| 9 | Anything else | Paragraph | Mobility needs, a toddler, an 04:40 landing you'd like to complain about… |

Then set `collect.itinerary` and the built-in form on `travel.html` is replaced
by a button through to this.

---

## 2. Mission one — I Spy

Title it **Thangamey — I Spy**. This is the one that needs care,
because the question titles become your folder names.

Start with:

| # | Question | Type |
|---|---|---|
| 1 | Your name | Short answer, required |
| 2 | Email | Short answer, required |

Then **one file-upload question per photograph**, in this order. Set each one to
**allow only images** and **1 file maximum**, and make none of them required —
nobody will have all ten.

| 1 | Someone you have only ever met in a family WhatsApp group. | File upload — **1 file**, images only |
| 2 | A pair of hands straight after Daler Mehandi. The messier the better. | File upload — **1 file**, images only |
| 3 | The worst possible photograph of the bride. One of the groom too. We will be judging. | File upload — **1 file**, images only |
| 4 | Sunrise over the Bay of Bengal. You will have to actually get up. | File upload — **1 file**, images only |
| 5 | Turmeric in mid-air. | File upload — **1 file**, images only |
| 6 | Somebody asleep in a chair between two and five in the afternoon. | File upload — **1 file**, images only |
| 7 | Four generations in one frame. | File upload — **1 file**, images only |
| 8 | Whatever was on the plate that you went back for twice. | File upload — **1 file**, images only |
| 9 | A stranger in Puri who made your day — ask them first. | File upload — **1 file**, images only |
| 10 | The last song of Sang-it, from the middle of the floor and not the edge. | File upload — **1 file**, images only |

### Why the titles matter

The moment you add the first file-upload question, Drive creates a folder named
after the form. Each upload question then gets **its own subfolder inside it,
named after the question**:

```
Thangamey — ten photographs (File responses)/
  Someone you have only ever met in a family WhatsApp group/
  A pair of hands straight after Daler Mehandi…/
  The worst possible photograph of the bride…/
  …
```

That is the per-prompt sorting you wanted: open a folder, see everyone's
attempt at that one prompt side by side. Keep the question titles the same as
the prompts in `config.js` so the folders match what guests read on the site.

**Check your Drive storage.** Uploads land in *your* Drive and count against
your 15 GB. A hundred guests at a few photographs each will be a few GB — fine,
but worth watching, and worth not being at 14.8 GB already.

---

## 3. Mission two — Gather Intel

Title it **Thangamey — Gather Intel**. The quiz is played *in the form* now,
not on the website, so the questions have to live here.

1. Make it a **Quiz**: Settings → Make this a quiz → *Release grade immediately
   after each submission*. That is what shows a guest their score.
2. Add each question from `games.quiz.questions` in `data/config.js` as
   **Multiple choice**, with its four options in the same order.
3. On each one, **Answer key** → mark the right option → give it 1 point. The
   `answer` number in the config is the position counting from zero, so
   `answer: 0` is the first option.
4. Add **Your name** (short answer, required) at the top. Leave "Collect email
   addresses" off unless you want it.

| # | Question | Type | Notes |
|---|---|---|---|
| 1 | Your name | Short answer | Required |
| 2… | Each question from the config | Multiple choice | 1 point, answer key set |

Four of the questions in the config are still templates in «guillemets».
Write them or leave them out — the form is the quiz, so only what you build
here counts.

Set `collect.quiz` and the **Open Gather Intel** button appears on the
missions page inside the window.

---

## 4. The gift registry

This one is a **Sheet**, not a form — people read it rather than filling it in.

1. Make a sheet with the things you'd use. One row each: item, roughly what it
   costs, a link if there is one, and a column for who has claimed it.
2. Share → **Anyone with the link → Viewer**. Viewer, not Editor.
3. Paste the link into `gifts.sheetUrl` in `data/config.js`.

The **Open the full sheet** button then appears on the Gift Registry page, and
the "we're still writing it down" line goes away.

You can also type a few rows into `gifts.items` to show them on the page itself,
with the sheet as the long version underneath. Both work; the sheet alone is
less to maintain.

---

## What this leaves on the website

Nothing posts anywhere. No Netlify Forms, no Formspree, no backend of any kind
— which means the site is now plain files and you can host it free more or less
anywhere. See **Deploying** in the README.

`netlify-forms.html` and the built-in itinerary form are still in the project as
a fallback. Leave them; they cost nothing and they are what shows if a Google
link is ever missing.
