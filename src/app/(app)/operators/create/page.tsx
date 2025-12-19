"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

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

export default function CreateOperatorPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ============================
     Initial values (create)
     ============================ */
  const initialValues: OperatorFormValues = {
    operator_id: 0,          // valeur factice, ignorée côté backend
    user_id: null,
    email: "",
    first_name: "",
    last_name: "",
    role_id: null,
    active: true,
    societe_id: null,
    metier_id: null,
  };

  /* ============================
     Submit
     ============================ */
  const handleSubmit = async (values: OperatorFormValues) => {
    try {
      setSaving(true);
      setError(null);

      const res = await fetch("/api/operators", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      console.log("HandleSubmit Create Operator values -> ", values);
      console.log("HandleSubmit Create Operator res -> ", res);

      
      if (!res.ok) {
        throw new Error();
      }
      toast.success("Opérateur créé");
      router.push("/operators");
    } catch {
      setError("Erreur lors de la création de l’opérateur");
      toast.error("Erreur lors de la création de l'opérateur");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  /* ============================
     Rendu
     ============================ */
  return (
    <>
      <TransactionHeader
        title="Créer un opérateur"
        subtitle="Création d’un nouveau compte opérateur"
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
              onChange={(email: string) =>
                setValues((p) => ({ ...p, email }))
              }
            />

            <OperatorFirstNameField
              value={values.first_name}
              onChange={(first_name: string) =>
                setValues((p) => ({ ...p, first_name }))
              }
            />

            <OperatorLastNameField
              value={values.last_name}
              onChange={(last_name: string) =>
                setValues((p) => ({ ...p, last_name }))
              }
            />

            <OperatorRoleField
              value={values.role_id}
              onChange={(role_id: number | null) =>
                setValues((p) => ({ ...p, role_id }))
              }
            />

            <OperatorJobField
              value={values.metier_id}
              onChange={(metier_id: number | null) =>
                setValues((p) => ({ ...p, metier_id }))
              }
            />

            <OperatorStatusField
              value={values.active}
              onChange={(active: boolean) =>
                setValues((p) => ({ ...p, active }))
              }
            />
          </>
        )}
      </OperatorForm>

      {error && (
        <p className="mt-4 text-sm text-red-600">
          {error}
        </p>
      )}
    </>
  );
}
