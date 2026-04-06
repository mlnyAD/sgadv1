

import { NextRequest, NextResponse } from "next/server";

import { createExportModule } from "@/features/export/export.module";
import { getCurrentClient } from "@/domain/session/current-client";
import { ExportError } from "@/features/export/export.service";

const { service } = createExportModule();

export async function POST(req: NextRequest) {
  try {

    const body = await req.json();

    const { current } = await getCurrentClient({
      requireSelected: true,
      next: "/exports",
    });

    if (!current?.cltId) {
      return NextResponse.json(
        { error: "CLIENT_REQUIRED" },
        { status: 400 }
      );
    }

    const result = await service.execute(
      {
        exportKey: body.exportKey,
        exercice: body.exercice,
      },
      {
        userId: "current-user",
        cltId: current.cltId,
      },
    );

    console.log("export - result = ", result.buffer);

    return new NextResponse(new Uint8Array(result.buffer), {
      status: 200,
      headers: {
        "Content-Type": result.mimeType,
        "Content-Disposition": `attachment; filename="${result.fileName}"`,
      },
    });

  } catch (error) {

    if (error instanceof ExportError) {
      return NextResponse.json(
        { error: error.code, message: error.message },
        { status: 400 }
      );
    }

    console.error(error);

    return NextResponse.json(
      { error: "EXPORT_ERROR" },
      { status: 500 }
    );
  }
}