

// src/app/(app)/wait/page.tsx

import Link from "next/link";

export default function DashboardPage() {

	return (
		<div className="p-8">
			<h1 className="text-3xl">Bienvenue sur le système de gestion AXCIO-DATA (SGAD)</h1>
			<p className="text-gray-600 dark:text-gray-300 mt-4">
				La fonction demandée n'est pas encore disponible.
			</p>
			<Link
				href="/dashboard"
				className="inline-flex items-center h-9 px-4 rounded-md border border-muted-foreground/40 text-foreground hover:bg-muted text-base"
			>
				Fermer
			</Link>

		</div>
	);
}