"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TransactionHeader } from "@/components/transaction/TransactionHeader";
import { TodoForm } from "../components/form/TodoForm";
import { TodoFormCard } from "../components/form/TodoFormCard";
import { TodoTitleField } from "../components/fields/TodoTitleField";
import { TodoTextField } from "../components/fields/TodoTextField";
import { TodoCreationField } from "../components/fields/TodoCreationField";
import { TodoClotureField } from "../components/fields/TodoClotureField";
import { TodoUrgentField } from "../components/fields/TodoUrgentField";
import { TodoImportantField } from "../components/fields/TodoImportantField";
import { TodoEtatField } from "../components/fields/TodoEtatField";
import type { TodoFormValues } from "@/domain/todo/todo.form";
import { getTodayISO, addDaysISO } from "@/helpers/date";

export default function CreateTodoPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  /* ==========================================================================
     Submit
     ========================================================================== */
  async function handleSubmit(values: TodoFormValues) {
  try {
    setSaving(true);

 const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titre: values.titre,
        text: values.text || null,
        important: values.important,
        urgent: values.urgent,
        etatId: values.etatId,
        creation: values.creation,
        cloture: values.cloture || null,
      }),
    });
    if (!res.ok) {
      throw new Error("Erreur lors de la création du todo");
    }
    
    // ✅ 1) Rafraîchir les données côté serveur
    router.refresh();

    // ✅ 2) Retour à la liste
    router.push("/todos");

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
        title="Nouvelle action"
        subtitle="Création d’une nouvelle action à réaliser"
      />

      <TodoForm
        initialValues={{
          titre: "",
          text: "",
          creation: getTodayISO(),
          cloture: addDaysISO(5),
          urgent: false,
          important: false,
          etatId: null,
        }}
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
