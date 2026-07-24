"use client";

import { useEffect, useState } from "react";

export default function RegistroDashboard() {
  const [loading, setLoading] = useState(true);
  const [candidate, setCandidate] = useState(null);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const params = new URLSearchParams(window.location.search);
        const candidateId = params.get("candidateId");

        if (!candidateId) {
          setError("No se encontró el ID del candidato.");
          setLoading(false);
          return;
        }

        const res = await fetch(`/api/candidate?id=${candidateId}`);
        const data = await res.json();

        if (!data.ok) {
          setError(data.message || "Error al cargar la información.");
          setLoading(false);
          return;
        }

        setCandidate(data.user);
        setProfile(data.profile);
      } catch (err) {
        console.error(err);
        setError("Error interno al cargar el dashboard.");
      }

      setLoading(false);
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-20 text-xl font-semibold">
        Cargando información...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-red-600 text-xl font-semibold">
        {error}
      </div>
    );
  }

  const cvSubido = !!profile.cvUrl;
  const analisisHecho = !!profile.experience;

  return (
    <section className="max-w-3xl mx-auto mt-16 p-8 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center text-[#1C4E80] mb-6">
        Dashboard de Registro
      </h1>

      <div className="space-y-4">
        <div className="p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Información del candidato</h2>
          <p><strong>Nombre:</strong> {candidate.name}</p>
          <p><strong>Correo:</strong> {candidate.email}</p>
          <p><strong>Estado del perfil:</strong> {profile.status}</p>
          <p><strong>CV:</strong> {cvSubido ? "Subido" : "Pendiente"}</p>
          <p><strong>Análisis:</strong> {analisisHecho ? "Completado" : "Pendiente"}</p>
        </div>

        <div className="p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Acciones</h2>

          {/* Paso 1: Subir CV */}
          <button
            onClick={() => window.location.href = `/registro/cv?candidateId=${profile.id}`}
            className="w-full py-3 bg-[#1C4E80] text-white rounded-lg hover:bg-[#163B63] transition mb-3"
          >
            Subir Curriculum (Primer paso obligatorio)
          </button>

          {/* Paso 2: Análisis del CV */}
          <button
            disabled={!cvSubido}
            onClick={() => cvSubido && (window.location.href = `/registro/analisis?candidateId=${profile.id}`)}
            className={`w-full py-3 rounded-lg mb-3 transition ${
              cvSubido
                ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Ver Análisis del CV
          </button>

          {/* Paso 3: Información Personal */}
          <button
            disabled={!analisisHecho}
            onClick={() => analisisHecho && (window.location.href = `/registro/perfil?candidateId=${profile.id}`)}
            className={`w-full py-3 rounded-lg transition ${
              analisisHecho
                ? "bg-[#1C4E80] text-white hover:bg-[#163B63]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Completar Información Personal
          </button>
        </div>
      </div>
    </section>
  );
}
