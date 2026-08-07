"use client";

import { useState, useEffect } from "react";
import { Search, ClipboardCheck, CheckCircle, AlertCircle } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function Process() {
  const [activeStep, setActiveStep] = useState<number>(3);
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

  const stepsData = [
    {
      id: 1,
      stepNumber: "01",
      icon: Search,
      tagline: "Comprensión Profunda",
      title: "Diagnóstico y Cultura",
      description:
        "Entendemos el contexto, la visión y el propósito corporativo para definir el perfil de talento que impulsará los objetivos estratégicos de la empresa.",
      badge: "Identificación de necesidades clave",
    },
    {
      id: 2,
      stepNumber: "02",
      icon: ClipboardCheck,
      tagline: "Evaluación Integral",
      title: "Conexión de Talento",
      description:
        "Realizamos entrevistas profundas, lecturas humanas y análisis apoyado en IA para identificar profesionales que aportan valor genuino y desarrollo continuo.",
      badge: "Evaluación técnica y cultural humana",
    },
    {
      id: 3,
      stepNumber: "03",
      icon: CheckCircle,
      tagline: "Relaciones de Valor",
      title: "Crecimiento Sostenible",
      description:
        "Presentamos candidatos con alta coincidencia, facilitando decisiones fundamentadas que construyen historias de éxito y transforman el futuro organizacional.",
      badge: "Resultados e impacto a largo plazo",
    },
  ];

  return (
    <section id="proceso" className="relative w-full pt-20 sm:pt-32 pb-16 sm:pb-24 bg-[#0A1A3A] text-white px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* FONDO EQUILIBRADO: EL VIDEO DESTACA CON CLARIDAD */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {isMounted && !videoError && (
          <video
            src="/videos/process.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onError={() => setVideoError(true)}
            className="absolute inset-0 w-full h-full object-cover opacity-95 transition-opacity duration-300"
          />
        )}
        
        {/* Capa de contraste traslúcido para iluminación uniforme */}
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
            Acompañamiento Cercano y Estratégico
          </span>
        </motion.div>

        {/* Título Principal */}
        <motion.h2 
          className="text-2xl sm:text-5xl md:text-6xl font-black tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)] leading-tight"
          variants={itemVariants}
        >
          Nuestro{" "}
          <span className="text-[#C9A86A]">
            Proceso de Selección
          </span>
        </motion.h2>

        {/* Descripción con Voz de Marca */}
        <motion.p 
          className="mt-3 text-xs sm:text-base md:text-lg text-gray-100 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] px-2"
          variants={itemVariants}
        >
          Combinamos evaluación humana profunda con soluciones tecnológicas de vanguardia. 
          Más que realizar contrataciones temporales, identificamos profesionales con alto potencial 
          que generan resultados e impulsan la transformación de las organizaciones.
        </motion.p>

        {/* Tarjetas de Pasos Compactas */}
        <motion.div 
          className="mt-8 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 text-left"
          variants={itemVariants}
        >
          {stepsData.map((step) => {
            const IconComponent = step.icon;
            const isActive = activeStep === step.id;

            return (
              <motion.div 
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                className={`group relative rounded-2xl sm:rounded-[32px] bg-white p-5 sm:p-8 text-[#0A1A3A] overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300 ${
                  isActive 
                    ? "border-2 border-[#C9A86A] shadow-lg" 
                    : "border-2 border-[#C9A86A]/70 shadow-md hover:shadow-lg"
                }`}
              >
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex justify-between items-center mb-4 sm:mb-6">
                      {/* Ícono dinámico */}
                      <div className={`p-2.5 sm:p-3 border rounded-xl sm:rounded-2xl inline-block transition-colors duration-300 ${
                        isActive 
                          ? "bg-[#C9A86A] text-[#0A1A3A] border-[#C9A86A]" 
                          : "bg-[#FFF9EF] border-[#C9A86A]/30 text-[#8c6f33] group-hover:bg-[#C9A86A] group-hover:text-[#0A1A3A]"
                      }`}>
                        <IconComponent className="w-5 h-5 sm:w-8 sm:h-8" />
                      </div>

                      {/* Número de Paso */}
                      <span className={`text-2xl sm:text-4xl font-black transition-colors duration-300 ${
                        isActive ? "text-[#C9A86A]" : "text-[#0A1A3A]/15 group-hover:text-[#C9A86A]/40"
                      }`}>
                        {step.stepNumber}
                      </span>
                    </div>

                    <span className="text-[10px] sm:text-xs font-bold text-[#8c6f33] uppercase tracking-widest block mb-1">
                      {step.tagline}
                    </span>
                    <h3 className="text-lg sm:text-2xl font-extrabold text-[#0A1A3A] tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-gray-600 font-light leading-relaxed text-xs sm:text-sm">
                      {step.description}
                    </p>
                  </div>

                  {/* Pie de tarjeta */}
                  <div className="mt-6 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#8c6f33]">
                    <span>✓ {step.badge}</span>
                    <span className="transform group-hover:translate-x-1.5 transition-transform duration-300 font-bold">→</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {videoError && (
          <div className="mt-6 inline-flex items-center gap-2 bg-red-500/20 border border-red-500/40 px-3 py-1.5 rounded-lg text-xs text-red-200">
            <AlertCircle size={12} /> El archivo de video en <code className="text-white">/videos/process.mp4</code> no pudo cargarse.
          </div>
        )}

        {/* Cierre de Manifiesto Breve */}
        <motion.p 
          className="mt-10 sm:mt-14 text-xs sm:text-base md:text-lg text-[#C9A86A] font-medium tracking-wide max-w-2xl mx-auto italic drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] px-2"
          variants={itemVariants}
        >
          "Cada proceso de selección es una oportunidad para generar impacto, crear confianza y construir éxito sostenible."
        </motion.p>

      </motion.div>
    </section>
  );
}