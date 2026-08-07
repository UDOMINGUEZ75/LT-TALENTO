"use client";

import { useRef, useState } from "react";
import { Heart, Handshake, TrendingUp, AlertCircle } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoError, setVideoError] = useState(false);

  // Vincular la animación directamente al progreso de scroll de la sección
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Física suave tipo iOS/Apple para scroll continuo
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Parallax suave al hacer scroll (sin afectar la opacidad inicial)
  const yHeader = useTransform(smoothProgress, [0, 1], [40, -40]);
  const yCards = useTransform(smoothProgress, [0, 1], [80, -40]);

  return (
    <section
      ref={containerRef}
      id="nosotros"
      className="relative w-full py-24 md:py-36 bg-[#0A1A3A] text-white px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* FONDO CINEMATOGRÁFICO DE VIDEO */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {!videoError && (
          <video
            src="/videos/about.mp4"
            autoPlay
            loop
            muted
            playsInline
            onError={() => setVideoError(true)}
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
        )}
        {/* Capa de contraste y oscurecimiento uniforme */}
        <div className="absolute inset-0 w-full h-full bg-[#0A1A3A]/80" />
      </div>

      {/* Resplandor ambiental de fondo dinámico */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] h-[320px] sm:h-[600px] bg-[#C9A86A]/10 rounded-full blur-[100px] md:blur-[160px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        
        {/* Encabezado y Manifiesto (con Parallax de Scroll) */}
        <motion.div style={{ y: yHeader }}>
          <span className="inline-block px-4 py-1.5 mb-5 text-[11px] md:text-xs font-extrabold uppercase tracking-widest text-[#0A1A3A] bg-[#C9A86A] rounded-full shadow-lg">
            Nuestra Filosofía
          </span>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            ¿Quiénes Somos en <span className="text-[#C9A86A]">LT Talent Solutions</span>?
          </h2>

          <p className="mt-6 text-sm sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light px-2">
            Creemos que detrás de cada empresa exitosa hay{" "}
            <span className="font-semibold text-[#C9A86A]">personas extraordinarias</span>. 
            Por eso conectamos el talento adecuado con las oportunidades correctas, construyendo relaciones que impulsan el crecimiento, fortalecen a las organizaciones y transforman futuros.
          </p>
        </motion.div>

        {/* Grid de Tarjetas de Pilares Fundamentales */}
        <motion.div 
          style={{ y: yCards }}
          className="mt-12 sm:mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left"
        >

          {/* Pilar 1: Personas en el Centro */}
          <motion.div
            whileHover={{ y: -8, scale: 1.01 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
            className="group relative rounded-[28px] sm:rounded-[32px] bg-white text-[#0A1A3A] shadow-[0_0_30px_rgba(201,168,106,0.3)] border-2 border-[#C9A86A] hover:shadow-[0_0_40px_rgba(201,168,106,0.5)] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300"
          >
            <div>
              <div className="p-3 bg-[#FFF9EF] border border-[#C9A86A]/30 rounded-2xl inline-block mb-5 group-hover:bg-[#C9A86A] transition-colors duration-300">
                <Heart className="text-[#8c6f33] group-hover:text-[#0A1A3A] transition-colors duration-300" size={30} />
              </div>
              
              <span className="text-[10px] sm:text-xs font-extrabold text-[#8c6f33] uppercase tracking-widest block mb-1">
                Conexión Humana
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0A1A3A]">
                Personas en el Centro
              </h3>
              <p className="mt-3 text-gray-600 font-normal leading-relaxed text-xs sm:text-sm">
                Leemos más allá de un currículum: identificamos el potencial, los valores y el liderazgo que encajan de manera natural con la cultura de tu empresa.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#8c6f33]">
              <span>✓ Criterio ético y cercano</span>
              <span className="transform group-hover:translate-x-1.5 transition-transform duration-300 font-bold">→</span>
            </div>
          </motion.div>

          {/* Pilar 2: Socios Estratégicos */}
          <motion.div
            whileHover={{ y: -8, scale: 1.01 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
            className="group relative rounded-[28px] sm:rounded-[32px] bg-white text-[#0A1A3A] shadow-[0_0_30px_rgba(201,168,106,0.3)] border-2 border-[#C9A86A] hover:shadow-[0_0_40px_rgba(201,168,106,0.5)] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300"
          >
            <div>
              <div className="p-3 bg-[#0A1A3A]/5 border border-[#0A1A3A]/10 rounded-2xl inline-block mb-5 group-hover:bg-[#0A1A3A] transition-colors duration-300">
                <Handshake className="text-[#0A1A3A] group-hover:text-white transition-colors duration-300" size={30} />
              </div>

              <span className="text-[10px] sm:text-xs font-extrabold text-[#8c6f33] uppercase tracking-widest block mb-1">
                Acompañamiento Cercano
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0A1A3A]">
                Socios Estratégicos
              </h3>
              <p className="mt-3 text-gray-600 font-normal leading-relaxed text-xs sm:text-sm">
                Actuamos con claridad, agilidad y transparencia para entender los retos reales del negocio y responder con soluciones de valor a largo plazo.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#0A1A3A]">
              <span>✓ Respuestas con confianza</span>
              <span className="transform group-hover:translate-x-1.5 transition-transform duration-300 font-bold">→</span>
            </div>
          </motion.div>

          {/* Pilar 3: Impacto Real */}
          <motion.div
            whileHover={{ y: -8, scale: 1.01 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
            className="group relative rounded-[28px] sm:rounded-[32px] bg-white text-[#0A1A3A] shadow-[0_0_30px_rgba(201,168,106,0.3)] border-2 border-[#C9A86A] hover:shadow-[0_0_40px_rgba(201,168,106,0.5)] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300"
          >
            <div>
              <div className="p-3 bg-[#FFF9EF] border border-[#C9A86A]/30 rounded-2xl inline-block mb-5 group-hover:bg-[#C9A86A] transition-colors duration-300">
                <TrendingUp className="text-[#8c6f33] group-hover:text-[#0A1A3A] transition-colors duration-300" size={30} />
              </div>

              <span className="text-[10px] sm:text-xs font-extrabold text-[#8c6f33] uppercase tracking-widest block mb-1">
                Éxito Sostenible
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0A1A3A]">
                Impacto Real
              </h3>
              <p className="mt-3 text-gray-600 font-normal leading-relaxed text-xs sm:text-sm">
                Más que realizar contrataciones temporales, creamos conexiones que generan resultados sostenibles y transforman el desarrollo de profesionales y empresas.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#8c6f33]">
              <span>✓ Resultados duraderos</span>
              <span className="transform group-hover:translate-x-1.5 transition-transform duration-300 font-bold">→</span>
            </div>
          </motion.div>

        </motion.div>

        {/* Lema de Cierre */}
        <motion.p 
          style={{ y: yCards }}
          className="mt-12 sm:mt-16 text-sm sm:text-lg text-[#C9A86A] font-semibold tracking-wide px-2"
        >
          "Conectamos talento. Transformamos futuros."
        </motion.p>

        {videoError && (
          <div className="mt-8 inline-flex items-center gap-2 bg-red-500/20 border border-red-500/40 px-4 py-2 rounded-xl text-xs text-red-200">
            <AlertCircle size={14} /> El archivo de video en <code className="text-white">/videos/about.mp4</code> no pudo cargarse.
          </div>
        )}

      </div>
    </section>
  );
}