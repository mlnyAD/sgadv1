"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { TransactionHeader } from "@/components/transaction/TransactionHeader";
import { OperatorForm } from "@/app/(app)/operators/components/OperatorForm";
import { OperatorEmailField } from "@/app/(app)/operators/components/fields/OperatorEmailField";
import { OperatorFirstNameField } from "@/app/(app)/operators/components/fields/OperatorFirstNameField";
import { OperatorLastNameField } from "@/app/(app)/operators/components/fields/OperatorLastNameField";
import { OperatorRoleField } from "@/app/(app)/operators/components/fields/OperatorRoleField";
import { OperatorJobField } from "@/app/(app)/operators/components/fields/OperatorJobField";
import { OperatorStatusField } from "@/app/(app)/operators/components/fields/OperatorStatusField";
import { OperatorFormValues } from "@/app/(app)/operators/types";
import { toast } from "sonner";

export default function EditOperatorPage() {
  
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [initialValues, setInitialValues] = useState<OperatorFormValues | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  /* ============================
     Chargement
     ============================ */
  useEffect(() => {
    async function loadOperator() {
      try {
        const res = await fetch(`/api/operators/${id}`);
        if (!res.ok) {
          throw new Error();
        }

        const data = await res.json();

        setInitialValues({
          operator_id: data.operator_id,
          user_id: data.user_id,
          email: data.email,
          first_name: data.first_name ?? "",
          last_name: data.last_name ?? "",
          role_id: data.role_id,
          active: data.active,
          societe_id: data.societe_id ?? null,
          metier_id: data.metier_id ?? null,
        });
      } catch {
        setError("Impossible de charger l’opérateur");
      } finally {
        setLoading(false);
      }
    }

    loadOperator();
  }, [id]);

  /* ============================
     Submit
     ============================ */
  const handleSubmit = async (values: OperatorFormValues) => {
    try {
      setSaving(true);

      const res = await fetch(`/api/operators/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        throw new Error();
      }
      
      toast.success("Opérateur modifié");
      router.push("/operators");
    } catch {
      setError("Erreur lors de la sauvegarde");
      toast.error("Erreur lors de la modification de l'opérateur");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => router.back();

  /* ============================
     Rendu
     ============================ */
  if (loading) {
    return <p>Chargement…</p>;
  }

  if (error || !initialValues) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <>
      <TransactionHeader
        title="Modifier l’opérateur"
        subtitle="Informations du compte, profil opérateur et rattachement métier"
      />

      <OperatorForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        saving={saving}
      >
        {({ values, setValues }) => (
          <>
            <OperatorEmailField
              value={values.email}
              onChange={(email) =>
                setValues((p) => ({ ...p, email }))
              }
            />

            <OperatorFirstNameField
              value={values.first_name}
              onChange={(first_name) =>
                setValues((p) => ({ ...p, first_name }))
              }
            />

            <OperatorLastNameField
              value={values.last_name}
              onChange={(last_name) =>
                setValues((p) => ({ ...p, last_name }))
              }
            />

            <OperatorRoleField
              value={values.role_id}
              onChange={(role_id) =>
                setValues((p) => ({ ...p, role_id }))
              }
            />

            <OperatorJobField
              value={values.metier_id}
              onChange={(metier_id) =>
                setValues((p) => ({ ...p, metier_id }))
              }
            />

            <OperatorStatusField
              value={values.active}
              onChange={(active) =>
                setValues((p) => ({ ...p, active }))
              }
            />
          </>
        )}
      </OperatorForm>    </>
  );
}
