// src/domain/operateur/auth-user.type.ts

export interface AuthUser {
  id: string;
  email: string;
  role: "admin" | "client";
  firstName?: string;
  lastName?: string;
}
