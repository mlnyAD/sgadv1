

// src/app/reset-password/page.tsx


import { redirect } from "next/navigation";
import ResetPasswordForm from "./ResetPasswordForm";
import { createSupabaseServerReadClient } from "@/lib/supabase/server-read";

export default async function ResetPasswordPage() {
  const supabase = await createSupabaseServerReadClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <main className="flex min-h-screen items-center justify-center">
      <ResetPasswordForm />
    </main>
  );
}