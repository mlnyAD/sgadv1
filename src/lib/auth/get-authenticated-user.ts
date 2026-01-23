

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

  if (!user || !user.email) return null

  return {
    server: {
      id: user.id,
      email: user.email,
      role: 'client', // valeur par défaut ici
    },

    displayName: user.email.split('@')[0],
    functionLabel: 'Utilisateur',

    isAdmin: false,
    isClient: true,
  }
}
