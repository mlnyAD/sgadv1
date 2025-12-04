import type { DbUser } from "../user/user.interface";
import type { DbUserProfile } from "../user/userprofile.interface";
import type { DbClient } from "../client/client.interface";
import type { DbProject } from "../project/project.interface";
import type { DbUserClientRole } from "../user/roles/user-client-role.interface";
import type { DbUserProjectRole } from "../user/roles/user-project-role.interface";

export interface AuthenticatedUser {
  user: DbUser;
  profile: DbUserProfile | null;

  clientRoles: DbUserClientRole[];    // Rôles de l'utilisateur par client
  projectRoles: DbUserProjectRole[];  // Rôles de l'utilisateur par projet

  clients: DbClient[];                // Clients accessibles
  projects: DbProject[];              // Projets accessibles

  isSystemAdmin: boolean;             // Dérivé de user.is_system_admin
}
