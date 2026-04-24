

// src/ui/rapport/sections/TresorerieSection.tsx

import type { RapportTresorerieData } from "@/domain/rapport/types";
import { RapportTable } from "../RapportTable";

function eur(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value) + " €";
}

export function TresorerieSection({ data }: { data: RapportTresorerieData }) {
  return (
    <div className="flex flex-col gap-4">
      <RapportTable
        columns={[
          { key: "nom", header: "Compte" },
          { key: "inclusGlobal", header: "Inclus global", align: "center" },
          { key: "soldeEur", header: "Solde", align: "right" },
        ]}
        rows={[
          ...data.comptes.map((compte) => ({
            nom: compte.nom,
            inclusGlobal: compte.inclusGlobal ? "Oui" : "Non",
            soldeEur: eur(compte.soldeEur),
          })),
          {
            nom: "Total global",
            inclusGlobal: "",
            soldeEur: eur(data.soldeGlobalEur),
          },
        ]}
      />

      {data.tva ? (
        <RapportTable
          columns={[
            { key: "label", header: "TVA" },
            { key: "value", header: "Montant", align: "right" },
          ]}
          rows={[
            { label: "TVA collectée", value: eur(data.tva.tvaCollecteeEur) },
            { label: "TVA déductible", value: eur(data.tva.tvaDeductibleEur) },
            { label: "TVA déjà payée", value: eur(data.tva.tvaDejaPayeeEur) },
            { label: "TVA à payer", value: eur(data.tva.tvaRestanteEur) },
          ]}
        />
      ) : null}

    </div>
  );
}