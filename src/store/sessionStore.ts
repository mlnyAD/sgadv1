

import { create } from "zustand";

interface ProjectContextState {
  projectId: number | null;
  projectNom: string | null;
  projectIdent: string | null;

  setProjectContext: (data: {
    projectId: number;
    projectNom: string | null;
    projectIdent: string | null;
  }) => void;

  clearProjectContext: () => void;
}

export const useProjectContextStore = create<ProjectContextState>((set) => ({
  projectId: null,
  projectNom: null,
  projectIdent: null,

  setProjectContext: (data) =>
    set({
      projectId: data.projectId,
      projectNom: data.projectNom,
      projectIdent: data.projectIdent,
    }),

  clearProjectContext: () =>
    set({
      projectId: null,
      projectNom: null,
      projectIdent: null,
    }),
}));
