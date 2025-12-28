
// Décrire ce que l’IHM consomme (colonnes UI)
// domain/societe/societe.ui.ts

export interface SocieteUI {
  id?: number;
  nom: string;
  adresse1?: string;
  adresse2?: string;
  adresse3?: string;
  ville?: string;
  codePostal?: string;
}