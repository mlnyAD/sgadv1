

"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createOperClientAssociationAction } from "@/domain/operclient/operclient.actions";
import type { OperateurView } from "@/domain/operateur/operateur-types";
import type { ClientView } from "@/domain/client/client-types";

interface OperClientCreateFormProps {
	operateurs: OperateurView[];
	clients: ClientView[];
}

export function OperClientCreateForm({
	operateurs,
	clients,
}: OperClientCreateFormProps) {
	const router = useRouter();

	//console.log("Entrée dans OperClientCreateForm clients = ", clients)
	//console.log("Entrée dans OperClientCreateForm operateurs = ", operateurs)

	async function onSubmit(formData: FormData) {
		const operateurId = formData.get("operateurId") as string;
		const clientId = formData.get("clientId") as string;

		await createOperClientAssociationAction({
			operateurId,
			clientId,
		});

		router.push("/operclients");
	}

	return (
		<form action={onSubmit} className="space-y-6 max-w-xl">
			{/* Opérateur */}
			<div>
				<label className="block text-sm mb-1">Opérateur</label>
				<select
					name="operateurId"
					required
					className="w-full border rounded-md h-9 px-2"
				>
					<option value="">— sélectionner —</option>
					{operateurs.map((op) => (
						<option key={op.id} value={op.id}>
							{op.nom} ({op.email})
						</option>
					))}
				</select>
			</div>

			{/* Client */}
			<div>
				<label className="block text-sm mb-1">Client</label>
				<select
					name="clientId"
					required
					className="w-full border rounded-md h-9 px-2"
				>
					<option value="">— sélectionner —</option>
					{clients.map((cl, index) => (
						<option
							key={cl.id || `${cl.code}-${index}`}
							value={cl.id}
						>
							{cl.nom}
						</option>
					))}
				</select>
			</div>

			<div className="flex gap-2">
				<Button type="submit" variant="axcio">
					Créer l’association
				</Button>

				<Button
					type="button"
					variant="outline"
					onClick={() => router.push("/operclients")}
				>
					Annuler
				</Button>
			</div>
		</form>
	);
}
