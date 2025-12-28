
// map des données de la forme vers le format domain

import { SocieteFormValues } from "./SocieteForm";
import { SocieteUI } from "@/domain/societe";


export function mapSocieteFormToUI(
  values: SocieteFormValues
) {
  return {
    nom: values.nom.trim(),
    adresse1: values.adresse1 || null,
    adresse2: values.adresse2 || null,
    adresse3: values.adresse3 || null,
    ville: values.ville || null,
    codePostal: values.codePostal || null,
  };
}

export function mapSocieteUIToForm(
  ui?: SocieteUI
): SocieteFormValues {
  return {
    nom: ui?.nom ?? "",
    adresse1: ui?.adresse1 ?? "",
    adresse2: ui?.adresse2 ?? "",
    adresse3: ui?.adresse3 ?? "",
    ville: ui?.ville ?? "",
    codePostal: ui?.codePostal ?? "",
  };
}