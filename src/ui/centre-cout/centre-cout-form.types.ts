

/* ------------------------------------------------------------------ */
/* Centre de coût form values                                         */
/* ------------------------------------------------------------------ */

import { CentreCoutFamilleId } from "@/domain/centre-cout/centre-cout-familles.catalog";

export interface CentreCoutFormValues {
  code: string;
  libelle: string;
  familleId: CentreCoutFamilleId;
  commentaires?: string;
  actif: boolean;
}
