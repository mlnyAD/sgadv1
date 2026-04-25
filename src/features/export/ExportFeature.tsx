

// src/features/export/ExportFeature.tsx

"use client";

import { useEffect, useState } from "react";
import {
  EXPORT_VIEWS,
  type ExportViewKey,
} from "@/domain/export/export-view.catalog";
import { ExportScreen } from "@/ui/export/ExportScreen";
import { exportSelectedViewsAction } from "./actions/exportSelectedViewsAction";
import { listExportExerciseOptionsAction } from "./actions/listExportExerciseOptionsAction";

type ExerciseOption = {
  exerId: string;
  exerCode: string;
};

const DEFAULT_SELECTED = EXPORT_VIEWS.map((view) => view.key);

export function ExportFeature() {
  const [selectedKeys, setSelectedKeys] =
    useState<ExportViewKey[]>(DEFAULT_SELECTED);

  const [exerciseOptions, setExerciseOptions] = useState<ExerciseOption[]>([]);
  const [selectedExerId, setSelectedExerId] = useState("");

  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onToggle = (key: ExportViewKey) => {
    setSelectedKeys((prev) =>
      prev.includes(key)
        ? prev.filter((item) => item !== key)
        : [...prev, key],
    );
  };

  const onChangeExercice = (exerId: string) => {
    setSelectedExerId(exerId);
  };

  useEffect(() => {
    let active = true;

    async function loadExercises() {
      try {
        setError(null);

        const list = await listExportExerciseOptionsAction();

        if (!active) return;

        setExerciseOptions(list);

        if (list.length > 0) {
          setSelectedExerId((prev) => prev || list[0].exerId);
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
  }, []);

  const onExport = async () => {
    if (selectedKeys.length === 0 || !selectedExerId) return;

    try {
      setExporting(true);
      setError(null);

      const bytes = await exportSelectedViewsAction({
        viewKeys: selectedKeys,
        exerId: selectedExerId,
      });

      const blob = new Blob([new Uint8Array(bytes)], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const selectedExercise = exerciseOptions.find(
        (exercise) => exercise.exerId === selectedExerId,
      );

      const exerCode = selectedExercise?.exerCode || "exercice";

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = `export-donnees-${exerCode}.xlsx`;
      a.click();

      URL.revokeObjectURL(url);
    } catch {
      setError("Impossible de générer l’export.");
    } finally {
      setExporting(false);
    }
  };

  return (
    <ExportScreen
      options={EXPORT_VIEWS.map((view) => ({
        key: view.key,
        label: view.label,
      }))}
      selectedKeys={selectedKeys}
      exerciseOptions={exerciseOptions}
      selectedExerId={selectedExerId}
      exporting={exporting}
      error={error}
      onToggle={onToggle}
      onChangeExercice={onChangeExercice}
      onExport={onExport}
    />
  );
}