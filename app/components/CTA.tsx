"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { AlertCircle, MessageCircle } from "lucide-react";

export default function CTA() {
  const [videoError, setVideoError] = useState(false);

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
      className="relative w-full py-24 md:py-32 bg-[#0A1A3A] text-white text-center overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      {/* FONDO CINEMATOGRÁFICO DE VIDEO Y SUPERPOSICIÓN */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {!videoError && (
          <video
            src="/videos/contacto.mp4"
            autoPlay
            loop
            muted
            playsInline
            onError={() => setVideoError(true)}
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
        )}
        {/* Capa de contraste y oscurecimiento uniforme */}
        <div className="absolute inset-0 w-full h-full bg-[#0A1A3A]/70" />
      </div>

      {/* Resplandor ambiental dinámico de fondo */}
      <motion.div 
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.28, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[650px] h-[320px] sm:h-[450px] bg-[#C9A86A] rounded-full blur-[120px] md:blur-[140px] pointer-events-none z-0" 
      />

      <motion.div 
        className="max-w-4xl mx-auto relative z-10 py-6 sm:py-10 bg-transparent border-0 shadow-none"
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

        {/* Título Principal Tipográfico Nítido */}
        <motion.h2 
          className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-md"
          variants={itemVariants}
        >
          Tu próximo gran talento{" "}
          <span className="text-[#C9A86A] block sm:inline">
            comienza aquí.
          </span>
        </motion.h2>

        {/* Descripción con Tono de Marca */}
        <motion.p 
          className="mt-6 text-sm sm:text-lg md:text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed font-light drop-shadow px-2"
          variants={itemVariants}
        >
          Conectamos a las empresas con las personas que generan resultados. Platiquemos sobre cómo podemos impulsar juntos el desarrollo y futuro de tu organización.
        </motion.p>

        {/* Botón de Acción Principal Interactivo */}
        <motion.div variants={itemVariants}>
          <motion.a
            href="https://wa.me/5216143981235"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className="
              inline-flex items-center justify-center gap-3 mt-8 sm:mt-10 
              bg-[#C9A86A] hover:bg-[#b89555] text-[#0A1A3A] 
              font-extrabold text-sm sm:text-base md:text-lg
              px-8 sm:px-10 py-3.5 sm:py-4.5 rounded-2xl 
              shadow-[0_0_25px_rgba(201,168,106,0.35)] hover:shadow-[0_0_35px_rgba(201,168,106,0.6)]
              transition-all duration-300 border border-[#C9A86A]/50
            "
          >
            <MessageCircle className="w-5 h-5 fill-current shrink-0" />
            <span>Iniciar Conversación en WhatsApp</span>
          </motion.a>
        </motion.div>

        {/* Nota Ágil y Cercana */}
        <motion.p 
          className="mt-5 text-xs sm:text-sm text-gray-300 font-light"
          variants={itemVariants}
        >
          Respuesta inmediata y acompañamiento personalizado.
        </motion.p>

        {videoError && (
          <div className="mt-8 inline-flex items-center gap-2 bg-red-500/20 border border-red-500/40 px-4 py-2 rounded-xl text-xs text-red-200">
            <AlertCircle size={14} /> El archivo de video en <code className="text-white">/videos/contacto.mp4</code> no pudo cargarse.
          </div>
        )}
      </motion.div>
    </section>
  );
}