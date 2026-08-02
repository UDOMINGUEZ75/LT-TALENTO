"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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
      <div className="min-h-screen bg-[#0A1A3A] text-[#C9A86A] flex items-center justify-center text-lg font-medium">
        Cargando panel de control...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A1A3A] text-white pt-24 pb-16">
      
      {/* Barra superior corporativa */}
      <header className="bg-[#0e244f]/80 backdrop-blur-md border-b border-[#C9A86A]/20 py-4 px-8 flex justify-between items-center shadow-lg">
        <div>
          <h1 className="text-xl font-extrabold text-[#C9A86A] tracking-wider uppercase">
            LT-TALENTO <span className="text-gray-400 font-light text-sm">| Portal de Empresas</span>
          </h1>
          <p className="text-xs text-gray-300 pt-0.5">
            Bienvenido, <span className="font-semibold text-white">{recruiter.name || "Reclutador"}</span> 
            {recruiter.company ? <span className="text-[#C9A86A] font-medium ml-1">({recruiter.company})</span> : ""}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-xs font-bold border border-red-500/40 bg-red-500/10 hover:bg-red-600 text-red-200 hover:text-white px-4 py-2 rounded-xl transition shadow"
          >
            Cerrar Sesión
          </Link>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        
        {/* Banner de Bienvenida con Acentos Dorados */}
        <div className="bg-gradient-to-r from-[#112a5c] via-[#0A1A3A] to-[#112a5c] border border-[#C9A86A]/40 p-8 sm:p-10 rounded-3xl shadow-2xl mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
          <div className="space-y-3 max-w-2xl z-10">
            <span className="inline-block bg-[#C9A86A] text-[#0A1A3A] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
              Panel Activo
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Gestión de Talento y Vacantes
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed font-light">
              Desde aquí puedes administrar tus ofertas de empleo, revisar los candidatos postulados optimizados con IA y configurar los datos corporativos de tu empresa.
            </p>
          </div>

          <div className="z-10 w-full md:w-auto flex-shrink-0">
            <Link
              href={`/reclutador/actualizar/${id}`}
              className="w-full md:w-auto px-6 py-3.5 bg-transparent text-[#C9A86A] border-2 border-[#C9A86A] hover:bg-[#C9A86A] hover:text-[#0A1A3A] font-bold rounded-xl transition-all text-sm block text-center shadow-lg"
            >
              Editar Mis Datos
            </Link>
          </div>
        </div>

        {/* Resumen de Métricas Rápidas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="p-5 rounded-2xl bg-[#112754]/50 border border-[#C9A86A]/20 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-extrabold text-[#C9A86A] mb-1">{activeJobsCount}</span>
            <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Vacantes Activas</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#112754]/50 border border-[#C9A86A]/20 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-extrabold text-[#C9A86A] mb-1">IA</span>
            <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Evaluación de Candidatos</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#112754]/50 border border-[#C9A86A]/20 flex flex-col items-center justify-center text-center">
            <span className="text-[#C9A86A] font-bold text-sm truncate max-w-[200px] mb-1">
              {recruiter.company || "Corporativo"}
            </span>
            <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Cuenta Empresa</span>
          </div>
        </div>

        {/* Cuadrícula de Acciones (Limpia, Sin Íconos, Bordes Dorados) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Módulo 1 */}
          <div className="bg-white text-[#0A1A3A] p-8 rounded-2xl shadow-2xl flex flex-col justify-between border-t-4 border-[#C9A86A] hover:shadow-[#C9A86A]/15 transition-all">
            <div className="space-y-3">
              <span className="text-[11px] font-bold text-[#8c6f33] uppercase tracking-widest block">Publicación</span>
              <h3 className="text-2xl font-bold">Publicar Nueva Vacante</h3>
              <p className="text-gray-600 text-sm leading-relaxed font-light">
                Crea una oferta laboral detallada definiendo requisitos, sueldo y ubicación para atraer al mejor talento.
              </p>
            </div>
            <Link
              href={`/reclutador/vacantes/nueva?id=${id}`}
              className="mt-8 w-full py-3.5 bg-[#C9A86A] text-[#0A1A3A] font-bold rounded-xl hover:bg-[#d8b97a] transition text-sm text-center block shadow-md"
            >
              + Crear Vacante
            </Link>
          </div>

          {/* Módulo 2 */}
          <div className="bg-white text-[#0A1A3A] p-8 rounded-2xl shadow-2xl flex flex-col justify-between border-t-4 border-[#0A1A3A] hover:shadow-[#C9A86A]/15 transition-all">
            <div className="space-y-3">
              <span className="text-[11px] font-bold text-[#8c6f33] uppercase tracking-widest block">Revisión</span>
              <h3 className="text-2xl font-bold">Candidatos Postulados</h3>
              <p className="text-gray-600 text-sm leading-relaxed font-light">
                Visualiza los perfiles postulados, revisa las coincidencias generadas por la IA y selecciona a los ideales.
              </p>
            </div>
            <Link
              href={`/reclutador/candidatos?id=${id}`}
              className="mt-8 w-full py-3.5 bg-[#0A1A3A] text-white font-bold rounded-xl hover:bg-[#122b5c] transition text-sm text-center block shadow-md"
            >
              Ver Candidatos
            </Link>
          </div>

          {/* Módulo 3 */}
          <div className="bg-white text-[#0A1A3A] p-8 rounded-2xl shadow-2xl flex flex-col justify-between border-t-4 border-[#C9A86A] hover:shadow-[#C9A86A]/15 transition-all">
            <div className="space-y-3">
              <span className="text-[11px] font-bold text-[#8c6f33] uppercase tracking-widest block">Administración</span>
              <h3 className="text-2xl font-bold">Mis Vacantes</h3>
              <p className="text-gray-600 text-sm leading-relaxed font-light">
                Monitorea el estatus de tus ofertas publicadas, edítalas o ciérralas cuando cubras las posiciones requeridas.
              </p>
            </div>
            <Link
              href={`/reclutador/mis-vacantes?id=${id}`}
              className="mt-8 w-full py-3.5 bg-[#0A1A3A] text-[#C9A86A] border border-[#C9A86A]/40 font-bold rounded-xl hover:bg-[#122b5c] transition text-sm text-center block shadow-md"
            >
              Administrar Vacantes
            </Link>
          </div>

        </div>

      </main>
    </div>
  );
}

export default function ReclutadorDashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A1A3A] text-white flex items-center justify-center text-xl">Cargando panel...</div>}>
      <DashboardContent />
    </Suspense>
  );
}