"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { AlertCircle, MessageCircle } from "lucide-react";

export default function CTA() {
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
    <section
      id="contacto"
      className="relative w-full pt-20 sm:pt-32 pb-16 sm:pb-24 bg-[#0A1A3A] text-white text-center overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      {/* FONDO EQUILIBRADO: EL VIDEO DESTACA CON CLARIDAD */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {isMounted && !videoError && (
          <video
            src="/videos/contacto.mp4"
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

        {/* Capa de balance uniforme (15%) */}
        <div className="absolute inset-0 w-full h-full bg-[#0A1A3A]/15 z-20" />
      </div>

      {/* Resplandor ambiental dinámico */}
      {isMounted && (
        <motion.div 
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[650px] h-[280px] sm:h-[450px] bg-[#C9A86A] rounded-full blur-[90px] md:blur-[140px] pointer-events-none z-0" 
        />
      )}

      <motion.div 
        className="max-w-4xl mx-auto relative z-30 pt-4 sm:pt-0"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-30px" }}
      >
        {/* Tagline superior */}
        <motion.div variants={itemVariants}>
          <span className="inline-block px-3 py-1 mb-4 text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-[#0A1A3A] bg-[#C9A86A] rounded-full shadow-md">
            Socios Estratégicos en Atracción de Talento
          </span>
        </motion.div>

        {/* Título Principal */}
        <motion.h2 
          className="text-2xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]"
          variants={itemVariants}
        >
          Tu próximo gran talento{" "}
          <span className="text-[#C9A86A] block sm:inline">
            comienza aquí.
          </span>
        </motion.h2>

        {/* Descripción */}
        <motion.p 
          className="mt-3 sm:mt-5 text-xs sm:text-base md:text-lg text-gray-100 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] px-2"
          variants={itemVariants}
        >
          Conectamos a las empresas con las personas que generan resultados. Platiquemos sobre cómo podemos impulsar juntos el desarrollo y futuro de tu organización.
        </motion.p>

        {/* Botón de Acción WhatsApp Estilizado */}
        <motion.div variants={itemVariants}>
          <motion.a
            href="https://wa.me/5216143981235"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className="
              inline-flex items-center justify-center gap-2.5 mt-6 sm:mt-8 
              bg-[#C9A86A] hover:bg-[#b89555] text-[#0A1A3A] 
              font-extrabold text-xs sm:text-base
              px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl 
              shadow-[0_0_20px_rgba(201,168,106,0.35)] hover:shadow-[0_0_30px_rgba(201,168,106,0.55)]
              transition-all duration-300 border border-[#C9A86A]/50
            "
          >
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-current shrink-0" />
            <span>Iniciar Conversación en WhatsApp</span>
          </motion.a>
        </motion.div>

        {/* Nota */}
        <motion.p 
          className="mt-3.5 text-[11px] sm:text-xs text-gray-300 font-light drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]"
          variants={itemVariants}
        >
          Respuesta inmediata y acompañamiento personalizado.
        </motion.p>

        {videoError && (
          <div className="mt-6 inline-flex items-center gap-2 bg-red-500/20 border border-red-500/40 px-3 py-1.5 rounded-lg text-xs text-red-200">
            <AlertCircle size={12} /> El archivo de video en <code className="text-white">/videos/contacto.mp4</code> no pudo cargarse.
          </div>
        )}
      </motion.div>
    </section>
  );
}