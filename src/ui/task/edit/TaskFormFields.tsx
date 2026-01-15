

"use client";

import { useEffect, useState } from "react";
import { TaskNameField } from "@/ui/task/fields/TaskNameField";
import { TaskStartDateField } from "@/ui/task/fields/TaskStartDateField";
import { TaskEndDateField } from "@/ui/task/fields/TaskEndDateField";
import { TaskStatusField } from "@/ui/task/fields/TaskStatusField";
import type { TaskStatusId } from "@/domain/task/task-status";
import { TaskResponsableField } from "@/ui/task/fields/TaskResponsableField";
import type { TaskFormValues, OperatorOption } from "@/ui/task/task-form.types";
import type { TaskFormErrors } from "@/ui/task/edit/TaskForm.props";
import { TaskView } from "@/domain/task/task-view";
import { TaskDureeField } from "../fields/TaskDureeField";
import { TaskAvancementField } from "../fields/TaskAvancementField";

interface Props {
	initialTask: TaskView | null;
	operators: OperatorOption[];
	errors: TaskFormErrors;
	onChange?: (data: TaskFormValues) => void;
}

export function TaskFormFields({
	initialTask,
	operators,
	errors,
	onChange,
}: Props) {


	console.log("Edit task initial ", initialTask)
	const [name, setName] = useState(initialTask?.nom ?? "");

	const [startDate, setStartDate] = useState(
		initialTask?.start
			? initialTask.start.toISOString().slice(0, 10)
			: ""
	);

	const [endDate, setEndDate] = useState(
		initialTask?.end
			? initialTask.end.toISOString().slice(0, 10)
			: ""
	);

	const [etatId, setEtatId] = useState<TaskStatusId>(
		initialTask?.etatId ?? 1
	);

	const [responsableId, setResponsableId] = useState<number | null>(
		initialTask?.responsableId ?? null
	);
	const [duree, setDuree] = useState<number>(
		initialTask?.duree ?? 0
	);

	const [avancement, setAvancement] = useState<number>(
		initialTask?.avancement ?? 0
	);

	useEffect(() => {
		onChange?.({
			name,
			startDate,
			endDate,
			etatId,
			responsableId,
			duree,
			avancement
		});
	}, [
		name,
		startDate,
		endDate,
		duree,
		avancement,
		etatId,
		responsableId,
		onChange,
	]);

	return (
		<>
			<div className="w-full max-w-3xl rounded-lg border bg-card p-6 space-y-6">

				<TaskNameField
					value={name}
					onChange={setName}
					error={errors?.fields?.nom}
				/>

				<TaskStartDateField
					value={startDate}
					onChange={setStartDate}
					error={errors?.fields?.startDate}
				/>

				<TaskEndDateField
					value={endDate}
					onChange={setEndDate}
					error={errors?.fields?.endDate}
				/>

				<TaskStatusField
					value={etatId}
					onChange={setEtatId}
					error={errors?.fields?.etatId}
				/>
				<TaskDureeField
					value={duree}
					onChange={(value) => setDuree(Number(value))}
					error={errors?.fields?.duree}
				/>

				<TaskAvancementField
					value={avancement}
					onChange={(value) => setAvancement(Number(value))}
					error={errors?.fields?.avancement}
				/>

				<TaskResponsableField
					value={responsableId?.toString() ?? null}
					options={operators.map((op) => ({
						value: String(op.id),
						label: op.label,
					}))}
					onChange={(value) =>
						setResponsableId(value ? Number(value) : null)
					}
				/>

			</div>

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
