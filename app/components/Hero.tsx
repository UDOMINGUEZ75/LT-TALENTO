"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  // Variantes de animación para la entrada estilo Apple
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 18,
      },
    },
  };

  return (
    <section className="relative w-full min-h-[700px] flex items-center justify-center text-white bg-[#0A1A3A] pt-28 pb-20 px-6 overflow-hidden">
      
      {/* Resplandor ambiental de fondo tipo Apple */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#C9A86A]/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        className="max-w-5xl mx-auto text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >

        {/* Tagline superior */}
        <motion.div variants={itemVariants}>
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold uppercase tracking-widest text-[#0A1A3A] bg-[#C9A86A] rounded-full shadow-lg border border-[#C9A86A]/40">
            Atracción y Gestión Estratégica de Talento
          </span>
        </motion.div>

        {/* Título Principal Tipográfico */}
        <motion.h1 
          className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight"
          variants={itemVariants}
        >
          <span className="text-white">LT </span>
          <span className="bg-gradient-to-r from-[#C9A86A] via-[#E2C488] to-[#C9A86A] bg-clip-text text-transparent">
            Talent Solutions
          </span>
        </motion.h1>

        {/* Slogan Oficial de Marca */}
        <motion.p 
          className="mt-6 text-xl sm:text-2xl md:text-3xl text-gray-200 font-light max-w-3xl mx-auto leading-relaxed tracking-wide"
          variants={itemVariants}
        >
          Conectamos talento. <span className="text-[#C9A86A] font-medium">Transformamos futuros.</span>
        </motion.p>

        <motion.p 
          className="mt-3 text-sm sm:text-base text-gray-300 max-w-2xl mx-auto font-light"
          variants={itemVariants}
        >
          Construimos relaciones de valor que impulsan el crecimiento de profesionales y organizaciones extraordinarias.
        </motion.p>

        {/* TARJETAS DE ACCIÓN DINÁMICAS */}
        <motion.div 
          className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-8 text-center max-w-4xl mx-auto"
          variants={itemVariants}
        >

          {/* Columna Oportunidades / Candidatos */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group relative rounded-3xl bg-white shadow-xl hover:shadow-2xl hover:shadow-[#C9A86A]/15 overflow-hidden flex flex-col justify-between text-[#0A1A3A] transition-shadow duration-300"
          >
            {/* Línea dorada superior interactiva */}
            <div className="w-full h-[3px] bg-[#C9A86A] shrink-0 group-hover:h-[4px] transition-all duration-300" />

            <div className="p-8 pt-6 flex flex-col justify-between flex-1 space-y-4">
              <div>
                <span className="text-xs font-bold text-[#8c6f33] uppercase tracking-widest block mb-1">
                  Para Profesionales
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A1A3A] mb-2">
                  Impulsa tu Desarrollo
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 font-light mb-6 leading-relaxed">
                  Descubre oportunidades estratégicas y conecta con empresas que valoran tu potencial.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  href="/candidatos/nuevo"
                  className="w-full py-3.5 bg-[#C9A86A] hover:bg-[#d8b97a] text-[#0A1A3A] font-bold rounded-xl shadow-md active:scale-[0.98] transition-all duration-200 text-sm"
                >
                  Registrar Perfil Profesional
                </Link>

                <Link
                  href="/candidate/login"
                  className="w-full py-3.5 bg-gray-100 hover:bg-gray-200 text-[#0A1A3A] font-bold rounded-xl transition-all duration-200 text-sm border border-gray-200"
                >
                  Acceso a Mi Cuenta
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Columna Empresas / Reclutadores */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group relative rounded-3xl bg-white shadow-xl hover:shadow-2xl hover:shadow-[#C9A86A]/15 overflow-hidden flex flex-col justify-between text-[#0A1A3A] transition-shadow duration-300"
          >
            {/* Línea dorada superior interactiva */}
            <div className="w-full h-[3px] bg-[#C9A86A] shrink-0 group-hover:h-[4px] transition-all duration-300" />

            <div className="p-8 pt-6 flex flex-col justify-between flex-1 space-y-4">
              <div>
                <span className="text-xs font-bold text-[#8c6f33] uppercase tracking-widest block mb-1">
                  Para Organizaciones
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A1A3A] mb-2">
                  Conecta con Talento Ideal
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 font-light mb-6 leading-relaxed">
                  Encuentra a las personas que generan resultados e impulsan el crecimiento de tu empresa.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  href="/reclutador/registro"
                  className="w-full py-3.5 bg-[#C9A86A] hover:bg-[#d8b97a] text-[#0A1A3A] font-bold rounded-xl shadow-md active:scale-[0.98] transition-all duration-200 text-sm"
                >
                  Registrar Empresa / Cuenta
                </Link>

                <Link
                  href="/reclutador/login"
                  className="w-full py-3.5 bg-gray-100 hover:bg-gray-200 text-[#0A1A3A] font-bold rounded-xl transition-all duration-200 text-sm border border-gray-200"
                >
                  Portal Corporativo
                </Link>
              </div>
            </div>
          </motion.div>

        </motion.div>

      </motion.div>
    </section>
  );
}