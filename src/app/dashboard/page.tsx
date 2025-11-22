
// src/app/dashboard/page.tsx

import { getSupabaseServerClient } from '@/utils/supabase/server';

export default async function DashboardPage() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {user ? (
        <p>Bienvenue, {user.email}</p>
      ) : (
        <p>Utilisateur non trouvé (session absente).</p>
      )}
    </div>
  );
}


