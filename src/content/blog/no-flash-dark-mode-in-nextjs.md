---
title: "Fixing Dark Mode Flash in Next.js: Simple & Bulletproof"
description: "Why dark mode flash happens in SSR apps and the simple inline script pattern that fixes it forever."
date: 2025-01-16
tags: [nextjs, css, tailwind, frontend]
---

Few things feel less professional on a developer portfolio than opening a website late at night and having a blinding white flash hit your eyes for 200ms before dark mode kicks in.

This happens because the HTML from the server renders before the client's JavaScript has read the user's preference from `localStorage`.

Here is the exact approach I use to guarantee zero-flash theme persistence in Next.js.

## The Cause: Hydration Timing

When a user visits your site:
1. The browser requests the page and starts parsing the initial HTML.
2. The HTML defaults to light mode styles.
3. React loads and runs `useEffect` on the client.
4. The client reads `localStorage.getItem("theme")`, notices it is `"dark"`, and adds `.dark` to `<html>`.

That delay between step 1 and step 4 is where the white flash happens.

## The Fix: An Inline Blocking Script

The solution is to inspect the theme *before* the browser paints the body. By placing an inline, non-deferred script inside the `<head>` of the document, the script runs synchronously:

```html
<script>
  (function() {
    try {
      const theme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (theme === "dark" || (!theme && prefersDark)) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch (_) {}
  })();
</script>
```

In modern Next.js using `next-themes`, this is handled cleanly with `<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>`.

Pair this with `suppressHydrationWarning` on your `<html>` element, and your dark mode will load instantly with zero flicker on any connection.
