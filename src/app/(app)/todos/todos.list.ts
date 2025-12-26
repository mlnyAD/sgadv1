import 'server-only'
import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import { todoRepository } from '@/domain/todo/todo.repository'
import { toTodoListItem } from "@/domain/todo/todo-list.mapper";


export type ListTodosParams = {
  page: number;
  pageSize: number;
  search?: string;
  urgent?: boolean;
  important?: boolean;
  etatId?: number;
};


export async function listTodos(params: ListTodosParams) {
  const supabase = await createSupabaseServerReadClient()

  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error

  if (!user) {
    return { items: [], totalPages: 0 }
  }

  const { items: todos, totalPages } = await todoRepository.listByOwner({
    ...params,
    ownerId: user.id,
  })
  return {
    items: todos.map(toTodoListItem), // ✅ projection ici
    totalPages,
  };
}
