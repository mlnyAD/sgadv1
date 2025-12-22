import { listTodos } from "@/app/(app)/todos/todos.list";
import { TodosTable } from "./TodosTable";
import { TodosToolbar } from "./TodosToolbar";

/* ------------------------------------------------------------------ */
/* Props */
/* ------------------------------------------------------------------ */

interface TodosPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

/* ------------------------------------------------------------------ */
/* Page */
/* ------------------------------------------------------------------ */

export default async function TodosPage({
  searchParams,
}: TodosPageProps) {
  /* ------------------------------------------------------------------
     Lecture et normalisation des paramètres URL
     ------------------------------------------------------------------ */

  const page =
    typeof searchParams.page === "string"
      ? Number(searchParams.page)
      : 1;

  const pageSize =
    typeof searchParams.pageSize === "string"
      ? Number(searchParams.pageSize)
      : 10;

  const search =
    typeof searchParams.search === "string"
      ? searchParams.search
      : undefined;

  /* ------------------------------------------------------------------
     Data
     ------------------------------------------------------------------ */

  const { items, totalPages } = await listTodos({
    page,
    pageSize,
    search,
  });

  /* ------------------------------------------------------------------
     Render
     ------------------------------------------------------------------ */

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
