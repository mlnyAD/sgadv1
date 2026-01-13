

import { NextResponse } from "next/server";
import { createSupabaseServerActionClient  } from "@/lib/supabase/server-action";

/* ------------------------------------------------------------------ */
/* POST — Création d’un lot                                           */
/* ------------------------------------------------------------------ */

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const projectId = Number(id);

  if (!Number.isInteger(projectId)) {
    return NextResponse.json(
      { error: "Invalid project id" },
      { status: 400 }
    );
  }

  const body = await request.json();

  const {
    name,
    startDate,
    endDate,
    statusId,
    responsableId,
  } = body;

  if (!name || !statusId) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const supabase = await createSupabaseServerActionClient();

  const { error } = await supabase
    .from("lottrav")
    .insert({
      project_id: projectId,              // 🔑 JAMAIS depuis le client
      lottrav_nom: name,
      lottrav_start: startDate || null,
      lottrav_end: endDate || null,
      lottrav_status_id: statusId,
      lottrav_resp_id: responsableId ?? null,
    });

  if (error) {
    console.error("POST lottrav error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

