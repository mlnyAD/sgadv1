export interface DbClient {
  id: string;            // uuid
  name: string;
  siret: string | null;
  license_count: number;
  created_at: string;    // ISO date string
}
