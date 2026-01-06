

// src/domain/licence/licence.catalog.ts

export const LICENCE_STATUS_CATALOG = [
  { id: "PENDING",   label: "En attente" },
  { id: "ACTIVE",    label: "Active" },
  { id: "SUSPENDED", label: "Suspendue" },
  { id: "EXPIRED",   label: "Expirée" },
] as const;

export type LicenceStatus =
  (typeof LICENCE_STATUS_CATALOG)[number]["id"];
