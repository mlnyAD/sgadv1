

// src/domain/user/server-user.type.ts

export type UserRoleKey = "admin" | "client";

export interface ServerUser {
  id: string;
  email: string;

  role: UserRoleKey; // 🔥 PLUS de role_id

  firstName?: string;
  lastName?: string;

}