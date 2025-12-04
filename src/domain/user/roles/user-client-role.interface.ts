import type { UserRoleId } from "./user-role.type";

export interface DbUserClientRole {
  user_id: string;   // uuid, FK -> user.id
  client_id: string; // uuid, FK -> client.id
  role: UserRoleId;  // 1 | 2 | 3 | 4 (en pratique : CLIENT_ADMIN pour cette table)
}
