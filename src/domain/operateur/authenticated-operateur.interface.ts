

// src/domain/operateur/authenticated-operateur.interface.ts

/**
 * Représente l’opérateur actuellement authentifié
 * (identité + périmètre d’accès).
 *
 * ⚠️ Source de vérité UNIQUE pour la session opérateur.
 */
export interface AuthenticatedOperateur {
  operId: string;
  email: string;

  nom: string | null;
  prenom: string | null;

  isAdminSys: boolean;
  isActif: boolean;
  mustChangePassword: boolean;

  /** Clients accessibles (vide si admin système) */
  clientIds: string[];
}