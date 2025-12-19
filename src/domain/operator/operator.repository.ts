import {
  fetchOperatorRows,
  ListOperatorsQueryParams,
} from "./operator.query";
import { mapOperatorRowsToListItems } from "./operator.mapper";
import { OperatorListItem } from "./operator.dto";
import { OperatorUpdateInput } from "./operator.dto";
import { CreateOperatorByAdminInput } from "./operator.dto";

import { getSupabaseServerClient } from "@/utils/supabase/server";
import { getSupabaseAdminClient } from "@/utils/supabase/admin";

/* ------------------------------------------------------------------ */
/* LISTE */
/* ------------------------------------------------------------------ */

export async function listOperators(
  params: ListOperatorsQueryParams
): Promise<{
  items: OperatorListItem[];
  totalPages: number;
}> {
  const { rows, totalPages } = await fetchOperatorRows(params);

  return {
    items: mapOperatorRowsToListItems(rows),
    totalPages,
  };
}

/* ------------------------------------------------------------------ */
/* DELETE */
/* ------------------------------------------------------------------ */

export async function deleteOperator(operatorId: number) {
  const supabase = await getSupabaseServerClient();

  const { error } = await supabase
    .from("operator")
    .delete()
    .eq("operator_id", operatorId);

  if (error) {
    throw new Error(error.message);
  }
}

/* ------------------------------------------------------------------ */
/* UPDATE */
/* ------------------------------------------------------------------ */

export async function updateOperator(input: OperatorUpdateInput) {
  const supabase = await getSupabaseServerClient();

  const { error } = await supabase
    .from("operator")
    .update({
      role_id: input.roleId,
      societe_id: input.societeId ?? null,
      metier_id: input.metierId ?? null,
      active: input.active,
    })
    .eq("operator_id", input.id);

  if (error) {
    throw new Error(error.message);
  }
}

/* ------------------------------------------------------------------ */
/* CREATE BY ADMIN (TRANSACTION RÉFÉRENCE) */
/* ------------------------------------------------------------------ */

export async function createOperatorByAdmin(
  input: CreateOperatorByAdminInput
) {
  const admin = getSupabaseAdminClient();

  /* -------------------------------------------------- */
  /* 1. Création Auth user (Supabase auth) */
  /* -------------------------------------------------- */

  const { data: authData, error: authError } =
    await admin.auth.admin.createUser({
      email: input.email,
      email_confirm: false,
    });

  if (authError || !authData.user) {
    throw new Error(
      authError?.message ?? "Erreur création Auth user"
    );
  }

  const authUserId = authData.user.id;

  /* -------------------------------------------------- */
  /* 2. Création user métier */
  /* -------------------------------------------------- */

  await createUserRow({
    authUserId,
    email: input.email,
    firstName: input.firstName,
    lastName: input.lastName,
  });

  /* -------------------------------------------------- */
  /* 3. Création operator */
  /* -------------------------------------------------- */

  await createOperatorRow({
    userId: authUserId,
    roleId: input.roleId,
    societeId: input.societeId,
    metierId: input.metierId,
    active: true,
  });
}

/* ------------------------------------------------------------------ */
/* HELPERS PRIVÉS (transaction only) */
/* ------------------------------------------------------------------ */

async function createUserRow(input: {
  authUserId: string;
  email: string;
  firstName: string;
  lastName: string;
}) {
  const supabase = await getSupabaseServerClient();

  const { error } = await supabase.from("user").insert({
    id: input.authUserId, // FK = auth.users.id
    email: input.email,
    first_name: input.firstName,
    last_name: input.lastName,
  });

  if (error) {
    throw new Error(error.message);
  }
}

async function createOperatorRow(input: {
  userId: string;
  roleId: number;
  societeId?: number | null;
  metierId?: number | null;
  active: boolean;
}) {
  const supabase = await getSupabaseServerClient();

  const { error } = await supabase.from("operator").insert({
    user_id: input.userId,
    role_id: input.roleId,
    societe_id: input.societeId ?? null,
    metier_id: input.metierId ?? null,
    active: input.active,
  });

  if (error) {
    throw new Error(error.message);
  }
}
