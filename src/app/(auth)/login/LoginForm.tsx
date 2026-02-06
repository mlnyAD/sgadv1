"use client";

import { useState, useTransition } from "react";
import { loginAction } from "./server-actions";

export default function LoginForm() {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setError("");

    startTransition(async () => {
      const result = await loginAction(formData);

      if (result && !result.success) {
        setError(result.error);
      }
    });
  }

  return (
    <form
      action={handleSubmit}
      className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md space-y-4"
    >
      <h1 className="text-2xl font-bold text-center">Connexion</h1>

      {error && (
        <p className="text-red-600 text-sm text-center">{error}</p>
      )}

      {/* Champ Email */}
      <div className="flex flex-col space-y-1">
        <label className="font-medium">Email</label>
        <input
          type="email"
          name="email"
          className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="exemple@email.com"
          required
        />
      </div>

      {/* Champ Mot de passe */}
      <div className="flex flex-col space-y-1">
        <label className="font-medium">Mot de passe</label>
        <input
          type="password"
          name="password"
          className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
      </div>

      {/* Bouton connexion */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? "Connexion…" : "Se connecter"}
      </button>

      {/* Lien création de compte 
      <div className="text-center text-sm">
        Vous n’avez pas de compte ?{" "}
        <a
          href="/signup"
          className="text-blue-600 hover:underline"
        >
          Créez votre compte
        </a>
      </div>  */}

      {/* Lien mot de passe oublié */}
      <div className="text-center text-sm">
        <a
          href="/forgot-password"
          className="text-blue-600 hover:underline"
        >
          Mot de passe oublié ?
        </a>
      </div>
    </form>
  );
}
