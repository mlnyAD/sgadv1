"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { SocieteForm } from "@/app/(app)/societes/components/form/SocieteForm";
import type { SocieteFormValues } from "@/app/(app)/societes/components/form/SocieteForm";

import { SocieteNameField } from "@/app/(app)/societes/components/fields/SocieteNameField";
import { SocieteAdresse1Field } from "@/app/(app)/societes/components/fields/SocieteAdresse1Field";
import { SocieteAdresse2Field } from "@/app/(app)/societes/components/fields/SocieteAdresse2Field";
import { SocieteAdresse3Field } from "@/app/(app)/societes/components/fields/SocieteAdresse3Field";
import { SocieteVilleField } from "@/app/(app)/societes/components/fields/SocieteVilleField ";
import { SocieteCodePostalField } from "@/app/(app)/societes/components/fields/SocieteCodePostalField";

import { TransactionHeader } from "@/components/transaction/TransactionHeader";
import { SocieteFormCard } from "@/app/(app)/societes/components/form/SocieteFormCard";
import { mapSocieteFormToUI } from "@/app/(app)/societes/components/form/societe.form.mapper";
import { mapSocieteUIToForm } from "@/app/(app)/societes/components/form/societe.form.mapper";

export default function EditSocietePage() {

  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [initialValues, setInitialValues] = useState<SocieteFormValues | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ------------------------------------------------------------------
     Chargement de la configuration
     ------------------------------------------------------------------ */
  useEffect(() => {
    async function loadSociete() {
      try {
        const res = await fetch(`/api/societes/${id}`);
        if (!res.ok) {
          throw new Error();
        }

        const data = await res.json();

        setInitialValues(mapSocieteUIToForm(data));

      } catch {
        toast.error("Impossible de charger la societe");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadSociete();
    }
  }, [id]);

  /* ------------------------------------------------------------------
     Submit
     ------------------------------------------------------------------ */
  async function handleSubmit(values: SocieteFormValues) {
    try {
      setSaving(true);

  const payload = mapSocieteFormToUI(values);

  const res = await fetch(`/api/societes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

      if (!res.ok) {
        throw new Error();
      }

      toast.success("Societe modifiée");
      router.push("/societes");
    } catch {
      toast.error("Erreur lors de la modification");
    } finally {
      setSaving(false);
    }
  }

  /* ------------------------------------------------------------------
     Rendu conditionnel (CRITIQUE)
     ------------------------------------------------------------------ */
  if (loading || !initialValues) {
    return <p>Chargement…</p>;
  }

  return (
    <>
      <TransactionHeader
        title="Modifier une société"
        subtitle="Mettre à jour les informations de la société"
      />

      <SocieteForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onCancel={() => router.back()}
        saving={saving}
      >
        {({ values, setValues }) => (
          <SocieteFormCard
            onCancel={() => router.back()}
            saving={saving}
          >
            <SocieteNameField
              value={values.nom}
              onChange={(nom) =>
                setValues((v) => ({ ...v, nom }))
              }
            />

            <SocieteAdresse1Field
              value={values.adresse1}
              onChange={(adresse1) =>
                setValues((v) => ({ ...v, adresse1 }))
              }
            />

            <SocieteAdresse2Field
              value={values.adresse2}
              onChange={(adresse2) =>
                setValues((v) => ({ ...v, adresse2 }))
              }
            />

            <SocieteAdresse3Field
              value={values.adresse3}
              onChange={(adresse3) =>
                setValues((v) => ({ ...v, adresse3 }))
              }
            />

            <SocieteVilleField
              value={values.ville}
              onChange={(ville) =>
                setValues((v) => ({ ...v, ville }))
              }
            />

            <SocieteCodePostalField
              value={values.codePostal}
              onChange={(codePostal) =>
                setValues((v) => ({ ...v, codePostal }))
              }
            />
          </SocieteFormCard>
        )}
      </SocieteForm>
    </>
  );
}
