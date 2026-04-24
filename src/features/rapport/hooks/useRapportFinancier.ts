

"use client";

import { useEffect, useState } from "react";
import { getRapportFinancierAction } from "../actions/getRapportFinancierAction";
import { listRapportExerciseOptionsAction } from "../actions/listRapportExerciseOptionsAction";
import { exportRapportFinancierDocx as exportRapportFinancierDocxAction } from "../actions/exportRapportFinancierDocx";
import type {
  RapportFilters,
  RapportFinancierViewModel,
  RapportOptionKey,
} from "@/domain/rapport/types";

type RapportExerciseOption = {
  exerId: string;
  exerCode: string;
};

const DEFAULT_FILTERS: RapportFilters = {
  exerId: "",
  exerCode: "",
  options: [],
};

export function useRapportFinancier({
  clientId,
  clientName,
}: {
  clientId: string;
  clientName: string;
}) {
  const [filters, setFilters] = useState<RapportFilters>(DEFAULT_FILTERS);
  const [exercises, setExercises] = useState<RapportExerciseOption[]>([]);
  const [viewModel, setViewModel] =
    useState<RapportFinancierViewModel | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  void exercises;

  const onChangeExercice = (exerId: string, exerCode: string) => {
    setFilters((prev) => ({
      ...prev,
      exerId,
      exerCode,
    }));
  };

  const onToggleOption = (option: RapportOptionKey) => {
    setFilters((prev) => ({
      ...prev,
      options: prev.options.includes(option)
        ? prev.options.filter((item) => item !== option)
        : [...prev.options, option],
    }));
  };

  useEffect(() => {
    let active = true;

    async function loadExercises() {
      try {
        const list = await listRapportExerciseOptionsAction(clientId);

        if (!active) return;

        setExercises(list);

        if (list.length > 0) {
          setFilters((prev) => ({
            ...prev,
            exerId: prev.exerId || list[0].exerId,
            exerCode: prev.exerCode || list[0].exerCode,
          }));
        }
      } catch {
        if (active) {
          setError("Impossible de charger les exercices.");
        }
      }
    }

    void loadExercises();

    return () => {
      active = false;
    };
  }, [clientId]);

  useEffect(() => {
    let active = true;

    async function loadRapport() {
      if (!filters.exerId) {
        setViewModel(null);
        setError(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const result = await getRapportFinancierAction({
          clientId,
          clientName,
          exerId: filters.exerId,
          exerCode: filters.exerCode,
          options: filters.options,
        });

        if (active) {
          setViewModel(result);
        }
      } catch {
        if (active) {
          setError("Impossible de charger le rapport financier.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadRapport();

    return () => {
      active = false;
    };
  }, [clientId, clientName, filters]);

  const onExportDocx = async () => {
    if (!filters.exerId) return;

    const bytes = await exportRapportFinancierDocxAction({
      clientId,
      clientName,
      exerId: filters.exerId,
      exerCode: filters.exerCode,
      options: filters.options,
    });

    const blob = new Blob([new Uint8Array(bytes)], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `rapport-financier-${filters.exerCode || "exercice"}.docx`;
    a.click();

    URL.revokeObjectURL(url);
  };

  return {
    filters,
    exercises,
    viewModel,
    loading,
    error,
    onChangeExercice,
    onToggleOption,
    onExportDocx,
  };
}