

"use client";

import { useState, useTransition } from "react";
import { requestPasswordResetAction } from "./server-actions";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);

    startTransition(async () => {
      try {
        await requestPasswordResetAction(email);

        // ⚠️ Ne pas révéler si l'email existe
        setMessage(
          "Si un compte existe pour cet email, un lien de réinitialisation a été envoyé."
        );
      } catch (e) {
        // Même message côté UX si vous voulez être strict.
        setError(
          e instanceof Error ? e.message : "Impossible d’envoyer l’email."
        );
      }
    });
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md space-y-4"
    >
      <h1 className="text-2xl font-bold text-center">
        Réinitialiser le mot de passe
      </h1>

      {message && <p className="text-green-700 text-sm text-center">{message}</p>}
      {error && <p className="text-red-600 text-sm text-center">{error}</p>}

      <div className="flex flex-col space-y-1">
        <label className="font-medium">Email</label>
        <input
          type="email"
          className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="exemple@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? "Envoi…" : "Envoyer le lien"}
      </button>

      <div className="text-center text-sm">
        <a href="/login" className="text-blue-600 hover:underline">
          Retour à la connexion
        </a>
      </div>
    </form>
  );
}