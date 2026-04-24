

// src/ui/rapport/sections/ChiffreAffairesSection.tsx

import type { RapportChiffreAffairesData } from "@/domain/rapport/types";
import { RapportTable } from "../RapportTable";

function eur(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value) + " €";
}

function pct(value: number | null): string {
  if (value === null) return "-";
  return `${value.toFixed(1)} %`;
}

type Props = {
  data: RapportChiffreAffairesData;
};

export function ChiffreAffairesSection({ data }: Props) {
  return (
    <RapportTable
      columns={[
        { key: "label", header: "Indicateur" },
        { key: "value", header: "Valeur", align: "right" },
      ]}
      rows={[
        {
          label: "Chiffre d’affaires budgété",
          value: eur(data.totalBudgetEur),
        },
        {
          label: "Chiffre d’affaires réalisé",
          value: eur(data.totalRealizedEur),
        },
        {
          label: "Écart",
          value: eur(data.ecartEur),
        },
        {
          label: "Taux de réalisation",
          value: pct(data.pctRealise),
        },
      ]}
    />
  );
}