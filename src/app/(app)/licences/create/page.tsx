

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { TransactionHeader } from "@/components/transaction/TransactionHeader";

import { LicenceForm, } from "@/app/(app)/licences/components/form/LicenceForm";
import type { ClientOption } from "../components/fields/LicenceClientField";

import { LicenceFormCard } from "@/app/(app)/licences/components/form/LicenceFormCard";

import { LicenceNameField } from "@/app/(app)/licences/components/fields/LicenceNameField";
import { LicenceClientField } from "@/app/(app)/licences/components/fields/LicenceClientField";
import { LicenceStatusField } from "@/app/(app)/licences/components/fields/LicenceStatusField";
import { LicenceStartDateField } from "@/app/(app)/licences/components/fields/LicenceStartDateField";
import { LicenceEndDateField } from "@/app/(app)/licences/components/fields/LicenceEndDateField";

import { mapLicenceFormToUI } from "@/app/(app)/licences/components/form/licence.form.mapper";
import { getTodayISO, addDaysISO } from "@/helpers/date";
import type { LicenceFormValues } from "@/domain/licence/licence.form.types";

interface ClientApiRow {
  id: string;
  nom: string;
}

/* ------------------------------------------------------------------ */
/* Page */
/* ------------------------------------------------------------------ */

export default function CreateLicencePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [clients, setClients] = useState<ClientOption[]>([]);

  /* -------------------- Valeurs initiales -------------------- */

  const startDate = getTodayISO();

  const initialValues: LicenceFormValues = {
    nom: "Easy Project",
    clientId: null,
    status: "PENDING",
    startDate,
    endDate: addDaysISO(365),
  };

  console.log("Create licence initialValues", initialValues)

  useEffect(() => {
    async function loadClients() {
      const res = await fetch("/api/clients");
      const json = await res.json();

      console.log("📦 Réponse API clients :", json);

      setClients(
        json.data.map((c: ClientApiRow) => ({
          id: c.id,
          label: c.nom,
        }))
      );

    }

    loadClients();
  }, []);

  /* -------------------- Submit -------------------- */

  async function handleSubmit(values: LicenceFormValues) {
    try {
      setSaving(true);

      console.log("Handle sublit avant conversion mapLicenceFormToUI values ", values)

      const ui = mapLicenceFormToUI(values);

      const res = await fetch("/api/licences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ui),
      });

      if (!res.ok) {
        throw new Error();
      }

      toast.success("Licence créée");
      router.push("/licences");
    } catch {
      toast.error("Erreur lors de la création");
    } finally {
      setSaving(false);
    }
  }

  /* -------------------- Render -------------------- */

  return (
    <>
      <TransactionHeader
        title="Nouvelle licence"
        subtitle="Créer une licence client"
      />

      <LicenceForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ values, setValues }) => (
          <LicenceFormCard
            saving={saving}
            onCancel={() => router.back()}
          >
            <LicenceNameField
              value={values.nom}
              onChange={(nom) =>
                setValues((v) => ({ ...v, nom }))
              }
            />

            <LicenceClientField
              value={values.clientId}
              clients={clients}
              onChange={(clientId) =>
                setValues((v) => ({ ...v, clientId }))
              }
            />

            <LicenceStatusField
              value={values.status}
              onChange={(status) =>
                setValues((v) => ({ ...v, status }))
              }
            />

            <LicenceStartDateField
              value={values.startDate}
              onChange={(startDate) =>
                setValues((v) => ({ ...v, startDate }))
              }
            />

            <LicenceEndDateField
              start={values.startDate}
              value={values.endDate}
              onChange={(endDate) =>
                setValues((v) => ({ ...v, endDate }))
              }
            />
          </LicenceFormCard>
        )}
              </LicenceForm>
    </>
  );
}
