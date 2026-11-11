---
title: "What I'm Building: TaskFlow and Bidora"
description: "A look inside the architecture, data models, and workflows of two products I'm currently engineering: TaskFlow (real-time task management) and Bidora (a reverse-bidding freelance marketplace)."
date: 2026-11-11
tags: [nextjs, fastapi, fullstack, postgresql, product-design]
---

Between client work and shipping production web applications, I spend my early mornings and late evenings building independent products. 

Right now, I am actively engineering two new platforms from scratch: **TaskFlow**, a fast, keyboard-first task management system, and **Bidora**, a modern freelance marketplace with a reverse-bidding model.

Here is a look at what each product does, why I decided to build them, and the technical decisions behind their architectures.

---

## 1. TaskFlow: Task Management Without the Bloat

Most modern task management tools (Jira, Monday, ClickUp) have become bloated enterprise suites. They take five seconds to open a card, require twenty clicks to update a status, and feel like interacting with a heavy spreadsheet disguised in colorful CSS.

With **TaskFlow**, my goal is straightforward: build a task and sprint management tool that feels as responsive as a local desktop app.

### Core Features
- **Keyboard-First Navigation**: A universal Command menu (`Cmd+K` / `Ctrl+K`) that lets you create tasks, assign tags, change sprint milestones, and switch boards without ever touching your mouse.
- **Optimistic Kanban Updates**: When dragging a card across columns (e.g. *Todo → In Progress → Review*), the UI updates instantly on the client via local state while persisting the change asynchronously in the background. If the request fails, it rolls back gracefully with a toast notification.
- **Lightweight Sprint Slicing**: Focused daily sprint views that filter out noise and emphasize high-priority blockers.

### The Technical Stack
- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS v4, and shadcn/ui.
- **State Management**: Zustand for lightweight local drag-and-drop state, paired with TanStack Query for cache invalidation.
- **Database & Backend**: PostgreSQL hosted with connection pooling, orchestrated via Prisma ORM with indexed integer ordering (`orderIndex`) for drag-and-drop positioning.

```typescript
// Optimistic card movement pattern in TaskFlow
const moveCard = async (cardId: string, targetColumnId: string, newOrder: number) => {
  // 1. Snapshot previous board state for rollback
  const previousState = get().board;

  // 2. Apply optimistic local update immediately
  set((state) => ({
    board: reorderColumns(state.board, cardId, targetColumnId, newOrder),
  }));

  try {
    // 3. Persist mutation to server
    await api.cards.move({ cardId, targetColumnId, newOrder });
  } catch (error) {
    // 4. Rollback on network or server failure
    set({ board: previousState });
    toast.error("Failed to sync board state. Reverted.");
  }
};
```

---

## 2. Bidora: A Better Way to Match Clients and Freelancers

Freelance platforms like Upwork and Fiverr suffer from severe structural friction:
1. Clients receive 50+ generic, copy-pasted proposals within minutes of posting.
2. High platform commission cuts (up to 20%) push both clients and talent off the platform.
3. Pricing transparency is weak, leading to endless back-and-forth negotiations before scope is even clarified.

**Bidora** flips the workflow with a structured **reverse-bidding** model.

### How Bidora Works
1. **Client Publishes a Clear Project Brief**: The client posts their requirements, technical specifications, deadline, and target budget range.
2. **Freelancers Submit Structured Bids**: Instead of sending long text letters, freelancers submit a structured proposal containing:
   - Their bid amount (fixed-milestone or sprint-based).
   - Expected turnaround time.
   - Exact deliverables and tech stack proposal.
   - Proof of relevant past work.
3. **Client Evaluates Side-by-Side**: The client receives a clean, side-by-side comparison matrix of all incoming bids. They can inspect milestones, compare timelines, review verified credentials, and accept the offer that best matches their expectations.
4. **Milestone Escrow & Handover**: Once accepted, the project proceeds through milestone-gated escrows with automated Git commit verification upon handover.

### The Technical Architecture
Bidora requires high-throughput real-time bidding, instant notifications, and rock-solid relational data integrity for contracts and payments.

- **API & Background Services**: Built with **FastAPI** (Python). FastAPI's asynchronous ASGI architecture handles real-time bid webhooks, email/Telegram notification dispatching, and bidding concurrency effortlessly.
- **Database**: PostgreSQL with strict Row-Level Security (RLS) to ensure freelancers only view authorized project data, and clients only access bids submitted to their own active postings.
- **Schema Validation**: Pydantic v2 schemas validating every incoming proposal against strict budget boundaries before hitting the database.

```python
# Bidora structured bid submission schema
from pydantic import BaseModel, Field
from decimal import Decimal

class ProposalSubmission(BaseModel):
    project_id: str
    bid_amount: Decimal = Field(gt=0, description="Proposed milestone amount in USD")
    estimated_days: int = Field(gt=0, le=90)
    deliverables: list[str] = Field(min_length=1, max_length=10)
    stack_recommendation: list[str]
    proposal_summary: str = Field(min_length=50, max_length=1500)
```

---

## What's Next

Both projects are under active development:

- **TaskFlow** is currently in local staging, where I'm testing keyboard accessibility, offline caching, and responsive mobile layouts.
- **Bidora** is in the core API and database modeling stage, setting up secure escrow workflows and real-time bid notification pipelines.

Building these in public helps sharpen my engineering craft. When you build products from end to end — from database migrations and authentication to micro-interactions and SEO — you become a much better engineer for your client projects.

I'll be posting technical deep-dives into specific challenges (like handling concurrent bids in PostgreSQL and optimistic UI rollbacks in Next.js) as both platforms progress toward beta.

If you're interested in testing an early build of either app, or if you have questions about the architecture, reach out on [Telegram (@Kanferneo)](https://t.me/Kanferneo) or [drop me an email](mailto:saffanakbar942@gmail.com).
