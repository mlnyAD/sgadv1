// map des données de la forme vers le format UI (domain)

import { TodoEtatId, TodoUI } from "@/domain/todo";
import { TodoFormValues } from "./TodoForm";
import { toDateInputValue } from "@/helpers/date";


/* ------------------------------------------------------------------
   Form -> UI
   ------------------------------------------------------------------ */

export function mapTodoFormToUI(
  form: TodoFormValues
) {
  if (form.etatId === null) {
  throw new Error("Etat obligatoire");
}

  return {
	    titre: form.titre.trim(),
        text: form.text.trim() || null,
        important: form.important,
        urgent: form.urgent,
        etatId: form.etatId,
        creation: form.creation,
        cloture: form.cloture || null,
  };
  
}


/* ------------------------------------------------------------------
   UI -> Form
   ------------------------------------------------------------------ */

export function mapTodoUIToForm(
  ui?: TodoUI
): TodoFormValues {
  return {
		  titre: ui?.titre ?? "",
		  text: ui?.text ?? "",
		  creation: toDateInputValue(ui?.creation),
		  cloture: toDateInputValue(ui?.cloture), 
		  urgent: Boolean(ui?.urgent),
		  important: Boolean(ui?.important),

	etatId: ui?.etatId !== undefined
	  ? (ui.etatId as TodoEtatId)
	  : null,
  };
}

