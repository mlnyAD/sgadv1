

import { NextResponse } from "next/server";
import { getClientById, updateClient } from "@/domain/client";
import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";

/* ------------------------------------------------------------------ */
/* GET /api/clients/[id] */
/* ------------------------------------------------------------------ */
export async function GET(
  _req: Request,
  context: { params: Promise<{ clientid: string }> }
) {
  const { clientid } = await context.params;

  console.log("Avant GetClientById id = ", clientid)

  const client = await getClientById(clientid);

  console.log("Après GetClientById client = ", client)

  if (!client) {
    return NextResponse.json(
      { error: "Client not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(client);
}

/* ===================================================================
   PUT /api/clients/[id]
   =================================================================== */
export async function PUT(
  req: Request,
  context: { params: Promise<{ clientid: string }> }
) {
  const { clientid } = await context.params;
    /* ------------------------------------------------------------------
       Auth
       ------------------------------------------------------------------ */
    const supabase = await createSupabaseServerReadClient();
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
       Update
       ------------------------------------------------------------------ */
       try {
    await updateClient(clientid, body);

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error).message },
      { status: 500 }
    );
  }
}
