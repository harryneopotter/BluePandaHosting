import { NextRequest, NextResponse } from "next/server";
import { whmcs, jsonError } from "../../../../lib/whmcsClient";
import { getSessionFromRequest } from "../../../../lib/session";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const session = getSessionFromRequest();
  if (!session) return jsonError("Not authenticated", 401);

  const invoice = await whmcs<any>("GetInvoice", { invoiceid: params.id });
  const ownerId = Number(invoice.userid ?? invoice.clientid ?? invoice.user_id);
  if (ownerId !== session.clientId) return jsonError("Not found", 404);

  const destination = `clientarea.php?action=invoices&id=${params.id}&pdf=true`;
  const sso = await whmcs<any>("CreateSsoToken", {
    client_id: session.clientId,
    destination,
  });
  const url = sso.redirect_url || sso.redirectUrl || sso.url;
  if (!url) return jsonError("SSO failed", 500);

  return NextResponse.redirect(url, { status: 302 });
}
