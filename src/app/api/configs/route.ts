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

  const { label, config_type_id } = body;

  if (!label || !config_type_id) {
    return NextResponse.json(
      { error: "Invalid payload" },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("config")
    .insert({
      config_nom: label,
      config_type: config_type_id,
    });

if (error) {
  console.error("POST /api/configs error:", error);

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
