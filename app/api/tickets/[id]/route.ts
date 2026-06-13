import { NextRequest, NextResponse } from "next/server";
import { whmcs, jsonError } from "../../../lib/whmcsClient";
import { getSessionFromRequest } from "../../../lib/session";

function getTicketOwnerId(ticket: any): number {
  return Number(ticket.clientid ?? ticket.userid ?? ticket.c ?? ticket.user_id);
}

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const session = getSessionFromRequest();
  if (!session) return jsonError("Not authenticated", 401);

  try {
    const ticket = await whmcs<any>("GetTicket", { ticketid: params.id });
    if (getTicketOwnerId(ticket) !== session.clientId) return jsonError("Not found", 404);

    return NextResponse.json(ticket);
  } catch (err: any) {
    return jsonError("Failed to load ticket", 500);
  }
}
