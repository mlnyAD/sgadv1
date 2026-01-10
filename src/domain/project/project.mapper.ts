
import type { ProjectDbRow, ProjectDbViewRow, } from "./project.db";
import type { ProjectStatusId } from "./project.catalog";
import type { ProjectUI } from "./project.ui";

/* ------------------------------------------------------------------
   DB View -> DB Row
   ------------------------------------------------------------------ */

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
    project_status_id:
      view.project_status_id !== null
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

    project_devis_ht: view.project_devis_ht,
    project_commande_ht: view.project_commande_ht,

    project_photo: view.project_photo,
    lmod: view.lmod,

  };
}

/* ------------------------------------------------------------------
   DB Row -> UI
   ------------------------------------------------------------------ */

export function mapProjectDbRowToUI(
  row: ProjectDbRow
): ProjectUI {
  if (!row.project_id) {
    throw new Error("project_id requis pour mapping UI");
  }

  return {
    id: row.project_id,
    ident: row.project_ident,
    nom: row.project_nom,
    statusId: row.project_status_id,

    description: row.project_descript ?? null,
    commentaires: row.project_commentaires ?? null,

    adresse: {
      adresse: row.project_adresse ?? null,
      codePostal: row.project_code_postal ?? null,
      ville: row.project_ville ?? null,
    },

    responsable: {
      nom: row.project_responsable ?? null,
      personId: row.project_responsable_person_id ?? null,
    },

    pilote: {
      nom: row.project_pilote ?? null,
      personId: row.project_pilote_person_id ?? null,
    },

    moaId: row.project_moa_id ?? null,

    budgetId: row.project_budget_id ?? null,
    ouvrageId: row.project_ouvrage_id ?? null,
    motifId: row.project_motif_id ?? null,

    dates: {
      creation: row.project_creation ?? null,
      start: row.project_start ?? null,
      end: row.project_end ?? null,
      receptionInitiale: row.project_reception_init ?? null,
      receptionActuelle: row.project_reception_actu ?? null,
      livraisonInitiale: row.project_livraison_init ?? null,
      livraisonActuelle: row.project_livraison_actu ?? null,
    },

    dureeVie: row.project_duree_vie ?? null,

    validations: {
      etude: {
        valide: row.project_valid_etude ?? null,
        commentaires: row.project_valid_etude_comments ?? null,
      },
      choixST: {
        valide: row.project_choix_st ?? null,
        commentaires: row.project_choix_st_comments ?? null,
      },
      travauxSupplementaires: {
        valide: row.project_valid_travaux_suppl ?? null,
        commentaires:
          row.project_valid_travaux_suppl_comments ?? null,
      },
      decompteDepenses: {
        valide: row.project_decompte_depenses ?? null,
        commentaires:
          row.project_decompte_depenses_comments ?? null,
      },
    },

    financier: {
      devisHT: row.project_devis_ht ?? null,
      commandeHT: row.project_commande_ht ?? null,
    },

    photo: row.project_photo ?? null,
    lastModified: row.lmod ?? null,
  };
}

/* ------------------------------------------------------------------
   UI -> DB Row
   ------------------------------------------------------------------ */

export function mapProjectUIToDbRow(
  ui: ProjectUI
): ProjectDbRow {
  return {
    project_id: ui.id,
    project_ident: ui.ident,
    project_nom: ui.nom,
    project_status_id: ui.statusId,

    project_descript: ui.description,
    project_commentaires: ui.commentaires,

    project_adresse: ui.adresse.adresse,
    project_code_postal: ui.adresse.codePostal,
    project_ville: ui.adresse.ville,

    project_responsable: ui.responsable.nom,
    project_responsable_person_id: ui.responsable.personId,

    project_pilote: ui.pilote.nom,
    project_pilote_person_id: ui.pilote.personId,

    project_moa_id: ui.moaId,

    project_budget_id: ui.budgetId,
    project_ouvrage_id: ui.ouvrageId,
    project_motif_id: ui.motifId,

    project_creation: ui.dates.creation,
    project_start: ui.dates.start,
    project_end: ui.dates.end,

    project_reception_init: ui.dates.receptionInitiale,
    project_reception_actu: ui.dates.receptionActuelle,
    project_livraison_init: ui.dates.livraisonInitiale,
    project_livraison_actu: ui.dates.livraisonActuelle,

    project_duree_vie: ui.dureeVie,

    project_valid_etude: ui.validations.etude.valide,
    project_valid_etude_comments:
      ui.validations.etude.commentaires,

    project_choix_st: ui.validations.choixST.valide,
    project_choix_st_comments:
      ui.validations.choixST.commentaires,

    project_valid_travaux_suppl:
      ui.validations.travauxSupplementaires.valide,
    project_valid_travaux_suppl_comments:
      ui.validations.travauxSupplementaires.commentaires,

    project_decompte_depenses:
      ui.validations.decompteDepenses.valide,
    project_decompte_depenses_comments:
      ui.validations.decompteDepenses.commentaires,

    project_devis_ht: ui.financier.devisHT,
    project_commande_ht: ui.financier.commandeHT,

    project_photo: ui.photo,
  };
}
