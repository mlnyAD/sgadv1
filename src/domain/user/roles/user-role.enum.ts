		/* Fonctions d'un opérateur */
export const USER_ROLES = {
  SYSTEM_ADMIN: { id: 1, label: "Administrateur système" },
  CLIENT_ADMIN: { id: 2, label: "Administrateur client" },
  PROJECT_ADMIN: { id: 3, label: "Administrateur projet" },
  USER: { id: 4, label: "Utilisateur" },
} as const;

export type UserRoleKey = keyof typeof USER_ROLES;

export type UserRoleId = (typeof USER_ROLES)[UserRoleKey]["id"];
