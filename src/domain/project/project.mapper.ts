

import type { ProjectDbRow } from "./project.db";
import type { ProjectStatusId } from "./project.catalog";


/* ------------------------------------------------------------------
   Vue SQL – vw_project (lecture uniquement)
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

  projet_devis_ht: number | null;
  project_commande_ht: number | null;

  project_photo: string | null;
  lmod: string | null;

  client_id: string;

  /* libellés issus de config (lecture uniquement) */
  project_etat_nom?: string | null;
  project_moa_nom?: string | null;
  project_budget_nom?: string | null;
  project_motif_nom?: string | null;
  project_ouvrage_nom?: string | null;
}

/* ------------------------------------------------------------------
   Mapping vue DB → agrégat DB
   ------------------------------------------------------------------ */

/**
 * Mappe une ligne issue de la vue SQL vw_project
 * vers une ligne ProjectDbRow exploitable pour
 * création / édition / sauvegarde globale.
 *
 * Les libellés sont volontairement ignorés.
 */
export function mapProjectDbViewToDbRow(
  view: ProjectDbViewRow
): ProjectDbRow {
  return {
    project_id: view.project_id,
    project_ident: view.project_ident,
    project_nom: view.project_nom,
    project_descript: view.project_descript,

    project_adresse: view.project_adresse,
    project_code_postal: view.project_code_postal,
    project_ville: view.project_ville,

    project_creation: view.project_creation,
    project_status_id: view.project_status_id !== null
  ? (view.project_status_id as ProjectStatusId)
  : null,

    project_responsable: view.project_responsable,
    project_responsable_person_id: view.project_responsable_person_id,

    project_moa_id: view.project_moa_id,
    project_pilote: view.project_pilote,
    project_pilote_person_id: view.project_pilote_person_id,

    project_commentaires: view.project_commentaires,

    project_budget_id: view.project_budget_id,
    project_ouvrage_id: view.project_ouvrage_id,
    project_motif_id: view.project_motif_id,

    project_duree_vie: view.project_duree_vie,

    project_start: view.project_start,
    project_end: view.project_end,

    project_reception_init: view.project_reception_init,
    project_reception_actu: view.project_reception_actu,
    project_livraison_init: view.project_livraison_init,
    project_livraison_actu: view.project_livraison_actu,

    project_valid_etude: view.project_valid_etude,
    project_valid_etude_comments: view.project_valid_etude_comments,

    project_choix_st: view.project_choix_st,
    project_choix_st_comments: view.project_choix_st_comments,

    project_valid_travaux_suppl: view.project_valid_travaux_suppl,
    project_valid_travaux_suppl_comments:
      view.project_valid_travaux_suppl_comments,

    project_decompte_depenses: view.project_decompte_depenses,
    project_decompte_depenses_comments:
      view.project_decompte_depenses_comments,

    projet_devis_ht: view.projet_devis_ht,
    project_commande_ht: view.project_commande_ht,

    project_photo: view.project_photo,
    lmod: view.lmod,

    client_id: view.client_id,
  };
}
