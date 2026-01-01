
/* Type d'une configuration */
export const CONFIG_TYPE_CATALOG  = [
  { id: 1, label: "Type de document" },
  { id: 2, label: "Rôle d'une société" },
  { id: 3, label: "Métier d'un opérateur" },
  { id: 4, label: "Rubrique budgétaire" },
  { id: 5, label: "Composant d'un lot" },
  { id: 6, label: "Ouvrage" },
  { id: 7, label: "Motif" },
  { id: 8, label: "Type de réunion" },  // ← mis à jour
] as const;

export type ConfigTypeId = (typeof CONFIG_TYPE_CATALOG) [number]["id"];