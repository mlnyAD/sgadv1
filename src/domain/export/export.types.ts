

import type { Database } from "@/lib/supabase/database.types";

export type ExportFormat = "xlsx";
export type ExportScope = "METIER" | "ADMINSYS";

type PublicViews = Database["public"]["Views"];
export type ExportViewName = keyof PublicViews;

export type ExportFilter =
  | {
      type: "exercice";
      label: string;
      column: string;
    }
  | {
      type: "dateRange";
      label: string;
      fromColumn: string;
      toColumn?: string;
    };

export type ExportColumn = {
  key: string;
  header: string;
};

export type ExportDefinition = {
  key: string;
  label: string;
  view: ExportViewName;
  scope: ExportScope;
  filters?: ExportFilter[];
  columns: ExportColumn[];
  formats: ExportFormat[];
};