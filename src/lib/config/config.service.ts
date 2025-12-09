"use server";
 
import { getSupabaseServerClient } from "@/utils/supabase/server";



export async function getConfigsAll() {
  const supabase = await getSupabaseServerClient(); // ✔ MUST use await
  return await supabase.from("config").select("*").order("config_id");
}

export async function getConfigById(configId: number) {
  const supabase = await getSupabaseServerClient(); // ✔
   const { data, error } = await supabase
    .from("config")
    .select("*")
    .eq("config_id", configId)
    .single();

  if (error) {
    console.error("Erreur getConfigById:", error);
    return null;
  }

  return data;
}

export async function deleteConfig(id: number) {
  const supabase = await getSupabaseServerClient(); // ✔
  return await supabase.from("config").delete().eq("config_id", id);
}

export async function upsertConfig(payload: {
  id: number;
  name: string;
  typeId: number;
}) {
  const supabase = await getSupabaseServerClient(); // ✔

  if (payload.id === 0) {
    return await supabase.from("config").insert({
      config_nom: payload.name,
      config_type: payload.typeId,
    });
  }

  return await supabase
    .from("config")
    .update({
      config_nom: payload.name,
      config_type: payload.typeId,
    })
    .eq("config_id", payload.id);
}

export async function getConfigsByType(configType: number) {
  const supabase = await getSupabaseServerClient();

  const { data, error } = await supabase
    .from("config")
    .select("*")
    .eq("config_type", configType)
    .order("config_nom", { ascending: true });

  if (error) {
    console.error("Erreur getConfigsByType:", error);
    return [];
  }

  return data;
}
