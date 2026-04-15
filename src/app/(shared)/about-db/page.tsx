

// src/app/(shared)/about-db/page.tsx
import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import type { Database } from "@/lib/supabase/database.types";

type AppDbReleaseRow = Database["public"]["Tables"]["app_db_release"]["Row"];

export default async function AboutDbPage() {
  const supabase = await createSupabaseServerReadClient();

  const { data, error } = await supabase
    .from("app_db_release")
    .select("*")
    .order("dbr_date", { ascending: false })
    .order("created_at", { ascending: false })
    .returns<AppDbReleaseRow[]>();

  return (
    <main className="p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold">À propos de la base</h1>
          <p className="text-sm text-muted-foreground">
            Historique des versions de la base de données
          </p>
        </header>

        {error && (
          <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700">
            Erreur lors du chargement des informations de versionnement.
          </div>
        )}

        {!error && (!data || data.length === 0) && (
          <div className="rounded-lg border p-4 text-sm">
            Aucune version n&apos;a été trouvée.
          </div>
        )}

        {!error && data && data.length > 0 && (
          <section className="overflow-hidden rounded-xl border bg-card shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr className="text-left">
                  <th className="p-3">Nom</th>
                  <th className="p-3">Version</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Courante</th>
                  <th className="p-3">Commentaire</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.dbr_id} className="border-t align-top">
                    <td className="p-3 font-medium">{row.dbr_name}</td>
                    <td className="p-3">{row.dbr_version}</td>
                    <td className="p-3">
                      {new Date(row.dbr_date).toLocaleDateString("fr-FR")}
                    </td>
                    <td className="p-3">{row.dbr_current ? "Oui" : "Non"}</td>
                    <td className="p-3">{row.dbr_comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </div>
    </main>
  );
}