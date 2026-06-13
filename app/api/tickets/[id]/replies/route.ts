import { NextRequest, NextResponse } from "next/server";
import { whmcs, jsonError } from "../../../../lib/whmcsClient";
import { getSessionFromRequest } from "../../../../lib/session";
import { rateLimit } from "../../../../lib/rateLimit";

function getTicketOwnerId(ticket: any): number {
  return Number(ticket.clientid ?? ticket.userid ?? ticket.c ?? ticket.user_id);
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = getSessionFromRequest();
  if (!session) return jsonError("Not authenticated", 401);

  const rl = rateLimit(`ticket:reply:${session.clientId}`, 40, 60 * 60 * 1000);
  if (!rl.ok) return jsonError("Too many requests. Try again later.", 429);

  try {
    const ticket = await whmcs<any>("GetTicket", { ticketid: params.id });
    if (getTicketOwnerId(ticket) !== session.clientId) return jsonError("Not found", 404);

    const { message } = await req.json();
    const trimmedMessage = message?.toString().trim();
    if (!trimmedMessage) return jsonError("message is required", 400);

    const response = await whmcs<any>("AddTicketReply", {
      ticketid: params.id,
      message: trimmedMessage,
      clientid: session.clientId,
    });

    return NextResponse.json({
      ok: true,
      replyId: Number(response.replyid || 0),
    });
  } catch (err: any) {
    return jsonError("Failed to send reply", 500);
  }
}
