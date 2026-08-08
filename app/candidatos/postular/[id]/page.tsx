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
    <main className="min-h-screen bg-[#0A1A3A] text-white pb-32">
      <Navbar />

      <div className="max-w-3xl mx-auto pt-24 sm:pt-28 px-4 sm:px-6">
        
        {/* BOTONES FLOTANTES SUPERIORES (Siempre visibles al lado superior de la tarjeta) */}
        <div className="mb-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#11254d] p-4 rounded-2xl border border-[#C9A86A]/40 shadow-xl">
          <div className="text-center sm:text-left">
            <span className="text-[10px] font-bold text-[#C9A86A] uppercase tracking-wider block">Acción Rápida</span>
            <span className="text-xs font-medium text-gray-200">Postúlate o regresa al listado general</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {postulado ? (
              <span className="px-4 py-2 bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md">
                <CheckCircle2 size={15} /> ¡Postulado con éxito!
              </span>
            ) : (
              <button
                onClick={handlePostularseFinal}
                disabled={submitting}
                className="flex-1 sm:flex-initial py-2.5 px-5 bg-[#C9A86A] text-[#0A1A3A] font-extrabold rounded-xl hover:bg-[#b89555] transition text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {submitting ? "Procesando..." : <>Confirmar Postulación <ArrowRight size={14} /></>}
              </button>
            )}

            <Link
              href="/vacantes"
              className="py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition text-xs uppercase tracking-wider text-center border border-white/20"
            >
              Volver
            </Link>
          </div>
        </div>

        {/* Tarjeta con la Información */}
        <div className="bg-white text-gray-900 rounded-[32px] shadow-2xl border border-[#C9A86A]/40 overflow-hidden">
          
          <div className="bg-[#0A1A3A] px-6 py-8 text-center border-b border-[#C9A86A]/30 text-white">
            <h1 className="text-[10px] sm:text-xs font-black tracking-widest text-[#C9A86A] uppercase mb-2">
              Oportunidad Profesional • Detalle de Vacante
            </h1>
            <p className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
              {job?.title}
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-6 bg-gray-50/50">
            
            {errorMsg && (
              <div className="p-3 bg-red-50 border-2 border-red-300 text-red-700 rounded-2xl text-center text-xs font-bold">
                {errorMsg}
              </div>
            )}

            <div className="flex flex-wrap gap-3 text-xs font-bold justify-center">
              <span className="bg-white px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 flex items-center gap-2 shadow-xs">
                <MapPin size={15} className="text-[#C9A86A]" />
                <span className="text-[#8c6f33]">Ubicación:</span> {job?.location || "Presencial"}
              </span>
              <span className="bg-[#C9A86A]/10 px-4 py-2.5 rounded-xl border border-[#C9A86A]/30 text-[#0A1A3A] flex items-center gap-2 shadow-xs">
                <DollarSign size={15} className="text-[#C9A86A]" />
                <span className="font-extrabold">Compensación:</span> {job?.salary || "Sueldo competitivo"}
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="text-xs font-extrabold text-[#0A1A3A] uppercase tracking-wider text-center sm:text-left">
                Descripción completa y requisitos del puesto
              </h2>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
                <div className="text-gray-700 text-xs sm:text-sm font-light leading-relaxed space-y-2 whitespace-pre-line">
                  {job?.description}
                </div>
              </div>
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