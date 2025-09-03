import { NextResponse } from "next/server";
import { whmcs } from "../../../lib/whmcsClient";

export async function GET() {
  const r = await whmcs<any>("GetSupportDepartments");
  return NextResponse.json(r);
}
