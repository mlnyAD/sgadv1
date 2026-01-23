

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ClientView } from "@/domain/client/client-types";
import { saveClient } from "@/features/client/client-actions";
import { TransactionHeader } from "@/components/transaction/TransactionHeader";
import { ClientFormCard } from "@/ui/client/edit/ClientFormCard";
import { ClientFormFields } from "@/ui/client/edit/ClientFormFields";
import type { ClientFormValues } from "@/ui/client/client-form.types";
import type { ClientFormErrors } from "@/ui/client/edit/ClientForm.props";


export function ClientEditor({
	initialClient,
}: {
	initialClient: ClientView | null;
}) {
	const router = useRouter();

const [formData, setFormData] = useState<ClientFormValues | null>(null);
const [errors, setErrors] = useState<ClientFormErrors>({});
const [saving, setSaving] = useState(false);

const handleSubmit = async (
  data: ClientFormValues,
  clientId?: string
) => {
  setSaving(true);
  setErrors({});

  try {
    await saveClient(data, clientId);
    router.push("/clients");
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Erreur lors de l’enregistrement";

    setErrors({
      global: [message],
      fields: {},
    });
  } finally {
    setSaving(false);
  }
};


	return (
		<>
			<TransactionHeader
				title={
					initialClient ? "Modifier le client" : "Nouveau client"
				}
				subtitle={
					initialClient
						? "Modification des informations du client"
						: "Création d’un nouveau client"
				}
			/>
<form
  onSubmit={(e) => {
    e.preventDefault();
    if (!formData) return;
    handleSubmit(formData, initialClient?.id);
  }}
>
  <ClientFormCard
    initialClient={initialClient}
    errors={errors}
    saving={saving}
    onCancel={() => router.back()}
  >
    <ClientFormFields
      initialClient={initialClient}
      errors={errors}
      onChange={setFormData}
    />
  </ClientFormCard>
</form>
		</>
	);
}
