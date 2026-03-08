

"use client";

import { useRef, useState } from "react";

type Props = {
  clientId: string;
  label?: string;
  initialImageUrl?: string | null;
  onUploaded?: (input: { path: string; publicUrl: string }) => void;
};

export function ImageUploadField({
  clientId,
  label = "Logo",
  initialImageUrl,
  onUploaded,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialImageUrl ?? null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleFileChange(file: File | null) {
    if (!file) return;

    try {
      setErrorMessage("");
      setIsUploading(true);

      const formData = new FormData();
      formData.append("clientId", clientId);
      formData.append("file", file);

      const response = await fetch("/api/client/logo", {
        method: "POST",
        body: formData,
      });

      const json = (await response.json()) as {
        message?: string;
        path?: string;
        publicUrl?: string;
      };

      if (!response.ok || !json.path || !json.publicUrl) {
        throw new Error(json.message ?? "Erreur lors de l'upload.");
      }

      setPreviewUrl(json.publicUrl);
      onUploaded?.({ path: json.path, publicUrl: json.publicUrl });
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Erreur inattendue.",
      );
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="space-y-3">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          {label}
        </label>

        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt="Logo client"
                className="h-full w-full object-contain"
              />
            ) : (
              <span className="text-xs text-slate-400">Aucun logo</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <input
              ref={inputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={(e) => void handleFileChange(e.target.files?.[0] ?? null)}
            />

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={isUploading}
              className="inline-flex items-center rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
            >
              {isUploading ? "Téléversement..." : "Choisir un logo"}
            </button>

            <p className="text-xs text-slate-500">
              PNG, JPG ou WEBP — 2 Mo max
            </p>
          </div>
        </div>
      </div>

      {errorMessage ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {errorMessage}
        </div>
      ) : null}
    </div>
  );
}