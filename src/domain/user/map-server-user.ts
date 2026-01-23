

// src/domain/user/map-server-user.ts

import type { ServerUser } from "./server-user.type";
import type { AuthenticatedUser } from "./authenticated-user.interface";

export function mapServerUserToAuthenticatedUser(
  serverUser: ServerUser
): AuthenticatedUser {
  const displayName =
    serverUser.firstName && serverUser.lastName
      ? `${serverUser.firstName} ${serverUser.lastName}`
      : serverUser.email.split("@")[0];

  const isAdmin = serverUser.role === "admin";

  return {
    server: serverUser,

    displayName,
    functionLabel: isAdmin
      ? "Administrateur système"
      : "Utilisateur",

    isAdmin,
    isClient: !isAdmin,
  };
}
