

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { LicenceForm } from "../../components/form/LicenceForm";
import { LicenceFormCard } from "../../components/form/LicenceFormCard";
import { mapLicenceUIToForm } from "../../components/form/licence.form.mapper";
import { mapLicenceFormToUI } from "@/domain/licence/licence.mapper";
import type { LicenceFormValues } from "@/domain/licence/licence.form.types";
import type { LicenceUI } from "@/domain/licence/licence.ui";
import { TransactionHeader } from "@/components/transaction/TransactionHeader";
import { LicenceNameField } from "../../components/fields/LicenceNameField";
import { ClientOption, LicenceClientField } from "../../components/fields/LicenceClientField";
import { LicenceStatusField } from "../../components/fields/LicenceStatusField";
import { LicenceStartDateField } from "../../components/fields/LicenceStartDateField";
import { LicenceEndDateField } from "../../components/fields/LicenceEndDateField";

interface ClientApiRow {
  id: string;
  nom: string;
}

export default function EditLicencePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [clients, setClients] = useState<ClientOption[]>([]);

  const [initialValues, setInitialValues] =
    useState<LicenceFormValues | null>(null);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/licences/${id}`);
      if (!res.ok) {
        toast.error("Licence introuvable");
        return;
      }

      const data: LicenceUI = await res.json();
      setInitialValues(mapLicenceUIToForm(data));
    }

    load();
  }, [id]);
  
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
  

  async function handleSubmit(values: LicenceFormValues) {
    try {
      setSaving(true);

      const ui = mapLicenceFormToUI(values);

      await fetch(`/api/licences/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ui),
      });

      toast.success("Licence modifiée");
      router.push("/licences");
    } catch {
      toast.error("Erreur lors de la modification");
    } finally {
      setSaving(false);
    }
  }

  if (!initialValues) {
    return <p>Chargement…</p>;
  }

  return (

    <>
      <TransactionHeader
        title="Modification  licence"
        subtitle="Modifier une licence client"
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
