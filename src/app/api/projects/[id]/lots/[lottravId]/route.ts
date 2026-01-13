

import { updateLotTrav } from "@/domain/lottrav/lottrav.repository";
import { NextResponse } from "next/server";

type Context = {
  params: Promise<{
    id: string;
    lottravId: string;
  }>;
};

export async function PUT(
  request: Request,
  { params }: Context
) {
  const { id, lottravId } = await params;

  const projectId = Number(id);
  const lotId = Number(lottravId);

  if (!Number.isInteger(projectId) || !Number.isInteger(lotId)) {
    return NextResponse.json(
      { error: "Invalid parameters" },
      { status: 400 }
    );
  }


  const body = await request.json();
  console.log("PUT body = ", body);

   await updateLotTrav(projectId, lotId, body);

  return NextResponse.json({ success: true });
}
