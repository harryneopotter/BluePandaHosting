import { NextRequest, NextResponse } from "next/server";
import { whmcs, jsonError } from "../../lib/whmcsClient";
import { getSessionFromRequest } from "../../lib/session";

export async function GET(req: NextRequest) {
  const s = getSessionFromRequest();
  if (!s) return jsonError("Not authenticated", 401);

  const url = new URL(req.url);
  const status = url.searchParams.get("status") || undefined;
  const page = Number(url.searchParams.get("page") || 1);
  const pageSize = Number(url.searchParams.get("pageSize") || 25);
  const limitstart = (page - 1) * pageSize;

  const r = await whmcs<any>("GetInvoices", {
    userid: s.clientId,
    status,
    limitstart,
    limitnum: pageSize,
  });

  return NextResponse.json(r);
}
