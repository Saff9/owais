---
title: "Trunk-based development for a team of two"
description: "You don't need GitHub-scale process. Here's the lightest git workflow that still prevents mess — stacked diffs and all."
date: 2024-12-05
tags: [workflow, git]
---

Most git workflow advice assumes a team of twenty. When you're two people
shipping a product, that process becomes costume — standups about branches,
release branches nobody reads, merge rituals for changes that would take
five minutes to review as a diff.

Here's the lightest workflow that still keeps you out of trouble.

## One branch, small commits

`main` is the only long-lived branch. It deploys on every merge. Every
commit on it should be small enough that you'd be comfortable reverting it
by hash. If a change can't be split into safe commits, that's usually
information about the change, not the workflow.

## Feature branches live for hours, not weeks

Branch, commit, open the PR, get it reviewed same-day. The rule of thumb:
if a branch is old enough that you've forgotten the context, it's too old.
Long-lived branches don't just cause merge pain — they hide decisions. A
two-week-old PR contains a hundred invisible judgement calls your reviewer
now has to reverse-engineer from the diff.

## Stacked diffs when work is serial

Sometimes feature B genuinely depends on feature A, and A is still in
review. Stacked branches solve this without waiting:

```bash
git checkout -b feature-a main
# ... commits ...
git checkout -b feature-b feature-a
# ... commits ...
```

Review A first; merge it, then rebase B on `main` and the stack flattens.
The reviewer always sees small diffs; you never stop moving.

## Protect the trunk with CI, not opinions

The branch protection that actually matters: green checks required,
one approval, no direct pushes. That's it. Everything else — CODEOWNERS
files, mandatory multiple approvers, release choreographies — is overhead
for scale you don't have yet.

## The honest tradeoff

The cost of trunk-based development is discipline: you commit smaller,
you review faster, you keep the tree releasable. The benefit is that
"deploy" stops being an event and becomes a non-event. For a small team
trying to find product-market fit, I'll take that trade every time.
