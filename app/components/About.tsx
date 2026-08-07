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
        type: "spring" as const,
        stiffness: 90,
        damping: 18,
      },
    },
  };

  return (
    <section id="nosotros" className="relative w-full py-28 bg-[#0A1A3A] text-white px-4 sm:px-6 md:px-8 overflow-hidden">
      
      {/* FONDO CINEMATOGRÁFICO DE VIDEO */}
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
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
        )}
        {/* Capa de contraste y oscurecimiento uniforme */}
        <div className="absolute inset-0 w-full h-full bg-[#0A1A3A]/80" />
      </div>

      <motion.div 
        className="max-w-6xl mx-auto text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {/* Tagline de Marca */}
        <motion.div variants={itemVariants}>
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-widest text-[#0A1A3A] bg-[#C9A86A] rounded-full shadow-lg border border-[#C9A86A]/40">
            Nuestra Filosofía
          </span>
        </motion.div>

        {/* Título Principal */}
        <motion.h2 
          className="text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-md"
          variants={itemVariants}
        >
          ¿Quiénes Somos en <span className="text-[#C9A86A]">LT Talent Solutions</span>?
        </motion.h2>

        {/* Manifiesto de Marca */}
        <motion.p 
          className="mt-6 text-lg md:text-xl text-gray-100 max-w-4xl mx-auto leading-relaxed font-light drop-shadow"
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
          {pillarsData.map((pillar) => {
            const IconComponent = pillar.icon;
            return (
              <motion.div 
                key={pillar.id}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
                className="group relative rounded-[28px] sm:rounded-[32px] bg-white text-[#0A1A3A] shadow-[0_0_30px_rgba(201,168,106,0.3)] border-2 border-[#C9A86A] hover:shadow-[0_0_40px_rgba(201,168,106,0.5)] overflow-hidden text-left flex flex-col justify-between p-6 sm:p-8 transition-all duration-300"
              >
                <div>
                  <div className={`p-3 border rounded-2xl inline-block mb-6 group-hover:bg-[#C9A86A] group-hover:text-[#0A1A3A] group-hover:border-[#C9A86A] transition-colors duration-300 ${pillar.iconBg}`}>
                    <IconComponent className="transition-colors duration-300" size={34} />
                  </div>
                  
                  <span className="text-xs font-bold text-[#8c6f33] uppercase tracking-widest block mb-1">
                    {pillar.tag}
                  </span>
                  <h3 className="text-2xl font-bold text-[#0A1A3A]">
                    {pillar.title}
                  </h3>
                  <p className="mt-4 text-gray-600 font-light leading-relaxed text-sm">
                    {pillar.description}
                  </p>
                </div>

                {/* Texto inferior destacado */}
                <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-start text-sm md:text-base font-bold text-[#8c6f33]">
                  <span>✓ {pillar.footerText}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {videoError && (
          <div className="mt-8 inline-flex items-center gap-2 bg-red-500/20 border border-red-500/40 px-4 py-2 rounded-xl text-xs text-red-200">
            <AlertCircle size={14} /> El archivo de video en <code className="text-white">/videos/about.mp4</code> no pudo cargarse.
          </div>
        )}

        {/* Lema de Cierre Animado */}
        <motion.p 
          variants={itemVariants}
          className="mt-16 text-lg md:text-xl text-[#C9A86A] font-bold tracking-wide drop-shadow-md"
        >
          "Conectamos talento. Transformamos futuros."
        </motion.p>
      </motion.div>
    </section>
  );
}