import type { TodoEtatId } from "@/domain/todo/todo-etat.catalog"

export interface TodoFormValues {
  titre: string;
  text: string;
  creation: string;          // yyyy-mm-dd
  cloture: string;          // yyyy-mm-dd | ""
  urgent: boolean;
  important: boolean;
  etatId: TodoEtatId  | null;     // tolérant pour les <select>
}
