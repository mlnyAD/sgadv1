"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { TransactionHeader } from "@/components/transaction/TransactionHeader";
import { TodoForm } from "@/app/(app)/todos/components/form/TodoForm";
import { TodoFormCard } from "@/app/(app)/todos/components/form/TodoFormCard";
import { TodoTitleField } from "@/app/(app)/todos/components/fields/TodoTitleField";
import { TodoTextField } from "@/app/(app)/todos/components/fields/TodoTextField";
import { TodoCreationField } from "@/app/(app)/todos/components/fields/TodoCreationField";
import { TodoClotureField } from "@/app/(app)/todos/components/fields/TodoClotureField";
import { TodoUrgentField } from "@/app/(app)/todos/components/fields/TodoUrgentField";
import { TodoImportantField } from "@/app/(app)/todos/components/fields/TodoImportantField";
import { TodoEtatField } from "@/app/(app)/todos/components/fields/TodoEtatField";
import type { TodoFormValues } from "@/app/(app)/todos/components/form/TodoForm";
import { TodoUI } from "@/domain/todo";
import { mapTodoFormToUI, mapTodoUIToForm } from "../../components/form/todo.form.mapper";

export default function EditTodoPage() {

  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [initialValues, setInitialValues] = useState<TodoFormValues | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ------------------------------------------------------------------
     Chargement du todo
     ------------------------------------------------------------------ */
  useEffect(() => {
    async function loadTodo() {
      try {
        const res = await fetch(`/api/todos/${id}`);
        if (!res.ok) throw new Error();

        const data: TodoUI = await res.json();

        //console.log("recherche article todo ", data);

        // 🔁 Mapping API → Form
        setInitialValues(mapTodoUIToForm(data));

      } catch {
        toast.error("Impossible de charger l'action");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      //console.log("Chargement des données à modifier")
      loadTodo();
    }
  }, [id]);

  /* ------------------------------------------------------------------
     Submit
     ------------------------------------------------------------------ */
  async function handleSubmit(values: TodoFormValues) {
    try {
      setSaving(true);

      const payload = mapTodoFormToUI(values);

      //console.log("Sauvegarde Todo payload ", payload)

      const res = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();

      toast.success("Action modifiée");
      router.push("/todos");
    } catch {
      toast.error("Erreur lors de la modification");
    } finally {
      setSaving(false);
    }
  }

  /* ------------------------------------------------------------------
     Rendu conditionnel
     ------------------------------------------------------------------ */
  if (loading || !initialValues) {
    return <p>Chargement en cours…</p>;
  }

  return (
    <>
      <TransactionHeader
        title="Modifier une action"
        subtitle="Mettre à jour les informations de l'action"
      />

      <TodoForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onCancel={() => router.back()}
        saving={saving}
      >
        {({ values, setValues }) => (
          <TodoFormCard
            onCancel={() => router.back()}
            saving={saving}
          >
            <TodoTitleField
              value={values.titre}
              onChange={(titre) =>
                setValues((v) => ({ ...v, titre }))
              }
            />

            <TodoTextField
              value={values.text}
              onChange={(text) =>
                setValues((v) => ({ ...v, text }))
              }
            />
            

            <TodoCreationField
              value={values.creation}
              onChange={(creation) =>
                setValues((v) => ({ ...v, creation }))
              }
            />

            <TodoClotureField
              value={values.cloture}
              onChange={(cloture) =>
                setValues((v) => ({ ...v, cloture }))
              }
            />

            <TodoUrgentField
              value={values.urgent}
              onChange={(urgent) =>
                setValues((v) => ({ ...v, urgent }))
              }
            />

            <TodoImportantField
              value={values.important}
              onChange={(important) =>
                setValues((v) => ({ ...v, important }))
              }
            />

            <TodoEtatField
              value={values.etatId}
              onChange={(etatId) =>
                setValues((v) => ({ ...v, etatId }))
              }
            />
          </TodoFormCard>
        )}
      </TodoForm>
    </>
  );
}
