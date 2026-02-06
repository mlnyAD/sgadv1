

import { NextResponse } from "next/server";
import { requireApiOperateur } from "@/lib/auth/require-api-operateur";

export async function GET() {
  try {
    // Ici on autorise quand même /me même si must_change_pwd=true
    // (sinon votre UI ne peut pas savoir pourquoi elle est bloquée)
    const operateur = await requireApiOperateur({ allowMustChangePassword: true });

    return NextResponse.json({ operateur });
  } catch (e) {
    const message = (e as Error).message;

    if (message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (message === "FORBIDDEN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (message === "MUST_CHANGE_PASSWORD") {
      return NextResponse.json({ error: "Must change password" }, { status: 409 });
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}