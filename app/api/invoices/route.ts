import { NextRequest, NextResponse } from "next/server";
import { whmcs, jsonError } from "../../lib/whmcsClient";
import { getSessionFromRequest } from "../../lib/session";

const DEFAULT_PAGE_SIZE = 25;
const MAX_PAGE_SIZE = 100;

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest();
  if (!session) return jsonError("Not authenticated", 401);

  const url = new URL(req.url);
  const status = url.searchParams.get("status") || undefined;
  const parsedPage = Number(url.searchParams.get("page"));
  const parsedPageSize = Number(url.searchParams.get("pageSize"));
  const page = Math.max(1, parsedPage || 1);
  const pageSize = Math.min(MAX_PAGE_SIZE, Math.max(1, parsedPageSize || DEFAULT_PAGE_SIZE));
  const limitstart = (page - 1) * pageSize;

  const response = await whmcs<any>("GetInvoices", {
    userid: session.clientId,
    status,
    limitstart,
    limitnum: pageSize,
  });

  return NextResponse.json(response);
}
