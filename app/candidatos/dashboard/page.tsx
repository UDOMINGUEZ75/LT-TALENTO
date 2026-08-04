"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

function CandidateDashboardContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "11";

  const [candidate, setCandidate] = useState({ name: "", email: "" });
  const [applicationsCount, setApplicationsCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Datos del candidato
        const res = await fetch(`/api/candidatos/${id}`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          const cand = data.candidate || data;
          if (cand) {
            setCandidate({
              name: cand.name || "Candidato",
              email: cand.email || "",
            });
          }
        }

        // Datos de postulaciones activas
        const resApps = await fetch(`/api/candidatos/postulaciones?id=${id}`, { cache: "no-store" });
        if (resApps.ok) {
          const dataApps = await resApps.json();
          const apps = dataApps.applications || dataApps || [];
          if (Array.isArray(apps)) {
            setApplicationsCount(apps.length);
          }
        }
      } catch (err) {
        console.error("Error cargando datos del dashboard de candidato:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A1A3A] text-[#C9A86A] flex items-center justify-center text-lg font-bold">
        Cargando tu panel profesional...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A1A3A] text-white pt-20 pb-12">
      
      {/* Barra superior del candidato */}
      <header className="bg-[#0e244f]/90 backdrop-blur-md border-b border-[#C9A86A]/20 py-3.5 px-6 lg:px-10 flex justify-between items-center shadow-lg">
        <div>
          <h1 className="text-lg sm:text-xl font-extrabold text-[#C9A86A] tracking-wider uppercase">
            LT TALENT SOLUTIONS <span className="text-gray-300 font-light text-xs sm:text-sm">| Área de Candidatos</span>
          </h1>
          <p className="text-xs text-gray-300 pt-0.5 font-light">
            Bienvenido, <span className="font-semibold text-white">{candidate.name || "Candidato"}</span>
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
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        
        {/* Banner de Bienvenida */}
        <div className="bg-[#0F224A] border border-[#1A3366] p-8 sm:p-10 rounded-3xl shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
          <div className="space-y-3 max-w-2xl z-10">
            <span className="inline-block bg-[#C9A86A] text-[#0A1A3A] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
              PERFIL ACTIVO
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Panel de Desarrollo Profesional
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed font-light">
              Desde aquí puedes administrar tu información profesional, subir o analizar tu CV con inteligencia artificial y dar seguimiento a tus postulaciones activas.
            </p>
          </div>

          <div className="z-10 w-full md:w-auto flex-shrink-0">
            <Link
              href={`/candidatos/actualizar/${id}`}
              className="w-full md:w-auto px-6 py-3.5 bg-transparent text-[#C9A86A] border-2 border-[#C9A86A] hover:bg-[#C9A86A] hover:text-[#0A1A3A] font-bold rounded-xl transition-all text-sm block text-center shadow-lg"
            >
              Editar Mi Perfil
            </Link>
          </div>
        </div>

        {/* Resumen de Métricas Rápidas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#0F224A] border border-[#1A3366] flex flex-col items-center justify-center text-center shadow-lg">
            <span className="text-4xl font-extrabold text-[#C9A86A] mb-1">{applicationsCount}</span>
            <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Postulaciones Activas</span>
          </div>

          <div className="p-6 rounded-2xl bg-[#0F224A] border border-[#1A3366] flex flex-col items-center justify-center text-center shadow-lg">
            <span className="text-3xl font-extrabold text-[#C9A86A] mb-1 uppercase">IA</span>
            <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Análisis de CV Automático</span>
          </div>

          <div className="p-6 rounded-2xl bg-[#0F224A] border border-[#1A3366] flex flex-col items-center justify-center text-center shadow-lg">
            <span className="text-lg font-bold text-white truncate max-w-[220px] mb-1">
              {candidate.name || "Candidato"}
            </span>
            <span className="text-xs font-bold text-[#C9A86A] uppercase tracking-widest">Cuenta Profesional</span>
          </div>
        </div>

        {/* Cuadrícula de Acciones (3 Tarjetas Principales) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Módulo 1 */}
          <div className="bg-white text-gray-900 rounded-3xl p-8 border-t-8 border-[#C9A86A] shadow-2xl flex flex-col justify-between h-[380px]">
            <div>
              <span className="text-xs font-bold text-[#8c6f33] uppercase tracking-widest block mb-2">Oportunidades</span>
              <h3 className="text-2xl font-extrabold text-[#0A1A3A] mb-3">Explorar Vacantes</h3>
              <p className="text-gray-600 text-sm leading-relaxed font-light">
                Descubre las posiciones ejecutivas y técnicas disponibles de acuerdo a tu perfil profesional y postúlate en un clic.
              </p>
            </div>
            <Link
              href="/vacantes"
              className="w-full py-4 bg-[#C9A86A] text-[#0A1A3A] font-bold text-center rounded-2xl hover:bg-[#d8b97a] transition shadow-md block text-sm cursor-pointer"
            >
              + Ver Vacantes
            </Link>
          </div>

          {/* Módulo 2 */}
          <div className="bg-white text-gray-900 rounded-3xl p-8 border-t-8 border-[#0A1A3A] shadow-2xl flex flex-col justify-between h-[380px]">
            <div>
              <span className="text-xs font-bold text-[#8c6f33] uppercase tracking-widest block mb-2">Optimización</span>
              <h3 className="text-2xl font-extrabold text-[#0A1A3A] mb-3">Mi Perfil y CV</h3>
              <p className="text-gray-600 text-sm leading-relaxed font-light">
                Mantén actualizada tu experiencia, educación y sube tu CV en PDF para extraer datos automáticamente mediante IA.
              </p>
            </div>
            <Link
              href={`/candidatos/actualizar/${id}`}
              className="w-full py-4 bg-[#0A1A3A] text-white font-bold text-center rounded-2xl hover:bg-[#122b5c] transition shadow-md block text-sm cursor-pointer"
            >
              Actualizar Mi Perfil
            </Link>
          </div>

          {/* Módulo 3 */}
          <div className="bg-white text-gray-900 rounded-3xl p-8 border-t-8 border-[#C9A86A] shadow-2xl flex flex-col justify-between h-[380px]">
            <div>
              <span className="text-xs font-bold text-[#8c6f33] uppercase tracking-widest block mb-2">Seguimiento</span>
              <h3 className="text-2xl font-extrabold text-[#0A1A3A] mb-3">Mis Postulaciones</h3>
              <p className="text-gray-600 text-sm leading-relaxed font-light">
                Monitorea el estado de los procesos de selección en los que estás participando y revisa las observaciones del equipo.
              </p>
            </div>
            <Link
              href={`/candidatos/postulaciones?id=${id}`}
              className="w-full py-4 bg-[#0A1A3A] text-[#C9A86A] border border-[#C9A86A]/40 font-bold text-center rounded-2xl hover:bg-[#122b5c] transition shadow-md block text-sm cursor-pointer"
            >
              Ver Mis Candidaturas
            </Link>
          </div>

        </div>

      </main>
    </div>
  );
}

export default function CandidatoDashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A1A3A] text-[#C9A86A] flex items-center justify-center text-lg font-bold">Cargando panel...</div>}>
      <CandidateDashboardContent />
    </Suspense>
  );
}