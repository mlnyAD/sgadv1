

// map des données de la forme vers le format UI (domain)

import { ClientUI } from "@/domain/client";
import { ClientFormValues } from "./ClientForm";

/* ------------------------------------------------------------------
   Form -> UI
   ------------------------------------------------------------------ */

export function mapClientFormToUI(
  form: ClientFormValues
): ClientUI {
  if (!form.nom || !form.nom.trim()) {
    throw new Error("Nom obligatoire");
  }

  return {
    nom: form.nom.trim(),
    adresse: form.adresse?.trim() || null,
    codePostal: form.codePostal?.trim() || null,
    ville: form.ville?.trim() || null,
    siren: form.siren?.trim() || null,
    status: "WAIT",
  };
}

/* ------------------------------------------------------------------
   UI -> Form
   ------------------------------------------------------------------ */

export function mapClientUIToForm(
  ui?: ClientUI
): ClientFormValues {
  return {
    nom: ui?.nom ?? "",
    adresse: ui?.adresse ?? null,
    codePostal: ui?.codePostal ?? null,
    ville: ui?.ville ?? null,
    siren: ui?.siren ?? null,
  };
}
