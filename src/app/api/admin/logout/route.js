import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, sessionCookieOptions } from "@/lib/adminSession";

export const runtime = "nodejs";

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(ADMIN_COOKIE_NAME, "", { ...sessionCookieOptions, maxAge: 0 });
  return res;
}
