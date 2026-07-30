"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

function DashboardContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "1";

  const [recruiter, setRecruiter] = useState({ name: "", company: "", email: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const res = await fetch(`/api/reclutador/${id}`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data.recruiter) {
            setRecruiter(data.recruiter);
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
    return <div className="min-h-screen bg-[#0A1A3A] text-white flex items-center justify-center text-xl">Cargando panel de control...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0A1A3A] text-white">
      {/* Barra superior del Dashboard */}
      <header className="bg-[#0e244f] border-b border-[#1c366b] py-4 px-8 flex justify-between items-center shadow-md">
        <div>
          <h1 className="text-xl font-bold text-[#C9A86A]">LT-TALENTO | Portal de Empresas</h1>
          <p className="text-xs text-gray-300">Bienvenido, <span className="font-semibold text-white">{recruiter.name || "Reclutador"}</span> ({recruiter.company || "Corporativo"})</p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-sm bg-red-600/80 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            Cerrar Sesión
          </Link>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        
        {/* Tarjeta de bienvenida / Resumen */}
        <div className="bg-gradient-to-r from-[#112a5c] to-[#1a3a75] border border-[#C9A86A]/30 p-8 rounded-2xl shadow-xl mb-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <span className="bg-[#C9A86A] text-[#0A1A3A] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Panel Activo
            </span>
            <h2 className="text-3xl font-extrabold mt-3 text-white">Gestión de Talento y Vacantes</h2>
            <p className="text-gray-300 mt-2 max-w-xl text-sm leading-relaxed">
              Desde aquí puedes administrar tus ofertas de empleo, revisar candidatos postulados con inteligencia artificial y configurar los datos de tu empresa.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              href={`/reclutador/actualizar/${id}`}
              className="px-6 py-3 bg-white text-[#0A1A3A] font-semibold rounded-xl hover:bg-gray-100 transition text-center shadow"
            >
              ⚙️ Editar Mis Datos
            </Link>
          </div>
        </div>

        {/* Cuadrícula de Acciones Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white text-[#0A1A3A] p-6 rounded-2xl shadow-xl flex flex-col justify-between border-t-4 border-[#C9A86A]">
            <div>
              <div className="text-3xl mb-3">📢</div>
              <h3 className="text-xl font-bold mb-2">Publicar Nueva Vacante</h3>
              <p className="text-gray-600 text-sm mb-6">
                Crea una oferta laboral detallada para atraer a los mejores candidatos del mercado.
              </p>
            </div>
            {/* ENLACE CORREGIDO PASANDO EL ID */}
            <Link
              href={`/reclutador/vacantes/nueva?id=${id}`}
              className="w-full py-3 bg-[#0A1A3A] text-white font-semibold rounded-xl hover:bg-[#142850] transition text-center"
            >
              Crear Vacante +
            </Link>
          </div>

          <div className="bg-white text-[#0A1A3A] p-6 rounded-2xl shadow-xl flex flex-col justify-between border-t-4 border-[#C9A86A]">
            <div>
              <div className="text-3xl mb-3">👥</div>
              <h3 className="text-xl font-bold mb-2">Candidatos Postulados</h3>
              <p className="text-gray-600 text-sm mb-6">
                Visualiza los perfiles evaluados, revisa las coincidencias de IA y filtra los mejores talentos.
              </p>
            </div>
            <Link
              href={`/reclutador/candidatos?id=${id}`}
              className="w-full py-3 bg-[#0A1A3A] text-white font-semibold rounded-xl hover:bg-[#142850] transition text-center"
            >
              Ver Candidatos →
            </Link>
          </div>

          <div className="bg-white text-[#0A1A3A] p-6 rounded-2xl shadow-xl flex flex-col justify-between border-t-4 border-[#C9A86A]">
            <div>
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-xl font-bold mb-2">Mis Vacantes</h3>
              <p className="text-gray-600 text-sm mb-6">
                Monitorea el estatus de tus ofertas publicadas, edítalas o ciérralas cuando cubras el puesto.
              </p>
            </div>
            <Link
              href={`/reclutador/vacantes?id=${id}`}
              className="w-full py-3 bg-[#0A1A3A] text-white font-semibold rounded-xl hover:bg-[#142850] transition text-center"
            >
              Administrar Vacantes 🗂️
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