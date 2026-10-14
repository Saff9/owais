/** Shared in-memory rate limiter — 10 requests per IP per window, per bucket. */
const hits = new Map<string, { count: number; reset: number }>();

export function rateLimited(
  key: string,
  limit = 10,
  windowMs = 60 * 60 * 1000
): boolean {
  const now = Date.now();

  // Prune expired entries to prevent memory leaks
  if (hits.size > 500) {
    for (const [k, v] of hits.entries()) {
      if (v.reset < now) {
        hits.delete(k);
      }
    }
  }

  const h = hits.get(key);
  if (!h || h.reset < now) {
    hits.set(key, { count: 1, reset: now + windowMs });
    return false;
  }
  h.count += 1;
  return h.count > limit;
}

export function clientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local"
  );
}
