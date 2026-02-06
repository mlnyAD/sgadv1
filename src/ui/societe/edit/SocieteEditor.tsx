

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { SocieteView } from "@/domain/societe/societe-types";
import { saveSociete } from "@/features/societe/societe-actions";
import { TransactionHeader } from "@/components/transaction/TransactionHeader";
import { SocieteFormCard } from "@/ui/societe/edit/SocieteFormCard";
import { SocieteFormFields } from "@/ui/societe/edit/SocieteFormFields";
import type { SocieteFormValues } from "@/ui/societe/societe-form.types";
import type { SocieteFormErrors } from "@/ui/societe/edit/SocieteForm.props";
import { mapFormToSocieteView } from "@/domain/societe/societe-mapper";


export function SocieteEditor({
	initialSociete,
}: {
	initialSociete: SocieteView | null;
	cltId: string,
}) {
	const router = useRouter();

	const [formData, setFormData] = useState<SocieteFormValues | null>(null);
	const [errors, setErrors] = useState<SocieteFormErrors>({});
	const [saving, setSaving] = useState(false);

	const handleSubmit = async (
		data: SocieteFormValues,
		societeId?: string
	) => {
		setSaving(true);
		setErrors({});

		const societeView = mapFormToSocieteView(
			data,
			societeId
		);

		try {

			await saveSociete(societeView);
			router.push("/societes");
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
					initialSociete ? "Modifier la societe" : "Nouvelle societe"
				}
				subtitle={
					initialSociete
						? "Modification des informations d'une societe"
						: "Création d’une nouvelle societe"
				}
			/>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					if (!formData) return;
					handleSubmit(formData, initialSociete?.id);
				}}
			>
				<SocieteFormCard
					initialSociete={initialSociete}
					errors={errors}
					saving={saving}
					onCancel={() => router.back()}
				>
					<SocieteFormFields
						initialSociete={initialSociete}
						cltId={initialSociete?.cltId ?? ""}
						errors={errors}
						onChange={setFormData}
					/>
				</SocieteFormCard>
			</form>
		</>
	);
}
