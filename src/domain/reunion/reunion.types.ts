export type ReunionType = {
  reunionId: number;             // Identifiant de la réunion
  reunionObjet: string;          // Objet / sujet de la réunion
  reunionDateHeure: Date;        // Date + heure (objet Date)
  reunionDuree: number;          // Durée en minutes ou heures
  reunionAdresse: string;        // Adresse physique
  reunionPiloteId: number;       // ID du pilote (responsable)
  reunionTypeId: number;         // Type ID
  reunionEtatId: number;         // État ID
  reunionCR: boolean;            // Compte-rendu réalisé ?
  reunionCommentaires: string;   // Commentaires libres
  projectId: number;             // Projet associé
  lotTravId: number;             // Lot de travaux ID
};