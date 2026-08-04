"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll vinculado al contenedor del Hero
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Física suave tipo iOS/Apple para scroll continuo
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Parallax suave al hacer scroll hacia abajo (sin alterar la opacidad inicial)
  const yHeader = useTransform(smoothProgress, [0, 1], [0, 100]);
  const yCards = useTransform(smoothProgress, [0, 1], [0, 150]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[85vh] md:min-h-screen flex items-center justify-center text-white bg-[#0A1A3A] pt-28 pb-20 px-5 md:px-8 overflow-hidden"
    >
      {/* Resplandor ambiental de fondo */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[650px] h-[320px] sm:h-[450px] bg-[#C9A86A]/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10 w-full">
        {/* Encabezados y Manifiesto (con Parallax de Scroll) */}
        <motion.div style={{ y: yHeader }}>
          {/* Tagline superior */}
          <div>
            <span className="inline-block px-4 py-1.5 mb-6 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#0A1A3A] bg-[#C9A86A] rounded-full shadow-lg border border-[#C9A86A]/40">
              Atracción y Gestión Estratégica de Talento
            </span>
          </div>

          {/* Título Principal Tipográfico */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-tight">
            <span className="text-white">LT </span>
            <span className="bg-gradient-to-r from-[#C9A86A] via-[#E2C488] to-[#C9A86A] bg-clip-text text-transparent">
              Talent Solutions
            </span>
          </h1>

          {/* Slogan Oficial de Marca */}
          <p className="mt-6 text-lg sm:text-2xl md:text-3xl text-gray-200 font-light max-w-3xl mx-auto leading-relaxed tracking-wide">
            Conectamos talento.{" "}
            <span className="text-[#C9A86A] font-medium">
              Transformamos futuros.
            </span>
          </p>

          <p className="mt-3 text-xs sm:text-base text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            Construimos relaciones de valor que impulsan el crecimiento de
            profesionales y organizaciones extraordinarias.
          </p>
        </motion.div>

        {/* TARJETAS DE ACCIÓN DINÁMICAS */}
        <motion.div
          style={{ y: yCards }}
          className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 text-center max-w-4xl mx-auto"
        >
          {/* Columna Oportunidades / Candidatos */}
          <motion.div
            whileHover={{ y: -8, scale: 1.01 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
            className="group relative rounded-3xl bg-white text-[#0A1A3A] shadow-2xl hover:shadow-[#C9A86A]/20 overflow-hidden flex flex-col justify-between transition-shadow duration-300"
          >
            {/* Línea dorada superior interactiva */}
            <div className="w-full h-[4px] bg-[#C9A86A] shrink-0" />

            <div className="p-6 sm:p-8 pt-6 flex flex-col justify-between flex-1 space-y-4">
              <div>
                <span className="text-[10px] sm:text-xs font-extrabold text-[#8c6f33] uppercase tracking-widest block mb-1">
                  Para Profesionales
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A1A3A] mb-2">
                  Impulsa tu Desarrollo
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 font-normal mb-6 leading-relaxed">
                  Descubre oportunidades estratégicas y conecta con empresas que
                  valoran tu potencial.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  href="/candidatos/nuevo"
                  className="w-full py-3.5 bg-[#C9A86A] hover:bg-[#b89555] text-[#0A1A3A] font-extrabold rounded-xl shadow-md active:scale-[0.98] transition-all duration-200 text-xs sm:text-sm"
                >
                  Registrar Perfil Profesional
                </Link>

                <Link
                  href="/candidate/login"
                  className="w-full py-3.5 bg-gray-100 hover:bg-gray-200 text-[#0A1A3A] font-bold rounded-xl transition-all duration-200 text-xs sm:text-sm border border-gray-300"
                >
                  Acceso a Mi Cuenta
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Columna Empresas / Reclutadores */}
          <motion.div
            whileHover={{ y: -8, scale: 1.01 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
            className="group relative rounded-3xl bg-white text-[#0A1A3A] shadow-2xl hover:shadow-[#C9A86A]/20 overflow-hidden flex flex-col justify-between transition-shadow duration-300"
          >
            {/* Línea dorada superior interactiva */}
            <div className="w-full h-[4px] bg-[#C9A86A] shrink-0" />

            <div className="p-6 sm:p-8 pt-6 flex flex-col justify-between flex-1 space-y-4">
              <div>
                <span className="text-[10px] sm:text-xs font-extrabold text-[#8c6f33] uppercase tracking-widest block mb-1">
                  Para Organizaciones
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A1A3A] mb-2">
                  Conecta con Talento Ideal
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 font-normal mb-6 leading-relaxed">
                  Encuentra a las personas que generan resultados e impulsan el
                  crecimiento de tu empresa.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  href="/reclutador/registro"
                  className="w-full py-3.5 bg-[#C9A86A] hover:bg-[#b89555] text-[#0A1A3A] font-extrabold rounded-xl shadow-md active:scale-[0.98] transition-all duration-200 text-xs sm:text-sm"
                >
                  Registrar Empresa / Cuenta
                </Link>

                <Link
                  href="/reclutador/login"
                  className="w-full py-3.5 bg-gray-100 hover:bg-gray-200 text-[#0A1A3A] font-bold rounded-xl transition-all duration-200 text-xs sm:text-sm border border-gray-300"
                >
                  Portal Corporativo
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}