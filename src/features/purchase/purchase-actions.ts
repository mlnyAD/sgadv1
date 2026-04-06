

"use server";

import { getCurrentClient } from "@/domain/session/current-client";
import { getAuthenticatedOperateur } from "@/lib/auth/get-authenticated-operateur";

import {
  createPurchase,
  updatePurchase,
  deletePurchase,
} from "@/domain/purchase/purchase-repository";

import {
  mapPurchaseFormToPurchaseInsert,
  mapPurchaseFormToPurchaseUpdate,
} from "@/domain/purchase/purchase-mapper";

import type { PurchaseFormValues } from "@/ui/purchase/edit/purchase-form.types";

export async function savePurchase(
  data: PurchaseFormValues,
  purId?: string
): Promise<void> {
  const { current } = await getCurrentClient({
    requireSelected: true,
    next: "/purchases",
  });
  if (!current?.cltId) throw new Error("Aucun client sélectionné");

  const operateur = await getAuthenticatedOperateur();
  if (!operateur?.operId) throw new Error("Aucun opérateur authentifié");

  if (purId) {
    const payload = mapPurchaseFormToPurchaseUpdate(data);
    payload.oper_id = operateur.operId;

    await updatePurchase(purId, payload);
    return;
  }

  const payload = mapPurchaseFormToPurchaseInsert(data);

  await createPurchase({
    ...payload,
    oper_id: operateur.operId,
  });
}

export async function deletePurchaseAction(purId: string) {
  await deletePurchase({ purId });
}