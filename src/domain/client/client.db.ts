

// src/domain/client/client.db.ts

import { ClientStatus } from "./client.catalog";

export interface ClientDbRow {
  client_id: number;
  client_nom: string;
  client_adresse?: string | null;
  client_code_postal?: string | null;
  client_ville?: string | null;
  client_siren?: string | null;
  client_status: ClientStatus;
  client_created_at: Date;
  client_validated_at?: Date | null;
  client_created_by: number;
  lmod: Date;
}
