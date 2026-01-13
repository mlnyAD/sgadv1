

"use server";

import type { LotTravStatusId } from "@/domain/lottrav/lottrav-status";
import {
  createLotTrav,
  deleteLotTrav,
  updateLotTrav,
} from "@/domain/lottrav/lottrav-repository";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type LotTravFormData = {
  name: string;
  startDate: string;
  endDate: string;
  statusId: LotTravStatusId;
  responsableId: number | null;
};

/**
 * Payload tel qu'attendu par la couche persistence
 * (repository / base de données)
 */
type LotTravPersistencePayload = {
  lottrav_nom: string;
  lottrav_start: string | null;
  lottrav_end: string | null;
  lottrav_status_id: number;
  lottrav_resp_id: number | null;
};

/* ------------------------------------------------------------------ */
/* Action                                                              */
/* ------------------------------------------------------------------ */

export async function saveLotTrav(
  projectId: number,
  data: LotTravFormData,
  lottravId?: number
): Promise<void> {
  const payload: LotTravPersistencePayload = {
    lottrav_nom: data.name,
    lottrav_start: data.startDate || null,
    lottrav_end: data.endDate || null,
    lottrav_status_id: data.statusId,
    lottrav_resp_id: data.responsableId ?? null,
  };

  if (lottravId) {
    // ✏️ UPDATE
    await updateLotTrav(projectId, lottravId, payload);
  } else {
    // ➕ CREATE
    await createLotTrav(projectId, payload);
  }
}

/* ------------------------------------------------------------------ */
/* Delete                                                             */
/* ------------------------------------------------------------------ */

export async function deleteLotTravAction(
  projectId: number,
  lottravId: number
): Promise<void> {
  await deleteLotTrav(projectId, lottravId);
}