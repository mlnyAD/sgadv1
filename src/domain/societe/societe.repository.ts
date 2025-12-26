import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/* ------------------------------------------------------------------ */
/* Types internes repository (DB shape) */
/* ------------------------------------------------------------------ */

export interface SocieteRow {
  societe_id: number;
  societe_nom: string;
  societe_adresse1: string;
  societe_adresse2: string;
  societe_adresse3: string;
  societe_ville: string;
  societe_code_postal: string;
}

/* ------------------------------------------------------------------ */
/* Repository */
/* ------------------------------------------------------------------ */

export class SocieteRepository {
  /* -------------------- Supabase client -------------------- */
  private async getClient() {
    const cookieStore = await cookies();

    return createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get: (name: string) => cookieStore.get(name)?.value,
        },
      }
    );
  }

  /* -------------------- Liste paginée -------------------- */
  async findPaginated({
    page,
    pageSize,
    search,
  }: {
    page: number;
    pageSize: number;
    search?: string;
  }): Promise<{
    data: SocieteRow[];
    total: number;
  }> {
    const supabase = await this.getClient();

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from("vw_societe_view")
      .select(
        `
        societe_id,
        societe_nom,
        societe_adresse1,
        societe_adresse2,
        societe_adresse3,
        societe_ville,
        societe_code_postal
        `,
        { count: "exact" }
      )
      .range(from, to)
      .order("societe_nom", { ascending: true });

    if (search) {
      query = query.ilike("societe_nom", `%${search}%`);
    }

    const { data, count, error } = await query;

    if (error) {
      throw error;
    }

    return {
      data: data ?? [],
      total: count ?? 0,
    };
  }

  /* -------------------- Détail -------------------- */
  async findById(id: number): Promise<SocieteRow | null> {
    const supabase = await this.getClient();

    const { data, error } = await supabase
      .from("vw_societe_view")
      .select(
        `
        societe_id,
        societe_nom,
        societe_adresse1,
        societe_adresse2,
        societe_adresse3,
        societe_ville,
        societe_code_postal
        `
      )
      .eq("societe_id", id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data ?? null;
  }

  /* -------------------- Suppression -------------------- */
  async deleteById(id: number): Promise<void> {
    const supabase = await this.getClient();

    const { error } = await supabase
      .from("societe")
      .delete()
      .eq("societe_id", id);

    if (error) {
      throw error;
    }
  }
}
