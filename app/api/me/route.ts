import { NextResponse } from "next/server";
import { whmcs, jsonError } from "../../lib/whmcsClient";
import { getSessionFromRequest } from "../../lib/session";

export async function GET() {
  const session = getSessionFromRequest();
  if (!session) return jsonError("Not authenticated", 401);

  try {
    const details = await whmcs<any>("GetClientsDetails", {
      clientid: session.clientId,
      stats: false,
    });

    return NextResponse.json({
      clientId: session.clientId,
      email: session.email,
      details,
    });
  } catch (err: any) {
    return jsonError("Failed to load profile", 500);
  }
}
