import { NextResponse } from "next/server";
import { createTodo } from "@/domain/todo/todo.repository";
import { loadAuthenticatedUser } from "@/domain/user/loadAuthenticatedUser";


export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { titre, text, urgent, important, etatId } = body;

    if (
      !titre ||
      typeof urgent !== "boolean" ||
      typeof important !== "boolean" ||
      !etatId
    ) {
      return NextResponse.json(
        { error: "Invalid payload" },
        { status: 400 }
      );
    }

    const user = await loadAuthenticatedUser();

    if (!user) {
  return NextResponse.json(
    { error: "Unauthorized" },
    { status: 401 }
  );
}

    await createTodo(
      {
        titre,
        text,
        urgent,
        important,
        etatId,
      },
      user.id
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/todos error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
