

/*******************************************
 * Client - BD row
 ***************************************** */
export interface ClientDbRow {
  client_id: string;
  client_nom: string;
  client_code: string;
  adresse?: string | null;
  code_postal?: string | null;
  ville?: string | null;
  pays?: string | null;
  email?: string | null;
  telephone?: string | null;
  actif: boolean;
}
export interface ClientViewRow {
  clt_id: string;
  clt_code: string;
  clt_nom: string;
  clt_adresse?: string | null;
  clt_code_postal?: string | null;
  clt_ville?: string | null;
  clt_pays?: string | null;
  clt_email?: string | null;
  clt_telephone?: string | null;
  clt_actif: boolean;
  lmod?: string;
}

/*******************************************
 * Client - Vue / UI
 ***************************************** */
export interface ClientView {
  id: string;
  nom: string;
  code: string;
  adresse?: string | null;
  codePostal?: string | null;
  ville?: string | null;
  pays?: string | null;
  email?: string | null;
  telephone?: string | null;
  actif: boolean;
}

/*******************************************
 * Client - UI list
 ***************************************** */
export type ClientUI = ClientView;

/*******************************************
 * Client - Création
 ***************************************** */
export type CreateClientInput = {
  nom: string;
  code: string;
  adresse?: string | null;
  codePostal?: string | null;
  ville?: string | null;
  pays?: string | null;
  email?: string | null;
  telephone?: string | null;
  actif: boolean;
};

/*******************************************
 * Client - Mise à jour
 ***************************************** */
export type UpdateClientInput = Partial<CreateClientInput>;

/*******************************************
 * Client - Payload persistence
 ***************************************** */
export interface ClientPersistencePayload {
  clt_nom: string;
  clt_code: string;
  clt_adresse?: string | null;
  clt_code_postal?: string | null;
  clt_ville?: string | null;
  clt_pays?: string | null;
  clt_email?: string | null;
  clt_telephone?: string | null;
  clt_actif: boolean;
}
