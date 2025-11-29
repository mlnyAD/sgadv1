import { getSupabaseServerClient } from "@/utils/supabase/server";

export async function getConfigsAll() {
  const supabase = await getSupabaseServerClient(); // ✔ MUST use await
  return await supabase.from("config").select("*").order("configId");
}

export async function getConfigById(id: number) {
  const supabase = await getSupabaseServerClient(); // ✔
  return await supabase
    .from("config")
    .select("*")
    .eq("configId", id)
    .single();
}

export async function deleteConfig(id: number) {
  const supabase = await getSupabaseServerClient(); // ✔
  return await supabase.from("config").delete().eq("configId", id);
}

export async function upsertConfig(payload: {
  id: number;
  name: string;
  typeId: number;
  typeNom: string;
}) {
  const supabase = await getSupabaseServerClient(); // ✔

  if (payload.id === 0) {
    return await supabase.from("config").insert({
      configNom: payload.name,
      configType: payload.typeId,
      configTypeNom: payload.typeNom,
    });
  }

  return await supabase
    .from("config")
    .update({
      configNom: payload.name,
      configType: payload.typeId,
      configTypeNom: payload.typeNom,
    })
    .eq("configId", payload.id);
}
