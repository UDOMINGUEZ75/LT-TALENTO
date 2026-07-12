"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EvaluationMenu() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const userId = searchParams.get("userId");

  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCandidate() {
      if (!userId) return;

      const res = await fetch(`/api/candidate?userId=${userId}`);
      const data = await res.json();

      if (data.ok && data.candidate) {
        setCandidate(data.candidate);
      }

      setLoading(false);
    }

    loadCandidate();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Cargando datos...
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600">
        No se encontró información del candidato.
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-16 px-6">
      {/* Información del candidato */}
      <div className="mb-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-bold">{candidate.user.name}</h2>
        <p className="text-gray-700">{candidate.user.email}</p>
      </div>

      <h1 className="text-3xl font-bold mb-6">Menú de Registro</h1>

      {/* Botones del menú */}
      <div className="flex flex-col gap-4">
        <button
          onClick={() =>
            router.push(`/candidate/evaluation/personal?userId=${userId}`)
          }
          className="w-full py-3 bg-blue-600 text-white rounded-lg"
        >
          Datos Personales
        </button>

        <button
          onClick={() =>
            router.push(`/candidate/evaluation/experience?userId=${userId}`)
          }
          className="w-full py-3 bg-blue-600 text-white rounded-lg"
        >
          Experiencia
        </button>

        <button
          onClick={() =>
            router.push(`/candidate/evaluation/education?userId=${userId}`)
          }
          className="w-full py-3 bg-blue-600 text-white rounded-lg"
        >
          Formación Académica
        </button>

        <button
          onClick={() =>
            router.push(`/candidate/evaluation/preferences?userId=${userId}`)
          }
          className="w-full py-3 bg-blue-600 text-white rounded-lg"
        >
          Preferencias
        </button>

        <button
          onClick={() =>
            router.push(`/candidate/evaluation/availability?userId=${userId}`)
          }
          className="w-full py-3 bg-blue-600 text-white rounded-lg"
        >
          Disponibilidad
        </button>

        <button
          onClick={() =>
            router.push(`/candidate/evaluation/documents?userId=${userId}`)
          }
          className="w-full py-3 bg-blue-600 text-white rounded-lg"
        >
          Documentos
        </button>
      </div>

      {/* Botón volver al inicio */}
      <button
        onClick={() => router.push("/")}
        className="w-full py-3 bg-gray-700 text-white rounded-lg text-lg mt-6"
      >
        Volver al inicio
      </button>
    </div>
  );
}
