

"use client";

import { useRouter } from "next/navigation";

type Client = {
  id: string;
  nom: string;
};

type SearchParams = {
  next?: string;
  error?: string;
};

type SelectClientListProps = {
  searchParams?: SearchParams;
  clients: Client[];
};

export default function SelectClientList({
  searchParams = {},
  clients,
}: SelectClientListProps) {
  const router = useRouter();

  const handleSelect = (clientId: string) => {
    // Pose le cookie du client courant
    document.cookie = `current_clt_id=${clientId}; path=/; samesite=lax`;
    if (searchParams.next) {
      router.push(searchParams.next);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center animate-fadeIn">
        {searchParams.error && (
          <div className="error text-red-600 mb-4">{searchParams.error}</div>
        )}
        <h2 className="text-xl font-bold mb-6">Sélectionnez votre client</h2>
        <ul>
          {clients.map((client) => (
            <li key={client.id}>
              <button
                onClick={() => handleSelect(client.id)}
                className="w-full px-4 py-3 mb-2 rounded bg-ad-light text-white font-medium shadow-sm hover:brightness-90 hover:scale-105 transition transform"
              >
                {client.nom}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}