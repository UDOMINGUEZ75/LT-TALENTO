"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { AlertCircle } from "lucide-react";

export default function Hero() {
  const [videoError, setVideoError] = useState(false);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 18,
      },
    },
  };

  return (
    <section id="hero" className="relative w-full pt-32 pb-24 bg-[#0A1A3A] text-white px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* FONDO CINEMATOGRÁFICO DE VIDEO Y EFECTO DE BRILLO */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {!videoError && (
          <video
            src="/videos/inicio.mp4"
            autoPlay
            loop
            muted
            playsInline
            onError={() => setVideoError(true)}
            className="absolute inset-0 w-full h-full object-cover opacity-75"
          />
        )}
        
        {/* Capa de brillo central (Radial Gradient) y viñeteado */}
        <div 
          className="absolute inset-0 w-full h-full z-10"
          style={{
            background: `
              radial-gradient(circle at center, rgba(201, 168, 106, 0.18) 0%, rgba(10, 26, 58, 0.65) 45%, rgba(10, 26, 58, 0.92) 100%)
            `
          }}
        />
        {/* Capa de oscurecimiento uniforme */}
        <div className="absolute inset-0 w-full h-full bg-[#0A1A3A]/30 z-20" />
      </div>

      <motion.div 
        className="max-w-6xl mx-auto text-center relative z-30"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Tagline de Marca */}
        <motion.div variants={itemVariants}>
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-widest text-[#0A1A3A] bg-[#C9A86A] rounded-full shadow-lg border border-[#C9A86A]/40">
            Atracción y Gestión Estratégica de Talento
          </span>
        </motion.div>

        {/* Título Principal */}
        <motion.h1 
          className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white drop-shadow-md"
          variants={itemVariants}
        >
          LT <span className="text-[#C9A86A]">Talent Solutions</span>
        </motion.h1>

        {/* Subtítulo / Manifiesto */}
        <motion.p 
          className="mt-4 text-sm sm:text-base md:text-lg text-gray-100 max-w-2xl mx-auto leading-relaxed font-light drop-shadow"
          variants={itemVariants}
        >
          Conectamos talento. <span className="text-[#C9A86A] font-semibold">Transformamos futuros.</span>
        </motion.p>
        <motion.p 
          className="mt-2 text-xs sm:text-sm text-gray-300 max-w-xl mx-auto font-light px-2"
          variants={itemVariants}
        >
          Construimos relaciones de valor que impulsan el crecimiento de profesionales y organizaciones extraordinarias.
        </motion.p>

        {/* Tarjetas de Acceso / Propuesta de Valor */}
        <motion.div 
          className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto"
          variants={itemVariants}
        >
          {/* Tarjeta Profesionales */}
          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
            className="group relative rounded-[28px] sm:rounded-[32px] bg-white p-6 sm:p-8 text-center flex flex-col justify-between items-center text-[#0A1A3A] shadow-[0_0_30px_rgba(201,168,106,0.3)] border-2 border-[#C9A86A] transition-all duration-300"
          >
            <div className="w-full space-y-3 mb-6">
              <span className="text-xs font-bold text-[#8c6f33] uppercase tracking-widest block">
                PARA PROFESIONALES
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A1A3A] tracking-tight leading-tight">
                Impulsa tu Desarrollo
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm font-light max-w-xs mx-auto leading-relaxed">
                Descubre oportunidades estratégicas y conecta con empresas que valoran tu potencial.
              </p>
            </div>

            <div className="w-full flex flex-col gap-3 pt-4 border-t border-gray-100">
              <Link
                href="/candidatos/nuevo"
                className="w-full py-3 px-4 bg-[#C9A86A] hover:bg-[#b89555] text-[#0A1A3A] font-bold rounded-2xl shadow-md transition-all duration-200 text-xs sm:text-sm text-center"
              >
                Registrar Perfil Profesional
              </Link>

              <Link
                href="/candidate/login"
                className="w-full py-3 px-4 bg-gray-50 hover:bg-gray-100 text-[#0A1A3A] font-medium rounded-2xl transition-all duration-200 text-xs sm:text-sm border border-gray-200 text-center shadow-sm"
              >
                Acceso a Mi Cuenta
              </Link>
            </div>
          </motion.div>

          {/* Tarjeta Organizaciones */}
          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
            className="group relative rounded-[28px] sm:rounded-[32px] bg-white p-6 sm:p-8 text-center flex flex-col justify-between items-center text-[#0A1A3A] shadow-[0_0_30px_rgba(201,168,106,0.3)] border-2 border-[#C9A86A] transition-all duration-300"
          >
            <div className="w-full space-y-3 mb-6">
              <span className="text-xs font-bold text-[#8c6f33] uppercase tracking-widest block">
                PARA ORGANIZACIONES
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A1A3A] tracking-tight leading-tight">
                Conecta con Talento Ideal
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm font-light max-w-xs mx-auto leading-relaxed">
                Encuentra a las personas que generan resultados e impulsan el crecimiento de tu empresa.
              </p>
            </div>

            <div className="w-full flex flex-col gap-3 pt-4 border-t border-gray-100">
              <Link
                href="/reclutador/registro"
                className="w-full py-3 px-4 bg-[#C9A86A] hover:bg-[#b89555] text-[#0A1A3A] font-bold rounded-2xl shadow-md transition-all duration-200 text-xs sm:text-sm text-center"
              >
                Registrar Empresa / Cuenta
              </Link>

              <Link
                href="/reclutador/login"
                className="w-full py-3 px-4 bg-gray-50 hover:bg-gray-100 text-[#0A1A3A] font-medium rounded-2xl transition-all duration-200 text-xs sm:text-sm border border-gray-200 text-center shadow-sm"
              >
                Portal Corporativo
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {videoError && (
          <div className="mt-8 inline-flex items-center gap-2 bg-red-500/20 border border-red-500/40 px-4 py-2 rounded-xl text-xs text-red-200">
            <AlertCircle size={14} /> El archivo de video en <code className="text-white">/videos/inicio.mp4</code> no pudo cargarse.
          </div>
        )}
      </motion.div>
    </section>
  );
}