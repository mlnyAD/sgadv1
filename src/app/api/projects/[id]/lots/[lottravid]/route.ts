

import { deleteLotTrav, updateLotTrav } from "@/domain/lottrav/lottrav-repository";
import { NextResponse } from "next/server";

type Context = {
  params: Promise<{
    id: string;
    lottravid: string;
  }>;
};


/* ------------------------------------------------------------------ */
/* PUT — Modification d’un lot                                        */
/* ------------------------------------------------------------------ */
export async function PUT(
  request: Request,
  { params }: Context
) {
  const { id, lottravid } = await params;

  const projectId = Number(id);
  const lotId = Number(lottravid);

  if (!Number.isInteger(projectId) || !Number.isInteger(lotId)) {
    return NextResponse.json(
      { error: "Invalid parameters" },
      { status: 400 }
    );
  }

  const body = await request.json();

   await updateLotTrav(projectId, lotId, body);

  return NextResponse.json({ success: true });
}

/* ------------------------------------------------------------------ */
/* DELETE — Suppression d’un lot                                      */
/* ------------------------------------------------------------------ */

export async function DELETE(
  _request: Request,
  { params }: Context
) {
  const { id, lottravid } = await params;

  const projectId = Number(id);
  const lotId = Number(lottravid);

  if (!Number.isInteger(projectId) || !Number.isInteger(lotId)) {
    return NextResponse.json(
      { error: "Invalid parameters" },
      { status: 400 }
    );
  }

  await deleteLotTrav(projectId, lotId);

  return NextResponse.json({ success: true });
}