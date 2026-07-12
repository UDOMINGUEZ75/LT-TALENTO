"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EvaluationMenu() {
  const router = useRouter();
  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const rawUserId = params.get("userId");

    if (!rawUserId || isNaN(Number(rawUserId))) return;

    const userId = Number(rawUserId);

    async function loadCandidate() {
      const res = await fetch(`/api/candidate?userId=${userId}`, {
        cache: "no-store",
      });
      const data = await res.json();
      setCandidate(data.candidate);
    }

    loadCandidate();
  }, []);

  if (!candidate) return <p className="p-6">Cargando...</p>;

  const userId = candidate.user.id;

  return (
    <div className="max-w-xl mx-auto py-16 px-6">
      <h2 className="text-xl font-bold mb-2">{candidate.user.name}</h2>
      <p className="text-gray-700 mb-6">{candidate.user.email}</p>

      <h3 className="text-lg font-semibold mb-4">Menú de evaluación</h3>

      <div className="flex flex-col gap-4">
        <button
          className="p-3 bg-blue-600 text-white rounded"
          onClick={() => router.push(`/candidate/evaluation/start?userId=${userId}`)}
        >
          Iniciar evaluación
        </button>

        <button
          className="p-3 bg-gray-200 rounded"
          onClick={() => router.push(`/candidate/evaluation/personal?userId=${userId}`)}
        >
          Datos personales
        </button>

        <button
          className="p-3 bg-gray-200 rounded"
          onClick={() => router.push(`/candidate/evaluation/experience?userId=${userId}`)}
        >
          Experiencia laboral
        </button>

        <button
          className="p-3 bg-gray-200 rounded"
          onClick={() => router.push(`/candidate/evaluation/education?userId=${userId}`)}
        >
          Educación
        </button>

        <button
          className="p-3 bg-gray-200 rounded"
          onClick={() => router.push(`/candidate/evaluation/skills?userId=${userId}`)}
        >
          Habilidades
        </button>

        <button
          className="p-3 bg-green-600 text-white rounded"
          onClick={() => router.push(`/candidate/evaluation/summary?userId=${userId}`)}
        >
          Finalizar evaluación
        </button>
      </div>
    </div>
  );
}
