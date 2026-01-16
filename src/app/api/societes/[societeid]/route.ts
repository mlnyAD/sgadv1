import { NextResponse } from "next/server";
import {
  getSocieteById,
  updateSociete,
  deleteSociete,
} from "@/domain/societe";

interface RouteContext {
  params: Promise<{ societeid: string }>;
}

/* ------------------------------------------------------------------ */
/* GET */
/* ------------------------------------------------------------------ */
export async function GET(_req: Request, context: RouteContext) {
  const { societeid } = await context.params;
  const societeId = Number(societeid);

  if (Number.isNaN(societeId)) {
    return NextResponse.json({ error: "Invalid societe id" }, { status: 400 });
  }

  const societe = await getSocieteById(societeId);

  if (!societe) {
    return NextResponse.json({ error: "Societe not found" }, { status: 404 });
  }

  return NextResponse.json(societe);
}

/* ------------------------------------------------------------------ */
/* PUT */
/* ------------------------------------------------------------------ */
export async function PUT(req: Request, context: RouteContext) {
  const { societeid } = await context.params;
  const societeId = Number(societeid);

  if (Number.isNaN(societeId)) {
    return NextResponse.json({ error: "Invalid societe id" }, { status: 400 });
  }

  const body = await req.json();

  try {
    await updateSociete(societeId, body);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error).message },
      { status: 500 }
    );
  }
}

/* ------------------------------------------------------------------ */
/* DELETE */
/* ------------------------------------------------------------------ */
export async function DELETE(_req: Request, context: RouteContext) {
  const { societeid } = await context.params;
  const societeId = Number(societeid);

  if (Number.isNaN(societeId)) {
    return NextResponse.json({ error: "Invalid societe id" }, { status: 400 });
  }

  try {
    await deleteSociete(societeId);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error).message },
      { status: 500 }
    );
  }
}
