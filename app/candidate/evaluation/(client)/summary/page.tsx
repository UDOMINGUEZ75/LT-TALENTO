"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SummaryPage() {
  const router = useRouter();
  const params = useSearchParams();

  const userId = params?.get("userId") ?? "";

  return (
    <div className="max-w-xl mx-auto py-16 px-6">
      <h1 className="text-2xl font-bold mb-4">Resumen del proceso</h1>

      <p className="mb-6">
        Gracias por completar tu evaluación. Tu información ha sido registrada.
      </p>

      <button
        className="p-3 bg-blue-600 text-white rounded"
        onClick={() =>
          router.push(`/candidate/evaluation/menu?userId=${userId}`)
        }
      >
        Volver al menú
      </button>
    </div>
  );
}