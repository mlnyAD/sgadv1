

// src/app/reset-password/ResetPasswordForm.tsx

"use client";

import { useState } from "react";
import { resetPasswordAction } from "./reset-password.action";

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Mot de passe trop court");
      return;
    }

    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    await resetPasswordAction(password);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-sm mx-auto">
      <h1 className="text-xl font-semibold">
        Définir votre mot de passe
      </h1>

      {error && <p className="text-red-600">{error}</p>}

      <input
        type="password"
        placeholder="Nouveau mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2"
      />

      <input
        type="password"
        placeholder="Confirmation"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        className="w-full border p-2"
      />

      <button
        type="submit"
        className="w-full bg-black text-white py-2"
      >
        Valider
      </button>
    </form>
  );
}
