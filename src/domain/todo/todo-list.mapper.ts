import type { Todo } from "./todo.model";
import type { TodoListItem } from "./todo-list-item";
import {
  TODO_ETAT_CATALOG,
  isTodoEtatId,
} from "./todo-etat.catalog";

export function toTodoListItem(todo: Todo): TodoListItem {
  if (!isTodoEtatId(todo.etatId)) {
    throw new Error(
      `Invalid etatId "${todo.etatId}" for Todo ${todo.id}`
    );
  }

  return {
    id: todo.id,
    nom: todo.titre,
    etatId: todo.etatId, // ✅ CHAMP MANQUANT AJOUTÉ
    etat:
      TODO_ETAT_CATALOG.find(e => e.id === todo.etatId)?.label ?? "—",
    creation: todo.creation,
    cloture: todo.cloture ?? null,
    important: todo.important,
    urgent: todo.urgent,
  };
}
