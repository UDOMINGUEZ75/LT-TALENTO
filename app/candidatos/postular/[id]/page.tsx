"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import { MapPin, DollarSign, ArrowRight, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

interface Job {
  id: number;
  title: string;
  location: string;
  salary?: string;
  description: string;
}

function PostularContent() {
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
    setErrorMsg("");

    try {
      const candidateId = localStorage.getItem("candidateId");

      if (!candidateId) {
        router.push("/candidate/login");
        return;
      }

      const res = await fetch("/api/candidatos/postulaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateId: Number(candidateId),
          jobId: Number(jobId),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Ocurrió un error al registrar la postulación.");
        setSubmitting(false);
        return;
      }

      setPostulado(true);
    } catch (err) {
      console.error("Error al postular:", err);
      setErrorMsg("Error de red al enviar la postulación.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0A1A3A] text-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32 text-[#C9A86A]">
          <div className="w-10 h-10 border-4 border-[#C9A86A] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-xs font-bold uppercase tracking-widest">Cargando detalles de la vacante...</p>
        </div>
      </main>
    );
  }

  if (errorMsg && !job) {
    return (
      <main className="min-h-screen bg-[#0A1A3A] text-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32 p-6">
          <div className="bg-white text-gray-900 border border-gray-200 p-8 rounded-[32px] shadow-2xl text-center max-w-md w-full">
            <p className="text-red-600 text-xs font-bold mb-6">{errorMsg}</p>
            <Link href="/vacantes" className="inline-block w-full py-3.5 bg-[#0A1A3A] text-[#C9A86A] font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-[#122b5c] transition shadow-lg text-center">
              Ver vacantes disponibles
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0A1A3A] text-white pb-20">
      <Navbar />

      <div className="max-w-4xl mx-auto pt-24 sm:pt-28 px-4 sm:px-6">
        
        {/* Tarjeta Maestra con Cabecera Azul */}
        <div className="bg-white text-gray-900 rounded-[32px] shadow-2xl overflow-hidden border border-[#C9A86A]/40">
          
          {/* Cabecera Azul Marino con el texto dorado arriba como título */}
          <div className="bg-[#0A1A3A] px-6 py-10 sm:px-10 text-center border-b border-[#C9A86A]/30 text-white">
            <h1 className="text-xl sm:text-2xl font-black tracking-wider text-[#C9A86A] uppercase mb-3">
              Oportunidad Profesional • Detalle de Vacante
            </h1>
            <p className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              {job?.title}
            </p>
          </div>

          <div className="p-6 sm:p-10 space-y-8 bg-gray-50/50">
            
            {errorMsg && (
              <div className="p-3.5 bg-red-50 border-2 border-red-300 text-red-700 rounded-2xl text-center text-xs font-bold">
                {errorMsg}
              </div>
            )}

            {/* Etiquetas de Ubicación y Compensación */}
            <div className="flex flex-wrap gap-3 text-xs font-bold justify-center sm:justify-start">
              <span className="bg-white px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 flex items-center gap-2 shadow-sm">
                <MapPin size={15} className="text-[#C9A86A]" />
                <span className="text-[#8c6f33]">Ubicación:</span> {job?.location || "Presencial"}
              </span>
              <span className="bg-[#C9A86A]/10 px-4 py-2.5 rounded-xl border border-[#C9A86A]/30 text-[#0A1A3A] flex items-center gap-2 shadow-sm">
                <DollarSign size={15} className="text-[#C9A86A]" />
                <span className="font-extrabold">Compensación:</span> {job?.salary || "Sueldo competitivo"}
              </span>
            </div>

            {/* Descripción */}
            <div className="space-y-3">
              <h2 className="text-xs font-extrabold text-[#0A1A3A] uppercase tracking-wider">
                Descripción completa y requisitos del puesto
              </h2>
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm">
                <div className="text-gray-700 text-xs sm:text-sm font-light leading-relaxed space-y-2 whitespace-pre-line">
                  {job?.description}
                </div>
              </div>
            </div>

            {/* Sección de Botones */}
            <div className="pt-2">
              {postulado ? (
                <div className="p-6 sm:p-8 bg-emerald-50 border-2 border-emerald-300 rounded-2xl text-center shadow-lg space-y-4">
                  <div>
                    <CheckCircle2 size={36} className="mx-auto text-emerald-600 mb-2" />
                    <h3 className="text-base sm:text-lg font-extrabold text-emerald-900 mb-1">¡Postulación enviada correctamente!</h3>
                    <p className="text-xs sm:text-sm text-emerald-700 font-light">Su perfil ha sido registrado con éxito en este proceso. El equipo de reclutamiento se pondrá en contacto con usted.</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <Link
                      href="/vacantes"
                      className="px-6 py-3.5 bg-[#0A1A3A] text-[#C9A86A] font-extrabold rounded-xl hover:bg-[#122b5c] transition text-xs uppercase tracking-wider text-center shadow-md"
                    >
                      Ver más vacantes
                    </Link>
                    <Link
                      href={`/candidatos/dashboard?id=${localStorage.getItem("candidateId") || ""}`}
                      className="px-6 py-3.5 bg-white border border-gray-300 text-[#0A1A3A] font-extrabold rounded-xl hover:bg-gray-100 transition text-xs uppercase tracking-wider text-center shadow-md"
                    >
                      Ir a Mi Panel
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handlePostularseFinal}
                    disabled={submitting}
                    className="flex-1 py-4 px-8 bg-[#C9A86A] text-[#0A1A3A] font-extrabold rounded-xl hover:bg-[#b89555] active:scale-[0.99] transition-all duration-200 text-xs sm:text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      "Procesando postulación..."
                    ) : (
                      <>
                        Confirmar postulación
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  <Link
                    href="/vacantes"
                    className="px-6 py-4 bg-gray-100 text-gray-700 border border-gray-300 font-bold rounded-xl hover:bg-gray-200 transition text-xs sm:text-sm uppercase tracking-wider text-center shadow-sm flex items-center justify-center"
                  >
                    Volver a vacantes
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

export default function DetalleVacanteCandidato() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A1A3A] text-[#C9A86A] flex items-center justify-center text-sm font-bold">Cargando vacante...</div>}>
      <PostularContent />
    </Suspense>
  );
}