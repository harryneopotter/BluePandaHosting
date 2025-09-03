import { NextRequest, NextResponse } from "next/server";
import { whmcs, jsonError } from "../../../../lib/whmcsClient";
import { getSessionFromRequest } from "../../../../lib/session";
import { rateLimit } from "../../../../lib/rateLimit";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const s = getSessionFromRequest();
  if (!s) return jsonError("Not authenticated", 401);
  const rl = rateLimit(`ticket:reply:${s.clientId}`, 40, 60 * 60 * 1000);
  if (!rl.ok) return jsonError("Too many requests. Try again later.", 429);

  const t = await whmcs<any>("GetTicket", { ticketid: params.id });
  if (Number(t.clientid) !== s.clientId) return jsonError("Not found", 404);

  const { message } = await req.json();
  if (!message) return jsonError("message is required", 400);

  const r = await whmcs<any>("AddTicketReply", { ticketid: params.id, message });
  return NextResponse.json({ ok: true, replyId: Number(r.replyid || 0) });
}
