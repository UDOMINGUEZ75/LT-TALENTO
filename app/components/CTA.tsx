"use client";

import { motion, Variants } from "framer-motion";

export default function CTA() {
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
    hidden: { opacity: 0, y: 25, scale: 0.98 },
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
    <section
      id="contacto"
      className="relative w-full py-28 bg-[#0A1A3A] text-white text-center overflow-hidden"
    >
      {/* Resplandor ambiental dinámico de fondo estilo Apple */}
      <motion.div 
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.12, 0.22, 0.12],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#C9A86A] rounded-full blur-[140px] pointer-events-none" 
      />

      { }
      <motion.div 
        className="max-w-4xl mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >

        {/* Tagline superior */}
        <motion.div variants={itemVariants}>
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold uppercase tracking-widest text-[#0A1A3A] bg-[#C9A86A] rounded-full shadow-lg border border-[#C9A86A]/40">
            Socios Estratégicos en Atracción de Talento
          </span>
        </motion.div>

        { }
        {/* Título Principal Tipográfico Nítido */}
        <motion.h2 
          className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight"
          variants={itemVariants}
        >
          Tu próximo gran talento{" "}
          <span className="text-[#C9A86A] block sm:inline">
            comienza aquí.
          </span>
        </motion.h2>

        {/* Descripción con Tono de Marca */}
        <motion.p 
          className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed font-light"
          variants={itemVariants}
        >
          Conectamos a las empresas con las personas que generan resultados. Platiquemos sobre cómo podemos impulsar juntos el desarrollo y futuro de tu organización.
        </motion.p>

        { }
        {/* Botón de Acción Principal Interactivo */}
        <motion.div variants={itemVariants}>
          <motion.a
            href="https://wa.me/5216143981235"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, y: -3 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className="
              inline-block mt-10 
              bg-[#C9A86A] hover:bg-[#d8b97a] text-[#0A1A3A] 
              font-extrabold text-base md:text-lg
              px-10 py-4.5 rounded-2xl 
              shadow-xl hover:shadow-2xl hover:shadow-[#C9A86A]/30
              transition-all duration-300 border border-[#C9A86A]/40
            "
          >
            Iniciar Conversación en WhatsApp
          </motion.a>
        </motion.div>

        {/* Nota Ágil y Cercana */}
        <motion.p 
          className="mt-5 text-xs md:text-sm text-gray-400 font-light"
          variants={itemVariants}
        >
          Respuesta inmediata y acompañamiento personalizado.
        </motion.p>

      </motion.div>
    </section>
  );
}