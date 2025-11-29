export type ReunionView = {
  reunionId: number;             // Identifiant de la réunion
  reunionObjet: string;          // Objet / sujet de la réunion
  reunionDateHeure: Date;        // Date + heure (objet Date)
  reunionDuree: number;          // Durée en minutes ou heures
  reunionAdresse: string;        // Adresse physique
  reunionPiloteId: number;       // ID du pilote (responsable)
  reunionPiloteEmail: string;    // Email du pilote

  reunionTypeId: number;         // Type ID
  reunionType: string;           // Libellé type

  reunionEtatId: number;         // État ID
  reunionEtat: string;           // Libellé état

  reunionCR: boolean;            // Compte-rendu réalisé ?
  reunionCommentaires: string;   // Commentaires libres

  projectId: number;             // Projet associé
  dossierIdent: string;          // Identifiant dossier
  lotTravId: number;             // Lot de travaux ID
  lotTravNom: string;            // Libellé lot de travaux
  lmod : Date;					 // Dernière modification
};