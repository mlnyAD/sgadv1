"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { ConfigForm } from "@/app/(app)/configs/components/form/ConfigForm";
import type { ConfigFormValues } from "@/app/(app)/configs/components/form/ConfigForm";

import { ConfigNameField } from "@/app/(app)/configs/components/fields/ConfigNameField";
import { ConfigTypeField } from "@/app/(app)/configs/components/fields/ConfigTypeField";

import { TransactionHeader } from "@/components/transaction/TransactionHeader";
import { ConfigFormCard } from "../../components/form/ConfigFormCard";

export default function EditConfigPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [initialValues, setInitialValues] =
    useState<ConfigFormValues | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ------------------------------------------------------------------
     Chargement de la configuration
     ------------------------------------------------------------------ */
  useEffect(() => {
    async function loadConfig() {
      try {
        const res = await fetch(`/api/configs/${id}`);
        if (!res.ok) {
          throw new Error();
        }

        const data = await res.json();

        setInitialValues({
          label: data.config_nom,
          config_type_id: data.config_type,
        });
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

      const res = await fetch(`/api/configs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          label: values.label,
          config_type_id: values.config_type_id,
        }),
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
     Rendu conditionnel (CRITIQUE)
     ------------------------------------------------------------------ */
  if (loading || !initialValues) {
    return <p>Chargement…</p>;
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
        value={values.label}
        onChange={(label) =>
          setValues((v) => ({ ...v, label }))
        }
      />

      <ConfigTypeField
        value={values.config_type_id}
        onChange={(config_type_id) =>
          setValues((v) => ({ ...v, config_type_id }))
        }
      />
    </ConfigFormCard>
  )}
</ConfigForm>
    </>
  );
}
