

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TransactionHeader } from "@/components/transaction/TransactionHeader";
import { toast } from "sonner";

import { ClientNameField } from "../components/fields/ClientNameField";
import { ClientAddressField } from "../components/fields/ClientAddressField";
import { ClientCityField } from "../components/fields/ClientCityField";
import { ClientSirenField } from "../components/fields/ClientSirenField";

import {
  ClientForm,
  ClientFormValues,
} from "../components/form/ClientForm";

import { ClientFormCard } from "../components/form/ClientFormCard";

import {
  mapClientFormToUI,
  mapClientUIToForm,
} from "../components/form/client.form.mapper";

/* ------------------------------------------------------------------ */
/* Page */
/* ------------------------------------------------------------------ */

export default function CreateClientPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  /* ======================================================================
     Submit
     ====================================================================== */
  async function handleSubmit(values: ClientFormValues) {
    try {
      setSaving(true);

      const payload = mapClientFormToUI(values);

      console.log("CREATE CLIENT payload", payload);

      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      console.log("Retour create client", res);

      if (!res.ok) {
        throw new Error();
      }

      toast.success("Client créé");
      router.push("/clients");
    } catch {
      toast.error("Erreur lors de la création du client");
    } finally {
      setSaving(false);
    }
  }

  /* ======================================================================
     Render
     ====================================================================== */
  return (
    <>
      <TransactionHeader
        title="Nouveau client"
        subtitle="Création d’un nouveau client"
      />

      <ClientForm
        initialValues={mapClientUIToForm()}
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
