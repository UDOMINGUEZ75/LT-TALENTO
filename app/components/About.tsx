"use client";

import { useState, useEffect } from "react";
import { Heart, Handshake, TrendingUp, AlertCircle } from "lucide-react";
import { motion, Variants } from "framer-motion";

const pillarsData = [
  {
    id: 1,
    tag: "Conexión Humana",
    title: "Personas en el Centro",
    description: "Leemos más allá de un currículum: identificamos el potencial, los valores y el liderazgo que encajan de manera natural con la cultura de tu empresa.",
    footerText: "Criterio ético y cercano",
    icon: Heart,
    iconBg: "bg-[#FFF9EF] border-[#C9A86A]/30 text-[#8c6f33]",
  },
  {
    id: 2,
    tag: "Acompañamiento Cercano",
    title: "Socios Estratégicos",
    description: "Actuamos con claridad, agilidad y transparencia para entender los retos reales del negocio y responder con soluciones de valor a largo plazo.",
    footerText: "Respuestas con confianza",
    icon: Handshake,
    iconBg: "bg-[#0A1A3A]/5 border-[#0A1A3A]/10 text-[#0A1A3A]",
  },
  {
    id: 3,
    tag: "Éxito Sostenible",
    title: "Impacto Real",
    description: "Más que realizar contrataciones temporales, creamos conexiones que generan resultados sostenibles y transforman el desarrollo de profesionales y empresas.",
    footerText: "Resultados duraderos",
    icon: TrendingUp,
    iconBg: "bg-[#FFF9EF] border-[#C9A86A]/30 text-[#8c6f33]",
  },
];

export default function About() {
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
    <section id="nosotros" className="relative w-full pt-20 sm:pt-32 pb-16 sm:pb-24 bg-[#0A1A3A] text-white px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* FONDO EQUILIBRADO: EL VIDEO SE VE NOTABLEMENTE MÁS, SIN PERDER ELEGANCIA */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {isMounted && !videoError && (
          <video
            src="/videos/about.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onError={() => setVideoError(true)}
            className="absolute inset-0 w-full h-full object-cover opacity-95 transition-opacity duration-300"
          />
        )}
        
        {/* Capa de contraste equilibrada al 50% de intensidad anterior */}
        <div 
          className="absolute inset-0 w-full h-full z-10"
          style={{
            background: `
              radial-gradient(circle at center, rgba(10, 26, 58, 0.15) 0%, rgba(10, 26, 58, 0.35) 65%, rgba(10, 26, 58, 0.45) 100%)
            `
          }}
        />

        {/* Capa de oscurecimiento mínima de balance (15%) */}
        <div className="absolute inset-0 w-full h-full bg-[#0A1A3A]/15 z-20" />
      </div>

      <motion.div 
        className="max-w-5xl mx-auto text-center relative z-30 pt-4 sm:pt-0"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-30px" }}
      >
        {/* Tagline de Marca */}
        <motion.div variants={itemVariants}>
          <span className="inline-block px-3 py-1 mb-3 text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-[#0A1A3A] bg-[#C9A86A] rounded-full shadow-md">
            Nuestra Filosofía
          </span>
        </motion.div>

        {/* Título Principal Con Sombra Protegida */}
        <motion.h2 
          className="text-2xl sm:text-5xl md:text-6xl font-black tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)] leading-tight"
          variants={itemVariants}
        >
          ¿Quiénes Somos en <span className="text-[#C9A86A]">LT Talent Solutions</span>?
        </motion.h2>

        {/* Subtítulo / Manifiesto */}
        <motion.p 
          className="mt-3 text-xs sm:text-base md:text-lg text-gray-100 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
          variants={itemVariants}
        >
          Creemos que detrás de cada empresa exitosa hay{" "}
          <span className="font-semibold text-[#C9A86A]">personas extraordinarias</span>. 
          Por eso conectamos el talento adecuado con las oportunidades correctas.
        </motion.p>
        
        <motion.p 
          className="mt-1.5 text-[11px] sm:text-sm text-gray-300 max-w-lg mx-auto font-light px-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]"
          variants={itemVariants}
        >
          Construimos relaciones que impulsan el crecimiento y transforman futuros.
        </motion.p>

        {/* TARJETAS DE PILARES COMPACTAS ESTILO APP */}
        <motion.div 
          className="mt-6 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 max-w-5xl mx-auto text-left"
          variants={itemVariants}
        >
          {pillarsData.map((pillar) => {
            const IconComponent = pillar.icon;
            return (
              <motion.div 
                key={pillar.id}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                className="group relative rounded-2xl sm:rounded-[32px] bg-white p-5 sm:p-8 text-center sm:text-left flex flex-col justify-between items-center sm:items-start text-[#0A1A3A] shadow-lg border-2 border-[#C9A86A]/70 transition-all duration-300"
              >
                <div className="w-full space-y-1.5 mb-4">
                  <div className={`p-2.5 sm:p-3 border rounded-xl sm:rounded-2xl inline-block mb-2 group-hover:bg-[#C9A86A] group-hover:text-[#0A1A3A] group-hover:border-[#C9A86A] transition-colors duration-300 ${pillar.iconBg}`}>
                    <IconComponent className="transition-colors duration-300 w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  
                  <span className="text-[10px] font-bold text-[#8c6f33] uppercase tracking-widest block">
                    {pillar.tag}
                  </span>
                  <h3 className="text-lg sm:text-2xl font-extrabold text-[#0A1A3A] tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-gray-600 text-xs font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="w-full pt-3 border-t border-gray-100 flex items-center justify-start text-xs font-bold text-[#8c6f33]">
                  <span>✓ {pillar.footerText}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {videoError && (
          <div className="mt-6 inline-flex items-center gap-2 bg-red-500/20 border border-red-500/40 px-3 py-1.5 rounded-lg text-xs text-red-200">
            <AlertCircle size={12} /> El archivo de video en <code className="text-white">/videos/about.mp4</code> no pudo cargarse.
          </div>
        )}

        {/* Lema de Cierre */}
        <motion.p 
          variants={itemVariants}
          className="mt-8 sm:mt-12 text-sm sm:text-lg text-[#C9A86A] font-bold tracking-wide drop-shadow"
        >
          "Conectamos talento. Transformamos futuros."
        </motion.p>
      </motion.div>
    </section>
  );
}