

import type { ClientFormValues } from "@/ui/client/client-form.types";
import type { ClientUI } from "@/domain/client/client-types";

/**
 * Mapping Form → ClientUI
 * - Le form fournit toujours des strings
 * - Le modèle UI accepte null/optionnel
 */
export function mapClientFormToUI(
  form: ClientFormValues
): ClientUI {
  return {
    // id absent à la création, fourni séparément à l’update
    id: "",

    nom: form.nom,
    code: form.code,

    adresse: form.adresse || null,
    codePostal: form.codePostal || null,
    ville: form.ville || null,
    pays: form.pays || null,

    email: form.email || null,
    telephone: form.telephone || null,

    actif: form.actif,
  };
}
