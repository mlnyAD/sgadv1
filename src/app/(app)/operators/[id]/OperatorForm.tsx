// src/app/(app)/operators/[id]/operatorForm.tsx
"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Operator } from "@/domain/operator/operator.interface";
import { createOperatorAction, updateOperatorAction } from "./server-actions";
import { USER_ROLES } from "@/domain/user/roles/user-role.enum";

export interface ConfigItem {
  config_id: number;
  config_nom: string;
  config_type: number;
}

interface OperatorFormProps {
  initialData: Operator | null;
  isNew: boolean;
  metiers: ConfigItem[];    // ← AJOUT ESSENTIEL
}

export function OperatorForm({ initialData, isNew, metiers }: OperatorFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const payload = {
        email: formData.get("email") as string,
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        roleId: Number(formData.get("roleId")),
        metierId: formData.get("metierId") ? Number(formData.get("metierId")) : null,
        societeId: formData.get("societeId") ? Number(formData.get("societeId")) : null,
        active: formData.get("active") === "on",
      };

      if (isNew) {
        await createOperatorAction(payload);
      } else if (initialData) {
        await updateOperatorAction(initialData.id, payload);
      }

      router.push("/operators");
      router.refresh();
    });
  };

  return (
    <form className="flex flex-col gap-4 max-w-xl" action={handleSubmit}>
      <h1 className="text-xl font-semibold">
        {isNew ? "Nouvel opérateur" : "Modification opérateur"}
      </h1>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Nom</label>
          <input
            name="lastName"
            defaultValue={initialData?.lastName ?? ""}
            className="input"
          />
        </div>

        <div>
          <label>Prénom</label>
          <input
            name="firstName"
            defaultValue={initialData?.firstName ?? ""}
            className="input"
          />
        </div>
      </div>

      <div>
        <label>Email</label>
        <input
          name="email"
          type="email"
          defaultValue={initialData?.email ?? ""}
          className="input"
        />
      </div>

      <div>
        <label>Rôle</label>
        <select
          name="roleId"
          defaultValue={initialData?.roleId ?? USER_ROLES.USER.id}
          className="input"
        >
          {Object.values(USER_ROLES).map((role) => (
            <option key={role.id} value={role.id}>
              {role.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Métier</label>
        <select
          name="metierId"
          defaultValue={initialData?.metierId ?? ""}
          className="input"
        >
          <option value="">(aucun)</option>

          {metiers.map((m: ConfigItem) => (
            <option key={m.config_id} value={m.config_id}>
              {m.config_nom}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Société</label>
        <input
          name="societeId"
          defaultValue={initialData?.societeId ?? ""}
          className="input"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="active"
          defaultChecked={initialData?.active ?? true}
        />
        <span>Actif</span>
      </div>

      <div className="flex gap-2 justify-end">
        <button type="button" onClick={() => router.push("/operators")} disabled={isPending}>
          Annuler
        </button>
        <button type="submit" className="btn btn-primary" disabled={isPending}>
          Enregistrer
        </button>
      </div>
    </form>
  );
}
