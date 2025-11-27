import { getSupabaseServerClient } from "@/utils/supabase/server";

export async function getConfigsAll() {
  const supabase = await getSupabaseServerClient(); // ✔ MUST use await
  return await supabase.from("config").select("*").order("configid");
}

export async function getConfigById(id: number) {
  const supabase = await getSupabaseServerClient(); // ✔
  return await supabase
    .from("config")
    .select("*")
    .eq("configid", id)
    .single();
}

export async function deleteConfig(id: number) {
  const supabase = await getSupabaseServerClient(); // ✔
  return await supabase.from("config").delete().eq("configid", id);
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
      confignom: payload.name,
      configtype: payload.typeId,
      configtypenom: payload.typeNom,
    });
  }

  return await supabase
    .from("config")
    .update({
      confignom: payload.name,
      configtype: payload.typeId,
      configtypenom: payload.typeNom,
    })
    .eq("configid", payload.id);
}
