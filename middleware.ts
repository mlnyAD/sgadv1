import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

export const config = {
  matcher: ['/((?!_next|favicon.ico|.*\\..*).*)'],
};

export async function middleware(req: NextRequest) {

 

  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => req.cookies.get(name)?.value,
        set: () => {},
        remove: () => {},
      },
    }
  );

   console.log("MIDDLEWARE RUNNING :", req.nextUrl.pathname);
   
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = req.nextUrl.pathname;

  // 🔥 1. Gestion stricte de la racine
  if (pathname === '/') {
    return NextResponse.redirect(new URL(user ? '/dashboard' : '/login', req.url));
  }

  // 🔥 2. Pages protégées
  if (pathname.startsWith('/dashboard') && !user) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // 🔥 3. Page login quand déjà connecté
  if (pathname === '/login' && user) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return res;
}
