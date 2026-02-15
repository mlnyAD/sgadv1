

// src/app/api/client/select/route.ts

import { NextResponse } from "next/server";
import { requireOperateur } from "@/lib/auth/require-operateur";
import { listClientsForCurrentOperateur } from "@/features/session/current-operateur-client-action";

const COOKIE_NAME = "current_clt_id";

export async function POST(request: Request) {
  await requireOperateur();

  const { cltId } = (await request.json()) as { cltId?: string };
  if (!cltId) {
    return NextResponse.json({ error: "cltId manquant" }, { status: 400 });
  }

  const allowed = await listClientsForCurrentOperateur();
  if (!allowed.some((x) => x.clt_id === cltId)) {
    return NextResponse.json({ error: "Client non autorisé" }, { status: 403 });
  }

  const res = NextResponse.json({ ok: true });

  res.cookies.set(COOKIE_NAME, cltId, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return res;
}