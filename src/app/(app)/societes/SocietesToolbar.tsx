"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { TableHeader } from "@/components/transaction/TableHeader";
import { SocietesFilters } from "./SocietesFilters";

export function SocietesToolbar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? "";

  function onChange(next: { search: string }) {
    const params = new URLSearchParams(searchParams.toString());

    if (next.search) {
      params.set("search", next.search);
    } else {
      params.delete("search");
    }

    params.set("page", "1");
    router.push(`/societes?${params.toString()}`);
  }

  return (
    <div className="mb-4 flex flex-col gap-4">
      {/* Header + actions */}
      <div className="flex items-end justify-between gap-4">
        <TableHeader
          title="Sociétés"
          subtitle="Gérer les sociétés de la plateforme"
        />

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard"
            className="inline-flex items-center h-9 px-4 rounded-md border border-muted-foreground/40 text-foreground hover:bg-muted text-base"
          >
            Fermer
          </Link>

          <Button asChild variant="axcio">
            <Link href="/societes/create">
              Nouvelle société
            </Link>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <SocietesFilters
        initial={{ search }}
        onChange={onChange}
        types={[]}
      />
    </div>
  );
}
