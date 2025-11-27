"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error("🔥 Global React Error:", error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-red-50 p-10 dark:bg-red-900">
      <h1 className="mb-4 text-3xl font-bold text-red-800 dark:text-red-200">
        Une erreur inattendue est survenue
      </h1>
      <p className="mb-6 max-w-lg text-center text-red-700 dark:text-red-300">
        {error.message ?? "Erreur inconnue."}
      </p>

      <button
        onClick={() => reset()}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Réessayer
      </button>
    </div>
  );
}
