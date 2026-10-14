---
title: "Focus states you can actually see"
description: "The keyboard user is your most consistent tester. Focus styles are their cursor — here's how to make them visible without making them ugly."
date: 2024-11-12
tags: [accessibility, css]
---

Tab through most websites and watch the focus indicator vanish. Default
browser outlines get stripped by CSS resets and never replaced, or replaced
with something so faint it fails contrast on both light and dark surfaces.

The keyboard user is the most consistent tester your site will ever have:
no hover states, no mouse precision, just tab-order and whatever focus
indicators you left them. Focus styles are their cursor.

## The reset problem

The villain is this line, present in nearly every inherited stylesheet:

```css
/* somewhere in a reset you forgot about */
*:focus { outline: none; }
```

Removing the outline without a replacement isn't minimalism — it's
removing the cursor. WCAG 2.4.7 (Focus Visible) fails quietly: nothing
breaks, no error fires, the site just becomes unnavigable for anyone not
using a mouse.

## The fix: `:focus-visible` + real contrast

Modern CSS separates "user is keyboard-navigating" from "user clicked with
a pointer". Use it:

```css
:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}
```

Two details matter as much as the selector:

**Offset** — a ring flush against the element blurs into its own border
on busy backgrounds. Two pixels of offset separates them at any zoom level.

**Contrast on both themes** — test the ring against your lightest surface
and your darkest. Amber on near-black and a darkened amber on warm paper —
this site uses exactly that pair, because one flat color can't pass 3:1
against both extremes.

## Details that separate good focus from checkbox-ticking

- **Never remove focus from interactive elements** — `tabindex="-1"` on
  links is a smell, and programmatic focus should land somewhere useful.
- **Skip links** — the first tabbable element should be "skip to content";
  keyboard users tab through the navbar on *every page* otherwise.
- **Dark input autofill** and dark mode can eat each other; check
  `-webkit-autofill` styling if your forms look fine until Chrome fills
  them.
- **Modal focus traps** — when a dialog opens, focus moves into it, and
  tab cycles inside until it closes. Radix and friends handle this; custom
  modals usually don't.

## Try it right now

Press tab and count how many focus indicators you can see clearly. If your
site passes, you're in a small minority — and your keyboard users noticed.
