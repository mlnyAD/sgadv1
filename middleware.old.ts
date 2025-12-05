// middleware.ts
import { NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const pathname = req.nextUrl.pathname;

  // Pages publiques
  const publicRoutes = [
    "/login",
    "/(auth)/login",
    "/logout",
    "/(auth)/logout",
  ];

  // 1) Si route publique → autorisée
  if (publicRoutes.some((p) => pathname.startsWith(p))) {
    if (session && pathname.startsWith("/login")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return res;
  }

  // 2) Si pas de session → redirection vers /login
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
