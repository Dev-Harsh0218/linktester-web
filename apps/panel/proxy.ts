// Next.js 16 renamed middleware -> proxy. Same runtime, new file convention.
// Guards every panel route: if the auth cookie is missing, bounce to /signin.
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE } from "@/lib/config";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow-list: signin flow itself, plus Next internals + static assets.
  if (
    pathname.startsWith("/signin") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  const isSignedIn = request.cookies.get(AUTH_COOKIE)?.value === "true";
  if (!isSignedIn) {
    const url = request.nextUrl.clone();
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  // Match all paths except Next.js static output/image optimization and public files.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
