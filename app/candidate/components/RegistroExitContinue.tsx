"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function RegistroExitContinue() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams?.get("userId") ?? "";

  function salir() {
    router.push(`/candidate?userId=${userId}`);
  }

  function continuar() {
    router.push(`/candidate/registro/menu?userId=${userId}`);
  }

  return (
    <div className="flex justify-between mt-6">
      <button
        onClick={salir}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
      >
        Salir
      </button>

      <button
        onClick={continuar}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Continuar
      </button>
    </div>
  );
}