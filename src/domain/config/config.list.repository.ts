import { getSupabaseServerClient } from "@/utils/supabase/server";

export interface ConfigListItem {
  configId: number;
  configType: number;
  typeName: string;   // ← DOIT EXISTER
  label: string;
  lastModified: string | null;
}



export class ConfigListRepository {
  async listAll(): Promise<ConfigListItem[]> {
    const supabase = await getSupabaseServerClient();

    const { data, error } = await supabase
      .from("vw_config_list")
      .select("*")
      .order("config_nom", { ascending: true });

    if (error) {
      console.error("Erreur repository config:", error);
      return [];
    }

    return (data ?? []).map((row: any) => ({
  configId: row.config_id,
  label: row.config_nom,
  configType: row.config_type,
  typeName: row.type_nom,     // ← ICI LE NOM LITTÉRAL
  lastModified: row.lmod ?? null,
}));
  }
   // ⬇⬇⬇ MÉTHODE QUI DOIT EXISTER ⬇⬇⬇
  async deleteById(id: number): Promise<void> {
    const supabase = await getSupabaseServerClient();

    const { error } = await supabase
      .from("config")
      .delete()
      .eq("config_id", id);

    if (error) {
      console.error("Erreur deleteById:", error);
      throw error;
    }
  }
}
