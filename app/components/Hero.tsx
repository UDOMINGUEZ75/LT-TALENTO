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
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section id="hero" className="relative w-full pt-20 sm:pt-32 pb-16 sm:pb-24 bg-[#0A1A3A] text-white px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* FONDO CINEMATOGRÁFICO DE VIDEO Y EFECTO DE BALANCE */}
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
            className="absolute inset-0 w-full h-full object-cover opacity-85"
          />
        )}
        
        {/* Capa de contraste equilibrado */}
        <div 
          className="absolute inset-0 w-full h-full z-10"
          style={{
            background: `
              radial-gradient(circle at center, rgba(10, 26, 58, 0.35) 0%, rgba(10, 26, 58, 0.75) 65%, rgba(10, 26, 58, 0.95) 100%)
            `
          }}
        />

        <div className="absolute inset-0 w-full h-full bg-[#0A1A3A]/20 z-20" />
      </div>

      <motion.div 
        className="max-w-5xl mx-auto text-center relative z-30 pt-4 sm:pt-0"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-30px" }}
      >
        {/* Tagline de Marca Compacto */}
        <motion.div variants={itemVariants}>
          <span className="inline-block px-3 py-1 mb-3 text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-[#0A1A3A] bg-[#C9A86A] rounded-full shadow-md">
            Atracción y Gestión Estratégica
          </span>
        </motion.div>

        {/* Título Principal Proporcionado */}
        <motion.h1 
          className="text-2xl sm:text-5xl md:text-6xl font-black tracking-tight text-white drop-shadow-md leading-tight"
          variants={itemVariants}
        >
          LT <span className="text-[#C9A86A]">Talent Solutions</span>
        </motion.h1>

        {/* Subtítulo / Manifiesto Estilizado */}
        <motion.p 
          className="mt-3 text-xs sm:text-base md:text-lg text-gray-100 max-w-2xl mx-auto leading-relaxed font-light drop-shadow"
          variants={itemVariants}
        >
          Conectamos talento. <span className="text-[#C9A86A] font-semibold">Transformamos futuros.</span>
        </motion.p>
        
        <motion.p 
          className="mt-1.5 text-[11px] sm:text-sm text-gray-300 max-w-lg mx-auto font-light px-2"
          variants={itemVariants}
        >
          Relaciones de valor que impulsan a profesionales y organizaciones extraordinarias.
        </motion.p>

        {/* TARJETAS DE ACCESO COMPACTAS ESTILO APP */}
        <motion.div 
          className="mt-6 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 max-w-3xl mx-auto text-left"
          variants={itemVariants}
        >
          {/* Tarjeta Profesionales */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
            className="group relative rounded-2xl sm:rounded-[32px] bg-white p-5 sm:p-8 text-center sm:text-left flex flex-col justify-between items-center sm:items-start text-[#0A1A3A] shadow-lg border-2 border-[#C9A86A]/70"
          >
            <div className="w-full space-y-1.5 mb-4">
              <span className="text-[10px] font-bold text-[#8c6f33] uppercase tracking-widest block">
                PARA PROFESIONALES
              </span>
              <h2 className="text-lg sm:text-2xl font-extrabold text-[#0A1A3A] tracking-tight">
                Impulsa tu Desarrollo
              </h2>
              <p className="text-gray-600 text-xs font-light leading-relaxed">
                Descubre oportunidades estratégicas y conecta con grandes empresas.
              </p>
            </div>

            <div className="w-full flex flex-col gap-2 pt-3 border-t border-gray-100">
              <Link
                href="/candidatos/nuevo"
                className="w-full py-2.5 px-4 bg-[#C9A86A] hover:bg-[#b89555] text-[#0A1A3A] font-bold rounded-xl shadow-sm transition-all text-xs text-center"
              >
                Registrar Perfil Profesional
              </Link>

              <Link
                href="/candidate/login"
                className="w-full py-2.5 px-4 bg-gray-50 hover:bg-gray-100 text-[#0A1A3A] font-medium rounded-xl transition-all text-xs border border-gray-200 text-center"
              >
                Acceso a Mi Cuenta
              </Link>
            </div>
          </motion.div>

          {/* Tarjeta Organizaciones */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
            className="group relative rounded-2xl sm:rounded-[32px] bg-white p-5 sm:p-8 text-center sm:text-left flex flex-col justify-between items-center sm:items-start text-[#0A1A3A] shadow-lg border-2 border-[#C9A86A]/70"
          >
            <div className="w-full space-y-1.5 mb-4">
              <span className="text-[10px] font-bold text-[#8c6f33] uppercase tracking-widest block">
                PARA ORGANIZACIONES
              </span>
              <h2 className="text-lg sm:text-2xl font-extrabold text-[#0A1A3A] tracking-tight">
                Conecta con Talento Ideal
              </h2>
              <p className="text-gray-600 text-xs font-light leading-relaxed">
                Encuentra al equipo clave para acelerar los resultados de tu empresa.
              </p>
            </div>

            <div className="w-full flex flex-col gap-2 pt-3 border-t border-gray-100">
              <Link
                href="/reclutador/registro"
                className="w-full py-2.5 px-4 bg-[#C9A86A] hover:bg-[#b89555] text-[#0A1A3A] font-bold rounded-xl shadow-sm transition-all text-xs text-center"
              >
                Registrar Empresa / Cuenta
              </Link>

              <Link
                href="/reclutador/login"
                className="w-full py-2.5 px-4 bg-gray-50 hover:bg-gray-100 text-[#0A1A3A] font-medium rounded-xl transition-all text-xs border border-gray-200 text-center"
              >
                Portal Corporativo
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {videoError && (
          <div className="mt-6 inline-flex items-center gap-2 bg-red-500/20 border border-red-500/40 px-3 py-1.5 rounded-lg text-xs text-red-200">
            <AlertCircle size={12} /> El video de inicio no pudo cargarse.
          </div>
        )}
      </motion.div>
    </section>
  );
}