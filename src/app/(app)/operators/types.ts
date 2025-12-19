

export type OperatorFieldProps<T> = {
  value: T;
  onChange: (value: T) => void;
  error?: string;
  disabled?: boolean;
};


export interface OperatorFormValues {
  operator_id: number;
  user_id: string | null;
  email: string;
  first_name: string;
  last_name: string;
  role_id: number | null;   // ← ICI
  active: boolean;
  societe_id: number | null;
  metier_id: number | null;
};
