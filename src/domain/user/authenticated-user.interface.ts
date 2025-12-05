// src/domain/user/authenticated-user.interface.ts

export interface AuthenticatedUser {
  id: string;                         // Supabase user.id (UUID)
  email: string;

  // Roles opérateurs
  isSystemAdmin: boolean;             // rôle 1
  isClientAdmin: boolean;             // rôle 2
  isProjectAdmin: boolean;            // rôle 3
  isUser: boolean;                    // rôle 4 (toujours true)

  // Affectations (gérées via tes tables userclientrole, userprojectrole)
  clientIds: number[];
  projectIds: number[];

  // Informations supplémentaires pour UI
  displayName: string;                // éventuellement nom + prénom
  welcomeMessage: string;             // utilisé au login
}
