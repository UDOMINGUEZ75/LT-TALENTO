"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CandidateDashboard() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCandidate() {
      if (!userId) return;

      const res = await fetch(`/api/candidate?userId=${userId}`);
      const data = await res.json();

      if (!data.ok || !data.candidate) {
        setCandidate(null);
      } else {
        setCandidate(data.candidate);
      }

      setLoading(false);
    }

    loadCandidate();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Cargando información…
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
      <h1 className="text-3xl font-bold mb-4">
        Bienvenido, {candidate.user.name}
      </h1>

      <p className="text-gray-700 mb-6">
        <strong>Correo:</strong> {candidate.user.email}
      </p>

      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">Tu progreso</h2>
        <p className="text-gray-700">
          Estado actual: <strong>{candidate.status}</strong>
        </p>
      </div>

      <button
        onClick={() =>
          window.location.href = `/candidate/evaluation/start?userId=${userId}`
        }
        className="w-full py-3 bg-blue-600 text-white rounded-lg text-lg"
      >
        Continuar Registro
      </button>
    </div>
  );
}
