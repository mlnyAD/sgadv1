

"use client";

import { useOperateur } from "@/contexts/OperateurContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SidebarUserIdentity({ compact = false }: { compact?: boolean }) {

	const { operateur, loading } = useOperateur();

	if (loading || !operateur) {
		return (
			<div className="flex items-center gap-2">
				<Avatar className="h-8 w-8 rounded-lg">
					<AvatarFallback>...</AvatarFallback>
				</Avatar>
			</div>
		);
	}

	//console.log("SidebarUserIdentity operateur = ", operateur)

	const displayName = `${operateur?.prenom} ${operateur?.nom}`.trim()
		|| operateur?.email;

	const roleLabel = operateur?.isAdminSys
		? "Administrateur système"
		: "Utilisateur";

	const initials =
		displayName
			?.split(" ")
			.map((p) => p[0]?.toUpperCase())
			.join("") || operateur.email?.[0]?.toUpperCase() || "?";

	return (
		<div className="flex items-center gap-2">
			<Avatar className="h-8 w-8 rounded-lg">
				<AvatarImage src="" alt={initials} />
				<AvatarFallback>{initials}</AvatarFallback>
			</Avatar>

			{!compact && (
				<div className="flex flex-col leading-tight">
					<span className="text-sm font-semibold">{displayName}</span>
					<span className="text-xs text-muted-foreground">
						{roleLabel}
					</span>
				</div>
			)}
		</div>
	);
}
