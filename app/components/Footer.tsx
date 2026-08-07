"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full pt-12 pb-24 sm:pb-14 bg-[#0A1A3A] text-center border-t border-white/10 overflow-hidden">
      
      {/* Resplandor ambiental inferior muy suave */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[350px] sm:w-[500px] h-[120px] sm:h-[150px] bg-[#C9A86A]/5 blur-[90px] md:blur-[120px] pointer-events-none" />

      <motion.div 
        className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 space-y-5"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >

        {/* Branding / Nombre Oficial */}
        <div className="space-y-1">
          <p className="text-lg sm:text-xl font-black tracking-tight text-white">
            LT <span className="text-[#C9A86A]">Talent Solutions</span>
          </p>
          <p className="text-[11px] sm:text-xs text-gray-400 font-light">
            Conectamos talento. Transformamos futuros.
          </p>
        </div>

        {/* Links Principales Estilizados */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-8 text-xs font-medium pt-1">
          <a
            href="https://wa.me/5216143981235"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[#C9A86A] hover:bg-[#C9A86A] hover:text-[#0A1A3A] transition-all duration-200"
          >
            WhatsApp
          </a>

          <a
            href="mailto:contacto@lttalento.com"
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[#C9A86A] hover:bg-[#C9A86A] hover:text-[#0A1A3A] transition-all duration-200"
          >
            Correo Electrónico
          </a>

          <Link
            href="/aviso-privacidad"
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-[#C9A86A]/40 transition-all duration-200"
          >
            Aviso de Privacidad
          </Link>

          <Link
            href="/terminos-condiciones"
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-[#C9A86A]/40 transition-all duration-200"
          >
            Términos y Condiciones
          </Link>
        </div>

        {/* Línea divisoria minimalista */}
        <div className="w-12 h-[1px] bg-[#C9A86A]/30 mx-auto my-3" />

        {/* Copyright */}
        <p className="text-[10px] sm:text-xs text-gray-400 font-light tracking-wide">
          © {currentYear} <span className="text-gray-200 font-normal">LT Talent Solutions</span>. Todos los derechos reservados.
        </p>

      </motion.div>
    </footer>
  );
}