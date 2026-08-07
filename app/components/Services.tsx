"use client";

import { useState, useEffect } from "react";
import { UserCheck, Building2, SearchCheck, Briefcase, AlertCircle } from "lucide-react";
import { motion, Variants } from "framer-motion";

const servicesList = [
  {
    icon: SearchCheck,
    tag: "Atracción Activa",
    title: "Reclutamiento Especializado",
    description: "Búsqueda y selección técnica para posiciones operativas, administrativas y mandos medios con alta precisión.",
    badge: "Garantía de adaptación",
  },
  {
    icon: Building2,
    tag: "Perfiles Directivos",
    title: "Headhunting Ejecutivo",
    description: "Atracción estratégica de líderes y directivos de alto impacto bajo esquemas de estricta confidencialidad.",
    badge: "Mapeo de mercado profundo",
  },
  {
    icon: UserCheck,
    tag: "Diagnóstico Humano",
    title: "Evaluaciones Psicométricas",
    description: "Pruebas objetivas de competencias, personalidad y valores para asegurar el encaje con la cultura organizacional.",
    badge: "Reportes cuantitativos inmediatos",
  },
  {
    icon: Briefcase,
    tag: "Estructura Organizacional",
    title: "Consultoría en RRHH",
    description: "Diagnósticos de clima laboral, diseño de tabuladores salariales y estrategias para reducir la rotación.",
    badge: "Soluciones a la medida",
  },
];

export default function Services() {
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
    <section id="servicios" className="relative w-full pt-20 sm:pt-32 pb-16 sm:pb-24 bg-[#0A1A3A] text-white px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* FONDO EQUILIBRADO: MISMA ILUMINACIÓN Y CLARIDAD QUE EL HERO */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {isMounted && !videoError && (
          <video
            src="/videos/services.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onError={() => setVideoError(true)}
            className="absolute inset-0 w-full h-full object-cover opacity-95 transition-opacity duration-300"
          />
        )}
        
        {/* Capa de brillo central y contraste traslúcido */}
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
        className="max-w-6xl mx-auto text-center relative z-30 pt-4 sm:pt-0"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-30px" }}
      >

        {/* Tagline superior */}
        <motion.div variants={itemVariants}>
          <span className="inline-block px-3 py-1 mb-3 text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-[#0A1A3A] bg-[#C9A86A] rounded-full shadow-md">
            Soluciones Corporativas
          </span>
        </motion.div>

        {/* Título Principal Con Sombra Protegida */}
        <motion.h2 
          className="text-2xl sm:text-5xl md:text-6xl font-black tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)] leading-tight"
          variants={itemVariants}
        >
          Nuestros <span className="text-[#C9A86A]">Servicios</span>
        </motion.h2>

        {/* Descripción */}
        <motion.p 
          className="mt-3 text-xs sm:text-base md:text-lg text-gray-100 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] px-2"
          variants={itemVariants}
        >
          Estrategias integrales diseñadas para integrar el talento clave que impulsa el crecimiento de tu organización.
        </motion.p>

        {/* Tarjetas de Servicios Compactas para Móvil (2x2 en Escritorio) */}
        <motion.div 
          className="mt-8 sm:mt-14 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 text-left"
          variants={itemVariants}
        >
          {servicesList.map((service, idx) => {
            const IconComponent = service.icon;

            return (
              <motion.div 
                key={idx}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                className="group relative rounded-2xl sm:rounded-[32px] bg-white p-5 sm:p-8 text-[#0A1A3A] shadow-lg border-2 border-[#C9A86A]/70 flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 sm:p-3 bg-[#FFF9EF] border border-[#C9A86A]/30 text-[#8c6f33] rounded-xl sm:rounded-2xl group-hover:bg-[#C9A86A] group-hover:text-[#0A1A3A] transition-colors duration-300">
                      <IconComponent className="w-5 h-5 sm:w-7 sm:h-7" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#8c6f33] uppercase tracking-widest block">
                        {service.tag}
                      </span>
                      <h3 className="text-lg sm:text-2xl font-extrabold text-[#0A1A3A] tracking-tight">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#8c6f33]">
                  <span>✓ {service.badge}</span>
                  <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {videoError && (
          <div className="mt-6 inline-flex items-center gap-2 bg-red-500/20 border border-red-500/40 px-3 py-1.5 rounded-lg text-xs text-red-200">
            <AlertCircle size={12} /> El archivo de video en <code className="text-white">/videos/services.mp4</code> no pudo cargarse.
          </div>
        )}

      </motion.div>
    </section>
  );
}