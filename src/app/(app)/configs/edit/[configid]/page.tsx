"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { TransactionHeader } from "@/components/transaction/TransactionHeader";
import { ConfigForm, ConfigFormValues, } from "@/app/(app)/configs/components/form/ConfigForm";
import { ConfigFormCard } from "@/app/(app)/configs/components/form/ConfigFormCard";
import { ConfigNameField } from "@/app/(app)/configs/components/fields/ConfigNameField";
import { ConfigTypeField } from "@/app/(app)/configs/components/fields/ConfigTypeField";
import { mapConfigFormToUI, mapConfigUIToForm, } from "@/app/(app)/configs/components/form/config.form.mapper";
import { ConfigUI } from "@/domain/config";

export default function EditConfigPage() {

  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [initialValues, setInitialValues] = useState<ConfigFormValues | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ------------------------------------------------------------------
     Load config
     ------------------------------------------------------------------ */
  useEffect(() => {
    async function loadConfig() {
      try {
        const res = await fetch(`/api/configs/${id}`);
        if (!res.ok) {
          throw new Error();
        }

        const data: ConfigUI = await res.json();

        setInitialValues(mapConfigUIToForm(data));
      } catch {
        toast.error("Impossible de charger la configuration");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadConfig();
    }
  }, [id]);

  /* ------------------------------------------------------------------
     Submit
     ------------------------------------------------------------------ */
  async function handleSubmit(values: ConfigFormValues) {
    try {
      setSaving(true);

      const payload = mapConfigFormToUI(values);

      const res = await fetch(`/api/configs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error();
      }

      toast.success("Configuration modifiée");
      router.push("/configs");
    } catch {
      toast.error("Erreur lors de la modification");
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
        title="Modifier une configuration"
        subtitle="Mettre à jour les informations de la configuration"
      />

      <ConfigForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onCancel={() => router.back()}
        saving={saving}
      >
        {({ values, setValues }) => (
          <ConfigFormCard
            onCancel={() => router.back()}
            saving={saving}
          >
            <ConfigNameField
              value={values.nom}
              onChange={(nom) =>
                setValues((v) => ({ ...v, nom }))
              }
            />

            <ConfigTypeField
              value={values.typeId}
              onChange={(typeId) =>
                setValues((v) => ({ ...v, typeId }))
              }
            />
          </ConfigFormCard>
        )}
      </ConfigForm>
    </>
  );
}
