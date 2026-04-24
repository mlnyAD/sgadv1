

import type { RapportAchatsData } from "@/domain/rapport/types";
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

export function AchatsSection({ data }: { data: RapportAchatsData }) {
  return (
    <RapportTable
      columns={[
        { key: "label", header: "Indicateur" },
        { key: "value", header: "Valeur", align: "right" },
      ]}
      rows={[
        {
          label: "Achats budgétés",
          value: eur(data.totalBudgetEur),
        },
        {
          label: "Achats réalisés",
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
