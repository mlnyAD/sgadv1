import { NextResponse } from "next/server";
import { listSocietes, createSociete } from "@/domain/societe";

/* ------------------------------------------------------------------ */
/* GET /api/societes */
/* ------------------------------------------------------------------ */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") ?? "1");
  const pageSize = Number(searchParams.get("pageSize") ?? "10");
  const search = searchParams.get("search") ?? undefined;

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

  const result = await listSocietes({
    page,
    pageSize,
    search,
  });

  return NextResponse.json(result);
}

/* ------------------------------------------------------------------ */
/* POST /api/societes */
/* ------------------------------------------------------------------ */
export async function POST(req: Request) {
  const body = await req.json();

  try {
    const id = await createSociete(body);
    return NextResponse.json({ id }, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error).message },
      { status: 500 }
    );
  }
}
