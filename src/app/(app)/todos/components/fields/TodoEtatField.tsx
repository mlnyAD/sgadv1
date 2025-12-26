"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { TODO_ETAT_CATALOG } from "@/domain/todo/todo-etat.catalog";

interface TodoEtatFieldProps {
	value: number | null;
	onChange: (etatId: number | null) => void;
	disabled?: boolean;
}

export function TodoEtatField({
	value,
	onChange,
	disabled,
}: TodoEtatFieldProps) {
	return (

		<div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b border-muted pb-2">
			<Label className="md:col-span-1 text-sm font-medium whitespace-nowrap">
				État
			</Label>

			<div className="md:col-span-5">
				<Select
					disabled={disabled}
					value={value !== null ? value.toString() : "all"}
					onValueChange={(v) =>
						onChange(v === "all" ? null : Number(v))
					}
				>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Tous" />
					</SelectTrigger>

					<SelectContent className="bg-popover text-popover-foreground">
						<SelectItem value="all">Tous</SelectItem>

						{TODO_ETAT_CATALOG.map((etat) => (
							<SelectItem
								key={etat.id}
								value={etat.id.toString()}
							>
								{etat.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}
