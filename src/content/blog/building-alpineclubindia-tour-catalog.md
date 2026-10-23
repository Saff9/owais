---
title: "Building Alpine Club India: How I Designed a Fast Tour Catalog"
description: "Lessons learned building a mountain expedition platform with Next.js App Router, image optimization, and responsive filters."
date: 2026-06-18
tags: [nextjs, react, tailwind, web-performance]
---

Over the past few months, I've been designing and engineering **[alpineclubindia.com](https://alpineclubindia.com)** — a platform dedicated to Himalayan expeditions, trekking packages, and mountain adventures across India and Kashmir.

Most travel platforms suffer from the same frustrating problem: they are weighed down by heavy carousels, uncompressed stock photography, and complex booking funnels that grind to a halt on weak mobile networks. 

When your users are looking at trek itineraries while traveling or preparing in mountain towns, 3G and 4G connections are common. Here is how I approached building a travel catalog that loads fast and feels effortless.

## 1. Zero-Jank Image Pipelines

High-altitude photography is what sells an expedition. But serving 4MB raw camera files turns mobile browsers into slide-shows.

In Next.js, I set up automatic AVIF and WebP conversion with strictly defined `sizes` attributes:

```tsx
<Image
  src={expedition.heroImage}
  alt={expedition.title}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  placeholder="blur"
  blurDataURL={expedition.blurHash}
  className="object-cover transition-transform duration-300 group-hover:scale-105"
/>
```

By generating low-resolution blur placeholders during the build, the layout never shifts (0 Cumulative Layout Shift), and the total page payload stays under 350KB.

## 2. Server Components for Catalog Filters

Instead of pulling all tours into client state and making the phone parse thousands of lines of JSON, the search and difficulty filtering are handled through Next.js Server Components and URL query parameters:

- Users can filter by **Difficulty** (Beginner, Moderate, Alpine), **Duration** (days), and **Region**.
- Every filter change updates the URL (`/tours?difficulty=moderate&altitude=4000m`), making every filtered view bookmarkable and shareable.
- The client receives pre-rendered, lightweight HTML chunks with instant transitions.

## 3. Clear Itinerary & Altitude Breakdown

Trek difficulty isn't just a label — people need to know daily elevation gain and gear requirements. 

I designed visual day-by-day milestone accordions that display:
- Starting altitude vs. campsite altitude.
- Walking distance in kilometers and expected hours.
- Mandatory equipment check indicators.

## What's Next

The next step is polishing the booking inquiry engine so guests can lock in customized private treks directly with local guides. Building something that connects travelers with real mountain guides has been one of the most rewarding projects I've tackled.
