export interface DbUserProfile {
  user_id: string;        // uuid, FK -> user.id
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  company_name: string | null;
  updated_at: string;     // ISO date string
}
