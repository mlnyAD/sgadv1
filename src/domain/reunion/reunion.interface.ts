export interface DbReunion {
  reunionId: number;
  reunionObjet: string;
  reunionDateHeure: string;  // ISO string côté API Supabase
  reunionDuree: number;
  reunionAdresse: string;
  
  reunionPiloteId: number;
  reunionTypeId: number;
  reunionEtatId: number;
  
  reunionCR: boolean;
  reunionCommentaires: string;
  
  projectId: number;
  lottravId: number;
};
