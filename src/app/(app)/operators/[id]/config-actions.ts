"use server";

import { getConfigsByType } from "@/lib/config/config.service";

export async function loadMetiers() {
  return await getConfigsByType(3); // 3 = Métier d'un opérateur
}
