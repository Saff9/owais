import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { person } from "@/content";
import { rateLimited, clientIp } from "../_lib/rate-limit";
import { sanitizeText, firstIssueMessage, jsonError } from "../_lib/http";

const contactSchema = z.strictObject({
  name: z
    .string()
    .trim()
    .min(2, "Please share your name (2+ characters).")
    .max(100, "Name must be under 100 characters."),
  email: z
    .string()
    .trim()
    .email("That email doesn't look right.")
    .max(150, "Email is too long."),
  message: z
    .string()
    .trim()
    .min(10, "Give me at least 10 characters — context helps.")
    .max(2000, "Please keep it under 2000 characters."),
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function dispatchTelegramNotification(
  name: string,
  email: string,
  message: string
): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID || process.env.TELEGRAM_CHATID;

  if (!token || !chatId) return false;

  try {
    const text = [
      `📬 <b>New Message from Portfolio</b>`,
      ``,
      `<b>Name:</b> ${escapeHtml(name)}`,
      `<b>Email:</b> ${escapeHtml(email)}`,
      ``,
      `<b>Message:</b>`,
      escapeHtml(message),
    ].join("\n");

    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
      }),
    });
    return res.ok;
  } catch (err) {
    console.error("[api/contact] Telegram dispatch error:", err);
    return false;
  }
}

async function dispatchWebhookNotification(
  name: string,
  email: string,
  message: string
): Promise<boolean> {
  const webhookUrl =
    process.env.DISCORD_WEBHOOK_URL ||
    process.env.CONTACT_WEBHOOK_URL ||
    process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) return false;

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        content: `📬 **New Portfolio Message from ${name}** (${email}):\n${message}`,
        embeds: [
          {
            title: `Contact Form: ${name}`,
            color: 0xf5b638,
            fields: [
              { name: "Sender", value: name, inline: true },
              { name: "Email", value: email, inline: true },
              { name: "Message", value: message.slice(0, 1024) },
            ],
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });
    return res.ok;
  } catch (err) {
    console.error("[api/contact] Webhook dispatch error:", err);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    if (rateLimited(clientIp(request))) {
      return jsonError(
        "You've sent quite a few already — try again in an hour.",
        429
      );
    }

    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.includes("json")) {
      return jsonError("Invalid request body.", 400);
    }

    const body: unknown = await request.json().catch(() => null);
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return jsonError("Invalid request body.", 400);
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(firstIssueMessage(parsed.error.issues), 400);
    }

    const { name, email, message } = parsed.data;
    const cleanName = sanitizeText(name, 100);
    const cleanEmail = sanitizeText(email, 150);
    const cleanMessage = sanitizeText(message, 2000);

    let messageId = "msg-" + Date.now();
    let delivered = false;

    // 1. Try Telegram bot notification
    if (await dispatchTelegramNotification(cleanName, cleanEmail, cleanMessage)) {
      delivered = true;
    }

    // 2. Try webhook dispatch (e.g. Discord, Slack, or generic webhook on Vercel)
    if (await dispatchWebhookNotification(cleanName, cleanEmail, cleanMessage)) {
      delivered = true;
    }

    // 3. Try local database (if available and writable)
    try {
      const row = await db.contactMessage.create({
        data: {
          name: cleanName,
          email: cleanEmail,
          message: cleanMessage,
        },
        select: { id: true },
      });
      messageId = row.id;
      delivered = true;
    } catch (dbErr) {
      console.warn("[api/contact] DB write skipped (read-only / serverless filesystem):", dbErr);
    }

    // 3. If storage and delivery both failed, do not deceive the user with false success
    if (!delivered) {
      return jsonError(
        `Automated storage is unavailable. Please reach out directly to ${person.email}.`,
        503
      );
    }

    return NextResponse.json(
      { ok: true, id: messageId },
      { headers: { "cache-control": "no-store" } }
    );
  } catch (err) {
    console.error("[api/contact] unhandled:", err);
    return jsonError("Something broke on my side — try email instead?", 500);
  }
}
