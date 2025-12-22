// modèle métier
export interface Todo {
  id: number;
  creation: Date;
  cloture?: Date;
  titre: string;
  text?: string;
  important: boolean;
  urgent: boolean;
  etatId: number;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  lastModified: Date;
}
