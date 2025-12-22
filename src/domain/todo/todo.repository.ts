// src/domain/todo/todo.repository.ts


import { createSupabaseServerReadClient } from '@/lib/supabase/server-read'
import { mapTodoDbToModel } from '@/domain/todo/todo.mapper'
import type { Todo } from "./todo.model";
import type { CreateTodoInput, UpdateTodoInput } from "./todo.write";

/* ------------------------------------------------------------------ */
/* LISTE DES TODOS POUR UN UTILISATEUR                                 */
/* ------------------------------------------------------------------ */
export async function listTodosForUser(userId: string): Promise<Todo[]> {
  const supabase = await createSupabaseServerReadClient();

  console.log("Entrée listTodosForUser userr = ", userId);
  const { data, error } = await supabase
    .from("vw_todo_view")
    .select("*")
    .eq("todo_user_id", userId)
    .order("todo_id");

  if (error) {
    throw error;
  }

  console.log("listTodosForUser user, data", userId, data);

  return data.map(mapTodoDbToModel);
}

/* ------------------------------------------------------------------ */
/* LECTURE D'UN TODO PAR ID                                            */
/* ------------------------------------------------------------------ */
export async function getTodoById(
  todoId: number,
  userId: string
): Promise<Todo | null> {
  const supabase = await createSupabaseServerReadClient();

  const { data, error } = await supabase
    .from("vw_todo_view")
    .select("*")
    .eq("todo_id", todoId)
    .eq("todo_user_id", userId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null; // pas trouvé
    }
    throw error;
  }

  return mapTodoDbToModel(data);
}

/* ------------------------------------------------------------------ */
/* CREATION D'UN TODO                                                  */
/* ------------------------------------------------------------------ */
export async function createTodo(
  input: CreateTodoInput,
  userId: string
): Promise<void> {
  const supabase = await createSupabaseServerReadClient();

  const { error } = await supabase.from("todo").insert({
    todo_titre: input.titre,
    todo_text: input.text ?? null,
    todo_urgent: input.urgent,
    todo_important: input.important,
    todo_etat_id: input.etatId,
    todo_user_id: userId,
  });

  if (error) {
    throw error;
  }
}

/* ------------------------------------------------------------------ */
/* MISE A JOUR D'UN TODO                                               */
/* ------------------------------------------------------------------ */
export async function updateTodo(
  todoId: number,
  userId: string,
  input: UpdateTodoInput
): Promise<void> {
  const supabase = await createSupabaseServerReadClient();

  const { error } = await supabase
    .from("todo")
    .update({
      ...(input.titre !== undefined && { todo_titre: input.titre }),
      ...(input.text !== undefined && { todo_text: input.text }),
      ...(input.urgent !== undefined && { todo_urgent: input.urgent }),
      ...(input.important !== undefined && {
        todo_important: input.important,
      }),
      ...(input.etatId !== undefined && {
        todo_etat_id: input.etatId,
      }),
    })
    .eq("todo_id", todoId)
    .eq("todo_user_id", userId);

  if (error) {
    throw error;
  }
}

/* ------------------------------------------------------------------ */
/* SUPPRESSION D'UN TODO                                               */
/* ------------------------------------------------------------------ */
export async function deleteTodo(
  todoId: number,
  userId: string
): Promise<void> {
  const supabase = await createSupabaseServerReadClient();

  const { error } = await supabase
    .from("todo")
    .delete()
    .eq("todo_id", todoId)
    .eq("todo_user_id", userId);

  if (error) {
    throw error;
  }
}

import 'server-only'

type ListByOwnerParams = {
  page: number
  pageSize: number
  search?: string
  ownerId: string
}

export const todoRepository = {
  async listByOwner({
    page,
    pageSize,
    search,
    ownerId,
  }: ListByOwnerParams) {
   const supabase = await createSupabaseServerReadClient();


    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    let query = supabase
      .from('todo')
      .select('*', { count: 'exact' })
      .eq('owner_id', ownerId)
      .order('created_at', { ascending: false })
      .range(from, to)

    if (search) {
      query = query.ilike('title', `%${search}%`)
    }

    const { data, count, error } = await query
    if (error) throw error

    return {
      items: (data ?? []).map(mapTodoDbToModel),
      totalPages: Math.ceil((count ?? 0) / pageSize),
    }
  },
}
