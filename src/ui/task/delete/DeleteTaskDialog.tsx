

"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogFooter,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteTaskAction } from "@/features/task/task-actions";

interface DeleteTaskDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	projectId: number;
	lottravId: number;
	taskId: number;
	taskName: string;
	onDeleted: () => void;
}

export default function DeletTaskDialog({
	open,
	onOpenChange,
	projectId,
	lottravId,
	taskId,
	taskName,
	onDeleted,
}: DeleteTaskDialogProps) {
	const [isPending, startTransition] = useTransition();

	function handleDelete() {
		startTransition(async () => {
			try {
				await deleteTaskAction(projectId, lottravId, taskId);
				toast.success("Tâche supprimée");
				onDeleted();
			} catch {
				toast.error("Impossible de supprimer la tâche");
			}
		});
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Supprimer cette tâche ?</DialogTitle>
				</DialogHeader>

				<p className="mt-2">
					Voulez-vous vraiment supprimer{" "}
					<strong>{taskName}</strong> ?
				</p>

				<DialogFooter className="mt-6">
					<Button
						variant="secondary"
						onClick={() => onOpenChange(false)}
					>
						Annuler
					</Button>

					<Button
						variant="destructive"
						onClick={handleDelete}
						disabled={isPending}
					>
						Supprimer
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
