"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type ExperienceItem = {
  puesto: string;
  empresa: string;
  años: string;
};

type EducationItem = {
  grado: string;
  institucion: string;
};

type Candidate = {
  id: number;
  status: string;
  headline: string;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  languages: string[];
  phone?: string;
  city?: string;
  state?: string;
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
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>("");

  const userId = searchParams?.get("userId") ?? "";

  async function loadCandidate() {
    if (!userId) return;

    setLoading(true);
    const res = await fetch(`/api/candidate?userId=${userId}`, {
      cache: "no-store",
    });

    const data = await res.json();
    setCandidate(data.candidate);
    setLoading(false);
  }

  useEffect(() => {
    loadCandidate();
  }, [userId]);

  if (loading || !candidate) {
    return (
      <div className="max-w-xl mx-auto py-16 px-6 flex flex-col items-center gap-4">
        <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p>Cargando perfil de candidato...</p>
      </div>
    );
  }

  const id = candidate.user.id;

  async function procesarCV() {
    if (!cvFile) return alert("Selecciona un archivo primero");

    setUploading(true);
    setUploadProgress("Subiendo archivo...");

    const buffer = await cvFile.arrayBuffer();

    try {
      setUploadProgress("Procesando CV con IA...");

      const res = await fetch(`/api/cv/upload?userId=${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": cvFile.type,
        },
        body: buffer,
      });

      const data = await res.json();
      console.log("IA result:", data);

      setUploadProgress("Actualizando tu perfil con la información del CV...");
      await loadCandidate();

      setUploadProgress("Currículum procesado correctamente.");
      alert("Currículum cargado. La IA ha actualizado tu información.");
    } catch (err) {
      console.error("Error al procesar CV:", err);
      alert("Ocurrió un error al procesar el CV.");
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(""), 2000);
    }
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
      <div className="bg-white rounded-xl p-10 w-full max-w-4xl shadow-lg border border-gray-200">
        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-2 text-blue-700">
          Bienvenido, {candidate.user.name}
        </h1>
        <p className="text-gray-600 mb-2">{candidate.user.email}</p>
        {candidate.phone && (
          <p className="text-gray-600 mb-1">Teléfono: {candidate.phone}</p>
        )}
        {(candidate.city || candidate.state) && (
          <p className="text-gray-600 mb-6">
            {candidate.city && `Ciudad: ${candidate.city} `}
            {candidate.state && `· Estado: ${candidate.state}`}
          </p>
        )}

        {/* RESUMEN DEL CV PROCESADO */}
        <div className="mb-8 p-5 bg-gray-50 rounded-xl border border-gray-200">
          <h2 className="text-lg font-semibold mb-3 text-blue-700">
            Resumen del CV procesado
          </h2>

          {candidate.headline && (
            <p className="font-semibold mb-2">Titular: {candidate.headline}</p>
          )}

          {candidate.summary && (
            <p className="text-gray-700 mb-4">{candidate.summary}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Skills */}
            <div>
              <h3 className="font-semibold text-blue-700 mb-2">Habilidades</h3>
              {candidate.skills && candidate.skills.length > 0 ? (
                <ul className="list-disc list-inside text-gray-700">
                  {candidate.skills.map((skill, idx) => (
                    <li key={idx}>{skill}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">
                  Aún no se han detectado habilidades.
                </p>
              )}
            </div>

            {/* Idiomas */}
            <div>
              <h3 className="font-semibold text-blue-700 mb-2">Idiomas</h3>
              {candidate.languages && candidate.languages.length > 0 ? (
                <ul className="list-disc list-inside text-gray-700">
                  {candidate.languages.map((lang, idx) => (
                    <li key={idx}>{lang}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">
                  Aún no se han detectado idiomas.
                </p>
              )}
            </div>
          </div>

          {/* Experiencia */}
          <div className="mt-4">
            <h3 className="font-semibold text-blue-700 mb-2">
              Experiencia laboral
            </h3>
            {candidate.experience && candidate.experience.length > 0 ? (
              <ul className="space-y-2 text-gray-700">
                {candidate.experience.map((exp, idx) => (
                  <li key={idx} className="border rounded p-2">
                    <p className="font-semibold">{exp.puesto}</p>
                    <p>{exp.empresa}</p>
                    <p className="text-sm text-gray-500">
                      Años: {exp.años || "N/D"}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">
                Aún no se ha detectado experiencia laboral.
              </p>
            )}
          </div>

          {/* Educación */}
          <div className="mt-4">
            <h3 className="font-semibold text-blue-700 mb-2">Educación</h3>
            {candidate.education && candidate.education.length > 0 ? (
              <ul className="space-y-2 text-gray-700">
                {candidate.education.map((edu, idx) => (
                  <li key={idx} className="border rounded p-2">
                    <p className="font-semibold">{edu.grado}</p>
                    <p>{edu.institucion}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">
                Aún no se ha detectado educación formal.
              </p>
            )}
          </div>
        </div>

        {/* PROGRESO DE CV */}
        {uploading && (
          <div className="mb-6 flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="h-6 w-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-blue-700 text-sm">{uploadProgress}</p>
          </div>
        )}
        {!uploading && uploadProgress && (
          <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 text-sm">{uploadProgress}</p>
          </div>
        )}

        {/* SIN SECCIÓN → MENÚ */}
        {!section && (
          <>
            <h2 className="text-lg font-semibold mb-4 text-blue-700">
              Completa tu perfil
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <div className="mt-6 p-5 bg-blue-50 rounded-xl border border-blue-200 shadow-sm col-span-1 md:col-span-2">
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
                  className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full shadow-sm disabled:bg-blue-300"
                  disabled={uploading}
                >
                  {uploading
                    ? "Procesando CV..."
                    : "Subir Curriculum y Procesar con IA"}
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
                  <input
                    className="p-3 border rounded"
                    placeholder="Teléfono"
                    defaultValue={candidate.phone || ""}
                  />
                  <input
                    className="p-3 border rounded"
                    placeholder="Ciudad"
                    defaultValue={candidate.city || ""}
                  />
                  <input
                    className="p-3 border rounded"
                    placeholder="Estado"
                    defaultValue={candidate.state || ""}
                  />
                </>
              )}

              {section === "experience" && (
                <>
                  <input
                    className="p-3 border rounded"
                    placeholder="Puesto"
                    defaultValue={candidate.experience?.[0]?.puesto || ""}
                  />
                  <input
                    className="p-3 border rounded"
                    placeholder="Empresa"
                    defaultValue={candidate.experience?.[0]?.empresa || ""}
                  />
                  <input
                    className="p-3 border rounded"
                    placeholder="Años de experiencia"
                    defaultValue={candidate.experience?.[0]?.años || ""}
                  />
                </>
              )}

              {section === "education" && (
                <>
                  <input
                    className="p-3 border rounded"
                    placeholder="Grado académico"
                    defaultValue={candidate.education?.[0]?.grado || ""}
                  />
                  <input
                    className="p-3 border rounded"
                    placeholder="Institución"
                    defaultValue={candidate.education?.[0]?.institucion || ""}
                  />
                </>
              )}

              {section === "skills" && (
                <>
                  <input
                    className="p-3 border rounded"
                    placeholder="Habilidad principal"
                    defaultValue={candidate.skills?.[0] || ""}
                  />
                  <input
                    className="p-3 border rounded"
                    placeholder="Otra habilidad"
                    defaultValue={candidate.skills?.[1] || ""}
                  />
                </>
              )}

              {section === "languages" && (
                <>
                  <input
                    className="p-3 border rounded"
                    placeholder="Idioma principal"
                    defaultValue={candidate.languages?.[0] || ""}
                  />
                  <input
                    className="p-3 border rounded"
                    placeholder="Otro idioma"
                    defaultValue={candidate.languages?.[1] || ""}
                  />
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
