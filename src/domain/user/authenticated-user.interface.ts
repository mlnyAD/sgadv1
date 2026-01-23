

// src/domain/user/authenticated-user.interface.ts

import type { ServerUser } from "./server-user.type";

export interface AuthenticatedUser {
  server: ServerUser;

  displayName: string;
  functionLabel: string;

  isAdmin: boolean;
  isClient: boolean;
}

