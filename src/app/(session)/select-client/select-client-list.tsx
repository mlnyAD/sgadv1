

// src/app/(session)/select-client/select-client-list.tsx

"use client";

import { useState } from "react";

export default function SelectClientList({
  clients,
  next,
}: {
  clients: { id: string; nom: string }[];
  next: string;
}) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function choose(cltId: string) {
    setLoadingId(cltId);
    setError(null);

    try {
      const res = await fetch("/api/client/select", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cltId }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json?.error ?? "Erreur de sélection client");
      }

      window.location.href = next || "/dashboard";
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div className="space-y-2">
      {error ? (
        <div className="rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <ul className="space-y-2">
        {clients.map((c) => (
          <li
            key={c.id}
            className="flex items-center justify-between rounded border bg-background p-3"
          >
            <span className="font-medium">{c.nom}</span>
            <button
              className="h-9 rounded-md border px-3 text-sm"
              onClick={() => choose(c.id)}
              disabled={loadingId !== null}
            >
              {loadingId === c.id ? "Sélection..." : "Choisir"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}