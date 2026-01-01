import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import { mapConfigDbToUI, mapConfigUIToDb, } from "./config.mapper";
import { ConfigUI } from "./config.ui";
import { createSupabaseServerActionClient } from "@/lib/supabase/server-action";


/* ------------------------------------------------------------------ */
/* Read */
/* ------------------------------------------------------------------ */
export async function getConfigById(
	id: number
): Promise<ConfigUI | null> {

	const supabase = await createSupabaseServerReadClient();

	const { data, error } = await supabase
		.from("vw_config_view")
		.select(`
        config_id,
        config_nom,
        config_type,
        type_nom,
        lmod
      `)
		.eq("config_id", id)
		.single();

	if (error || !data) {
		return null;
	}

	return mapConfigDbToUI(data);
}
/* ------------------------------------------------------------------
   LIST
   ------------------------------------------------------------------ */

export async function listConfigs(params: {
	page: number;
	pageSize: number;
	search?: string;
	typeId?: number | null;
}): Promise<{ data: ConfigUI[]; total: number }> {
	const supabase = await createSupabaseServerReadClient();

	let query = supabase
		.from("vw_config_view")
		.select("*", { count: "exact" });

	if (params.search) {
		query = query.ilike("config_nom", `%${params.search}%`);
	}

	if (params.typeId) {
		query = query.eq("config_type", params.typeId);
	}

	const from = (params.page - 1) * params.pageSize;
	const to = from + params.pageSize - 1;

	const { data, count, error } = await query.range(from, to);

	if (error) {
		throw error;
	}

	return {
		data: (data ?? []).map(mapConfigDbToUI),
		total: count ?? 0,
	};
}


/* ------------------------------------------------------------------ */
/* CREATE */
/* ------------------------------------------------------------------ */
export async function createConfig(
  ui: ConfigUI
): Promise<number> {

  const supabase = await createSupabaseServerActionClient();

  const payload = mapConfigUIToDb(ui);

  const { data, error } = await supabase
	.from("config")
	.insert(payload)
	.select("config_id")
	.single();

  if (error || !data) {
	throw new Error(error?.message ?? "Create failed");
  }

  return data.config_id as number;
}

/* ------------------------------------------------------------------
   UPDATE
   ------------------------------------------------------------------ */
export async function updateConfig(
	id: number,
	ui: ConfigUI
): Promise<void> {

	const supabase = await createSupabaseServerActionClient();

	const payload = mapConfigUIToDb(ui);

	const { error } = await supabase
		.from("config")
		.update(payload)
		.eq("config_id", id);

	if (error) {
		throw new Error(error.message);
	}
}

/* ------------------------------------------------------------------
   DELETE
   ------------------------------------------------------------------ */
export async function deleteConfig(id: number): Promise<void> {
	const supabase = await createSupabaseServerReadClient();

	const { error } = await supabase
		.from("config")
		.delete()
		.eq("config_id", id);

	if (error) {
		throw error;
	}
}

