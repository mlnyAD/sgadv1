import type { TodoEtatId } from "./todo-etat.catalog";

/**
 * Projection UI d’un Todo pour affichage en liste / table.
 * ⚠️ Ce n’est PAS le modèle métier.
 */
export interface TodoListItem {
  /** Identifiant technique */
  id: number;

  /** Nom / titre affiché */
  nom: string;

  /** Libellé d’état (ex: "À faire", "En cours") */
  etat: string;

  /** Identifiant d’état (utile pour filtres / tri) */
  etatId: TodoEtatId;

  /** Date de création */
  creation: Date;

  /** Date de clôture (si définie) */
  cloture: Date | null;

  /** Marqueur d’importance */
  important: boolean;

  /** Marqueur d’urgence */
  urgent: boolean;
}
