

import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerActionClient } from "@/lib/supabase/server-action";

/* ------------------------------------------------------------------ */
/* PUT — Modification d’un lot                                        */
/* ------------------------------------------------------------------ */

export async function PUT(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ lottravId: string }>;
  }
) {
  const { lottravId } = await params;
  const lotId = Number(lottravId);

  if (!Number.isInteger(lotId)) {
    return NextResponse.json(
      { error: "Invalid lottravId" },
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

  const supabase = await createSupabaseServerActionClient();

  const { error } = await supabase
    .from("lottrav")
    .update({
      lottrav_nom: name,
      lottrav_start: startDate || null,
      lottrav_end: endDate || null,
      lottrav_status_id: statusId,
      lottrav_resp_id: responsableId ?? null,
    })
    .eq("lottrav_id", lotId);

  if (error) {
    console.error("PUT lottrav error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
