

// src/domain/export/export-view.repository.ts

import "server-only";

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import {
  getExportViewConfig,
  type ExportViewKey,
} from "./export-view.catalog";

export async function listExportViewRows(params: {
  viewKey: ExportViewKey;
  cltId: string;
  exerId?: string;
}): Promise<Record<string, unknown>[]> {
  const config = getExportViewConfig(params.viewKey);

  if (!config) {
    throw new Error("Vue d'export inconnue.");
  }

  const supabase = await createSupabaseServerReadClient();

  let query = supabase.from(config.viewName).select("*");

  query = query.eq(config.filters.client, params.cltId);

  if (params.exerId && "exercice" in config.filters) {
    query = query.eq(config.filters.exercice, params.exerId);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as Record<string, unknown>[];
}