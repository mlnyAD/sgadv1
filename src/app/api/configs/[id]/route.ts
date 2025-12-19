import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/* ============================================================================
   GET /api/configs/[id]
   ============================================================================ */
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const configId = Number(params.id);

  if (Number.isNaN(configId)) {
    return NextResponse.json(
      { error: "Invalid config id" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("vw_config_list")
    .select(`
      config_id,
      config_nom,
      config_type,
      type_nom,
      lmod
    `)
    .eq("config_id", configId)
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}

/* ============================================================================
   PUT /api/configs/[id]
   ============================================================================ */
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const configId = Number(params.id);

  if (Number.isNaN(configId)) {
    return NextResponse.json(
      { error: "Invalid config id" },
      { status: 400 }
    );
  }

  const body = await req.json();

  const { data, error } = await supabase
    .from("config")
    .update({
      config_nom: body.label,
      config_type: body.config_type_id,
    })
    .eq("config_id", configId)
    .select("config_id")
    .maybeSingle();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  if (!data) {
    return NextResponse.json(
      { error: `No row updated for config_id=${configId}` },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    updated_id: data.config_id,
  });
}

/* ============================================================================
   DELETE /api/configs/[id]
   ============================================================================ */
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const configId = Number(params.id);

  if (Number.isNaN(configId)) {
    return NextResponse.json(
      { error: "Invalid config id" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("config")
    .delete()
    .eq("config_id", configId)
    .select("config_id")
    .maybeSingle();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  if (!data) {
    return NextResponse.json(
      { error: `No row deleted for config_id=${configId}` },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true });
}
