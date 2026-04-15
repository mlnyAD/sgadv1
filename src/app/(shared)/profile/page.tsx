

// src/app/(shared)/profile/page.tsx
import Link from "next/link";
import { requireOperateur } from "@/lib/auth/require-operateur";

export default async function ProfilePage() {
  const operateur = await requireOperateur();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* HEADER */}
      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Mon profil</h1>
          <p className="text-sm text-muted-foreground">
            Informations de votre compte
          </p>
        </div>

        {/* Bouton fermer */}
        <Link
          href="/dashboard"
          className="rounded-md border px-3 py-2 text-sm hover:bg-muted"
        >
          Fermer
        </Link>
      </header>

      {/* CONTENU */}
      <section className="rounded-xl border bg-card p-6 shadow-sm">
        <dl className="space-y-6">
          {/* Ligne 1 : Nom / Prénom */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {"nom" in operateur && (
              <div>
                <dt className="text-sm text-muted-foreground">Nom</dt>
                <dd className="font-medium">{operateur.nom ?? "-"}</dd>
              </div>
            )}

            {"prenom" in operateur && (
              <div>
                <dt className="text-sm text-muted-foreground">Prénom</dt>
                <dd className="font-medium">{operateur.prenom ?? "-"}</dd>
              </div>
            )}
          </div>

          {/* Ligne 2 : Rôle / Email */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-muted-foreground">Rôle</dt>
              <dd className="font-medium">
                {operateur.isAdminSys ? (
                  <span className="rounded bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
                    Administrateur système
                  </span>
                ) : (
                  <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                    Opérateur
                  </span>
                )}
              </dd>
            </div>

            {"email" in operateur && (
              <div>
                <dt className="text-sm text-muted-foreground">Email</dt>
                <dd className="font-medium">{operateur.email ?? "-"}</dd>
              </div>
            )}
          </div>
        </dl>
      </section>
    </div>
  );
}