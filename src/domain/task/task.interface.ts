export interface DbTask {
  taskId: number;
  taskNom: string;

  taskResponsableId: number;
  taskEtatId: number;

  taskStart: string;
  taskEnd: string;

  taskDuree: number;
  taskAvancement: number;

  projectId: number;
  lottravId: number;
};
