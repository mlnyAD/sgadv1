

"use client";

import { useState } from "react";

import type { ProjectDbRow } from "@/domain/project/project.db";
import type { SelectOption } from "@/components/fields/types";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ProjectFormTabs } from "./ProjectFormTabs";
import { ProjectFormActions } from "./ProjectFormActions";

import { ProjectGeneralTab } from "./tabs/ProjectGeneralTab";
import { ProjectIntervenantsTab } from "./tabs/ProjectIntervenantsTab";
import { ProjectCalendarTab } from "./tabs/ProjectCalendarTab";
import { ProjectMotifsTab } from "./tabs/ProjectMotifsTab";
import { ProjectBudgetTab } from "./tabs/ProjectBudgetTab";
import { ProjectOptionsTab } from "./tabs/ProjectOptionsTab";

import { ProjectFormState } from "./project.form.types"
import { mapProjectDbToForm } from "./project.form.mapper";

/* ------------------------------------------------------------------
   Props
   ------------------------------------------------------------------ */

export interface ProjectFormProps {
  mode: "create" | "edit";
  projectId?: number;
  initialProject: ProjectDbRow;

  moaOptions: SelectOption[];
  ouvrageOptions: SelectOption[];
  motifOptions: SelectOption[];
  budgetOptions: SelectOption[];
}

/* ------------------------------------------------------------------
   Component
   ------------------------------------------------------------------ */

export function ProjectForm({
  mode,
  projectId,
  initialProject,
  moaOptions,
  ouvrageOptions,
  motifOptions,
  budgetOptions,
}: ProjectFormProps) {
  /* ------------------------------------------------------------------
     State (unique source of truth)
     ------------------------------------------------------------------ */

  const [project, setProject] = useState<ProjectFormState>(() =>
    mapProjectDbToForm(initialProject)
  );

  const [activeTab, setActiveTab] = useState<string>("general");

  /* ------------------------------------------------------------------
     Render
     ------------------------------------------------------------------ */

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>
          {mode === "create"
            ? "Nouveau projet"
            : "Modification du projet"}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <ProjectFormTabs />

          <TabsContent value="general" className="mt-4">
            <ProjectGeneralTab
              project={project}
              onChange={setProject}
            />
          </TabsContent>

          <TabsContent value="intervenants" className="mt-4">
            <ProjectIntervenantsTab
              project={project}
              onChange={setProject}
              moaOptions={moaOptions}
            />
          </TabsContent>

          <TabsContent value="calendrier" className="mt-4">
            <ProjectCalendarTab
              project={project}
              onChange={setProject}
            />
          </TabsContent>

          <TabsContent value="motifs" className="mt-4">
            <ProjectMotifsTab
              project={project}
              onChange={setProject}
              ouvrageOptions={ouvrageOptions}
              motifOptions={motifOptions}
            />
          </TabsContent>

          <TabsContent value="finance" className="mt-4">
            <ProjectBudgetTab
              project={project}
              onChange={setProject}
              budgetOptions={budgetOptions}
            />
          </TabsContent>

          <TabsContent value="options" className="mt-4">
            <ProjectOptionsTab
              project={project}
              onChange={setProject}
            />
          </TabsContent>
        </Tabs>

        {/* Actions globales */}
        <ProjectFormActions
          mode={mode}
          project={project}
          projectId={projectId}
        />
      </CardContent>
    </Card>
  );
}
