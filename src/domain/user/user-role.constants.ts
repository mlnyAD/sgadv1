

export const USER_ROLES = {

  ADMIN: { key: "admin", label: "Administrateur système" },
  CLIENT: { key: "client", id: 2, label: "Utilisateur" },

} as const;

export type UserRoleKey = typeof USER_ROLES[keyof typeof USER_ROLES]["key"];

