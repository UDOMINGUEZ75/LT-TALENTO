/* STREAMING_CHUNK:Upgrading Hero component for greater scale and presence... */
"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function Hero() {
  const [videoError, setVideoError] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 14,
      },
    },
  };

  return (
    <section 
      id="hero" 
      className="relative z-10 w-full min-h-[90vh] flex items-center justify-center pt-28 sm:pt-36 pb-20 sm:pb-28 bg-[#0A1A3A] text-white px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* FONDO CINEMATOGRÁFICO DE VIDEO */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {isMounted && !videoError && (
          <video
            src="/videos/inicio.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onError={() => setVideoError(true)}
            className="absolute inset-0 w-full h-full object-cover opacity-75 scale-105"
          />
        )}
        
        {/* Capa de degradado corporativo más profunda */}
        <div 
          className="absolute inset-0 w-full h-full z-10"
          style={{
            background: `
              radial-gradient(circle at center, rgba(10, 26, 58, 0.5) 0%, rgba(10, 26, 58, 0.85) 60%, rgba(10, 26, 58, 0.98) 100%)
            `
          }}
        />
        <div className="absolute inset-0 w-full h-full bg-[#0A1A3A]/30 z-20" />
      </div>

      <motion.div 
        className="max-w-5xl mx-auto text-center relative z-30 w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-30px" }}
      >
        {/* Tagline de Marca Ampliado */}
        <motion.div variants={itemVariants}>
          <span className="inline-block px-4 py-1.5 mb-4 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#0A1A3A] bg-[#C9A86A] rounded-full shadow-lg">
            Atracción y Gestión Estratégica de Talento
          </span>
        </motion.div>

        {/* Título Principal Impactante */}
        <motion.h1 
          className="text-3xl sm:text-6xl md:text-7xl font-black tracking-tight text-white drop-shadow-lg leading-tight mb-4"
          variants={itemVariants}
        >
          LT <span className="text-[#C9A86A]">Talent Solutions</span>
        </motion.h1>

        {/* Subtítulo / Manifiesto de Gran Escala */}
        <motion.p 
          className="text-base sm:text-2xl text-gray-100 max-w-2xl mx-auto font-medium drop-shadow mb-3"
          variants={itemVariants}
        >
          Conectamos talento. <span className="text-[#C9A86A] font-bold">Transformamos futuros.</span>
        </motion.p>
        
        <motion.p 
          className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto font-light px-4 mb-10 drop-shadow"
          variants={itemVariants}
        >
          Relaciones de valor que impulsan el crecimiento de profesionales extraordinarios y organizaciones líderes.
        </motion.p>

        {/* TARJETAS DE ACCESO AMPLIADAS Y LLAMATIVAS */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto text-left"
          variants={itemVariants}
        >
          {/* Tarjeta Profesionales */}
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
            className="group relative rounded-3xl bg-white p-6 sm:p-8 text-center sm:text-left flex flex-col justify-between items-center sm:items-start text-[#0A1A3A] shadow-2xl border-2 border-[#C9A86A]"
          >
            <div className="w-full space-y-2 mb-6">
              <span className="text-[10px] sm:text-xs font-black text-[#8c6f33] uppercase tracking-widest block">
                PARA PROFESIONALES
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#0A1A3A] tracking-tight">
                Impulsa tu Desarrollo
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed">
                Descubre oportunidades estratégicas y conecta con las empresas más importantes.
              </p>
            </div>

            <div className="w-full flex flex-col gap-2.5 pt-4 border-t border-gray-100">
              <Link
                href="/candidatos/nuevo"
                className="w-full py-3 px-4 bg-[#C9A86A] hover:bg-[#b89555] text-[#0A1A3A] font-extrabold rounded-xl shadow-md transition-all text-xs sm:text-sm text-center"
              >
                Registrar Perfil Profesional
              </Link>

              <Link
                href="/candidate/login"
                className="w-full py-3 px-4 bg-gray-50 hover:bg-gray-100 text-[#0A1A3A] font-semibold rounded-xl transition-all text-xs sm:text-sm border border-gray-200 text-center"
              >
                Acceso a Mi Cuenta
              </Link>
            </div>
          </motion.div>

          {/* Tarjeta Organizaciones */}
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
            className="group relative rounded-3xl bg-white p-6 sm:p-8 text-center sm:text-left flex flex-col justify-between items-center sm:items-start text-[#0A1A3A] shadow-2xl border-2 border-[#C9A86A]"
          >
            <div className="w-full space-y-2 mb-6">
              <span className="text-[10px] sm:text-xs font-black text-[#8c6f33] uppercase tracking-widest block">
                PARA ORGANIZACIONES
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#0A1A3A] tracking-tight">
                Conecta con Talento Ideal
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed">
                Encuentra al equipo clave para acelerar los resultados y la visión de tu empresa.
              </p>
            </div>

            <div className="w-full flex flex-col gap-2.5 pt-4 border-t border-gray-100">
              <Link
                href="/reclutador/registro"
                className="w-full py-3 px-4 bg-[#C9A86A] hover:bg-[#b89555] text-[#0A1A3A] font-extrabold rounded-xl shadow-md transition-all text-xs sm:text-sm text-center"
              >
                Registrar Empresa / Cuenta
              </Link>

              <Link
                href="/reclutador/login"
                className="w-full py-3 px-4 bg-gray-50 hover:bg-gray-100 text-[#0A1A3A] font-semibold rounded-xl transition-all text-xs sm:text-sm border border-gray-200 text-center"
              >
                Portal Corporativo
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {videoError && (
          <div className="mt-6 inline-flex items-center gap-2 bg-red-500/20 border border-red-500/40 px-4 py-2 rounded-xl text-xs text-red-200">
            <AlertCircle size={14} /> El video de inicio no pudo cargarse.
          </div>
        )}
      </motion.div>
    </section>
  );
}