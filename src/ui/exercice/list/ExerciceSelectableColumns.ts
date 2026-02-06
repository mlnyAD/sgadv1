

import type { ColumnSelectorItem } from "@/components/table/ColumnSelector";

export const ExerciceSelectableColumns: ColumnSelectorItem[] = [
  { key: "id", label: "id exercice", visible: false },
  { key: "code", label: "Code de l'exercice", visible: true },
  { key: "debut", label: "Début de l'exercice", visible: true },
  { key: "fin", label: "Fin de l'exercice", visible: true },
  { key: "actif", label: "Exercice en cours", visible: true },
  { key: "commentaires", label: "Commentaires", visible: false },
  // "actions" toujours visible
];
