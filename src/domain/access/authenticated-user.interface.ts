

// src/domain/access/authenticated-user.interface.ts

import type { DbUser } from "../user/user.interface";
import type { DbUserProfile } from "../user/userprofile.interface";

import type { ClientUI } from "../client/client.ui";
import type { ProjectUI } from "../project/project.ui";

import type { DbUserClientRole } from "../user/roles/user-client-role.interface";
import type { DbUserProjectRole } from "../user/roles/user-project-role.interface";

/**
 * Utilisateur authentifié dans l'application.
 * Agrégat métier construit côté serveur.
 */
export interface AuthenticatedUser {
  /* ------------------------------------------------------------------
     Identité
     ------------------------------------------------------------------ */

  user: DbUser;
  profile: DbUserProfile | null;

  /* ------------------------------------------------------------------
     Rôles (relationnels / DB)
     ------------------------------------------------------------------ */

  clientRoles: DbUserClientRole[];
  projectRoles: DbUserProjectRole[];

  /* ------------------------------------------------------------------
     Périmètre métier
     ------------------------------------------------------------------ */

  /**
   * Clients accessibles par l'utilisateur.
   * → entités métier (portent les états WAIT / ACTIVE / …)
   */
  clients: ClientUI[];

  /**
   * Projets accessibles par l'utilisateur.
   * → entités internes (project_id = integer)
   */
  projects: ProjectUI[];

  /* ------------------------------------------------------------------
     Dérivés
     ------------------------------------------------------------------ */

  /**
   * Dérivé de user.is_system_admin
   */
  isSystemAdmin: boolean;
}
