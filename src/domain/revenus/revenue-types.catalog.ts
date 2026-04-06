

// src/domain/revenus/revenue-types.catalog.ts

export const REVENUE_TYPES = [
  { id: 1, code: "1", libelle: "---" },
  { id: 2, code: "2", libelle: "Trvx" },
  { id: 3, code: "3", libelle: "Autre" },
] as const;

export type RevenueType = (typeof REVENUE_TYPES)[number];
export type RevenueTypeId = RevenueType["id"];

export function getRevenueTypeById(id: number): RevenueType | null {
  return REVENUE_TYPES.find((item) => item.id === id) ?? null;
}

export function isRevenueTypeId(id: number): id is RevenueTypeId {
  return REVENUE_TYPES.some((item) => item.id === id);
}

export function toRevenueTypeId(id: number): RevenueTypeId | null {
  return isRevenueTypeId(id) ? id : null;
}