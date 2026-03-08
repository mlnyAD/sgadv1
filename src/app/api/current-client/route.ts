

import { NextResponse } from "next/server";
import { getCurrentClient } from "@/domain/session/current-client";
import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";

const LOGO_BUCKET = "client-logos";

export async function GET() {
  try {
    const { current } = await getCurrentClient({
      requireSelected: false,
    });

    if (!current) {
      return NextResponse.json({
        current: null,
      });
    }

    let logoUrl: string | null = null;

    if (current.cltLogoPath) {
      const supabase = await createSupabaseServerReadClient();
      const { data } = supabase.storage
        .from(LOGO_BUCKET)
        .getPublicUrl(current.cltLogoPath);

      logoUrl = data.publicUrl;
    }

    return NextResponse.json({
      current: {
        cltId: current.cltId,
        cltNom: current.cltNom,
        cltLogoPath: current.cltLogoPath ?? null,
        cltLogoUrl: logoUrl,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erreur inattendue";

    return NextResponse.json(
      {
        error: "CURRENT_CLIENT_ERROR",
        message,
      },
      { status: 500 },
    );
  }
}