import { USER_ROLES } from "./user-role.enum";

export type UserRoleKey = keyof typeof USER_ROLES;

export type UserRoleId = (typeof USER_ROLES)[UserRoleKey]["id"]; // 1 | 2 | 3 | 4

export interface UserRole {
  id: UserRoleId;
  label: string;
}

// Map pratique id -> rôle
export const USER_ROLE_BY_ID = new Map<UserRoleId, UserRole>(
  Object.values(USER_ROLES).map((r) => [r.id, r])
);

// Helpers de lecture
export const isSystemAdminRoleId = (roleId: number): roleId is 1 =>
  roleId === USER_ROLES.SYSTEM_ADMIN.id;

export const isClientAdminRoleId = (roleId: number): roleId is 2 =>
  roleId === USER_ROLES.CLIENT_ADMIN.id;

export const isProjectAdminRoleId = (roleId: number): roleId is 3 =>
  roleId === USER_ROLES.PROJECT_ADMIN.id;

export const isUserRoleId = (roleId: number): roleId is 4 =>
  roleId === USER_ROLES.USER.id;
