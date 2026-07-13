"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Candidate = {
  id: number;
  status: string;
  headline: string;
  summary: string;
  experience: any;
  education: any;
  user: {
    id: number;
    name: string;
    email: string;
  };
};

export default function CandidateDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);

  const [section, setSection] = useState<string | null>(null);

  const userId = searchParams.get("userId");

  useEffect(() => {
    async function loadCandidate() {
      if (!userId) return;

      const res = await fetch(`/api/candidate?userId=${userId}`, {
        cache: "no-store",
      });

      const data = await res.json();
      setCandidate(data.candidate);
      setLoading(false);
    }

    loadCandidate();
  }, [userId]);

  if (!candidate) {
    return (
      <div className="max-w-xl mx-auto py-16 px-6">
        <p>Cargando...</p>
      </div>
    );
  }

  const id = candidate.user.id;

  // ⭐ FINALIZAR REGISTRO
  function finalizarRegistro() {
    alert("Registro finalizado. Puedes completar tu información cuando desees.");
    router.push(`/`);
  }

  // ⭐ GUARDAR SECCIÓN
  function guardarSeccion() {
    alert(`Sección "${section}" guardada correctamente.`);
    setSection(null);
  }

  return (
    <div className="max-w-3xl mx-auto py-16 px-6">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-2">
        Bienvenido, {candidate.user.name}
      </h1>
      <p className="text-gray-700 mb-6">{candidate.user.email}</p>

      {/* SI NO HAY SECCIÓN SELECCIONADA → MOSTRAR BOTONES */}
      {!section && (
        <>
          <h2 className="text-lg font-semibold mb-4">Completa tu registro</h2>

          <div className="flex flex-col gap-4">

            <button
              className="p-3 bg-blue-600 text-white rounded"
              onClick={() => setSection("personal")}
            >
              Datos personales
            </button>

            <button
              className="p-3 bg-gray-200 rounded"
              onClick={() => setSection("experience")}
            >
              Experiencia laboral
            </button>

            <button
              className="p-3 bg-gray-200 rounded"
              onClick={() => setSection("education")}
            >
              Educación
            </button>

            <button
              className="p-3 bg-gray-200 rounded"
              onClick={() => setSection("skills")}
            >
              Habilidades
            </button>

            <button
              className="p-3 bg-gray-200 rounded"
              onClick={() => setSection("languages")}
            >
              Idiomas
            </button>

            <button
              className="p-3 bg-gray-200 rounded"
              onClick={() => setSection("documents")}
            >
              Documentos
            </button>

            <button
              className="p-3 bg-gray-200 rounded"
              onClick={() => setSection("preferences")}
            >
              Preferencias laborales
            </button>

            <button
              className="p-3 bg-gray-200 rounded"
              onClick={() => setSection("availability")}
            >
              Disponibilidad
            </button>

            <button
              className="p-3 bg-green-600 text-white rounded"
              onClick={finalizarRegistro}
            >
              Finalizar registro
            </button>

          </div>
        </>
      )}

      {/* ⭐ SECCIÓN SELECCIONADA → MOSTRAR FORMULARIO */}
      {section && (
        <div className="mt-10">

          <h2 className="text-xl font-bold mb-4">
            Sección: {section.toUpperCase()}
          </h2>

          {/* FORMULARIOS */}
          {section === "personal" && (
            <div className="flex flex-col gap-4">
              <input
                className="p-3 border rounded"
                value={candidate.user.name}
                readOnly
              />
              <input
                className="p-3 border rounded"
                value={candidate.user.email}
                readOnly
              />
              <input className="p-3 border rounded" placeholder="Teléfono" />
              <input className="p-3 border rounded" placeholder="Ciudad" />
              <input className="p-3 border rounded" placeholder="Estado" />
            </div>
          )}

          {section === "experience" && (
            <div className="flex flex-col gap-4">
              <input className="p-3 border rounded" placeholder="Puesto" />
              <input className="p-3 border rounded" placeholder="Empresa" />
              <input className="p-3 border rounded" placeholder="Años de experiencia" />
            </div>
          )}

          {section === "education" && (
            <div className="flex flex-col gap-4">
              <input className="p-3 border rounded" placeholder="Grado académico" />
              <input className="p-3 border rounded" placeholder="Institución" />
            </div>
          )}

          {section === "skills" && (
            <div className="flex flex-col gap-4">
              <input className="p-3 border rounded" placeholder="Habilidad principal" />
              <input className="p-3 border rounded" placeholder="Nivel" />
            </div>
          )}

          {/* ⭐ BOTÓN GUARDAR */}
          <button
            className="mt-6 p-3 bg-blue-600 text-white rounded"
            onClick={guardarSeccion}
          >
            Guardar sección
          </button>

        </div>
      )}
    </div>
  );
}
