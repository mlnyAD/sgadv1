

import { ProjectForm } from "../components/form/ProjectForm";
import { getSocietesForSelect } from "@/domain/societe/societe.repository";
import { getConfigsByType } from "@/domain/config/config.repository";

export default async function ProjectCreatePage() {
  const societes = await getSocietesForSelect();

  const moaOptions = societes.map((s) => ({
    value: s.societe_id.toString(),
    label: s.societe_nom,
  }));

  const ouvrageOptions = (await getConfigsByType(6)).map((c) => ({
    value: c.config_id!.toString(),
    label: c.config_nom,
  }));

  const motifOptions = (await getConfigsByType(7)).map((c) => ({
    value: c.config_id!.toString(),
    label: c.config_nom,
  }));

  const budgetOptions = (await getConfigsByType(4)).map((c) => ({
    value: c.config_id!.toString(),
    label: c.config_nom,
  }));

  return (
    <ProjectForm
      mode="create"
      initialProject={{
        project_nom: "",
        project_ident: "",
        project_descript: null,
        project_adresse: null,
        project_code_postal: null,
        project_ville: null,
        project_status_id: null,
        project_moa_id: null,
        project_pilote: null,
        project_responsable: null,
        project_commentaires: null,
        project_ouvrage_id: null,
        project_motif_id: null,
        project_budget_id: null,
        project_devis_ht: null,
        project_commande_ht: null,
      }}
      moaOptions={moaOptions}
      ouvrageOptions={ouvrageOptions}
      motifOptions={motifOptions}
      budgetOptions={budgetOptions}
    />
  );
}
