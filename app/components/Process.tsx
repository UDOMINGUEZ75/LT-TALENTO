"use client";

import { useState } from "react";
import { Search, ClipboardCheck, CheckCircle, AlertCircle } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function Process() {
  const [activeStep, setActiveStep] = useState<number>(3);
  const [videoError, setVideoError] = useState(false);

  // Variantes para la animación al hacer scroll estilo Apple con tipos explícitos de Framer Motion
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
    <section id="proceso" className="relative w-full py-28 bg-[#0A1A3A] text-white px-4 sm:px-6 md:px-8 overflow-hidden">
      
      {/* FONDO CINEMATOGRÁFICO AJUSTADO DE ANCHO Y ALTO COMPLETO */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {!videoError && (
          <video
            src="/videos/process.mp4"
            autoPlay
            loop
            muted
            playsInline
            onError={() => setVideoError(true)}
            className="absolute inset-0 w-full h-full object-cover sm:object-fill min-w-full min-h-full opacity-75"
          />
        )}
        {/* Capa de contraste y oscurecimiento uniforme */}
        <div className="absolute inset-0 w-full h-full bg-[#0A1A3A]/60" />
      </div>

      <motion.div 
        className="max-w-6xl mx-auto text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >

        {/* Tagline superior */}
        <motion.div variants={itemVariants}>
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-widest text-[#0A1A3A] bg-[#C9A86A] rounded-full shadow-lg border border-[#C9A86A]/40">
            Acompañamiento Cercano y Estratégico
          </span>
        </motion.div>

        {/* Título Principal */}
        <motion.h2 
          className="text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-md"
          variants={itemVariants}
        >
          Nuestro{" "}
          <span className="text-[#C9A86A]">
            Proceso de Selección
          </span>
        </motion.h2>

        {/* Descripción con Voz de Marca */}
        <motion.p 
          className="mt-6 text-lg md:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed font-light drop-shadow"
          variants={itemVariants}
        >
          Combinamos evaluación humana profunda con soluciones tecnológicas de vanguardia. 
          Más que realizar contrataciones temporales, identificamos profesionales con alto potencial 
          que generan resultados e impulsan la transformación de las organizaciones.
        </motion.p>

        {/* Tarjetas de Pasos */}
        <motion.div 
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={itemVariants}
        >
          {stepsData.map((step) => {
            const IconComponent = step.icon;
            const isActive = activeStep === step.id;

            return (
              <motion.div 
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`group relative rounded-3xl bg-white/95 shadow-2xl hover:shadow-[#C9A86A]/40 overflow-hidden text-left flex flex-col justify-between text-[#0A1A3A] cursor-pointer transition-all duration-300 backdrop-blur-md ${
                  isActive ? "ring-2 ring-[#C9A86A] shadow-2xl shadow-[#C9A86A]/20" : ""
                }`}
              >
                {/* Línea dorada superior delgada */}
                <div className={`w-full h-[3px] bg-[#C9A86A] shrink-0 transition-all duration-300 ${
                  isActive ? "h-[5px]" : "group-hover:h-[5px]"
                }`} />

                <div className="p-8 pt-6 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      {/* Ícono dinámico */}
                      <div className={`p-3 border rounded-2xl inline-block transition-colors duration-300 ${
                        isActive 
                          ? "bg-[#C9A86A] text-[#0A1A3A] border-[#C9A86A]" 
                          : "bg-[#FFF9EF] border-[#C9A86A]/30 text-[#8c6f33] group-hover:bg-[#C9A86A] group-hover:text-[#0A1A3A]"
                      }`}>
                        <IconComponent size={34} />
                      </div>

                      {/* Número de Paso */}
                      <span className={`text-4xl font-black transition-colors duration-300 ${
                        isActive ? "text-[#C9A86A]" : "text-[#0A1A3A]/10 group-hover:text-[#C9A86A]/30"
                      }`}>
                        {step.stepNumber}
                      </span>
                    </div>

                    <span className="text-xs font-bold text-[#8c6f33] uppercase tracking-widest block mb-1">
                      {step.tagline}
                    </span>
                    <h3 className="text-2xl font-bold text-[#0A1A3A]">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-gray-600 font-light leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </div>

                  {/* Pie de tarjeta con la flecha activa */}
                  <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#8c6f33]">
                    <span>✓ {step.badge}</span>
                    <span className="transform group-hover:translate-x-1.5 transition-transform duration-300 font-bold">→</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {videoError && (
          <div className="mt-8 inline-flex items-center gap-2 bg-red-500/20 border border-red-500/40 px-4 py-2 rounded-xl text-xs text-red-200">
            <AlertCircle size={14} /> El archivo de video en <code className="text-white">/videos/process.mp4</code> no pudo cargarse.
          </div>
        )}

        {/* Cierre de Manifiesto Breve */}
        <motion.p 
          className="mt-16 text-base md:text-lg text-[#C9A86A] font-medium tracking-wide max-w-2xl mx-auto italic drop-shadow-md"
          variants={itemVariants}
        >
          "Cada proceso de selección es una oportunidad para generar impacto, crear confianza y construir éxito sostenible."
        </motion.p>

      </motion.div>
    </section>
  );
}