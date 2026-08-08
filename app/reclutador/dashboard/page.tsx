"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Sparkles, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

function DashboardContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "1";

  const [recruiter, setRecruiter] = useState({ name: "", company: "", email: "" });
  const [activeJobsCount, setActiveJobsCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Datos del reclutador
        const res = await fetch(`/api/reclutador/${id}`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data.recruiter) {
            setRecruiter(data.recruiter);
          }
        }

        // Datos de conteo de vacantes activas
        const resVacancies = await fetch(`/api/mis-vacantes?id=${id}`, { cache: "no-store" });
        if (resVacancies.ok) {
          const dataVac = await resVacancies.json();
          if (dataVac.vacancies) {
            setActiveJobsCount(dataVac.vacancies.length);
          }
        }
      } catch (err) {
        console.error("Error cargando datos del dashboard:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A1A3A] text-[#C9A86A] flex items-center justify-center text-sm font-bold">
        Cargando panel de control...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A1A3A] text-white pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      
      {/* Contenedor Principal */}
      <main className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Banner de Bienvenida Superior */}
        <div className="bg-[#0e244f] border border-[#C9A86A]/30 p-6 sm:p-10 rounded-3xl shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
          <div className="space-y-2.5 max-w-2xl z-10">
            <span className="inline-block bg-[#C9A86A] text-[#0A1A3A] text-[10px] sm:text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
              PORTAL DE EMPRESAS • PANEL ACTIVO
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug">
              Gestión de Talento y Vacantes
            </h1>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
              Bienvenido, <span className="font-semibold text-white">{recruiter.name || "Reclutador"}</span> {recruiter.company ? <span className="text-[#C9A86A] font-medium">({recruiter.company})</span> : ""}. Desde aquí puedes administrar tus ofertas de empleo y revisar los candidatos optimizados con IA.
            </p>
          </div>

          <div className="z-10 w-full md:w-auto flex-shrink-0">
            <Link
              href={`/reclutador/actualizar/${id}`}
              className="w-full md:w-auto px-6 py-3.5 bg-[#C9A86A] hover:bg-[#b89555] text-[#0A1A3A] font-extrabold rounded-xl transition-all text-xs sm:text-sm block text-center shadow-lg"
            >
              Editar Mis Datos
            </Link>
          </div>
        </div>

        {/* Resumen de Métricas Rápidas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="p-5 sm:p-6 rounded-2xl bg-[#0e244f] border border-[#C9A86A]/20 flex flex-col items-center justify-center text-center shadow-lg">
            <span className="text-3xl sm:text-4xl font-black text-[#C9A86A] mb-1">{activeJobsCount}</span>
            <span className="text-[10px] sm:text-xs font-bold text-gray-300 uppercase tracking-widest">VACANTES ACTIVAS</span>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-[#0e244f] border border-[#C9A86A]/20 flex flex-col items-center justify-center text-center shadow-lg">
            <span className="text-2xl sm:text-3xl font-black text-[#C9A86A] mb-1 flex items-center justify-center gap-1.5">
              IA <Sparkles size={20} />
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-gray-300 uppercase tracking-widest">EVALUACIÓN DE CANDIDATOS</span>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-[#0e244f] border border-[#C9A86A]/20 flex flex-col items-center justify-center text-center shadow-lg">
            <span className="text-sm sm:text-base font-extrabold text-[#C9A86A] truncate max-w-[240px] mb-1">
              {recruiter.company || "Corporativo"}
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-gray-300 uppercase tracking-widest">CUENTA EMPRESA</span>
          </div>
        </div>

        {/* Cuadrícula de Tarjetas con la Cabecera Azul y Etiqueta Dorada */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Tarjeta 1: Publicar Nueva Vacante */}
          <div className="bg-white rounded-[28px] shadow-2xl overflow-hidden border border-[#C9A86A]/40 flex flex-col justify-between text-gray-900">
            <div className="bg-[#0A1A3A] px-6 py-8 text-center border-b border-[#C9A86A]/30 text-white">
              <span className="inline-block px-3 py-1 mb-3 text-[10px] font-extrabold uppercase tracking-widest text-[#0A1A3A] bg-[#C9A86A] rounded-full shadow-md">
                Publicación
              </span>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                Publicar Nueva Vacante
              </h3>
            </div>
            <div className="p-6 flex flex-col justify-between flex-1 space-y-6">
              <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed text-center">
                Crea una oferta laboral detallada definiendo requisitos, sueldo y ubicación para atraer al mejor talento.
              </p>
              <div>
                <Link
                  href={`/reclutador/vacantes/nueva?id=${id}`}
                  className="w-full py-3.5 bg-[#C9A86A] text-[#0A1A3A] font-black text-center rounded-xl hover:bg-[#b89555] transition shadow-md block text-xs sm:text-sm"
                >
                  + Crear Vacante
                </Link>
              </div>
            </div>
          </div>

          {/* Tarjeta 2: Candidatos Postulados */}
          <div className="bg-white rounded-[28px] shadow-2xl overflow-hidden border border-[#C9A86A]/40 flex flex-col justify-between text-gray-900">
            <div className="bg-[#0A1A3A] px-6 py-8 text-center border-b border-[#C9A86A]/30 text-white">
              <span className="inline-block px-3 py-1 mb-3 text-[10px] font-extrabold uppercase tracking-widest text-[#0A1A3A] bg-[#C9A86A] rounded-full shadow-md">
                Revisión
              </span>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                Candidatos Postulados
              </h3>
            </div>
            <div className="p-6 flex flex-col justify-between flex-1 space-y-6">
              <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed text-center">
                Visualiza los perfiles postulados, revisa las coincidencias generadas por la IA y selecciona a los ideales.
              </p>
              <div>
                <Link
                  href={`/reclutador/candidatos?id=${id}`}
                  className="w-full py-3.5 bg-[#0A1A3A] text-white font-black text-center rounded-xl hover:bg-[#122b5c] transition shadow-md block text-xs sm:text-sm"
                >
                  Ver Candidatos →
                </Link>
              </div>
            </div>
          </div>

          {/* Tarjeta 3: Mis Vacantes */}
          <div className="bg-white rounded-[28px] shadow-2xl overflow-hidden border border-[#C9A86A]/40 flex flex-col justify-between text-gray-900">
            <div className="bg-[#0A1A3A] px-6 py-8 text-center border-b border-[#C9A86A]/30 text-white">
              <span className="inline-block px-3 py-1 mb-3 text-[10px] font-extrabold uppercase tracking-widest text-[#0A1A3A] bg-[#C9A86A] rounded-full shadow-md">
                Administración
              </span>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                Mis Vacantes
              </h3>
            </div>
            <div className="p-6 flex flex-col justify-between flex-1 space-y-6">
              <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed text-center">
                Monitorea el estatus de tus ofertas publicadas, edítalas o ciérralas cuando cubras las posiciones requeridas.
              </p>
              <div>
                <Link
                  href={`/reclutador/mis-vacantes?id=${id}`}
                  className="w-full py-3.5 bg-[#0A1A3A] text-[#C9A86A] border border-[#C9A86A]/40 font-black text-center rounded-xl hover:bg-[#122b5c] transition shadow-md block text-xs sm:text-sm"
                >
                  Administrar Vacantes →
                </Link>
              </div>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}

export default function ReclutadorDashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A1A3A] text-white flex items-center justify-center text-sm font-bold">Cargando panel...</div>}>
      <DashboardContent />
    </Suspense>
  );
}