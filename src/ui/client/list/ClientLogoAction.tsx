

"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Image as ImageIcon } from "lucide-react";

export function ClientLogoAction({
  clientId,
  clientName,
}: {
  clientId: string;
  clientName: string;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File | null) {
    if (!file) return;

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("clientId", clientId);
      formData.append("file", file);

      const response = await fetch("/api/client/logo", {
        method: "POST",
        body: formData,
      });

      const json = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(json.message ?? "Erreur lors du téléversement du logo.");
      }

      router.refresh();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Erreur inattendue lors du téléversement du logo.",
      );
    } finally {
      setUploading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={(e) => void handleFile(e.target.files?.[0] ?? null)}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="h-8 w-8 inline-flex items-center justify-center rounded-md border hover:bg-muted disabled:opacity-50"
        title={
          uploading
            ? `Téléversement du logo pour ${clientName}`
            : `Importer le logo pour ${clientName}`
        }
      >
        <ImageIcon className="h-4 w-4" />
      </button>
    </>
  );
}