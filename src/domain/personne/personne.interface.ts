export interface DbPersonne {
  persId: number;
  profileId: number | null;
  updatedAt: string | null;
  userId: string | null;         // UUID supabase auth
  oldId?: number | null;         // historique, peut disparaître plus tard
  fonctionId: number | null;     // ou métier interne
  metierId: number | null;       // métier "professionnel"
  persAvecCompte: boolean;
  nom: string;
  prenom: string;
  email: string;
};
