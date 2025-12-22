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

import type { TodoFormValues } from "@/domain/todo/todo.form";

export default function EditTodoPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [initialValues, setInitialValues] =
    useState<TodoFormValues | null>(null);

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

        const data = await res.json();

        // 🔁 Mapping API → Form
        setInitialValues({
          titre: data.todo_titre ?? "",
          text: data.todo_text ?? "",
          creation: data.todo_creation ?? "",
          cloture: data.todo_cloture ?? "",
          urgent: Boolean(data.todo_urgent),
          important: Boolean(data.todo_important),
          etatId: data.todo_etat_id ?? null,
        });
      } catch {
        toast.error("Impossible de charger l'action");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadTodo();
    }
  }, [id]);

  /* ------------------------------------------------------------------
     Submit
     ------------------------------------------------------------------ */
  async function handleSubmit(values: TodoFormValues) {
    try {
      setSaving(true);

      const res = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          todo_titre: values.titre,
          todo_text: values.text || null,
          todo_urgent: values.urgent,
          todo_important: values.important,
          todo_etat_id: values.etatId,
          todo_creation: values.creation,
          todo_cloture: values.cloture || null,
        }),
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
    return <p>Chargement…</p>;
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
