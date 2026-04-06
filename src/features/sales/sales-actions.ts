

"use server";

import { getCurrentClient } from "@/domain/session/current-client";
import { getAuthenticatedOperateur } from "@/lib/auth/get-authenticated-operateur";

import {
  createSales,
  updateSales,
  deleteSales,
} from "@/domain/sales/sales-repository";

import {
  mapSalesFormToSalesInsert,
  mapSalesFormToSalesUpdate,
} from "@/domain/sales/sales-mapper";

import type { SalesFormValues } from "@/ui/sales/edit/sales-form.types";

export async function saveSales(
  data: SalesFormValues,
  salId?: string
): Promise<void> {
  const { current } = await getCurrentClient({
    requireSelected: true,
    next: "/sales",
  });
  if (!current?.cltId) throw new Error("Aucun client sélectionné");

  const operateur = await getAuthenticatedOperateur();
  if (!operateur?.operId) throw new Error("Aucun opérateur authentifié");

  if (salId) {
    const payload = mapSalesFormToSalesUpdate(data);
    payload.oper_id = operateur.operId;

    await updateSales(salId, payload);
    return;
  }

  const payload = mapSalesFormToSalesInsert(data);

  await createSales({
    ...payload,
    oper_id: operateur.operId,
  });
}

export async function deleteSalesAction(salId: string) {
  await deleteSales({ salId });
}