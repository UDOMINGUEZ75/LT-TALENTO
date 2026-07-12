"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function EvaluationMenuPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const [candidate, setCandidate] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCandidate() {
      try {
        const res = await fetch(`/api/candidate/personal?userId=${userId}`);
        const data = await res.json();

        if (data.ok && data.personal) {
          setCandidate(data.personal);
        }
      } catch (error) {
        console.error("Error cargando información del candidato:", error);
      }
      setLoading(false);
    }

    if (userId) loadCandidate();
  }, [userId]);

  function go(path: string) {
    router.push(`/candidate/evaluation/${path}?userId=${userId}`);
  }

  if (loading) return <p className="p-6">Cargando información...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">Completar información del candidato</h1>
      <p className="text-center text-gray-600">ID del candidato: {userId}</p>

      {candidate && (
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Información del candidato</h2>

          <p><strong>Nombre:</strong> {candidate.name}</p>
          <p><strong>Correo:</strong> {candidate.email}</p>
        </div>
      )}

      <p className="text-center text-gray-600">
        Selecciona la sección que deseas completar:
      </p>

      <div className="space-y-4">

        <button
          onClick={() => go("personal")}
          className="w-full bg-blue-600 text-white p-4 rounded shadow hover:bg-blue-700"
        >
          Datos personales
        </button>

        <button
          onClick={() => go("experience")}
          className="w-full bg-blue-600 text-white p-4 rounded shadow hover:bg-blue-700"
        >
          Experiencia laboral
        </button>

        <button
          onClick={() => go("education")}
          className="w-full bg-blue-600 text-white p-4 rounded shadow hover:bg-blue-700"
        >
          Formación académica
        </button>

        <button
          onClick={() => go("preferences")}
          className="w-full bg-blue-600 text-white p-4 rounded shadow hover:bg-blue-700"
        >
          Preferencias laborales
        </button>

        <button
          onClick={() => go("availability")}
          className="w-full bg-blue-600 text-white p-4 rounded shadow hover:bg-blue-700"
        >
          Disponibilidad
        </button>

        <button
          onClick={() => go("documents")}
          className="w-full bg-blue-600 text-white p-4 rounded shadow hover:bg-blue-700"
        >
          Documentos
        </button>

      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => router.push(`/`)}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Volver a la página inicial
        </button>
      </div>
    </div>
  );
}
