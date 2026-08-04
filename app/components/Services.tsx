"use client";

import { Heart, Handshake, TrendingUp } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function About() {
  // Variantes de animación al scroll estilo Apple con tipos explícitos de TypeScript
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
    <section id="nosotros" className="relative w-full py-28 bg-[#0A1A3A] text-white px-6 overflow-hidden">
      
      {/* Resplandor ambiental de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[500px] bg-[#C9A86A]/5 rounded-full blur-[140px] pointer-events-none" />

      <motion.div 
        className="max-w-6xl mx-auto text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >

        {/* Tagline de Marca */}
        <motion.div variants={itemVariants}>
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-widest text-[#0A1A3A] bg-[#C9A86A] rounded-full shadow-lg border border-[#C9A86A]/40">
            Nuestra Filosofía
          </span>
        </motion.div>

        {/* Título Principal */}
        <motion.h2 
          className="text-4xl md:text-5xl font-black tracking-tight text-white"
          variants={itemVariants}
        >
          ¿Quiénes Somos en <span className="text-[#C9A86A]">LT Talent Solutions</span>?
        </motion.h2>

        {/* Manifiesto de Marca */}
        <motion.p 
          className="mt-6 text-lg md:text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed font-light"
          variants={itemVariants}
        >
          Creemos que detrás de cada empresa exitosa hay{" "}
          <span className="font-semibold text-[#C9A86A]">personas extraordinarias</span>. 
          Por eso conectamos el talento adecuado con las oportunidades correctas, construyendo relaciones que impulsan el crecimiento, fortalecen a las organizaciones y transforman futuros.
        </motion.p>

        {/* Tarjetas de Pilares Fundamentales */}
        <motion.div 
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={itemVariants}
        >

          {/* Pilar 1: Personas en el Centro */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group relative rounded-3xl bg-white shadow-xl hover:shadow-2xl hover:shadow-[#C9A86A]/15 overflow-hidden text-left flex flex-col justify-between text-[#0A1A3A] transition-shadow duration-300"
          >
            {/* Línea dorada superior delgada */}
            <div className="w-full h-[3px] bg-[#C9A86A] shrink-0 group-hover:h-[4px] transition-all duration-300" />

            <div className="p-8 pt-6 flex flex-col justify-between flex-1">
              <div>
                <div className="p-3 bg-[#FFF9EF] border border-[#C9A86A]/30 rounded-2xl inline-block mb-6 group-hover:bg-[#C9A86A] group-hover:text-[#0A1A3A] transition-colors duration-300">
                  <Heart className="text-[#8c6f33] group-hover:text-[#0A1A3A] transition-colors duration-300" size={34} />
                </div>
                
                <span className="text-xs font-bold text-[#8c6f33] uppercase tracking-widest block mb-1">
                  Conexión Humana
                </span>
                <h3 className="text-2xl font-bold text-[#0A1A3A]">
                  Personas en el Centro
                </h3>
                <p className="mt-4 text-gray-600 font-light leading-relaxed text-sm">
                  Leemos más allá de un currículum: identificamos el potencial, los valores y el liderazgo que encajan de manera natural con la cultura de tu empresa.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#8c6f33]">
                <span>✓ Criterio ético y cercano</span>
                <span className="transform group-hover:translate-x-1.5 transition-transform duration-300 font-bold">→</span>
              </div>
            </div>
          </motion.div>

          {/* Pilar 2: Socios Estratégicos */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group relative rounded-3xl bg-white shadow-xl hover:shadow-2xl hover:shadow-[#C9A86A]/15 overflow-hidden text-left flex flex-col justify-between text-[#0A1A3A] transition-shadow duration-300"
          >
            {/* Línea dorada superior delgada */}
            <div className="w-full h-[3px] bg-[#C9A86A] shrink-0 group-hover:h-[4px] transition-all duration-300" />

            <div className="p-8 pt-6 flex flex-col justify-between flex-1">
              <div>
                <div className="p-3 bg-[#0A1A3A]/5 border border-[#0A1A3A]/10 rounded-2xl inline-block mb-6 group-hover:bg-[#0A1A3A] group-hover:text-white transition-colors duration-300">
                  <Handshake className="text-[#0A1A3A] group-hover:text-white transition-colors duration-300" size={34} />
                </div>

                <span className="text-xs font-bold text-[#8c6f33] uppercase tracking-widest block mb-1">
                  Acompañamiento Cercano
                </span>
                <h3 className="text-2xl font-bold text-[#0A1A3A]">
                  Socios Estratégicos
                </h3>
                <p className="mt-4 text-gray-600 font-light leading-relaxed text-sm">
                  Actuamos con claridad, agilidad y transparencia para entender los retos reales del negocio y responder con soluciones de valor a largo plazo.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#0A1A3A]">
                <span>✓ Respuestas con confianza</span>
                <span className="transform group-hover:translate-x-1.5 transition-transform duration-300 font-bold">→</span>
              </div>
            </div>
          </motion.div>

          {/* Pilar 3: Impacto Real */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group relative rounded-3xl bg-white shadow-xl hover:shadow-2xl hover:shadow-[#C9A86A]/15 overflow-hidden text-left flex flex-col justify-between text-[#0A1A3A] transition-shadow duration-300"
          >
            {/* Línea dorada superior delgada */}
            <div className="w-full h-[3px] bg-[#C9A86A] shrink-0 group-hover:h-[4px] transition-all duration-300" />

            <div className="p-8 pt-6 flex flex-col justify-between flex-1">
              <div>
                <div className="p-3 bg-[#FFF9EF] border border-[#C9A86A]/30 rounded-2xl inline-block mb-6 group-hover:bg-[#C9A86A] group-hover:text-[#0A1A3A] transition-colors duration-300">
                  <TrendingUp className="text-[#8c6f33] group-hover:text-[#0A1A3A] transition-colors duration-300" size={34} />
                </div>

                <span className="text-xs font-bold text-[#8c6f33] uppercase tracking-widest block mb-1">
                  Éxito Sostenible
                </span>
                <h3 className="text-2xl font-bold text-[#0A1A3A]">
                  Impacto Real
                </h3>
                <p className="mt-4 text-gray-600 font-light leading-relaxed text-sm">
                  Más que realizar contrataciones temporales, creamos conexiones que generan resultados sostenibles y transforman el desarrollo de profesionales y empresas.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#8c6f33]">
                <span>✓ Resultados duraderos</span>
                <span className="transform group-hover:translate-x-1.5 transition-transform duration-300 font-bold">→</span>
              </div>
            </div>
          </motion.div>

        </motion.div>

        {/* Lema de Cierre Animado */}
        <motion.p 
          variants={itemVariants}
          className="mt-16 text-lg text-[#C9A86A] font-semibold tracking-wide"
        >
          "Conectamos talento. Transformamos futuros."
        </motion.p>

      </motion.div>
    </section>
  );
}