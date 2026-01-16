

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { TransactionHeader } from "@/components/transaction/TransactionHeader";

import {
  ClientForm,
  ClientFormValues,
} from "@/app/(app)/clients/components/form/ClientForm";

import { ClientFormCard } from "@/app/(app)/clients/components/form/ClientFormCard";

import { ClientNameField } from "@/app/(app)/clients/components/fields/ClientNameField";
import { ClientAddressField } from "@/app/(app)/clients/components/fields/ClientAddressField";
import { ClientCityField } from "@/app/(app)/clients/components/fields/ClientCityField";
import { ClientSirenField } from "@/app/(app)/clients/components/fields/ClientSirenField";

import {
  mapClientFormToUI,
  mapClientUIToForm,
} from "@/app/(app)/clients/components/form/client.form.mapper";

import type { ClientUI } from "@/domain/client";

/* ------------------------------------------------------------------ */
/* Page */
/* ------------------------------------------------------------------ */

export default function EditClientPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [initialValues, setInitialValues] =
    useState<ClientFormValues | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ------------------------------------------------------------------
     Load client
     ------------------------------------------------------------------ */
  useEffect(() => {
    async function loadClient() {
      try {
        const res = await fetch(`/api/clients/${id}`);

        if (!res.ok) {
          throw new Error();
        }

        const data: ClientUI = await res.json();
        setInitialValues(mapClientUIToForm(data));

      } catch {
        toast.error("Impossible de charger le client");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadClient();
    }
  }, [id]);

  /* ------------------------------------------------------------------
     Submit
     ------------------------------------------------------------------ */
  async function handleSubmit(values: ClientFormValues) {
    try {
      setSaving(true);

      const payload = mapClientFormToUI(values);

      const res = await fetch(`/api/clients/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error();
      }

      toast.success("Client modifié");
      router.push("/clients");

    } catch {
      toast.error("Erreur lors de la modification du client");
    } finally {
      setSaving(false);
    }
  }

  /* ------------------------------------------------------------------
     Render
     ------------------------------------------------------------------ */
  if (loading || !initialValues) {
    return <p>Chargement en cours…</p>;
  }

  return (
    <>
      <TransactionHeader
        title="Modifier un client"
        subtitle="Mettre à jour les informations du client"
      />

      <ClientForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onCancel={() => router.back()}
        saving={saving}
      >
        {({ values, setValues }) => (
          <ClientFormCard
            onCancel={() => router.back()}
            saving={saving}
          >
            <ClientNameField
              value={values.nom}
              onChange={(nom) =>
                setValues((v) => ({ ...v, nom }))
              }
            />

            <ClientAddressField
              value={values.adresse}
              onChange={(adresse) =>
                setValues((v) => ({ ...v, adresse }))
              }
            />

            <ClientCityField
              codePostal={values.codePostal}
              ville={values.ville}
              onChange={(patch) =>
                setValues((v) => ({ ...v, ...patch }))
              }
            />

            <ClientSirenField
              value={values.siren}
              onChange={(siren) =>
                setValues((v) => ({ ...v, siren }))
              }
            />
          </ClientFormCard>
        )}
      </ClientForm>
    </>
  );
}
