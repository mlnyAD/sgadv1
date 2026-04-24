

// src/ui/rapport/sections/FacturesSection.tsx

import type { RapportFacturesData } from "@/domain/rapport/types";
import { RapportTable } from "../RapportTable";

function eur(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value) + " €";
}

export function FacturesSection({ data }: { data: RapportFacturesData }) {
  return (
    <RapportTable
      columns={[
        { key: "label", header: "Indicateur" },
        { key: "value", header: "Montant HT", align: "right" },
      ]}
      rows={[
        { label: "Factures émises", value: eur(data.emisesEur) },
        { label: "Factures payées", value: eur(data.payeesEur) },
        { label: "Factures en attente", value: eur(data.enAttenteEur) },
        { label: "Factures en retard", value: eur(data.enRetardEur) },
      ]}
    />
  );
}