

"use client";

import { useProjectContextStore } from "@/store/sessionStore";

export default function HeaderInfo() {
  const { projectNom, projectIdent } =
    useProjectContextStore();

  if (!projectNom) {
    return null; // pas dans un projet
  }

  return (
    <div className="hidden md:flex flex-1 items-center text-sm text-muted-foreground">
      <span className="font-medium text-foreground">
        {projectNom}
      </span>
      {projectIdent && (
        <span className="ml-2">
          ({projectIdent})
        </span>
      )}
    </div>
  );
}
