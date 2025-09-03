import { NextRequest, NextResponse } from "next/server";
import { whmcs, jsonError } from "../../../lib/whmcsClient";
import { getSessionFromRequest } from "../../../lib/session";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const s = getSessionFromRequest();
  if (!s) return jsonError("Not authenticated", 401);

  const r = await whmcs<any>("GetInvoice", { invoiceid: params.id });
  const ownerId = Number(r.userid ?? r.clientid ?? r.user_id);
  if (ownerId !== s.clientId) return jsonError("Not found", 404);

  return NextResponse.json(r);
}
