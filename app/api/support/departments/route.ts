import { NextResponse } from "next/server";
import { whmcs, jsonError } from "../../../lib/whmcsClient";
import { getSessionFromRequest } from "../../../lib/session";

export async function GET() {
  const session = getSessionFromRequest();
  if (!session) return jsonError("Not authenticated", 401);

  try {
    const response = await whmcs<any>("GetSupportDepartments");
    return NextResponse.json(response);
  } catch (err: any) {
    return jsonError("Failed to load departments", 500);
  }
}
