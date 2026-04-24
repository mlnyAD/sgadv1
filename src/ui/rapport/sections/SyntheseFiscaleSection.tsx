

import type { RapportSyntheseFiscaleData } from "@/domain/rapport/types";
import { RapportTable } from "../RapportTable";

function eur(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value) + " €";
}

export function SyntheseFiscaleSection({
  data,
}: {
  data: RapportSyntheseFiscaleData;
}) {
  return (
    <RapportTable
      columns={[
        { key: "libelle", header: "Famille fiscale" },
        { key: "montant", header: "Montant", align: "right" },
      ]}
      rows={[
        ...data.rows.map((row) => ({
          libelle: row.libelle,
          montant: eur(row.montantEur),
        })),
        {
          libelle: "Total",
          montant: eur(data.totalEur),
        },
      ]}
    />
  );
}