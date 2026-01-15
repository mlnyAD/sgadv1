

// Etats d'un lot de travaux 


export const LOTTRAV_STATUS_CATALOG = [
  { id: 1, label: "A venir" },
  { id: 2, label: "En cours" },
  { id: 3, label: "Terminé" },
  {	id: 4, label: "A réceptionner",},
  { id: 5, label: "Réceptionné" },
  {	id: 6, label: "Abandonné" },
] as const;


export type LotTravStatusId =
  (typeof LOTTRAV_STATUS_CATALOG)[number]["id"];


export function getLotTravStatusLabel(id: LotTravStatusId): string {
  return LOTTRAV_STATUS_CATALOG.find(s => s.id === id)?.label ?? "Inconnu";
}

export const LOTTRAV_STATUS_OPTIONS = LOTTRAV_STATUS_CATALOG.map(s => ({
  id: s.id,
  label: s.label,
}));