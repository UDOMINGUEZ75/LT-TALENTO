"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

interface Job {
  id: number;
  title: string;
  location: string;
  salary?: string;
  description: string;
}

export default function DetalleVacanteCandidato() {
  const params = useParams();
  const jobId = params?.id as string;
  const router = useRouter();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [postulado, setPostulado] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("candidateLoggedIn");
    
    if (!isLoggedIn) {
      if (jobId) {
        localStorage.setItem("redirectAfterLogin", `/candidatos/postular/${jobId}`);
      }
      router.push("/candidatos/acceso-vacante");
      return;
    }

    if (!jobId) return;

    async function fetchJobDetail() {
      try {
        const res = await fetch(`/api/vacantes`, { cache: "no-store" });
        const data = await res.json();
        
        if (res.ok && data.vacancies) {
          const found = data.vacancies.find((v: Job) => v.id.toString() === jobId);
          if (found) {
            setJob(found);
          } else {
            setErrorMsg("La vacante solicitada no existe o fue eliminada.");
          }
        } else {
          setErrorMsg("No se pudo conectar con la base de datos.");
        }
      } catch (err) {
        console.error("Error:", err);
        setErrorMsg("Error de conexión al cargar la vacante.");
      } finally {
        setLoading(false);
      }
    }

    fetchJobDetail();
  }, [jobId, router]);

  const handlePostularseFinal = async () => {
    setSubmitting(true);
    setTimeout(() => {
      setPostulado(true);
      setSubmitting(false);
    }, 800);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A1A3A] flex flex-col items-center justify-center text-[#C9A86A]">
        <div className="w-10 h-10 border-4 border-[#C9A86A] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-medium tracking-wide">Cargando detalles de la vacante...</p>
      </div>
    );
  }

  if (errorMsg || !job) {
    return (
      <div className="min-h-screen bg-[#0A1A3A] text-white flex flex-col items-center justify-center p-6">
        <div className="bg-[#0f234d] border border-red-500/30 p-8 rounded-2xl shadow-2xl text-center max-w-md w-full">
          <p className="text-red-400 text-lg mb-6 font-medium">{errorMsg}</p>
          <Link href="/" className="inline-block px-6 py-3 bg-[#C9A86A] text-[#0A1A3A] font-bold rounded-xl hover:bg-[#d8b97a] transition shadow-lg">
            Volver al Inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0A1A3A] text-white py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Enlace de retorno corporativo */}
        <Link href="/" className="inline-flex items-center text-sm font-medium text-[#C9A86A] hover:text-white transition mb-8 group">
          <span className="mr-2 transform group-hover:-translate-x-1 transition">←</span> Volver a vacantes disponibles
        </Link>

        {/* Tarjeta Principal */}
        <div className="bg-[#0f234d] border border-[#C9A86A]/30 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          
          {/* Encabezado del puesto */}
          <div className="border-b border-gray-700/60 pb-6 mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#C9A86A] tracking-tight mb-4">
              {job.title}
            </h1>

            {/* Etiquetas con texto blanco nítido y alto contraste */}
            <div className="flex flex-wrap gap-3 text-sm font-medium">
              <div className="bg-[#162e5d] px-4 py-2 rounded-xl border border-[#C9A86A]/30 text-white">
                <span className="text-[#C9A86A] font-semibold mr-1">Ubicación:</span> {job.location || "Presencial"}
              </div>
              <div className="bg-[#162e5d] px-4 py-2 rounded-xl border border-[#C9A86A]/30 text-white">
                <span className="text-[#C9A86A] font-semibold mr-1">Compensación:</span> {job.salary || "Sueldo competitivo"}
              </div>
            </div>
          </div>

          {/* Descripción y Requisitos */}
          <div className="space-y-4 mb-10">
            <h2 className="text-xl font-bold text-[#C9A86A] tracking-wide">
              Descripción completa y requisitos del puesto
            </h2>
            <div className="bg-[#08142c] p-6 sm:p-8 rounded-2xl border border-gray-700/60 shadow-inner">
              <p className="text-white leading-relaxed whitespace-pre-line text-base font-normal">
                {job.description}
              </p>
            </div>
          </div>

          {/* Botón de Postulación o Estado de Éxito con Botones de Navegación */}
          <div className="pt-2">
            {postulado ? (
              <div className="p-6 bg-emerald-950/80 border border-emerald-500/50 rounded-2xl text-center shadow-xl space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-emerald-200 mb-1">Postulación enviada correctamente</h3>
                  <p className="text-sm text-emerald-100">Su perfil ha sido registrado con éxito. Nos pondremos en contacto con usted próximamente.</p>
                </div>

                {/* Botones de navegación solicitados */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <Link
                    href="/"
                    className="px-6 py-3 bg-[#C9A86A] text-[#0A1A3A] font-bold rounded-xl hover:bg-[#d8b97a] transition text-sm shadow-lg text-center"
                  >
                    Ver más vacantes
                  </Link>
                  <Link
                    href="/"
                    className="px-6 py-3 bg-[#162e5d] border border-[#C9A86A]/40 text-white font-bold rounded-xl hover:bg-[#1d3872] transition text-sm shadow-lg text-center"
                  >
                    Ir al inicio
                  </Link>
                </div>
              </div>
            ) : (
              <button
                onClick={handlePostularseFinal}
                disabled={submitting}
                className="w-full py-4 px-8 bg-[#C9A86A] text-[#0A1A3A] font-bold rounded-xl hover:bg-[#d8b97a] active:scale-[0.99] transition-all duration-200 text-base shadow-xl flex items-center justify-center gap-3 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-[#0A1A3A] border-t-transparent rounded-full animate-spin"></div>
                    Procesando postulación...
                  </>
                ) : (
                  "Confirmar postulación"
                )}
              </button>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}