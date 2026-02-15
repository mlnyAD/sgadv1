

// src/app/api/client/route.ts
import { NextResponse } from "next/server";
import { requireOperateur } from "@/lib/auth/require-operateur";
import { getCurrentClient } from "@/domain/session/current-client";

export async function GET() {
  
  await requireOperateur();

  const cur = await getCurrentClient();

  return NextResponse.json({
    id: cur.current?.cltId ?? null,
    nom: cur.current?.cltNom ?? null,
    multi: cur.multi,
  });
}