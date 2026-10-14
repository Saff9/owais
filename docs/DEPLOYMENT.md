# Deployment

How this codebase deploys to Vercel, how serverless execution boundaries
behave, and how contact form messages land on your phone via Telegram.

Companion documents: `README.md` (editing workflow) and `docs/ARCHITECTURE.md`
(codebase anatomy).

---

## 1. Deploying to Vercel

Push the repo to GitHub and import it into Vercel. `vercel.json` in the root
handles build commands and route hygiene:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "nextjs",
  "buildCommand": "prisma generate && next build",
  "installCommand": "npm install",
  "cleanUrls": true,
  "trailingSlash": false
}
```

- `prisma generate` creates the Prisma client in `node_modules` before Next.js builds.
- `next build` prerenders 27 static routes (SSG). They cost nothing to run and serve from Vercel's global CDN.
- `/api/contact` is the only serverless lambda function.

---

## 2. The contact route in production

The repo ships with SQLite (`db/custom.db`) so local development needs zero setup.
On Vercel, serverless lambdas run with a read-only filesystem (`/var/task`).
SQLite writes throw `SQLITE_READONLY` or fail because the file isn't persisted across cold starts.

Instead of paying for a database server just for a 3-field contact form,
`src/app/api/contact/route.ts` forwards messages straight to Telegram:

1. **Telegram**: If `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` are present, it POSTs an HTML message to `api.telegram.org/bot<token>/sendMessage`.
2. **Webhooks**: If `DISCORD_WEBHOOK_URL` or `SLACK_WEBHOOK_URL` is set, it posts an embed to your channel.
3. **SQLite**: Attempts local DB write. Works locally on your machine; skips on Vercel.
4. **Fallback**: If both Telegram and SQLite fail, the route returns HTTP 503 instead of pretending it saved. The form catches the 503 and opens your visitor's default email client with a pre-filled `mailto:` draft so you never lose an inquiry.

---

## 3. Telegram bot setup

Two env vars, no extra libraries:

1. In Telegram, talk to `@BotFather` → `/newbot` → name it. It gives you a token:
   ```text
   123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ
   ```
2. Send `/start` to your new bot once so it can message you.
3. Talk to `@userinfobot` to get your numeric user ID (e.g. `987654321`).
4. Set both in your environment:
   - Locally: add to `.env`
   - Production: add in **Vercel Project Settings → Environment Variables**

```env
TELEGRAM_BOT_TOKEN="123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ"
TELEGRAM_CHAT_ID="987654321"
```

---

## 4. Environment variables

| Variable | Target | Required | Purpose |
| --- | --- | :---: | --- |
| `TELEGRAM_BOT_TOKEN` | Vercel + `.env` | Yes | Token from `@BotFather` for contact form pings. |
| `TELEGRAM_CHAT_ID` | Vercel + `.env` | Yes | Numeric chat ID from `@userinfobot`. |
| `NEXT_PUBLIC_SITE_URL` | Vercel + `.env` | No | Overrides canonical domain (falls back to `VERCEL_PROJECT_PRODUCTION_URL` or `owais.dev`). |
| `DATABASE_URL` | `.env` | Local only | `file:../db/custom.db` for local SQLite. |
| `DISCORD_WEBHOOK_URL` | Vercel | No | Optional Discord channel webhook for message mirroring. |
| `SLACK_WEBHOOK_URL` | Vercel | No | Optional Slack channel webhook. |

---

## 5. Quality gates before deploy

```bash
bunx tsc --noEmit     # or: npx tsc --noEmit (strict typecheck)
bun run lint          # or: npm run lint
bun run build         # or: npm run build
```
