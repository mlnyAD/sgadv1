
/**
 * Projection UI d’une société pour affichage en liste / table.
 * ⚠️ Ce n’est PAS le modèle métier.
 */
export interface SocieteListItem {
  /** Identifiant technique */
  id: number;
  /** Nom / titre affiché */
  nom: string;
  /** Adresse 1ère partie */
  adresse1: string;
  /** Adresse 2ème partie */
  adresse2: string;
  /** Adresse 3ème partie */
  adresse3: string;
  /** Ville */
  ville: string;
  /** Code postal */
  codePostal: string;
};
