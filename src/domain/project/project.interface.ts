export interface DbProject {
  project_id: number;                  // PK (integer)
  project_ident: string | null;
  project_nom: string;
  project_descript: string | null;
  project_adresse: string | null;
  project_code_postal: string | null;
  project_ville: string | null;
  project_creation: string | null;     // date -> string
  project_status_id: number | null;
  project_responsable: string | null;
  project_moa_id: number | null;
  project_pilote: string | null;
  project_commentaires: string | null;
  project_budget_id: number | null;
  project_ouvrage_id: number | null;
  project_motif_id: number | null;
  project_duree_vie: number | null;
  project_start: string | null;                // date
  project_reception_init: string | null;       // date
  project_reception_actu: string | null;       // date
  project_livraison_init: string | null;       // date
  project_livraison_actu: string | null;       // date
  project_valid_etude: boolean | null;
  project_valid_etude_comments: string | null;
  project_choix_st: boolean | null;
  project_choix_st_comments: string | null;
  project_valid_travaux_suppl: boolean | null;
  project_valid_travaux_suppl_comments: string | null;
  project_decompte_depenses: boolean | null;
  project_decompte_depenses_comments: string | null;
  lmod: string | null;                          // last modification (date/ts)
  projet_devis_ht: number | null;
  project_commande_ht: number | null;
  project_photo: string | null;
  project_end: string | null;                   // date

  client_id: string | null;                     // uuid, FK -> client.id
}
