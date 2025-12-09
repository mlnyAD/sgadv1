"use server";

import { ConfigListRepository } from "@/domain/config/config.list.repository";
import type { ConfigListItem } from "@/domain/config/config.list.repository";

/* ----------------------------------------------
 * Types utilisés par loadConfigs
 * ---------------------------------------------- */
export interface LoadConfigParams {
  page?: number;
  pageSize?: number;
  search?: string;
  filterType?: number;
}

export interface PaginatedConfigList {
  data: ConfigListItem[];
  total: number;
  page: number;
  pageSize: number;
}

/* ----------------------------------------------
 * Chargement listé + filtre + recherche
 * ---------------------------------------------- */
export async function loadConfigs(params: LoadConfigParams): Promise<PaginatedConfigList> {
  const repo = new ConfigListRepository();
  const all = await repo.listAll();

  const {
    page = 1,
    pageSize = 10,
    search = "",
    filterType = 0,
  } = params;

  // --- Recherche texte ---
  let filtered = all.filter((c) =>
    c.label.toLowerCase().includes(search.toLowerCase())
  );

  // --- Filtre par type ---
  if (filterType > 0) {
    filtered = filtered.filter((c) => c.configType === filterType);
  }

  // --- Tri par nom (toujours ascendant) ---
  filtered.sort((a, b) => {
    const A = a.label.toLowerCase();
    const B = b.label.toLowerCase();
    return A.localeCompare(B);
  });

  // --- Pagination ---
  const start = (page - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  return {
    data: paginated,
    total: filtered.length,
    page,
    pageSize,
  };
}

/* ----------------------------------------------
 * Suppression
 * ---------------------------------------------- */
export async function deleteConfigAction(configId: number) {
  const repo = new ConfigListRepository();

  try {
    await repo.deleteById(configId);
    return { success: true };
  } catch (e: unknown) {
    console.error("Erreur deleteConfigAction:", e);

    return {
      success: false,
      error: e instanceof Error ? e.message : "Erreur inconnue",
    };
  }
}
