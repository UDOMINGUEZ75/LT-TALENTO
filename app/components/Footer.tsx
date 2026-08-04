"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full py-14 bg-[#0A1A3A] text-center border-t border-white/10 overflow-hidden">
      
      {/* Resplandor ambiental inferior muy suave */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[150px] bg-[#C9A86A]/5 blur-[100px] pointer-events-none" />

      <motion.div 
        className="max-w-5xl mx-auto px-6 relative z-10 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >

        {/* Branding / Nombre Oficial */}
        <div className="space-y-1">
          <p className="text-xl font-black tracking-tight text-white">
            LT <span className="text-[#C9A86A]">Talent Solutions</span>
          </p>
          <p className="text-xs text-gray-400 font-light">
            Conectamos talento. Transformamos futuros.
          </p>
        </div>

        {/* Links Principales con Interacción */}
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-xs sm:text-sm font-medium pt-2">
          <motion.a
            href="https://wa.me/5216143981235"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2, color: "#FFFFFF" }}
            className="text-[#C9A86A] transition-colors duration-200"
          >
            WhatsApp
          </motion.a>

          <motion.a
            href="mailto:contacto@lttalento.com"
            whileHover={{ y: -2, color: "#FFFFFF" }}
            className="text-[#C9A86A] transition-colors duration-200"
          >
            Correo Electrónico
          </motion.a>

          <motion.a
            href="#"
            whileHover={{ y: -2, color: "#FFFFFF" }}
            className="text-[#C9A86A] transition-colors duration-200"
          >
            Aviso de Privacidad
          </motion.a>

          <motion.a
            href="#"
            whileHover={{ y: -2, color: "#FFFFFF" }}
            className="text-[#C9A86A] transition-colors duration-200"
          >
            Términos y Condiciones
          </motion.a>
        </div>

        {/* Línea divisoria minimalista */}
        <div className="w-16 h-[1px] bg-[#C9A86A]/30 mx-auto my-4" />

        {/* Copyright */}
        <p className="text-xs text-gray-400 font-light tracking-wide">
          © {currentYear} <span className="text-gray-200 font-normal">LT Talent Solutions</span>. Todos los derechos reservados.
        </p>

      </motion.div>
    </footer>
  );
}