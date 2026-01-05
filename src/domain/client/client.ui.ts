

// src/domain/client/client.ui.ts

import { ClientStatus } from "./client.catalog";

export interface ClientUI {
  id?: number;
  nom: string;
  adresse?: string | null;
  codePostal?: string | null;
  ville?: string | null;
  siren?: string | null;
  status: ClientStatus;
}


