

// src/domain/licence/licence.catalog.ts

export const LICENCE_STATUS_CATALOG = [
  { id: "INACTIVE", label: "Inactive" },
  { id: "ACTIVE",   label: "Active" },
  { id: "SUSPEND",  label: "Suspendue" },
  { id: "EXPIRED",  label: "Expirée" },
] as const;

export type LicenceStatus =
  (typeof LICENCE_STATUS_CATALOG)[number]["id"];
