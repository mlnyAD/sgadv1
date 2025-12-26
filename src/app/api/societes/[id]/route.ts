
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/* ============================================================================
   GET /api/societes/[id]
   ============================================================================ */
export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const numericId = Number(id);

  if (Number.isNaN(numericId)) {
    return NextResponse.json(
      { error: "Invalid societe id" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("vw_societe_view")
    .select("*")
    .eq("societe_id", numericId)
    .maybeSingle();

  if (error) {
    console.error("GET /api/societes/[id]", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  if (!data) {
    return NextResponse.json(
      { error: "Societe not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(data);
}



/* ============================================================================
   PUT /api/societes/[id]
   ============================================================================ */
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const numericId = Number(id);

  const body = await req.json();
  const { nom, adresse1, adresse2, adresse3, ville, codePostal } = body;

  if (!nom) {
    return NextResponse.json(
      { error: "Invalid payload" },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("societe")
    .update({
      societe_nom: nom,
      societe_adresse1: adresse1,
      societe_adresse2: adresse2,
      societe_adresse3: adresse3,
      societe_ville: ville,
      societe_code_postal: codePostal,
    })
    .eq("societe_id", numericId);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}


/* ============================================================================
   DELETE /api/configs/[id]
   ============================================================================ */
export async function DELETE(
  _req: NextRequest,
  context: { params : Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const societeId = Number(id);

  if (Number.isNaN(societeId)) {
    return NextResponse.json(
      { error: "Invalid societe id" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("societe")
    .delete()
    .eq("societe_id", societeId)
    .select("societe_id")
    .maybeSingle();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  if (!data) {
    return NextResponse.json(
      { error: `No row deleted for societe_id=${societeId}` },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true });
}
