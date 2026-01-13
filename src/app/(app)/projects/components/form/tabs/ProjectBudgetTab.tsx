"use client";

import { ProjectBudgetField } from "../../fields/finance/ProjectBudgetField";
import { ProjectCommandeHtField } from "../../fields/finance/ProjectCommandeHtField";
import { ProjectDevisHtField } from "../../fields/finance/ProjectDevisHtField";
import type { ProjectFormState } from "../project.form.types";
import type { SelectOption } from "@/components/fields/types";

interface Props {
  project: ProjectFormState;
  onChange: (p: ProjectFormState) => void;
  budgetOptions: SelectOption[];
}

export function ProjectBudgetTab({
  project,
  onChange,
  budgetOptions,
}: Props) {

  return (
    <div>


      <ProjectBudgetField
      value={project.project_budget_id ?? ""}
        options={budgetOptions}
         onChange={(value) =>
          onChange({
            ...project,
            project_budget_id: value,
          })
        }
      />

      <ProjectDevisHtField
        value={project.project_devis_ht}
        onChange={(v) =>
          onChange({ ...project, project_devis_ht: v })
        }
      />

      <ProjectCommandeHtField
        value={project.project_commande_ht}
        onChange={(v) =>
          onChange({ ...project, project_commande_ht: v })
        }
      />
    </div>
  );
}
