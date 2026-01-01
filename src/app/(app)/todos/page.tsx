import { listTodosForUser } from "@/domain/todo";
import { TodosTable } from "./TodosTable";
import { TodosToolbar } from "./TodosToolbar";
import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";
import { redirect } from "next/navigation";

type TodosSearchParams = {
  page?: string;
  pageSize?: string;
  search?: string;
  urgent?: string;
  important?: string;
  etatId?: string;
};

export default async function TodosPage({
  searchParams,
}: {
  searchParams: Promise<TodosSearchParams>;
}) {
  const resolvedSearchParams = await searchParams;

  const page =
    typeof resolvedSearchParams.page === "string"
      ? Number(resolvedSearchParams.page)
      : 1;

  const pageSize =
    typeof resolvedSearchParams.pageSize === "string"
      ? Number(resolvedSearchParams.pageSize)
      : 10;

  const search =
    typeof resolvedSearchParams.search === "string"
      ? resolvedSearchParams.search
      : undefined;

  const urgent =
    resolvedSearchParams.urgent === "true"
      ? true
      : undefined;

  const important =
    resolvedSearchParams.important === "true"
      ? true
      : undefined;

  const etatId =
    typeof resolvedSearchParams.etatId === "string"
      ? Number(resolvedSearchParams.etatId)
      : undefined;

  // Recherche de l'utilisateur connecté
  const supabase = await createSupabaseServerReadClient();
const { data: { user } } = await supabase.auth.getUser();

if (!user) {
  redirect("/login");
}

  const { items, totalPages } = await listTodosForUser({
    userId: user.id,
    page,
    pageSize,
    search,
    urgent,
    important,
    etatId,
  });

  return (
    <>
      <TodosToolbar />

      {items.length === 0 ? (
        <div className="mt-8 text-center text-muted-foreground">
          Aucun todo à afficher.
        </div>
      ) : (
        <TodosTable
          data={items}
          page={page}
          pageSize={pageSize}
          totalPages={totalPages}
        />
      )}
    </>
  );
}
