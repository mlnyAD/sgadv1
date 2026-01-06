

// src/domain/licence/licence.db.ts

export interface LicenceDbRow {
  id: string;

  client_id: string;
  client_label: string;

  nom: string;

  status: string;

  start_date: string;
  end_date: string | null;
}
