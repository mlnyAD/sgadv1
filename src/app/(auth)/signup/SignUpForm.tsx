"use client";

import { useState, useTransition } from "react";
import { signupAction } from "./server-actions";

export default function SignUpForm() {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setError("");

    startTransition(async () => {
      const result = await signupAction(formData);

      if (result && result.error) {
        setError(result.error);
      }
    });
  }

  return (
    <form
      action={handleSubmit}
      className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md space-y-4"
    >
      <h1 className="text-2xl font-bold text-center">Créer un compte</h1>

      {error && <p className="text-red-600 text-sm text-center">{error}</p>}

      {/* Prénom */}
      <div className="flex flex-col space-y-1">
        <label className="font-medium">Prénom</label>
        <input
          type="text"
          name="firstname"
          required
          className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Nom */}
      <div className="flex flex-col space-y-1">
        <label className="font-medium">Nom</label>
        <input
          type="text"
          name="lastname"
          required
          className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col space-y-1">
        <label className="font-medium">Email</label>
        <input
          type="email"
          name="email"
          required
          className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Mot de passe */}
      <div className="flex flex-col space-y-1">
        <label className="font-medium">Mot de passe</label>
        <input
          type="password"
          name="password"
          required
          className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Bouton */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? "Création…" : "Créer mon compte"}
      </button>

      {/* Retour connexion */}
      <p className="text-center text-sm">
        Déjà un compte ?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Se connecter
        </a>
      </p>
    </form>
  );
}
