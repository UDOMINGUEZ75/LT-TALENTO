"use client";

import { Briefcase, Users, CheckCircle } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function Services() {
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
    <section id="servicios" className="relative w-full py-28 bg-[#0A1A3A] text-white px-6 overflow-hidden">
      
      {/* Resplandor ambiental de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[500px] bg-[#C9A86A]/5 rounded-full blur-[140px] pointer-events-none" />

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
            Soluciones Estratégicas de Talento
          </span>
        </motion.div>

        {/* Título Principal */}
        <motion.h2 
          className="text-4xl md:text-5xl font-black tracking-tight text-white"
          variants={itemVariants}
        >
          Nuestros{" "}
          <span className="text-[#C9A86A]">
            Servicios
          </span>
        </motion.h2>

        {/* Descripción con Tono de Marca */}
        <motion.p 
          className="mt-6 text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed font-light"
          variants={itemVariants}
        >
          Conectamos a las organizaciones con el talento adecuado que genera resultados. 
          Desarrollamos soluciones integrales diseñadas para identificar profesionales extraordinarios 
          que impulsan la transformación y el crecimiento sostenible.
        </motion.p>

        {/* Tarjetas de Servicios */}
        <motion.div 
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={itemVariants}
        >

          {/* Servicio 1: Atracción Estratégica */}
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
                  <Briefcase className="text-[#8c6f33] group-hover:text-[#0A1A3A] transition-colors duration-300" size={34} />
                </div>
                
                <span className="text-xs font-bold text-[#8c6f33] uppercase tracking-widest block mb-1">
                  Conexión de Valor
                </span>
                <h3 className="text-2xl font-bold text-[#0A1A3A]">
                  Atracción y Selección
                </h3>
                <p className="mt-4 text-gray-600 font-light leading-relaxed text-sm">
                  Identificamos profesionales con alto potencial que se alinean perfectamente con los retos, valores y visión estratégica de tu organización.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#8c6f33]">
                <span>El talento correcto transforma empresas</span>
                <span className="transform group-hover:translate-x-1.5 transition-transform duration-300 font-bold">→</span>
              </div>
            </div>
          </motion.div>

          {/* Servicio 2: Evaluación Integral */}
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
                  <Users className="text-[#0A1A3A] group-hover:text-white transition-colors duration-300" size={34} />
                </div>

                <span className="text-xs font-bold text-[#8c6f33] uppercase tracking-widest block mb-1">
                  Lectura Humana y Ética
                </span>
                <h3 className="text-2xl font-bold text-[#0A1A3A]">
                  Evaluación de Potencial
                </h3>
                <p className="mt-4 text-gray-600 font-light leading-relaxed text-sm">
                  Evaluamos el estilo de liderazgo, motivaciones y fortalezas de cada profesional para garantizar relaciones duraderas y un impacto positivo en el equipo.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#0A1A3A]">
                <span>Personas en el centro del proceso</span>
                <span className="transform group-hover:translate-x-1.5 transition-transform duration-300 font-bold">→</span>
              </div>
            </div>
          </motion.div>

          {/* Servicio 3: Socios Estratégicos */}
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
                  <CheckCircle className="text-[#8c6f33] group-hover:text-[#0A1A3A] transition-colors duration-300" size={34} />
                </div>

                <span className="text-xs font-bold text-[#8c6f33] uppercase tracking-widest block mb-1">
                  Acompañamiento Cercano
                </span>
                <h3 className="text-2xl font-bold text-[#0A1A3A]">
                  Consultoría de Talento
                </h3>
                <p className="mt-4 text-gray-600 font-light leading-relaxed text-sm">
                  Actuamos como tus socios estratégicos en decisiones de selección, ofreciendo análisis transparentes y fundamentados que transmiten confianza total.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#8c6f33]">
                <span>Creamos conexiones que generan éxito</span>
                <span className="transform group-hover:translate-x-1.5 transition-transform duration-300 font-bold">→</span>
              </div>
            </div>
          </motion.div>

        </motion.div>

      </motion.div>
    </section>
  );
}