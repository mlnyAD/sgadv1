

// src/domain/centre-cout/centre-cout-familles.catalog.ts

export const CENTRE_COUT_FAMILLES = [
  { id: 1, code: "1", libelle: "1 - Charges admin." },
  { id: 2, code: "2", libelle: "2 - Honor. admin. tiers" },
  { id: 3, code: "3", libelle: "3 - Charges opération." },
  { id: 4, code: "4", libelle: "4 - Honor. opération." },
  { id: 5, code: "5", libelle: "5 - Opérations" },
  { id: 6, code: "6", libelle: "6 - Commerce" },
  { id: 7, code: "7", libelle: "7 - Charges sociales" },
  { id: 8, code: "8", libelle: "8 - Autres" },  
] as const;

export type CentreCoutFamilleId =
  typeof CENTRE_COUT_FAMILLES[number]["id"];

export function getFamilleById(id: CentreCoutFamilleId) {
  return CENTRE_COUT_FAMILLES.find(f => f.id === id);
}

export function toCentreCoutFamilleId(id: number): CentreCoutFamilleId {
  const found = CENTRE_COUT_FAMILLES.find((f) => f.id === id);
  return (found?.id ?? 8) as CentreCoutFamilleId; // fallback "Autres"
}