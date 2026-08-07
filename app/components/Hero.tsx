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
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
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
    <section 
      id="hero" 
      className="relative z-10 w-full pt-16 sm:pt-24 pb-12 sm:pb-20 bg-[#0A1A3A] text-white px-3 sm:px-6 lg:px-8 overflow-hidden"
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
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
        )}
        
        {/* Capa de degradado corporativo */}
        <div 
          className="absolute inset-0 w-full h-full z-10"
          style={{
            background: `
              radial-gradient(circle at center, rgba(10, 26, 58, 0.4) 0%, rgba(10, 26, 58, 0.8) 65%, rgba(10, 26, 58, 0.98) 100%)
            `
          }}
        />
        <div className="absolute inset-0 w-full h-full bg-[#0A1A3A]/20 z-20" />
      </div>

      <motion.div 
        className="max-w-4xl mx-auto text-center relative z-30"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-30px" }}
      >
        {/* Tagline de Marca */}
        <motion.div variants={itemVariants}>
          <span className="inline-block px-3 py-1 mb-2 text-[9px] sm:text-xs font-black uppercase tracking-widest text-[#0A1A3A] bg-[#C9A86A] rounded-full shadow-md">
            Atracción y Gestión Estratégica
          </span>
        </motion.div>

        {/* Título Principal */}
        <motion.h1 
          className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-md leading-tight"
          variants={itemVariants}
        >
          LT <span className="text-[#C9A86A]">Talent Solutions</span>
        </motion.h1>

        {/* Subtítulo / Manifiesto */}
        <motion.p 
          className="mt-2 text-xs sm:text-base text-gray-100 max-w-xl mx-auto font-light drop-shadow"
          variants={itemVariants}
        >
          Conectamos talento. <span className="text-[#C9A86A] font-semibold">Transformamos futuros.</span>
        </motion.p>
        
        <motion.p 
          className="mt-1 text-[10px] sm:text-xs text-gray-300 max-w-md mx-auto font-light px-2"
          variants={itemVariants}
        >
          Relaciones de valor que impulsan a profesionales y organizaciones extraordinarias.
        </motion.p>

        {/* TARJETAS DE ACCESO COMPACTAS */}
        <motion.div 
          className="mt-5 sm:mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 max-w-2xl mx-auto text-left"
          variants={itemVariants}
        >
          {/* Tarjeta Profesionales */}
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
            className="group relative rounded-2xl bg-white p-4 sm:p-6 text-center sm:text-left flex flex-col justify-between items-center sm:items-start text-[#0A1A3A] shadow-lg border border-[#C9A86A]/60"
          >
            <div className="w-full space-y-1 mb-3">
              <span className="text-[9px] font-bold text-[#8c6f33] uppercase tracking-widest block">
                PARA PROFESIONALES
              </span>
              <h2 className="text-base sm:text-xl font-extrabold text-[#0A1A3A] tracking-tight">
                Impulsa tu Desarrollo
              </h2>
              <p className="text-gray-600 text-[11px] font-light leading-snug">
                Descubre oportunidades estratégicas y conecta con grandes empresas.
              </p>
            </div>

            <div className="w-full flex flex-col gap-1.5 pt-2 border-t border-gray-100">
              <Link
                href="/candidatos/nuevo"
                className="w-full py-2 px-3 bg-[#C9A86A] hover:bg-[#b89555] text-[#0A1A3A] font-bold rounded-xl shadow-sm transition-all text-xs text-center"
              >
                Registrar Perfil Profesional
              </Link>

              <Link
                href="/candidate/login"
                className="w-full py-2 px-3 bg-gray-50 hover:bg-gray-100 text-[#0A1A3A] font-medium rounded-xl transition-all text-xs border border-gray-200 text-center"
              >
                Acceso a Mi Cuenta
              </Link>
            </div>
          </motion.div>

          {/* Tarjeta Organizaciones */}
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
            className="group relative rounded-2xl bg-white p-4 sm:p-6 text-center sm:text-left flex flex-col justify-between items-center sm:items-start text-[#0A1A3A] shadow-lg border border-[#C9A86A]/60"
          >
            <div className="w-full space-y-1 mb-3">
              <span className="text-[9px] font-bold text-[#8c6f33] uppercase tracking-widest block">
                PARA ORGANIZACIONES
              </span>
              <h2 className="text-base sm:text-xl font-extrabold text-[#0A1A3A] tracking-tight">
                Conecta con Talento Ideal
              </h2>
              <p className="text-gray-600 text-[11px] font-light leading-snug">
                Encuentra al equipo clave para acelerar los resultados de tu empresa.
              </p>
            </div>

            <div className="w-full flex flex-col gap-1.5 pt-2 border-t border-gray-100">
              <Link
                href="/reclutador/registro"
                className="w-full py-2 px-3 bg-[#C9A86A] hover:bg-[#b89555] text-[#0A1A3A] font-bold rounded-xl shadow-sm transition-all text-xs text-center"
              >
                Registrar Empresa / Cuenta
              </Link>

              <Link
                href="/reclutador/login"
                className="w-full py-2 px-3 bg-gray-50 hover:bg-gray-100 text-[#0A1A3A] font-medium rounded-xl transition-all text-xs border border-gray-200 text-center"
              >
                Portal Corporativo
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {videoError && (
          <div className="mt-4 inline-flex items-center gap-2 bg-red-500/20 border border-red-500/40 px-3 py-1 rounded-lg text-[10px] text-red-200">
            <AlertCircle size={12} /> El video de inicio no pudo cargarse.
          </div>
        )}
      </motion.div>
    </section>
  );
}