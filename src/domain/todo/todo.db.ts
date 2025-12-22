// lecture DB / vue
export interface TodoDbRow {
  todo_id: number | null;
  todo_creation: string | null;
  todo_cloture: string | null;
  todo_titre: string | null;
  todo_text: string | null;
  todo_important: boolean | null;
  todo_urgent: boolean | null;
  todo_etat_id: number | null;
  todo_user_id: string | null;
  lmod: string | null;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
}
