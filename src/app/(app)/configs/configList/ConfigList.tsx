"use client";

import { useState, useTransition, useEffect } from "react";
import { loadConfigs } from "./actions";
import { ConfigEnum } from "@/domain/config/config.enum";
import ConfigDataTable from "./ConfigDataTable";
import Link from "next/link";
import type { ConfigListItem } from "@/domain/config/config.list.repository";
import ColumnSelector from "@/components/table/ColumnSelector";
import { columns as allColumns } from "./columns";

// ✅ Helper pour obtenir une clé stable par colonne
const getColumnKey = (c: (typeof allColumns)[number]): string => {
  const col: any = c; // on évite ici le conflit de type ColumnDef
  return (
    (col.accessorKey as string | undefined) ??
    (col.id as string | undefined) ??
    String(col.header ?? "")
  );
};

interface PaginatedConfigList {
  data: ConfigListItem[];
  total: number;
  page: number;
  pageSize: number;
}

export default function ConfigList({ initialData }: { initialData: PaginatedConfigList }) {

  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState(0);
  const [, startTransition] = useTransition();

  // ✅ On dérive la liste de toutes les clés de colonnes une seule fois
  const allColumnKeys = allColumns.map(getColumnKey);

  const [visibleColumns, setVisibleColumns] = useState<string[]>(allColumnKeys);

  // ✅ On filtre les colonnes sur base de la clé calculée
  const filteredColumns = allColumns.filter((c) =>
    visibleColumns.includes(getColumnKey(c))
  );

  function refresh(page = data.page, pageSize = data.pageSize) {
    startTransition(async () => {
      const next = await loadConfigs({
        page,
        pageSize,
        search,
        filterType,
      });
      setData(next);
    });
  }

  useEffect(() => {
    startTransition(() => {
      loadConfigs({
        page: data.page,
        pageSize: data.pageSize,
        search,
        filterType,
      }).then(setData);
    });
  }, [search, filterType, data.page, data.pageSize]);


  return (
    <div className="space-y-4">

      {/* ACTION BUTTONS HEADER */}
      <div className="flex justify-end items-center gap-3">

        {/* Nouvelle configuration – style Axcio */}
        <Link
          href="/configs/new"
          className="px-4 py-1 rounded-md bg-ad-light text-white hover:bg-ad-dark/80 transition"
        >
          Nouvelle configuration
        </Link>

        {/* Fermer */}
        <Link
          href="/dashboard"
          className="px-4 py-1 rounded-md border border-ad-light text-ad-light hover:border-ad-dark hover:text-ad-dark transition"
        >
          Fermer
        </Link>

      </div>

      <div className="flex justify-between items-center">

        <div className="flex items-center gap-3">
          <input
            className="input"
            placeholder="Recherche..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="input"
            value={filterType}
            onChange={(e) => setFilterType(Number(e.target.value))}
          >
            <option value={0}>Tous les types</option>
            {ConfigEnum.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {/* ✅ ColumnSelector utilise la même clé que le filtrage */}
        <ColumnSelector
          columns={allColumns.map((c) => ({
            key: getColumnKey(c),
            label: typeof c.header === "string" ? c.header : "Colonne",
          }))}
          visibleColumns={visibleColumns}
          onChange={setVisibleColumns}
        />

      </div>

      {/* TABLE */}
      <ConfigDataTable
        columns={filteredColumns}
        data={data}
        onRefresh={refresh}
      />
    </div>
  );
}
