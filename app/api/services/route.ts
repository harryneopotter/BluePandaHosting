import { NextRequest, NextResponse } from "next/server";
import { jsonError, whmcs } from "../../lib/whmcsClient";
import { getSessionFromRequest } from "../../lib/session";

export async function GET(req: NextRequest) {
  const s = getSessionFromRequest();
  if (!s) return jsonError("Not authenticated", 401);

  try {
    const r = await whmcs<any>("GetClientsProducts", {
      clientid: s.clientId,
      stats: false,
    });

    const raw = r?.products?.product;
    const products = raw
      ? Array.isArray(raw)
        ? raw
        : [raw]
      : [];

    return NextResponse.json({ products });
  } catch (err: any) {
    return jsonError("Failed to load services", 500);
  }
}
