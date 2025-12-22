"use client";

import { useState } from "react";
import type { TodoFormValues } from "@/domain/todo/todo.form";

export interface TodoFormProps {
  initialValues: TodoFormValues;
  onSubmit: (values: TodoFormValues) => Promise<void>;
  onCancel: () => void;
  saving?: boolean;
  children: (props: {
    values: TodoFormValues;
    setValues: React.Dispatch<
      React.SetStateAction<TodoFormValues>
    >;
  }) => React.ReactNode;
}


export function TodoForm({
  initialValues,
  onSubmit,
  children,
}: TodoFormProps) {

  const [values, setValues] = useState<TodoFormValues>(initialValues);


  return (
	<form
	  onSubmit={(e) => {
		e.preventDefault();
		onSubmit(values);
	  }}
	>
	  {children({ values, setValues })}
	</form>
  );
}
