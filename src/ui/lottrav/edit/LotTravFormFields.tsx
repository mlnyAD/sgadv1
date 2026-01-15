

"use client";

import { useEffect, useState } from "react";
import { LotTravNameField } from "@/ui/lottrav/fields/LotTravNameField";
import { LotTravStartDateField } from "@/ui/lottrav/fields/LotTravStartDateField";
import { LotTravEndDateField } from "@/ui/lottrav/fields/LotTravEndDateField";
import { LotTravStatusField } from "@/ui/lottrav/fields/LotTravStatusField";
import type { LotTravStatusId } from "@/domain/lottrav/lottrav-status";
import { LotTravResponsableField } from "@/ui/lottrav/fields/LotTravResponsableField";
import type { LotTravFormValues, OperatorOption } from "@/ui/lottrav/lottrav-form.types";
import type { LotTravFormErrors } from "@/ui/lottrav/edit/LotTravForm.props";
import { LotTravView } from "@/domain/lottrav/lottrav-view";

interface Props {
  initialLot: LotTravView | null;
  operators: OperatorOption[];
  errors: LotTravFormErrors;
  onChange?: (data: LotTravFormValues) => void;
}

export function LotTravFormFields({
  initialLot,
  operators,
  errors,
  onChange,
}: Props) {

  const [name, setName] = useState(initialLot?.nom ?? "");

  const [startDate, setStartDate] = useState(
    initialLot?.start
      ? initialLot.start.toISOString().slice(0, 10)
      : ""
  );

  const [endDate, setEndDate] = useState(
    initialLot?.end
      ? initialLot.end.toISOString().slice(0, 10)
      : ""
  );

  const [statusId, setStatusId] = useState<LotTravStatusId>(
    initialLot?.statusId ?? 1
  );

  const [responsableId, setResponsableId] = useState<number | null>(
    initialLot?.responsableId ?? null
  );

  useEffect(() => {
    onChange?.({
      name,
      startDate,
      endDate,
      statusId,
      responsableId,
    });
  }, [name, startDate, endDate, statusId, responsableId, onChange]);

  return (
    <>
      <div className="w-full max-w-3xl rounded-lg border bg-card p-6 space-y-6">

        <LotTravNameField
          value={name}
          onChange={setName}
          error={errors?.fields?.name}
        />

        <LotTravStartDateField
          value={startDate}
          onChange={setStartDate}
          error={errors?.fields?.startDate}
        />

        <LotTravEndDateField
          value={endDate}
          onChange={setEndDate}
          error={errors?.fields?.endDate}
        />

        <LotTravStatusField
          value={statusId}
          onChange={setStatusId}
          error={errors?.fields?.statusId}
        />

        <LotTravResponsableField
          value={responsableId?.toString() ?? null}
          options={operators.map((op) => ({
            value: String(op.id),
            label: op.label,
          }))}
          onChange={(value) =>
            setResponsableId(value ? Number(value) : null)
          }
        />
        
      </div>

      {errors.global?.length ? (
        <div className="rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          <ul className="list-disc pl-5">
            {errors.global.map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
          </ul>
        </div>
      ) : null} 
    </>
  );
}
