

import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const LOGO_BUCKET = "client-logos";
const MAX_FILE_SIZE = 2 * 1024 * 1024;

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp"];

function getExtension(file: File): string {
  const byMimeType: Record<string, string> = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/webp": "webp",
  };

  return byMimeType[file.type] ?? "bin";
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const clientId = formData.get("clientId");
    const file = formData.get("file");

    if (typeof clientId !== "string" || clientId.length === 0) {
      return NextResponse.json(
        { error: "CLIENT_ID_REQUIRED", message: "clientId est requis." },
        { status: 400 },
      );
    }

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "FILE_REQUIRED", message: "Aucun fichier transmis." },
        { status: 400 },
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "INVALID_FILE_TYPE", message: "Format de fichier non autorisé." },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "FILE_TOO_LARGE", message: "Fichier trop volumineux." },
        { status: 400 },
      );
    }

    const supabase = await createSupabaseAdminClient();

    const extension = getExtension(file);
    const path = `clients/${clientId}/logo.${extension}`;

    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    const { error: uploadError } = await supabase.storage
      .from(LOGO_BUCKET)
      .upload(path, fileBuffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      return NextResponse.json(
        { error: "UPLOAD_ERROR", message: uploadError.message },
        { status: 500 },
      );
    }

    const { error: updateError } = await supabase
      .from("client")
      .update({
        clt_logo_path: path,
      })
      .eq("clt_id", clientId);

    if (updateError) {
      return NextResponse.json(
        { error: "CLIENT_UPDATE_ERROR", message: updateError.message },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      path,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erreur inattendue.";

    return NextResponse.json(
      { error: "INTERNAL_ERROR", message },
      { status: 500 },
    );
  }
}