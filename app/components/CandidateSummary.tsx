"use client";

import { useCandidate } from "@/app/context/CandidateContext";

export default function CandidateSummary() {
  const { candidate } = useCandidate();

  return (
    <div className="bg-white shadow p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-3">Resumen del CV procesado</h2>

      <p><strong>Nombre:</strong> {candidate.personal.nombre || "Sin datos"}</p>
      <p><strong>Correo:</strong> {candidate.personal.email || "Sin datos"}</p>
      <p><strong>Ciudad:</strong> {candidate.personal.ciudad || "Sin datos"}</p>

      <p><strong>Experiencia:</strong> {candidate.expSummary.length > 0 ? "Completado" : "Sin datos"}</p>
      <p><strong>Educación:</strong> {candidate.education.length > 0 ? "Completado" : "Sin datos"}</p>
      <p><strong>Habilidades:</strong> {candidate.skills.length > 0 ? "Completado" : "Sin datos"}</p>
      <p><strong>Idiomas:</strong> {candidate.languages.length > 0 ? "Completado" : "Sin datos"}</p>
    </div>
  );
}