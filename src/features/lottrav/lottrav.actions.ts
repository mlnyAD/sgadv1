

"use server";

import { createSupabaseServerActionClient } from "@/lib/supabase/server-action";
import type { LotTravStatusId } from "@/domain/lottrav/lottrav.catalog";

type LotTravFormData = {
  name: string;
  startDate: string;
  endDate: string;
  statusId: LotTravStatusId;
  responsableId: number | null;
};

export async function saveLotTrav(
  projectId: number,
  data: LotTravFormData,
  lottravId?: number
) {
  const supabase = await createSupabaseServerActionClient();

  if (lottravId) {
    // ✏️ UPDATE
    const { error } = await supabase
      .from("lottrav")
      .update({
        lottrav_nom: data.name,
        lottrav_start: data.startDate || null,
        lottrav_end: data.endDate || null,
        lottrav_status_id: data.statusId,
        lottrav_resp_id: data.responsableId ?? null,
      })
      .eq("lottrav_id", lottravId)
      .eq("project_id", projectId);

    if (error) {
      throw new Error(error.message);
    }
  } else {
    // ➕ CREATE
    const { error } = await supabase
      .from("lottrav")
      .insert({
        project_id: projectId,
        lottrav_nom: data.name,
        lottrav_start: data.startDate || null,
        lottrav_end: data.endDate || null,
        lottrav_status_id: data.statusId,
        lottrav_resp_id: data.responsableId ?? null,
      });

    if (error) {
      throw new Error(error.message);
    }
  }
}

export async function deleteLotTravAction(lottravId: number) {
  const supabase = await createSupabaseServerActionClient();

  const { error } = await supabase
    .from("lottrav")
    .delete()
    .eq("lottrav_id", lottravId);

  if (error) {
    throw error;
  }
}