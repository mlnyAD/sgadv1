

// src/ui/rapport/sections/RemboursementsSection.tsx

import type { RapportRemboursementsData } from "@/domain/rapport/types";
import { RapportTable } from "../RapportTable";

function eur(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value) + " €";
}

export function RemboursementsSection({
  data,
}: {
  data: RapportRemboursementsData;
}) {
  return (
    <RapportTable
      columns={[
        { key: "label", header: "Indicateur" },
        { key: "value", header: "Montant", align: "right" },
      ]}
      rows={[
        { label: "Montant à rembourser", value: eur(data.toRefundAmount) },
        { label: "Remboursé", value: eur(data.refundedAmount) },
        { label: "Reste à rembourser", value: eur(data.remainingAmount) },
      ]}
    />
  );
}