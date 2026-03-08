

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type ExportFormat = "xlsx";

type ExportFilter =
  | {
      type: "exercice";
      label: string;
      column: string;
    }
  | {
      type: "dateRange";
      label: string;
      fromColumn: string;
      toColumn?: string;
    };

type ExportColumn = {
  key: string;
  header: string;
};

type ExportDefinition = {
  key: string;
  label: string;
  view: string;
  scope: "METIER" | "ADMINSYS";
  filters?: ExportFilter[];
  columns: ExportColumn[];
  formats: ExportFormat[];
};

const EXPORTS: ExportDefinition[] = [
  {
    key: "invoice-purchase",
    label: "Factures fournisseurs",
    view: "vw_invoice_purchase_view",
    scope: "METIER",
    filters: [
      {
        type: "exercice",
        label: "Exercice",
        column: "exercice",
      },
      {
        type: "dateRange",
        label: "Période",
        fromColumn: "inv_due_date",
      },
    ],
    formats: ["xlsx"],
    columns: [
      { key: "inv_due_date", header: "Date" },
      { key: "inv_reference", header: "Numéro" },
      { key: "soc_nom", header: "Société" },
      { key: "cc_libelle", header: "Centre de coût" },
      { key: "inv_amount_ht", header: "Montant HT" },
      { key: "inv_amount_tax", header: "TVA" },
      { key: "inv_amount_ttc", header: "Montant TTC" },
    ],
  },
  {
    key: "invoice-sales",
    label: "Factures clients",
    view: "vw_invoice_sales_view",
    scope: "METIER",
    filters: [
      {
        type: "exercice",
        label: "Exercice",
        column: "exercice",
      },
      {
        type: "dateRange",
        label: "Période",
        fromColumn: "inv_due_date",
      },
    ],
    formats: ["xlsx"],
    columns: [
      { key: "inv_due_date", header: "Date" },
      { key: "inv_reference", header: "Numéro" },
      { key: "clt_nom", header: "Client" },
      { key: "invs_revenue_type", header: "Type revenu" },
      { key: "inv_amount_ht", header: "Montant HT" },
      { key: "inv_amount_tax", header: "TVA" },
      { key: "inv_amount_ttc", header: "Montant TTC" },
    ],
  },
  {
    key: "budget",
    label: "Budgets",
    view: "vw_budget_view",
    scope: "METIER",
    filters: [
      {
        type: "exercice",
        label: "Exercice",
        column: "exercice",
      },
    ],
    formats: ["xlsx"],
    columns: [
      { key: "famille_libelle", header: "Famille" },
      { key: "budget_ht_eur", header: "Budget HT €" },
    ],
  },
  {
    key: "remboursement",
    label: "Remboursements",
    view: "vw_remboursement_view",
    scope: "METIER",
    filters: [
      {
        type: "exercice",
        label: "Exercice",
        column: "exercice",
      },
    ],
    formats: ["xlsx"],
    columns: [
      { key: "rbt_date", header: "Date" },
      { key: "rbt_amount", header: "Montant" },
      { key: "rbt_commentaires", header: "Commentaires" },
    ],
  },
];

function getDefaultExport(exportsList: ExportDefinition[], selectedKey?: string | null) {
  if (selectedKey) {
    const found = exportsList.find((item) => item.key === selectedKey);
    if (found) {
      return found;
    }
  }

  return exportsList[0] ?? null;
}

