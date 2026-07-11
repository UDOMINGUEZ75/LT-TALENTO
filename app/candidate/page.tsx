"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CandidateDashboard() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const [candidate, setCandidate] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCandidate() {
      if (!userId) return;

      const res = await fetch(`/api/candidate?userId=${userId}`);
      const data = await res.json();

      setCandidate(data);
      setLoading(false);
    }

    loadCandidate();
  }, [userId]);

  if (loading) return <p>Cargando...</p>;

  if (!candidate)
    return <p>No se encontró información del candidato.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Bienvenido, {candidate.name}</h1>
      <p>Correo: {candidate.email}</p>

      <h2 style={{ marginTop: "2rem" }}>Tu progreso</h2>
      <p>Estado actual: {candidate.status || "Pendiente"}</p>

      <button
        style={{
          marginTop: "1.5rem",
          padding: "1rem",
          background: "#0070f3",
          color: "white",
          borderRadius: "8px",
        }}
        onClick={() => {
          window.location.href = "/evaluation";
        }}
      >
        Continuar evaluación
      </button>
    </div>
  );
}
