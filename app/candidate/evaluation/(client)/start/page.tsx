"use client";

import { useRouter } from "next/navigation";

export default function StartEvaluation() {
  const router = useRouter();
  const params = useSearchParams();
  const userId = params.get("userId");

  return (
    <div className="max-w-xl mx-auto py-16 px-6">
      <h1 className="text-2xl font-bold mb-4">Inicio de evaluación</h1>

      <p className="mb-6">
        Gracias por iniciar tu proceso de evaluación. Completa cada sección para
        avanzar.
      </p>

      <button
        className="p-3 bg-blue-600 text-white rounded"
        onClick={() => router.push(`/candidate/evaluation/personal?userId=${userId}`)}
      >
        Comenzar
      </button>
    </div>
  );
}
