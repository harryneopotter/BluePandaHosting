import { NextRequest, NextResponse } from "next/server";
import { whmcs, jsonError } from "../../../lib/whmcsClient";
import { getSessionFromRequest } from "../../../lib/session";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const session = getSessionFromRequest();
  if (!session) return jsonError("Not authenticated", 401);

  const invoice = await whmcs<any>("GetInvoice", { invoiceid: params.id });
  const ownerId = Number(invoice.userid ?? invoice.clientid ?? invoice.user_id);
  if (ownerId !== session.clientId) return jsonError("Not found", 404);

  return NextResponse.json(invoice);
}
