import { NextRequest, NextResponse } from "next/server";
import { whmcs, jsonError } from "../../../lib/whmcsClient";
import { setSessionOnResponse } from "../../../lib/session";
import { rateLimit } from "../../../lib/rateLimit";

function getIp(req: NextRequest): string {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0]!.trim();
  const xr = req.headers.get("x-real-ip");
  return xr || "0.0.0.0";
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) return jsonError("Missing credentials", 400);

    const ip = getIp(req);
    const rl = rateLimit(`login:${ip}`, 5, 5 * 60 * 1000);
    if (!rl.ok) return jsonError("Too many login attempts. Try again later.", 429);

    await whmcs("ValidateLogin", { email, password });

    const details = await whmcs<any>("GetClientsDetails", { email, stats: false });
    const clientId = Number(details?.client?.id ?? details?.userid ?? details?.client_id);
    if (!clientId) return jsonError("Client not found", 404);

    const res = NextResponse.json({ clientId });
    setSessionOnResponse(res, { clientId, email });
    return res;
  } catch (err: any) {
    // Do not leak WHMCS details; return generic error
    return jsonError("Invalid email or password", 401);
  }
}
