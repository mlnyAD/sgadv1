

// Décrire ce que l’IHM consomme (colonnes UI)
// domain/todo/todo.ui.ts

//import type { UserRef } from "@/domain/user/user.ref";

// ----------------------------
// Todo affiché (lecture)
// ----------------------------
export interface TodoUI {
  id: number;
  titre: string;
  text: string | null;
  creation: Date;
  cloture: Date | null;
  urgent: boolean;
  important: boolean;
  etatId: number;
  //user: UserRef;
}

// ----------------------------
// Todo en création / édition
// ----------------------------
export interface CreateTodoUI {
  titre: string;
  text: string;
  urgent: boolean;
  important: boolean;
  etatId: number;
  cloture?: string | null;
}