export default function ExportsPage() {
  const searchParams = useSearchParams();
  const selectedKey = searchParams.get("key");

  const selectedExport = useMemo(
    () => getDefaultExport(EXPORTS, selectedKey),
    [selectedKey],
  );

  const currentYear = new Date().getFullYear();

  const [exercice, setExercice] = useState<number>(currentYear);
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  if (!selectedExport) {
    return (
      <main className="p-6">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-xl font-semibold text-slate-900">Exports</h1>
          <p className="mt-2 text-sm text-slate-600">
            Aucun export n&apos;est disponible.
          </p>
        </div>
      </main>
    );
  }

  const hasFilter = (type: ExportFilter["type"]) =>
    (selectedExport.filters ?? []).some((filter) => filter.type === type);

  const handleSubmit = async () => {
    try {
      setErrorMessage("");
      setIsSubmitting(true);

      const payload: Record<string, unknown> = {
        exportKey: selectedExport.key,
      };

      if (hasFilter("exercice")) {
        payload.exercice = exercice;
      }

      if (hasFilter("dateRange")) {
        payload.dateFrom = dateFrom;
        payload.dateTo = dateTo;
      }

      const response = await fetch("/api/export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let message = "Erreur lors de l'export.";
        try {
          const json = (await response.json()) as { message?: string };
          if (json?.message) {
            message = json.message;
          }
        } catch {
          // no-op
        }
        throw new Error(message);
      }

      const blob = await response.blob();
      const disposition = response.headers.get("Content-Disposition");
      const fileNameMatch = disposition?.match(/filename="(.+)"/);
      const fileName = fileNameMatch?.[1] ?? `${selectedExport.key}.xlsx`;

      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = fileName;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Erreur inattendue.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-full bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Transaction Export
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Export générique basé sur le catalogue déclaratif et les vues SQL.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Exports disponibles
              </h2>
            </div>

            <nav className="space-y-2">
              {EXPORTS.map((item) => {
                const isActive = item.key === selectedExport.key;

                return (
                  <Link
                    key={item.key}
                    href={`/exports?key=${item.key}`}
                    className={[
                      "block rounded-xl border px-4 py-3 transition",
                      isActive
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
                    ].join(" ")}
                  >
                    <div className="text-sm font-medium">{item.label}</div>
                    <div
                      className={[
                        "mt-1 text-xs",
                        isActive ? "text-slate-200" : "text-slate-500",
                      ].join(" ")}
                    >
                      {item.key}
                    </div>
                  </Link>
                );
              })}
            </nav>
          </aside>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-6">
              <div className="border-b border-slate-100 pb-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">
                      {selectedExport.label}
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">
                      Export tabulaire au format XLSX.
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
                    <div>
                      <span className="font-medium text-slate-800">Vue :</span>{" "}
                      {selectedExport.view}
                    </div>
                    <div className="mt-1">
                      <span className="font-medium text-slate-800">Scope :</span>{" "}
                      {selectedExport.scope}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Paramètres
                </h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {hasFilter("exercice") && (
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-slate-700">
                        Exercice
                      </span>
                      <input
                        type="number"
                        value={exercice}
                        onChange={(e) => setExercice(Number(e.target.value))}
                        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-900"
                      />
                    </label>
                  )}

                  {hasFilter("dateRange") && (
                    <>
                      <label className="block">
                        <span className="mb-2 block text-sm font-medium text-slate-700">
                          Date de début
                        </span>
                        <input
                          type="date"
                          value={dateFrom}
                          onChange={(e) => setDateFrom(e.target.value)}
                          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-900"
                        />
                      </label>

                      <label className="block">
                        <span className="mb-2 block text-sm font-medium text-slate-700">
                          Date de fin
                        </span>
                        <input
                          type="date"
                          value={dateTo}
                          onChange={(e) => setDateTo(e.target.value)}
                          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-900"
                        />
                      </label>
                    </>
                  )}
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Colonnes exportées
                </h3>

                <div className="overflow-hidden rounded-xl border border-slate-200">
                  <table className="min-w-full divide-y divide-slate-200 text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium text-slate-700">
                          Clé
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-slate-700">
                          Libellé
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {selectedExport.columns.map((column) => (
                        <tr key={column.key}>
                          <td className="px-4 py-3 text-slate-600">
                            <code className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-800">
                              {column.key}
                            </code>
                          </td>
                          <td className="px-4 py-3 text-slate-800">
                            {column.header}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {errorMessage ? (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {errorMessage}
                </div>
              ) : null}

              <div className="flex items-center justify-end border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="inline-flex items-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Export en cours..." : "Exporter en XLSX"}
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}