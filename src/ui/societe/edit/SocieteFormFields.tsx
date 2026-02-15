

"use client";

import { useEffect, useState } from "react";
import { z } from "zod";

import type { SocieteFormValues } from "@/ui/societe/societe-form.types";
import type { SocieteFormErrors } from "@/ui/societe/edit/SocieteForm.props";
import type { SocieteView } from "@/domain/societe/societe-types";

import { SocieteNomField } from "@/ui/societe/fields/SocieteNomField";
import { SocieteCodeField } from "@/ui/societe/fields/SocieteCodeField";
import { SocieteAdresseField } from "@/ui/societe/fields/SocieteAdresseField";
import { SocieteCodePostalField } from "@/ui/societe/fields/SocieteCodePostalField";
import { SocieteVilleField } from "@/ui/societe/fields/SocieteVilleField";
import { SocietePaysField } from "@/ui/societe/fields/SocietePaysField";
import { SocieteTelephoneField } from "@/ui/societe/fields/SocieteTelephoneField";
import { SocieteSirenField } from "@/ui/societe/fields/SocieteSirenField";
import { SocieteClientField } from "@/ui/societe/fields/SocieteClientField";
import { SocieteFournisseurField } from "@/ui/societe/fields/SocieteFournisseurField";

/* ------------------------------------------------------------------ */
/* Validation schemas (1 par champ)                                    */
/* ------------------------------------------------------------------ */

const nomSchema = z
	.string()
	.trim()
	.min(2, "Le nom de l'societe doit comporter au moins 2 caractères")
	.max(255, "Le nom de l'societe est trop long");

const codeSchema = z
	.string()
	.trim()
	.min(2, "Le code de la societe doit comporter au moins 2 caractères")
	.max(5, "Le code de la societe possède 5 caractères max.");

	
const adresseSchema = z.string().trim().optional();
const codePostalSchema = z.string().trim().optional();
const villeSchema = z.string().trim().optional();
const paysSchema = z.string().trim().optional();
const telephoneSchema = z.string().trim().optional();
const sirenSchema = z.string().trim().optional();

const clientSchema = z.boolean();
const fournisseurSchema = z.boolean();

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
	initialSociete: SocieteView | null;
	errors: SocieteFormErrors;
	onChange?: (data: SocieteFormValues) => void;
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function SocieteFormFields({
  initialSociete,
  errors,
  onChange,
}: Props) {

	//  console.log("SocieteFormFields rendered");

	/* -------------------- State values -------------------- */

	const [nom, setNom] = useState(initialSociete?.nom ?? "");
	const [code, setCode] = useState(initialSociete?.code ?? "");
	const [adresse, setAdresse] = useState(initialSociete?.adresse ?? "");
	const [codePostal, setCodePostal] = useState(initialSociete?.codePostal ?? "");
	const [ville, setVille] = useState(initialSociete?.ville ?? "");
	const [pays, setPays] = useState(initialSociete?.pays ?? "");
	const [telephone, setTelephone] = useState(initialSociete?.telephone ?? "");
	const [siren, setSiren] = useState(initialSociete?.siren ?? "");
	const [client, setClient] = useState<boolean>(initialSociete?.client ?? true);
	const [fournisseur, setFournisseur] = useState<boolean>(initialSociete?.fournisseur ?? true);

	/* -------------------- Errors (local + server) -------------------- */

	const nomError = getFieldError(nom, nomSchema, errors?.fields?.nom);
	const codeError = getFieldError(code, codeSchema, errors?.fields?.code);
	const adresseError = getFieldError(adresse, adresseSchema, errors?.fields?.adresse);
	const codePostalError = getFieldError(codePostal, codePostalSchema, errors?.fields?.codePostal);
	const villeError = getFieldError(ville, villeSchema, errors?.fields?.ville);
	const paysError = getFieldError(pays, paysSchema, errors?.fields?.pays);
	const telephoneError = getFieldError(telephone, telephoneSchema, errors?.fields?.telephone);
	const sirenError = getFieldError(siren, sirenSchema, errors?.fields?.siren);
	const clientError = getFieldError(client, clientSchema, errors?.fields?.client);
	const fournisseurError = getFieldError(fournisseur, fournisseurSchema, errors?.fields?.fournisseur);

	/* -------------------- Propagation -------------------- */

	useEffect(() => {

		onChange?.({
			nom,
			code,
			adresse,
			ville,
			codePostal,
			pays,
			telephone,
			siren,
			client,
			fournisseur,
		});
	}, [
		nom,
		code,
		adresse,
		ville,
		codePostal,
		pays,
		telephone,
		siren,
		client,
		fournisseur,
		onChange,
	]);

	/* -------------------- Render -------------------- */

	return (
		<>

				<SocieteNomField
					value={nom}
					onChange={setNom}
					error={nomError}
				/>

				<SocieteCodeField 
					value={code} 
					onChange={setCode}
					 error={codeError}
				 />

				<SocieteAdresseField 
					value={adresse} 
					onChange={setAdresse} 
					error={adresseError} 
				/>

				<SocieteCodePostalField
					value={codePostal}
					onChange={setCodePostal}
					error={codePostalError}
				/>

				<SocieteVilleField
					value={ville}
					onChange={setVille}
					error={villeError}
				/>

				<SocietePaysField
					value={pays}
					onChange={setPays}
					error={paysError}
				/>

				<SocieteTelephoneField
					value={telephone}
					onChange={setTelephone}
					error={telephoneError}
				/>

				<SocieteSirenField
					value={siren}
					onChange={setSiren}
					error={sirenError}
				/>

				<SocieteClientField
					value={client}
					onChange={setClient}
					error={clientError}
				/>

				<SocieteFournisseurField
					value={fournisseur}
					onChange={setFournisseur}
					error={fournisseurError}
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
