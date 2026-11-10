/* =============================================================
   site.js — wiring. Reads data/config.js and data/posts.js and
   fills the pages in. You should rarely need to open this file.
   ============================================================= */
(function () {
  "use strict";

  var C = window.WEDDING || {};

  function qs(s, r) { return (r || document).querySelector(s); }
  function qsa(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  /* "travel.air.name" walks objects. A "#id" segment finds an entry in an
     array by its id instead of its position, so commenting out one bullet
     doesn't silently point a page at the bullet below it. */
  function dig(path) {
    return path.split(".").reduce(function (o, k) {
      if (o == null) return o;
      if (k.charAt(0) === "#") {
        return Array.isArray(o)
          ? o.filter(function (x) { return x && x.id === k.slice(1); })[0]
          : null;
      }
      return o[k];
    }, C);
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  /* Anything still wrapped in «guillemets» is unfinished — make it
     impossible to miss. Delete the guillemets and the mark goes away. */
  function todo(s) {
    return esc(s).replace(/«([^»]*)»/g, '<mark class="todo">$1</mark>');
  }
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  /* A link out of config, or "" while it is still in «guillemets». Every
     hand-off to Google goes through here, so a form you haven't made yet
     never turns into a dead button. */
  function cfgLink(path) {
    var v = String(dig(path) || "");
    return v && v.indexOf("«") < 0 ? v : "";
  }

  /* ---------- 1. config binding ----------
     <span data-cfg="couple.one"></span>  → Akanksha
     Add data-cfg-attr="href" to write an attribute instead.        */
  function bindConfig(root) {
    qsa("[data-cfg]", root).forEach(function (n) {
      var v = dig(n.getAttribute("data-cfg"));
      /* Commenting a key out of config.js should make its line disappear,
         not leave an empty element or the word "undefined" on the page. */
      if (v == null || v === "") {
        n.hidden = true;
        var row = n.closest && n.closest("[data-cfg-row]");
        if (row) row.hidden = true;
        return;
      }
      n.hidden = false;
      var attr = n.getAttribute("data-cfg-attr");
      var clean = String(v).replace(/[«»]/g, "");
      if (attr) { n.setAttribute(attr, clean); return; }
      n.innerHTML = todo(v);
    });

    /* A box whose every row has gone is just an empty border. */
    qsa("[data-cfg-box]", root).forEach(function (box) {
      var rows = qsa("[data-cfg-row]", box);
      if (rows.length && rows.every(function (r) { return r.hidden; })) box.hidden = true;
    });
  }

  /* The artwork does the job the generated skies used to do: a soft,
     scaled-up copy sits behind the words for colour, and a crisp copy
     of the same file is shown whole as a postcard. One download, twice. */
  function backdrop(src, alt) {
    return '<img class="sky__art" src="' + esc(src) + '" alt="' + (alt || "") +
           '" aria-hidden="true" loading="lazy" decoding="async">';
  }
  function paintAll(root) {
    qsa("[data-art]:not([data-painted])", root || document).forEach(function (n) {
      n.insertAdjacentHTML("afterbegin", backdrop(n.getAttribute("data-art")));
      n.setAttribute("data-painted", "1");
    });
  }

  /* ---------- 1b. contact details ----------
     The email address and the phone number are kept scrambled in config.js,
     and they are NOT written into the page when it loads. A link shows a
     label ("Email us"); only when somebody reaches for it — pointer down,
     or keyboard focus — does the real value go into the href and the text.

     That is enough to beat the way addresses are actually harvested: a
     regular expression run over the page source, looking for an @ or a run
     of digits. Neither exists until a human acts. It will not stop someone
     determined, and it is not meant to.                                   */
  var MASK_KEY = 0x2a;

  function unmask(hex) {
    var out = "";
    for (var i = 0; i < String(hex).length; i += 2) {
      out += String.fromCharCode(parseInt(String(hex).substr(i, 2), 16) ^ MASK_KEY);
    }
    return out;
  }
  function mask(text) {
    var out = "";
    for (var i = 0; i < String(text).length; i++) {
      var h = (String(text).charCodeAt(i) ^ MASK_KEY).toString(16);
      out += h.length < 2 ? "0" + h : h;
    }
    return out;
  }
  /* So you can generate a new one from the browser console. */
  window.BB = { mask: mask, unmask: unmask };

  function contacts() {
    var K = C.contact || {};
    qsa("[data-contact]").forEach(function (a) {
      var which = a.getAttribute("data-contact");
      var raw = unmask(K[which] || "");
      if (!raw) { a.hidden = true; return; }

      var href = which === "whatsapp"
        ? "https://wa.me/" + raw.replace(/[^0-9]/g, "")
        : "mailto:" + raw;

      var shown = false;
      var reveal = function () {
        if (shown) return;
        shown = true;
        a.setAttribute("href", href);
        /* Show the real thing too, so it can be read and copied. */
        if (a.hasAttribute("data-contact-label")) return;
        a.textContent = raw;
      };
      /* pointerdown fires before click, so one tap still follows the link. */
      ["pointerdown", "touchstart", "focus", "mouseenter"].forEach(function (ev) {
        a.addEventListener(ev, reveal, { once: true, passive: true });
      });
      a.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") reveal();
      });
    });
  }

  /* ---------- 2. nav ---------- */
  function markNav() {
    /* Cloudflare Pages serves /events for events.html, and some hosts add a
       trailing slash. Compare both sides stripped down to a bare name, or
       the "you are here" marker never fires once it's deployed. */
    function bare(u) {
      var v = String(u || "").split(/[?#]/)[0];
      /* A path ending in "/" is a directory index — "/thangamey/" on a
         project Pages site, or "/" at a domain root. Both mean home. */
      if (v === "" || /\/$/.test(v)) return "index";
      return v.split("/").pop().replace(/\.html$/, "") || "index";
    }
    var here = bare(location.pathname);
    qsa(".nav a").forEach(function (a) {
      if (bare(a.getAttribute("href")) === here) {
        a.setAttribute("aria-current", "page");
      }
    });
  }

  /* ---------- 3. countdown ---------- */
  function countdown() {
    var box = qs("#countdown");
    if (!box || !C.mainDate) return;
    var target = new Date(C.mainDate).getTime();
    if (isNaN(target)) return;

    var units = [["days", 864e5], ["hours", 36e5], ["minutes", 6e4], ["seconds", 1e3]];
    box.innerHTML = units.map(function (u) {
      return '<div><b data-u="' + u[0] + '">–</b><span>' + u[0] + "</span></div>";
    }).join("");

    function tick() {
      var left = target - Date.now();
      if (left <= 0) {
        box.innerHTML = '<div style="min-width:auto;padding:.8rem 1.4rem">' +
          "<b>It's happening</b><span>see you in Puri</span></div>";
        clearInterval(timer);
        return;
      }
      units.forEach(function (u) {
        var v = Math.floor(left / u[1]); left -= v * u[1];
        qs('[data-u="' + u[0] + '"]', box).textContent = v;
      });
    }
    tick();
    var timer = setInterval(tick, 1000);
  }

  /* ---------- 4. events ---------- */
  /* The anchor in the URL. It used to be called rsvpSlug, back when there
     was an RSVP page for it to point at. Old configs still work. */
  function slugOf(e) { return e.slug || e.rsvpSlug || ""; }

  function dressLabel() {
    return C.dressCodeIsOptional ? "Optional dress code" : "Dress code";
  }

  /* An optional sign-up sheet bolted onto one event — the Sangeet song list.
     Any event with a `sheet` block in config.js gets one; the rest get
     nothing, so this is safe to leave switched on for all four. */
  function evSheet(e) {
    var s = e.sheet || {};
    var url = String(s.url || "");
    if (!url || url.indexOf("\u00ab") > -1) return "";
    return '<div class="ev-sheet">' +
      (s.heading ? "<h3>" + todo(s.heading) + "</h3>" : "") +
      (s.text ? "<p>" + todo(s.text) + "</p>" : "") +
      '<a class="btn btn--gold" href="' + esc(url) + '" target="_blank" rel="noopener">' +
        esc(s.label || "Open the sheet") + "</a>" +
      (s.note ? '<p class="ev-sheet__note">' + todo(s.note) + "</p>" : "") +
      "</div>";
  }

  function eventPanels() {
    var box = qs("#event-panels");
    if (!box) return;

    /* A jump bar, so four full-height panels don't mean four screens of scrolling
       to reach the one you actually came for. */
    var jump = qs("#event-jump");
    if (jump) {
      jump.innerHTML = (C.events || []).map(function (e) {
        return '<a href="#' + esc(slugOf(e)) + '">' + esc(e.name) + "</a>";
      }).join("");
    }

    (C.events || []).forEach(function (e, i) {
      var s2 = el("section", "sky sky--scrim ev-panel snap-s");
      s2.id = slugOf(e);
      s2.setAttribute("data-sky", e.sky);
      s2.setAttribute("data-painted", "1");
      /* Alternate which side the painting sits on, so four in a row has a rhythm. */
      if (i % 2) s2.classList.add("ev-panel--flip");

      s2.innerHTML =
        backdrop(e.art) +
        '<div class="sky__in">' +
          '<figure class="postcard">' +
            '<img src="' + esc(e.art) + '" alt="The ' + esc(e.name) +
            '" width="681" height="1150" loading="lazy" decoding="async">' +
          "</figure>" +
          '<div class="ev-panel__body">' +
            '<p class="ev-panel__no">' + (i + 1) + " of " + (C.events || []).length +
              (e.isMain ? ' &middot; <b>the main event</b>' : "") + "</p>" +
            (e.logo ? '<img class="ev-panel__logo" src="' + esc(e.logo) + '" alt="' + esc(e.name) +
                      '" loading="lazy" decoding="async"><h2 class="vh">' + esc(e.name) + "</h2>"
                    : "<h2>" + esc(e.name) + "</h2>") +
            '<p class="ev-panel__note">' + todo(e.note || "") + "</p>" +
            '<dl class="ev-facts">' +
              "<div><dt>When</dt><dd>" + esc(e.day) + ", " + esc(e.date) +
                "<br>" + esc(e.time) + "</dd></div>" +
              "<div><dt>Where</dt><dd>" + esc(e.venue) +
                (e.city ? "<br>" + esc(e.city) : "") +
                (e.mapUrl && e.mapUrl.indexOf("\u00ab") < 0
                  ? '<br><a href="' + esc(e.mapUrl) + '" rel="noopener">Open in Maps</a>' : "") +
              "</dd></div>" +
              "<div><dt>" + dressLabel() + "</dt><dd>" + esc(e.dress) + "</dd></div>" +
            "</dl>" +
            evSheet(e) +
            (e.photo
              ? '<figure class="painted-from">' +
                  '<img src="' + esc(e.photo) + '" alt="' + esc(e.photoPlace || "") +
                  '" loading="lazy" decoding="async">' +
                  "<figcaption><b>Painted from</b> " + todo(e.photoPlace || "") +
                  (e.photoNote ? "<span>" + todo(e.photoNote) + "</span>" : "") +
                  "</figcaption></figure>"
              : "") +
          "</div>" +
        "</div>";
      box.appendChild(s2);
    });

    /* The panels didn't exist when the browser handled the URL, so a link
       like events.html#sangeet landed at the top of the page. Do it now. */
    if (location.hash) {
      var t = document.getElementById(location.hash.slice(1));
      if (t) requestAnimationFrame(function () { t.scrollIntoView(); });
    }
  }

  /* Day-grouped summary. Nothing renders it at the moment — the "Here is the
     whole thing" section was taken off the home page — but it is left wired so
     dropping <div id="day-list" class="days"></div> back in brings it back. */
  function dayList() {
    var box = qs("#day-list");
    if (!box) return;
    var days = [];
    (C.events || []).forEach(function (e) {
      var d = days.filter(function (x) { return x.date === e.date; })[0];
      if (!d) { d = { date: e.date, day: e.day, events: [] }; days.push(d); }
      d.events.push(e);
    });
    box.innerHTML = days.map(function (d) {
      return '<div class="day">' +
        '<p class="day__label">' + esc(d.day) + "<span>" + esc(d.date) + "</span></p>" +
        "<ul>" + d.events.map(function (e) {
          return "<li><a href='events.html#" + esc(slugOf(e)) + "'>" +
            "<b>" + esc(e.name) + "</b>" +
            "<span>" + esc(e.time) + " &middot; " + esc(e.venue) + "</span></a></li>";
        }).join("") + "</ul></div>";
    }).join("");
  }

  /* ---------- 5. gift registry ---------- */
  function gifts() {
    var G = C.gifts || {};

    var ways = qs("#gift-ways");
    if (ways) {
      ways.innerHTML = (G.ways || []).map(function (w) {
        return "<li><h3>" + todo(w.title) + "</h3><p>" + todo(w.body) + "</p></li>";
      }).join("");
    }

    var sheetUrl = String(G.sheetUrl || "");
    var haveSheet = !!sheetUrl && sheetUrl.indexOf("\u00ab") < 0;

    var list = qs("#gift-list");
    if (list) {
      var items = G.items || [];
      list.innerHTML = items.length
        ? items.map(function (it) {
            var link = it.url && it.url.indexOf("\u00ab") < 0
              ? ' <a href="' + esc(it.url) + '" rel="noopener">see it</a>' : "";
            return '<li class="gift">' +
              '<span class="gift__name">' + todo(it.name) +
                (it.brand ? '<span class="gift__brand">' + todo(it.brand) + "</span>" : "") +
                link + "</span>" +
              (it.price ? '<span class="gift__price">' + todo(it.price) + "</span>" : "") +
              (it.note && it.note.replace(/[\u00ab\u00bb]/g, "").trim()
                ? '<span class="gift__note">' + todo(it.note) + "</span>" : "") +
              "</li>";
          }).join("")
        : "";

      /* Nothing to show and no sheet to point at yet — say that plainly
         rather than leaving a heading above an empty space. */
      var pending = qs("#gift-pending");
      if (pending) pending.hidden = !!(items.length || haveSheet);
      var blurb = qs("#gift-list-blurb");
      if (blurb) blurb.hidden = !items.length;
    }

    var brands = qs("#gift-brands");
    if (brands) {
      var b = (G.brands || []).filter(function (x) { return x; });
      if (!b.length) { var sec = brands.closest("[data-cfg-row]"); if (sec) sec.hidden = true; }
      else brands.innerHTML = b.map(function (x) {
        return '<li class="brand-chip">' + todo(x) + "</li>";
      }).join("");
    }

    var sheet = qs("#gift-sheet");
    if (sheet) {
      sheet.hidden = !haveSheet;
      if (haveSheet) {
        sheet.href = sheetUrl;
        /* With rows on the page the sheet is the long version; without them
           it is the only version, so it stops being the quiet second button. */
        sheet.className = (G.items || []).length ? "btn btn--ghost" : "btn btn--gold";
      }
    }
  }

  /* ---------- 6. travel ---------- */
  function travel() {
    var t = C.travel || {};

    /* The itinerary goes to a Google Form once there is one. Until then the
       page keeps its own form, so this is never a dead end. */
    var url = cfgLink("collect.itinerary");
    var own = qs("#plans-form");
    var away = qs("#plans-elsewhere");
    if (own) own.hidden = !!url;
    if (away) {
      away.hidden = !url;
      var a = qs("#plans-link", away);
      if (a && url) a.href = url;
    }

    var hotels = qs("#hotel-grid");
    if (hotels && t.hotels) {
      hotels.innerHTML = t.hotels.map(function (h) {
        var isMap = /maps\.google|google\.[a-z.]+\/maps|maps\.app\.goo\.gl/.test(h.url || "");
        var link = h.url && h.url.indexOf("«") < 0
          ? '<p><a href="' + esc(h.url) + '" rel="noopener">' +
            (isMap ? "Map Location" : "Book direct") + "</a></p>" : "";
        return '<div class="card"><h3>' + todo(h.name) + "</h3>" +
          (h.price ? '<p class="card__meta">' + todo(h.price) + "</p>" : "") +
          "<p>" + todo(h.note) + "</p>" + link + "</div>";
      }).join("");
    }
  }

  /* ---------- 7. sustainability ---------- */
  function sustain() {
    var box = qs("#sustain-list");
    if (!box) return;
    var points = (C.sustainable || {}).points || [];
    /* Comment the block out of config.js and the section goes with it,
       rather than leaving a heading over an empty list. */
    if (!points.length) {
      var sec = box.closest("section");
      if (sec) sec.hidden = true;
      return;
    }
    box.innerHTML = points.map(function (p) {
      return "<li><h3>" + todo(p.title) + "</h3><p>" + todo(p.body) + "</p></li>";
    }).join("");
  }

  /* ---------- 6b. the short version ---------- */
  /* Three cards under the hero that jump straight to the things we actually
     need from people. Every link already exists somewhere else on the site;
     this just saves a guest the scroll. */
  function quick() {
    var sec = qs("#quick");
    var list = qs("#quick-list");
    if (!sec || !list) return;

    var Q = C.quick || {};
    var cards = (Q.items || []).map(function (it) {
      var url = "";
      /* A card can say it has nowhere to go. That is different from a card
         whose link simply isn't filled in yet, which leaves itself out. */
      var dead = it.link === false;
      if (dead) {
        url = "";
      } else if (it.event) {
        /* By slug, not by position — reordering the events mustn't quietly
           point this at the wrong party. */
        var ev = (C.events || []).filter(function (e) { return slugOf(e) === it.event; })[0];
        var raw = String((ev && ev.sheet && ev.sheet.url) || "");
        if (raw && raw.indexOf("\u00ab") < 0) url = raw;
      } else if (it.from) {
        url = cfgLink(it.from);
      } else if (it.url && String(it.url).indexOf("\u00ab") < 0) {
        url = String(it.url);
      }
      if (!url && !dead) return "";          /* no link yet: leave it out */
      var inside =
        "<h3>" + todo(it.title || "") + "</h3>" +
        "<p>" + todo(it.body || "") + "</p>";
      if (dead) {
        return '<li class="quick-card quick-card--flat"><div>' + inside + "</div></li>";
      }
      return '<li class="quick-card">' +
        '<a href="' + esc(url) + '" target="_blank" rel="noopener">' +
          inside +
          '<span class="quick-card__go">' + todo(it.label || "Open") +
            '<span class="vh"> (opens in a new tab)</span></span>' +
        "</a></li>";
    }).filter(function (html) { return html; });

    if (!cards.length) return;               /* nothing to point at: stay hidden */
    list.innerHTML = cards.join("");
    sec.hidden = false;
  }

  function story() {
    var box = qs("#story-body");
    if (!box || !C.story) return;
    box.innerHTML = (C.story.paragraphs || []).map(function (p) {
      return "<p>" + todo(p) + "</p>";
    }).join("");
  }

  /* The carousel beside the story. One horizontal scroller with snap points,
     so a swipe on a phone is the browser's own scroll — no drag handling, no
     library. The arrows and dots just scroll it, which keeps the two input
     methods from ever disagreeing about which photo is showing. */
  function storyPhotos() {
    var box = qs("#story-photos");
    if (!box) return;

    var shots = (((C.story || {}).photos) || []).filter(function (p) {
      return p && p.src && p.src.indexOf("\u00ab") < 0;
    });
    if (!shots.length) return;            /* stays hidden, text goes full width */
    box.hidden = false;

    box.setAttribute("aria-roledescription", "carousel");
    box.setAttribute("aria-label", "Photographs of us");
    box.innerHTML =
      '<ul class="carousel__track" id="story-track" tabindex="0" ' +
          'aria-label="Photographs of us, ' + shots.length + ' in all. Use the arrow keys.">' +
        shots.map(function (p, i) {
          /* Default is to fill the 9:16 frame and crop whatever doesn't fit.
             A photo that can't survive that — a wide one with someone at
             each edge — can say fit: "contain" and keep its whole self
             against a blurred copy of itself instead. */
          var contain = p.fit === "contain";
          return '<li class="slide" aria-label="' + (i + 1) + " of " + shots.length + '">' +
            (contain
              /* Same URL as the photo, so the browser fetches it once. */
              ? '<span class="slide__back" style="background-image:url(&quot;' +
                  esc(p.src) + '&quot;)"></span>'
              : "") +
            '<img src="' + esc(p.src) + '" alt="' + esc(p.alt || "") + '"' +
              (contain ? ' data-fit="contain"' : "") +
              /* Which part to keep when it crops. Default is the middle. */
              (p.focus ? ' style="object-position:' + esc(p.focus) + '"' : "") +
              (i ? ' loading="lazy"' : "") + ' decoding="async">' +
          "</li>";
        }).join("") +
      "</ul>" +
      '<button class="carousel__btn carousel__btn--prev" type="button" aria-label="Previous photograph">' +
        '<span aria-hidden="true">\u2039</span></button>' +
      '<button class="carousel__btn carousel__btn--next" type="button" aria-label="Next photograph">' +
        '<span aria-hidden="true">\u203a</span></button>' +
      '<div class="carousel__dots">' +
        shots.map(function (p, i) {
          return '<button class="carousel__dot" type="button" data-go="' + i + '" ' +
            'aria-label="Photograph ' + (i + 1) + '"></button>';
        }).join("") +
      "</div>";

    var track = qs("#story-track", box);
    var dots = qsa(".carousel__dot", box);
    var smooth = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto" : "smooth";

    function index() {
      /* Round rather than floor: half a slide past the line counts as there. */
      var w = track.clientWidth || 1;
      return Math.max(0, Math.min(shots.length - 1, Math.round(track.scrollLeft / w)));
    }

    /* Where the arrows think we are. A smooth scroll takes a few hundred
       milliseconds, and scrollLeft lies for all of them, so two quick taps
       on the arrow would otherwise both read "slide 0" and the second would
       go nowhere. This is updated the instant you click. */
    var want = 0;

    function go(i) {
      want = (i + shots.length) % shots.length;   /* wrap: no dead ends */
      track.scrollTo({ left: want * track.clientWidth, behavior: smooth });
    }
    function sync() {
      var at = index();
      dots.forEach(function (d, i) {
        d.setAttribute("aria-current", i === at ? "true" : "false");
      });
    }

    /* `want` only catches up once the scrolling has actually stopped — during
       a smooth scroll the events keep arriving and keep pushing this back, so
       an in-flight animation can't reset the arrows to where they started.
       A swipe settles the same way, so a finger and the arrows stay agreed. */
    var settle;
    function settled() {
      clearTimeout(settle);
      settle = setTimeout(function () { want = index(); }, 140);
    }

    qs(".carousel__btn--prev", box).addEventListener("click", function () { go(want - 1); });
    qs(".carousel__btn--next", box).addEventListener("click", function () { go(want + 1); });
    dots.forEach(function (d) {
      d.addEventListener("click", function () { go(+d.getAttribute("data-go")); });
    });

    /* One rAF, not one handler call per scroll event. */
    var queued = false;
    track.addEventListener("scroll", function () {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () { queued = false; sync(); });
      settled();
    }, { passive: true });
    window.addEventListener("resize", sync);
    sync();

    /* ---- rotating on its own ----
       `story.rotateEvery` is milliseconds; 0 or missing means it doesn't.
       There is no play/pause button, so the rotation has to be the kind that
       never fights anybody: it holds still under the pointer or the keyboard,
       while it is scrolled off screen or the tab is in the background, for a
       while after a guest moves it themselves, and permanently for anyone
       whose system asks for less motion. */
    var every = Number(((C.story || {}).rotateEvery) || 0);
    var reduce = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!(every > 0) || shots.length < 2 || reduce) return;

    var hover = false;
    var onScreen = true;
    var held = 0;        /* time until which a guest's own move holds it still */

    /* Long enough to read the photograph you went back for, short enough that
       the thing still rotates afterwards. A tap mustn't kill it for good —
       without a button there would be no way to start it again. */
    var HOLD = 15000;
    function hold() { held = Date.now() + HOLD; }

    qs(".carousel__btn--prev", box).addEventListener("click", hold);
    qs(".carousel__btn--next", box).addEventListener("click", hold);
    dots.forEach(function (d) { d.addEventListener("click", hold); });
    track.addEventListener("pointerdown", hold);
    track.addEventListener("keydown", hold);

    box.addEventListener("pointerenter", function () { hover = true; });
    box.addEventListener("pointerleave", function () { hover = false; });
    box.addEventListener("focusin", function () { hover = true; });
    box.addEventListener("focusout", function () { hover = false; });

    if (window.IntersectionObserver) {
      new IntersectionObserver(function (es) {
        onScreen = es[0].isIntersecting;
      }, { threshold: 0.4 }).observe(box);
    }

    setInterval(function () {
      if (hover || !onScreen || document.hidden || Date.now() < held) return;
      go(want + 1);
    }, every);
  }

  /* ---------- 7b. logo + save the date ---------- */
  /* The captions are plain markup bound by data-cfg; this only puts the
     media itself into the two frames beside the carousel. */
  function media() {
    var M = C.media || {};

    var logo = qs("#logo-figure");
    if (logo && M.logo) {
      logo.innerHTML =
        '<img class="logo-mark" src="' + esc(M.logo) + '" alt="The Akanksha and ' +
          'Prateek logo: two figures holding hands, one with a dragon head, one ' +
          'with a whale head" width="720" height="676" loading="lazy" decoding="async">';
    }

    /* index.html carries the hero image statically so it loads first and
       still shows without JavaScript. That used to mean editing media.cover
       did nothing at all, so: if the config disagrees with the markup, the
       config wins. */
    /* #hero-cover, not .hero — 404.html is a hero too, and it has its own
       painting. This used to overwrite it with the home page's cover. */
    if (M.cover) {
      var heroCard = qs("#hero-cover .postcard img");
      if (heroCard && heroCard.getAttribute("src") !== M.cover) heroCard.src = M.cover;
      var heroSky = qs("#hero-cover[data-art]");
      if (heroSky && heroSky.getAttribute("data-art") !== M.cover) {
        heroSky.setAttribute("data-art", M.cover);
        var back = qs("#hero-cover .sky__art");
        if (back) back.src = M.cover;
      }
    }

    var vid = qs("#video-figure");
    if (vid && M.video) {
      /* preload="none" — 19 MB should cost nothing until somebody presses play. */
      vid.innerHTML =
        '<video class="std" controls playsinline preload="none" width="1080" height="1920"' +
          (M.videoPoster ? ' poster="' + esc(M.videoPoster) + '"' : "") + ">" +
          '<source src="' + esc(M.video) + '" type="video/mp4">' +
          "<p>Your browser can't play this. " +
          '<a href="' + esc(M.video) + '">Download the video instead.</a></p>' +
        "</video>";
    }
  }

  /* The feed is switched off for now — feed.html is gone and nothing loads
     data/posts.js. Put the page and the <script> back and this returns. */

  /* ---------- 8. the missions ----------
     missions.html: a photo hunt and a quiz, both of them forms. Hidden
     behind the same date gate unless `live` says otherwise.

     This is a static site. "Off" means hidden, not locked — the prompts and
     the quiz answers sit in data/config.js, which anyone can open. For a
     wedding game that is the right trade; it is not an exam. */
  function previewing() {
    return /(^|[?&])preview(=|&|$)/.test(location.search);
  }

  function gamesLive() {
    if (previewing()) return true;
    var G = C.games || {};
    if (G.live === true) return true;
    if (G.live === false) return false;
    var from = G.liveFrom ? Date.parse(G.liveFrom) : NaN;
    var till = G.liveUntil ? Date.parse(G.liveUntil) : NaN;
    var now = Date.now();
    if (!isNaN(from) && now < from) return false;
    if (!isNaN(till) && now > till) return false;
    return !isNaN(from) || !isNaN(till);
  }

  /* The nav is plain HTML on every page, so the link is put in here — which
     means it genuinely isn't in the page until the missions are on. */
  function gamesNav() {
    /* The link is always there. Before the window opens the page says so;
       a nav item that appears overnight is stranger than one that waits. */
    var nav = qs(".nav");
    if (!nav || qs('.nav a[href^="missions.html"]')) return;
    var a = el("a", null, esc((C.games || {}).navLabel || "Missions"));
    a.href = "missions.html" + (previewing() ? "?preview" : "");
    nav.appendChild(a);
  }

  /* #game is the real page, #game-gate the holding note. One survives. */
  function gameGate() {
    var game = qs("#game");
    if (!game) return false;
    var gate = qs("#game-gate");
    var on = gamesLive();
    game.hidden = !on;
    if (gate) {
      gate.hidden = on;
      var when = qs("#game-open-label", gate);
      if (when) when.innerHTML = todo((C.games || {}).openLabel || "");
    }
    missionBar(on);
    if (on && previewing() && !qs(".preview-flag", game)) {
      game.insertBefore(
        el("p", "preview-flag shell",
           "Preview — the missions are switched off for guests. Drop " +
           "<code>?preview</code> off the URL to see what they get."),
        game.firstChild);
    }
    return on;
  }

  function setText(sel, value) {
    var n = qs(sel);
    if (n && value) n.innerHTML = todo(value);
  }

  /* The two names are already in the markup. Once the missions are open
     each one becomes a link to its card; before that it stays a label,
     because there is nothing yet to jump to. */
  function missionBar(open) {
    if (!open) return;
    qsa("#mission-bar [data-mission]").forEach(function (span) {
      var a = el("a", null, span.textContent);
      a.href = "#" + span.getAttribute("data-mission");
      span.parentNode.replaceChild(a, span);
    });
  }

  function missions() {
    var G = C.games || {};
    var cards = qs("#mission-cards");

    setText("#missions-heading", G.heading);
    setText("#missions-intro", G.intro);
    if (!cards) return;

    /* Each mission is one Google Form. If its link isn't filled in yet the
       card still appears and says so, rather than offering a dead button —
       a guest standing in Puri with a phone needs to know which it is. */
    cards.innerHTML = [G.photos, G.quiz].map(function (m, i) {
      if (!m) return "";
      var url = cfgLink(i === 0 ? "collect.photos" : "collect.quiz");
      return '<li class="card mission-card" id="' + (i === 0 ? "i-spy" : "gather-intel") + '">' +
        '<p class="card__meta">' + todo(m.eyebrow || ("Mission " + (i + 1))) + "</p>" +
        "<h2>" + todo(m.heading || "") + "</h2>" +
        (m.intro ? "<p>" + todo(m.intro) + "</p>" : "") +
        (url
          ? '<p class="btn-row" style="justify-content:flex-start">' +
              '<a class="btn btn--gold" href="' + esc(url) + '" target="_blank" rel="noopener">' +
              esc(m.openLabel || "Open the form") + "</a></p>"
          : '<p class="form-note">The form for this one isn\'t up yet. ' +
            "Ask us and we will send it to you.</p>") +
        "</li>";
    }).join("");

    setText("#missions-close", G.closeLabel);
  }

  /* ---------- 9. forms ---------- */
  function encode(data) {
    return Object.keys(data).map(function (k) {
      return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
    }).join("&");
  }

  /* A form with files has to go as multipart, and empty file inputs are
     dropped so a half-finished mission isn't padded with blank parts. */
  function collectFiles(form) {
    var fd = new FormData();
    qsa("input,select,textarea", form).forEach(function (f) {
      var n = f.name;
      if (!n || n === "bot-field") return;
      if (f.type === "file") {
        if (f.files && f.files[0]) fd.append(n, f.files[0], f.files[0].name);
        return;
      }
      if ((f.type === "radio" || f.type === "checkbox") && !f.checked) return;
      fd.append(n, f.value);
    });
    return fd;
  }

  function fdSummary(fd) {
    var out = {};
    fd.forEach(function (v, k) {
      out[k] = (v && v.name) ? "[file] " + v.name : v;
    });
    return out;
  }

  /* Post a form's data wherever config says. Resolves to
     { ok: true } | { ok: true, demo: true } | { ok: false, msg: "…" }. */
  function sendTo(form, data) {
    var backend = C.formBackend || "netlify";
    var name = form.getAttribute("name");
    var isFD = typeof FormData !== "undefined" && data instanceof FormData;

    if (backend === "demo" || location.protocol === "file:") {
      try {
        var key = "bb-" + name;
        var all = JSON.parse(localStorage.getItem(key) || "[]");
        all.push({ at: new Date().toISOString(), data: isFD ? fdSummary(data) : data });
        localStorage.setItem(key, JSON.stringify(all));
      } catch (e) { /* private browsing — nothing to do */ }
      return Promise.resolve({ ok: true, demo: true });
    }

    if (isFD) data.set("form-name", name); else data["form-name"] = name;

    if (backend === "formspree") {
      return fetch("https://formspree.io/f/" + C.formspreeId, {
        method: "POST",
        headers: isFD ? { Accept: "application/json" }
                      : { "Content-Type": "application/json", Accept: "application/json" },
        body: isFD ? data : JSON.stringify(data),
      }).then(function (r) {
        return r.ok ? { ok: true } : { ok: false, msg: "Formspree said no (" + r.status + ")." };
      }).catch(function () { return { ok: false, msg: "We couldn't reach the server." }; });
    }

    /* Netlify Forms: post back to the page itself. With files, hand fetch the
       FormData untouched so the browser writes the multipart boundary. */
    return fetch(form.getAttribute("action") || location.pathname, isFD
      ? { method: "POST", body: data }
      : { method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encode(data) }
    ).then(function (r) {
      return r.ok ? { ok: true } : { ok: false, msg: "The server returned " + r.status + "." };
    }).catch(function () { return { ok: false, msg: "We couldn't reach the server." }; });
  }

  /* Turn a form into a flat object; checkbox groups become "a, b, c". */
  function collect(form) {
    var out = {};
    new FormData(form).forEach(function (v, k) {
      if (k === "bot-field") return;
      out[k] = out[k] ? out[k] + ", " + v : v;
    });
    return out;
  }

  function status(form, tone, html) {
    var box = qs(".form-status", form.parentNode) || (function () {
      var b = el("div", "form-status");
      form.parentNode.insertBefore(b, form);
      return b;
    })();
    box.setAttribute("data-tone", tone);
    box.innerHTML = html;
    box.hidden = false;
    box.setAttribute("role", "status");
    box.scrollIntoView({ block: "center", behavior: "smooth" });
  }

  function wireForms() {
    qsa("form[data-ajax]").forEach(function (form) {
      form.addEventListener("submit", function (ev) {
        if (qs('[name="bot-field"]', form) && qs('[name="bot-field"]', form).value) {
          ev.preventDefault(); return;                       // a bot filled the honeypot
        }
        if (!form.reportValidity()) return;
        ev.preventDefault();

        var files = form.hasAttribute("data-files");
        var btn = qs('[type="submit"]', form);
        var label = btn ? btn.textContent : "";

        var done = function () {
          if (btn) { btn.disabled = false; btn.textContent = label; }
        };
        var bad = function (msg) {
          done();
          status(form, "bad",
            "<p><strong>That didn't send.</strong> " + esc(msg) + "</p>" +
            "<p>Please email us instead: " +
            '<a data-contact="email" data-contact-label>email us</a></p>');
          contacts();
        };

        if (files) {
          var picked = qsa('input[type="file"]', form)
            .filter(function (i) { return i.files.length; });

          /* An upload form with nothing attached is an empty submission. */
          if (!picked.length) {
            status(form, "bad", "<p><strong>Nothing attached yet.</strong> " +
              "Add at least one photograph before you send it.</p>");
            return;
          }

          /* Netlify refuses a form request over 8 MB outright. Three photos off
             a modern phone can pass that, so say so here rather than letting
             them watch a progress bar end in a server error. Sending in
             batches works: every submission is kept. */
          var LIMIT = 7.5 * 1024 * 1024;
          var total = picked.reduce(function (n, i) { return n + i.files[0].size; }, 0);
          if (total > LIMIT) {
            var mb = function (b) { return (b / 1048576).toFixed(1) + " MB"; };
            status(form, "bad",
              "<p><strong>That's " + mb(total) + " \u2014 too much to send in one go.</strong> " +
              "The limit is 8 MB a time.</p>" +
              "<p>Take a few off and send them, then attach the rest and send again. " +
              "Nothing is lost \u2014 we get every batch, and we'll put them back together.</p>");
            return;
          }
        }

        if (btn) { btn.disabled = true; btn.textContent = files ? "Uploading…" : "Sending…"; }

        sendTo(form, files ? collectFiles(form) : collect(form)).then(function (r) {
          if (!r.ok) { bad(r.msg); return; }
          done();
          form.hidden = true;
          if (r.demo) {
            status(form, "info",
              "<p><strong>Saved locally — nothing was actually sent.</strong></p>" +
              "<p>The site is running without a form backend (either <code>formBackend: \"demo\"</code> " +
              "in <code>data/config.js</code>, or you opened the file directly instead of over http). " +
              "Deploy it and this becomes a real submission.</p>");
            return;
          }
          status(form, "ok", qs("[data-thanks]", form.parentNode)
            ? qs("[data-thanks]", form.parentNode).innerHTML
            : "<p><strong>Got it — thank you.</strong> We'll be in touch.</p>");
        });
      });
    });

    /* "Coming to this one?" toggles reveal the per-event extras. */
    qsa("[data-reveal]").forEach(function (input) {
      var target = qs(input.getAttribute("data-reveal"));
      if (!target) return;
      var sync = function () {
        var on = qsa('input[name="' + input.name + '"]')
          .filter(function (i) { return i.checked; })
          .some(function (i) { return i.hasAttribute("data-reveal"); });
        target.hidden = !on;
      };
      qsa('input[name="' + input.name + '"]').forEach(function (i) {
        i.addEventListener("change", sync);
      });
      sync();
    });
  }

  /* ---------- 10. go ---------- */
  function init() {
    document.title = (document.title ? document.title + " · " : "") +
      String((C.couple || {}).siteTitle || "").replace(/[«»]/g, "");
    bindConfig(document);
    contacts();
    gamesNav();
    markNav();
    countdown();
    eventPanels();
    dayList();
    gifts();
    travel();
    sustain();
    quick();
    story();
    storyPhotos();
    media();
    if (gameGate()) missions();
    wireForms();
    paintAll(document);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else { init(); }
})();
