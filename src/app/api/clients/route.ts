

import { NextResponse } from "next/server";
import { listClients, createClient } from "@/domain/client";
import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";

/* ------------------------------------------------------------------ */
/* GET /api/clients */
/* ------------------------------------------------------------------ */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") ?? "1");
  const pageSize = Number(searchParams.get("pageSize") ?? "10");
  const search = searchParams.get("search") ?? undefined;
  const status = searchParams.get("status") ?? undefined;

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
    status,
  });

  return NextResponse.json(result);
}


/* ============================================================================
   POST /api/clients
   ============================================================================ */
export async function POST(req: Request) {
  try {
    const supabase = await createSupabaseServerReadClient();

    /* ------------------------------------------------------------------
       Auth
       ------------------------------------------------------------------ */
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    /* ------------------------------------------------------------------
       Payload
       ------------------------------------------------------------------ */
    const body = await req.json();

    /* ------------------------------------------------------------------
       Create
       ------------------------------------------------------------------ */
    const id = await createClient(body, user.id);

    return NextResponse.json({ id }, { status: 201 });

  } catch (e) {
    return NextResponse.json(
      { error: (e as Error).message },
      { status: 500 }
    );
  }
}
