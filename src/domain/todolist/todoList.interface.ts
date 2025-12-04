export interface DbTodoList {
  todoId: number;
  todoCreation: string | null;
  todoCloture: string | null;
  todoTitre: string;
  todoText: string;
  todoImportant: boolean;
  todoUrgent: boolean;
  todoUseremail: string;

  todoEtatId: number;
  todoEtatNom: string;
};
