import { NextRequest, NextResponse } from "next/server";
import { whmcs, jsonError } from "../../../../lib/whmcsClient";
import { getSessionFromRequest } from "../../../../lib/session";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const s = getSessionFromRequest();
  if (!s) return jsonError("Not authenticated", 401);

  const inv = await whmcs<any>("GetInvoice", { invoiceid: params.id });
  const ownerId = Number(inv.userid ?? inv.clientid ?? inv.user_id);
  if (ownerId !== s.clientId) return jsonError("Not found", 404);

  const destination = `clientarea:/viewinvoice.php?id=${params.id}&action=download`;
  const sso = await whmcs<any>("CreateSsoToken", { client_id: s.clientId, destination });
  const url = sso.redirect_url || sso.redirectUrl || sso.url;
  if (!url) return jsonError("SSO failed", 500);
  return NextResponse.redirect(url, { status: 302 });
}
