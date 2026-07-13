"use client";

import { useSearchParams } from "next/navigation";

export default function EvaluationEntryPage() {
  const searchParams = useSearchParams();

  // ⭐ Corrección estricta para TypeScript (strictNullChecks)
  const userId = searchParams?.get("userId") ?? "";

  const iniciar = () => {
    window.location.href = `/candidate/evaluation/menu?userId=${userId}`;
  };

  const cancelar = () => {
    window.location.href = `/candidate?userId=${userId}`;
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Evaluación del candidato</h1>
      <p>ID del candidato: {userId}</p>

      <p style={{ marginTop: "1.5rem" }}>
        ¿Deseas completar tu información ahora?
      </p>

      <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
        <button
          style={{
            padding: "1rem",
            background: "#0070f3",
            color: "white",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={iniciar}
        >
          Sí, completar información
        </button>

        <button
          style={{
            padding: "1rem",
            background: "#555",
            color: "white",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={cancelar}
        >
          No, volver al dashboard
        </button>
      </div>
    </div>
  );
}
