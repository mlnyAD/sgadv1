

import { NextResponse } from "next/server";
import { listClients, createClient } from "@/domain/client/client-repository";
import { requireApiAdmin } from "@/lib/auth/require-api-admin";

/* ------------------------------------------------------------------ */
/* GET /api/clients (ADMIN ONLY) */
/* ------------------------------------------------------------------ */
export async function GET(req: Request) {

  const operateur = await requireApiAdmin();
  if (operateur instanceof NextResponse) {
    return operateur;
  }

  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") ?? "1");
  const pageSize = Number(searchParams.get("pageSize") ?? "10");
  const search = searchParams.get("search") ?? undefined;
  const actifParam = searchParams.get("actif");

  const actif =
    actifParam === null
      ? undefined
      : actifParam === "true";

  if (
    Number.isNaN(page) ||
    Number.isNaN(pageSize) ||
    page < 1 ||
    pageSize < 1
  ) {
    return NextResponse.json(
      { error: "Invalid pagination parameters" },
      { status: 400 }
    );
  }

  const result = await listClients({
    page,
    pageSize,
    search,
    actif,
  });

  return NextResponse.json(result);
}

/* ------------------------------------------------------------------ */
/* POST /api/clients (ADMIN ONLY) */
/* ------------------------------------------------------------------ */
export async function POST(req: Request) {
  
  const operateur = await requireApiAdmin();
  if (operateur instanceof NextResponse) {
    return operateur;
  }

  try {
    
    const body = await req.json();
    const id = await createClient(body);
    return NextResponse.json({ id }, { status: 201 });

  } catch (e) {
    return NextResponse.json(
      { error: (e as Error).message },
      { status: 500 }
    );
  }
}
