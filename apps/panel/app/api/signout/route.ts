import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_COOKIE, EMAIL_COOKIE } from "@/lib/config";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
  cookieStore.delete(EMAIL_COOKIE);
  return NextResponse.json({ ok: true });
}
