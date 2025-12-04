export interface DbTimeSheet {
  tsId: number;
  tsLtId: number;
  tsProjectId: number;
  tsTaskId: number;
  tsUserId: number;

  tsDate: string; // ou Date selon ta conversion Supabase

  tsD1Nbh: number;
  tsD2Nbh: number;
  tsD3Nbh: number;
  tsD4Nbh: number;
  tsD5Nbh: number;
  tsD6Nbh: number;
  tsD7Nbh: number;
};
