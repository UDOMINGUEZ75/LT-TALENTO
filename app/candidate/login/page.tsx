"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function AccesoCandidato() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
        setLoading(false);
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
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1A3A] pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex items-center justify-center">
      {/* Fondo decorativo luminoso */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-[#C9A86A]/5 rounded-full blur-[90px] md:blur-[120px] pointer-events-none z-0" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-[32px] shadow-2xl relative z-10 overflow-hidden border border-[#C9A86A]/40"
      >
        {/* Cabecera idéntica a la de registro */}
        <div className="bg-[#0A1A3A] px-6 py-10 sm:px-10 text-center border-b border-[#C9A86A]/30">
          <span className="inline-block px-4 py-1.5 mb-4 text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-[#0A1A3A] bg-[#C9A86A] rounded-full shadow-lg">
            Área de Candidatos
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
            Acceso a Mi Cuenta
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm font-light">
            Ingresa tus credenciales para administrar tu perfil y postulaciones.
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleLogin} className="p-6 sm:p-10 space-y-6">
          
          {/* Mensaje de Error */}
          {errorMsg && (
            <div className="p-3.5 bg-red-50 border-2 border-red-300 text-red-700 rounded-2xl text-center text-xs font-bold">
              {errorMsg}
            </div>
          )}

          {/* Correo Electrónico */}
          <div className="space-y-2">
            <label className="text-[11px] sm:text-xs font-bold text-[#0A1A3A] uppercase tracking-wider">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="email"
                required
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#C9A86A] focus:ring-1 focus:ring-[#C9A86A] transition-all"
              />
            </div>
          </div>

          {/* Contraseña con Botón de Ojo */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[11px] sm:text-xs font-bold text-[#0A1A3A] uppercase tracking-wider">
                Contraseña
              </label>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#C9A86A] focus:ring-1 focus:ring-[#C9A86A] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#C9A86A] transition-colors"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Botón de Enviar */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#C9A86A] hover:bg-[#b89555] text-[#0A1A3A] font-extrabold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                "Iniciando sesión..."
              ) : (
                <>
                  Entrar a Mi Panel
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>

          {/* Enlace a Registro */}
          <div className="text-center mt-6 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              ¿Aún no tienes cuenta?{" "}
              <Link href="/candidatos/nuevo" className="text-[#C9A86A] font-bold hover:underline">
                Regístrate gratis
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}