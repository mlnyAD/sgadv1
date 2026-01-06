import { NextResponse } from "next/server";
import {
  getLicenceById,
  updateLicence,
} from "@/domain/licence/licence.repository";

/* ------------------------------------------------------------------ */
/* GET /api/licences/[id] */
/* ------------------------------------------------------------------ */
export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const licence = await getLicenceById(id);

  if (!licence) {
    return NextResponse.json(
      { error: "Licence introuvable" },
      { status: 404 }
    );
  }

  return NextResponse.json(licence);
}

/* ------------------------------------------------------------------ */
/* PUT /api/licences/[id] */
/* ------------------------------------------------------------------ */
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await req.json();

  await updateLicence(id, body);

  return NextResponse.json({ success: true });
}
