/*
  app/lib/rateLimit.ts
  Minimal in-memory rate limiter for dev/staging
*/

export type LimitResult = { ok: boolean; remaining: number; resetAt: number };

type Entry = { count: number; resetAt: number };

declare global {
  // eslint-disable-next-line no-var
  var __qp_rate_limit_store: Map<string, Entry> | undefined;
}

const store: Map<string, Entry> = (globalThis.__qp_rate_limit_store ||= new Map());

export function rateLimit(key: string, limit: number, windowMs: number): LimitResult {
  const now = Date.now();
  const entry = store.get(key);
  if (!entry || entry.resetAt <= now) {
    const resetAt = now + windowMs;
    store.set(key, { count: 1, resetAt });
    return { ok: true, remaining: limit - 1, resetAt };
    }
  if (entry.count < limit) {
    entry.count += 1;
    return { ok: true, remaining: limit - entry.count, resetAt: entry.resetAt };
  }
  return { ok: false, remaining: 0, resetAt: entry.resetAt };
}
