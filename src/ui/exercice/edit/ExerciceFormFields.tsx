

"use client";

import { useEffect, useState } from "react";
import { z } from "zod";

import type { ExerciceFormValues } from "@/ui/exercice/exercice-form.types";
import type { ExerciceFormErrors } from "@/ui/exercice/edit/ExerciceForm.props";
import type { ExerciceView } from "@/domain/exercice/exercice-types";

import { ExerciceCodeField } from "@/ui/exercice/fields/ExerciceCodeField";
import { ExerciceDebutField } from "@/ui/exercice/fields/ExerciceDebutField";
import { ExerciceFinField } from "@/ui/exercice/fields/ExerciceFinField";
import { ExerciceCommentairesField } from "@/ui/exercice/fields/ExerciceCommentairesField";
import { ExerciceActifField } from "@/ui/exercice/fields/ExerciceActifField";
import { toDateInputValue } from "@/helpers/date";

/* ------------------------------------------------------------------ */
/* Validation schemas (1 par champ)                                    */
/* ------------------------------------------------------------------ */

const codeSchema = z.string().trim();
const dateSchema = z
  .string()
  .min(1, "Champ requis")
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Format attendu : YYYY-MM-DD");

const debutSchema = dateSchema;
const finSchema = dateSchema;
const commentairesSchema = z.string().trim().optional();

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
	initialExercice: ExerciceView | null;
	errors: ExerciceFormErrors;
	onChange?: (data: ExerciceFormValues) => void;
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function ExerciceFormFields({
	initialExercice,
	errors,
	onChange,
}: Props) {

	//  console.log("ExerciceFormFields rendered");

	/* -------------------- State values -------------------- */

	const [code, setCode] = useState(initialExercice?.code ?? "");
	const [debut, setDebut] = useState<string>(toDateInputValue(initialExercice?.debut));
	const [fin, setFin] = useState<string>(toDateInputValue(initialExercice?.fin));
	const [commentaires, setCommentaires] = useState(initialExercice?.commentaires ?? "");
	const [actif, setActif] = useState<boolean>(initialExercice?.actif ?? true);

	/* -------------------- Errors (local + server) -------------------- */

	const codeError = getFieldError(code, codeSchema, errors?.fields?.code);
	const debutError = getFieldError(debut, debutSchema, errors?.fields?.debut);
	const finError = getFieldError(fin, finSchema, errors?.fields?.fin);
	const commentairesError = getFieldError(commentaires, commentairesSchema, errors?.fields?.commentaires);
	const actifError = getFieldError(actif, actifSchema, errors?.fields?.actif);

	/* -------------------- Propagation -------------------- */

	useEffect(() => {
		onChange?.({
			code,
			debut,
			fin,
			commentaires,
			actif,
		});
	}, [
		code,
		debut,
		fin,
		actif,
		commentaires,
		onChange,
	]);

	/* -------------------- Render -------------------- */

	return (
		<>

			<ExerciceCodeField
				value={code}
				onChange={setCode}
				error={codeError}
			/>

			<ExerciceDebutField
				value={debut}
				onChange={setDebut}
				error={debutError}
			/>

			<ExerciceFinField
				value={fin}
				onChange={setFin}
				error={finError}
			/>

			<ExerciceActifField
				value={actif}
				onChange={setActif}
				error={actifError}
			/>

			<ExerciceCommentairesField
				value={commentaires}
				onChange={setCommentaires}
				error={commentairesError}
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
