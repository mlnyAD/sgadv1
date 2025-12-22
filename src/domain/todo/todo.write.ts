// Pour écriture d'un article en BD
export interface CreateTodoInput {
  titre: string;
  text?: string;
  urgent: boolean;
  important: boolean;
  etatId: number;
}

export interface UpdateTodoInput {
  titre?: string;
  text?: string;
  urgent?: boolean;
  important?: boolean;
  etatId?: number;
}
