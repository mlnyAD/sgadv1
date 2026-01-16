// src/components/Header/HeaderProjet.tsx
"use client";

export default function HeaderProject() {
  const projectName = process.env.NEXT_PUBLIC_PROJECTNAME ?? "EasyProject V2";

  return (
    <h1 className="text-lg font-bold tracking-tight text-foreground">
      {projectName}
    </h1>
  );
}
