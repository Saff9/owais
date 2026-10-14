---
title: "Dark mode without the flash of wrong theme"
description: "Why server-rendered pages paint the wrong colors for 300ms, the blocking script that decides the theme before first paint, and what next-themes buys on top."
date: 2026-10-12
tags: [css, nextjs]
---

You know the flash. The page loads white, your eyes start adjusting, and a
third of a second later the dark theme snaps in like a stagehand killing the
lights. Some users see it on every visit. If most of your traffic runs dark,
most of them do.

> The flash is the site admitting it doesn't recognize you yet.

It isn't a rendering bug. It's an ordering problem, and the fix is entirely
about understanding the order.

## Where the theme actually lives

Pure CSS dark mode — `@media (prefers-color-scheme: dark)` — never flashes.
The browser knows the OS preference before your HTML arrives, so the first
paint is already correct. That system has one flaw: it can't remember an
explicit choice. The moment you add a theme toggle that persists, you need a
class on `<html>`, the class needs JavaScript, and JavaScript runs after
first paint.

That's the whole bug. Persistence costs you the one source of theme truth
that paints for free.

There is a way out that skips JavaScript entirely: store the theme in a
cookie, read it on the server, render `<html class="dark">` for real. Zero
flash, zero script. The bill comes due on caching — every response is now
per-user, so static HTML and full-page caching are off the table. For this
site, static generation wins; fifteen lines of client script beat giving up
the entire caching model. For an app that already renders per-user HTML, take
the cookie and skip to the end of this post.

## The fifteen lines, and where they go

The only code that runs before first paint is CSS and blocking script. So the
theme decision becomes a small blocking script, injected inline at the top of
the document. Stripped of edge cases, this is the whole idea:

```tsx
const themeInit = `(function () {
  try {
    var t = localStorage.getItem("theme");
    if (t !== "light" && t !== "dark") {
      t = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    var root = document.documentElement;
    root.classList.add(t);
    root.style.colorScheme = t;
  } catch (e) {}
})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        {/* everything else renders below the decision */}
      </body>
    </html>
  );
}
```

Three details, in order of how often they get skipped:

**The `try/catch`.** Storage access throws in a few locked-down browser
configurations. The catch means the page paints with the default instead of
handing an error to whoever's watching the console on a corporate laptop.

**`suppressHydrationWarning`, on `<html>` only.** The server rendered no
theme class; the client DOM has one. React will flag that mismatch, and
suppressing it globally is a habit worth breaking — scoped to `<html>` it's a
contract: React owns the tree, the script owns the class. The mismatch is the
feature working.

**`style.colorScheme`.** Without it, the browser paints its own furniture —
scrollbars, form defaults — in light while your CSS says dark. Two systems
quietly disagreeing at the edges of every page. Set it in the same script so
they never diverge.

The script is about 300 bytes inline, so "blocking" costs nothing measurable:
the bytes are already in the HTML, no network round trip, no bundle. This is
the rare case where inline script is the correct tool and not a habit to
refactor away.

## What next-themes buys on top

This site runs next-themes, and I'll defend that even though the script above
is the entire happy path. Read the package source and you find those fifteen
lines, plus the dull edges:

- syncing the choice across tabs, so toggling dark in one tab doesn't leave
  the others stale
- following OS theme changes *live* — a `matchMedia` listener — for users who
  never made an explicit choice
- `disableTransitionOnChange`, which briefly suppresses CSS transitions so a
  theme switch doesn't animate every background on the page
- nonce support for CSP, configurable storage keys, and a small API for
  forcing themes per route

All of it is boring. That's the argument. Boring edge cases are exactly the
code teams write badly on the first pass and exactly the code that rots
unattended for years. The package is a couple of kilobytes gzipped. The
honest summary: hand-roll it once to learn it; ship the package when you want
to ship.

## Custom properties are the theme boundary

Once the class lands on `<html>`, nothing downstream should care. The class
swaps variable values; the variables feed every utility and component; no
component branches on the active theme:

```css
:root {
  --background: #e9e7dd;  /* warm paper */
  --foreground: #24231d;
  --amber-fg: #7a540b;    /* passes AA on paper */
}

.dark {
  --background: #0b0b0d;  /* the void */
  --foreground: #f2f1ec;
  --amber-fg: #f5b638;    /* same intent, re-tuned */
}
```

The amber is the interesting one. "Emphasized text" is one intent with two
values, because no single hex passes contrast against both paper and void.
That decision gets made exactly once, at the token — every link, marker, and
hash-tag inherits the answer. Those are this site's actual values, by the way.

Components that style themselves with `if (dark) this else that` have
smuggled a second theme system into the app, and the two will drift apart on
a schedule set by whoever edits each file. One switch — the class. One
boundary — the variables. The single deliberate exception here is the fake
terminal on the home page, which stays dark in both themes because a terminal
is a terminal. Exceptions should be declared, not discovered in a bug report.

## Follow the system until the user overrides

`localStorage` is an override, not a cache. If the user never chose, the OS
preference is the answer — and it changes, usually around sunset, so the site
should follow it live instead of sampling it once at first load and trusting
a stale answer all evening:

```tsx
const mq = window.matchMedia("(prefers-color-scheme: dark)");
mq.addEventListener("change", (e) => {
  if (!localStorage.getItem("theme")) {
    document.documentElement.classList.toggle("dark", e.matches);
  }
});
```

To see the flash for yourself before fixing it: DevTools, Rendering panel,
emulate `prefers-color-scheme: dark`, network throttled to Slow 3G, cache
disabled, reload. What paints first is what your dark users see on every
visit. After the script is in, the first paint should already be right —
that's the entire acceptance test.

The flash of wrong theme is a trust problem disguised as a cosmetic one.
Decide in a blocking script, store the decision in one class, translate it
through variables, follow the OS until the user tells you otherwise. Fifteen
lines, and dark mode stops being a feature. It becomes a property.
