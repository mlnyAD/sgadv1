

// src/app/api/client/route.ts
import { NextResponse } from "next/server";
import { getCurrentClient } from "@/domain/session/current-client";

export async function GET() {
  try {
    const { current, multi } = await getCurrentClient();

    // Ici, "current === null" peut vouloir dire:
    // - non authentifié (allowed vide)
    // - ou cookie absent mais allowed non vide (si tu n'as pas mis le fallback allowed[0])
    if (!current) {
      return NextResponse.json(
        { error: "Non authentifié ou aucun client disponible" },
        { status: 401, headers: { "Cache-Control": "no-store" } }
      );
    }

    return NextResponse.json(
      { id: current.cltId, nom: current.cltNom, multi },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : "Erreur serveur";
    return NextResponse.json(
      { error: message },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}