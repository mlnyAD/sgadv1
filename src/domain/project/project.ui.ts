

// src/domain/project/project.ui.ts

import type { ProjectStatusId } from "./project.catalog";

/* ------------------------------------------------------------------
   ProjectUI
   Objet de référence pour l’affichage UI (read / edit)
   ------------------------------------------------------------------ */

export interface ProjectUI {
  /* =========================
     Identité
     ========================= */

  id: number;
  ident: string;
  nom: string;
  statusId: ProjectStatusId | null;

  /* =========================
     Description générale
     ========================= */

  description: string | null;
  commentaires: string | null;

  adresse: {
    adresse: string | null;
    codePostal: string | null;
    ville: string | null;
  };

  /* =========================
     Responsabilités
     ========================= */

  responsable: {
    nom: string | null;
    personId: number | null;
  };

  pilote: {
    nom: string | null;
    personId: number | null;
  };

  moaId: number | null;

  /* =========================
     Référentiels projet
     ========================= */

  budgetId: number | null;
  ouvrageId: number | null;
  motifId: number | null;

  /* =========================
     Planification
     ========================= */

  dates: {
    creation: string | null;

    start: string | null;
    end: string | null;

    receptionInitiale: string | null;
    receptionActuelle: string | null;

    livraisonInitiale: string | null;
    livraisonActuelle: string | null;
  };

  dureeVie: number | null;

  /* =========================
     Workflow / validations
     ========================= */

  validations: {
    etude: {
      valide: boolean | null;
      commentaires: string | null;
    };
    choixST: {
      valide: boolean | null;
      commentaires: string | null;
    };
    travauxSupplementaires: {
      valide: boolean | null;
      commentaires: string | null;
    };
    decompteDepenses: {
      valide: boolean | null;
      commentaires: string | null;
    };
  };

  /* =========================
     Financier
     ========================= */

  financier: {
    devisHT: number | null;
    commandeHT: number | null;
  };

  /* =========================
     Médias & méta
     ========================= */

  photo: string | null;
  lastModified: string | null;
}
