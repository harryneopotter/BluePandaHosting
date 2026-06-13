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
  const parsedPage = parseInt(url.searchParams.get("page") || "", 10);
  const parsedPageSize = parseInt(url.searchParams.get("pageSize") || "", 10);
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const pageSize = Number.isFinite(parsedPageSize) && parsedPageSize > 0
    ? Math.min(MAX_PAGE_SIZE, parsedPageSize)
    : DEFAULT_PAGE_SIZE;
  const limitstart = (page - 1) * pageSize;

  try {
    const response = await whmcs<any>("GetInvoices", {
      userid: session.clientId,
      status,
      limitstart,
      limitnum: pageSize,
    });

    return NextResponse.json(response);
  } catch (err: any) {
    return jsonError("Failed to load invoices", 500);
  }
}
