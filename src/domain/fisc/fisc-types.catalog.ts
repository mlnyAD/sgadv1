

// src/domain/fisc/fisc-types.catalog.ts

export const FISC_TYPES = [
  { id: 1, code: "1", libelle: "TVA" },
  { id: 2, code: "2", libelle: "IS" },
  { id: 3, code: "3", libelle: "RCM" },
  { id: 4, code: "4", libelle: "CFE" },
  { id: 5, code: "5", libelle: "Autre" },
] as const;

export type FiscTypeId =
  typeof FISC_TYPES[number]["id"];

export function getFiscTypeById(id: number) {
  return FISC_TYPES.find((f) => f.id === id) ?? null;
}


export function toFiscTypeId(id: number): FiscTypeId {
  const found = FISC_TYPES.find((f) => f.id === id);
  return (found?.id ?? 5) as FiscTypeId; 
}