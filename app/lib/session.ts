/*
  app/lib/session.ts
  HMAC-signed session cookie utilities for Next.js route handlers
*/

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import crypto from "crypto";

export type Session = { clientId: number; email: string };

const COOKIE_NAME = "qp_sess";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function requiredEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

function b64url(input: Buffer | string): string {
  const b = Buffer.isBuffer(input) ? input : Buffer.from(input);
  return b
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function fromB64url(input: string): Buffer {
  input = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = input.length % 4;
  if (pad) input += "=".repeat(4 - pad);
  return Buffer.from(input, "base64");
}

function hmac(data: string, secret: string): string {
  return b64url(crypto.createHmac("sha256", secret).update(data).digest());
}

export function signSession(session: Session): string {
  const secret = requiredEnv("APP_SESSION_SECRET");
  const payload = b64url(Buffer.from(JSON.stringify(session)));
  const sig = hmac(payload, secret);
  return `${payload}.${sig}`;
}

export function verifySession(token: string | undefined | null): Session | null {
  if (!token) return null;
  const secret = requiredEnv("APP_SESSION_SECRET");
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = hmac(payload, secret);
  // Constant-time compare
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const json = JSON.parse(fromB64url(payload).toString("utf8"));
    if (!json?.clientId || !json?.email) return null;
    return { clientId: Number(json.clientId), email: String(json.email) };
  } catch {
    return null;
  }
}

export function setSessionOnResponse(res: NextResponse, session: Session) {
  const token = signSession(session);
  res.cookies.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
}

export function clearSessionOnResponse(res: NextResponse) {
  res.cookies.set({ name: COOKIE_NAME, value: "", maxAge: 0, path: "/" });
}

export function getSessionFromRequest(): Session | null {
  const token = cookies().get(COOKIE_NAME)?.value;
  return verifySession(token);
}

export function requireSession(): Session {
  const s = getSessionFromRequest();
  if (!s) throw new Error("Not authenticated");
  return s;
}
