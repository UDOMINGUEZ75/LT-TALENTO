"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function NuevoCandidato() {
  const router = useRouter();

  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    celular: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  
  // Nuevos estados para controlar la visibilidad de las contraseñas
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/candidatos/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.nombre,
          email: form.correo,
          phone: form.celular,
          password: form.password,
        }),
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Error al registrar candidato");
        setIsLoading(false);
        return;
      }

      const id = data.candidate.id;
      router.push(`/candidatos/completar/${id}`);

    } catch (error) {
      console.error(error);
      alert("Error de conexión con el servidor");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1A3A] pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex items-center justify-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-[#C9A86A]/5 rounded-full blur-[90px] md:blur-[120px] pointer-events-none z-0" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white rounded-[32px] shadow-2xl relative z-10 overflow-hidden border border-[#C9A86A]/40"
      >
        <div className="bg-[#0A1A3A] px-6 py-10 sm:px-10 text-center border-b border-[#C9A86A]/30">
          <span className="inline-block px-4 py-1.5 mb-4 text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-[#0A1A3A] bg-[#C9A86A] rounded-full shadow-lg">
            Bolsa de Trabajo 100% Gratuita
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-2">
            Únete a nuestro talento
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm font-light">
            Crea tu cuenta profesional y conecta al instante con las mejores oportunidades laborales.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
          
          <div className="space-y-2">
            <label htmlFor="nombre" className="text-[11px] sm:text-xs font-bold text-[#0A1A3A] uppercase tracking-wider">
              Nombre Completo
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                id="nombre"
                name="nombre"
                type="text"
                required
                placeholder="Ej. Juan Pérez"
                value={form.nombre}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-xs sm:text-sm focus:outline-none focus:border-[#C9A86A] focus:ring-1 focus:ring-[#C9A86A] transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="correo" className="text-[11px] sm:text-xs font-bold text-[#0A1A3A] uppercase tracking-wider">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  id="correo"
                  name="correo"
                  type="email"
                  required
                  placeholder="tu@correo.com"
                  value={form.correo}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-xs sm:text-sm focus:outline-none focus:border-[#C9A86A] focus:ring-1 focus:ring-[#C9A86A] transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="celular" className="text-[11px] sm:text-xs font-bold text-[#0A1A3A] uppercase tracking-wider">
                Celular / WhatsApp
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  id="celular"
                  name="celular"
                  type="tel"
                  required
                  placeholder="Ej. 614 123 4567"
                  value={form.celular}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-xs sm:text-sm focus:outline-none focus:border-[#C9A86A] focus:ring-1 focus:ring-[#C9A86A] transition-all"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="password" className="text-[11px] sm:text-xs font-bold text-[#0A1A3A] uppercase tracking-wider">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  id="password"
                  name="password"
                  // Cambiamos el tipo dinámicamente
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Crea una contraseña"
                  value={form.password}
                  onChange={handleChange}
                  // Aumentamos el padding derecho (pr-10) para que el texto no choque con el icono
                  className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-xs sm:text-sm focus:outline-none focus:border-[#C9A86A] focus:ring-1 focus:ring-[#C9A86A] transition-all"
                />
                {/* Botón para alternar visibilidad */}
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

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-[11px] sm:text-xs font-bold text-[#0A1A3A] uppercase tracking-wider">
                Confirmar Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  // Cambiamos el tipo dinámicamente
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="Repite tu contraseña"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  // Aumentamos el padding derecho (pr-10) para que el texto no choque con el icono
                  className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-xs sm:text-sm focus:outline-none focus:border-[#C9A86A] focus:ring-1 focus:ring-[#C9A86A] transition-all"
                />
                {/* Botón para alternar visibilidad */}
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#C9A86A] transition-colors"
                  aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 bg-[#C9A86A] hover:bg-[#b89555] text-[#0A1A3A] font-black rounded-xl shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2 group text-sm sm:text-base disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                "Creando cuenta..."
              ) : (
                <>
                  Crear mi Perfil Profesional
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>

          <div className="text-center mt-6 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              ¿Ya tienes una cuenta con nosotros?{" "}
              <Link href="/candidate/login" className="text-[#C9A86A] font-bold hover:underline">
                Inicia Sesión aquí
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}