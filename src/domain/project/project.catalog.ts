		/* Etats d'un projet */
// domain/project/project.catalog.ts

export const PROJECT_STATUS_CATALOG = [
  { id: 1, code: "UPCOMING", label: "À venir" },
  { id: 2, code: "IN_PROGRESS", label: "En cours" },
  { id: 3, code: "ON_HOLD", label: "En cours" },
  { id: 4, code: "DONE", label: "Terminé" },
  { id: 5, code: "VALIDATION", label: "En cours" },
  { id: 6, code: "ARCHIVED", label: "Terminé" },
  { id: 7, code: "CANCELLED", label: "Terminé" },
] as const;

export type ProjectStatusId = (typeof PROJECT_STATUS_CATALOG) [number]["id"];

export const PROJECT_STATUS_GROUPS = {
  UPCOMING: [1],
  ONGOING: [2, 3, 5],
  DONE: [4, 6, 7],
} as const;
