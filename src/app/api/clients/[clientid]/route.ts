

import { NextResponse, type NextRequest } from "next/server";
import { getClientById, updateClient, deleteClient } from "@/domain/client";
import { requireApiAdmin } from "@/lib/auth/require-api-admin";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ clientid: string }> }
) {
  try {
    await requireApiAdmin();

    const { clientid } = await params;

    const client = await getClientById(clientid);
    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    return NextResponse.json(client);
  } catch (e) {
    const msg = (e as Error).message;
    if (msg === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (msg === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ clientid: string }> }
) {
  try {
    await requireApiAdmin();

    const { clientid } = await params;

    const body = await req.json();
    await updateClient(clientid, body);

    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = (e as Error).message;
    if (msg === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (msg === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ clientid: string }> }
) {
  try {
    await requireApiAdmin();

    const { clientid } = await params;

    await deleteClient(clientid);
    return NextResponse.json({ deleted: true });
  } catch (e) {
    const msg = (e as Error).message;
    if (msg === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (msg === "FORBIDDEN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}