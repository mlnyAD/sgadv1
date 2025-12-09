import { getSupabaseServerClient } from "@/utils/supabase/server";

export interface ConfigEntity {
  id: number;
  type: number;
  name: string;
}

export class ConfigRepository {
  async findById(id: number): Promise<ConfigEntity | null> {
    const supabase = await getSupabaseServerClient();

    const { data } = await supabase
      .from("config")
      .select("*")
      .eq("config_id", id)
      .single();

    if (!data) return null;

    return {
      id: data.config_id,
      type: data.config_type,
      name: data.config_nom,
    };
  }

  async create(input: { type: number; name: string }): Promise<void> {
    const supabase = await getSupabaseServerClient();

    await supabase.from("config").insert({
      config_type: input.type,
      config_nom: input.name,
    });
  }

  async update(id: number, input: { type: number; name: string }) {
    const supabase = await getSupabaseServerClient();

    await supabase
      .from("config")
      .update({
        config_type: input.type,
        config_nom: input.name,
      })
      .eq("config_id", id);
  }

  async delete(id: number) {
    const supabase = await getSupabaseServerClient();
    await supabase.from("config").delete().eq("config_id", id);
  }
}
