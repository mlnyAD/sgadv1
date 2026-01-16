"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TransactionHeader } from "@/components/transaction/TransactionHeader";
import { SocieteNameField } from "../components/fields/SocieteNameField";
import { SocieteAdresse1Field } from "../components/fields/SocieteAdresse1Field";
import { SocieteAdresse2Field } from "../components/fields/SocieteAdresse2Field";
import { SocieteAdresse3Field } from "../components/fields/SocieteAdresse3Field";
import { SocieteVilleField } from "../components/fields/SocieteVilleField";
import { SocieteCodePostalField } from "../components/fields/SocieteCodePostalField";
import { SocieteForm, SocieteFormValues } from "../components/form/SocieteForm";
import { SocieteFormCard } from "../components/form/SocieteFormCard";
import { toast } from "sonner";
import { mapSocieteFormToUI } from "@/app/(app)/societes/components/form/societe.form.mapper";
import { mapSocieteUIToForm } from "@/app/(app)/societes/components/form/societe.form.mapper";

export default function CreateSocietePage() {
  const router = useRouter();

  //  const [label, setLabel] = useState("");
  //  const [configTypeId, setConfigTypeId] = useState<ConfigTypeId | null>(null);
  const [saving, setSaving] = useState(false);

  /* ==========================================================================
     Submit
     ========================================================================== */
  async function handleSubmit(values: SocieteFormValues) {
    try {
      setSaving(true);

      const payload = mapSocieteFormToUI(values);

      const res = await fetch("/api/societes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error();
      }

      toast.success("Société créée");
      router.push("/societes");
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
        title="Nouvelle société"
        subtitle="Création d’une nouvelle société"
      />

      <SocieteForm
        initialValues={mapSocieteUIToForm()}
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
