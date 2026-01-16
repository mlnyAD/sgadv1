import { NextResponse } from "next/server";
import {
    getConfigById,
    updateConfig,
    deleteConfig,
} from "@/domain/config"

interface RouteContext {
  params: Promise<{ configid: string }>;
}

/* ============================================================================
   GET /api/configs/[id]
   ============================================================================ */
export async function GET( _req: Request, context: RouteContext)  {

  const { configid } = await context.params;
  const configId = Number(configid);

  if (Number.isNaN(configId)) {
    return NextResponse.json(
      { error: "Invalid config id" },
      { status: 400 }
    );
  }

  const config = await getConfigById(configId);

  return NextResponse.json(config);
}

/* ============================================================================
   PUT /api/configs/[id]
   ============================================================================ */
export async function PUT( req: Request, context: RouteContext)  {

  const { configid } = await context.params;
  const configId = Number(configid);

  if (Number.isNaN(configId)) {
    return NextResponse.json(
      { error: "Invalid config id" },
      { status: 400 }
    );
  }

  const body = await req.json();

  try{
    await updateConfig(configId, body);
    return NextResponse.json({success: true});
  } catch (e) {
   return NextResponse.json(
      { error: (e as Error).message },
      { status: 500 }
    );
  }
}

/* ============================================================================
   DELETE /api/configs/[id]
   ============================================================================ */
export async function DELETE(
  _req: Request,
  context: { params: Promise<{ configid: string }> }
) {
  const { configid } = await context.params;
  const configId = Number(configid);

  if (Number.isNaN(configId)) {
    return NextResponse.json(
      { error: "Invalid config id" },
      { status: 400 }
    );
  }

  try {
    await deleteConfig(configId);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error).message },
      { status: 500 }
    );
  }
}