import type { ReactNode } from "react";

export type TableTitleProps = {
  children?: ReactNode;
  name?: string; // ← ajouter ceci si vous voulez passer name=""
};

export function TableTitle({ name, children }: TableTitleProps) {
  return (
    <h2 className="text-xl font-bold text-ad-dark">
      {name ?? children}
    </h2>
  );
}
