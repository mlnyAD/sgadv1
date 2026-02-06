import { NextResponse, NextRequest } from "next/server";
import {
  getTodoById,
  updateTodo,
  deleteTodo,
} from "@/domain/todo";
import { getAuthenticatedOperateur } from "@/lib/auth/get-authenticated-operateur";

/* ============================================================================
   GET /api/todos/[id]
   ============================================================================ */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ todoid: string }> }
) {
  const { todoid } = await params
  const todoId = Number(todoid);

  if (Number.isNaN(todoId)) {
    return NextResponse.json(
      { error: "Invalid todo id" },
      { status: 400 }
    );
  }

  const operateur = await getAuthenticatedOperateur();

  if (!operateur) {
  return NextResponse.json(
    { error: "Unauthorized" },
    { status: 401 }
  );
}

  const todo = await getTodoById(todoId, operateur.operId);

  if (!todo) {
    return NextResponse.json(
      { error: "Todo not found" },
      { status: 404 }
    );
  }

   // console.log("Todo à éditer ", todo)
  return NextResponse.json(todo);
}

/* ============================================================================
   PUT /api/todos/[id]
   ============================================================================ */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ todoid: string }> }
) {
  const { todoid } = await params
  const todoId = Number(todoid);

  if (Number.isNaN(todoId)) {
    return NextResponse.json(
      { error: "Invalid todo id" },
      { status: 400 }
    );
  }

  const body = await req.json();

  const operateur = await getAuthenticatedOperateur();

  if (!operateur) {
  return NextResponse.json(
    { error: "Unauthorized" },
    { status: 401 }
  );
}

  await updateTodo(todoId, operateur.operId, body);

  return NextResponse.json({ success: true });
}

/* ============================================================================
   DELETE /api/todos/[id]
   ============================================================================ */

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ todoid: string }> }
) {

   const { todoid } = await params
  const todoId = Number(todoid);

  if (Number.isNaN(todoId)) {
    return NextResponse.json(
      { error: "Invalid todo id" },
      { status: 400 }
    );
  }

  const operateur = await getAuthenticatedOperateur();

  if (!operateur) {
  return NextResponse.json(
    { error: "Unauthorized" },
    { status: 401 }
  );
}
  await deleteTodo(todoId, operateur.operId);

  return NextResponse.json({ success: true });
}
