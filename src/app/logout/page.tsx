
// src/app/logout/page.tsx

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseBrowserClient } from '@/utils/supabase/client';

export default function LogoutPage() {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    const doLogout = async () => {
      await supabase.auth.signOut();
      router.replace('/login');
    };
    void doLogout();
  }, [router, supabase]);

  return <p>Déconnexion en cours...</p>;
}
