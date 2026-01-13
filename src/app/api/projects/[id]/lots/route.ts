

import { NextResponse } from "next/server";
import { createLotTrav } from "@/domain/lottrav/lottrav-repository";


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

  await createLotTrav(projectId, {
    lottrav_nom: body.name,
    lottrav_start: body.startDate || null,
    lottrav_end: body.endDate || null,
    lottrav_status_id: body.statusId,
    lottrav_resp_id: body.responsableId ?? null,
  });

  return NextResponse.json({ success: true });
}