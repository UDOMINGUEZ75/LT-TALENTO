"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CandidateDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams?.get("userId");

  const [candidate, setCandidate] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(`/api/candidate/info?userId=${userId}`);
        const data = await res.json();
        if (data.ok) setCandidate(data.candidate);
      } catch (error) {
        console.error("Error cargando candidato:", error);
      }
      setLoading(false);
    }

    if (userId) loadData();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Cargando información…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      
      {/* LOGO */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-blue-700 tracking-wide">
          LTTalento
        </h1>
      </div>

      {/* TARJETA PRINCIPAL */}
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg">
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Bienvenido
        </h2>

     <div className="space-y-2 text-gray-700">
        <p><strong>Nombre:</strong> {candidate?.name || "No disponible"}</p>
        <p><strong>Correo:</strong> {candidate?.email || "No disponible"}</p>
      </div>

        <hr className="my-6" />

        {/* PROGRESO */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Tu progreso
          </h3>

          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-700">
              <strong>Estado actual:</strong> {candidate?.status || "Pendiente"}
            </p>
          </div>
        </div>

        {/* BOTÓN */}
        <button
          onClick={() => router.push(`/candidate/evaluation/menu?userId=${userId}`)}
          className="w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition"
        >
          Continuar Registro
        </button>
      </div>
    </div>
  );
}