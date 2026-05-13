import { NextRequest, NextResponse } from "next/server";
import { jsonError, whmcs } from "../../lib/whmcsClient";
import { getSessionFromRequest } from "../../lib/session";
import { rateLimit } from "../../lib/rateLimit";

function getIp(req: NextRequest): string {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0]!.trim();
  const xr = req.headers.get("x-real-ip");
  return xr || "0.0.0.0";
}

export async function GET(req: NextRequest) {
  const s = getSessionFromRequest();
  if (!s) return jsonError("Not authenticated", 401);

  try {
    const r = await whmcs<any>("GetOrders", { clientid: s.clientId, limitnum: 50 });
    const orders = r?.orders?.order ? (Array.isArray(r.orders.order) ? r.orders.order : [r.orders.order]) : [];
    return NextResponse.json({ orders });
  } catch (err: any) {
    return jsonError("Failed to load orders", 500);
  }
}

export async function POST(req: NextRequest) {
  const s = getSessionFromRequest();
  if (!s) return jsonError("Not authenticated", 401);

  const ip = getIp(req);
  const rl = rateLimit(`order:${s.clientId}:${ip}`, 10, 10 * 60 * 1000);
  if (!rl.ok) return jsonError("Too many orders. Try again later.", 429);

  const { pid, billingcycle, promocode } = await req.json();
  if (!pid || !billingcycle) {
    return jsonError("pid and billingcycle are required", 400);
  }

  try {
    const r = await whmcs<any>("AddOrder", {
      clientid: s.clientId,
      pid: String(pid), // comma-separated for multiples
      billingcycle: String(billingcycle),
      paymentmethod: "banktransfer",
      promo: promocode || undefined,
      noemail: true,
    });

    return NextResponse.json({
      orderId: Number(r.orderid),
      invoiceId: Number(r.invoiceid),
      status: r.status,
      total: r.amount ?? r.total ?? null,
    });
  } catch (err: any) {
    return jsonError("Order creation failed", 400);
  }
}
