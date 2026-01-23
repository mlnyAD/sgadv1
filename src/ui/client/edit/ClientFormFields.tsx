

"use client";

import { useEffect, useState } from "react";
import { z } from "zod";

import type { ClientFormValues } from "@/ui/client/client-form.types";
import type { ClientFormErrors } from "@/ui/client/edit/ClientForm.props";
import type { ClientView } from "@/domain/client/client-types";

import { ClientNomField } from "@/ui/client/fields/ClientNomField";
import { ClientCodeField } from "@/ui/client/fields/ClientCodeField";
import { ClientAdresseField } from "@/ui/client/fields/ClientAdresseField";
import { ClientCodePostalField } from "@/ui/client/fields/ClientCodePostalField";
import { ClientVilleField } from "@/ui/client/fields/ClientVilleField";
import { ClientPaysField } from "@/ui/client/fields/ClientPaysField";
import { ClientEmailField } from "@/ui/client/fields/ClientEmailField";
import { ClientTelephoneField } from "@/ui/client/fields/ClientTelephoneField";
import { ClientActifField } from "@/ui/client/fields/ClientActifField";

/* ------------------------------------------------------------------ */
/* Validation schemas (1 par champ)                                    */
/* ------------------------------------------------------------------ */

const nomSchema = z
	.string()
	.trim()
	.min(2, "Le nom du client doit comporter au moins 2 caractères")
	.max(255, "Le nom du client est trop long");

const codeSchema = z.string().trim().optional();

const adresseSchema = z.string().trim().optional();
const codePostalSchema = z.string().trim().optional();
const villeSchema = z.string().trim().optional();
const paysSchema = z.string().trim().optional();

const emailSchema = z
	.string()
	.trim()
	.email("Adresse email invalide")
	.optional();

const telephoneSchema = z.string().trim().optional();

const actifSchema = z.boolean();

/* ------------------------------------------------------------------ */
/* Utils                                                               */
/* ------------------------------------------------------------------ */

function getFieldError(
	value: unknown,
	schema: z.ZodTypeAny,
	serverError?: string | null
): string | null {
	const parsed = schema.safeParse(value);
	if (!parsed.success) {
		return parsed.error.issues[0].message;
	}
	return serverError ?? null;
}

/* ------------------------------------------------------------------ */
/* Props                                                               */
/* ------------------------------------------------------------------ */

interface Props {
	initialClient: ClientView | null;
	errors: ClientFormErrors;
	onChange?: (data: ClientFormValues) => void;
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function ClientFormFields({
	initialClient,
	errors,
	onChange,
}: Props) {

	//  console.log("ClientFormFields rendered");

	/* -------------------- State values -------------------- */

	const [nom, setNom] = useState(initialClient?.nom ?? "");
	const [code, setCode] = useState(initialClient?.code ?? "");
	const [adresse, setAdresse] = useState(initialClient?.adresse ?? "");
	const [codePostal, setCodePostal] = useState(initialClient?.codePostal ?? "");
	const [ville, setVille] = useState(initialClient?.ville ?? "");
	const [pays, setPays] = useState(initialClient?.pays ?? "");
	const [email, setEmail] = useState(initialClient?.email ?? "");
	const [telephone, setTelephone] = useState(initialClient?.telephone ?? "");
	const [actif, setActif] = useState<boolean>(initialClient?.actif ?? true);

	/* -------------------- Errors (local + server) -------------------- */

	const nomError = getFieldError(nom, nomSchema, errors?.fields?.nom);
	const codeError = getFieldError(code, codeSchema, errors?.fields?.code);
	const adresseError = getFieldError(adresse, adresseSchema, errors?.fields?.adresse);
	const codePostalError = getFieldError(codePostal, codePostalSchema, errors?.fields?.codePostal);
	const villeError = getFieldError(ville, villeSchema, errors?.fields?.ville);
	const paysError = getFieldError(pays, paysSchema, errors?.fields?.pays);
	const emailError = getFieldError(email, emailSchema, errors?.fields?.email);
	const telephoneError = getFieldError(telephone, telephoneSchema, errors?.fields?.telephone);
	const actifError = getFieldError(actif, actifSchema, errors?.fields?.actif);

	/* -------------------- Propagation -------------------- */

	useEffect(() => {
		onChange?.({
			nom,
			code,
			adresse,
			codePostal,
			ville,
			pays,
			email,
			telephone,
			actif,
		});
	}, [
		nom,
		code,
		adresse,
		codePostal,
		ville,
		pays,
		email,
		telephone,
		actif,
		onChange,
	]);

	/* -------------------- Render -------------------- */

	return (
		<>

				<ClientNomField
					value={nom}
					onChange={setNom}
					error={nomError}
				/>

				<ClientCodeField value={code} onChange={setCode} error={codeError} />

				<ClientAdresseField
					value={adresse}
					onChange={setAdresse}
					error={adresseError}
				/>

				<ClientCodePostalField
					value={codePostal}
					onChange={setCodePostal}
					error={codePostalError}
				/>

				<ClientVilleField value={ville} onChange={setVille} error={villeError} />

				<ClientPaysField value={pays} onChange={setPays} error={paysError} />

				<ClientEmailField value={email} onChange={setEmail} error={emailError} />

				<ClientTelephoneField
					value={telephone}
					onChange={setTelephone}
					error={telephoneError}
				/>

				<ClientActifField
					value={actif}
					onChange={setActif}
					error={actifError}
				/>

			{errors.global?.length ? (
				<div className="rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
					<ul className="list-disc pl-5">
						{errors.global.map((msg, i) => (
							<li key={i}>{msg}</li>
						))}
					</ul>
				</div>
			) : null}
		</>
	);
}
