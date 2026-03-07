

"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getCurrentClient } from "@/domain/session/current-client";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { notFound } from "next/navigation";
import { DB } from "@/domain/_db/names";

const addSchema = z.object({
  exerId: z.string().uuid(),
  amount: z.coerce.number().positive(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  commentaires: z.string().max(2000).optional(),
});

export async function addRemboursementAction(formData: FormData) {
  const clientCtx = await getCurrentClient({ requireSelected: true, next: "/rembt" });
  const cltId = clientCtx.current?.cltId;
  if (!cltId) throw new Error("Aucun client courant");

  const parsed = addSchema.safeParse({
    exerId: formData.get("exerId"),
    amount: formData.get("amount"),
    date: formData.get("date"),
    commentaires: formData.get("commentaires") ?? undefined,
  });
  if (!parsed.success) return;

  const supabase = createSupabaseAdminClient();

  await supabase.from(DB.tables.remboursement).insert({
    rbt_clt_id: cltId,
    rbt_exer_id: parsed.data.exerId,
    rbt_amount: parsed.data.amount,
    rbt_date: parsed.data.date,
    rbt_commentaires: parsed.data.commentaires ?? null,
  });

  revalidatePath("/rembt");
}


const delSchema = z.object({
  exerId: z.string().uuid(),
  rbtId: z.string().uuid(),
});

export async function deleteRemboursementAction(formData: FormData) {

	  const { current } = await getCurrentClient({ requireSelected: true, next: "/rembt" });
  if (!current?.cltId) notFound();
  const cltId = current.cltId;

   const parsed = delSchema.safeParse({
    exerId: formData.get("exerId"),
    rbtId: formData.get("rbtId"),
  });
  if (!parsed.success) return;

  const supabase = createSupabaseAdminClient();

  await supabase.from(DB.tables.remboursement).delete()
    .eq("rbt_id", parsed.data.rbtId)
    .eq("rbt_clt_id", cltId)
    .eq("rbt_exer_id", parsed.data.exerId);

  revalidatePath("/rembt");
}