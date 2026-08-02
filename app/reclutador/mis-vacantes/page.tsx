"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface Job {
  id: number;
  title: string;
  location: string;
  salary?: string;
  description: string;
  recruiter?: {
    name: string;
    company: string;
  };
}

function MisVacantesContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || searchParams.get("recruiterId") || "11";

  const [vacancies, setVacancies] = useState<Job[]>([]);
  const [recruiterName, setRecruiterName] = useState("");
  const [recruiterCompany, setRecruiterCompany] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMyVacancies() {
      try {
        const res = await fetch(`/api/mis-vacantes?id=${id}`, {
          cache: "no-store",
        });
        const data = await res.json();

        if (res.ok && data.vacancies) {
          setVacancies(data.vacancies);
          if (data.vacancies.length > 0 && data.vacancies[0].recruiter) {
            setRecruiterName(data.vacancies[0].recruiter.name);
            setRecruiterCompany(data.vacancies[0].recruiter.company);
          }
        }

        const resRecruiter = await fetch(`/api/reclutador/${id}`, { cache: "no-store" });
        if (resRecruiter.ok) {
          const recData = await resRecruiter.json();
          if (recData.recruiter) {
            setRecruiterName(recData.recruiter.name);
            setRecruiterCompany(recData.recruiter.company);
          }
        }
      } catch (err) {
        console.error("Error al obtener mis vacantes:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMyVacancies();
  }, [id]);

  const handleDeleteJob = async (jobId: number) => {
    if (!confirm("¿Estás seguro de que deseas cerrar esta vacante?")) return;

    try {
      const res = await fetch(`/api/vacantes/${jobId}`, {
        method: "PATCH",
      });

      if (res.ok) {
        setVacancies(vacancies.filter((v) => v.id !== jobId));
      } else {
        alert("No se pudo cerrar la vacante.");
      }
    } catch (err) {
      console.error("Error al cerrar la vacante:", err);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-[#C9A86A] text-lg font-medium bg-[#0A1A3A] min-h-screen">
        Cargando tus vacantes...
      </div>
    );
  }

  return (
    <section className="py-20 bg-[#0A1A3A] text-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 pt-6">
        
        {/* Encabezado y Regreso */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-[#C9A86A] mb-2">Mis Vacantes Publicadas</h1>
            <p className="text-gray-300 text-sm">
              Gestiona las ofertas creadas por <span className="font-semibold text-white">{recruiterName || "Reclutador"}</span>
              {recruiterCompany ? <span className="text-[#C9A86A] font-medium ml-1">({recruiterCompany})</span> : ""}.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href={`/reclutador/dashboard?id=${id}`}
              className="px-5 py-3 bg-[#112a5c] text-white font-bold rounded-xl hover:bg-[#1a3a75] transition text-sm shadow-md border border-[#C9A86A]/30"
            >
              ← Volver al Dashboard
            </Link>
            <Link
              href={`/reclutador/vacantes/nueva?id=${id}`}
              className="px-5 py-3 bg-[#C9A86A] text-[#0A1A3A] font-bold rounded-xl hover:bg-[#d8b97a] transition text-sm shadow-md"
            >
              + Crear Nueva Vacante
            </Link>
          </div>
        </div>

        {/* Cuadrícula de Vacantes Propias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vacancies.map((v) => (
            <div
              key={v.id}
              className="p-8 rounded-2xl bg-white text-gray-900 border border-gray-200 shadow-2xl flex flex-col justify-between w-full min-h-[420px]"
            >
              <div className="space-y-4 pt-2">
                <h3 className="text-2xl font-bold text-[#0A1A3A] leading-snug">{v.title}</h3>
                <div className="text-xs font-semibold flex flex-wrap gap-2 pt-1">
                  <span className="bg-[#0A1A3A]/5 px-3 py-1.5 rounded-lg text-[#0A1A3A]">
                    <span className="text-[#8c6f33] mr-1">Ubicación:</span> {v.location || "Presencial"}
                  </span>
                  <span className="bg-[#C9A86A]/15 px-3 py-1.5 rounded-lg text-[#8c6f33]">
                    <span className="font-bold mr-1">Sueldo:</span> {v.salary || "Competitivo"}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-3 font-light pt-3 leading-relaxed">
                  {v.description}
                </p>
              </div>

              {/* Botones de acción: Editar y Cancelar */}
              <div className="flex gap-3 pt-6 border-t border-gray-100 mt-4">
                <Link
                  href={`/reclutador/vacantes/editar/${v.id}?id=${id}`}
                  className="flex-1 py-3 bg-[#0A1A3A] text-[#C9A86A] font-bold rounded-xl hover:bg-[#122b5c] transition text-xs text-center block shadow"
                >
                  Editar Puesto
                </Link>
                <button
                  onClick={() => handleDeleteJob(v.id)}
                  className="px-4 py-3 bg-red-100 text-red-700 font-bold rounded-xl hover:bg-red-200 transition text-xs text-center shadow"
                >
                  Cancelar Vacante
                </button>
              </div>
            </div>
          ))}
        </div>

        {vacancies.length === 0 && (
          <div className="text-center py-16 bg-white/5 rounded-2xl border border-gray-700 max-w-4xl mx-auto mt-6">
            <p className="text-gray-300 text-base mb-4">Aún no has registrado ninguna vacante bajo tu cuenta corporativa.</p>
            <Link
              href={`/reclutador/vacantes/nueva?id=${id}`}
              className="inline-block px-6 py-3 bg-[#C9A86A] text-[#0A1A3A] font-bold rounded-xl hover:bg-[#d8b97a] transition text-sm"
            >
              Crear mi primera vacante
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}

export default function MisVacantesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A1A3A] text-white flex items-center justify-center text-xl">Cargando mis vacantes...</div>}>
      <MisVacantesContent />
    </Suspense>
  );
}