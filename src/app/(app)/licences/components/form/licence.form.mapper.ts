// map des données de la forme vers le format UI (domain)

import type { LicenceUI } from "@/domain/licence";
import type { LicenceFormValues } from "@/domain/licence/licence.form.types";
import { getTodayISO, addDaysISO } from "@/helpers/date";

/* ------------------------------------------------------------------
   Form -> UI
   ------------------------------------------------------------------ */

export function mapLicenceFormToUI(
  form: LicenceFormValues
): LicenceUI {
  if (!form.clientId) {
    throw new Error("Client obligatoire");
  }

  if (!form.status) {
    throw new Error("Statut obligatoire");
  }

  if (!form.startDate) {
    throw new Error("Date de début obligatoire");
  }

  return {
    id: "",
    clientId: form.clientId,
    clientLabel: "",
    nom: form.nom.trim(),
    status: form.status,
    startDate: form.startDate,
    endDate: form.endDate ?? null,
  };
}

/* ------------------------------------------------------------------
   UI -> Form
   ------------------------------------------------------------------ */

export function mapLicenceUIToForm(
  ui: LicenceUI
): LicenceFormValues {
  return {
    nom: ui.nom,

    clientId: ui.clientId,
    status: ui.status,

    startDate: ui.startDate ?? getTodayISO(),
    endDate: ui.endDate ?? addDaysISO(365),
  };
}
