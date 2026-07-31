"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
      // Petición a tu API de autenticación de candidatos
      const res = await fetch("/api/candidatos/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        // 1. Guardamos la sesión activa del candidato
        sessionStorage.setItem("candidateLoggedIn", "true");
        localStorage.setItem("candidateId", data.candidateId || "1");

        // 2. Buscamos la vacante a la que intentaba entrar originalmente
        const pendingJobRoute = localStorage.getItem("redirectAfterLogin");

        if (pendingJobRoute) {
          localStorage.removeItem("redirectAfterLogin");
          router.push(pendingJobRoute); // Lo manda directo a la vacante específica
        } else {
          router.push("/"); // Por defecto si no hay ruta guardada
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
    <div className="min-h-screen bg-[#0A1A3A] flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-[#0A1A3A] text-center mb-2">
          Acceso para Postulación
        </h2>
        <p className="text-xs text-gray-500 text-center mb-6">
          Ingresa tus credenciales para ver los detalles completos de la vacante y postularte.
        </p>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 text-sm rounded-lg text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-[#C9A86A] focus:outline-none"
              placeholder="tu@correo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-[#C9A86A] focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#C9A86A] text-[#0A1A3A] font-bold rounded-lg hover:bg-[#d8b97a] transition shadow-md mt-2"
          >
            {loading ? "Validando..." : "Entrar a la Vacante"}
          </button>
        </form>
      </div>
    </div>
  );
}