

// src/domain/client/client.catalog.ts

// src/domain/client/client.catalog.ts

export const CLIENT_STATUS_CATALOG = [
  { id: "WAIT",   label: "En attente" },
  { id: "ACTIVE",  label: "Actif" },
  { id: "SUSPEND", label: "Suspendu" },
  { id: "CLOSED",  label: "Clôturé" },
] as const;

export type ClientStatus = (typeof CLIENT_STATUS_CATALOG)[number]["id"];
