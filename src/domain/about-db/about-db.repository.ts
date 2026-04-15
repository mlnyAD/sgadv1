

import "server-only";

import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";

export type DbReleaseView = {
  id: string;
  name: string;
  version: string;
  date: string;
  comment: string;
  current: boolean;
};

export async function listDbReleases(): Promise<DbReleaseView[]> {
  const supabase = await createSupabaseServerReadClient();

  const { data, error } = await supabase
    .from("app_db_release")
    .select("dbr_id,dbr_name,dbr_version,dbr_date,dbr_comment,dbr_current")
    .order("dbr_date", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return (data ?? []).map((row) => ({
    id: row.dbr_id,
    name: row.dbr_name,
    version: row.dbr_version,
    date: row.dbr_date,
    comment: row.dbr_comment,
    current: row.dbr_current,
  }));
}