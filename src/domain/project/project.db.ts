

import type { ProjectStatusId } from "./project.catalog";

/* ------------------------------------------------------------------
   Table project – DB row (écriture)
   ------------------------------------------------------------------ */

export interface ProjectDbRow {
  project_id?: number;
  project_ident: string;
  project_nom: string;

  project_descript?: string | null;
  project_adresse?: string | null;
  project_code_postal?: string | null;
  project_ville?: string | null;

  project_creation?: string | null;
  project_status_id: ProjectStatusId | null;

  project_responsable?: string | null;
  project_responsable_person_id?: number | null;

  project_moa_id?: number | null;
  project_pilote?: string | null;
  project_pilote_person_id?: number | null;

  project_commentaires?: string | null;

  project_budget_id?: number | null;
  project_ouvrage_id?: number | null;
  project_motif_id?: number | null;

  project_duree_vie?: number | null;

  project_start?: string | null;
  project_end?: string | null;

  project_reception_init?: string | null;
  project_reception_actu?: string | null;
  project_livraison_init?: string | null;
  project_livraison_actu?: string | null;

  project_valid_etude?: boolean | null;
  project_valid_etude_comments?: string | null;

  project_choix_st?: boolean | null;
  project_choix_st_comments?: string | null;

  project_valid_travaux_suppl?: boolean | null;
  project_valid_travaux_suppl_comments?: string | null;

  project_decompte_depenses?: boolean | null;
  project_decompte_depenses_comments?: string | null;

  project_devis_ht: number | null;
  project_commande_ht: number | null;

  project_photo?: string | null;
  lmod?: string | null;

}

/* ------------------------------------------------------------------
   Vue SQL – vw_project / vw_project_list (lecture)
   ------------------------------------------------------------------ */

export interface ProjectDbViewRow {
  project_id: number;
  project_ident: string;
  project_nom: string;
  project_descript: string | null;

  project_adresse: string | null;
  project_code_postal: string | null;
  project_ville: string | null;

  project_creation: string | null;
  project_status_id: number;

  project_responsable: string | null;
  project_responsable_person_id: number | null;

  project_moa_id: number | null;
  project_pilote: string | null;
  project_pilote_person_id: number | null;

  project_commentaires: string | null;

  project_budget_id: number | null;
  project_ouvrage_id: number | null;
  project_motif_id: number | null;

  project_duree_vie: number | null;

  project_start: string | null;
  project_end: string | null;

  project_reception_init: string | null;
  project_reception_actu: string | null;
  project_livraison_init: string | null;
  project_livraison_actu: string | null;

  project_valid_etude: boolean | null;
  project_valid_etude_comments: string | null;

  project_choix_st: boolean | null;
  project_choix_st_comments: string | null;

  project_valid_travaux_suppl: boolean | null;
  project_valid_travaux_suppl_comments: string | null;

  project_decompte_depenses: boolean | null;
  project_decompte_depenses_comments: string | null;

  project_devis_ht: number | null;
  project_commande_ht: number | null;

  project_photo: string | null;
  lmod: string | null;

  
  /* libellés issus de config (lecture uniquement) */
  project_etat_nom?: string | null;
  project_moa_nom?: string | null;
  project_budget_nom?: string | null;
  project_motif_nom?: string | null;
  project_ouvrage_nom?: string | null;
}
