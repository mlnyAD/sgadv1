// src/components/Header/HeaderProjet.tsx
"use client";

export default function HeaderProjet() {
  const projectName = process.env.NEXT_PUBLIC_PROJECTNAME ?? "Easy Projet";

  return (
    <h1 className="text-lg font-bold tracking-tight text-foreground">
      {projectName}
    </h1>
  );
}
