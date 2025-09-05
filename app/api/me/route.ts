import { NextResponse } from "next/server";
import { whmcs, jsonError } from "../../lib/whmcsClient";
import { getSessionFromRequest } from "../../lib/session";

export async function GET() {
  const s = getSessionFromRequest();
  if (!s) return jsonError("Not authenticated", 401);
  const details = await whmcs<any>("GetClientsDetails", { clientid: s.clientId, stats: false });
  return NextResponse.json({ clientId: s.clientId, details });
}
