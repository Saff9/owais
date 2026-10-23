---
title: "Prisma & PostgreSQL: 4 Lessons from Real Client Work"
description: "Practical database modeling habits: indexed queries, avoiding N+1 loops, connection pooling, and safe migrations."
date: 2025-08-05
tags: [prisma, postgresql, database, typescript]
---

Prisma ORM makes relational database access feel natural in TypeScript. You get autocomplete on table fields, compile-time safety, and readable migration scripts.

However, moving from a local tutorial to production traffic taught me a few important lessons about managing PostgreSQL with Prisma.

## 1. Always Index Foreign Keys and Search Columns

Prisma makes relations simple with `@relation`, but it doesn't automatically add database indexes to foreign key columns. If you query orders by `userId`, PostgreSQL will perform a sequential table scan unless you explicitly index it:

```prisma
model Order {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  total     Float
  createdAt DateTime @default(now())

  @@index([userId])
  @@index([createdAt])
}
```

Adding `@@index` on lookup fields drops query times from 200ms down to 3ms when tables grow past a few thousand rows.

## 2. Watch Out for Accidental N+1 Queries

When fetching items with relations, avoid looping through an array and querying inside a `Promise.all`:

```ts
// ❌ Don't do this: triggers N separate database roundtrips
const usersWithOrders = await Promise.all(
  users.map(u => db.order.findMany({ where: { userId: u.id } }))
);

// ✅ Do this: single query with SQL JOIN under the hood
const usersWithOrders = await db.user.findMany({
  include: {
    orders: { select: { id: true, total: true, createdAt: true } },
  },
});
```

Selecting only the columns you actually need (`select`) keeps network payloads small and database cache warm.

## 3. Configure Connection Pooling in Serverless

When deploying Next.js API routes or Server Actions to serverless environments (like Vercel), each function invocation can create a new database connection. Without pooling, you can easily exhaust your PostgreSQL connection limits.

Always use a connection pooler like **PgBouncer** or connection pooling URLs provided by Supabase or Neon (`?pgbouncer=true` or pool mode).

## 4. Never Edit Generated Migration Files by Hand

Let Prisma generate your SQL migrations through `prisma migrate dev --name <description>`. Review the generated SQL file before committing it, and run `prisma migrate deploy` in your production deployment pipeline.
