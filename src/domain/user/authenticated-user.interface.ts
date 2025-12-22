// src/domain/user/authenticated-user.interface.ts
export interface AuthenticatedUser {
  id: string;
  email: string;

  // Rôles
  isSystemAdmin: boolean;
  isClientAdmin: boolean;
  isProjectAdmin: boolean;
  isUser: boolean;

  // Affectations
  clientIds: number[];
  projectIds: number[];

  // Informations supplémentaires UI
  displayName: string;
  welcomeMessage: string;

  functionLabel: string;   // <= AJOUT ICI
      // --- flags métier ---
  //  isActive: true,
  //  isExternal: false,
  
    // --- collections ---
  //  roles: [],
  //  permissions: [],


}
