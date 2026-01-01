"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TransactionHeader } from "@/components/transaction/TransactionHeader";
import { toast } from "sonner";
import { ConfigNameField } from "../components/fields/ConfigNameField";
import { ConfigTypeField } from "../components/fields/ConfigTypeField";
import { ConfigForm, ConfigFormValues, } from "../components/form/ConfigForm";
import { ConfigFormCard } from "../components/form/ConfigFormCard";
import { mapConfigFormToUI, mapConfigUIToForm, } from "../components/form/config.form.mapper";

export default function CreateConfigPage() {
  
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  /* ======================================================================
     Submit
     ====================================================================== */
  async function handleSubmit(values: ConfigFormValues) {
    try {
      setSaving(true);

      const payload = mapConfigFormToUI(values);

      console.log("CREATE payload", payload);

      const res = await fetch("/api/configs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      console.log("Retour create", res);

      if (!res.ok) {
        throw new Error();
      }

      toast.success("Configuration créée");
      router.push("/configs");
    } catch {
      toast.error("Erreur lors de la création");
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
        title="Nouvelle configuration"
        subtitle="Création d’un nouvel élément de configuration"
      />

      <ConfigForm
        initialValues={mapConfigUIToForm()}
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
