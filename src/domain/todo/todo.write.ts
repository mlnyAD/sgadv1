// Pour écriture d'un article en BD
export interface CreateTodoInput {
  titre: string;
  text?: string;
  urgent: boolean;
  important: boolean;
  cloture?: Date;
  etatId: number;
}

export interface UpdateTodoInput {
  titre?: string;
  text?: string;
  urgent?: boolean;
  important?: boolean;
  creation: Date;
  cloture?: Date;
  etatId?: number;
}
