---
title: "Design tokens are an API, not a palette"
description: "Raw hex in components is deferred debt with compounding interest. Treat color and spacing as a versioned contract — Tailwind 4 @theme makes it load-bearing."
date: 2026-10-05
tags: [css, design]
---

A palette is what a site looks like. An API is what a site promises. Confuse
the two and every redesign stops being a refactor and becomes an excavation.

Most teams treat their colors as a mood board that happens to live in the
codebase. One app I inherited had 214 hex literals across 38 components. The
brand blue appeared in three spellings, two of which were different colors
entirely. Nobody could say which one was correct, because "correct" was never
defined — only painted.

## Raw hex is a debt instrument

Every literal color in a component is a loan against the next redesign, and
the interest compounds quietly. `#3B82F6` in a button says nothing — not what
it's for, not who owns it, not whether the dark theme has an opinion about
it. Six months later the brand changes, someone greps for the hex, finds 17
occurrences, misses the 18th because it's spelled `#3b82f6` in a 900-line
file, and the straggler ships to production, where it lives for two sprints
as a barely-different blue nobody can authorize deleting.

The redesign math is the whole argument. Changing a value behind a token is
one edit, and the diff is one line. Changing a value that was pasted 40 times
is 40 edits, each one an opportunity to miss the 41st. I've done both. The
one-line version ends with a cache bust. The 40-edit version ends with a
400-line diff that someone has to review pixel by pixel, and a bug ticket
titled "footer still old blue" six weeks later.

## The name is the contract

Design tokens are an API in the strict sense: consumers depend on names, and
providers own the values. All the rules fall out of that one sentence.

**Value changes are safe.** Re-tune `--surface-raised` from `#111114` to
`#121216` and every consumer updates atomically. The review question is one
sentence: does it still pass contrast? Not forty sentences about which files
were touched.

**Name changes are breaking.** Renaming a token that 40 files consume is a
major-version move, so you don't just rename — you alias, ship, grep for
stragglers, and delete the alias when the grep comes back empty:

```css
/* rename: --surface-2 → --surface-raised, shipped non-breaking */
:root {
  --surface-raised: #111114;
  /* deprecated alias — delete after one release */
  --surface-2: var(--surface-raised);
}
```

The last rename I did this way touched 40 files, produced a 41-line diff and
zero pixel changes, and the alias lived exactly one release. That's what a
contract buys: renames that don't break pages, because no consumer ever
depended on the implementation.

> The value is an implementation detail. The name is the promise.

**Names should carry intent, not appearance.** `--danger` survives three
rebrands; `--red-600` survives none of them. Keep a primitive layer if you
want one, but components consume semantics — `--link`, `--danger`,
`--surface-raised`. Primitives are ingredients. A recipe that calls for
"ingredient #47" isn't a recipe.

## Tailwind 4 makes the contract load-bearing

In Tailwind 4 the theme lives in the CSS file itself — `@theme` — and the
utilities are generated from it. This is the part that changed my habits: the
token file stops being documentation and becomes the compiler's input.

```css
@theme inline {
  --color-background: var(--background);
  --color-card: var(--card);
  --color-border: var(--border);
}
```

Type `bg-card` and it compiles to the token reference. Typo it as `bg-crads`
and nothing generates — the element renders unstyled in review, which is
exactly when you want the failure. Meanwhile every value stays a variable at
runtime, because `inline` passes the reference through instead of freezing
the literal. That's the mechanism that lets one class swap re-theme the whole
page with zero JavaScript.

Compare with the old arrangement: a palette tab in the design file, a
JavaScript config object, and a comment at the top of the stylesheet saying
"keep these in sync." Three sources of truth, all lying to each other by the
third quarter. The sync problem didn't get solved here — it got deleted.

## Two themes, one token system

Light and dark are not two designs. They're two values per intent, swapped at
a single boundary:

```css
:root { --amber-fg: #7a540b; }  /* passes AA on warm paper */
.dark { --amber-fg: #f5b638; }  /* the same intent on the void */
```

Every component reads `text-amber-fg` and never learns which theme is active.
That's the point — theming is a data problem, and the data has exactly one
switch. Tailwind's `dark:` variant is legitimate for one-off adjustments, but
if a component needs it for its core surfaces, the token layer is missing a
slot and that's the fix.

The alternative — per-component dark styling sprinkled wherever someone
happened to notice a contrast problem — distributes the theme across hundreds
of files. It works until two people style the same element from opposite
sides of the codebase. And the contrast math? Done once per token pair, or
done implicitly never. One intent, two values, both tested: that's the entire
dark mode QA budget.

## What it costs

Tokens aren't free, and pretending otherwise is how the practice dies. The
naming argument — semantic versus primitive — is a real meeting, and it's
worth having once instead of forever. There's indirection: a new engineer
asks where a color comes from and the answer is a variable defined in another
file; grep makes it a ten-second question, but the question still gets asked.
And there's discipline: pasting a raw hex is always faster than minting a
token, always wrong, and always tempting at 6pm on a Friday.

The payoff is structural. Values change without ceremony. Names change
without breakage. A high-contrast mode later is a third block of values, not
a third rewrite. A redesign becomes an edit to one file instead of a
migration with a project code.

A palette describes the site you have. Tokens prescribe every site you'll
have. One of those survives the next brand meeting, and it isn't the
mood board.
