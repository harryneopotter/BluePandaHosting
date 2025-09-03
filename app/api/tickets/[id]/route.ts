import { NextRequest, NextResponse } from "next/server";
import { whmcs, jsonError } from "../../../lib/whmcsClient";
import { getSessionFromRequest } from "../../../lib/session";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const s = getSessionFromRequest();
  if (!s) return jsonError("Not authenticated", 401);
  const t = await whmcs<any>("GetTicket", { ticketid: params.id });
  if (Number(t.clientid) !== s.clientId) return jsonError("Not found", 404);
  return NextResponse.json(t);
}
