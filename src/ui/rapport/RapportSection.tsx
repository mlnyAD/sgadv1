


import { RapportTable } from "./RapportTable";
import type {
  RapportChiffreAffairesData,
  RapportSection as RapportSectionType,
} from "@/domain/rapport/types";
import { ChiffreAffairesSection } from "./sections/ChiffreAffairesSection";
import { RapportEmpty } from "./RapportEmpty";
import { AchatsSection } from "./sections/AchatsSection";
import type { RapportAchatsData } from "@/domain/rapport/types";
import { FacturesSection } from "./sections/FacturesSection";
import type { RapportFacturesData } from "@/domain/rapport/types";
import { TresorerieSection } from "./sections/TresorerieSection";
import type { RapportTresorerieData } from "@/domain/rapport/types";
import { RemboursementsSection } from "./sections/RemboursementsSection";
import type { RapportRemboursementsData } from "@/domain/rapport/types";
import { SyntheseFiscaleSection } from "./sections/SyntheseFiscaleSection";
import type { RapportSyntheseFiscaleData } from "@/domain/rapport/types";
import { BilanFinancierSection } from "./sections/BilanFinancierSection";
import type { RapportBilanFinancierData } from "@/domain/rapport/types";

type Props = {
  section: RapportSectionType;
};

export function RapportSection({ section }: Props) {
  return (
    <section className="break-inside-avoid flex flex-col gap-3 rounded-lg border bg-white p-4">
      <h2 className="text-base font-semibold">{section.title}</h2>

      {!section.hasData && <RapportEmpty />}

      {section.hasData && section.key === "chiffreAffaires" && (
        <ChiffreAffairesSection
          data={section.data as RapportChiffreAffairesData}
        />
      )}

      {section.hasData && section.key === "factures" && (
        <FacturesSection data={section.data as RapportFacturesData} />
      )}

      {section.hasData && section.key === "achats" && (
        <AchatsSection data={section.data as RapportAchatsData} />
      )}

      {section.hasData && section.key === "tresorerie" && (
        <TresorerieSection data={section.data as RapportTresorerieData} />
      )}

      {section.hasData && section.key === "remboursements" && (
  <RemboursementsSection
    data={section.data as RapportRemboursementsData}
  />
)}

{section.hasData && section.key === "syntheseFiscale" && (
  <SyntheseFiscaleSection
    data={section.data as RapportSyntheseFiscaleData}
  />
)}

{section.hasData && section.key === "bilanFinancier" && (
  <BilanFinancierSection
    data={section.data as RapportBilanFinancierData}
  />
)}

      {section.hasData &&
        section.key !== "chiffreAffaires" &&
        section.key !== "factures" &&
        section.key !== "achats" &&
        section.key !== "tresorerie" && 
        section.key !== "remboursements" &&
        section.key !== "syntheseFiscale" && 
        section.key !== "bilanFinancier" && (
            <RapportTable
              columns={[
                { key: "libelle", header: "Libellé" },
                { key: "valeur", header: "Valeur" },
              ]}
              rows={[{ libelle: section.title, valeur: "Données à brancher" }]}
            />
          )}
    </section>
  );
}