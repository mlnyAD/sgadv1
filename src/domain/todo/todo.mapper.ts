import { TodoDbRow } from "./todo.db";
import { TodoUI } from "./todo.ui";


// sens BD (view) -> Appli UI 
export function mapTodoDbToUI(row: TodoDbRow): TodoUI {
  return {
    id: row.todo_id!,
    creation: new Date(row.todo_creation!),
    cloture: row.todo_cloture ? new Date(row.todo_cloture) : null,
    titre: row.todo_titre ?? "",
    text: row.todo_text ?? null,
    important: row.todo_important ?? false,
    urgent: row.todo_urgent ?? false,
    etatId: row.todo_etat_id!,
  user: {
    id: row.todo_user_id!,
  }    
  };
}

// sens appli UI -> BD (table) -- CREATION

export function mapCreateTodoToDb(
  input: TodoUI,
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
export function mapUpdateTodoToDb(input: TodoUI) {
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
