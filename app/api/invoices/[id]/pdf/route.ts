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
  const urlString = sso.redirect_url || sso.redirectUrl || sso.url;
  if (!urlString) return jsonError("SSO failed", 500);

  // Validate redirect URL against configured WHMCS base
  const whmcsBaseUrl = process.env.WHMCS_BASE_URL;
  if (!whmcsBaseUrl) return jsonError("WHMCS_BASE_URL not configured", 500);

  let redirectUrl: URL;
  try {
    redirectUrl = new URL(urlString);
  } catch {
    return jsonError("Invalid SSO redirect", 400);
  }

  const baseUrl = new URL(whmcsBaseUrl);
  if (redirectUrl.origin !== baseUrl.origin) {
    return jsonError("Invalid SSO redirect", 400);
  }

  if (redirectUrl.protocol !== 'https:') {
    return jsonError("Invalid SSO redirect", 400);
  }

  return NextResponse.redirect(urlString, { status: 302 });
}
