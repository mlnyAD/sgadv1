// src/domain/operator/operator.repository.ts


import { getSupabaseServerClient } from "@/utils/supabase/server";
import {
  Operator,
  OperatorListItem,
  OperatorListParams,
  PaginatedResult,
} from "./operator.interface";

export class OperatorRepository {

  // -------------------------------------------------------------
  // LISTE PAGINÉE via la VUE operator_list
  // -------------------------------------------------------------
  async findPaginated(params: OperatorListParams): Promise<PaginatedResult<OperatorListItem>> {
    const { page, pageSize } = params;
    const supabase = await getSupabaseServerClient();

    const offset = (page - 1) * pageSize;

    const { data, error } = await supabase
  .from("vw_operator_list")
  .select("*")
  .range(offset, offset + pageSize - 1);


    if (error) {
      console.error("Erreur findPaginated:", error);
      return { data: [], total: 0, page, pageSize };
    }

    type OperatorListRow = {
      operator_id: number;
      email: string | null;
      first_name: string | null;
      last_name: string | null;
      role_id: number;
      metier_label: string | null;
      societe_name: string | null;
    };

    const rows: OperatorListItem[] = (data as OperatorListRow[] ?? []).map((row) => ({
      id: row.operator_id,
      email: row.email ?? "",
      firstName: row.first_name ?? "",
      lastName: row.last_name ?? "",
      roleId: row.role_id,
      metierLabel: row.metier_label ?? null,
      societeName: row.societe_name ?? null,
    }));

    // total : on compte sur la table de base operator
    const { count } = await supabase
      .from("operator")
      .select("*", { count: "exact", head: true });

    return {
      data: rows,
      total: count ?? 0,
      page,
      pageSize,
    };
  }


// -------------------------------------------------------------
  // READ BY ID
  // -------------------------------------------------------------
  // -------------------------------------------------------------
  // READ BY ID (formulaire)
  // -------------------------------------------------------------
    // -------------------------------------------------------------
  // READ BY ID (formulaire)
  // -------------------------------------------------------------
  async findById(id: number): Promise<Operator | null> {
    const supabase = await getSupabaseServerClient();

    const { data: op, error } = await supabase
      .from("operator")
      .select("*")
      .eq("operator_id", id)
      .single();

    if (error || !op) return null;

    const { data: user, error: userError } = await supabase
      .from("user")
      .select("email, first_name, last_name")
      .eq("id", op.user_id)
      .single();

    if (userError || !user) return null;

    return {
      id: op.operator_id,
      email: user.email ?? "",
      firstName: user.first_name ?? "",
      lastName: user.last_name ?? "",
      roleId: op.role_id,
      metierId: op.metier_id,
      societeId: op.societe_id,
      active: op.active,
    };
  }

  // -------------------------------------------------------------
  // CREATE
  // -------------------------------------------------------------
  async create(input: Omit<Operator, "id">): Promise<Operator> {
    const supabase = await getSupabaseServerClient();

    // 1. user existant ?
    const { data: existingUsers } = await supabase
      .from("user")
      .select("*")
      .eq("email", input.email);

    let userId: string;

    if (existingUsers && existingUsers.length > 0) {
      const u = existingUsers[0];
      userId = u.id;

      await supabase
        .from("user")
        .update({
          first_name: input.firstName,
          last_name: input.lastName,
        })
        .eq("id", userId);
    } else {
      const { data: newUser, error: userError } = await supabase
        .from("user")
        .insert({
          email: input.email,
          first_name: input.firstName,
          last_name: input.lastName,
          is_active: true,
        })
        .select()
        .single();

      if (userError || !newUser) throw userError;
      userId = newUser.id;
    }

    // 2. création operator
    const { data: op, error: opError } = await supabase
      .from("operator")
      .insert({
        user_id: userId,
        role_id: input.roleId,
        metier_id: input.metierId,
        societe_id: input.societeId,
        active: input.active,
      })
      .select("*")
      .single();

    if (opError || !op) throw opError;

    // 3. relire le user pour renvoyer un Operator complet
    const { data: user, error: userError2 } = await supabase
      .from("user")
      .select("email, first_name, last_name")
      .eq("id", userId)
      .single();

    if (userError2 || !user) throw userError2;

    return {
      id: op.operator_id,
      email: user.email ?? "",
      firstName: user.first_name ?? "",
      lastName: user.last_name ?? "",
      roleId: op.role_id,
      metierId: op.metier_id,
      societeId: op.societe_id,
      active: op.active,
    };
  }

  // -------------------------------------------------------------
  // UPDATE
  // -------------------------------------------------------------
  async update(id: number, input: Omit<Operator, "id">): Promise<Operator> {
    const supabase = await getSupabaseServerClient();

    const { data: op0, error: op0Error } = await supabase
      .from("operator")
      .select("user_id")
      .eq("operator_id", id)
      .single();

    if (op0Error || !op0) throw new Error("Opérateur introuvable");
    const userId = op0.user_id;

    // 1. update user
    const { error: userError } = await supabase
      .from("user")
      .update({
        email: input.email,
        first_name: input.firstName,
        last_name: input.lastName,
      })
      .eq("id", userId);

    if (userError) throw userError;

    // 2. update operator
    const { data: op, error: opError } = await supabase
      .from("operator")
      .update({
        role_id: input.roleId,
        metier_id: input.metierId,
        societe_id: input.societeId,
        active: input.active,
      })
      .eq("operator_id", id)
      .select("*")
      .single();

    if (opError || !op) throw opError;

    // 3. relire user
    const { data: user, error: userError2 } = await supabase
      .from("user")
      .select("email, first_name, last_name")
      .eq("id", userId)
      .single();

    if (userError2 || !user) throw userError2;

    return {
      id: op.operator_id,
      email: user.email ?? "",
      firstName: user.first_name ?? "",
      lastName: user.last_name ?? "",
      roleId: op.role_id,
      metierId: op.metier_id,
      societeId: op.societe_id,
      active: op.active,
    };
  }

  // -------------------------------------------------------------
  // DELETE
  // -------------------------------------------------------------
  async delete(id: number): Promise<void> {
    const supabase = await getSupabaseServerClient();

    await supabase
      .from("operator")
      .delete()
      .eq("operator_id", id);
  }
}
