

// src/domain/operclient/operclient-types.ts

export interface OperClientView {
  id: string;

  operateurId: string;
  operateurNom: string;
  operateurEmail: string;
  operateurActif: boolean;

  clientId: string;
  clientNom: string;
  clientActif: boolean;

  lmod: string;
}
