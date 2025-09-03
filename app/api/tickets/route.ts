import { NextRequest, NextResponse } from "next/server";
import { whmcs, jsonError } from "../../lib/whmcsClient";
import { getSessionFromRequest } from "../../lib/session";
import { rateLimit } from "../../lib/rateLimit";

export async function GET(req: NextRequest) {
  const s = getSessionFromRequest();
  if (!s) return jsonError("Not authenticated", 401);
  const url = new URL(req.url);
  const status = url.searchParams.get("status") || undefined;
  const r = await whmcs<any>("GetTickets", { clientid: s.clientId, status });
  return NextResponse.json(r);
}

export async function POST(req: NextRequest) {
  const s = getSessionFromRequest();
  if (!s) return jsonError("Not authenticated", 401);
  const rl = rateLimit(`ticket:create:${s.clientId}`, 20, 60 * 60 * 1000);
  if (!rl.ok) return jsonError("Too many requests. Try again later.", 429);

  const { deptid, subject, message, priority } = await req.json();
  if (!deptid || !subject || !message) {
    return jsonError("deptid, subject and message are required", 400);
  }
  const r = await whmcs<any>("OpenTicket", {
    clientid: s.clientId,
    deptid,
    subject,
    message,
    priority: priority || "Medium",
  });
  return NextResponse.json({ ticketId: Number(r.ticketid) });
}
