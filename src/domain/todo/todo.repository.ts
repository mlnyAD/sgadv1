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

  const {
    titre,
    text,
    urgent,
    important,
    etatId,
    cloture,
  } = input;

  const { error } = await supabase.from("todo").insert({
    todo_titre: titre,
    todo_text: text ?? null,
    todo_urgent: urgent,
    todo_important: important,
    todo_etat_id: etatId,
    todo_cloture: cloture,
    todo_user_id: userId,
  });

  if (error) {
    console.error("CREATE TODO ERROR", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
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

  const {
    titre,
    text,
    urgent,
    important,
    etatId,
    cloture,
  } = input;

  const { error } = await supabase
    .from("todo")
    .update({
      ...(titre !== undefined && { todo_titre: titre }),
      ...(text !== undefined && { todo_text: text ?? null }),
      ...(urgent !== undefined && { todo_urgent: urgent }),
      ...(important !== undefined && { todo_important: important }),
      ...(etatId !== undefined && { todo_etat_id: etatId }), // ✅ clé
      ...(cloture !== undefined && { todo_cloture: cloture ?? null }),
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
  urgent?: boolean
  important?: boolean
  etatId?: number
  ownerId: string
}

export const todoRepository = {
  async listByOwner({
    page,
    pageSize,
    search,
    urgent,
    important,
    etatId,
    ownerId,
  }: ListByOwnerParams) {
    const supabase = await createSupabaseServerReadClient()

    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    let query = supabase
      .from('vw_todo_view')
      .select('*', { count: 'exact' })
      .eq('todo_user_id', ownerId)
      .order('todo_creation', { ascending: false })
      .range(from, to)

    if (search) {
      query = query.ilike('todo_titre', `%${search}%`)
    }

    if (urgent !== undefined) {
      query = query.eq('todo_urgent', urgent)
    }

    if (important !== undefined) {
      query = query.eq('todo_important', important)
    }

    if (etatId !== undefined) {
      query = query.eq('todo_etat_id', etatId)
    }

    const { data, count, error } = await query
    if (error) throw error

    return {
      items: (data ?? []).map(mapTodoDbToModel),
      totalPages: Math.ceil((count ?? 0) / pageSize),
    }
  }
}

