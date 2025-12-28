
// Décrire ce qui sort de la base (tables + vues)
// lecture DB / vue
// domain/societe/societe.db.ts
export interface SocieteDbRow {
  societe_id: number;
  societe_nom: string;
  societe_adresse1: string | null;
  societe_adresse2: string | null;
  societe_adresse3: string | null;
  societe_ville: string | null;
  societe_code_postal: string | null;
}
