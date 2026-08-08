"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import { Lock, Mail, ArrowRight, AlertCircle } from "lucide-react";

export default function AccesoVacanteCandidato() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/candidatos/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        sessionStorage.setItem("candidateLoggedIn", "true");
        localStorage.setItem("candidateId", data.candidateId || "1");

        const pendingJobRoute = localStorage.getItem("redirectAfterLogin");

        if (pendingJobRoute) {
          localStorage.removeItem("redirectAfterLogin");
          router.push(pendingJobRoute);
        } else {
          router.push("/");
        }
      } else {
        setErrorMsg(data.error || "Correo o contraseña incorrectos.");
      }
    } catch (err) {
      console.error("Error en acceso:", err);
      setErrorMsg("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0A1A3A] text-white flex flex-col justify-between pb-20">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-24 sm:py-28">
        <div className="bg-white text-gray-900 rounded-[32px] shadow-2xl overflow-hidden border-2 border-[#C9A86A] w-full max-w-md">
          
          {/* Cabecera Azul Marino Corporativa */}
          <div className="bg-[#0A1A3A] px-6 py-8 text-center border-b border-[#C9A86A]/30 text-white">
            <span className="inline-block px-3.5 py-1 mb-2 text-[10px] font-bold uppercase tracking-widest text-[#0A1A3A] bg-[#C9A86A] rounded-full shadow-md">
              Área de Candidatos
            </span>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Acceso para Postulación
            </h1>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <p className="text-xs sm:text-sm text-gray-600 text-center font-light leading-relaxed">
              Ingresa tus credenciales para ver los detalles completos de la vacante y postularte de forma segura.
            </p>

            {errorMsg && (
              <div className="p-3 bg-red-50 border-2 border-red-300 text-red-700 text-xs font-bold rounded-2xl text-center flex items-center justify-center gap-2">
                <AlertCircle size={15} /> {errorMsg}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[10px] font-extrabold text-[#0A1A3A] mb-1.5 uppercase tracking-wider">
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:border-[#C9A86A] transition"
                    placeholder="tu@correo.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-[#0A1A3A] mb-1.5 uppercase tracking-wider">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:border-[#C9A86A] transition"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-[#C9A86A] hover:bg-[#b89555] text-[#0A1A3A] font-extrabold rounded-xl shadow-md transition-all text-xs sm:text-sm text-center flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer disabled:opacity-50 mt-2"
              >
                {loading ? "Validando credenciales..." : <>Entrar a la Vacante <ArrowRight size={16} /></>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}