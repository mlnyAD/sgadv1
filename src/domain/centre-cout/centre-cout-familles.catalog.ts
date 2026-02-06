

// src/domain/centre-cout/centre-cout-familles.catalog.ts

export const CENTRE_COUT_FAMILLES = [
  { id: 1, code: "1", libelle: "Charges administratives" },
  { id: 2, code: "2", libelle: "Honoraires administratifs tiers" },
  { id: 3, code: "3", libelle: "Charges opérationnelles" },
  { id: 4, code: "4", libelle: "Honoraires opérationnels" },
  { id: 5, code: "5", libelle: "Opérations" },
  { id: 6, code: "6", libelle: "Commerce" },
  { id: 7, code: "7", libelle: "Charges sociales" },
  { id: 8, code: "8", libelle: "Autres" },  
] as const;

export type CentreCoutFamilleId =
  typeof CENTRE_COUT_FAMILLES[number]["id"];

export function getFamilleById(id: CentreCoutFamilleId) {
  return CENTRE_COUT_FAMILLES.find(f => f.id === id);
}
