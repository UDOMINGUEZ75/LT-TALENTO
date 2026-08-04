"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AccesoCandidato() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/candidate/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Credenciales incorrectas");
        return;
      }

      // Guardar sesión opcional en storage
      if (data.id) {
        localStorage.setItem("candidateId", String(data.id));
        sessionStorage.setItem("candidateLoggedIn", "true");
      }

      // Redirigir al nuevo Dashboard del Candidato con su ID
      router.push(`/candidatos/dashboard?id=${data.id}`);
    } catch (err) {
      console.error("Error en inicio de sesión:", err);
      setErrorMsg("Ocurrió un error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#0A1A3A] text-white flex items-center justify-center pt-24 pb-16 px-6">
      <div className="bg-white text-gray-900 p-8 sm:p-10 rounded-3xl shadow-2xl w-full max-w-md border-t-8 border-[#C9A86A]">

        {/* Encabezado con Voz de Marca */}
        <div className="text-center mb-8 space-y-2">
          <span className="inline-block px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#0A1A3A] bg-[#C9A86A] rounded-full shadow-sm">
            Área de Candidatos
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0A1A3A]">
            Acceso a Mi Cuenta
          </h1>
          <p className="text-gray-600 text-xs font-light">
            Ingresa tus credenciales para administrar tu perfil y postulaciones.
          </p>
        </div>

        {/* Mensaje de Error */}
        {errorMsg && (
          <div className="mb-6 p-3.5 bg-red-50 border-2 border-red-300 text-red-700 rounded-2xl text-center text-xs font-bold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-[#0A1A3A] mb-1.5 uppercase tracking-wider">
              Correo Electrónico
            </label>
            <input
              type="email"
              required
              placeholder="tu@correo.com"
              className="border-2 border-gray-200 p-3.5 rounded-xl w-full bg-gray-50 text-gray-900 text-sm font-medium focus:border-[#C9A86A] focus:bg-white focus:outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0A1A3A] mb-1.5 uppercase tracking-wider">
              Contraseña
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="border-2 border-gray-200 p-3.5 rounded-xl w-full bg-gray-50 text-gray-900 text-sm font-medium focus:border-[#C9A86A] focus:bg-white focus:outline-none transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#C9A86A] text-[#0A1A3A] font-extrabold text-sm rounded-xl hover:bg-[#d8b97a] transition shadow-lg border border-[#C9A86A]/40 cursor-pointer disabled:opacity-50 mt-2"
          >
            {loading ? "Iniciando sesión..." : "Entrar a Mi Panel"}
          </button>
        </form>

      </div>
    </section>
  );
}