// src/domain/todo/todo.repository.ts


import { createSupabaseServerReadClient } from '@/lib/supabase/server-read'
import { mapTodoDbToUI } from '@/domain/todo/todo.mapper'
import { CreateTodoUI, TodoUI } from "./todo.ui";
import { createSupabaseAdminClient } from '@/lib/supabase/admin';

export type PagedResult<T> = {
  items: T[];
  totalPages: number;
};
/* ------------------------------------------------------------------ */
/* LISTE DES TODOS POUR UN UTILISATEUR                                 */
/* ------------------------------------------------------------------ */
export async function listTodosForUser(params: {
  userId: string;
  page: number;
  pageSize: number;
  search?: string;
  urgent?: boolean;
  important?: boolean;
  etatId?: number;
}): Promise<PagedResult<TodoUI>> {

  const supabase = await createSupabaseServerReadClient();

  let query = supabase
    .from("vw_todo_view")
    .select("*", { count: "exact" })
    .eq("todo_user_id", params.userId)
    .order("todo_id");

  if (params.search) {
    query = query.ilike("todo_titre", `%${params.search}%`);
  }

  if (params.etatId) {
    query = query.eq("todo_etat_id", params.etatId);
  }

  if (params.urgent !== undefined) {
    query = query.eq("todo_urgent", params.urgent);
  }

  if (params.important !== undefined) {
    query = query.eq("todo_important", params.important);
  }

  const from = (params.page - 1) * params.pageSize;
  const to = from + params.pageSize - 1;

  const { data, count, error } = await query.range(from, to);

  if (error) throw error;

  const items = (data ?? []).map(mapTodoDbToUI);
  const totalPages = Math.max(1, Math.ceil((count ?? 0) / params.pageSize));

  return { items, totalPages };
}

/* ------------------------------------------------------------------ */
/* LECTURE D'UN TODO PAR ID                                            */
/* ------------------------------------------------------------------ */
export async function getTodoById(
  todoId: number,
  userId: string
): Promise<TodoUI | null> {
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

  return mapTodoDbToUI(data);
}

/* ------------------------------------------------------------------ */
/* CREATION D'UN TODO                                                  */
/* ------------------------------------------------------------------ */
export async function createTodo(
  input: CreateTodoUI,
  userId: string
): Promise<void> {
  const supabase = await createSupabaseAdminClient();

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
  id: number,
  userId: string,
  input: TodoUI
): Promise<void> {
  const supabase = await createSupabaseAdminClient();

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
    .eq("todo_id", id)
    .eq("todo_user_id", userId);

  if (error) {
    throw error;
  }
}

/* ------------------------------------------------------------------ */
/* SUPPRESSION D'UN TODO                                               */
/* ------------------------------------------------------------------ */
export async function deleteTodo(
  id: number,
  userId: string
): Promise<void> {
  const supabase = await createSupabaseAdminClient();

  const { error } = await supabase
    .from("todo")
    .delete()
    .eq("todo_id", id)
    .eq("todo_user_id", userId);

  if (error) {
    throw error;
  }
}
/*
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
}*/

