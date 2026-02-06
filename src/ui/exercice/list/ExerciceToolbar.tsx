

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TableHeader } from "@/components/transaction/TableHeader";


export function ExerciceToolbar() {
	
	return (
		<div className="mb-4 flex items-end justify-between gap-4">
			<TableHeader
				title="Exercices"
				subtitle="Gérer les exercices du site"
			/>

			<div className="flex items-center gap-2">
				<Link
					href={`/dashboard`}
					className="inline-flex items-center h-9 px-4 rounded-md border border-muted-foreground/40 text-foreground hover:bg-muted text-base"
				>
					Fermer
				</Link>

				<Button asChild variant="axcio">
					<Link
						href={`/exercices/create`}
					>
						Nouvel exercice
					</Link>
				</Button>
			</div>
		</div>
	);
}
