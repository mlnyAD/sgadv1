import type { UserRoleId } from "./user-role.type";

export interface DbUserProjectRole {
  user_id: string;    // uuid, FK -> user.id
  project_id: number; // integer, FK -> project.project_id
  role: UserRoleId;   // 1 | 2 | 3 | 4 (PROJECT_ADMIN / USER typiquement)
}
