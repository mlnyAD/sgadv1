

"use client";

import {
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export function ProjectFormTabs() {
  return (
    <TabsList>
      <TabsTrigger value="general">
        Général
      </TabsTrigger>
      <TabsTrigger value="intervenants">
        Intervenants
      </TabsTrigger>
      <TabsTrigger value="calendrier">
        Calendrier
      </TabsTrigger>
      <TabsTrigger value="motifs">
        Motifs
      </TabsTrigger>
      <TabsTrigger value="finance">
        Financier
      </TabsTrigger>
      <TabsTrigger value="options">
        Options
      </TabsTrigger>
    </TabsList>
  );
}
