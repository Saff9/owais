---
title: "Strict mode is a documentation strategy"
description: "Why `strict: true` saves more onboarding hours than any wiki page — with the three compiler errors that teach the most."
date: 2025-01-22
tags: [typescript]
---

Every team I've joined had a documentation problem. Every team also had
TypeScript with strict mode half-off. These facts are related.

Docs drift. The compiler doesn't. A strict type system is a set of claims
about your codebase that gets re-verified on every save, for free, forever.
That's the best documentation deal in software.

## The three errors that teach

Turning on strict mode on a legacy codebase produces errors that read like
code review comments, if code review were instant and never tired.

**`noImplicitAny`** — every flagged parameter is a function whose contract
nobody wrote down. The fix forces you to say what the function actually
accepts:

```ts
// before: silently accepts anything
function formatPrice(amount) {

// after: the contract is now load-bearing
function formatPrice(amount: number, currency: string = "USD") {
```

**`strictNullChecks`** — this one finds the "it works on my machine" bugs.
If a value can be `null`, the type says so, and you handle it where it
happens instead of six stack frames later.

```ts
const user = await findUser(id);
user.name; // error: 'user' is possibly null — good, now I think about it
user?.name ?? "guest"; // fine
```

**`excess property checks`** on API responses — typos in field names stop
compiling. The number of `user.usernmae` bugs this catches is honestly
depressing.

## Types you can read in a codebase you've never seen

The real payoff isn't bug prevention — it's onboarding. I joined a project
where the domain types were strict and precise, and I was shipping
meaningful PRs on day two without reading any docs. The types *were* the
docs: entity relationships, which fields are optional, what states a record
can be in.

The trick is keeping types honest. A field typed `string` that actually
holds `"pending" | "paid" | "failed"` is a documentation bug with extra
steps. When I see that, I fix the type first and the compiler maps the
blast radius for me.

## The maintenance argument

Docs rot because updating them is optional. The compiler makes updating
mandatory — you literally cannot merge code that contradicts the types. No
wiki, no Confluence, no "docs review board" achieves that enforcement
level.

Start new projects with `strict: true` and never look back. For old
projects, turn it on and let the error list be your backlog — it's the
most honest backlog you'll ever get.
