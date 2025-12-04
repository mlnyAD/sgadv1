export interface DbUser {
  id: string;             // uuid (auth.users.id)
  email: string;
  is_active: boolean;
  is_system_admin: boolean;
  created_at: string;     // ISO date string
}
