

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { ProjectResume } from "@/domain/project/projectResume/projectResume.types";

type NavItem = {
	label: string;
	href: (projectId: number) => string;
};

const navigation: NavItem[] = [
	{ label: "Résumé", href: (id) => `/projects/${id}/resume` },
	{ label: "Lots", href: (id) => `/projects/${id}/lots` },
	{ label: "Tâches", href: (id) => `/projects/${id}/tasks` },
	{ label: "Réunions", href: (id) => `/projects/${id}/meetings` },
	{ label: "Affectations", href: (id) => `/projects/${id}/people` },
	{ label: "Budget", href: (id) => `/projects/${id}/budget` },
	{ label: "Localisation", href: (id) => `/projects/${id}/map` },
	{ label: "Heures", href: (id) => `/projects/${id}/timesheet` },
	{ label: "Dashboard", href: (id) => `/projects/${id}/dashboard` },
	{ label: "Risques", href: (id) => `/projects/${id}/risks` },
	{ label: "Documents", href: (id) => `/projects/${id}/documents` },
];

export default function ProjectResumeView({
	data,
}: {
	data: ProjectResume;
}) {
	return (
		<div className="flex flex-col gap-6">

			{/* Contenu résumé */}
			<section>
				<h1 className="text-xl font-semibold">{data.projectName}</h1>
				<p className="text-muted-foreground">{data.projectIdent}</p>
			</section>

			{/* Navigation projet */}
			<section className="grid grid-cols-2 md:grid-cols-4 gap-3">
				{navigation.map((item) => (
					<Button
						key={item.label}
						className={buttonVariants({ variant: "axcio" })}
						asChild
					>
						<Link href={item.href(data.projectId)}>
							{item.label}
						</Link>
					</Button>
				))}
			</section>

		</div>
	);
}
