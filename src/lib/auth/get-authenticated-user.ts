import 'server-only'
import { createSupabaseServerReadClient } from '@/lib/supabase/server-read'
import type { AuthenticatedUser } from '@/domain/user/authenticated-user.interface'

export async function getAuthenticatedUser(): Promise<AuthenticatedUser | null> {
  const supabase = await createSupabaseServerReadClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) {
    console.error('[auth] getUser error:', error)
    return null
  }

  if (!user) return null

  return {
    // --- identité ---
    id: user.id,
    email: user.email ?? '',

    // --- rôles / permissions ---
    isSystemAdmin: false,
    isClientAdmin: false,
    isProjectAdmin: false,
    isUser: true,

    // --- rattachements (valeurs neutres) ---
    clientIds: [],
    projectIds: [],

  // Informations supplémentaires UI
  displayName: "",
  welcomeMessage: "",

  functionLabel: "",   // <= AJOUT ICI

    }
}
