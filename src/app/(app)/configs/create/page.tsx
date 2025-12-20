"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TransactionHeader } from "@/components/transaction/TransactionHeader";
import { ConfigNameField } from "../components/fields/ConfigNameField";
import { ConfigTypeField } from "../components/fields/ConfigTypeField";
import { ConfigForm, ConfigFormValues } from "../components/form/ConfigForm";
import { ConfigFormCard } from "../components/form/ConfigFormCard";
import { toast } from "sonner";

export default function CreateConfigPage() {
  const router = useRouter();

//  const [label, setLabel] = useState("");
//  const [configTypeId, setConfigTypeId] = useState<ConfigTypeId | null>(null);
  const [saving, setSaving] = useState(false);

  /* ==========================================================================
     Submit
     ========================================================================== */
 async function handleSubmit(values: ConfigFormValues) {
  try {
    setSaving(true);

    const res = await fetch("/api/configs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        label: values.label,
        config_type_id: values.config_type_id,
      }),
    });

    if (!res.ok) {
      throw new Error();
    }

    toast.success("Configuration créée");
    router.push("/configs");
  } catch {
    toast.success("Erreur lors de la création");
    alert("Erreur lors de la création");
  } finally {
    setSaving(false);
  }
}


  /* ==========================================================================
     Rendu
     ========================================================================== */
  return (
    <>
      <TransactionHeader
        title="Nouvelle configuration"
        subtitle="Création d’un nouvel élément de configuration"
      />

<ConfigForm
  initialValues={{
    label: "",
    config_type_id: null,
  }}
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
