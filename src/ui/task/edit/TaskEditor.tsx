

"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { TaskView } from "@/domain/task/task-view";
import { saveTask, TaskFormData } from "@/features/task/task-actions";
import { TransactionHeader } from "@/components/transaction/TransactionHeader";
import { TaskFormCard } from "@/ui/task/edit/TaskFormCard";
import { TaskFormFields } from "@/ui/task/edit/TaskFormFields";
import type { TaskFormErrors } from "@/ui/task/edit/TaskForm.props";
import type { TaskFormValues, OperatorOption } from "@/ui/task/task-form.types";


/* ------------------------------------------------------------------
   Component
   ------------------------------------------------------------------ */

export function TaskEditor({
  projectId,
  lottravId,
  initialTask,
  operators,
}: {
  projectId: number;
  lottravId: number,
  initialTask: TaskView | null;
  operators: OperatorOption[];
}) {

  const router = useRouter();

  const [formData, setFormData] = useState<TaskFormValues | null>(null);
  const [errors, setErrors] = useState<TaskFormErrors>({});
  const [saving, setSaving] = useState(false);

  /* ------------------------------
     Form change handler
     ------------------------------ */

  const handleChange = useCallback((data: TaskFormValues) => {
    setFormData(data);

    const nextErrors: TaskFormErrors = {};

    if (data.startDate && data.endDate && data.startDate > data.endDate) {
      nextErrors.fields = {
        endDate:
          "La date de fin doit être postérieure à la date de début",
      };
    }

    setErrors((prev) =>
      JSON.stringify(prev) === JSON.stringify(nextErrors)
        ? prev
        : nextErrors
    );
  }, []);

  /* ------------------------------
     Submit
     ------------------------------ */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData || saving) return;

    if (errors.fields && Object.keys(errors.fields).length > 0) {
      return;
    }

    try {
      setSaving(true);

      const data: TaskFormData = {
        name: formData.name,               
        startDate: formData.startDate,
        endDate: formData.endDate,
        duree: formData.duree,
        avancement: formData.avancement,
        etatId: formData.etatId,
        responsableId: formData.responsableId,
      };

      await saveTask(
        projectId,
        lottravId,
        data,
        initialTask?.id
      );

      toast.success("Tâche enregistrée avec succès");
      router.push(`/projects/${projectId}/lots/${lottravId}/tasks`);
    } catch {
      toast.error("Erreur lors de l'enregistrement de la tâche");

      setErrors({
        global: ["Erreur lors de l'enregistrement de la tâche"],
      });
    } finally {
      setSaving(false);
    }
  };

  /* ------------------------------
     Cancel
     ------------------------------ */

  const handleCancel = () => {
    router.push(`/projects/${projectId}/lots/${lottravId}/tasks`);
  };

  /* ------------------------------
     Render
     ------------------------------ */

  return (
    <>
      <TransactionHeader
        title={
          initialTask
            ? "Modifier la tâche"
            : "Nouvelle tâche"
        }
        subtitle={
          initialTask
            ? "Modification des informations de la tâche"
            : "Création d’une nouvelle tâche"
        }
      />

      <form onSubmit={handleSubmit}>
        <TaskFormCard
          onCancel={handleCancel}
          saving={saving}
        >
          <TaskFormFields
            initialTask={initialTask}
            operators={operators}
            errors={errors}
            onChange={handleChange}
          />
        </TaskFormCard>
      </form>
    </>
  );
}
