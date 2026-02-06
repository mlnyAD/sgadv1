"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";

export async function signupAction(formData: FormData) {

	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	const firstName = formData.get("firstName") as string;
	const lastName = formData.get("lastName") as string;

	const cookieStore = await cookies();

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return cookieStore.getAll();
				},
				setAll(cookies) {
					cookies.forEach(({ name, value, options }) => {
						cookieStore.set(name, value, options);
					});
				},
			},
		}
	);

	// 1) Création dans Supabase Auth
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
	});

	if (error) {
		return { error: error.message };
	}

	const authUser = data.user;
	if (!authUser) {
		return { error: "Création Supabase Auth impossible." };
	}

	// 2) Création dans la table public.operateur
	const { error: dbError } = await supabase.from("operateur")
		.insert({
			oper_id: authUser.id,
			oper_email: authUser.email,
			is_active: true,
			prenom: firstName,
			nom: lastName,
		});

	if (dbError) {
		return { error: "Erreur BD : " + dbError.message };
	}

	redirect("/login");
}
