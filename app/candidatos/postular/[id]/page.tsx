"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";

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
      <main className="min-h-screen bg-[#0A1A3A] text-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32 text-[#C9A86A]">
          <div className="w-10 h-10 border-4 border-[#C9A86A] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-medium tracking-wide">Cargando detalles de la vacante...</p>
        </div>
      </main>
    );
  }

  if (errorMsg || !job) {
    return (
      <main className="min-h-screen bg-[#0A1A3A] text-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-24 p-6">
          <div className="bg-white text-gray-900 border border-gray-200 p-8 rounded-2xl shadow-2xl text-center max-w-md w-full">
            <p className="text-red-600 text-lg mb-6 font-medium">{errorMsg}</p>
            <Link href="/vacantes" className="inline-block px-6 py-3 bg-[#0A1A3A] text-[#C9A86A] font-bold rounded-xl hover:bg-[#122b5c] transition shadow-lg">
              Ver vacantes
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0A1A3A] text-white">
      <Navbar />

      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
        
        {/* Enlace de retorno a /vacantes */}
        <Link href="/vacantes" className="inline-flex items-center text-sm font-medium text-[#C9A86A] hover:text-white transition mb-8 group">
          <span className="mr-2 transform group-hover:-translate-x-1 transition">←</span> Volver a vacantes disponibles
        </Link>

        {/* Tarjeta Principal con Fondo Blanco */}
        <div className="bg-white text-gray-900 border border-gray-200 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          
          {/* Encabezado del puesto */}
          <div className="border-b border-gray-200 pb-6 mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A1A3A] tracking-tight mb-4">
              {job.title}
            </h1>

            {/* Etiquetas institucionales unificadas */}
            <div className="flex flex-wrap gap-3 text-sm font-medium">
              <span className="bg-[#0A1A3A]/5 px-4 py-2 rounded-xl border border-[#0A1A3A]/15 text-[#0A1A3A]">
                <span className="text-[#8c6f33] font-bold mr-1">Ubicación:</span> {job.location || "Presencial"}
              </span>
              <span className="bg-[#C9A86A]/15 px-4 py-2 rounded-xl border border-[#C9A86A]/30 text-[#8c6f33]">
                <span className="font-bold mr-1">Compensación:</span> {job.salary || "Sueldo competitivo"}
              </span>
            </div>
          </div>

          {/* Descripción y Requisitos */}
          <div className="space-y-4 mb-10">
            <h2 className="text-xl font-bold text-[#0A1A3A] tracking-wide">
              Descripción completa y requisitos del puesto
            </h2>
            <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-inner">
              <div className="text-gray-800 text-base sm:text-lg font-normal leading-snug space-y-1">
                {job.description.split("\n").map((line, index) => (
                  line.trim() !== "" ? <p key={index}>{line}</p> : null
                ))}
              </div>
            </div>
          </div>

          {/* Sección de Botones */}
          <div className="pt-2">
            {postulado ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center shadow-xl space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-emerald-800 mb-1">Postulación enviada correctamente</h3>
                  <p className="text-sm text-emerald-700">Su perfil ha sido registrado con éxito. Nos pondremos en contacto con usted próximamente.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <Link
                    href="/vacantes"
                    className="px-6 py-3 bg-[#0A1A3A] text-[#C9A86A] font-bold rounded-xl hover:bg-[#122b5c] transition text-sm shadow-lg text-center"
                  >
                    Ver más vacantes
                  </Link>
                  <Link
                    href="/vacantes"
                    className="px-6 py-3 bg-white border border-gray-300 text-[#0A1A3A] font-bold rounded-xl hover:bg-gray-100 transition text-sm shadow-lg text-center"
                  >
                    Volver a vacantes
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handlePostularseFinal}
                  disabled={submitting}
                  className="flex-1 py-4 px-8 bg-[#0A1A3A] text-[#C9A86A] font-bold rounded-xl hover:bg-[#122b5c] active:scale-[0.99] transition-all duration-200 text-base shadow-xl flex items-center justify-center gap-3 cursor-pointer tracking-wide"
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#C9A86A] border-t-transparent rounded-full animate-spin"></div>
                      Procesando postulación...
                    </>
                  ) : (
                    "Confirmar postulación"
                  )}
                </button>

                <Link
                  href="/vacantes"
                  className="px-6 py-4 bg-gray-100 text-[#0A1A3A] border border-gray-300 font-bold rounded-xl hover:bg-gray-200 transition text-base shadow-md text-center flex items-center justify-center"
                >
                  Volver a vacantes
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}