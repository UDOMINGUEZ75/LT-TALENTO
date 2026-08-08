"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Sparkles, ArrowRight, Briefcase, FileText, CheckCircle } from "lucide-react";

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

        const resApps = await fetch(`/api/candidatos/postulaciones?id=${id}`, { cache: "no-store" });
        if (resApps.ok) {
          const dataApps = await resApps.json();
          const apps = dataApps.applications || dataApps || [];
          if (Array.isArray(apps)) {
            setApplicationsCount(apps.length);
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
        Cargando tu panel profesional...
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
              PERFIL ACTIVO
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug">
              Panel de Desarrollo Profesional
            </h1>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
              Bienvenido, <span className="font-semibold text-white">{candidate.name || "Candidato"}</span>. Desde aquí puedes administrar tu información, analizar tu CV con inteligencia artificial y dar seguimiento a tus postulaciones.
            </p>
          </div>

          <div className="z-10 w-full md:w-auto flex-shrink-0">
            <Link
              href={`/candidatos/actualizar/${id}`}
              className="w-full md:w-auto px-6 py-3.5 bg-[#C9A86A] hover:bg-[#b89555] text-[#0A1A3A] font-extrabold rounded-xl transition-all text-xs sm:text-sm block text-center shadow-lg"
            >
              Editar Mi Perfil
            </Link>
          </div>
        </div>

        {/* Resumen de Métricas Rápidas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="p-5 sm:p-6 rounded-2xl bg-[#0e244f] border border-[#C9A86A]/20 flex flex-col items-center justify-center text-center shadow-lg">
            <span className="text-3xl sm:text-4xl font-black text-[#C9A86A] mb-1">{applicationsCount}</span>
            <span className="text-[10px] sm:text-xs font-bold text-gray-300 uppercase tracking-widest">POSTULACIONES ACTIVAS</span>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-[#0e244f] border border-[#C9A86A]/20 flex flex-col items-center justify-center text-center shadow-lg">
            <span className="text-2xl sm:text-3xl font-black text-[#C9A86A] mb-1 flex items-center justify-center gap-1.5">
              IA <Sparkles size={20} />
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-gray-300 uppercase tracking-widest">ANÁLISIS DE CV AUTOMÁTICO</span>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-[#0e244f] border border-[#C9A86A]/20 flex flex-col items-center justify-center text-center shadow-lg">
            <span className="text-sm sm:text-base font-extrabold text-white truncate max-w-[240px] mb-1">
              {candidate.name || "Candidato"}
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-[#C9A86A] uppercase tracking-widest">CUENTA PROFESIONAL</span>
          </div>
        </div>

        {/* Cuadrícula con el Diseño Exacto de la Segunda Imagen en Cada Tarjeta */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Tarjeta 1: Explorar Vacantes */}
          <div className="bg-white rounded-[28px] shadow-2xl overflow-hidden border border-[#C9A86A]/40 flex flex-col justify-between">
            <div className="bg-[#0A1A3A] px-6 py-8 text-center border-b border-[#C9A86A]/30 text-white">
              <span className="inline-block px-3 py-1 mb-3 text-[10px] font-extrabold uppercase tracking-widest text-[#0A1A3A] bg-[#C9A86A] rounded-full shadow-md">
                Oportunidades
              </span>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                Explorar Vacantes
              </h3>
            </div>
            <div className="p-6 flex flex-col justify-between flex-1 space-y-6">
              <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed text-center">
                Descubre posiciones ejecutivas y técnicas de acuerdo a tu perfil profesional y postúlate en un clic.
              </p>
              <div>
                <Link
                  href="/vacantes"
                  className="w-full py-3.5 bg-[#C9A86A] text-[#0A1A3A] font-black text-center rounded-xl hover:bg-[#b89555] transition shadow-md block text-xs sm:text-sm"
                >
                  Ver Vacantes →
                </Link>
              </div>
            </div>
          </div>

          {/* Tarjeta 2: Mi Perfil y CV */}
          <div className="bg-white rounded-[28px] shadow-2xl overflow-hidden border border-[#C9A86A]/40 flex flex-col justify-between">
            <div className="bg-[#0A1A3A] px-6 py-8 text-center border-b border-[#C9A86A]/30 text-white">
              <span className="inline-block px-3 py-1 mb-3 text-[10px] font-extrabold uppercase tracking-widest text-[#0A1A3A] bg-[#C9A86A] rounded-full shadow-md">
                Optimización
              </span>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                Mi Perfil y CV
              </h3>
            </div>
            <div className="p-6 flex flex-col justify-between flex-1 space-y-6">
              <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed text-center">
                Mantén actualizada tu experiencia, educación y sube tu CV en PDF para extraer datos automáticamente mediante IA.
              </p>
              <div>
                <Link
                  href={`/candidatos/actualizar/${id}`}
                  className="w-full py-3.5 bg-[#0A1A3A] text-white font-black text-center rounded-xl hover:bg-[#122b5c] transition shadow-md block text-xs sm:text-sm"
                >
                  Actualizar Mi Perfil →
                </Link>
              </div>
            </div>
          </div>

          {/* Tarjeta 3: Mis Postulaciones */}
          <div className="bg-white rounded-[28px] shadow-2xl overflow-hidden border border-[#C9A86A]/40 flex flex-col justify-between">
            <div className="bg-[#0A1A3A] px-6 py-8 text-center border-b border-[#C9A86A]/30 text-white">
              <span className="inline-block px-3 py-1 mb-3 text-[10px] font-extrabold uppercase tracking-widest text-[#0A1A3A] bg-[#C9A86A] rounded-full shadow-md">
                Seguimiento
              </span>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                Mis Postulaciones
              </h3>
            </div>
            <div className="p-6 flex flex-col justify-between flex-1 space-y-6">
              <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed text-center">
                Monitorea el estado de los procesos de selección en los que participas y revisa las observaciones del equipo.
              </p>
              <div>
                <Link
                  href={`/candidatos/postulaciones?id=${id}`}
                  className="w-full py-3.5 bg-[#0A1A3A] text-[#C9A86A] border border-[#C9A86A]/40 font-black text-center rounded-xl hover:bg-[#122b5c] transition shadow-md block text-xs sm:text-sm"
                >
                  Ver Mis Candidaturas →
                </Link>
              </div>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}

export default function CandidatoDashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A1A3A] text-[#C9A86A] flex items-center justify-center text-sm font-bold">Cargando panel...</div>}>
      <CandidateDashboardContent />
    </Suspense>
  );
}