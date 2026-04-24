

// src/ui/rapport/sections/BilanFinancierSection.tsx

import type { RapportBilanFinancierData } from "@/domain/rapport/types";
import { RapportTable } from "../RapportTable";

function eur(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value) + " €";
}

export function BilanFinancierSection({
  data,
}: {
  data: RapportBilanFinancierData;
}) {
  return (
    <RapportTable
      columns={[
        { key: "indicateur", header: "Indicateur" },
        { key: "budget", header: "Selon budget", align: "right" },
        { key: "toDate", header: "Bilan à date", align: "right" },
      ]}
      rows={data.rows.map((row) => ({
        indicateur: row.indicateur,
        budget: eur(row.budgetEur),
        toDate: eur(row.toDateEur),
      }))}
    />
  );
}