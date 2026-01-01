// map des données de la forme vers le format UI (domain)

import { ConfigUI, ConfigTypeId } from "@/domain/config";
import { ConfigFormValues } from "./ConfigForm";


/* ------------------------------------------------------------------
   Form -> UI
   ------------------------------------------------------------------ */

export function mapConfigFormToUI(
  form: ConfigFormValues
) {
  if (form.typeId === null) {
  throw new Error("Type obligatoire");
}

  return {
    nom: form.nom.trim(),
    typeId: Number(form.typeId),
  };
}


/* ------------------------------------------------------------------
   UI -> Form
   ------------------------------------------------------------------ */

export function mapConfigUIToForm(
  ui?: ConfigUI
): ConfigFormValues {
  return {
    nom: ui?.nom ?? "",
    typeId: ui?.typeId !== undefined
      ? (ui.typeId as ConfigTypeId)
      : null,
  };
}