

import type { RapportFilters, RapportSection } from "../types";

type RawRapportData = {
  chiffreAffaires?: unknown;
  factures?: unknown;
  achats?: unknown;
  tresorerie?: unknown;
  remboursements?: unknown;
  syntheseFiscale?: unknown;
  bilanFinancier?: unknown;
  detailBudget?: unknown;
};

export function buildRapportSections(
  filters: RapportFilters,
  raw: RawRapportData,
): RapportSection[] {
  const hasOption = (key: RapportFilters["options"][number]) =>
    filters.options.includes(key);

  return [
    {
      key: "chiffreAffaires",
      title: "Chiffre d’affaires",
      required: true,
      visible: true,
      hasData: Boolean(raw.chiffreAffaires),
      data: raw.chiffreAffaires ?? null,
    },
    {
      key: "factures",
      title: "Factures",
      required: true,
      visible: true,
      hasData: Boolean(raw.factures),
      data: raw.factures ?? null,
    },
    {
      key: "achats",
      title: "Achats",
      required: true,
      visible: true,
      hasData: Boolean(raw.achats),
      data: raw.achats ?? null,
    },
    {
      key: "tresorerie",
      title: "Trésorerie",
      required: true,
      visible: true,
      hasData: Boolean(raw.tresorerie),
      data: raw.tresorerie ?? null,
    },
    {
      key: "remboursements",
      title: "État des remboursements",
      required: true,
      visible: true,
      hasData: Boolean(raw.remboursements),
      data: raw.remboursements ?? null,
    },
    {
      key: "syntheseFiscale",
      title: "Synthèse fiscale",
      required: true,
      visible: true,
      hasData: Boolean(raw.syntheseFiscale),
      data: raw.syntheseFiscale ?? null,
    },
    {
      key: "bilanFinancier",
      title: "Bilan financier",
      required: false,
      visible: hasOption("bilanFinancier"),
      hasData: Boolean(raw.bilanFinancier),
      data: raw.bilanFinancier ?? null,
    },
    {
      key: "detailBudget",
      title: "Détail du budget (achats et ventes)",
      required: false,
      visible: hasOption("detailBudget"),
      hasData: Boolean(raw.detailBudget),
      data: raw.detailBudget ?? null,
    },
  ];
}