

// src/app/api/client/ensure/route.ts
import { NextResponse } from "next/server";
import { requireOperateur } from "@/lib/auth/require-operateur";
import { listClientsForCurrentOperateur } from "@/features/session/current-operateur-client-action";
import { getCurrentClient } from "@/domain/session/current-client";

const COOKIE_NAME = "current_clt_id";

function safeNext(request: Request) {
  const url = new URL(request.url);
  const next = url.searchParams.get("next") ?? "/dashboard";
  return next.startsWith("/") ? next : "/dashboard";
}

export async function GET(request: Request) {
  await requireOperateur();

  const next = safeNext(request);

  const allowed = await listClientsForCurrentOperateur();
  if (allowed.length === 0) {
    return NextResponse.redirect(new URL("/logout", request.url));
  }

  // cookie valide ?
  const cur = await getCurrentClient();
  if (cur.current) {
    return NextResponse.redirect(new URL(next, request.url));
  }

  // mono-client : auto-select + redirect
  if (allowed.length === 1) {
    const cltId = allowed[0].clt_id;
    if (!cltId) {
      return NextResponse.redirect(new URL("/logout", request.url));
    }

    const res = NextResponse.redirect(new URL(next, request.url));
    res.cookies.set(COOKIE_NAME, cltId, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    return res;
  }
  // multi : selection
  return NextResponse.redirect(
    new URL(`/select-client?next=${encodeURIComponent(next)}`, request.url)
  );
}