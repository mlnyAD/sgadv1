

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type BudgetExerciseOption = {
  exer_id: string;
  exer_code: string | null;
  exer_actif?: boolean | null;
};



export function ExerciseSelect(props: {
  value: string;
  options: BudgetExerciseOption[];
}) {
  const { value, options } = props;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function onChange(exerid: string) {
    const sp = new URLSearchParams(searchParams.toString());
    sp.set("exerid", exerid); // lowercase ✅
    router.push(`${pathname}?${sp.toString()}`);
  }

  return (
    <label style={{ display: "block", marginBottom: 12 }}>
      <div style={{ marginBottom: 6 }}>Exercice</div>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o.exer_id} value={o.exer_id}>
            {o.exer_code ?? o.exer_id}
          </option>
        ))}
      </select>
    </label>
  );
}