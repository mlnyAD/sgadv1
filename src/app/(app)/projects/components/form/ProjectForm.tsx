

"use client";

import { useState } from "react";
import type { ProjectDbRow } from "@/domain/project/project.db";

import {
  Tabs,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ProjectFormTabs } from "./ProjectFormTabs";
import { ProjectFormActions } from "./ProjectFormActions";

import { ProjectGeneralTab } from "./tabs/ProjectGeneralTab";
import { ProjectIntervenantsTab } from "./tabs/ProjectIntervenantsTab";

interface ProjectFormProps {
  mode: "create" | "edit";
  initialProject: ProjectDbRow;
  projectId?: number;
  moaOptions: {
    id: number;
    label: string;
  }[];
}


export function ProjectForm({
  mode,
  initialProject,
  projectId,
  moaOptions,
}: ProjectFormProps) {
  // State métier global
  const [project, setProject] =
    useState<ProjectDbRow>(initialProject);

  // Onglet actif (UI only)
  /*const [activeTab, setActiveTab] = useState<
    "general" | "intervenants" | "calendrier" | "motifs"| "finance" | "options"
  >("general");
*/
const [activeTab, setActiveTab] = useState<string>("general");

  console.log("ProjectForm moaOptions = ", moaOptions);
  
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
        {/* Tabs shadcn pilotent TOUT : triggers + contenus */}
        <Tabs value={activeTab}   onValueChange={setActiveTab}>
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
            <div className="text-sm text-muted-foreground">
              Calendrier
            </div>
          </TabsContent>

          <TabsContent value="motifs" className="mt-4">
            <div className="text-sm text-muted-foreground">
              Motifs
            </div>
          </TabsContent>

          <TabsContent value="finance" className="mt-4">
            <div className="text-sm text-muted-foreground">
              Finances
            </div>
          </TabsContent>

          <TabsContent value="options" className="mt-4">
            <div className="text-sm text-muted-foreground">
              Options
            </div>
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
