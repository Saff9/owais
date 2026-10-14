import { NextResponse } from "next/server";
import type { ZodIssueLike } from "./types";

/** Strip angle brackets + control chars so stored strings are inert. */
export function sanitizeText(value: string, max = 500): string {
  return value
    .replace(/[<>]/g, "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .trim()
    .slice(0, max);
}

/** Turn a zod issue into one clean, user-facing sentence. */
export function firstIssueMessage(issues: ZodIssueLike[]): string {
  const first = issues[0];
  if (!first) return "Invalid request body.";
  if (first.code === "unrecognized_keys") return "Invalid request body.";
  return first.message || "Invalid request body.";
}

/** Uniform {ok:false,error} JSON with no-store caching. */
export function jsonError(error: string, status: number) {
  return NextResponse.json(
    { ok: false, error },
    { status, headers: { "cache-control": "no-store" } }
  );
}
