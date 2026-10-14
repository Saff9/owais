---
title: "The 200ms club: what actually moved the needle"
description: "Four changes that cut our cold start from 2.1s to under 200ms — ranked by effort-to-payoff, with the numbers."
date: 2025-02-10
tags: [performance, nextjs]
---

Every performance article promises the same things, so here is the short
version of what I measured on a real Next.js app: four changes, in order of
payoff, with what each one actually bought.

## The starting line

A dashboard app: 14k lines of TypeScript, 22 routes, cold start around
2.1 seconds. Lighthouse was polite about it. Users were not.

## 1. Delete JavaScript before you optimize it

The first win wasn't a trick — it was subtraction. An old analytics snippet,
a date library imported for one function, and three components that were
client-side for no reason. Turning those back into server components moved
the JS payload from 190KB to 61KB gzipped. Nothing clever. Just auditing
what shipped.

## 2. Subset your fonts

`next/font` already self-hosts, but two typefaces with default subsetting
were still 96KB of blocking font data. Latin-only subsetting with
`display: swap` and preload on the two weights actually used above the fold:

```ts
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-grotesk",
});
```

That took 40KB out of the critical path and killed the text flash. Fonts
are the most boring 100ms on any site and almost nobody configures them.

## 3. Stream the slow part

The page waited on a stats query that took 300ms before it could render
anything. Suspense let the shell arrive immediately and the numbers pop in:

```tsx
<Suspense fallback={<StatsSkeleton />}>
  <StatsPanel range="30d" />
</Suspense>
```

Total page time didn't change — time-to-first-byte dropped from 320ms to
60ms. Perceived speed is a different metric and it matters more.

## 4. Cache like you mean it

Static generation where the content allows it, and honest cache headers
where it doesn't. One data route was dynamic on every request because of a
`Date.now()` deep in a helper. Making it revalidate on a 60-second window
turned p95 for that route from 400ms to 12ms.

## What didn't matter

Image optimization (already fine), edge deployment (nice, not the
bottleneck), and micro-tuning bundle splitting (diminishing returns after
the first pass). The boring stuff — fewer bytes, earlier bytes, fewer
requests — did 90% of the work.

Cold start now lands between 140ms and 190ms. The club isn't exclusive;
it mostly requires deleting things.
