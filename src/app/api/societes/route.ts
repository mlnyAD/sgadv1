import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/* ============================================================================
   POST /api/configs
   ============================================================================ */
export async function POST(req: Request) {
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
	.insert({
	  societe_nom: nom,
	  societe_adresse1: adresse1,
	  societe_adresse2: adresse2,
	  societe_adresse3: adresse3,
	  societe_ville: ville,
	  societe_code_postal: codePostal,
	});

if (error) {
  console.error("POST /api/societes error:", error);

  return NextResponse.json(
	{
	  error: error.message,
	  details: error,
	},
	{ status: 500 }
  );
}

  return NextResponse.json({ success: true });
}
