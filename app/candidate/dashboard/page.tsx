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

  const [cvFile, setCvFile] = useState<File | null>(null);

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

  async function procesarCV() {
    if (!cvFile) return alert("Selecciona un archivo primero");

    const formData = new FormData();
    formData.append("file", cvFile);
    formData.append("userId", userId || "");

    const res = await fetch("/api/cv/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("IA result:", data);

    alert("Currículum cargado. La IA está procesando tu información.");
  }

  function finalizarRegistro() {
    alert("Registro finalizado.");
    router.push(`/`);
  }

  function guardarSeccion() {
    alert(`Sección "${section}" guardada correctamente.`);
    setSection(null);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 flex justify-center">
      <div className="bg-white rounded-xl p-10 w-full max-w-3xl shadow-lg border border-gray-200">

        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-2 text-blue-700">
          Bienvenido, {candidate.user.name}
        </h1>
        <p className="text-gray-600 mb-8">{candidate.user.email}</p>

        {/* SIN SECCIÓN → MOSTRAR MENÚ */}
        {!section && (
          <>
            <h2 className="text-lg font-semibold mb-4 text-blue-700">
              Completa tu perfil
            </h2>

            <div className="grid grid-cols-1 gap-4">

              {[
                ["personal", "Datos personales"],
                ["experience", "Experiencia laboral"],
                ["education", "Educación"],
                ["skills", "Habilidades"],
                ["languages", "Idiomas"],
                ["documents", "Documentos"],
                ["preferences", "Preferencias laborales"],
                ["availability", "Disponibilidad"],
              ].map(([key, label]) => (
                <button
                  key={key}
                  className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
                  onClick={() => setSection(key)}
                >
                  {label}
                </button>
              ))}

              {/* FINALIZAR */}
              <button
                className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-sm"
                onClick={finalizarRegistro}
              >
                Finalizar registro
              </button>

              {/* CARGAR CV */}
              <div className="mt-6 p-5 bg-blue-50 rounded-xl border border-blue-200 shadow-sm">
                <h3 className="text-blue-700 font-semibold mb-3">
                  Cargar Curriculum (PDF o Word)
                </h3>

                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                  className="mb-3"
                />

                <button
                  onClick={procesarCV}
                  className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full shadow-sm"
                >
                  Subir Curriculum y Procesar con IA
                </button>
              </div>
            </div>
          </>
        )}

        {/* SECCIÓN SELECCIONADA */}
        {section && (
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4 text-blue-700">
              Sección: {section.toUpperCase()}
            </h2>

            <div className="flex flex-col gap-4">
              {section === "personal" && (
                <>
                  <input className="p-3 border rounded" value={candidate.user.name} readOnly />
                  <input className="p-3 border rounded" value={candidate.user.email} readOnly />
                  <input className="p-3 border rounded" placeholder="Teléfono" />
                  <input className="p-3 border rounded" placeholder="Ciudad" />
                  <input className="p-3 border rounded" placeholder="Estado" />
                </>
              )}

              {section === "experience" && (
                <>
                  <input className="p-3 border rounded" placeholder="Puesto" />
                  <input className="p-3 border rounded" placeholder="Empresa" />
                  <input className="p-3 border rounded" placeholder="Años de experiencia" />
                </>
              )}

              {section === "education" && (
                <>
                  <input className="p-3 border rounded" placeholder="Grado académico" />
                  <input className="p-3 border rounded" placeholder="Institución" />
                </>
              )}

              {section === "skills" && (
                <>
                  <input className="p-3 border rounded" placeholder="Habilidad principal" />
                  <input className="p-3 border rounded" placeholder="Nivel" />
                </>
              )}
            </div>

            <button
              className="mt-6 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
              onClick={guardarSeccion}
            >
              Guardar sección
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
