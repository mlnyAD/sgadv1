import { TodoDbRow } from "./todo.db";
import type { Todo } from "./todo.model";


// sens BD (view) -> Appli UI 
export function mapTodoDbToModel(row: TodoDbRow): Todo {
  return {
    id: row.todo_id!,
    creation: new Date(row.todo_creation!),
    cloture: row.todo_cloture ? new Date(row.todo_cloture) : undefined,
    titre: row.todo_titre ?? "",
    text: row.todo_text ?? undefined,
    important: row.todo_important ?? false,
    urgent: row.todo_urgent ?? false,
    etatId: row.todo_etat_id!,
    user: {
      id: row.todo_user_id!,
      email: row.email ?? "",
      firstName: row.first_name ?? "",
      lastName: row.last_name ?? "",
    },
    lastModified: new Date(row.lmod!),
  };
}

// sens appli UI -> BD (table) -- CREATION
import { CreateTodoInput, UpdateTodoInput } from "./todo.write";

export function mapCreateTodoToDb(
  input: CreateTodoInput,
  userId: string
) {
  return {
    todo_titre: input.titre,
    todo_text: input.text ?? null,
    todo_urgent: input.urgent,
    todo_important: input.important,
    todo_etat_id: input.etatId,
    todo_user_id: userId,
  };
}

// sens appli UI -> BD (table) -- UPDATE
export function mapUpdateTodoToDb(input: UpdateTodoInput) {
  return {
    ...(input.titre !== undefined && { todo_titre: input.titre }),
    ...(input.text !== undefined && { todo_text: input.text }),
    ...(input.urgent !== undefined && { todo_urgent: input.urgent }),
    ...(input.important !== undefined && {
      todo_important: input.important,
    }),
    ...(input.etatId !== undefined && {
      todo_etat_id: input.etatId,
    }),
  };
}
