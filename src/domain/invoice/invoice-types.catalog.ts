

// src/domain/invoice/invoice-types.catalog.ts
/*
* INVOICE_TYPES
*/

export const INVOICE_TYPES = [
  { id: 1, code: "1", libelle: "Ventes" },
  { id: 2, code: "2", libelle: "Achats" },
] as const;

export type InvoiceTypeId =
  typeof INVOICE_TYPES[number]["id"];

export function getInvoiceTypeById(id: InvoiceTypeId) {
  return INVOICE_TYPES.find(f => f.id === id);
}

export function toInvoiceTypeId(id: number): InvoiceTypeId {
  const found = INVOICE_TYPES.find((f) => f.id === id);
  return (found?.id ?? 3) as InvoiceTypeId; // fallback "Autres"
}

/*
* REVENUE_TYPES
*/

export const REVENUE_TYPES = [
  { id: 1, code: "1", libelle: "---" },
  { id: 2, code: "2", libelle: "Trvx" },
  { id: 3, code: "3", libelle: "Autre" },
] as const;

export type RevenueTypeId =
  typeof REVENUE_TYPES[number]["id"];

export function getRevenueTypeById(id: RevenueTypeId) {
  return REVENUE_TYPES.find(f => f.id === id);
}

export function toRevenueTypeId(id: number): RevenueTypeId {
  const found = REVENUE_TYPES.find((f) => f.id === id);
  return (found?.id ?? null) as RevenueTypeId; // fallback
}