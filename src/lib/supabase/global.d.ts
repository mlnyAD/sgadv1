
// src/lib/supabase/global.d.ts

export {};

declare global {
  interface Window {
    supabase?: any; // ou tu peux mettre le type exact de SupabaseClient
  }
}
