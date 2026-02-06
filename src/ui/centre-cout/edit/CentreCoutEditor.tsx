

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import type { CentreCoutView } from "@/domain/centre-cout/centre-cout-types";
import { saveCentreCout } from "@/features/centre-cout/centre-cout-actions";

import { TransactionHeader } from "@/components/transaction/TransactionHeader";
import { CentreCoutFormCard } from "@/ui/centre-cout/edit/CentreCoutFormCard";
import { CentreCoutFormFields } from "@/ui/centre-cout/edit/CentreCoutFormFields";

import type { CentreCoutFormValues } from "@/ui/centre-cout/centre-cout-form.types";
import type { CentreCoutFormErrors } from "@/ui/centre-cout/edit/CentreCoutForm.props";

export function CentreCoutEditor({
	initialCentreCout,
	clients = [],
}: {
	initialCentreCout: CentreCoutView | null;
	clients: { id: string; nom: string }[];
}) {

	const router = useRouter();

	//console.log("CentreCoutEditor clients = ", clients)

	const [formData, setFormData] =
		useState<CentreCoutFormValues | null>(null);
	const [errors, setErrors] =
		useState<CentreCoutFormErrors>({});
	const [saving, setSaving] = useState(false);

	const handleSubmit = async (
		data: CentreCoutFormValues,
		centreCoutId?: string
	) => {

		//console.log("HandleSubmit data ", data)

		setSaving(true);
		setErrors({});

		try {
			await saveCentreCout(data, centreCoutId);
			router.push("/centres-cout");
		} catch (e) {
			const message =
				e instanceof Error
					? e.message
					: "Erreur lors de l’enregistrement";

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
					initialCentreCout
						? "Modifier le centre de coût"
						: "Nouveau centre de coût"
				}
				subtitle={
					initialCentreCout
						? "Modification des informations du centre de coût"
						: "Création d’un nouveau centre de coût"
				}
			/>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					 if (!formData) {
      console.warn("No form data");
      return;
    }

   // console.log("✅ CentreCoutEditor submit", formData);
					handleSubmit(formData, initialCentreCout?.id.toString());
				}}
			>
				<CentreCoutFormCard
					initialCentreCout={initialCentreCout}
					errors={errors}
					saving={saving}
					onCancel={() => router.back()}
				>
					<CentreCoutFormFields
						initialCentreCout={initialCentreCout}
						clients={clients}
						errors={errors}
						onChange={setFormData}
					/>
				</CentreCoutFormCard>
			</form>
		</>
	);
}
